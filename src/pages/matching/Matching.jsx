import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import S from './style';
import ProfileCard from '../../components/profileCard/ProfileCard';
import Tab from '../../components/tab/Tab';

const Matching = () => {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Redux에서 현재 사용자 정보 가져오기
  const currentUser = useSelector(state => state.user.currentUser);

  // 탭 데이터
  const tabs = [
    { id: 'all', label: '가까운 동네친구들' },
    { id: 'nearby', label: '나와 같은 성격' },
    { id: 'new', label: '인기쟁이 친구들' },
    { id: 'popular', label: '나와의 찰떡궁합' }
  ];

  // 탭 변경 핸들러
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // 탭에 따른 사용자 필터링
  const getFilteredUsers = () => {
    switch (activeTab) {
      case 'nearby':
        return matchingUsers.filter(user => user.distance <= 3); // 3km 이내
      case 'new':
        // 최근 가입한 사용자 (예: 최근 7일)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return matchingUsers.filter(user => new Date(user.createdAt) > weekAgo);
      case 'popular':
        return matchingUsers.filter(user => (user.likeCount || 0) >= 5); // 좋아요 5개 이상
      default:
        return matchingUsers;
    }
  };

  // 매칭용 사용자 목록 API 호출
  useEffect(() => {
    const fetchMatchingUsers = async () => {
      try {
        setLoading(true);
        // 현재 사용자의 주소 (실제로는 로그인한 사용자의 주소를 가져와야 함)
        const currentUserAddress = currentUser?.dogProfile?.address || "서울시 강남구";
        
        const response = await fetch(`http://localhost:8000/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('사용자 목록을 가져오는데 실패했습니다.');
        }

        const data = await response.json();
        
        if (data.success) {
          console.log('현재 사용자:', currentUser);
          console.log('현재 사용자 주소:', currentUserAddress);
          console.log('전체 사용자 목록:', data.users);
          
          // 거리 계산 함수 (간단한 랜덤 거리)
          const calculateDistance = (userAddress) => {
            // 실제로는 지오코딩 API를 사용해야 하지만, 여기서는 간단한 랜덤 거리 생성
            const randomDistance = Math.floor(Math.random() * 10) + 1; // 1-10km
            return randomDistance;
          };
          
          // 현재 사용자의 프로필을 제외한 다른 사용자들만 필터링하고 거리 정보 추가
          const otherUsers = data.users
            .filter(user => {
              const isNotCurrentUser = user.user_id !== currentUser?.user_id;
              console.log(`사용자 ${user.user_id}는 현재 사용자(${currentUser?.user_id})와 다름:`, isNotCurrentUser);
              return isNotCurrentUser;
            })
            .map(user => ({
              ...user,
              distance: calculateDistance(user.dogProfile?.address)
            }));
          
          console.log('필터링된 사용자들:', otherUsers);
          setMatchingUsers(otherUsers);
        } else {
          throw new Error(data.message || '데이터를 가져오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('매칭 사용자 목록 조회 오류:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchingUsers();
  }, [currentUser]);

  if (loading) {
    return (
      <S.MatchingContainer>
        <div>로딩 중...</div>
      </S.MatchingContainer>
    );
  }

  if (error) {
    return (
      <S.MatchingContainer>
        <div>오류: {error}</div>
      </S.MatchingContainer>
    );
  }

  const filteredUsers = getFilteredUsers();

  return (
    <S.MatchingWrapper>

        <S.MatchingTitle> 
          <img src="/assets/icons/logo-v2.svg" alt="logo" />
          <S.MatchingTitleTextSub>'<span>방울이</span>'의</S.MatchingTitleTextSub>
          <S.MatchingTitleTextMain>Mung Pick!</S.MatchingTitleTextMain>
        </S.MatchingTitle>

         <Tab 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
        />
      <S.MatchingContainer>
        
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <ProfileCard 
              key={user.user_id || index} 
              userData={user} 
              currentUserId={currentUser?.user_id || "unknown"}
            />
          ))
        ) : (
          <div>매칭 가능한 사용자가 없습니다.</div>
        )}
      </S.MatchingContainer>
    </S.MatchingWrapper>
  );
};

export default Matching;