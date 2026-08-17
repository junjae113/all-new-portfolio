import styled, { css } from "styled-components";
import { spacingProps } from "../../styles/spacingProps";

const S = {};

S.RadioWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  ${spacingProps}
`;

S.RadioLabel = styled.span`
  ${({ size }) => {
    switch (size) {
      case "L":
        return css`
          font-size: 30px;
          font-weight: 600;
          line-height: 38px;
        `;
      case "M":
        return css`
          font-size: 20px;
          font-weight: 500;
          line-height: 22px;
        `;
      case "S":
        return css`
          font-size: 12px;
          font-weight: 400;
          line-height: 14px;
        `;
      default:
        return null;
    }
  }}
`;

export default S;
