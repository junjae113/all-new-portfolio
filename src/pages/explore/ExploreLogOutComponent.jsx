import React, { useState } from 'react';
import S from './style.js';

import ExploreRecordComponent from './ExploreRecordComponent.jsx';
import ExploreShareComponent from './ExploreShareComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPen } from '@fortawesome/free-solid-svg-icons';


const ExploreLogOutComponent = () => {

  const [recordShare, setRecordShare] = useState(true);
  const link = useNavigate();

  const changeToRecord = () => {
    setRecordShare(true);
  }

  const changeToShare = () => {
    setRecordShare(false);
  }

  return (
    <div>
      <S.ButtonWrapper>
        <S.RecordButton $recordShare={recordShare} onClick={changeToRecord}><FontAwesomeIcon icon={faPen} size='xs' /> 기록하기</S.RecordButton>
        <S.Line></S.Line>
         <S.ShareButton $recordShare={recordShare} onClick={changeToShare}><FontAwesomeIcon icon={faComments} size='xs' /> 나누기</S.ShareButton>
      </S.ButtonWrapper>
      {recordShare ? (
          <ExploreRecordComponent />
        ) : (
          <ExploreShareComponent />
        )
      }
      <S.ExploreCtaBanner>
        <S.ExploreCtaTitle>오늘부터 우리 아이의 기록을 시작해요</S.ExploreCtaTitle>
        <S.ExploreCtaBody>가입하고 강아지 프로필을 등록하면 캘린더와 게시판을 모두 쓸 수 있어요</S.ExploreCtaBody>
        <S.CtaButtonWrapper>
          <S.ExploreSignUpButton basicButton="large" variant="default" onClick={() => link("/sign-up")} >회원가입</S.ExploreSignUpButton>
          <S.ExploreSignInButton basicButton="large" variant="default" onClick={() => link("/sign-in")} > 로그인</S.ExploreSignInButton>
        </S.CtaButtonWrapper>
      </S.ExploreCtaBanner>
    </div>
  );
};

export default ExploreLogOutComponent;