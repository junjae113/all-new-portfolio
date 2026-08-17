import React, { useEffect, useRef } from 'react';
import S from './style';

const Friends = (friends) => {

 const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, []);

 return (
  <div>
   <S.MyFriend>내친구</S.MyFriend>
   <S.FriendsList ref={scrollRef}>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
   </S.FriendsList>
  </div>
 );
};

export default Friends;