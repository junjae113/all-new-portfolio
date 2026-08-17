import React from "react";

// 진행 단계 이미지
const stepImages = [
  { active: "/assets/img/join_step/step-1.png", inactive: "/assets/img/join_step/step-1-g.png" },
  { active: "/assets/img/join_step/step-2.png", inactive: "/assets/img/join_step/step-2-g.png" },
  { active: "/assets/img/join_step/step-2.png", inactive: "/assets/img/join_step/step-2-g.png" },
  { active: "/assets/img/join_step/step-4.png", inactive: "/assets/img/join_step/step-4-g.png" },
];

// 진행 단계 라벨
const stepLabels = [
  "이용약관 동의",
  "회원정보 입력",
  "프로필 등록",
  "회원가입 완료"
];

// 진행 단계 데이터 가져오기
export function getSignUpSteps(activeStep) {
  return stepLabels.map((label, idx) => ({
    label,
    icon: (
      <img
        src={
          activeStep === idx || idx < activeStep
            ? stepImages[idx].active
            : stepImages[idx].inactive
        }
        alt={`step${idx + 1}`}
      />
    ),
    completed: idx < activeStep
  }));
} 