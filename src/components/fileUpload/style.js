import styled, { css } from "styled-components";
import { spacingProps } from "../../styles/spacingProps";

const S = {}

S.Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
  width: 100%;
  height: 100%;
`;

S.HiddenInput = styled.input`
  display: none;
`;

S.UploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 100%;
  flex: 0 0 auto;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
`;

S.DropInput = styled.input`
width: 100%;
    background-color: ${({ theme }) => theme.PALLETE.background.white};
    border: 1px solid
    ${({ theme, status }) =>
            status === 'error'
                    ? theme.PALLETE.text.error
                    : theme.PALLETE.text.sub2};
    border-radius: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE["body3"]};
    line-height: ${({ theme }) => theme.LINE_HEIGHT["body3"]};
    padding: ${({ theme }) => `${theme.SPACING["20"]} ${theme.SPACING["24"]}`};
    ${spacingProps}

    &:hover {
        ${({ readOnly }) =>
                !readOnly &&
                css`
      border-color: ${({ theme }) => theme.PALLETE.primary.main};
    `}
    }
    
    //placeholder 텍스트 색상
    &::placeholder {
        color: ${({ theme }) => theme.PALLETE.text.disabled.weak};
    }

    //입력 다 한 상태
    &:not(:focus):not(:placeholder-shown) {
        border-color: ${({ theme }) => theme.PALLETE.text.main};
        color: ${({ theme }) => theme.PALLETE.text.disabled.strong};
    }
`;

S.DeleteButton = styled.button`
  width: 132px;
  height: 100%;
  flex: 0 0 auto;
  height: 100%;
  background-color: ${({ theme }) => theme.PALLETE.background.gray200};
  color: ${({ theme }) => theme.PALLETE.text.sub};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
`;

export default S;