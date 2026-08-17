import { useState } from 'react';
import { useSelector } from 'react-redux';
import PopupCardLarge from '../../components/popUp/PopupCardLarge';
<<<<<<< HEAD
import TextArea from '../../components/textArea/TextArea';
import CommunityTextAreaComponent from './CommunityTextAreaComponent';
import { useSelector } from 'react-redux';
=======
import CommunityTextAreaComponent from './CommunityTextAreaComponent';
import S from './style';
import { useNavigate } from 'react-router-dom';

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807



const CommunityInputComponent = ({post, setPost}) => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({title:'', content:''})
  const [showConfirm, setShowConfirm] = useState(false)

  const currentUser = useSelector(state => state.user.currentUser);
  const profileSrc = currentUser?.dogProfile?.profileImage || '/assets/img/sample-profile.png';

<<<<<<< HEAD
=======

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
  const handleConfirm = async () => {

    const raw = localStorage.getItem("jwt_token");
    const token = raw?.startsWith('Bearer ') ? raw.slice(7) : raw;
    console.log('token?',token)

    if(!newPost.title?.trim() || !newPost.content?.trim()){
      alert("제목/내용을 입력하세요.")
      return ;
    }
    if (!token) {
      alert("로그인이 필요합니다");
<<<<<<< HEAD
=======
      navigate("/sign-in");
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/community/api/register-post`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${raw}`,
        },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content
        }),
      });
      
      if(!response.ok) throw new Error("게시글 등록 실패");

      const resJson = await response.json();
      const created = resJson?.data;

      const mapped = {
        id: created.post_id,
        title : created.title,
        content: created.content,
        createdAt: created.created_at,
        likeCount: created.like_count ?? 0,
        liked: false,
        commentList: [],
        authorName: created.authorName,
        authorProfileImage: created.authorProfileImage || '/assets/img/sample-profile.png',
        authorId: created.user_id,
      };



      setPost((prev) => [...prev, mapped]);
      setNewPost({title: "", content: ""});
      setShowConfirm(false);

      } catch (error) {
        console.error("게시글 등록 오류: ", error);
        alert(error.message);
      }

      
    };  
      


     
  

  return (
    <>
      <S.TextBoxWrapper>
        <S.TextBoxLeftWrapper>
          <img src={profileSrc} alt="dogProfile" />
        </S.TextBoxLeftWrapper>
          <S.TextBoxInputWrapper>
            <S.TitleInputWrapper>              
              <CommunityTextAreaComponent placeholder={'제목을 입력해주세요'} maxChars={20} value={newPost.title}
                onChange={(e) => {
                setNewPost({...newPost, title: e.target.value})
                }}
              />
            </S.TitleInputWrapper>
            {/* <S.TitleInput  type="text" placeholder='제목을 입력해주세요' value={newPost.title}
            onChange={(e) => {
              setNewPost({...newPost, title: e.target.value})
            }} maxLength={20}/> */}
            <br />
            <S.TBButton>
              <S.ContentInputWrapper>
                <CommunityTextAreaComponent placeholder='내용을 입력해주세요' value={newPost.content}
                  onChange={(e) => {
                  setNewPost({...newPost, content: e.target.value})}}
                  maxChars={500}
                />
                {/* <S.ContentInput type="text" placeholder='내용을 입력해주세요' value={newPost.content}
                onChange={(e) => {
                  setNewPost({...newPost, content: e.target.value})
                }} maxLength={500} /> */}
              </S.ContentInputWrapper>
              <S.TBBWrapper>
                {/* <button className='imgUpload' type='submit'>
                  사진
                </button> */}
                <button onClick={() => {
                  if(newPost.title && newPost.content){
                    setShowConfirm(true);
                  }
                }} type='submit'>작성</button>
              </S.TBBWrapper>
            </S.TBButton>
          </S.TextBoxInputWrapper>
      </S.TextBoxWrapper>

      
      {showConfirm && (
        <PopupCardLarge
          title="작성한 내용을 등록할까요?"
          onClose={() => setShowConfirm(false)}
          actions={[
            {
              label: '예',
              onClick: handleConfirm,
              type: 'filled'
            },
            {
              label: "아니요",
              onClick: () => setShowConfirm(false),
              type: 'gray'
            }
          ]}
        />
      )}
    </>
  );
};

export default CommunityInputComponent;
