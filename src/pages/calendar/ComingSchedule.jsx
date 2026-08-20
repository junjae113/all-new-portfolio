import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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


  return (
    <S.InputWrapper mt={20} mr={0} mb={20} ml={10}
                    pt={20} pl={20} pb={1} pr={20}>
      <S.MainTitle>다가오는 일정</S.MainTitle>
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
