import React from "react";
import S from "./style";
import Text from "../text/size";
import BasicInput from "./BasicInput";

const ErrorInput = ({ status = "default", errorMessage, ...rest }) => {
  // 기본 에러 메시지
  const defaultMessage = "영대/소문 , 한글 , 숫자 2가지 이상 조합 8자 이상으로 변경해주세요.";
  
  return (
    <div>
      <BasicInput status="error" {...rest} />
      <S.ErrorMessage mt="8">
        <img src="/assets/icons/error-red.svg" width={16} height={16} alt="에러" />
        <Text.Caption3>
          {errorMessage || defaultMessage}
        </Text.Caption3>
      </S.ErrorMessage>
    </div>
  );
};

export default ErrorInput;
