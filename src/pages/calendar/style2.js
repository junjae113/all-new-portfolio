import styled, { css } from "styled-components";
import { flexColumn, flexRow, flexSpaceBetween } from '../../styles/common';
import { spacingProps } from "../../styles/spacingProps";
import theme from "../../styles/theme";

const S = {};

// ---------------Calender-----------------
S.Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
  background-color: ${({ theme }) => theme.PALLETE.line[300]};
`;

S.Sidebar = styled.div`
  width: 20%;
  height: 100%;
  min-width: 300px;
  padding: 10px;
  background-color: #D2D4D4;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none; 
  }
`;

S.Main = styled.div`
  flex: 1;
  width: 100%;
  ${spacingProps}
  box-sizing: border-box;
  overflow-y: auto;
  background-color: ${theme.PALLETE.white};
  border-radius: 20px;
`;

// -----------------MiniCalendar---------------------
S.MiniCalendar = styled.div`
  background-color: ${theme.PALLETE.white};
  border-radius: 20px;
  ${spacingProps}
`;

S.MiniCalendarDate = styled.div`
  padding: 5px;
  background-color: #f1f1f1;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
`;

S.CalendarContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.PALLETE.white};
`;

S.DatePickerWrapper = styled.div`
  .react-datepicker {
    width: 100% !important;
    background-color: ${({ theme }) => theme.PALLETE.white} !important;
    border: none !important;
    font-family: 'Pretendard', sans-serif;
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.PALLETE.white} !important;
    border-bottom: none !important;
  }

  .react-datepicker__month {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: space-between !important;
  }

  .react-datepicker__day-names {
    display: flex !important;
    justify-content: space-between !important;
    margin-top: ${({ theme }) => theme.SPACING[10]};
  }

  .react-datepicker__day {
    flex: 1 0 14%;
    text-align: center;
    padding: 8px 0;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.PALLETE.secondary.main} !important;
    color: ${({ theme }) => theme.PALLETE.white} !important;
    border-radius: 8px;
  }

  .react-datepicker__day--today {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`;

// -----------------ComingSchedule, CompletedSchedule-----------------
S.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  ${spacingProps}
  background-color: ${theme.PALLETE.white};
  border-radius: 20px;
`;

S.MainTitle = styled.h3`
  margin-left: ${theme.SPACING[7]};
  font-size: ${theme.FONT_SIZE.caption1};
  margin-bottom: -5px;
`;

S.ScheduleContainer = styled.div`
  background-color: ${theme.PALLETE.white};
  border-radius: 20px;
`;

S.ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid ${theme.PALLETE.line[200]};
  padding: 15px 0;
`;

S.ScheduleText = styled.div`
  ${flexColumn};
`;

S.ScheduleLabel = styled.div`
  font-size: ${theme.FONT_SIZE.caption5};
  color: ${theme.PALLETE.text.sub2};
`;

S.ScheduleTitle = styled.div`
  font-size: ${theme.FONT_SIZE.caption2};
  font-weight: ${theme.FONT_WEIGHT.semiBold};
`;

// -----------------CalenderMonth-----------------
S.CalendarContainer = styled.div`
  padding: 20px;
  overflow: auto;
  scrollbar-width: none; 
  -ms-overflow-style: none; 

  &::-webkit-scrollbar {
    display: none; 
  }
`;

// -----------------calendarDay-----------------
S.CalendarDay = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: ${theme.PALLETE.white};
`;

S.CalendarDayTitle = styled.h3`
  ${spacingProps}
  font-size: 28px;
  font-weight: 600;
`;

S.CalendarDayHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 10px;
  width: 100%;
  padding: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

S.WeekDateBox = styled.div`
  flex: 1 1 0;
  padding: 8px 10px;
  border-radius: 15px;
  background-color: ${(props) => (props.isSelected ? '#000' : '#f0f0f0')};
  color: ${(props) => (props.isSelected ? '#fff' : '#000')};
  cursor: pointer;
  text-align: center;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  line-height: 16px;
  min-width: 0;
`;

S.HeaderEng = styled.div`
  margin-bottom: 3px;
`;

S.HeaderDay = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

S.CalendarDayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  gap: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// -----------------Schedule-----------------
S.ScheduleCard = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 70vw;
  height: 63vh;
  margin: 0 50px;
  box-sizing: border-box;
`;

S.ScheduleTitle1 = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZE.body2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  margin: 25px;
  margin-bottom: 45px;
`;

S.ScheduleTitleInput = styled.input`
  font-size: ${({ theme }) => theme.FONT_SIZE.body2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  margin: 25px;
  margin-bottom: 25px;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
`;

S.InputGroupContainer = styled.div`
  ${flexRow};
  margin: 25px 10px 0 10px;
  color: ${({ theme }) => theme.PALLETE.text.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.body3};
`;

S.InputGroup = styled.span`
  flex: 1;
  background-color: ${({ theme }) => theme.PALLETE.background.gray200};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

S.DateInput = styled.input`
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  font-size: ${({ theme }) => theme.FONT_SIZE.caption1};
  width: 100%;
`;

S.LocationInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: ${({ theme }) => theme.FONT_SIZE.caption1};
  width: 100%;
`;

S.FriendsSelect = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px 0;
  scrollbar-width: none;
  margin: 30px 0px;

  ${({ $maxWidth }) =>
    $maxWidth &&
    css`
      max-width: ${$maxWidth}px;
    `}

  &::-webkit-scrollbar {
    display: none;
  }
`;

S.FriendAvatar = styled.img`
  flex: 0 0 auto;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin-right: 10px;
  cursor: pointer;
  object-fit: cover;
  border: 5px solid transparent;
  transition: border 0.2s;

<<<<<<< HEAD
=======
  &.selected {
    border: 4px solid ${({ theme }) => theme.PALLETE.secondary.main};
  }

  &:hover {
    filter: brightness(0.85);
  }

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border: 4px solid ${({ theme }) => theme.PALLETE.secondary.main};
    `}

  ${({ $isHovered }) =>
    $isHovered &&
    css`
      filter: brightness(0.85);
    `}
`;

S.ScheduleButtons = styled.div`
  ${flexSpaceBetween};
  gap: 20px;
  margin: 10px;
`;

// -----------------Diary-----------------
S.DiaryCard = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  padding: 30px 30px 0 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 75vw;
  height: 63vh;
  box-sizing: border-box;
  margin: 0 50px;
  overflow-y: auto;
`;

S.DiaryTitle = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZE.body2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  margin-bottom: 12px;
  padding: 20px;
`;

S.ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

S.SavedImage = styled.img`
  width: 100%;
  max-width: 200px;
  border-radius: 10px;
  object-fit: cover;
  margin: 10px;
`;

S.PreviewImage = styled.img`
  width: 50%;
  max-width: 300px;
  border-radius: 10px;
  object-fit: cover;
`;

S.DeleteImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

S.Textarea = styled.textarea`
  width: 100%;
  height: 365px;
  resize: none;
  margin-bottom: 10px;
  padding: 20px;
  font-size: 14px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALLETE.background.gray100};
  box-sizing: border-box;
  border: none;
  outline: none;
`;

S.TextField = styled.p`
  width: 100%;
  height: 163px; 
  padding: 20px;
  margin-bottom: 15px;
  font-size: 14px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALLETE.background.gray100};
  overflow-y: auto;
  resize: none;

  scrollbar-width: none;         
  -ms-overflow-style: none;      
  &::-webkit-scrollbar {
    display: none;           
  }
`;

S.DiaryButtons = styled.div`
  ${flexSpaceBetween};
`;

S.ImageUploadLabel = styled.label`
  font-size: 30px;
  cursor: pointer;
  padding: 10px;
`;


export default S;