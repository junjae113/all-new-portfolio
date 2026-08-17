import { format } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import S from './style2';

const MiniCalendar = ({ onDateClick }) => {
  const [selected, setSelected] = useState(new Date()); // 선택한날짜

  // 선택한 날짜 props로 보내기
  const handleDateChange = (date) => {
    setSelected(date);
    const formatted = format(date, 'yyyy-MM-dd');
    onDateClick(formatted);
  };


  return (
    <S.MiniCalendar mt={10} mr={0} mb={10} ml={10}
                        pt={10} pr={0} pb={0} pl={0}
                        >
      <S.CalendarContainer>
        <S.DatePickerWrapper>
          <DatePicker
            selected={selected}
            onChange={handleDateChange}
            inline
            calendarStartDay={0}
          />
        </S.DatePickerWrapper>
      </S.CalendarContainer>
    </S.MiniCalendar>
  );
};

export default MiniCalendar;
