import React from 'react';
import S from './style';
import Text from '../../components/text/size';
import BasicButton from '../../components/button/BasicButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faHashtag, faShieldDog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../components/auth/useAuth';

const ExploreRecordComponent = () => {

    const link = useNavigate("")
    const { userId } = useAuth("")

  return (
    <S.RecordWrapper>
      <S.RecordFirstContentWrapper>
        <S.RecordPhotoWrapper>
          <S.ProfileImage src='/assets/img/profileCard.png' alt='프로필카드' />
        </S.RecordPhotoWrapper>
        <S.RecordFirstTextWrppaer>
            <Text.Body3 style={{color : "#CF4B05"}} >STEP 1. 기록하기</Text.Body3>
            <Text.H6>우리 아이의 모든 것을<br />한 장의 프로필로</Text.H6>
            <Text.Body3>성격, 좋아하는 것, 조심해야 할 것<br />알러지와 예방접종 기록까지 한 장에 담아요</Text.Body3>
            { userId ? (
              <S.SignUpLinkBannerWrapper>
                <Text.Body1><FontAwesomeIcon icon={faShieldDog} style={{color : "#CF4B05"}} /> 지금 바로 DBTI를 업데이트 할 수 있어요</Text.Body1>
                <Text.Body3>12문항으로 알아본 성격 유형이<br />프로필에 <FontAwesomeIcon icon={faHashtag} style={{color : "#CF4B05"}} /> 태그로 붙어요</Text.Body3>
                <BasicButton basicButton="large" variant="filled" onClick = {() => link("/profile/add?mode=edit#dbti")} >DBTI 재검사하기</BasicButton>
              </S.SignUpLinkBannerWrapper>
            ) : (
              <S.SignUpLinkBannerWrapper>
                <Text.Body1><FontAwesomeIcon icon={faShieldDog} style={{color : "#CF4B05"}} /> 가입하면 DBTI 테스트도 할 수 있어요</Text.Body1>
                <Text.Body3>12문항으로 알아본 성격 유형이<br />프로필에 <FontAwesomeIcon icon={faHashtag} style={{color : "#CF4B05"}} /> 태그로 붙어요</Text.Body3>
                <BasicButton basicButton="large" variant="filled" onClick = {() => link("/sign-up")} >가입하고 프로필 만들기</BasicButton>
              </S.SignUpLinkBannerWrapper>
            ) }
        </S.RecordFirstTextWrppaer>
      </S.RecordFirstContentWrapper>
      <S.RecordSecondContentWrapper>
        <S.RecordSecondTextWrppaer>
            <Text.Body3 style={{color : "#CF4B05"}} >STEP 1. 기록하기</Text.Body3>
            <Text.H6>병원, 미용, 산책 약속<br />놓치지 않게</Text.H6>
            <Text.Body3>멍캘린더에 일정을 넣으면 다가오는 일정을 챙겨 주고,<br />끝난 일정에는 사진과 함께 일기를 남길 수 있어요</Text.Body3>
          <S.CalendarCompenetWrapper>
            <S.PlanWrapper src='/assets/img/plan.png' />
            <S.DairyWrapper src='assets/img/dairy.png' />
          </S.CalendarCompenetWrapper>
        </S.RecordSecondTextWrppaer>
        <S.RecordPhotoWrapper>
          <S.CalendarImage src='/assets/img/calendar.PNG' alt='캘린더' />
        </S.RecordPhotoWrapper>
      </S.RecordSecondContentWrapper>
    </S.RecordWrapper>
  );
};

export default ExploreRecordComponent;