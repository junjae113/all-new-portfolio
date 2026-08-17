import styled, { css } from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import { flexColumnCenter } from "../../styles/common";

const S = {};

S.Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7); /* dimmed */
  display: flex;
  align-items: center;
  justify-content: center;
  ${spacingProps}
`;

S.Wrapper = styled.div`
  ${flexColumnCenter};
  background: #fff;
  border-radius: 32px;
  padding: 36px 44px;
  text-align: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  ${spacingProps}
`;

S.WrapperLarge = styled.div`
  ${flexColumnCenter};
  background: #fff;
  border-radius: 32px;
  padding: 64px;
  text-align: center;
  ${spacingProps}
`;

S.ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-direction: ${({ $count }) => ($count > 1 ? "row" : "column")};
  ${spacingProps}
`;

export default S;
