import { useState } from 'react';
import dayjs from 'dayjs';

export default function useDatePicker(initialDate = null, dateFormat = 'YYYY-MM-DD') {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  // 날짜를 원하는 포맷의 문자열로 반환
  const formattedDate = selectedDate ? dayjs(selectedDate).format(dateFormat) : '';

  // 날짜 선택 시 상태 변경 함수
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  return {
    selectedDate,
    formattedDate,
    onDateChange,
    setSelectedDate, // 필요시 직접 세팅 가능
  };
}
