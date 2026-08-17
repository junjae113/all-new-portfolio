import React from "react";
import S from "../style";

const NaverTab = () => {
  return (
    <a href='http://localhost:8000/auth/naver' style={{ textDecoration: 'none' , width: '100%'}}>
      <S.SocialLoginTabWrapper color="naver">
        <S.NaverIcon>
          <img src="/assets/img/naver-L.png" alt="naver"/>
        </S.NaverIcon>
        <S.TabText color="naver">
          네이버 1초 로그인 / 회원가입
        </S.TabText>
      </S.SocialLoginTabWrapper>
    </a>
  )
};

export default NaverTab;