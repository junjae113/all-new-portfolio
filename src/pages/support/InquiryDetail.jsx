import React, { useEffect, useState } from 'react';
import SupportMenuComponent from './SupportMenuComponent';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextArea from '../../components/textArea/TextArea';
import BasicButton from '../../components/button/BasicButton';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

const InquiryDetail = ({isUpdate, setIsUpdate}) => {
=======
import { Link, useParams } from 'react-router-dom';

const InquiryDetail = ({isUpdate, setIsUpdate}) => {
    const {id} = useParams();
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
    
    const [content, setContent] = useState("")

    const onChangeContent = (e) => {
<<<<<<< HEAD
        setContent(e.target.value);
        console.log(e.target.value);
    }

     const [data, setData] = useState([])

     useEffect(() => {
       fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry-reply`)
       .then(response => response.json())
       .then(data => setData(data))
       .catch(error => console.error("문의글 답변 불러오는 중 오류" + error))
     }, [])

     console.log(data)

    const onClickReplyPost = async (e) => {

      window.alert('저장되었습니다');
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/post-inquiry-reply`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          reply_id : Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
          inquiry_id : "test",
          user_id : "user_test",
          reply_content : content,
        })
      })
      .then((res) => {
        if(!res.ok) throw new Error(`Response Fetching Error`);
        return res.json()
      })
      .then((res) => {
        console.log(res)
        if(res.message) alert(res.message);
        setContent("")
        setIsUpdate(!isUpdate)
      })
      .catch(console.error)
 }

 const inquiryBody = "문의 내용~ "
 const repeatedIinquiryBody = inquiryBody.repeat(50)
 const replyBody = "답변 내용~ "
 const repeatedReplyBody = replyBody.repeat(50)
=======
        setContent(e.target.value);   
    }

    // 문의글 조회

    const [inquiryTitle, setInquiryTitle] = useState("")
    const [inquiryContent, setInquiryContent] = useState("")
    const [inquiryDate, setInquiryDate] = useState("")
    const [inquiryName, setInquiryName] = useState("")
    const [file, setFile] = useState("")
    const [userId, setUserId] = useState("")
    const [profile, setProfile] = useState("")

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry-detail/${id}`)
        .then(response => response.json())
        .then(data => {
            setInquiryTitle(data.user.title);
              setInquiryContent(data.user.content);
              const date = data.user.created_at.slice(0,10).split("-").join(".");
              setInquiryDate(date)
              setInquiryName(data.user.user_name)
              setFile(data.user.file)
              setUserId(data.user.user_id)
          })
        .catch(error => console.error("문의글 불러오는 중 오류" + error))
    }, [])

    const fileButton = () => {
        if (file != ""){
            return (
                <S.FileLinkWrapper>
                     <FontAwesomeIcon icon={faPaperclip} size='sm' />
                     &nbsp;
                     첨부파일.jpg
                </S.FileLinkWrapper>
            )
        } else {
            return (
                <S.FileLinkWrapper></S.FileLinkWrapper>
            )
        }
    }

    // 프로필 사진 조회

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`)
        .then(response => response.json())
        .then((data) => {
            const profileImage = data.user?.dogProfile?.profileImage
            if(profileImage != null){   
                setProfile(profileImage)
            } else {
                setProfile("/assets/img/sample-profile.png")
            }
        })
    })
    
    // 답변 조회

    const [reply, setReply] = useState([])
    useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry-reply/${id}`)
      .then(response => response.json())
      .then(data => setReply(data.data))
      .catch(error => console.error("문의글 답변 불러오는 중 오류" + error))
    }, [])

    const inquiryReply = reply.map((data) => {
        const content = data.reply_content;
        const name = data.user_name;
        const date = data.created_at.slice(0, 10).split("-").join(".");
        // const profile = {profile}

        return (
        <S.InquiryReplyWapper>
            <S.ReplyProfileDateWrapper>
                <S.ReplyProfileDateWrapper> 
                    <S.ReplyProfileWrapper>
                     <FontAwesomeIcon icon={faArrowTurnUp} rotation={90} size='2xl' />
                        {/* <S.Profile
                          src={profile}
                          alt="프로필"
                          onError={(e) => {
                            e.target.src = "/assets/img/sample-profile.png";
                          }}
                        /> */}
                     <S.AuthorName>{name}</S.AuthorName>
                    </S.ReplyProfileWrapper>
                    <S.DateWrapper>
                        {date}  
                    </S.DateWrapper>
                </S.ReplyProfileDateWrapper>
            </S.ReplyProfileDateWrapper>
            <S.ReplyContent>
                {content}
            </S.ReplyContent>
        </S.InquiryReplyWapper>
        )
    })

    // 답변 등록
    const onClickReplyPost = async (e) => {
        const raw = localStorage.getItem("jwt_token")

        if(!content) {
            window.alert('내용을 입력해 주세요')
        } else{
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/post-inquiry-reply`, {
              method : "POST",
              headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${raw}`
              },
              body : JSON.stringify({
                reply_id : Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
                inquiry_id : id,
                reply_content : content,
              })
            })
            .then((res) => {
              if(!res.ok) throw new Error(`Response Fetching Error`);
              return res.json()
            })
            .then((res) => {
              console.log(res)
              if(res.message) alert(res.message);
              setIsUpdate(!isUpdate)
            })
            .catch(console.error)

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry-reply/${id}`)
            .then(response => response.json())
            .then(data => setReply(data.data))
            .catch(error => console.error("방금 등록한 답변 불러오는 중 오류" + error))
        }
     }
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

 return (
  <S.InquiryWrapper>
   <SupportMenuComponent activeMenu="inquiry" />
<<<<<<< HEAD
   <div>
=======
   {/* <div>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
    <S.InquiryTitle>1:1 문의</S.InquiryTitle>
    <div>
        <S.InquiryTitleBottom>
            문의사항을 보내주시면 친절하게 답변하겠습니다. <br />
            1:1문의를 주말에 남겨 주시는 고객님께는 평일 9:00 ~ 18:00 에 순차적으로 답변 드리도록 하겠습니다.
        </S.InquiryTitleBottom>
    </div>
<<<<<<< HEAD
   </div>
=======
   </div> */}
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
   <S.InquiryBodyWrapper>
    <S.ListWrapper>
        <S.InquiryContentWrapper>
            <S.ProfileDateWrapper>
                <S.AuthorProfileWrapper>
<<<<<<< HEAD
                    <S.Profile src="/assets/img/my-profile.png" alt="작성자 프로필" />
                    <S.AuthorName>홍길동</S.AuthorName>
                </S.AuthorProfileWrapper>
                <S.DateWrapper>
                    2025.07.29
                </S.DateWrapper>
            </S.ProfileDateWrapper>
            <S.InquiryTitile>
                멍픽 관련해서 질문 드립니다~
            </S.InquiryTitile>
            <S.InquiryContent>
                {repeatedIinquiryBody}
            </S.InquiryContent>
            <S.FileLinkWrapper>
                 <FontAwesomeIcon icon={faPaperclip} size='sm' />
                 &nbsp;
                 첨부파일.jpg
            </S.FileLinkWrapper>
        </S.InquiryContentWrapper>
        <S.InquiryReplyWapper>
            <S.ReplyProfileDateWrapper>
                <S.ReplyProfileDateWrapper> 
                    <S.ReplyProfileWrapper>
                     <FontAwesomeIcon icon={faArrowTurnUp} rotation={90} size='2xl' />
                     <S.Profile src="/assets/img/my-profile.png" alt="작성자 프로필" />
                     <S.AuthorName>멍픽</S.AuthorName>
                    </S.ReplyProfileWrapper>
                    <S.DateWrapper>
                        2025.08.01
                    </S.DateWrapper>
                </S.ReplyProfileDateWrapper>
            </S.ReplyProfileDateWrapper>
            <S.ReplyContent>
                {repeatedReplyBody}
            </S.ReplyContent>
            <S.TextAreaWrapper>
                <TextArea placeholder={"답변을 입력해주세요"} maxChars={"500"} onChange={onChangeContent} />
                <S.Replybutton onClick={onClickReplyPost} >
                    <img src="/assets/icons/send.svg" alt="댓글쓰기" />
                </S.Replybutton>
            </S.TextAreaWrapper>
        </S.InquiryReplyWapper>
=======
                        <S.Profile
                          src={profile}
                          alt="프로필"
                          onError={(e) => {
                            e.target.src = "/assets/img/sample-profile.png";
                          }}
                        />
                    <S.AuthorName>{inquiryName}</S.AuthorName>
                </S.AuthorProfileWrapper>
                <S.DateWrapper>
                    {inquiryDate}
                </S.DateWrapper>
            </S.ProfileDateWrapper>
            <S.InquiryTitile>
                {inquiryTitle}
            </S.InquiryTitile>
            <S.InquiryContent>
                {inquiryContent}
            </S.InquiryContent>
            {fileButton}
        </S.InquiryContentWrapper>
        {inquiryReply}
        <S.TextAreaWrapper>
            <TextArea placeholder={"답변을 입력해주세요"} maxChars={"500"} onChange={onChangeContent} />
            <S.Replybutton onClick={onClickReplyPost} id='replyButton' >
                <img src="/assets/icons/send.svg" alt="댓글쓰기" />
            </S.Replybutton>
        </S.TextAreaWrapper>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
        <S.ButtonToList>
         <Link to={"/support/inquiry-list"} >
          <BasicButton children={"목록"} variant={"default"} basicButton={"medium"} />
         </Link>
        </S.ButtonToList>
    </S.ListWrapper>
   </S.InquiryBodyWrapper>
  </S.InquiryWrapper>
 );
};

export default InquiryDetail;