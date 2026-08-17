import { faArrowLeft, faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import 'react-clock/dist/Clock.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import 'react-time-picker/dist/TimePicker.css';
import BasicButton from "../../components/button/BasicButton";
import S from './style';

<<<<<<< HEAD
=======

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
const ScheduleModal = ({ 
  onClose,
  onAddSchedule = () => {},
  step: initialStep = 1,
  date: initialDate = new Date(),
}) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);
  console.log("user_id", user_id);
  const [step, setStep] = useState(initialStep);
  const [selectedDate, setSelectedDate] = useState(
    typeof initialDate === 'string' ? new Date(initialDate) : initialDate
  );
  const [startTime, setStartTime] = useState('');
  const [location, setLocation] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const toggleFriend = (friend) => {
    if (selectedFriend && selectedFriend._id === friend._id) {
      // 같은 친구 → 해제
      setSelectedFriend(null);
    } else {
      // 다른 친구 → 새로 선택
      setSelectedFriend(friend);
    }
  };

<<<<<<< HEAD
  // 추가하기, 일정추가 버튼 클릭 시
  const handleAdd = () => {
    if (step === 1 && selectedDate) {
      // 추가하기 버튼 클릭시
=======

// console.log("selectedFriend._id" ,selectedFriend._id);
  // 친구 목록 불러오는 api
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

  // 추가하기, 일정추가 버튼 클릭 시
  const handleAdd = async() => {
    if (step === 1 && selectedDate) {
      // 추가하기 버튼 클릭시 
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
      setStep(2);
    } else if (step === 2) {
      // 일정추가 버튼 클릭 시
      // schedule POST API 연동
      if (!title.trim()) {
        setError('일정을 작성해주세요');
        return;
      }
    // setShowError(false);
    const onlyDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
    const onlyTime = startTime ? format(startTime, "HH:mm") : null;

<<<<<<< HEAD
      const newSchedule = {
        title: title,
        date: selectedDate.toISOString().split('T')[0],
        startTime: startTime,
        location: location,
        friends: selectedFriends,
      };

      onAddSchedule(newSchedule);
=======
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
        // setValue("")
        // setIsUpdate(!isUpdate) // 상태 리랜더링
      })
      .catch(console.error)
      onAddSchedule();
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
      onClose();
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error) setError('');
  };

  // useEffect -> 처음 마운트했을 때 -> friend 객체 -> 친구 프로필 url 뿌리기

  return (
     <S.Modal onClick={onClose}>
      <S.ModalContentFixed onClick={(e) => e.stopPropagation()}>
        {/* 모달 첫번째 달력 */}
        {step === 1 ? (
          <>
            <S.CalendarContainer>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                locale={ko}
              />
            </S.CalendarContainer>
            <BasicButton roundButton="superSmall" variant="filled" onClick={handleAdd} style={{ width: '100%'}}>
              추가하기
            </BasicButton>
          </>
        ) : (
          <>
          <S.ScheduleContainer>
            <S.ModalHeader>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{
                  color: '#616161',
                  marginLeft: '-10px',
                  marginRight: '20px',
                  cursor: 'pointer',
                  width: '24px', height: '24px'
                }}
                onClick={() => {
                  setStep(1);
                  setTitle('');
                  setStartTime('');
                  setLocation('');
                  setSelectedFriend(null);
                  setError('');
                }}
              />
              <S.ModalTitleInput
                type="text"
                placeholder="새로운 일정을 추가해주세요"
                value={title}
                onChange={handleTitleChange}
              />
            </S.ModalHeader>

            {error && (
              <div style={{ color: 'red', marginLeft: '55px', marginTop: '-10px', marginBottom: '10px', fontSize: '15px' }}>
                {error}
              </div>
            )}

            <S.InputGroupContainer>
              <FontAwesomeIcon icon={faCalendarDays} style={{ color: '#616161', marginRight: '15px', width: '24px', height: '24px' }} />
              <S.InputGroup>
                <S.InputSpan>
                  {selectedDate.toLocaleDateString('ko-KR', {
                    month: 'numeric',
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </S.InputSpan>
              </S.InputGroup>
            </S.InputGroupContainer>
<<<<<<< HEAD

            <S.InputGroupContainer>
              <FontAwesomeIcon icon={faClock} style={{ color: '#616161', marginRight: '15px', width: '24px', height: '24px' }} />
              <S.InputGroup>
                <TimePicker
                  onChange={setStartTime}
                  value={startTime}
                  disableClock
                  clearIcon={null}
                  clockIcon={null}
                  format="HH:mm"
                />
              </S.InputGroup>
            </S.InputGroupContainer>

            <S.InputGroupContainer>
=======

            <S.InputGroupContainer>
              <FontAwesomeIcon icon={faClock} style={{ color: '#616161', marginRight: '15px', width: '24px', height: '24px' }} />
              <S.InputGroup>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  dateFormat="h:mm aa"
                  placeholderText="시작 시간을 선택하세요"
                  customInput={<S.DateInput />}
                />
              </S.InputGroup>
            </S.InputGroupContainer>

            <S.InputGroupContainer>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
              <FontAwesomeIcon icon={faLocationDot} style={{ color: '#616161', marginRight: '15px', width: '24px', height: '24px' }} />
              <S.InputGroup>
                <S.Input
                  type="text"
                  value={location}
                  placeholder="장소를 입력하세요"
                  onChange={handleLocationChange}
                />
              </S.InputGroup>
            </S.InputGroupContainer>

            <S.FriendsSelect>
              {friends.map(friend => (
                <S.FriendAvatar
<<<<<<< HEAD
                  key={friend.id}
                  src={friend.avatar}
                  alt={friend.name}
                  className={selectedFriends.find(f => f.id === friend.id) ? 'selected' : ''}
=======
                  key={friend._id}
                  src={friend.target_profile_img}
                  alt={friend.target_name}
                  className={selectedFriend?._id === friend._id ? 'selected' : ''}
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
                  onClick={() => toggleFriend(friend)}
                />
              ))}
            </S.FriendsSelect>
          </S.ScheduleContainer>
          <BasicButton roundButton="superSmall" variant="filled" onClick={handleAdd} style={{ width: '100%' }}>
            일정추가
          </BasicButton>
          
          </>
        )}
      </S.ModalContentFixed>
    </S.Modal>
  );
};

export default ScheduleModal;
