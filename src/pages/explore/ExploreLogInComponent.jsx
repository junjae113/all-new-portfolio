import React, { useEffect, useState } from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendarDays, faHashtag, faShieldDog } from '@fortawesome/free-solid-svg-icons';
import Text from '../../components/text/size';
import useAuth from '../../components/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import BasicButton from '../../components/button/BasicButton';

const ExploreLogInComponent = () => {

  const [ dogName, setDogName ] = useState("");
  const [ charactor, setCharactor ] = useState("");
  const [ charactorDetail, setCharactorDetail ] = useState("");
  const [ nextSchedule, setNextSchedule ] = useState(null);
  const [ pastSchedule, setPastSchedule ] = useState(null)
  const { userId } = useAuth("");

  const link = useNavigate("")

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`)
    .then(response => response.json())
    .then((data) => {
      setDogName(data.user.dogProfile.name);
      setCharactor(data.user.dogProfile.charactor.split("(")[0].trim())
      setCharactorDetail(data.user.dogProfile.charactor.split("(")[1].slice(0, -1));
    })
  }, [userId])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/calendar/api/coming-schedules/${userId}`)
    .then(response => response.json())
    .then((data) => {
      setNextSchedule(data.comingSchedules?.[0] ?? null);
    })
    .catch(err => console.error("다가오는 일정 불러오기 실패", err));
  }, [userId]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/calendar/api/completed-schedules/${userId}`)
    .then(response => response.json())
    .then((data) => {
      setPastSchedule(data.pastSchedules.length);
    })
    .catch(err => console.error("지난 일정 불러오기 실패", err));
  }, [userId]);
  
  return (
    <div>
      <S.LogInRecordWrapper>
        <Text.Body3 style={{color : "#CF4B05"}} >STEP 1. 기록하기</Text.Body3>
        <Text.H6>병원, 미용, 산책 약속 놓치지 않게</Text.H6>
        <S.LogInBannersWrapper>
          <S.LinkBanner>
            <Text.Body1>
              <FontAwesomeIcon size='lg' icon={faShieldDog} style={{color : "#CF4B05"}}/>&nbsp;&nbsp;&nbsp;프로필
            </Text.Body1>
            <S.LinkBannerTextWrapper>
              <Text.Body3>
                {dogName}는 <FontAwesomeIcon icon={faHashtag} size='sm' style={{color : "#CF4B05"}} /><span style={{color: "#CF4B05", fontWeight : "bold"}}>{charactor}</span>
              </Text.Body3>
              <div>{charactorDetail}</div>
            </S.LinkBannerTextWrapper>
            <button style={{color : "#CF4B05", backgroundColor : "transparent"}} onClick={() => link("/my-page")} >
              <Text.Body3>
                프로필 보기
              </Text.Body3>
              </button>
          </S.LinkBanner>
          <S.LinkBanner>
            <Text.Body1>
              <FontAwesomeIcon size='lg' icon={faCalendarDays} style={{color : "#CF4B05"}}/>&nbsp;&nbsp;&nbsp;다가오는 일정
            </Text.Body1>
            <S.LinkBannerTextWrapper>
              {nextSchedule ? (
                <div>
                  <Text.Body3>
                    {nextSchedule.date.split("-").join(".")} {nextSchedule.title}
                  </Text.Body3>
                  <div>{nextSchedule.location}</div>
                </div>
              ) : (
                <div>
                  <Text.Body3>아직 일정이 없어요</Text.Body3>
                  <div>다가오는 일정을 추가해보세요</div>
                </div>
              )}
            </S.LinkBannerTextWrapper>
            <button style={{color : "#CF4B05", backgroundColor : "transparent"}} onClick={() => link("/calendar")} >
              <Text.Body3>
                일정 관리하기
              </Text.Body3>
              </button>
          </S.LinkBanner>
          <S.LinkBanner>
            <Text.Body1>
              <FontAwesomeIcon size='lg' icon={faBook} style={{color : "#CF4B05"}}/>&nbsp;&nbsp;&nbsp;완료한 일정
            </Text.Body1>
            <S.LinkBannerTextWrapper>
              {pastSchedule ? (
                <div>
                  <Text.Body3>
                    지난 일정이 <span style={{color : "#CF4B05", fontWeight : "bold"}}>{pastSchedule}개</span>에
                  </Text.Body3>
                  <div>아직 일기가 없어요</div>
                </div>
              ) : (
                <div>
                  <Text.Body3>일기를 기다리는 일정이 없어요</Text.Body3>
                  <div>일정을 추가하고 완료해보세요</div>
                </div>
              )}
            </S.LinkBannerTextWrapper>
            <button style={{color : "#CF4B05", backgroundColor : "transparent"}} onClick={() => link("/calendar")} >
              <Text.Body3>
                일기 쓰기
              </Text.Body3>
              </button>
          </S.LinkBanner>
        </S.LogInBannersWrapper>
      </S.LogInRecordWrapper>
      <S.ShareContentWrapper>
        <S.ShareTextWrppaer>
          <Text.Body3 style={{color : "#CF4B05"}} >STEP 2. 나누기</Text.Body3>
          <Text.H6>다른 보호자들과<br />이야기를 나눠요</Text.H6>
          <Text.Body3>멍캘린더에 일정을 넣으면 다가오는 일정을 챙겨 주고,<br />끝난 일정에는 사진과 함께 일기를 남길 수 있어요</Text.Body3>
           <BasicButton basicButton="large" variant="filled" onClick={() => link("/community")} >커뮤니티 구경하기</BasicButton>
        </S.ShareTextWrppaer>
        <S.CommunityImage src='/assets/img/community.png' alt='커뮤니티' />
      </S.ShareContentWrapper>
    </div>
  );
};

export default ExploreLogInComponent;