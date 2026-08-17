import styled, { css } from "styled-components";
import { spacingProps } from "../../styles/spacingProps"; // 경로 확인

const S = {};

S.InputButtonWrapper = styled.div`
  position: relative;
  ${spacingProps}

  button {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  p {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  img {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

S.SelectWrapper = styled.div`
  position: relative;
`;

S.OptionList = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  z-index: 10;
  margin: 0;
  border: 1px solid #a7a7a7;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

S.OptionItem = styled.li`
  padding: 20px 24px;
  cursor: pointer;
  height: 64px;
  font-size: ${({ theme }) => theme.FONT_SIZE["body3"]};
  line-height: ${({ theme }) => theme.LINE_HEIGHT["body3"]};
  color: ${({ theme }) => theme.PALLETE.text.sub};

  &.selected {
    font-weight: 600;
  }

  &:hover {
    background: #fff3f3;
  }
`;

export default S;
