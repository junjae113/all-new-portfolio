import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProgressStep from "../../components/progressStep/ProgressStep";
import { getSignUpSteps } from "../../components/progressStep/SignUpStepData";
import SocialTabWrapper from "./components/SocialTabWrapper";
import ScrollToTop from "../../components/ScrollToTop";
import SignUpContainer from "../../components/layout/SignUpContainer";

// URL 경로에 따라 진행 단계 매핑
const stepMap = {
  "/sign-up": 0,
  "/sign-up/info": 1,
  "/sign-up/profile": 2,
  "/profile/add-health": 2,
  "/sign-up/complete": 3,
};

const SignUpLayout = () => {
  const location = useLocation();
  const activeStep = stepMap[location.pathname] ?? 0;
  const steps = getSignUpSteps(activeStep);

  // profile/add-health도 첫 단계가 아니므로 SocialTabWrapper 숨김
  const isFirstStep = location.pathname === "/sign-up";

  // profile 경로들도 SignUpLayout을 사용할 수 있도록 조건 확인
  const isSignUpFlow = location.pathname.startsWith("/sign-up") || 
                       location.pathname.startsWith("/profile");

  // 편집 모드 확인 (URL 파라미터)
  const urlParams = new URLSearchParams(location.search);
  const isEditMode = urlParams.get('mode') === 'edit';

  // SignUp 플로우가 아니면 렌더링하지 않음
  if (!isSignUpFlow) {
    return <Outlet />;
  }

  return (
    <SignUpContainer>
      <ScrollToTop />
      {isFirstStep && <SocialTabWrapper />}
      {!isEditMode && <ProgressStep steps={steps} activeStep={activeStep} />}
      <Outlet />
    </SignUpContainer>
  );
};

export default SignUpLayout; 