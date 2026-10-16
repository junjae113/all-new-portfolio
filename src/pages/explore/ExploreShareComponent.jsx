import React from 'react';
import S from './style';
import Text from '../../components/text/size';
import BasicButton from '../../components/button/BasicButton';
import { useNavigate } from 'react-router-dom';

const ExploreShareComponent = () => {

  const link = useNavigate("")

  return (
    <S.ShareContentWrapper>
      <S.ShareTextWrppaer>
          <Text.Body3 style={{color : "#CF4B05"}} >STEP 2. 나누기</Text.Body3>
          <Text.H6>다른 보호자들과<br />이야기를 나눠요</Text.H6>
          <Text.Body3>멍캘린더에 일정을 넣으면 다가오는 일정을 챙겨 주고,<br />끝난 일정에는 사진과 함께 일기를 남길 수 있어요</Text.Body3>
            <BasicButton basicButton="large" variant="filled" onClick={() => link("/sign-up")} >가입하고 커뮤니티 구경하기</BasicButton>
      </S.ShareTextWrppaer>
      <S.CommunityImage src='/assets/img/community.png' alt='커뮤니티' />
    </S.ShareContentWrapper>
  );
};

export default ExploreShareComponent;