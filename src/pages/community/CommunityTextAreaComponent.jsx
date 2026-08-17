import React from 'react';
import S from './style';

// 준재님 textarea 컴포넌트를 커뮤니티 용으로 수정한 컴포넌트


const CommunityTextAreaComponent = ({value, onChange, maxChars, placeholder}) => {
  return (
    <S.TextAreaWrapper>
      <S.TextArea
        maxLength={maxChars}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <S.CharCount limitReached={value.length >= maxChars}>
        {value.length} / {maxChars}
      </S.CharCount>
    </S.TextAreaWrapper>
  );
};

export default CommunityTextAreaComponent;