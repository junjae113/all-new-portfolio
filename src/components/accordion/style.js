import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";

const S = {};

S.AccordionWrapper = styled.div`
  border-bottom: 1px solid #dedede;
  background: #f9f9f9;
  ${spacingProps}
`;

S.QuestionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;
  background: #fff;
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
  }
`;

S.AnswerBox = styled.div`
  padding: 30px 40px;
  background: #fff;
  font-size: ${({ theme }) => theme.FONT_SIZE.caption1};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.caption1};
  color: ${({ theme }) => theme.PALLETE.text.sub2};
`;

export default S;
