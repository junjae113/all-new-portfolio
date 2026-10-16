import React, { useState } from 'react';
import S from './style.js';
import Text from '../../components/text/size.js';
import useAuth from '../../components/auth/useAuth.js';
import ExploreLogInComponent from './ExploreLogInComponent.jsx';
import ExploreLogOutComponent from './ExploreLogOutComponent.jsx';

const Explore = () => {

  const { isLogin } = useAuth();

  return (
    <div>
      <S.Banner>
        <Text.Body2>멍픽 둘러보기</Text.Body2>
        <S.TitleWrapper>
          <Text.H4>반려견의 일상 기록,</Text.H4>
          <Text.H4>멍픽에서는 이렇게 해요</Text.H4>
        </S.TitleWrapper>
        <div>우리 아이를 기록하고, 다른 보호자와 이야기를 나눠요</div>
      </S.Banner>
      {isLogin ? (
        <ExploreLogInComponent />
      ) : (
        <ExploreLogOutComponent />
      )}
    </div>
  );
};

export default Explore;