import styled, { keyframes, css } from 'styled-components';
import Text from '../../components/text/size';
import BasicButton from '../../components/button/BasicButton';
import { spacingProps } from '../../styles/spacingProps';

export const HEADER_HEIGHT = 72;

const S = {};

/* Header */
S.Header = styled.header`
  height: ${HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background: ${({ theme }) => theme.PALLETE.background.white};
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.background.gray100};
`;

/* Progress */
S.Progress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 8px;
`;
S.StepDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active, theme }) =>
    active ? theme.PALLETE.primary.main : theme.PALLETE.background.gray200};
`;

/* Container */
S.Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px 80px;
`;

/* Title */
S.QuestionTitle = styled(Text.H6)`
  ${spacingProps};
  text-align: center;
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;

  span {
    white-space: nowrap;
    background-color: ${({ theme }) => theme.PALLETE.primary.light};
    padding: 0 8px;
    border-radius: 4px;
  }
`;

/* Options */
S.Options = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin: 32px 0;
`;

S.OptionText = styled(Text.Body2)`
  ${spacingProps};
  margin-bottom: 8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.PALLETE.text.main};
`;

/* 슬라이드 인 애니메이션 */
const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
`;

/* Option Card */
S.OptionCard = styled.div`
  flex: 1;
  height: 260px;
  background: #fbfbfb;
  border: ${({ selected, theme }) =>
    selected
      ? `2px solid ${theme.PALLETE.primary.main}`
      : `2px solid ${theme.PALLETE.background.gray200}`};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 방향에 따라 애니메이션 */
  ${({ dir }) =>
    dir === 'left' &&
    css`
      animation: ${slideInLeft} 0.35s ease;
    `}
  ${({ dir }) =>
    dir === 'right' &&
    css`
      animation: ${slideInRight} 0.35s ease;
    `}

  will-change: transform, opacity;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

/* Buttons */
S.ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

S.PrevButton = styled(BasicButton)`
  width: 120px;
  height: 48px;
  border-radius: 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE.button2};
`;

S.NextButton = styled(BasicButton)`
  width: 120px;
  height: 48px;
  border-radius: 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE.button2};
`;

export default S;
