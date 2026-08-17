// SignIn.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setUserStatus } from '../../components/modules/user';
import Container from '../../components/layout/Container';
import Text from '../../components/text/size';
import BasicInput from '../../components/input/BasicInput';
import PasswordInput from '../../components/input/PasswordInput';
import CheckboxWithLabel from '../../components/checkbox/CheckboxWithLabel';
import S from './style';
import BasicButton from '../../components/button/BasicButton';
import SocialLogin from './components/SocialLogin';
import { useInput } from '../../hooks/useInput';
import { useToggle } from '../../hooks/useToggle';

const helperLinks = [
    { label: "아이디 찾기", to: "/find-id" },
    { label: "비밀번호 찾기", to: "/find-password" },
];

const SignIn = () => {
  // useInput 훅으로 입력값 상태 관리
  const [id, onChangeId] = useInput('');
  const [pw, onChangePw] = useInput('');
  // useToggle 훅으로 체크박스 상태 관리
  const [rememberId, toggleRememberId] = useToggle(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 페이지 로드 시 저장된 아이디 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem('rememberedId');
    if (savedId) {
      onChangeId({ target: { value: savedId } }); // 아이디 입력 필드에 설정
      toggleRememberId(true); // 체크박스도 체크 상태로 설정
    }
  }, []);

  // 입력값이 모두 있을 때만 버튼 활성화
  const isActive = id.trim() !== '' && pw.trim() !== '';

  // 엔터키 입력 시 로그인 실행 함수 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isActive) {
      handleLogin();
    }
  };

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {
    try {
      // 로그인 API 호출
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: id,
          password: pw,
        })
      });

      if (!response.ok) {
        let errorMessage = '로그인에 실패했습니다.';
        
        try {
          // JSON 응답을 시도
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // JSON 파싱 실패 시 텍스트 응답 확인
          try {
            const textResponse = await response.text();
            if (textResponse.includes('Unauthorized')) {
              errorMessage = '아이디 또는 비밀번호를 확인해주세요.';
            } else {
              errorMessage = textResponse || errorMessage;
            }
          } catch (textError) {
            // 모든 파싱 실패 시 기본 메시지
            errorMessage = '아이디 또는 비밀번호를 확인해주세요.';
          }
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('로그인 성공:', result);
      console.log('=== 사용자 데이터 구조 확인 ===');
      console.log('currentUser:', result.currentUser);
      console.log('currentUser type:', typeof result.currentUser);
      console.log('currentUser keys:', result.currentUser ? Object.keys(result.currentUser) : 'currentUser is null');
      
      if (result.currentUser?.dogProfile) {
        console.log('dogProfile:', result.currentUser.dogProfile);
        console.log('dogProfile keys:', Object.keys(result.currentUser.dogProfile));
        console.log('profileImage:', result.currentUser.dogProfile.profileImage);
        console.log('profileImage type:', typeof result.currentUser.dogProfile.profileImage);
      } else {
        console.log('dogProfile is missing or undefined');
      }

      // 토큰 저장
      if (result.accessToken) {
        localStorage.clear(); 
        localStorage.setItem('jwt_token', result.accessToken);
        console.log('토큰 저장됨:', result.accessToken);
      }

      // 로그인 성공 시 리덕스에 사용자 정보와 로그인 상태 저장
      dispatch(setUser(result.currentUser));
      dispatch(setUserStatus(result.isLogin)); 
      
      // 아이디 기억하기 체크 시 localStorage 저장
      if (rememberId) {
        localStorage.setItem('rememberedId', id);
      } else {
        localStorage.removeItem('rememberedId');
      }
      
      // 메인 페이지로 이동
      navigate('/main');
    } catch (error) {
      console.error('로그인 오류:', error);
      alert(error.message);
    }
  };

  return (
    <Container>
      <S.LoginWrapper>
          <Text.H4>로그인</Text.H4>
          <S.InputWrapper>
            <BasicInput
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={onChangeId}
              onKeyPress={handleKeyPress}
            />
            <PasswordInput
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={onChangePw}
              onKeyPress={handleKeyPress}
            />
          </S.InputWrapper>

          <S.Options>
            {/* useToggle 훅으로 체크박스 상태 관리 */}
            <CheckboxWithLabel label="아이디 기억하기" checked={rememberId} onChange={toggleRememberId} />

            <S.LinkGroup>
              {/* 비밀번호 찾기 링크 */}
              {helperLinks.map(({ label, to }) =>
                label === "비밀번호 찾기" ? (
                  <S.PasswordText key={to}>
                    <Text.Body3
                      as={Link}
                      to={to}
                      mr="16px"
                    >
                      {label}
                    </Text.Body3>
                  </S.PasswordText>
                ) : (
                  <Text.Body3
                    as={Link}
                    key={to}
                    to={to}
                    mr="16px"
                  >
                    {label}
                  </Text.Body3>
                )
              )}
            </S.LinkGroup>
          </S.Options>

          <S.ButtonWrapper>
            <BasicButton
              basicButton="large"
              variant="filled"
              disabled={!isActive}
              onClick={isActive ? handleLogin : undefined} // 활성화 시에만 로그인 시도
            >
              로그인
            </BasicButton>
            <BasicButton basicButton="large" variant="default" as={Link} to="/sign-up">
              회원가입
            </BasicButton>
          </S.ButtonWrapper>

          <SocialLogin/> 

      </S.LoginWrapper>
    </Container>
  );
};

export default SignIn;