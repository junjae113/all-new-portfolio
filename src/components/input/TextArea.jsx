import React, { useState } from 'react';
import styled from 'styled-components';
import S from './style';


const TextArea = ({placeholder, maxChars}) => {

  const [text, setText] = useState('');

  return (
    <S.TextAreaWrapper>
      <S.TextArea
        maxLength={maxChars}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
      />
      <S.CharCount limitReached={text.length >= maxChars}>
        {text.length} / {maxChars}
      </S.CharCount>
    </S.TextAreaWrapper>
  );
}

export default TextArea;
