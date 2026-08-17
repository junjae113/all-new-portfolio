import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";

const S = {};

S.Input = styled.input`
  color: ${({ color }) => {
    return color;
  }};
  background-color: ${({ backgroundColor }) => {
    return backgroundColor;
  }};
  ${spacingProps}
`;

export default S;
