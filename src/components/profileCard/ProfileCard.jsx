import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import BasicButton from '../button/BasicButton';
import S from "./style";
import Text from "../text/size";
import { useToggle } from '../../hooks/useToggle';

const ProfileCard = ({ userData, currentUserId, isMyProfile = false, ...props }) => {
  console.log('ProfileCard 렌더링 - isMyProfile:', isMyProfile, 'userData.name:', userData?.dogProfile?.name);
  
  const navigate = useNavigate();
  
  // 중성화 여부를 한글로 변환하는 함수
  const getNeutralizationText = (neutralization) => {
    switch(neutralization) {
      case 'yes': return '완료';
      case 'none': return '미완료';
      default: return neutralization;
    }
  };
  
  // dog 객체를 useState로 관리
  const [dog, setDog] = useState({
    name: '방울이',
    breed: '리트리버',
    gender: '수컷',
    weight: '12.8kg',
    age: '8세',
    birthDate: '99-02-07',
    neutralization: '완료',
    profileImage: '/assets/img/my-profile.png',
    charactor: '소심해요',
    favorites: ['낯가려요', '호기심쟁이'],
    cautions: [],
    address: '서울시 강남구',
    dogMbti: { result: 'ENFP' }
  });

  // userData가 변경될 때마다 dog 객체 업데이트
  useEffect(() => {
    
    const newDog = userData ? {
      // 마이페이지(isMyProfile=true)일 때만 localStorage 사용, 매칭페이지에서는 userData만 사용
      name: isMyProfile ? (localStorage.getItem('userName') || userData.dogProfile?.name || '방울이') : (userData.dogProfile?.name || '방울이'),
      breed: userData.dogProfile?.breed || '리트리버',
      gender: userData.dogProfile?.gender || '수컷',
      weight: userData.dogProfile?.weight || '12.8kg',
      age: userData.dogProfile?.age ? userData.dogProfile.age.replace('세', '') : '8',
      birthDate: userData.dogProfile?.birthDate || '99-02-07',
      neutralization: userData.dogProfile?.neutralization || '완료',
      profileImage: userData.dogProfile?.profileImage || '/assets/img/my-profile.png',
      charactor: userData.dogProfile?.charactor || '소심해요',
      favorites: userData.dogProfile?.favorites || ['낯가려요', '호기심쟁이'],
      cautions: userData.dogProfile?.cautions || [],
      address: userData.dogProfile?.address || '서울시 강남구',
      dogMbti: userData.dogMbti || { result: 'ENFP' },
      likeCount: userData.likeCount || 0,
      distance: userData.distance || null,
      user_id: userData.user_id
    } : {
      name: isMyProfile ? localStorage.getItem('userName') || '방울이' : '방울이',
      breed: '리트리버',
      gender: '수컷',
      weight: '12.8kg',
      age: '8세',
      birthDate: '99-02-07',
      neutralization: '완료',
      profileImage: '/assets/img/my-profile.png',
      charactor: '소심해요',
      favorites: ['낯가려요', '호기심쟁이'],
      cautions: [],
      address: '서울시 강남구',
      dogMbti: { result: 'ENFP' }
    };
    
    setDog(newDog);
  }, [userData, isMyProfile]);

  // 마이페이지에서만 localStorage 변경 감지
  useEffect(() => {
    if (!isMyProfile) return; // 매칭페이지에서는 실행하지 않음
    
    const interval = setInterval(() => {
      const currentUserName = localStorage.getItem('userName');
      if (currentUserName && currentUserName !== dog.name) {
        console.log('마이페이지 localStorage userName 변경 감지:', currentUserName);
        setDog(prev => ({ ...prev, name: currentUserName }));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isMyProfile, dog.name]);

  //기본 : 비워진 하트
  const [isHeartFilled, toggleHeart] = useToggle(false);
  // 매칭 상태 관리 (기본값: false = 매칭하기, true = 매칭 신청 완료)
  const [isMatchingApplied, toggleMatching] = useToggle(false);
  // 좋아요 수 상태
  const [likeCount, setLikeCount] = useState(dog.likeCount || 0);

  // 성별을 한국어로 변환하는 함수
  const getGenderInKorean = (gender) => {
    switch (gender) {
      case 'male':
        return '수컷';
      case 'female':
        return '암컷';
      default:
        return gender; // 변환할 수 없는 경우 원본 반환
    }
  };

  // 가입일로부터 며칠째인지 계산하는 함수
  const getDaysSinceJoin = (createdAt) => {
    if (!createdAt) return 0;
    
    const joinDate = new Date(createdAt);
    const today = new Date();
    const diffTime = today - joinDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(1, diffDays); // 최소 1일
  };

  // 일관된 랜덤 궁합 계산 함수 (사용자 ID 기반) - 매칭 페이지용
  const getConsistentCompatibility = (userId, currentUserId) => {
    // 사용자 ID를 기반으로 시드 생성
    const seed = (userId + currentUserId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // 시드를 사용한 의사 랜덤 생성
    const x = Math.sin(seed) * 10000;
    const random = x - Math.floor(x);
    
    // 80~99% 범위로 변환
    return Math.floor(random * 20) + 80;
  };

  // 하트 클릭 시 좋아요 토글
  const handleHeartClick = async () => {
    if (!currentUserId || !dog.user_id) {
      console.log('현재 사용자 ID 또는 대상 사용자 ID가 없습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/likes/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          liker_id: currentUserId,
          target_id: dog.user_id
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toggleHeart(); // 하트 상태 토글
        setLikeCount(data.likeCount); // 좋아요 수 업데이트
      } else {
        console.error('좋아요 처리 실패:', data.message);
      }
    } catch (error) {
      console.error('좋아요 API 호출 오류:', error);
    }
  };

  return (
    <S.ProfileCardWrapper {...props}>

        {!isMyProfile && (
          <S.TooltipContainer>
              <img src="/assets/img/progile/tooltip.png" width={235} alt="말풍선" />
              <Text.Caption1>
                <span className='tooltip-distance'>
                  {dog.distance !== null && dog.distance !== undefined ? `${dog.distance}km` : '거리 정보 없음'}
                </span> 근처에 있어요!
              </Text.Caption1>
          </S.TooltipContainer>
        )}
        <S.ProfileImage>
            <img src={dog.profileImage} alt={dog.name}/>
        </S.ProfileImage>
        <S.ProfileInfo>
            {/* 이름부분 */}
            <S.ProfileInfoHeader>
                <Text.H6>{dog.name}</Text.H6>
                <S.HeartIcon onClick={handleHeartClick}>
                    {isHeartFilled ? (
                        <img src="/assets/icons/heart-filled.svg" width={30} height={30} alt="채워진 하트" />
                    ) : (
                        <img src="/assets/icons/heart.svg" width={30} height={30} alt="하트" />
                    )}
                </S.HeartIcon>
            </S.ProfileInfoHeader>
            {/* 기본정보 부분 */}
            <S.ProfileInfoItem>
                <Text.Caption1>{dog.breed}</Text.Caption1>
                <Text.Caption1>{getGenderInKorean(dog.gender)}</Text.Caption1>
                <Text.Caption1>{dog.weight}kg</Text.Caption1>
                <Text.Caption1>{dog.age}세</Text.Caption1>
            </S.ProfileInfoItem>

            {/* 버튼 부분 */}
            <S.ProfileInfoButton>
                {/* 성격 태그 (1개) */}
                <BasicButton roundButton="superSmall" variant="filled"># {dog.charactor ? dog.charactor.split('(')[0].trim() : '친근해요'}</BasicButton>
                
                {/* 좋아하는 것 태그 (1개) */}
                {dog.favorites && dog.favorites.length > 0 && dog.favorites[0] ? (
                  <BasicButton roundButton="superSmall" variant="filled">
                    # {dog.favorites[0].split('(')[0].trim()}
                  </BasicButton>
                ) : (
                  <BasicButton roundButton="superSmall" variant="filled"># 산책</BasicButton>
                )}
                
                {/* 주의사항 태그 (1개) */}
                {dog.cautions && dog.cautions.length > 0 && dog.cautions[0] ? (
                  <BasicButton roundButton="superSmall" variant="filled">
                    # {dog.cautions[0].split('(')[0].trim()}
                  </BasicButton>
                ) : (
                  <BasicButton roundButton="superSmall" variant="filled"># 조심스러워요</BasicButton>
                )}
                
                {/* MBTI 태그 추가 */}
                {dog.dogMbti && dog.dogMbti.result && (
                  <BasicButton roundButton="superSmall" variant="filled"># {dog.dogMbti.result.toLowerCase()}</BasicButton>
                )}
            </S.ProfileInfoButton>

            <S.ProfileInfoList>
                <S.ProfileInfoListItem>
                    <S.ProfileInfoListItemLabel>
                        <img src="/assets/icons/footprint.png" width={20} height={20} alt="발자국" />
                        <Text.Caption1>생년월일 : </Text.Caption1>
                    </S.ProfileInfoListItemLabel>
                
                    <S.ProfileInfoListItemValue>
                        <Text.Caption1>{dog.birthDate}</Text.Caption1>
                    </S.ProfileInfoListItemValue>
                </S.ProfileInfoListItem>

                <S.ProfileInfoListItem>
                    <S.ProfileInfoListItemLabel>
                        <img src="/assets/icons/footprint.png" width={20} height={20} alt="발자국" />
                        <Text.Caption1>중성화 여부 : </Text.Caption1>
                    </S.ProfileInfoListItemLabel>
                
                    <S.ProfileInfoListItemValue>
                        <Text.Caption1>{getNeutralizationText(dog.neutralization)}</Text.Caption1>
                    </S.ProfileInfoListItemValue>
                </S.ProfileInfoListItem>
            </S.ProfileInfoList>
        </S.ProfileInfo>

        <S.ProfileInfoStatistics>
            <S.ProfileInfoStatisticsItem>
                <Text.H6 color={"#FFBA2C"} fontWeight={600}>{dog.friendsCount || 0}</Text.H6>
                <Text.Caption1>매칭 성공</Text.Caption1>
            </S.ProfileInfoStatisticsItem>

            <S.ProfileInfoStatisticsItem>
                {isMyProfile ? (
                    <>
                        <Text.H5 color={"#CF4B05"} fontWeight={600}>{getDaysSinceJoin(userData?.createdAt)}일</Text.H5>
                        <Text.Caption1>멍픽과 함께한 지</Text.Caption1>
                    </>
                ) : (
                    <>
                        <Text.H5 color={"#CF4B05"} fontWeight={600}>{getConsistentCompatibility(dog.user_id, currentUserId)}%</Text.H5>
                        <Text.Caption1>나와의 궁합</Text.Caption1>
                    </>
                )}
            </S.ProfileInfoStatisticsItem>

            <S.ProfileInfoStatisticsItem>
                <Text.H6 color={"#FFBA2C"} fontWeight={600}>{likeCount}</Text.H6>
                <Text.Caption1>좋아요 수</Text.Caption1>
            </S.ProfileInfoStatisticsItem>
        </S.ProfileInfoStatistics>

         {!isMyProfile ? (
           <BasicButton 
             roundButton="small" 
             variant={isMatchingApplied ? "filled" : "default"} 
             mt="30"
             onClick={toggleMatching}
           >
             {isMatchingApplied ? "매칭 신청 완료!" : "매칭하기"}
           </BasicButton>
         ) : (
           <BasicButton 
             roundButton="small" 
             variant="default" 
             mt="30"
             onClick={() => navigate('/profile/add?mode=edit')}
           >
             프로필 편집
           </BasicButton>
         )}

    </S.ProfileCardWrapper>
  )
}

export default ProfileCard;