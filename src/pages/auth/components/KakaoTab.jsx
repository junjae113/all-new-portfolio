import React from "react";
import S from "../style";

const KakaoTab = () => {
  return (
    <a href='http://localhost:8000/auth/kakao' style={{ textDecoration: 'none' , width: '100%'}}>
      <S.SocialLoginTabWrapper color="kakao">
        <S.KakaoIcon>
            <img src="/assets/img/kakao-L.png" alt="kakao"/>
        </S.KakaoIcon>

        <S.TabText color="kakao">
          카카오톡 1초 로그인 / 회원가입
        </S.TabText>
      </S.SocialLoginTabWrapper>
    </a>
  )
};

export default KakaoTab;