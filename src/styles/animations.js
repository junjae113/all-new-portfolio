// 애니메이션 키프레임 정의
export const animations = {
  // 둥둥거리는 애니메이션
  float: `
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `,

  // 페이드 인 애니메이션
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  `,

  // 페이드 아웃 애니메이션
  fadeOut: `
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translateY(0px);
      }
      to {
        opacity: 0;
        transform: translateY(-20px);
      }
    }
  `,

  // 좌우 흔들림 애니메이션
  shake: `
    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: translateX(-5px);
      }
      20%, 40%, 60%, 80% {
        transform: translateX(5px);
      }
    }
  `,

  // 회전 애니메이션
  rotate: `
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,

  // 스케일 애니메이션 (커졌다 작아졌다)
  pulse: `
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
  `,

  // 바운스 애니메이션
  bounce: `
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translateY(0);
      }
      40%, 43% {
        transform: translateY(-20px);
      }
      70% {
        transform: translateY(-10px);
      }
      90% {
        transform: translateY(-4px);
      }
    }
  `,

  // 슬라이드 인 (왼쪽에서)
  slideInLeft: `
    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,

  // 슬라이드 인 (오른쪽에서)
  slideInRight: `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,

  // 위에서 아래로 슬라이드
  slideInDown: `
    @keyframes slideInDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,

  // 아래에서 위로 슬라이드
  slideInUp: `
    @keyframes slideInUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `
};

// 애니메이션 유틸리티 함수들
export const animationUtils = {
  // 애니메이션 적용 함수
  apply: (animationName, duration = '1s', timing = 'ease', iteration = '1') => {
    return `
      animation: ${animationName} ${duration} ${timing} ${iteration};
    `;
  },

  // 인라인 애니메이션 스타일 생성
  createInline: (animationName, duration = '1s', timing = 'ease', iteration = '1') => {
    return {
      animation: `${animationName} ${duration} ${timing} ${iteration}`
    };
  }
};

// 자주 사용되는 애니메이션 조합들
export const commonAnimations = {
  // 툴팁 둥둥거리기
  tooltipFloat: `
    ${animations.float}
    animation: float 1.5s ease-in-out infinite;
  `,

  // 버튼 호버 효과
  buttonHover: `
    ${animations.pulse}
    &:hover {
      animation: pulse 0.3s ease-in-out;
    }
  `,

  // 모달 등장 효과
  modalEnter: `
    ${animations.fadeIn}
    animation: fadeIn 0.3s ease-out;
  `,

  // 알림 흔들기
  notificationShake: `
    ${animations.shake}
    animation: shake 0.5s ease-in-out;
  `,

  // 로딩 스피너
  loadingSpinner: `
    ${animations.rotate}
    animation: rotate 1s linear infinite;
  `
};
