import React, { useState } from "react";
import S from "./style";
import BasicInput from "./BasicInput";
import Text from "../text/size";

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((prev) => !prev);

  return (
    <S.PasswordInputWrapper>
      <S.InputButtonWrapper>
        <BasicInput
          type={visible ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요."
          {...props}
        />
        {visible ? (
          <img 
            src="/assets/icons/eye-on.svg" 
            alt="비밀번호 보기" 
            onClick={toggleVisible}
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
          />
        ) : (
          <S.EyeOff onClick={toggleVisible} />
        )}
      </S.InputButtonWrapper>
      {/*
      <S.ErrorMessage mt="8">
        <img src="/assets/icons/error-red.svg" width={16} height={16} alt="에러" />
        <Text.Caption3>영대/소문 , 한글 , 숫자 2가지 이상 조합 8자 이상으로 변경해주세요.</Text.Caption3>
      </S.ErrorMessage>
      */}
    </S.PasswordInputWrapper>
  );
};

export default PasswordInput;
