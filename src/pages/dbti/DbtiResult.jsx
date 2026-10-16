import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BasicButton from '../../components/button/BasicButton';
import {
  faHeart, faSadTear, faHome, faDog, faUserSecret,
  faFaceMeh, faEye, faMicrochip, faUmbrella,
  faHandHoldingHeart, faHeartbeat, faFaceSadTear,
  faMapMarkerAlt, faBrain, faRunning, faBullhorn,
  faHandsHelping, faSignal, faGrinHearts,
  faLaughBeam, faFaceAngry, faGrinBeam,
  faUtensils, faCrown, faMeh, faToggleOn
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import S from './resultStyle';
import MiniFooter from '../../components/layout/footer/MiniFooter';
import { results } from './dbtiResultData';
import useAuth from '../../components/auth/useAuth';
import { setUser } from '../../components/modules/user';

export default function DbtiResultPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code') || 'WTIL';
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Redux에서 현재 사용자 정보 가져오기
  const currentUser = useSelector(state => state.user.currentUser);
  const { userId } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.Kakao) return;
    const s = document.createElement('script');
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    s.async = true;
    s.onload = () => { if (!window.Kakao.isInitialized()) window.Kakao.init('YOUR_KAKAO_APP_KEY'); };
    document.head.appendChild(s);
  }, []);

  // 결과 데이터는 dbtiResultData.js에 있으니 code로 바로 찾아요
  useEffect(() => {
    setResult(results[code] ?? null);
    setLoading(false);
  }, [code]);

  if (loading) return <div>불러오는 중...</div>;
  if (err) return <div>{err}</div>;
  if (!result) return <div>결과를 찾을 수 없습니다.</div>;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const imageUrl = typeof window !== 'undefined'
    ? new URL(result.image, window.location.origin).toString()
    : result.image;

  const handleShareKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) return alert('카카오 SDK가 초기화되지 않았습니다.');
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: result.title,
        description: code,
        imageUrl,
        link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
      },
      buttons: [{ title: '결과 보기', link: { mobileWebUrl: currentUrl, webUrl: currentUrl } }],
    });
  };

  const handleCopyLink = async () => {
    try { await navigator.clipboard.writeText(currentUrl); alert('링크가 복사되었습니다!'); }
    catch { alert('복사 실패'); }
  };

  // MBTI 결과를 데이터베이스에 저장하는 함수
  const handleSaveMbtiResult = async () => {
    // userId는 useAuth()에서 가져와요 (Redux → JWT 토큰 → localStorage 순서)
    if (!userId) {
      alert('로그인 후 결과를 저장할 수 있어요.');
      navigate('/sign-in');
      return;
    }

    console.log('저장할 사용자 ID:', userId);
    console.log('저장할 DBTI 결과:', code);

    setIsSaving(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/update-mbti`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          dbtiResult: code
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'MBTI 결과 저장에 실패했습니다.');
      }

      const result = await response.json();
      console.log('MBTI 결과 저장 성공:', result);

      // Redux의 사용자 정보도 바로 갱신해서 프로필 카드에 새 결과가 보이게 해요
      if (currentUser) {
        dispatch(setUser({
          ...currentUser,
          dogMbti: { ...currentUser.dogMbti, isCompleted: true, result: code },
        }));
      }
      alert('MBTI 검사 결과가 저장되었습니다!');

    } catch (error) {
      console.error('MBTI 결과 저장 오류:', error);
      alert('MBTI 결과 저장에 실패했습니다: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <S.HeaderSpacer />
      <S.Container>
        <S.Content>
          <S.Left>
            <S.Title fontWeight="bold">{result.title}</S.Title>
            <S.Code>{code}</S.Code>
            <S.Image src={result.image} alt={result.title} />
            <S.Hashtags>{result.hashtags.map((tag, i) => <li key={i}>{tag}</li>)}</S.Hashtags>
          </S.Left>

          <S.Right>
            <S.Features>
              {result.features.map((f, i) => (
                <div className="feature" key={i}>
                  {pngIcons.has(f.icon) ? (
                    <img src={`/assets/icons/free-icon-${f.icon}.png`} alt="" width={32} height={32} />
                  ) : (
                    <FontAwesomeIcon icon={faIconMapper[f.icon]} size="2x" />
                  )}
                  <div>{f.label}</div>
                </div>
              ))}
            </S.Features>

            <S.Divider />

            <S.Bottom>
              <S.Share>
                <div className="share-title">내 결과 공유하기</div>
                <div className="share-icons">
                  <button className="share-btn" onClick={handleShareKakao}>
                    <img src="/assets/img/kakao.png" alt="카카오톡 공유" />
                  </button>
                  <button className="share-btn" onClick={handleCopyLink}>링크복사</button>
                </div>
              </S.Share>

              <S.Nav>
                <BasicButton 
                  roundButton="small" 
                  variant="filled" 
                  onClick={handleSaveMbtiResult}
                  disabled={isSaving}
                >
                  {isSaving ? '저장 중...' : '결과 저장하기'}
                </BasicButton>
                <BasicButton roundButton="small" variant="gray" onClick={() => navigate('/dbti-question')}>다시 풀기</BasicButton>
                <BasicButton roundButton="small" variant="filled" onClick={() => navigate('/main')}>메인 페이지</BasicButton>
                <BasicButton roundButton="small" variant="filled" onClick={() => navigate('/my-page')}>마이 페이지</BasicButton>
              </S.Nav>
            </S.Bottom>
          </S.Right>
        </S.Content>
      </S.Container>
      <MiniFooter />
    </>
  );
}

// public/assets/icons/free-icon-*.png 로 있는 아이콘 (dbtiResultData.js의 icon 이름)
const pngIcons = new Set([
  'bark', 'caring', 'cool', 'dog', 'doghouse', 'dogtail', 'eyes', 'freedom', 'heart',
  'jealous', 'king', 'latvia', 'laughing', 'nervous', 'observation', 'pawprints',
  'sensor', 'social-distancing', 'thinking',
]);

const faIconMapper = {
  heart: faHeart, 'sad-tear': faSadTear, home: faHome, dog: faDog, 'user-secret': faUserSecret,
  'face-meh': faFaceMeh, eye: faEye, microchip: faMicrochip, umbrella: faUmbrella,
  'hand-holding-heart': faHandHoldingHeart, heartbeat: faHeartbeat, 'face-sad-tear': faFaceSadTear,
  'map-marker-alt': faMapMarkerAlt, brain: faBrain, running: faRunning, bullhorn: faBullhorn,
  'hands-helping': faHandsHelping, signal: faSignal, 'grin-hearts': faGrinHearts,
  'laugh-beam': faLaughBeam, 'face-angry': faFaceAngry, 'grin-beam': faGrinBeam,
  utensils: faUtensils, crown: faCrown, meh: faMeh, 'toggle-on': faToggleOn,
};
