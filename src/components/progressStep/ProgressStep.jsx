import React from "react";
import S from "./style";
import Text from '../../components/text/size';
import theme from '../../styles/theme';

// 진행 단계 컴포넌트
const ProgressStep = ({ steps, activeStep }) => {
  // 타이틀 동적 변경
  const isComplete = activeStep === steps.length - 1;
  const title = isComplete ? "회원가입 완료" : "회원가입";

  return (
    <S.ProgressStepWrapper>
      <Text.H5 color={theme.PALLETE.primary.main} fontWeight="600">{title}</Text.H5>
      <S.StepWrapper>
        {/* 진행 단계 데이터 렌더링 */}
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            <S.StepBox>
              <S.StepIcon active={activeStep === i} completed={step.completed}>
                {step.icon}
              </S.StepIcon>
              <S.StepLabel active={activeStep === i} completed={step.completed}>
                {step.label}
              </S.StepLabel>
            </S.StepBox>
            {i < steps.length - 1 && (
              <S.StepDot active={activeStep >= i}>
                <span /><span /><span /><span />
              </S.StepDot>
            )}
          </React.Fragment>
        ))}
      </S.StepWrapper>
    </S.ProgressStepWrapper>
  );
};

export default ProgressStep; 