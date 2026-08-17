import styled from "styled-components";
import { flexCenter, flexColumnCenter } from "../../styles/common";

const S = {};

S.ProgressStepWrapper = styled.div`
 ${flexColumnCenter};
  width: 100%;
  margin-top: 200px;
`;

S.StepWrapper = styled.div`
  ${flexCenter};
  margin-top: 54px;
  flex: 1;
  gap: 60px;
`;

S.StepBox = styled.div`
  ${flexColumnCenter};
`;

S.StepIcon = styled.div`
  width: 70px;
  height: 70px;
  svg, img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: ${({ active, completed }) => (active || completed ? 1 : 0.3)};
    color: ${({ active, completed, theme }) =>
      completed ? "#bbb" : active ? theme.PALLETE.primary.main : theme.PALLETE.primary.main};
  }
`;

S.StepLabel = styled.div`
  font-size: 16px;
  margin-top: 16px;
  color: ${({ active, completed, theme }) =>
    (active || completed) ? theme.PALLETE.primary.main : "#B8B8B8"};
  font-weight: 600;
  opacity: 1;
  text-align: center;
`;

S.StepDot = styled.div`
  ${flexCenter};
  gap: 12px;

  span {
    width: 5px;
    height: 5px;
    background: ${({ active, theme }) =>
      active ? theme.PALLETE.primary.main : "#B8B8B8"};
    border-radius: 50%;
    display: inline-block;
  }
`;

export default S; 