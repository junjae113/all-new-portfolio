import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import { useState } from 'react';
=======
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import BasicButton from "../../components/button/BasicButton";
import './Calendar.css';
import S from './style2';
<<<<<<< HEAD

const Schedule = ({ eventId, selectedDate, scheduleId }) => {
  // const user_Id = useSelector(s => s.user.currentUser?.user_Id);
  // const user_Id = '6895c4d407695ea93734389a'
  const [user_Id, setUserId] = useState('6895c4d407695ea93734389a')
  const [date, setDate] = useState(selectedDate); // props에서 받은날짜
  const [schedule, setSchedule] = useState({}); // 일정객체를 통째로 등록
  const [title, setTitle] = useState(''); // 일정 제목
  const [startTime, setStartTime] = useState(null); // 일정시작시간
  const [location, setLocation] = useState(''); // 일정 장소
  // 친구 목록 -> 친구 id값을 가지고와서 프로필을 띄워야 함
  const [friends, setFriends] = useState([
    '/assets/img/chat/soul.png',
    '/assets/img/chat/melody.png',
    '/assets/img/chat/coco.png',
    '/assets/img/chat/soul.png',
    '/assets/img/chat/melody.png',
    '/assets/img/chat/coco.png',
  ]);

  const [selectedFriends, setSelectedFriends] = useState([]); // 선택된 친구 -> id로 상태 저장
  const [hoveredFriend, setHoveredFriend] = useState(null);

  const [showError, setShowError] = useState(false);
  // 백에서 온 메세지
  const [value, setValue] = useState("")
  const onChangeValue = (e) => {
    setValue(e.target.value)
  }

  // ✅ 추가: 훅 사용
  // const {
  //   loading: mutating,
  //   error: mutateError,
  //   createScheduleSafe,
  //   putSchedule,
  //   deleteSchedule,
  // } = useScheduleApi();

  // useEffect(() => {
  //   // eventId로 조회해서 setSchedule() 할 자리 (지금은 dummy)
  //   setSchedule({});
  // }, [eventId]);



  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);

  // useEffect해서 일정 객체를 eventId로 가지고오거나, selectedDate로 가지고 오기
  // useEFfect해서 api 일정 조회를 연동하기
  // useEffect해서 친구목록을 api로 가지고 오고 setFriends로 연결

  // useEffect(() => {
  //   const dummy = {};
  //   // const dummy = {
  //   //   title: '한강 산책 모임',
  //   //   date: '8월 3일 (토)',
  //   //   startTime: '18:00',
  //   //   location: '여의나루역 2번 출구 앞',
  //   // };
  //   setSchedule(dummy);
  // }, [eventId]);
=======


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
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

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

<<<<<<< HEAD
  // 저장버튼 - api 일정 등록
  const handleSave = async () => {
    if (!title.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    await fetch(`http://localhost:8000/calendar/api/post-schedules`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        title : title,
        date: date,
        time: startTime,
        location: location,
        // user_id: user_Id,
        // chat_id: selectedFriends,
      })
    })
    .then((res) => {
      if(!res.ok) throw new Error(`Response Fetching Error`);
      return res.json()
    })
    .then((res) => {
        console.log(res)
        if(res.message) alert(res.message);
        // setValue("")
        // setIsUpdate(!isUpdate) // 상태 리랜더링
      })
      .catch(console.error)
  };
  
  // 수정버튼 - api 일정 수정 
  const handleEdit = async () => {
    try {
      const res = await fetch('http://localhost:8000/calendar/api/put-schedules', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_Id,
          schedule_id: scheduleId,
          schedule: {
            title,
            date: date ? date.toISOString() : null,
            time: startTime ? startTime.toISOString() : null,
            place: location,
          },
        }),
      });

      if (!res.ok) throw new Error("Response Fetching Error");
      const result = await res.json();
      console.log("updated:", result);
      alert(result.message ?? "일정이 수정되었습니다.");
      // TODO: refetch()
    } catch (e) {
      console.error(e);
      alert("수정 실패");
    }
=======
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
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
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
<<<<<<< HEAD
      {schedule.title ? (
        <S.ScheduleTitle1>{schedule.title}</S.ScheduleTitle1>
=======
      {hasExisting && !isEditing ? (
        <S.ScheduleTitle1>{schedule?.title}</S.ScheduleTitle1>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
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
<<<<<<< HEAD
          <span>{schedule.date || formattedSelectedDate}</span>
        </S.InputGroup>
      </S.InputGroupContainer>

      {schedule.startTime ? (
        <S.InputGroupContainer>
          <FontAwesomeIcon icon={faClock} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
          <S.InputGroup>
            {schedule.startTime}
=======
          <span>{schedule?.date ?? formattedSelectedDate}</span>
        </S.InputGroup>
      </S.InputGroupContainer>

      {(schedule?.time && !isEditing) ? (
        <S.InputGroupContainer>
          <FontAwesomeIcon icon={faClock} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
          <S.InputGroup>
            {schedule.time}
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
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
<<<<<<< HEAD
          {schedule.location ? (
=======
          {(schedule?.location && !isEditing) ? (
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
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
<<<<<<< HEAD
      <S.FriendsSelect $maxWidth={(80 + 10) * 5}>
        {(schedule.friends && schedule.friends.length > 0 ? schedule.friends : friends).map((f, idx) => (
          <S.FriendAvatar
            key={idx}
            src={f}
            alt="friend"
            onClick={() => handleSelectFriend(f)}
            onMouseEnter={() => setHoveredFriend(f)}
            onMouseLeave={() => setHoveredFriend(null)}
            $isSelected={selectedFriends.includes(f)}
            $isHovered={hoveredFriend === f}
          />
        ))}
      </S.FriendsSelect>

      <S.ScheduleButtons>
        {schedule.title ? (
          <>
            <BasicButton roundButton="small" variant="default" style={{ width: '100%' }}
                          onClick={handleEdit}>
              수정하기
            </BasicButton>
            <BasicButton roundButton="small" variant="filled" style={{ width: '100%' }}
                          onClick={handleDelete}>
              삭제하기
            </BasicButton>
          </>
        ) : (
          <BasicButton roundButton="small" variant="filled" style={{ width: '100%' }}
                        onClick={handleSave}>
=======
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
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
            저장하기
          </BasicButton>
        )}
      </S.ScheduleButtons>
    </S.ScheduleCard>
  );
};

export default Schedule;
