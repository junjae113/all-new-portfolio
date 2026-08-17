import React from "react";
import AcceptTerms from "./components/AcceptTerms";

// 1단계: 개인정보동의(약관) 페이지
// SocialTabWrapper는 진행바(ProgressStep)보다 위에, 그리고 1단계에서만 노출
const SignUpAgree = () => (
  <>
    <AcceptTerms />
  </>
);

export default SignUpAgree; 