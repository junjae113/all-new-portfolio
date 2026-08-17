import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import ScheduleModal from '../chat/ScheduleModal';
import CalendarDay from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import ComingSchedule from './ComingSchedule';
import CompletedSchedule from './CompletedSchedule';
import MiniCalendar from './MiniCalendar';
import S from './style2';
<<<<<<< HEAD
=======

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

const Calendar = () => {
  // MiniCalendar에서 보낸 selectedDate 관리
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd')); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [viewMode, setViewMode] = useState('month');
  const [refreshKey, setRefreshKey] = useState(0);
  const [viewKey, setViewKey] = useState(0);

  

  // MiniCalendar에서 가져온 날짜 등록
  const handleMiniCalendarDateClick = (date) => {
    setSelectedDate(date);
    setViewMode('day');
  };

  // 월별 캘린더에서 빈날짜칸 눌렀을 때
  // 일정 모달창 열림
  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

<<<<<<< HEAD
  // MiniCalendar에서 가져온 날짜 등록
  const handleMiniCalendarDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEventId('mini'); // mini placeholder for eventId
  };

  // ComingSchedule에서 가져온 item 등록
  const handleComingItemClick = (item) => {
    
  }

  // CompletedSchedule에서 가져온 item 등록
  const handleCompletedItemClick = (item) => {

  } 
  // 선택한 id(miniCalendar인지, calenderMonth인지), 선택한 날짜 보내는 함수
  const handleEventClick = (eventId, eventDate) => {
    setSelectedEventId(eventId);
    setSelectedDate(eventDate);
  };
=======
  // 월별캘린더 일정 제목 클릭 시
  const handleEventClick = (scheduleInfo, scheduleDate) => {
    setSelectedSchedule(scheduleInfo)
    setSelectedDate(scheduleDate);
    setViewMode('day');
  };

  // 다가오는, 완료된 일정 클릭 시
  const handleOpenDay = useCallback((schedule) => {
    setSelectedSchedule(schedule);          // 객체 전체 보관
    setSelectedDate(schedule?.date ?? null);
    setViewMode('day');
    setViewKey(k => k + 1);
  }, []);

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
  // MonthCalender로 이동 -> 이거 나중에 DayCalender 에서 월 클릭하면 연결하기 
  const handleBackToMonth = () => { 
    setViewMode('month');
  };

  // 일정 등록 성공 시 호출될 콜백
  const handleScheduleAdded = () => {
    setRefreshKey((k) => (k + 1));
  }

  return (
    <S.Container>
      <S.Sidebar>
        <MiniCalendar onDateClick={handleMiniCalendarDateClick} />
<<<<<<< HEAD
        <ComingSchedule onComingItemClick={handleComingItemClick} />
        <CompletedSchedule onCompletedItemClick={handleCompletedItemClick} />
      </S.Sidebar>

      <S.Main mt={20} mr={20} mb={20} ml={15}>
        {selectedEventId ? (
=======
        <ComingSchedule 
          refreshKey={refreshKey}
          onOpenDay={handleOpenDay}
        />
        <CompletedSchedule 
          refreshKey={refreshKey}
          onOpenDay={handleOpenDay}
        />
      </S.Sidebar>

      <S.Main mt={20} mr={20} mb={20} ml={15}>
        {viewMode === 'day' ? (
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
          <CalendarDay
            key={`${viewKey}-${selectedSchedule?._id || ''}`}
            scheduleInfo={selectedSchedule}
            onBack={handleBackToMonth}
            initialDate={selectedDate}
            refreshKey={refreshKey}
          />
        ) : (
          <CalendarMonth
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            refreshKey={refreshKey}
            initialDate={selectedDate}
          />
        )}
      </S.Main>

      {isModalOpen && (
        <ScheduleModal
          step={2}
          date={selectedDate}
          onClose={() => setIsModalOpen(false)}
          onAddSchedule={handleScheduleAdded}
        />
      )}
  </S.Container>
  );
};

export default Calendar;
