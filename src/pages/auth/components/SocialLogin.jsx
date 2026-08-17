import React from "react";
import S from "../style";
import Text from "../../../components/text/size";

const SocialLogin = (props) => {
  return (
    <S.SocialLogin {...props}>
        <S.TitleArea>
            <S.TitleLine></S.TitleLine>
            <Text.Body3>간편로그인</Text.Body3>
            <S.TitleLine></S.TitleLine>
        </S.TitleArea>

        <S.IConArea mt="20">
          <S.Icon>
            <a href='http://localhost:8000/auth/kakao'>
              <img src="/assets/img/kakao.png" alt="kakao"/>
            </a>
          </S.Icon>
          <S.Icon>
            <a href='http://localhost:8000/auth/naver'>
              <img src="/assets/img/naver.png" alt="naver"/>
            </a>
          </S.Icon> 
          <S.Icon>
            <a href='http://localhost:8000/auth/google'>
              <img src="/assets/img/google.png" alt="google"/>
            </a>
          </S.Icon>      
        </S.IConArea>

    </S.SocialLogin>
  )
};

export default SocialLogin;
