import styled, { css } from "styled-components";

const S = {}

 S.TextAreaWrapper = styled.div`
 position: relative;
 width: 100%;
 height: 100%;
`

S.TextArea = styled.textarea`
 width: 100%;
 height: 100%;
 border-radius: 8px;
 font-size: 20px;
 padding: 20px 24px;
 resize: none;

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

    //입력중일때
    &:focus {
        ${({ readOnly }) =>
                !readOnly &&
                css`
      outline: none;
      border-color: ${({ theme }) => theme.PALLETE.primary.main};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.PALLETE.primary.light};
    `}
    }

    //disabled 상태일때
    &:disabled {
        outline: none;
        background-color: ${({ theme }) => theme.PALLETE.background.gray100};
        border: none;
    }

    //입력 다 한 상태
    &:not(:focus):not(:placeholder-shown) {
        border-color: ${({ theme }) => theme.PALLETE.text.main};
    }
`

S.CharCount = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  text-align: right;
  font-size: 14px;
  color: ${(props) => (props.limitReached ? 'red' : '#666')};
`;

export default S;