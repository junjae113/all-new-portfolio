import React from "react";
import S from "./style"; // styled.input 정의된 파일

const BasicInput = ({ status = "default", ...rest }) => {
  return <S.Input status={status} {...rest} />;
};

export default BasicInput;
