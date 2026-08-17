import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import S from './style.js';


const ChatList = ({ chats, onSelectChat, selectedChat }) => {
  // chats: prop로 chatting에서 전체 chat 객체 리스트 받음
  // onSelectChat: ChatList에서 선택한 채팅방 Chatting에 알려주는 함수
  // selectChat: ChatList에서 선택한 채팅방의 정보를 담고 있는 객체

  return (
    <S.ChatListContainer p={20} m={20}>
      <S.TitleContainer>
        <FontAwesomeIcon icon={faPaw} style={{ fontSize: '25px', marginLeft: '9px' }} />
        <S.ChatTitle>매칭된 친구와 채팅을 시작해보세요 !</S.ChatTitle>
      </S.TitleContainer>

      <S.ChatList>
        {chats.map((chat) => (
          <S.ChatListItem
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={selectedChat?.id === chat.id ? 'selected' : ''}
          >
            <S.ChatAvatar src={chat.avatar} alt={chat.name} />
            <S.ChatInfo>
              <S.ChatName>{chat.name}</S.ChatName>
              <S.ChatLast>{chat.lastComment}</S.ChatLast>
            </S.ChatInfo>
            <S.ChatRead>
              <S.ChatLastTime>{chat.lastMessageAt}</S.ChatLastTime>
              {chat.unreadCount > 0 && <S.UnreadBadge>{chat.unreadCount}</S.UnreadBadge>}
=======
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import S from './style.js';

//  메시지 잘라주는 함수
const formatLastMessage = (msg) => {
  if (!msg) return "";
  return msg.length > 15 ? msg.slice(0, 15) + "…" : msg;
};

// 날짜 포맷 함수
const formatLastMessageAt = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();

  const sameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (sameDay(date, now)) {
    return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (sameDay(date, yesterday)) return "어제";

  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}-${date.getDate()}`;
  }

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};


const ChatList = ({ onSelectChat, selectedChat, freshKey = 0 }) => {
  // onSelectChat: ChatList에서 선택한 채팅방 Chatting에 알려주는 함수
  // selectChat: ChatList에서 선택한 채팅방의 정보를 담고 있는 객체
  const [chats, setChats] = useState([]);
  const user_id = useSelector((state) => state.user.currentUser?.user_id);

  useEffect(() => {
    const getChattingRoom = async () => {
      
      try {
        const response = await fetch(
          `http://localhost:8000/chatting/api/get-chattingRoom/${user_id}`
        );
        
        if (!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }

        const data = await response.json();
        const chats = data.chats;
        setChats(chats);
        console.log("채팅방 리스트 호출됨");
      } catch(err) {
        console.error("일정 불러오기 실패:", err);
      }
    };
    if(user_id){
      getChattingRoom();
    }
  }, [user_id, freshKey]);

  return ( 
    <S.ChatListContainer p={20} m={20}>
      <S.TitleContainer>
        <FontAwesomeIcon icon={faPaw} style={{ fontSize: '25px', marginLeft: '9px' }} />
        <S.ChatTitle>매칭된 친구와 채팅을 시작해보세요 !</S.ChatTitle>
      </S.TitleContainer>

      <S.ChatList>
        {chats.map((chat) => (
          <S.ChatListItem
            key={chat._id}
            onClick={() => onSelectChat(chat)}
            className={selectedChat?._id === chat._id ? 'selected' : ''}
          >
            <S.ChatAvatar 
              src={chat.target_profile_img || "/assets/img/chat/dogEmptyProfile.png"} 
              alt={chat.target_name || "채팅방을 선택해주세요"} />
            <S.ChatInfo>
              <S.ChatName>{chat.target_name}</S.ChatName>
              <S.ChatLast>{formatLastMessage(chat.lastMessage)}</S.ChatLast>
            </S.ChatInfo>
            <S.ChatRead>
              <S.ChatLastTime>{formatLastMessageAt(chat.lastMessageAt)}</S.ChatLastTime>
              {chat.unreadCounts > 0 && <S.UnreadBadge>{chat.unreadCounts}</S.UnreadBadge>}
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
            </S.ChatRead>
          </S.ChatListItem>
        ))}
      </S.ChatList>
    </S.ChatListContainer>
  );
};

export default ChatList;
