import styled from "styled-components";
import { flexCenter, flexColumn, flexRow, flexSpaceBetween } from '../../styles/common';
import { spacingProps } from "../../styles/spacingProps";
import theme from "../../styles/theme";

const S = {};

// --------------Chatting----------------
S.ChattingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  background-color: ${({ theme }) => theme.PALLETE.line[300]};
  box-sizing: border-box;
`;

S.ChatAppWrapper = styled.div`
    flex: 0 0 75%;
    transition: flex 0.3s ease;
    display: flex;
    background-color: #ffffff;
    margin: 20px 0;
    border-radius: 30px;
    overflow: hidden;
`;

// --------------ChatList----------------
S.ChatListContainer = styled.div`
  flex: 0 0 21.5%;
  min-width: 290px;
  ${flexColumn};
  border-right: 1px solid ${({ theme }) => theme.PALLETE.line[200]};
  overflow-y: auto;
  background-color: ${({ theme }) => theme.PALLETE.background.gray100};
  border-radius: 20px;
  ${spacingProps};
`;

S.TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: ${({ theme }) => theme.SPACING[7.5]};
  margin-bottom: ${({ theme }) => theme.SPACING[20]};
`;

S.ChatTitle = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZE.caption1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
  color: ${({ theme }) => theme.PALLETE.text.main};
`;

S.ChatList = styled.div`
  width: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

S.ChatListItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: #FFFCFE;
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover,
  &.selected {
    background-color: #e6e6e6;
  }
`;

S.ChatAvatar = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 5px;
  border-radius: 50%;
`;

S.ChatInfo = styled.div`
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

S.ChatName = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

S.ChatLast = styled.div`
  color: ${({ theme }) => theme.PALLETE.text.sub2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
  font-size: ${({ theme }) => theme.FONT_SIZE.caption4};
`;
S.ChatRead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 5px;
  margin-left: auto;
  justify-content: space-between;
  height: 100%;
`;

S.ChatLastTime = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.caption4};
  color: ${({ theme }) => theme.PALLETE.text.sub2};
  margin-bottom: ${({ theme }) => theme.SPACING[4]};
`;

S.UnreadBadge = styled.span`
  background-color: ${({ theme }) => theme.PALLETE.tertiary.main};
  color: white;
  border-radius: 50px;
  padding: 4px 6px;
  font-size: ${({ theme }) => theme.FONT_SIZE.caption5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.extraBold};
  min-width: 18px;
  text-align: center;
  line-height: 1;
`;

// --------------ChatApp----------------
S.ChatApp = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${({ theme }) => theme.PALLETE.white};
    height: 100%;
`;

S.ChatAppContainer = styled.div`
    flex: 0 0 75%;
    transition: flex 0.3s ease; 
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.PALLETE.white};
`;

S.ChatAppContainerFullWidth = styled.div`
    flex: 0 0 75%;
`;

S.ChatAppHeader = styled.div`
    ${flexSpaceBetween};
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.PALLETE.line[100]};
`;

S.ChatAppHeaderLeft = styled.div`
    ${flexRow};
`;

S.ChatAppAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 20px;
`;

S.ChatAppHeaderActions = styled.div`
    ${flexCenter};

    & > button {
        background-color: ${({ theme }) => theme.PALLETE.white};
        margin-right: 5px;
    }
`;

S.ChatAppMessages = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

S.ChatAppDateDivider = styled.div`
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.caption4};
    color: ${({ theme }) => theme.PALLETE.text.sub2};
    margin: 10px 0;
`;

S.ChatAppMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin: 4px 4px;
    align-items: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
`;

S.ChatAppBubble = styled.div`
    max-width: 60%;
    margin: 0 10px;
    background-color: ${({ isMe, theme }) => isMe ? theme.PALLETE.background.gray100 : theme.PALLETE.tertiary.main};
    color: ${({ isMe }) => (isMe ? "#000" : "#fff")};
    border-radius: 12px;
    padding: 8px;
    position: relative;
`;

S.ChatAppMessageText = styled.div`
    margin-bottom: 4px;
`;

S.ChatAppMessageImage = styled.img`
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 4px;
`;

S.ChatAppMessageInfo = styled.div`
    font-size: ${({ theme }) => theme.FONT_SIZE.caption5};
    color: ${({ theme }) => theme.PALLETE.text.sub2};
    margin: 8px 10px 0;
    display: flex;
`;

S.ChatAppTime = styled.span`
    margin-right: 4px;
`;

S.ChatAppReadStatus = styled.span`
    font-weight: bold;
`;

S.ChatAppInputArea = styled.div`
    ${flexRow};
    padding: 10px;
    border-top: 1px solid ${({ theme }) => theme.PALLETE.line[100]};
`;

S.ChatAppButton = styled.div`
    background-color: ${({ theme }) => theme.PALLETE.white};
`;

S.ChatAppMessageInput = styled.div`
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 8px;
    margin: 0 10px;
    min-height: 40px;
    outline: none;
    overflow-wrap: break-word;
    position: relative;

    &:empty:before {
        content: '메시지 입력';
        color: #999;
        position: absolute;
        pointer-events: none;
    }
`;

S.ChatAppFileInput = styled.input`
    display: none;
`;

S.ChatAppSendButton = styled.button`
    background-color: ${({ theme }) => theme.PALLETE.tertiary.main};
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 5px 0 15px;
`;

// --------------ScheduleAlert----------------
S.ScheduleAlert = styled.div`
  flex: 0 0 20%;
  min-width: 300px;
  border-left: 1px solid ${({ theme }) => theme.PALLETE.line[100]};
  box-sizing: border-box;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.PALLETE.white};
  padding-top: ${({ theme }) => theme.SPACING[50] || '50px'};

  &::-webkit-scrollbar {
    display: none;
  }
`;

S.ScheduleProfileSection = styled.div`
  text-align: center;
`;

S.ScheduleProfileAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

S.ScheduleProfileName = styled.div`
  margin-top: ${({ theme }) => theme.SPACING[20]};
  margin-bottom: ${({ theme }) => theme.SPACING[40]};
  font-size: ${({ theme }) => theme.FONT_SIZE.body2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
`;

S.ScheduleTabs = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.SPACING[10]};
`;

S.ScheduleTabButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.SPACING[10]};
  border: none;
  background: ${({ theme }) => theme.PALLETE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.caption3};
  cursor: pointer;

  &.active {
    border-bottom: 3px solid ${({ theme }) => theme.PALLETE.secondary.main};
  }
`;

S.ScheduleList = styled.div`
  overflow-y: auto;
  -ms-overflow-style: none;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

S.ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.SPACING[10]};
  padding: ${({ theme }) => `${theme.SPACING[20]} ${theme.SPACING[10]}`};
  position: relative;
`;

S.ScheduleIcon = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.white};
  color: ${({ theme }) => theme.PALLETE.secondary.main};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.caption3};
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

S.ScheduleDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.PALLETE.line[100]};
`;

S.ScheduleImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

S.ScheduleGalleryImg = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0;
`;

// --------------ScheduleModal----------------
S.Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

S.ModalContent = styled.div`
  background: ${({ theme }) => theme.PALLETE.white};
  padding: ${({ theme }) => theme.SPACING[20]};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

S.ModalContentFixed = styled(S.ModalContent)`
  width: 350px;
  height: 470px;
  overflow-y: auto;
`;

S.CalendarContainer = styled.div`
  width: 100%;
  height: 100%;

  .react-datepicker {
    width: 100%;
    background-color: white;
    border: none;
    font-family: var(--global-font, 'Pretendard', sans-serif);
    box-sizing: border-box;
  }

  /* 달, 요일 헤더 */
  .react-datepicker__header {
    background-color: white;
    border-bottom: none;
    width: 100%;
  }
  // 날짜 부분 전체 덮는거
  .react-datepicker__month {
    /* background-color: black; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
  }
  // 요일 부분 전체
  .react-datepicker__day-names {
    /* background-color: blue; */
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }
  // 날짜 하나하나
  .react-datepicker__day {
    /* background-color: green; */
    flex: 1 0 100%;
    justify-content: space-between;
    text-align: center;
    box-sizing: border-box;
    padding: 7px 19px 7px 19px;
  }
  // 선택된 날짜 
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: ${({ theme }) => theme.PALLETE.secondary.main};
    color: white;
    border-radius: 8px;
  }
`;

S.ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;

S.FullWidthButton = styled.button`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.PALLETE.secondary.dark};
  color: ${({ theme }) => theme.PALLETE.white};
  padding: 10px 20px;
  border-radius: 15px;
  border: none;
  font-weight: bold;
  margin-top: auto;
`;

S.ScheduleContainer = styled.div`
  width: 100%;
  height: 100%;
  /* padding: 30px 0 0 0; */
`;

S.ModalHeader = styled.div`
  ${flexSpaceBetween};
  width: 100%;
  padding: ${({ theme }) => theme.SPACING[20]};
`;

S.ModalTitleInput = styled.input`
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.FONT_SIZE.body3};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
  flex: 1;
  background: transparent;
`;

S.InputGroupContainer = styled.div`
  ${flexRow};
  margin-top: ${({ theme }) => theme.SPACING[20]};
  margin-bottom: ${({ theme }) => theme.SPACING[20]};
`;

S.InputGroup = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.PALLETE.background.gray100};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

<<<<<<< HEAD
=======
S.DateInput = styled.input`
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  font-size: ${({ theme }) => theme.FONT_SIZE.caption1};
  width: 100%;
`;


>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
S.Input = styled.input`
  border: none;
  background: transparent;
  flex: 1;
  font-size: ${({ theme }) => theme.FONT_SIZE.caption2};
  outline: none;
`;

S.InputSpan = styled.span`
  margin: 0 5px;
  font-size: ${({ theme }) => theme.FONT_SIZE.caption2};
  color: ${({ theme }) => theme.PALLETE.text.sub2};
`;

S.FriendsSelect = styled.div`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${({ theme }) => theme.SPACING[10]} 0;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

S.FriendAvatar = styled.img`
  flex: 0 0 auto;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  object-fit: cover;
  border: 5px solid transparent;
  transition: border 0.2s;

  &.selected {
    border: 4px solid ${({ theme }) => theme.PALLETE.secondary.main};
  }

  &:hover {
    filter: brightness(0.85);
  }
`;

export default S;