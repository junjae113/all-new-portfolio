import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import theme from '../../styles/theme';
import S from './style2';

const CompletedSchedule = (item) => {
  const completed = [
    { id: 1, title: "Taking a walk by the Han River" },
    { id: 2, title: "Completed project review" },
  ];
=======
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import theme from '../../styles/theme';
import S from './style2';

const CompletedSchedule = ({ refreshKey = 0, onOpenDay }) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);
  
    const [schedules, setSchedules] = useState([]);
  
    useEffect(() => {
      const getComingSchedules = async () => {
        try {
          const res = await fetch(
            `http://localhost:8000/calendar/api/completed-schedules/${user_id}`
          );
  
          if (!res.ok) throw new Error(`서버 응답 에러: ${res.status}`);
          const data = await res.json();
          console.log("다가오는 일정 : ", data);
          setSchedules(data.pastSchedules ?? []);
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
                        pt={20} pl={20} pr={20}> 
      <S.MainTitle>완료된 일정, 일기를 남겨주세요!</S.MainTitle>                 
      <S.ScheduleContainer>
<<<<<<< HEAD
        {completed.map((complete) => (
          <S.ScheduleItem key={complete.id}>
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: theme.PALLETE.tertiary.main, width: '24px', height: '24px' }} />
            <S.ScheduleText>
              <S.ScheduleLabel>완료된 일정</S.ScheduleLabel>
              <S.ScheduleTitle>{complete.title}</S.ScheduleTitle>
=======
        {schedules.map((schedule) => (
          <S.ScheduleItem 
            key={schedule.id}
            role='button'
            tabIndex={0}
            onClick={() => handleClick(schedule)}
            onKeyDown={(e) => e.key === 'Enter' && handleClick(schedule)}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: theme.PALLETE.tertiary.main, width: '24px', height: '24px' }} />
            <S.ScheduleText>
              <S.ScheduleLabel>완료된 일정</S.ScheduleLabel>
              <S.ScheduleTitle>{schedule.title}</S.ScheduleTitle>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
            </S.ScheduleText>
          </S.ScheduleItem>
        ))}
      </S.ScheduleContainer>
    </S.InputWrapper>
  );
};

export default CompletedSchedule;
