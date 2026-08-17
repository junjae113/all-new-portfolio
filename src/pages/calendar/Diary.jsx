import { faImage, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BasicButton from "../../components/button/BasicButton";
import './Calendar.css';
import S from './style2';
<<<<<<< HEAD

const Diary = ({ eventId, scheduleDiary }) => {
=======


const Diary = ({ selectedSchedule, selectedDate, onDeleted }) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);

  const schedule = selectedSchedule ?? null;
  // console.log("day에서 넘겨받은 schedule객체: ",schedule); 

  const [diaryText, setDiaryText] = useState(schedule?.diary_text ?? null);
  const [diaryPhoto, setDiaryPhoto] = useState(schedule?.diary_photo_url ?? null); 

  useEffect(() => {
    setDiaryText(schedule?.diary_text ?? null);
    setDiaryPhoto(schedule?.diary_photo_url ?? null);
    setIsEditing(false);
    resetComposeStates();
    resetEditStates();
  }, [selectedSchedule]);

  // console.log("diaryText", diaryText);
  // console.log("diaryPhoto", diaryPhoto);



  const hasDiary = !!(diaryText || diaryPhoto);

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);   // 업로드 원본 파일
  const [previewUrl, setPreviewUrl] = useState(null); // 미리보기 url

<<<<<<< HEAD
  // ✅ 예시: 기존에 저장된 데이터 (빈 객체 or 데이터 있는 객체)
  // const scheduleDiary = {}; 
  // const scheduleDiary = { text: 
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
  //   , imageUrl: "/assets/img/chat/soul.png" };
=======
  // 보기/수정 모드 토글
  const [isEditing, setIsEditing] = useState(false);
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

  // 수정 모드에서 사용할 임시 입력값
  const [draftText, setDraftText] = useState('');
  const [draftFile, setDraftFile] = useState('');
  const [draftPreviewUrl, setDraftPreviewUrl] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);

  const resetComposeStates = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setText('');
    setFile(null);
    setPreviewUrl(null);
  };

  const resetEditStates = () => {
    if (draftPreviewUrl) URL.revokeObjectURL(draftPreviewUrl);
    setDraftText('');
    setDraftFile(null);
    setDraftPreviewUrl(null);
    setRemovePhoto(false);
  };

  // 보기-수정 진입: 기존값을 드래프트에 복사
  const handleStartEdit = () => {
    setDraftText(diaryText ?? '');
    setDraftFile(null);
    setDraftPreviewUrl(null);
    setRemovePhoto(false);
    setIsEditing(true);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    resetEditStates();
    setIsEditing(false);
  };

  // 파일 선택 (작성/수정 모두 지원)
  const handleImageChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (isEditing) {
      if (draftPreviewUrl) URL.revokeObjectURL(draftPreviewUrl);
      setDraftFile(f);
      setDraftPreviewUrl(URL.createObjectURL(f));
      setRemovePhoto(false); // 새로 업로드하면 당연히 사진 유지(교체)
    } else {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  };

  // 미리보기 제거
  const handleDeleteImage = () => {
    if (isEditing) {
      if (draftPreviewUrl) URL.revokeObjectURL(draftPreviewUrl);
      setDraftPreviewUrl(null);
      setDraftFile(null);
      // 편집 모드에서 기존 이미지도 제거하고 싶다면 토글 사용
      setRemovePhoto(true);
    } else {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setFile(null);
    }
  };

   // 기존 저장 이미지를 제거(편집 모드에서만 사용)
  const handleRemoveSavedPhoto = () => {
    // 기존 이미지 표시를 즉시 끄고, 서버에선 null로 업데이트
    setRemovePhoto(true);
    if (draftPreviewUrl) { URL.revokeObjectURL(draftPreviewUrl); setDraftPreviewUrl(null); }
    setDraftFile(null);
  };

  // 이미지 업로드 → imageUrl 반환 (작성/수정 공용)
  const uploadDiaryImage = async (fileToUpload) => {
    if (!fileToUpload) return null;
    const formData = new FormData();
    formData.append('diary', fileToUpload); // 서버 필드명에 맞추기

    const res = await fetch(`http://localhost:8000/calendar/api/post-diaryPictures`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      throw new Error(msg?.message || '이미지 업로드 실패');
    }
    const data = await res.json(); // { imageUrl: '...' }
    return data.imageUrl || null;
  };

 

  // 일기 저장 버튼
  const handleSave = async () => {
    try {
      let diary_photo_url = null;
      if(file){
        diary_photo_url = await uploadDiaryImage(file);
      }
    
    const res = await fetch(`http://localhost:8000/calendar/api/post-diary`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        user_id: user_id,
        _id: schedule._id,
        diary_text: text || null,
        diary_photo_url: diary_photo_url || null,
      }),
    }
  );

   if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg?.message || '일기 저장 실패');
      }

      const data = await res.json();
      alert(data?.message || '저장 완료');

      setDiaryText(data.diary_text ?? text ?? null);
      setDiaryPhoto(data.diary_photo_url ?? diary_photo_url ?? null);
      resetComposeStates();
      // console.log("data.diary_photo_url", data.diary_photo_url);
      onDeleted?.(schedule._id);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

<<<<<<< HEAD
=======
  // 편집 저장
  const handleUpdate = async () => {
    let nextPhotoUrl = diaryPhoto;
      if (draftFile) {
        nextPhotoUrl = await uploadDiaryImage(draftFile);
      } else if (removePhoto) {
        nextPhotoUrl = null;
      }

    try {
      const res = await fetch(`http://localhost:8000/calendar/api/put-diary`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          user_id: user_id,
          schedule_id: schedule._id,
          diary_text: draftText ?? null,
          diary_photo_url: nextPhotoUrl ?? null,
        }),
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg?.message || '일기 수정 실패');
      }

      const data = await res.json();
      alert(data?.message || '수정 완료');

      setDiaryText(data.diary_text ?? draftText ?? null);
      setDiaryPhoto(data.diary_photo_url ?? nextPhotoUrl ?? null);
      resetEditStates();
      setIsEditing(false);

      onDeleted?.(schedule._id);
    } catch(err) {
      console.error(err);
    }
  };

  // 일기 삭제
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/calendar/api/delete-diary`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id, 
          schedule_id: schedule._id,
        }),
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg?.message || '일기 삭제 실패');
      }

      const data = await res.json();
      alert(data?.message || '삭제 완료');

      // 화면 반영: 보기모드 비우기
      setDiaryText(null);
      setDiaryPhoto(null);
      resetEditStates();
      resetComposeStates();
      setIsEditing(false);

      onDeleted?.(schedule._id);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (draftPreviewUrl) URL.revokeObjectURL(draftPreviewUrl);
    };
  }, [previewUrl, draftPreviewUrl]);


  return (
    <S.DiaryCard>
      {!hasDiary && <S.DiaryTitle>일정에 대한 일기를 써보세요!</S.DiaryTitle>}

<<<<<<< HEAD
      {hasDiary ? (
        scheduleDiary.imageUrl && (
          <S.ImageWrapper>
            <S.SavedImage src={scheduleDiary.imageUrl} alt="saved" />
=======
      {/* 이미지 영역 */}
      {hasDiary && !isEditing ? (
        diaryPhoto && (
          <S.ImageWrapper>
            <S.SavedImage src={diaryPhoto} alt="saved" />
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
          </S.ImageWrapper>
        )
      ) : isEditing ? (
        <>
          {/* 편집 모드: 새 이미지 미리보기 우선 */}
          {draftPreviewUrl ? (
            <S.ImageWrapper>
              <S.PreviewImage src={draftPreviewUrl} alt="preview" />
              <S.DeleteImageButton onClick={handleDeleteImage}>
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'white', fontSize: '20px' }} />
              </S.DeleteImageButton>
            </S.ImageWrapper>
          ) : (
            // 새 미리보기가 없고 기존 이미지가 있으면 보여주고 제거 버튼 제공
            diaryPhoto && !removePhoto && (
              <S.ImageWrapper>
                <S.SavedImage src={diaryPhoto} alt="saved" />
                <S.DeleteImageButton onClick={handleRemoveSavedPhoto} title="이미지 제거">
                  <FontAwesomeIcon icon={faTrash} style={{ color: 'white', fontSize: '20px' }} />
                </S.DeleteImageButton>
              </S.ImageWrapper>
            )
          )}

          {/* 편집 모드: 이미지 선택 버튼 */}
          <S.ImageUploadLabel htmlFor="image-upload-edit">
            <FontAwesomeIcon icon={faImage} />
          </S.ImageUploadLabel>
          <input
            id="image-upload-edit"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </>
      ) : (
<<<<<<< HEAD
        image && (
          <S.ImageWrapper>
            <S.PreviewImage src={URL.createObjectURL(image)} alt="preview" />
=======
        // 새 작성 모드: 새 미리보기
        previewUrl && (
          <S.ImageWrapper>
            <S.PreviewImage src={previewUrl} alt="preview" />
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
            <S.DeleteImageButton onClick={handleDeleteImage}>
              <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'white', fontSize: '20px' }} />
            </S.DeleteImageButton>
          </S.ImageWrapper>
        )
      )}

<<<<<<< HEAD
      {hasDiary ? (
        <S.TextField>{scheduleDiary.text}</S.TextField>
=======
      {/* 텍스트 영역 */}
      {hasDiary && !isEditing ? (
        <S.TextField>{diaryText}</S.TextField>
      ) : isEditing ? (
        <S.Textarea
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="내용을 수정하세요..."
        />
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
      ) : (
        <S.Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="내용을 입력하세요!!..."
        />
      )}

<<<<<<< HEAD
      <S.DiaryButtons>
        {!hasDiary && (
=======
      {/* 버튼들 */}
      <S.DiaryButtons>
        {!hasDiary && !isEditing && (
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
          <>
            <S.ImageUploadLabel htmlFor="image-upload">
              <FontAwesomeIcon icon={faImage} />
            </S.ImageUploadLabel>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <BasicButton roundButton="small" variant="filled" onClick={handleSave} style={{ width: '100%', margin: '0 10px' }}>
              저장하기
            </BasicButton>
          </>
        )}

<<<<<<< HEAD
        {hasDiary ? (
          <>
            <BasicButton roundButton="small" variant="default" onClick={handleEdit} style={{ width: '100%', margin: '10px' }}>
=======
        {hasDiary && !isEditing && (
          <>
            <BasicButton roundButton="small" variant="default" onClick={handleStartEdit} style={{ width: '100%', margin: '10px' }}>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
              수정하기
            </BasicButton>
            <BasicButton roundButton="small" variant="filled" onClick={handleDelete} style={{ width: '100%', margin: '10px' }}>
              삭제하기
            </BasicButton>
          </>
<<<<<<< HEAD
        ) : (
          <BasicButton roundButton="small" variant="filled" onClick={handleSave} style={{ width: '100%', margin: '0 10px' }}>
            저장하기
          </BasicButton>
        )}
=======
        )}

        {hasDiary && isEditing && (
          <>
            <BasicButton roundButton="small" variant="filled" onClick={handleUpdate} style={{ width: '100%', margin: '10px' }}>
              저장
            </BasicButton>
            <BasicButton roundButton="small" variant="default" onClick={handleCancelEdit} style={{ width: '100%', margin: '10px' }}>
              취소
            </BasicButton>
          </>
        )}
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
      </S.DiaryButtons>
    </S.DiaryCard>

  );
};

export default Diary;
