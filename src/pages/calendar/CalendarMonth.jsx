import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './Calendar.css';
import S from './style2';

const CalendarMonth = ({ onDateClick, onEventClick, refreshKey = 0, initialDate }) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);
  const calendarRef = useRef(null);
  console.log("refreshKey", refreshKey);

  const [schedules, setSchedules] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [viewYear, setViewYear] = useState(
    new Date(initialDate || Date.now()).getFullYear()
  );
  

<<<<<<< HEAD
  // 월별 캘린더 날짜 클릭했을때
  const handleDateClick = (info) => {
=======
  useEffect(() => {
    let aborted = false; // 안전 장치(언마운트 중 setState 방지)

    const getSchedulesNames = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/calendar/api/month-schedules/${user_id}`
        );

        if (!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }

        const data = await response.json();
        const schedules = data.schedules;
        setSchedules(schedules);

      } catch (err) {
        console.error("일정 불러오기 실패:", err);
      }
    };

    if (user_id) {
      getSchedulesNames();
    }
  }, [user_id, refreshKey]); // user_id 바뀌면 다시 실행, 일정 추가할때마다(모달 열릴 때 마다)

  useEffect(() => {
    let aborted = false; // 안전 장치(언마운트 중 setState 방지)

    const getBirthdays = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/calendar/api/birthdays/${user_id}`
        );

        if (!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }

        const data = await response.json();
        const birthdays = data.birthdays;
        setBirthdays(birthdays);
        console.log("생일좌 ", birthdays);

      } catch (err) {
        console.error("생일 불러오기 실패:", err);
      }
    };

    if (user_id) {
      getBirthdays();
    }
  }, [user_id]); // user_id 바뀌면 다시 실행, 일정 추가할때마다(모달 열릴 때 마다)

  // 캘린더 버전으로 매핑
  const calendarEvents = useMemo(() => {
    const scheduleEvents = (schedules || []).map((s) => {
      const hasTime = s.time && /^\d{2}:\d{2}$/.test(s.time); // "18:00" 등
      const start = hasTime ? `${s.date}T${s.time}` : s.date;  // "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm"

      return {
        id: String(s._id || s.id),
        title: s.title,
        start,
        allDay: !hasTime,
        extendedProps: { schedule: s },
      };
    });

    const birthdayEvents = (birthdays || []).map((b) => ({
      id: `bday-${viewYear}-${b._id || b.id || b.user_id || b.date}`,
      title: `🎂 ${b.name} 생일`,
      start: `${viewYear}-${b.date}`, // 'YYYY-MM-DD'로 보정
      allDay: true,
      // 색상 커스텀
      color: '#F74C26',
      textColor: '#000000',
      // 맨 위 정렬 + 클릭 방지용 플래그
      extendedProps: { kind: 'birthday' },
    }));

    return [...birthdayEvents, ...scheduleEvents];
  }, [schedules, birthdays, viewYear]);


  // 월별 캘린더 날짜 클릭했을때
  const handleDateClick = (info) => { 
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
    const clickedDate = info.dateStr;
    onDateClick(clickedDate);
  };

  // 월별 캘린더 일정제목 클릭했을때
  const handleEventClick = (info) => {
    // 생일은 클릭 막아놓음
    if(info.event.extendedProps?.kind === 'birthday'){
      return;
    }
    const scheduleInfo = info.event.extendedProps?.schedule;
    const scheduleDate = info.event.startStr.slice(0, 10);
    onEventClick(scheduleInfo, scheduleDate);
  };

  return (
    <S.CalendarContainer>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={initialDate}
        events={calendarEvents}
        datesSet={(info) => setViewYear(info.start.getFullYear())}
        displayEventTime={false} 
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        eventColor="#FFDECD"
        eventTextColor="#000000"
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next'
        }}
        eventContent={(arg) => (
          <div style={{ fontWeight: 300, marginLeft: 5 }}>{arg.event.title}</div>
        )}
        // 생일
        eventOrder={(a, b) => {
          const pa = a.extendedProps?.kind === 'birthday' ? -1 : 0;
          const pb = b.extendedProps?.kind === 'birthday' ? -1 : 0;
          if (pa !== pb) return pa - pb; // birthday(-1) 먼저
          // 같은 종류면 제목으로 보조 정렬
          return (a.title || '').localeCompare(b.title || '');
        }}
        // eventDidMount={(info) => {
        //   if (info.event.extendedProps?.kind === 'birthday') {
        //     info.el.style.setProperty('--fc-event-bg-color', '#F74C26');
        //     info.el.style.setProperty('--fc-event-border-color', '#F74C26');
        //     info.el.style.setProperty('--fc-event-text-color', '#ffffff');
        //   }
        // }}
      />
    </S.CalendarContainer>
  );
};

export default CalendarMonth;
