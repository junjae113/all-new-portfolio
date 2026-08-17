import React, { useState } from 'react';
import styled from 'styled-components';
import S from '../textArea/style';


<<<<<<< HEAD
const TextArea = ({placeholder, maxChars, onChange }) => {

  const [text, setText] = useState('');
  const [content, setContent] = useState('');
=======
const TextArea = ({placeholder, maxChars, onChange, onChangeValue}) => {

  const [text, setText] = useState('');
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

  return (
    <S.TextAreaWrapper>
      <S.TextArea
        maxLength={maxChars}
        value={text}
        onChange={(e) => {
          onChange(e);
          setText(e.target.value);
        }}
        placeholder={placeholder}
      />
      <S.CharCount limitReached={text.length >= maxChars}>
        {text.length} / {maxChars}
      </S.CharCount>
    </S.TextAreaWrapper>
  );
}

export default TextArea;