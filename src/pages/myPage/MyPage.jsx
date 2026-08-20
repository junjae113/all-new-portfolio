import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ComingSchedule from '../calendar/ComingSchedule';
import CompletedSchedule from '../calendar/CompletedSchedule';
import MiniCalendar from '../calendar/MiniCalendar';
import ChatList from '../chat/ChatList';
import Friends from './mypageComponent/friends/Friends';
import ProfileCard from '../../components/profileCard/ProfileCard';
import S from './style';

// 프로필
// 친구 목록
// 캘린더
// 채팅

const MyPage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user.currentUser);

    console.log('마이페이지 - 현재 사용자:', currentUser);
    console.log('마이페이지 - dogProfile:', currentUser?.dogProfile);
    console.log('마이페이지 - dogMbti:', currentUser?.dogMbti);
    console.log('마이페이지 - 강아지 이름:', currentUser?.dogProfile?.name);
    console.log('마이페이지 - 강아지 품종:', currentUser?.dogProfile?.breed);
    
    // 서버에서 사용자 정보 가져오기
    const [serverUserData, setServerUserData] = useState(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');
            if (userId && !currentUser) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success && data.user) {
                            console.log('마이페이지 - 서버에서 가져온 사용자 데이터:', data.user);
                            setServerUserData(data.user);
                        }
                    }
                } catch (error) {
                    console.error('사용자 정보 조회 오류:', error);
                }
            }
        };
        
        fetchUserData();
    }, [currentUser]);
    
    // currentUser가 없을 때 서버 데이터 또는 localStorage에서 정보 가져오기
    const fallbackUser = currentUser || serverUserData || {
        user_id: localStorage.getItem('user_id'),
        name: localStorage.getItem('userName'),
        dogProfile: {
            name: localStorage.getItem('userName'),
            profileImage: localStorage.getItem('profileImage')
        }
    };
    
    console.log('마이페이지 - fallbackUser:', fallbackUser);

    const handleCalendarClick = () => {
        navigate('/calendar');
    }
    const handleChatClick = (chat) => {
        navigate('/chatting', { state: { selectedChat: chat } });
    }

    return (
        <S.Wrapper>
            <S.FirstWrapper>
                <div>
                    {fallbackUser ? (
                        <ProfileCard 
                            userData={fallbackUser} 
                            currentUserId={fallbackUser.user_id}
                            isMyProfile={true}
                        />
                    ) : (
                        <div>프로필 정보를 불러올 수 없습니다.</div>
                    )}
                </div>
                <S.Friends>
                    <Friends/>
                </S.Friends>
            </S.FirstWrapper>
            <S.SecondWrapper>
                <S.CalendarWrapper>
                    <S.Calendar onClick={handleCalendarClick}>
                        <MiniCalendar />
                    </S.Calendar>
                    <S.Plan onClick={handleCalendarClick}>
                        <ComingSchedule />
                    </S.Plan>
                    <S.Review onClick={handleCalendarClick}>
                        <CompletedSchedule />
                    </S.Review>
                </S.CalendarWrapper>
                <S.Chat >
                    <ChatList onSelectChat={handleChatClick}/>
                </S.Chat>
            </S.SecondWrapper>

        </S.Wrapper>
    );
};

export default MyPage;