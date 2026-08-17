import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";

const S = {};

S.CheckboxWrapper = styled.div`
  display: inline-flex;
  cursor: pointer;
  ${spacingProps}
`;

S.CheckboxWithLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${spacingProps}
`;

S.IconWrapper = styled.span`
  display: inline-flex;
  margin-right: 8px;
  ${spacingProps}
`;

export default S;
