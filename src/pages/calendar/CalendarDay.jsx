import { addDays, format, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Diary from './Diary';
import Schedule from './Schedule';
import S from './style2';

<<<<<<< HEAD
const CalendarDay = ({ eventId, onBack, initialDate }) => {
  // 선택된 날짜 관리
  const [selectedDate, setSelectedDate] = useState(initialDate);
=======

const CalendarDay = ({ scheduleInfo, scheduleDate, onBack, initialDate, refreshKey = 0 }) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);
  // 선택된 날짜 관리
  const [selectedDate, setSelectedDate] = useState(
    scheduleInfo?.date ?? initialDate
  );
  const [schedule, setSchedule] = useState(scheduleInfo ?? null);
  const [deleteKey, setDeleteKey] = useState(0);
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

  useEffect(() => {
    setSelectedDate(scheduleInfo?.date ?? initialDate);
  }, [initialDate, scheduleInfo?.date]);


  // 날짜로 일정 불러오기
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/calendar/api/get-schedules/${user_id}?date=${selectedDate}`
        );

        if(!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }

        const data = await response.json();
        const list = Array.isArray(data?.schedules) ? data.schedules.filter(Boolean) : [];
        const wantedId = scheduleInfo?._id ?? scheduleInfo?.id ?? null;
        setSchedule(list.at(0) ?? null);
        const picked = wantedId
          ? list.find(s => String(s._id ?? s.id) === String(wantedId))
          : null;
        setSchedule(picked ?? list.at(0) ?? null);
        console.log("1111받아온 일정: ", schedule);

      } catch (err) {
        console.error("일정 불러오기 실패: ", err)
        setSchedule(null); 
      }
    };

    if(user_id){
      getSchedules();
    }
  }, [user_id, selectedDate, refreshKey, deleteKey, scheduleInfo?.id, scheduleInfo?.id]);
  

  

  const weekStart = startOfWeek(new Date(selectedDate), { weekStartsOn: 0 });

  // selectedDate 기준으로 영문 월 + 연도 표시
  const selectedMonthYear = format(new Date(selectedDate), 'MMMM yyyy');

  const weekDates = Array.from({ length: 7 }).map((_, idx) => {
    const dateObj = addDays(weekStart, idx);
    return {
      day: format(dateObj, 'EEEE'),
      date: format(dateObj, 'yyyy-MM-dd'),
      dayNum: format(dateObj, 'd'),
    };
  });

  // 주간 캘린더로 날짜 변경할 때
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // 일정, 일기 삭제 시 일정 재조회
  const handleDeleted = () => {
    setDeleteKey((k) => k + 1);
  }

  return (
    <S.CalendarDay>
<<<<<<< HEAD
      <S.CalendarDayTitle mt={30} ml={30} mb={30} mr={0}>
=======
      <S.CalendarDayTitle mt={30} ml={30} mb={30} mr={0} onClick={onBack}>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
        {selectedMonthYear}
      </S.CalendarDayTitle>

      <S.CalendarDayHeaderContainer>
        {weekDates.map((d) => (
          <S.WeekDateBox
            key={d.date}
            isSelected={selectedDate === d.date}
            onClick={() => handleDateChange(d.date)}
          >
            <S.HeaderEng>{d.day}</S.HeaderEng>
            <S.HeaderDay>{d.dayNum}</S.HeaderDay>
          </S.WeekDateBox>
        ))}
      </S.CalendarDayHeaderContainer>

<<<<<<< HEAD
      <S.CalendarDayContainer>
        <Schedule eventId={eventId} selectedDate={selectedDate} />
        <Diary eventId={eventId} selectedDate={selectedDate} />
=======
        {/* prop으로 schedule.id 전해주기 */}
      <S.CalendarDayContainer>
        <Schedule 
          selectedSchedule={schedule} 
          selectedDate={selectedDate} 
          onDeleted={handleDeleted}
        />  
        <Diary 
          selectedSchedule={schedule} 
          selectedDate={selectedDate} 
          onDeleted={handleDeleted}
        />
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
      </S.CalendarDayContainer>
    </S.CalendarDay>

  );
};

export default CalendarDay;
