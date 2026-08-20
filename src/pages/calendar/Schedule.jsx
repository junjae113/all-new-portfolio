import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import BasicButton from "../../components/button/BasicButton";
import './Calendar.css';
import S from './style2';


const Schedule = ({ selectedSchedule, selectedDate, onDeleted }) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);
  const [date, setDate] = useState(selectedDate); // props에서 받은날짜
  const schedule = selectedSchedule ?? null;
  console.log("day에서 넘겨받은 schedule객체: ",schedule);
  const hasExisting = !!schedule?.title;

  const [title, setTitle] = useState(''); // 일정 제목
  const [startTime, setStartTime] = useState(null); // 일정시작시간
  const [location, setLocation] = useState(''); // 일정 장소
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  console.log("match_id", schedule?.match_id ?? null);

  const toggleFriend = (friend) => {
    if(hasExisting && isEditing){
      if (draftSelectedFriend?.match_id === friend?.match_id) {
        // 같은 친구 → 해제
        setDraftSelectedFriend(null);
      } else {
        // 다른 친구 → 새로 선택
        setDraftSelectedFriend(friend);
      }
    } else {
      if (selectedFriend?.match_id === friend?.match_id) {
        // 같은 친구 → 해제
        setSelectedFriend(null);
      } else {
        // 다른 친구 → 새로 선택
        setSelectedFriend(friend);
      }
    }
    
  };

  // 보기/수정 모드 토글
  const [isEditing, setIsEditing] = useState(false);

  // 수정 모드에서 사용할 임시 입력값
  const [draftTitle, setDraftTitle] = useState('');
  const [draftTime, setDraftTime] = useState(null);
  const [draftLocation, setDraftLocation] = useState('');
  const [draftSelectedFriend, setDraftSelectedFriend] = useState(null);


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
        const friends = data.chats;
        setFriends(friends);
      } catch(err) {
        console.error("일정 불러오기 실패:", err);
      }
    };
    if(user_id){
      getChattingRoom();
    }
  }, [user_id]);

  useEffect(() => {
    if(!hasExisting) return;
    const id = schedule?.match_id;
    if(!id){
      setSelectedFriend(null);
      return;
    }
    const found = friends.find(f => String(f.match_id) === String(id));
    setSelectedFriend(found ?? { match_id: id });
  }, [hasExisting, schedule?.match_id, friends]);

  const handleTitleChange = (e) => {
    if(hasExisting && isEditing) setDraftTitle(e.target.value);
    else setTitle(e.target.value);
  }
  const handleLocationChange = (e) => {
    if(hasExisting && isEditing) setDraftLocation(e.target.value);
    else setLocation(e.target.value);
  }

  let formattedSelectedDate = '날짜 없음';
  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    if (!isNaN(dateObj)) {
      formattedSelectedDate = dateObj.toLocaleDateString('ko-KR', {
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
      });
    }
  }

  const hhmmToDate = (hhmm) => {
    if (!hhmm) return null;
    if (hhmm instanceof Date) return hhmm;
    const [h, m] = String(hhmm).split(':').map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };


  // 저장버튼 - api 일정 등록
  const handleSave = async () => {
    if (!title.trim()) return;

    const onlyTime = startTime ? format(startTime, "HH:mm") : null;
    const onlyDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";


    await fetch(`http://localhost:8000/calendar/api/post-schedules`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        user_id: user_id,
        match_id: selectedFriend?.match_id ?? undefined,
        title : title,
        date: onlyDate,
        time: onlyTime,
        location: location,
      })
    })
    .then((res) => {
      if(!res.ok) throw new Error(`Response Fetching Error`);
      return res.json()
    })
    .then((res) => {
        console.log(res)
        if(res.message) alert(res.message);
      })
      .catch(console.error)
  };

  // 수정 모드 진입 시 -> 
  const handleStartEdit = () => {
    setDraftTitle(schedule?.title ?? '');
    setDraftLocation(schedule?.location ?? '');
    setDraftTime(hhmmToDate(schedule?.time));
    const found = friends.find(f => f.match_id === schedule?.match_id) || null;
    setDraftSelectedFriend(found ?? (schedule?.match_id ? { match_id: schedule?.match_id } : null));
    setIsEditing(true);
  };

  // 수정 취소 : 드래프트 버리고 보기 모드
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // 수정 저장
  const handleUpdate = async () => {
    try {
      const res = await fetch('http://localhost:8000/calendar/api/put-schedules', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id,
          schedule_id: schedule?._id,
          schedule: {
            title: draftTitle,
            date: schedule?.date ?? (selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : ''),
            time: draftTime ? format(draftTime, 'HH:mm') : null,
            location: draftLocation,
            match_id: draftSelectedFriend?.match_id ?? schedule?.match_id ?? undefined,
          },
        }),
      });

      if (!res.ok) throw new Error('Response Fetching Error');
      const result = await res.json();
      alert(result.message ?? '일정이 수정되었습니다.');
      setIsEditing(false);
      setTitle(draftTitle);
      setStartTime(draftTime);
      setLocation(draftLocation);
      setSelectedFriend(draftSelectedFriend);

    } catch (e) {
      console.error(e);
      alert('수정 실패');
    }
  };

  // 삭제버튼 - api 일정 삭제
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/calendar/api/delete-schedules`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user_id,
          schedule_id: schedule?._id,
        }),
      });
      console.log("schedule_id : ", schedule?.id);
      if (!res.ok) throw new Error("Response Fetching Error");
      const result = await res.json();
      console.log("deleted:", result);
      alert(result.message ?? "일정이 삭제되었습니다.");
      onDeleted?.(schedule?._id);
    } catch (e) {
      console.error(e);
      alert("삭제 실패");
    }
  };


  // 삭제버튼 - api 일정 삭제
  const handleDelete = async () => {
    //  if (!window.confirm("정말 삭제하시겠어요?")) return;
    // try {
    //   const res = await deleteSchedule({ user_id: user_Id, schedule_id: scheduleId });
    //   console.log("deleted:", res);
    //   alert(res.message ?? "일정이 삭제되었습니다.");
    //   // (선택) refetch()
    // } catch (e) {
    //   console.error(e);
    //   alert("삭제 실패");
    // }
  }

  return (
    <S.ScheduleCard>
      {hasExisting && !isEditing ? (
        <S.ScheduleTitle1>{schedule?.title}</S.ScheduleTitle1>
      ) : (
        <S.ScheduleTitleInput
          type="text"
          placeholder="새로운 일정을 추가해주세요"
          value={(hasExisting && isEditing) ? draftTitle : title}
          onChange={handleTitleChange}
        />
      )}
      
      <S.InputGroupContainer>
        <FontAwesomeIcon icon={faCalendarDays} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
        <S.InputGroup>
          <span>{schedule?.date ?? formattedSelectedDate}</span>
        </S.InputGroup>
      </S.InputGroupContainer>

      {(schedule?.time && !isEditing) ? (
        <S.InputGroupContainer>
          <FontAwesomeIcon icon={faClock} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
          <S.InputGroup>
            {schedule.time}
          </S.InputGroup>
        </S.InputGroupContainer>
      ) : (
        <S.InputGroupContainer>
          <FontAwesomeIcon icon={faClock} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
          <S.InputGroup>
            <DatePicker
              selected={(hasExisting && isEditing) ? draftTime : startTime}
              onChange={(date) => (hasExisting && isEditing) ? setDraftTime(date) : setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat="h:mm aa"
              placeholderText="시작 시간을 선택하세요"
              customInput={<S.DateInput />}
            />
          </S.InputGroup> 
        </S.InputGroupContainer>
      )}

      <S.InputGroupContainer>
        <FontAwesomeIcon icon={faLocationDot} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
        <S.InputGroup>
          {(schedule?.location && !isEditing) ? (
            <span>{schedule.location}</span>
          ) : (
            <S.LocationInput
              type="text"
              placeholder="장소를 입력하세요"
              value={(hasExisting && isEditing) ? draftLocation : location}
              onChange={handleLocationChange}
            />
          )}
        </S.InputGroup>
      </S.InputGroupContainer>

      {/* 친구 목록 */}
      <S.FriendsSelect 
      $maxWidth={(80 + 10) * 5}
      >
        {friends.map(friend => {
          const isSelected = (hasExisting && isEditing)
            ? (draftSelectedFriend?.match_id === friend.match_id)
            : (selectedFriend?.match_id === friend.match_id);
            return (
              <S.FriendAvatar
                key={friend.match_id || friend._id}
                src={friend.target_profile_img}
                alt={friend.target_name}
                className={isSelected ? 'selected' : ''}
                onClick={() => toggleFriend(friend)}
              />
            );
        })}
      </S.FriendsSelect>

      <S.ScheduleButtons>
        {/* 기존 일정 */}
        {hasExisting ? (
          isEditing ? (
            <>
              <BasicButton roundButton="small" variant="filled" style={{ width: '100%' }} onClick={handleUpdate}>
                저장
              </BasicButton>
              <BasicButton roundButton="small" variant="default" style={{ width: '100%' }} onClick={handleCancelEdit}>
                취소
              </BasicButton>
            </>
          ) : (
            <>
              <BasicButton roundButton="small" variant="default" style={{ width: '100%' }} onClick={handleStartEdit}>
                수정하기
              </BasicButton>
              <BasicButton roundButton="small" variant="filled" style={{ width: '100%' }} onClick={handleDelete}>
                삭제하기
              </BasicButton>
            </>
          )
        ) : (
          // 신규 일정
          <BasicButton roundButton="small" variant="filled" style={{ width: '100%' }} onClick={handleSave}>
            저장하기
          </BasicButton>
        )}
      </S.ScheduleButtons>
    </S.ScheduleCard>
  );
};

export default Schedule;
