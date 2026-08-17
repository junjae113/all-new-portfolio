import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../modules/user";
import S from "./style";
import BasicButton from "../../button/BasicButton";
import Text from "../../text/size";

const Header = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그아웃 핸들러
  const handleLogout = () => {
    // localStorage에서 토큰 제거
    localStorage.removeItem('jwt_token');
    
    // "아이디 기억하기"가 체크되어 있다면 rememberedId는 유지
    // (사용자가 직접 체크를 해제하지 않는 한 아이디는 기억됨)
    
    // Redux 상태 초기화
    dispatch(clearUser());
    
    // 로그인 페이지로 이동
    navigate('/sign-in');
  };

  const handleLoginClick = () => {
    navigate('/sign-in');
  };

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  // 친구들 보러가기 클릭 핸들러 (로그인 확인)
  const handleFriendsClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert('로그인 후 이용해주세요.');
      navigate('/sign-in');
    }
  };

  // 프로필 이미지 경로 결정 함수
  const getProfileImageSrc = () => {
    console.log('=== Header 프로필 이미지 확인 ===');
    console.log('user:', user);
    console.log('user?.profileImage:', user?.profileImage);
    console.log('user?.dogProfile?.profileImage:', user?.dogProfile?.profileImage);
    
    // 1순위: Redux의 user.profileImage
    if (user?.profileImage) {
      console.log('Redux에서 프로필 이미지 사용:', user.profileImage);
      return user.profileImage;
    }
    
    // 2순위: 백엔드에서 받은 dogProfile.profileImage
    if (user?.dogProfile?.profileImage) {
      // 백엔드에서 받은 전체 URL인 경우
      if (user.dogProfile.profileImage.startsWith('http')) {
        console.log('백엔드 dogProfile에서 프로필 이미지 사용:', user.dogProfile.profileImage);
        return user.dogProfile.profileImage;
      }
      // 상대 경로인 경우 백엔드 URL과 결합
      const fullUrl = `${process.env.REACT_APP_BACKEND_URL}${user.dogProfile.profileImage}`;
      console.log('백엔드 dogProfile에서 프로필 이미지 사용 (상대경로):', fullUrl);
      return fullUrl;
    }
    
    // 기본 이미지
    console.log('기본 이미지 사용');
    return "/assets/img/sample-profile.png";
  };

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <Link to="/main">
          <img src="/assets/img/logo.svg" alt="MungPick 로고" />
        </Link>
      </S.LogoWrapper>

      <S.Menu>
        {isLoggedIn ? (
          <>
            <S.MenuLink to="/friends">
              <Text.Body3>친구들 보러가기</Text.Body3>
            </S.MenuLink>
            <S.MenuLink to="/support/faq">
              <Text.Body3>FAQ • 1:1 문의</Text.Body3>
            </S.MenuLink>
            <S.MenuLink to="/community">
              <Text.Body3>멍게시판</Text.Body3>
            </S.MenuLink>
            <S.MenuLink to="/calendar">
              <Text.Body3>멍캘린더</Text.Body3>
            </S.MenuLink>
            <S.MenuLink to="/chatting">
              <Text.Body3>멍챗</Text.Body3>
            </S.MenuLink>
          </>
        ) : (
          <>
            <S.MenuLink to="/friends" onClick={handleFriendsClick}>
              <Text.Body3>친구들 보러가기</Text.Body3>
            </S.MenuLink>
            <S.MenuLink to="/support/faq">
              <Text.Body3>FAQ • 1:1 문의</Text.Body3>
            </S.MenuLink>
          
          </>
        )}
      </S.Menu>

      <S.RightMenu>
        {isLoggedIn ? (
          <>
            {/* 로그아웃 버튼 */}
            <BasicButton variant="filled" roundButton="small" onClick={handleLogout}>
              로그아웃
            </BasicButton>

            {/* 프로필 섹션 */}
            <S.ProfileSection>
              <Link to="/my-page">
              <S.ProfileImg
                src={getProfileImageSrc()}
                alt="프로필"
                onError={(e) => {
                  e.target.src = "/assets/img/sample-profile.png";
                }}
              />
              </Link>
            </S.ProfileSection>
          </>
        ) : (
          <>
            <S.ButtonWrap>
              <BasicButton variant="filled" roundButton="small" onClick={handleLoginClick}>
                로그인
              </BasicButton>
              <BasicButton variant="filled" roundButton="small" onClick={handleSignUpClick}>
                회원가입
              </BasicButton>
            </S.ButtonWrap>
          </>
        )}
      </S.RightMenu>
    </S.HeaderWrapper>
  );
};

export default Header;
