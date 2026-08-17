import { css } from "styled-components";


export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;
export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const flexRow = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const flexSpaceBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const wrapper = css`
  width: 100%;
  box-sizing: border-box;
  margin-top: 100px;
`;

export const container = css`
  width: 100%;
  padding: 0 240px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: ${({ backgroundColor = "#fff" }) => backgroundColor};
`;

export const SignUpContainerStyles = css`
  width: 100%;
  padding: 0 240px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: ${({ backgroundColor = "#fff" }) => backgroundColor};
`;



