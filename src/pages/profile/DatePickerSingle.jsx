import React, { forwardRef, useImperativeHandle, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { getMonth, getYear } from "date-fns";

const StyledDatePicker = styled.div`
  .react-datepicker {
    width: 350px;
    /* height: 400px; */
    box-sizing: border-box;
  }
  .react-datepicker__header {
    height: 80px;
    flex-shrink: 0;
  }
  .react-datepicker__month-container {
    /* height: 320px; */
    overflow: hidden;
  }
  .react-datepicker__day {
    width: 40px;
    height: 40px;
    justify-content: space-between;
    line-height: 40px;
    /* margin: 0px; */
  }

  .react-datepicker__day-name {
    width: 40px;
    height: 30px;
    line-height: 30px;
  }
  .react-datepicker__month {
    flex-direction: column;
  }
`;

const DatePickerSingle = forwardRef(({ selected, onChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    setFocus: () => setIsOpen(true),
    setOpen: (open) => setIsOpen(open),
  }));

  const currentYear = getYear(new Date());
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => 1990 + i);
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  return (
    <>
      {isOpen && (
        <StyledDatePicker>
          <DatePicker
            {...props}
            selected={selected}
            onChange={(date) => {
              if (onChange) onChange(date);
              setIsOpen(false);
            }}
            inline // 인풋 대신 달력만 표시
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div style={{ margin: 10, display: "flex", justifyContent: "center", gap: "4px" }}>
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {"<"}
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(Number(value))}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {">"}
                </button>
              </div>
            )}
          />
        </StyledDatePicker>
      )}
    </>
  );
});


export default DatePickerSingle;
