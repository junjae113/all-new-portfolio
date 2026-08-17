import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setUserStatus } from "../../components/modules/user";
import AddProfile from "../profile/AddProfile";

/**
 * 회원가입 3단계: 프로필 등록 페이지
 * AddProfile 컴포넌트를 래핑하여 회원가입 플로우에 맞는 API 호출 처리
 */
const SignUpProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // 소셜 로그인 사용자 정보 처리
  useEffect(() => {
    console.log('=== SignUpProfile useEffect 실행 ===');
    
    // localStorage에서 소셜 로그인 사용자 정보 확인
    const socialData = localStorage.getItem('socialUserData');
    if (socialData) {
      try {
        const parsedData = JSON.parse(socialData);
        console.log('localStorage에서 읽은 소셜 데이터:', parsedData);
        
        if (parsedData.accessToken && parsedData.user_id) {
          console.log('=== 소셜 로그인 사용자 정보 처리 ===');
          
          // 기존 사용자 확인 API 호출
          checkExistingUser(parsedData.accessToken, {
            email: parsedData.email,
            name: parsedData.name,
            provider: parsedData.provider || 'google'
          });
        }
      } catch (error) {
        console.error('소셜 로그인 데이터 파싱 오류:', error);
      }
    } else {
      console.log('localStorage에 socialUserData가 없음');
    }
  }, [dispatch]);

  // 기존 사용자 확인 함수
  const checkExistingUser = async (accessToken, payload) => {
    try {
      console.log('=== 기존 사용자 확인 시작 ===');
      console.log('API 호출 데이터:', { email: payload.email, provider: payload.provider || 'google' });
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/check-existing-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          email: payload.email,
          provider: payload.provider || 'google'
        })
      });

      const result = await response.json();
      console.log('기존 사용자 확인 결과:', result);

      if (result.exists) {
        // 기존 사용자: 바로 메인 페이지로 이동
        console.log('기존 사용자 감지 - 메인 페이지로 이동');
        localStorage.setItem('jwt_token', accessToken);
        localStorage.setItem('user_id', result.user.user_id);
        localStorage.setItem('userName', result.user.name);
        localStorage.setItem('email', result.user.email);
        
        dispatch(setUser(result.user));
        dispatch(setUserStatus(true));
        
        navigate('/main');
      } else {
        // 신규 사용자: 프로필 등록 계속 진행
        console.log('신규 사용자 감지 - 프로필 등록 계속 진행');
        
        // JWT 토큰에서 user_id 직접 추출
        let userId = null;
        try {
          // JWT 토큰의 payload 부분 디코딩
          const tokenParts = accessToken.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            userId = payload.user_id;
            console.log('JWT에서 추출한 user_id:', userId);
          }
        } catch (error) {
          console.error('JWT 디코딩 오류:', error);
        }

        // 소셜 로그인 사용자 정보를 localStorage에 저장
        const socialData = {
          accessToken: accessToken,
          email: payload.email,
          name: payload.name,
          provider: payload.provider || 'google',
          type: payload.provider === 'google' ? 'google' : 
                payload.provider === 'kakao' ? 'kakao' : 
                payload.provider === 'naver' ? 'naver' : 'social',
          user_id: userId || payload.user_id || searchParams.get('user_id') // JWT에서 추출한 user_id 우선 사용
        };
        
        console.log('localStorage에 저장할 데이터:', socialData);
        localStorage.setItem('socialUserData', JSON.stringify(socialData));
        
        // 저장 확인
        const savedData = localStorage.getItem('socialUserData');
        console.log('localStorage 저장 확인:', savedData);
        
        // 프로필 등록 계속 진행 (리다이렉트 없음)
        console.log('프로필 등록 계속 진행 - AddProfile 컴포넌트 렌더링');
      }
    } catch (error) {
      console.error('기존 사용자 확인 오류:', error);
      // 오류 발생 시 기본적으로 신규 사용자로 처리
      handleNewUser(accessToken, payload);
    }
  };

      // 신규 사용자 처리 함수
  const handleNewUser = (accessToken, payload) => {
    console.log('신규 사용자로 처리 - 회원가입 플로우 시작');
    
    // JWT 토큰에서 user_id 직접 추출
    let userId = null;
    try {
      // JWT 토큰의 payload 부분 디코딩
      const tokenParts = accessToken.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        userId = payload.user_id;
        console.log('handleNewUser에서 JWT에서 추출한 user_id:', userId);
      }
    } catch (error) {
      console.error('handleNewUser에서 JWT 디코딩 오류:', error);
    }

    // 소셜 로그인 사용자 정보를 localStorage에 저장
    const socialData = {
      accessToken: accessToken,
      email: payload.email,
      name: payload.name,
      provider: payload.provider || 'google',
      user_id: userId || payload.user_id || searchParams.get('user_id') // JWT에서 추출한 user_id 우선 사용
    };
    
    console.log('handleNewUser에서 localStorage에 저장할 데이터:', socialData);
    localStorage.setItem('socialUserData', JSON.stringify(socialData));
    
    // 저장 확인
    const savedData = localStorage.getItem('socialUserData');
    console.log('handleNewUser에서 localStorage 저장 확인:', savedData);
    
    // 약관동의 페이지로 이동
    console.log('handleNewUser에서 약관동의 페이지로 이동 시작');
    navigate('/sign-up');
    console.log('handleNewUser에서 약관동의 페이지로 이동 완료');
  };

  // 프로필 등록 완료 핸들러
  const handleProfileComplete = async (profileData) => {
    try {
      console.log('=== 프로필 등록 시작 ===');
      console.log('받은 프로필 데이터:', profileData);

      // localStorage에서 임시 사용자 정보 가져오기
      const tempUserData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
      console.log('tempUserData:', tempUserData);

      if (!tempUserData.user_id) {
        throw new Error('사용자 ID를 찾을 수 없습니다. 다시 로그인해주세요.');
      }

      // 프로필 데이터 정리
      const cleanProfileData = {
        name: profileData.name,
        weight: profileData.weight,
        birthDate: profileData.birthDate,
        gender: profileData.gender,
        address: profileData.address,
        breed: profileData.breed,
        custombreed: profileData.custombreed || '',
        nickname: profileData.nickname,
        favoriteSnack: profileData.favoriteSnack,
        walkingCourse: profileData.walkingCourse,
        messageToFriend: profileData.messageToFriend,
        charactor: profileData.charactor,
        favorites: profileData.favorites,
        cautions: profileData.cautions,
        neutralization: profileData.neutralization || '',
        profileImage: profileData.profileImage || ''
      };

      console.log('정리된 프로필 데이터:', cleanProfileData);

      // 기존 tempUserData에 dogProfile 추가
      const existingData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
      const updatedData = { 
        ...existingData, 
        dogProfile: cleanProfileData
      };

      // localStorage에 업데이트된 데이터 저장
      localStorage.setItem('tempUserData', JSON.stringify(updatedData));

      console.log('프로필 정보 입력 성공:', {
        profileStatus: true,
        message: '프로필 정보 입력 완료. 다음 단계로 진행해주세요.',
        tempData: cleanProfileData
      });

      // 건강정보 등록 페이지로 이동
      navigate('/profile/add-health');
      
    } catch (error) {
      console.error('프로필 등록 오류:', error);
      alert(error.message || '프로필 등록 중 오류가 발생했습니다.');
    }
  };

  return <AddProfile onProfileComplete={handleProfileComplete} />;
};

export default SignUpProfile;