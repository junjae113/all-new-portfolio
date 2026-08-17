import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setUserStatus } from '../modules/user';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // 회원가입 관련 경로인지 확인 (완료 페이지 제외)
  const isSignUpPage = (window.location.pathname.startsWith('/sign-up') && 
                        !window.location.pathname.includes('/complete')) || 
                      window.location.pathname === '/sign-in';

  // 토큰 유효성 검사
  useEffect(() => {
    console.log('=== AuthProvider useEffect 실행 ===');
    const token = localStorage.getItem('jwt_token');
    const userName = localStorage.getItem('userName');
    const user_id = localStorage.getItem('user_id');
    console.log('localStorage 값들:', { token: !!token, userName, user_id });
    
    // 회원가입 페이지라면 로그인 상태 해제
    if (isSignUpPage) {
      console.log('회원가입 페이지 감지 - 로그인 상태 해제');
      dispatch(setUserStatus(false));
      dispatch(setUser(null));
      setIsLoading(false);
      return;
    }
    
    if (token) {
      // JWT 토큰이 있으면 토큰 검증
      const isAuthenticate = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/jwt`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const { message, user } = await response.json();
            if (user) {
              // JWT 토큰 검증 후 최신 사용자 정보를 서버에서 다시 가져오기
              try {
                const userResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user_id}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                
                if (userResponse.ok) {
                  const userData = await userResponse.json();
                  if (userData.success && userData.user) {
                    console.log('JWT 검증 후 최신 사용자 데이터 로드:', userData.user);
                    dispatch(setUser(userData.user));
                    dispatch(setUserStatus(true));
                    console.log('자동 로그인 성공 (최신 데이터):', message);
                  } else {
                    dispatch(setUser(user));
                    dispatch(setUserStatus(true));
                    console.log('자동 로그인 성공:', message);
                  }
                } else {
                  dispatch(setUser(user));
                  dispatch(setUserStatus(true));
                  console.log('자동 로그인 성공:', message);
                }
              } catch (error) {
                console.error('최신 사용자 정보 조회 오류:', error);
                dispatch(setUser(user));
                dispatch(setUserStatus(true));
                console.log('자동 로그인 성공:', message);
              }
            }
          } else {
            // 토큰이 유효하지 않으면 제거하고 로그아웃 상태로 변경
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('rememberedId');
            dispatch(setUserStatus(false));
            console.log('토큰이 유효하지 않아 제거됨');
          }
        } catch (error) {
          console.error('토큰 검증 오류:', error);
          // 오류 발생 시 토큰 제거하고 로그아웃 상태로 변경
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('rememberedId');
          dispatch(setUserStatus(false));
        } finally {
          setIsLoading(false);
        }
      };

      isAuthenticate();
    } else if (userName) {
      // JWT 토큰이 없어도 회원가입 완료 상태라면 서버에서 완전한 사용자 정보를 가져와서 로그인 상태로 복원
      console.log('회원가입 완료 상태 감지 - 서버에서 사용자 정보 조회');
      const fetchUserData = async () => {
        try {
          // user_id가 없으면 userName으로 사용자 찾기 시도
          const userId = user_id || localStorage.getItem('user_id');
          if (!userId) {
            console.log('user_id가 없어서 기본 정보로 설정');
            dispatch(setUser({
              name: userName,
              email: localStorage.getItem('email') || null,
              profileImage: localStorage.getItem('profileImage') || null
            }));
            dispatch(setUserStatus(true));
            setIsLoading(false);
            return;
          }
          
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            console.log('서버에서 가져온 사용자 데이터:', data);
            if (data.success && data.user) {
              console.log('Redux에 저장할 사용자 데이터:', data.user);
              dispatch(setUser(data.user));
              dispatch(setUserStatus(true));
              console.log('사용자 정보 로드 성공:', data.user);
            } else {
              // 서버에서 사용자 정보를 가져올 수 없으면 기본 정보로 설정
              dispatch(setUser({
                user_id: user_id,
                name: userName,
                email: localStorage.getItem('email') || null,
                profileImage: localStorage.getItem('profileImage') || null
              }));
              dispatch(setUserStatus(true));
            }
          } else {
            // API 호출 실패 시 기본 정보로 설정
            dispatch(setUser({
              user_id: user_id,
              name: userName,
              email: localStorage.getItem('email') || null,
              profileImage: localStorage.getItem('profileImage') || null
            }));
            dispatch(setUserStatus(true));
          }
        } catch (error) {
          console.error('사용자 정보 조회 오류:', error);
          // 오류 발생 시 기본 정보로 설정
          dispatch(setUser({
            user_id: user_id,
            name: userName,
            email: localStorage.getItem('email') || null,
            profileImage: localStorage.getItem('profileImage') || null
          }));
          dispatch(setUserStatus(true));
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    } else {
      // JWT 토큰이 없으면 로그아웃 상태로 변경
      dispatch(setUserStatus(false));
      setIsLoading(false);
    }
  }, [dispatch, isSignUpPage]);

  // 스켈레톤 UI로 새로고침시 자연스럽게 처리
  if (isLoading) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#fff5ec',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* 스켈레톤 헤더 */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          backgroundColor: '#fff5ec',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 240px'
        }}>
          {/* 로고 스켈레톤 */}
          <div style={{
            width: '183px',
            height: '60px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
          
          {/* 메뉴 스켈레톤 */}
          <div style={{
            display: 'flex',
            gap: '50px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                width: '80px',
                height: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
            ))}
          </div>
          
          {/* 우측 메뉴 스켈레톤 */}
          <div style={{
            width: '120px',
            height: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '20px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </div>
        
        {/* 메인 콘텐츠 스켈레톤 */}
        <div style={{
          width: '80%',
          maxWidth: '800px',
          height: '400px',
          backgroundColor: '#f0f0f0',
          borderRadius: '12px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        
        {/* CSS 애니메이션 */}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default AuthProvider;
