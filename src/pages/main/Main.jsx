import React, { useEffect, useState } from "react";
import BasicButton from "../../components/button/BasicButton";
import Text from "../../components/text/size";
import BasicInput from "../../components/input/BasicInput";
import S from "./style"
import ErrorInput from "../../components/input/ErrorInput";
import PasswordInput from "../../components/input/PasswordInput";
import ButtonWithInput from "../../components/input/ButtonWithInput";
import Checkbox from "../../components/checkbox/Checkbox";
import CheckboxWithLabel from "../../components/checkbox/CheckboxWithLabel";
import RadioWithLabel from "../../components/radio/RadioWithLabel";
import Radio from "../../components/radio/Radio";
import SelectBox from "../../components/selectBox/SelectBox";
import Accordion from "../../components/accordion/Accordion";
import Container from "../../components/layout/Container";
import MiniFooter from "../../components/layout/footer/MiniFooter";
import RadioGroupExample from "../../components/radio/RadioGroupExample";
import useAuth from "../../components/auth/useAuth";
import { useNavigate } from "react-router-dom";

const Main = () => {

  const { userId } = useAuth("");
  const link = useNavigate();
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (!userId) {
      setProfileImage("/assets/img/my-profile.png");
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`)
    .then(response => response.json())
    .then((data) => {
      const profileImage = data.user?.dogProfile?.profileImage
      if(profileImage){
        setProfileImage(profileImage)
      } else {
        setProfileImage("/assets/img/my-profile.png")
      }
    })
    .catch(() => setProfileImage("/assets/img/my-profile.png"))
  }, [userId])


  return (

    <div>
      <S.HeroBanner>
        <S.ExceptButtonWrapper>
          <div>
            <Text.H5>멍픽에서 시작하는 반려견 라이프!</Text.H5>
            <S.Logo src="/assets/img/logo.svg" alt="MungPick 로고" />
            <S.TextWrapper>
              <Text.Body2>강아지 이야기는 나누고, 일정은 놓치지 않게</Text.Body2>
              <Text.Body1>반려견 일상 기록의 시작, 멍픽</Text.Body1>
            </S.TextWrapper>
          </div>
          <S.CircleWrapper>
            <S.FirstCircle>
              <S.SecondCircle>
                {userId ? (
                  <button onClick={() => {
                    if (userId) {
                      link("/my-page")
                    }
                  }}>
                    <S.ImgWrapper
                      src={profileImage}
                      alt="프로필 이미지"
                      onError={(e) => {
                        e.target.src = "/assets/img/my-profile.png"
                      }}
                    />
                  </button>
                ) : (
                  <S.ImgWrapper
                    src={profileImage}
                    alt="프로필 이미지"
                    onError={(e) => {
                      e.target.src = "/assets/img/my-profile.png"
                    }}
                  />              
                )}
              </S.SecondCircle>
            </S.FirstCircle>
          </S.CircleWrapper>
        </S.ExceptButtonWrapper>
        {userId ? (
            <S.ButtonWrapper>
              <S.ExploreButton basicButton="large" variant="filled" onClick={() => link("/explore")}>둘러보기</S.ExploreButton>
            </S.ButtonWrapper>
          ) : ( 
              <S.ButtonWrapper>
                <S.SignInButton basicButton="large" variant="default" onClick={() => link("/sign-in")}>로그인</S.SignInButton>
                <S.ExploreButton basicButton="large" variant="filled" onClick={() => link("/explore")}>둘러보기</S.ExploreButton>
              </S.ButtonWrapper>
          )
        }
      </S.HeroBanner>
    </div>

 
  );
};

export default Main;
