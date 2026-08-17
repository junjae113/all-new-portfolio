import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import { useState } from 'react';
=======
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
import theme from '../../styles/theme.js';
import S from './style.js';


<<<<<<< HEAD
const ScheduleAlert = ({ chat }) => {
  const [activeTab, setActiveTab] = useState('schedule'); // 일정, 이미지 탭
  // chat 객체 받은거 넣기
  const activeChat = chat || {
    id: 0,
    name: '',
    avatar: '/assets/img/chat/dogEmptyProfile.png',
  };

  const schedules = [
    { id: 1, title: 'Taking a walk by the Han River' },
    { id: 2, title: "Soul's birthday party" },
    { id: 1, title: 'Taking a walk by the Han River' },
    { id: 2, title: "Soul's birthday party" },
    { id: 1, title: 'Taking a walk by the Han River' },
    { id: 2, title: "생일파티" },
    { id: 1, title: 'Taking a walk by the Han River' },
    { id: 2, title: "Soul's birthday party" },
    { id: 2, title: "생일파티" },
    { id: 1, title: 'Taking a walk by the Han River' },
    { id: 2, title: "Soul's birthday party" },
  ]; 
=======

const ScheduleAlert = ({ chat, freshKey = 0 }) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);
  const [activeTab, setActiveTab] = useState('schedule'); // 일정, 이미지 탭
  const [schedules, setSchedules] = useState([]);
  const [images, setImages] = useState([]);
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

  // chat 객체 받은거 넣기
  const activeChat = chat || {
    id: 0,
    target_name: '채팅방을 선택해주세요',
    target_profile_img: '/assets/img/chat/dogEmptyProfile.png',
  };

  const roomId = useMemo(() => {
    const id = chat?.match_id ?? chat?._id ?? chat?.id;
    return id == null ? null : String(id);
  }, [chat])

  // chat객체의 id로 schedule 객체의 title만 가져오기
  // -> 현재 날짜 이후의 날짜의 schedule title만 가져오기
  // 최신 일정 -> 상단에 띄우기

  // 넘겨받은 chat객체에 id를 받아서 그걸로 api연동 
  // -> message객체의 이미지 배열 -> 이미지 url뿌리기
  // 최신 이미지 보낸시간 -> 상단에 띄우기

  // 일정 모아보기
  useEffect(() => {
    if(!user_id || !roomId) {
      setSchedules([]);
      return;
    }
    const getComingSchedules = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/calendar/api/coming-schedules?user_id=${user_id}&match_id=${roomId}`
        );

        if (!res.ok) throw new Error(`서버 응답 에러: ${res.status}`);
        const data = await res.json();
        console.log("다가오는 일정 : ", data);
        // setSchedules(data.comingSchedules ?? []);
        setSchedules(Array.isArray(data?.comingSchedules) ? data.comingSchedules : []);
      } catch (err) {
        console.error("일정 불러오기 실패: ", err);
        setSchedules([]);
      }
    };

    getComingSchedules();
  }, [user_id, roomId]);


  // 사진 모아보기
  useEffect(() => {
    const getChatPictures = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/chatting/api/get-chatMessage/${roomId}`
        );

        if (!res.ok) throw new Error(`서버 응답 에러: ${res.status}`);
        const data = await res.json();
        const messages = data.messages;

        // 모든 images_url을 하나의 배열로 모으기
        const allImages = messages.flatMap(m => {
          if (!m?.images_url) return [];
          return Array.isArray(m.images_url) ? m.images_url : [m.images_url];
        });

        setImages(allImages);
        console.log("allImages", allImages);
        
      } catch (err) {
        console.error("사진 불러오기 실패: ", err)
      }
    };

    getChatPictures();
  }, [user_id, roomId, freshKey]);

<<<<<<< HEAD
  // chat객체의 id로 schedule 객체의 title만 가져오기
  // -> 현재 날짜 이후의 날짜의 schedule title만 가져오기
  // 최신 일정 -> 상단에 띄우기

  // 넘겨받은 chat객체에 id를 받아서 그걸로 api연동 
  // -> message객체의 이미지 배열 -> 이미지 url뿌리기
  // 최신 이미지 보낸시간 -> 상단에 띄우기

  return (
    <S.ScheduleAlert>
      <S.ScheduleProfileSection>
        <S.ScheduleProfileAvatar src={activeChat.avatar} alt={activeChat.name} />
        <S.ScheduleProfileName>{activeChat.name}</S.ScheduleProfileName>
      </S.ScheduleProfileSection>

=======
  return (
    <S.ScheduleAlert>
      <S.ScheduleProfileSection>
        <S.ScheduleProfileAvatar src={activeChat.target_profile_img} alt={activeChat.target_name} />
        <S.ScheduleProfileName>{activeChat.target_name}</S.ScheduleProfileName>
      </S.ScheduleProfileSection>

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
      <S.ScheduleTabs>
        <S.ScheduleTabButton
          className={activeTab === 'schedule' ? 'active' : ''}
          onClick={() => setActiveTab('schedule')}
        >
          일정
        </S.ScheduleTabButton>
        <S.ScheduleTabButton
          className={activeTab === 'images' ? 'active' : ''}
          onClick={() => setActiveTab('images')}
        >
          이미지
        </S.ScheduleTabButton>
      </S.ScheduleTabs>

      {activeTab === 'schedule' ? (
        <S.ScheduleList>
<<<<<<< HEAD
          {schedules.map((s) => (
            // 일정 아이템 클릭되게 해서 -> 일별 캘린더로 이동하게 하기
            <S.ScheduleItem key={s.id}>
=======
          {schedules.map((schedule) => (
            // 일정 아이템 클릭되게 해서 -> 일별 캘린더로 이동하게 하기
            <S.ScheduleItem key={schedule._id}>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
              <S.ScheduleIcon>
                <FontAwesomeIcon icon={faCircleCheck} style={{ color: theme.PALLETE.secondary.main, width: '24px', height: '24px' }} />
              </S.ScheduleIcon>
              <S.ScheduleText>
                <S.ScheduleLabel>예정된 일정</S.ScheduleLabel>
<<<<<<< HEAD
                <S.ScheduleTitle>{s.title}</S.ScheduleTitle>
=======
                <S.ScheduleTitle>{schedule.title}</S.ScheduleTitle>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
              </S.ScheduleText>
              <S.ScheduleDivider />
            </S.ScheduleItem>
            // touchable로 감싸기
          ))}
        </S.ScheduleList>
      ) : (
        <S.ScheduleImageGallery>
<<<<<<< HEAD
          {images.map((img) => (
            <S.ScheduleGalleryImg key={img.id} src={img.src} alt={img.alt} />
=======
          {images.map((url, i) => (
            <S.ScheduleGalleryImg 
              key={`${url}-${i}`} 
              src={url} 
              alt={`chat_img_${i}`} 
            />
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
          ))}
        </S.ScheduleImageGallery>
      )}
    </S.ScheduleAlert>
  );
};

export default ScheduleAlert;
