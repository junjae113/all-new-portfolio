import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import { useSelector } from 'react-redux';
import useComingSchedules from '../../hooks/CalendarAPI/useComingSchedules';
import theme from '../../styles/theme';
import S from './style2';

const ComingSchedule = (item) => {
  // user_id는 전역에 있는거 가져다 쓰기
  // Redux에서 currentUser 가져오기
  const currentUser = useSelector((state) => state.user.currentUser);
  const user_Id = currentUser?.user_Id; // 백에서 내려주는 필드명에 맞춰서 변경

  // 훅함수(5초마다 자동 갱신)
  const { data: schedules, loading, error } = useComingSchedules(user_Id, { pollMs: 5000 });

  // 로딩 - 로딩 아이콘 띄우기
  {loading && <p>불러오는 중…</p>}

  // 에러 - 에러 팝업 띄우기
  {error && <p style={{ color: 'red' }}>에러: {error.message}</p>}

  // const schedules = [
  //   { id: 1, title: "소울이 생일파티" },
  //   { id: 2, title: "Meeting with team" },  
  // ];
=======
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import theme from '../../styles/theme';
import S from './style2';


const ComingSchedule = ({ refreshKey = 0, onOpenDay }) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const getComingSchedules = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/calendar/api/coming-schedules/${user_id}`
        );

        if (!res.ok) throw new Error(`서버 응답 에러: ${res.status}`);
        const data = await res.json();
        console.log("다가오는 일정 : ", data);
        setSchedules(data.comingSchedules ?? []);
      } catch (err) {
        console.error("일정 불러오기 실패: ", err)
      }
    };

    getComingSchedules();
  }, [user_id, refreshKey]);

  // 일정 클릭시
  const handleClick = useCallback((schedule) => {
    onOpenDay?.(schedule);  // 전체 객체 그대로 전달
  }, [onOpenDay]);

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

  return (
    <S.InputWrapper mt={20} mr={0} mb={20} ml={10}
                    pt={20} pl={20} pb={1} pr={20}>
      <S.MainTitle>다가오는 일정</S.MainTitle>
<<<<<<< HEAD
      {(!loading && schedules?.length === 0) && <S.ScheduleLabel>예정된 일정이 없습니다.</S.ScheduleLabel>}
      <S.ScheduleContainer>
        {schedules.map((schedule) => (
          <S.ScheduleItem key={schedule.id}>
=======
      {/* {(!schedules && schedules?.length === 0) && <S.ScheduleLabel>예정된 일정이 없습니다.</S.ScheduleLabel>} */}
      <S.ScheduleContainer>
        {schedules.map((schedule) => (
          <S.ScheduleItem 
            key={schedule.id}
            role='button'
            tabIndex={0}
            onClick={() => handleClick(schedule)}
            onKeyDown={(e) => e.key === 'Enter' && handleClick(schedule)}
            style={{ cursor: 'pointer' }}
          >
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: theme.PALLETE.secondary.main, width: '24px', height: '24px' }} />
            <S.ScheduleText>
              <S.ScheduleLabel>예정된 일정</S.ScheduleLabel>
              <S.ScheduleTitle>{schedule.title}</S.ScheduleTitle>
            </S.ScheduleText>
          </S.ScheduleItem>
        ))}
      </S.ScheduleContainer>
    </S.InputWrapper>
  );
};

export default ComingSchedule;
