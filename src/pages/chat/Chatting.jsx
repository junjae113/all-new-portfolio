import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatApp from './ChatApp';
import ChatList from './ChatList';
import ScheduleAlert from './ScheduleAlert.jsx';
import S from './style.js';
<<<<<<< HEAD
=======

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

const Chatting = () => {
  const [selectedChat, setSelectedChat] = useState(null); // 선택한 채팅방
  const [showScheduleAlert, setShowScheduleAlert] = useState(true); // 스케줄alert on/off
<<<<<<< HEAD

  // 전체 chats 리스트
  const [chats, setChats] = useState([
    { id: 1, name: '소울이1', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },
     { id: 2, name: 'Soul2', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },
     { id: 2, name: 'Soul3', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },
     { id: 2, name: 'Soul', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },
     { id: 2, name: 'Soul', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },
     { id: 2, name: 'Soul', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },
     { id: 2, name: 'Soul', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },
     { id: 2, name: 'Soul', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },
     { id: 2, name: 'Soul', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },
     { id: 2, name: 'Soul', lastComment: '그래 좋아!', avatar: "/assets/img/chat/soul.png"
      , unreadCount: 2 ,lastMessageAt: '16:56'
     },

  ]);

=======
  const [freshKey, setFreshKey] = useState(0);
  const user_id = useSelector((state) => state.user.currentUser?.user_id);

  if (!window.socket) {
    window.socket = io('http://localhost:8000', { withCredentials: true });
  }

  useEffect(() => {
    if (!user_id || !window.socket) return;
    window.socket.emit('register', { userId: user_id });
  }, [user_id]);

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
  // ChatList에서 선택된 채팅방
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  // ScheduleAlert on/off
  const toggleScheduleAlert = () => {
    setShowScheduleAlert(prev => !prev);
  };

  // useEffect
  // 전체 list 가지고 오는 api
  // 뿌릴때 마지막 메시지 message가 최신인 순이 상단에 오게 

  return (
   <S.ChattingContainer>
      <ChatList
        // chats={chats}
        freshKey={freshKey}
        onSelectChat={handleSelectChat}
      />
      <S.ChatAppWrapper className={!showScheduleAlert ? 'full-width' : ''}>
        <ChatApp
          chat={selectedChat}
          freshKey={freshKey}
          onBumpFreshKey={() => setFreshKey(k => k + 1)}
          onClose={() => setSelectedChat(null)}
          onToggleScheduleAlert={toggleScheduleAlert}
        />
<<<<<<< HEAD
        {showScheduleAlert && <ScheduleAlert chat={selectedChat}/>}
=======
        {showScheduleAlert && 
          <ScheduleAlert 
            chat={selectedChat}
            freshKey={freshKey}
          />
        }
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
      </S.ChatAppWrapper>

    </S.ChattingContainer>
  );
};

export default Chatting;
