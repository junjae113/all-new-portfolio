import styled, { css } from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import { flexCenter } from "../../styles/common";
import { animations, commonAnimations } from "../../styles/animations";

//케이스에 따른 분류
const variantCSS = {
  default: css`
    background-color: ${({ theme }) => theme.PALLETE.white};
    color: ${({ theme }) => theme.PALLETE.primary["main"]};
    border: 1px solid ${({ theme }) => theme.PALLETE.primary["main"]};
  `,
  filled: css`
    background-color: ${({ theme }) => theme.PALLETE.primary["main"]};
    color: ${({ theme }) => theme.PALLETE.text["white"]};
    border: 1px solid ${({ theme }) => theme.PALLETE.primary["main"]};
  `,
  gray: css`
    background-color: ${({ theme }) => theme.PALLETE.background["gray200"]};
    color: ${({ theme }) => theme.PALLETE.text["main"]};
    border: 1px solid ${({ theme }) => theme.PALLETE.background["gray200"]};
  `,
  disabled: css`
    background-color: ${({ theme }) => theme.PALLETE.background["gray200"]};
    color: ${({ theme }) => theme.PALLETE.text.disabled["strong"]};
    border: 1px solid ${({ theme }) => theme.PALLETE.background["gray200"]};
  `,
};

// 사각형 형태의 버튼
const basicButtonCSS = {
  superSmall: css`
    padding: ${({ theme }) => `${theme.SPACING["18"]} ${theme.SPACING["36"]}`};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.FONT_SIZE["body4"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
    line-height: 1;
  `,
  small: css`
    padding: ${({ theme }) => `${theme.SPACING["18"]} ${theme.SPACING["78"]}`};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.FONT_SIZE["body3"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
    line-height: 1;
  `,
  medium: css`
    padding: ${({ theme }) => `${theme.SPACING["18"]} ${theme.SPACING["148"]}`};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.FONT_SIZE["body2"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
    line-height: 1;
  `,
  large: css`
    padding-top: ${({ theme }) => `${theme.SPACING["18"]}`};
    padding-bottom: ${({ theme }) => `${theme.SPACING["18"]}`};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.FONT_SIZE["body2"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
    line-height: 1;
    width: 100%;
  `,
};

// 둥근 형태의 버튼
const roundButtonCSS = {
  superSmall: css`
    padding: ${({ theme }) => `${theme.SPACING["10"]} ${theme.SPACING["12"]}`};
    border-radius: 52px;
    font-size: ${({ theme }) => theme.FONT_SIZE["button4"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
    line-height: 1;
  `,
  small: css`
    padding: ${({ theme }) => `${theme.SPACING["12"]} ${theme.SPACING["32"]}`};
    border-radius: 52px;
    font-size: ${({ theme }) => theme.FONT_SIZE["button3"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
    line-height: 1;
  `,
  medium: css`
    padding: ${({ theme }) => `${theme.SPACING["20"]} ${theme.SPACING["54"]}`};
    border-radius: 52px;
    font-size: ${({ theme }) => theme.FONT_SIZE["button2"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
    line-height: 1;
  `,
  large: css`
    padding: ${({ theme }) => `${theme.SPACING["28"]} ${theme.SPACING["84"]}`};
    border-radius: 52px;
    font-size: ${({ theme }) => theme.FONT_SIZE["button1"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
    line-height: 1;
  `,
};

const Button = styled.button`
  ${({ roundButton }) => roundButtonCSS[roundButton]}
  ${({ basicButton }) => basicButtonCSS[basicButton]}
  ${({ variant }) => variantCSS[variant]}
  gap: 0 8px;
  ${spacingProps}
  ${flexCenter};
  
  // 호버 애니메이션 추가
  transition: transform 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }

  // disabled 속성일 때 강제 스타일
  &:disabled {
    background-color: ${({ theme }) => theme.PALLETE.background["gray200"]};
    color: ${({ theme }) => theme.PALLETE.text.disabled["strong"]};
    border: 1px solid ${({ theme }) => theme.PALLETE.background["gray200"]};
    cursor: not-allowed;
    
    &:hover {
      transform: none;
    }
  }
`;

export default Button;
