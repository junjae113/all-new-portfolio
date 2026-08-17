import React, { useState } from 'react';
import S from './style';
import CommunityInputContainer from './CommunityInputContainer';
import CommunitySelect from './CommunitySelect';
import CommunityNoText from './CommunityNoText';
import Accordion from '../../components/accordion/Accordion';
import ButtonWithInput from '../../components/input/ButtonWithInput';
import BasicButton from '../../components/button/BasicButton';
import Header from '../../components/layout/header/Header';



const Community = () => {
  const [activeFilter, setActiveFilter] = useState("최신순")

  return (
    < >
      <S.Background >
        <S.Wrapper>
          <CommunitySelect activeFilter={activeFilter} onChange={setActiveFilter}/>
          <CommunityInputContainer activeFilter={activeFilter}/>
          

        </S.Wrapper>
      </S.Background>
    </>
  );
};    

export default Community;