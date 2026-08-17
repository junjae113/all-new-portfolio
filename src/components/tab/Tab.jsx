import React from 'react';
import BasicButton from '../button/BasicButton';
import * as S from './style';

const Tab = ({ tabs, activeTab, onTabChange, ...props }) => {
  return (
    <S.TabContainer {...props}>
      {tabs.map((tab, index) => (
        <BasicButton
          key={tab.id}
          roundButton="medium"
          variant={activeTab === tab.id ? "filled" : "default"}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </BasicButton>
      ))}
    </S.TabContainer>
  );
};

export default Tab;
