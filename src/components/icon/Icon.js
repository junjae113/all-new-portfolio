import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { spacingProps } from "../../styles/spacingProps";

const Icon = styled(FontAwesomeIcon)`
  ${spacingProps};
  font-size: ${({ fontSize }) => {
    return fontSize;
  }};
`;

export default Icon;
