import React, { useState } from 'react';
import SupportMenuComponent from './SupportMenuComponent';
import S from './style';
import BasicInput from '../../components/input/BasicInput';
import BasicButton from '../../components/button/BasicButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import FileUpload from '../../components/fileUpload/FileUpload';
import TextArea from '../../components/textArea/TextArea';
import RadioWithLabel from '../../components/radio/RadioWithLabel';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

const Inquiry = ({isUpdate, setIsUpdate}) => {
  
  const [title, setTitle] = useState("")

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
<<<<<<< HEAD
    console.log(e.target.value)
=======
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
  }
  
  const [content, setContent] = useState("")

  const onChangeContent = (e) => {
    setContent(e.target.value)
<<<<<<< HEAD
    console.log(e.target.value)
=======
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
  }
  
  const [type, setType] = useState("")
  
  const [selected, setSelected] = useState("");
  
  const handleChange = (value) => {
    setSelected(value);
<<<<<<< HEAD
    console.log(value);
    
   const mapping = { a: 0, b: 1, c: 2, d: 3 };
    setType(mapping[value]);
    console.log(mapping[value]);
=======
    
   const mapping = { a: 0, b: 1, c: 2, d: 3 };
    setType(mapping[value]);
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
  };
  
  const [file, setFile] = useState("")
  const onChangeFile = (e) => {
    setFile(e.target.value)
  }

<<<<<<< HEAD
  const onClickPost = async (e) => {

      window.alert('저장되었습니다');
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/post-inquiry`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          inquiry_id : Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
          user_id : "user_test",
          type : type,
          title : title,
          content : content,
          file : file
=======
  const link = useNavigate("")

  const onClickPost = async (e) => {

    const raw = localStorage.getItem("jwt_token");
    
    if(type == undefined) {
      alert('문의 유형을 선택해주세요');
      return;
      } else if (!title) {
        alert('제목을 입력하세요');
        return;
      } else if (!content) {
        alert('내용을 입력하세요')
        return;
      } else {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/post-inquiry`, {
          method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${raw}`,
        },
        body : JSON.stringify({
          inquiry_id : Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
          type : type,
          title : title,
          content : content,
          file : file,
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
        })
      })
      .then((res) => {
        if(!res.ok) throw new Error(`Response Fetching Error`);
        return res.json()
      })
      .then((res) => {
        console.log(res)
        if(res.message) alert(res.message);
        setTitle("")
        setContent("")
        setType("")
        setFile("")
        setIsUpdate(!isUpdate)
      })
      .catch(console.error)
<<<<<<< HEAD
      
      
=======
      link("/support/inquiry-list");
    }}

    const onClickCancel = () => {
      if (content) {
        if (window.confirm('변경내용이 저장되지 않았습니다. 나가시겠습니까?')) {
          window.open("/support/inquiry-list", "_self")
        }
      } else {
        link("/support/inquiry-list")
      }
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
    }


    return (
        <S.InquiryWrapper>
            <SupportMenuComponent activeMenu="inquiry" />

            <div>
                <S.InquiryTitle>1:1 문의</S.InquiryTitle>
                <div>
                    <S.InquiryTitleBottom>
                        문의사항을 보내주시면 친절하게 답변하겠습니다. <br />
                        1:1문의를 주말에 남겨 주시는 고객님께는 평일 9:00 ~ 18:00 에 순차적으로 답변 드리도록 하겠습니다.
                    </S.InquiryTitleBottom>
                </div>
            </div>
            <S.InquiryBodyWrapper>
<<<<<<< HEAD
               {/* <S.InquiryNameWrapper>
                   <S.InquiryCategory>
                     이름&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                   <S.NameInput>
                    <BasicInput placeholder="이름을 입력하세요" />
                   </S.NameInput>
               </S.InquiryNameWrapper>
               <S.InquiryPhoneWrapper>
                   <S.InquiryCategory>
                    연락처&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                   <S.InputsWrapper>
                    <S.SelectPhonStart>
                        <SelectBox options={["010", "011", "016", "017", "018", "019"]}/>
                    </S.SelectPhonStart>
                    <S.PhoneInput>
                        <BasicInput placeholder="" />
                    </S.PhoneInput>
                    <S.PhoneInput>
                        <BasicInput placeholder="" />
                    </S.PhoneInput>
                   </S.InputsWrapper>
               </S.InquiryPhoneWrapper>
               <S.InquiryEmailWrapper>
                   <S.InquiryCategory>이메일</S.InquiryCategory>
                   <S.InputsWrapper>
                    <BasicInput placeholder="이메일을 입력해주세요" />
                    <S.Email>@</S.Email>
                    <S.EmailSelectBox>
                     <SelectBox options={[
                        "naver.com", 
                        "gmail.com", 
                        "hanmail.net", 
                        "hotmail.com", 
                        "nate.com", 
                        "yahoo.com", 
                        "empas.com",
                        "dreamwiz.com", 
                        "freechal.com", 
                        "lycos.co.kr", 
                        "korea.com", 
                        "hanmir.com", 
                        "paran.com"
                        ]} />
                    </S.EmailSelectBox>
                   </S.InputsWrapper>
               </S.InquiryEmailWrapper> */}
=======
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
               <S.InquiryQuestionCategoryWrapper>
                   <S.InquiryCategory>
                    문의유형&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                   <S.RadiosWrapper >
                    <RadioWithLabel checked={selected === "a"} onChange={() => handleChange("a")} label="회원정보" />
                    <RadioWithLabel checked={selected === "b"} onChange={() => handleChange("b")} label="서비스" />
                    <RadioWithLabel checked={selected === "c"} onChange={() => handleChange("c")} label="상품" />
                    <RadioWithLabel checked={selected === "d"} onChange={() => handleChange("d")} label="기타" />
                   </S.RadiosWrapper>
               </S.InquiryQuestionCategoryWrapper>
               <S.InquiryQuestionTitleWrapper>
                   <S.InquiryCategory>
                    제목&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                   <S.InputsWrapper>
                    <BasicInput placeholder="제목을 입력하세요" maxLength="35" onChange={onChangeTitle} value={title} />
                   </S.InputsWrapper>
               </S.InquiryQuestionTitleWrapper>
               <S.InquiryQuestionBodyWrapper>
                   <S.InquiryCategory>
                    내용&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                    <S.InputsWrapper>
                     <S.CharWrapper>
                      <S.InquiryBody>
                        <TextArea placeholder={"문의하실 내용을 입력하세요"} maxChars={"1000"} onChange={onChangeContent} />
                      </S.InquiryBody>
                     </S.CharWrapper>
                    </S.InputsWrapper>
               </S.InquiryQuestionBodyWrapper>
               <S.InquiryFileWrapper>
                   <S.InquiryCategory>파일첨부</S.InquiryCategory>
                       <S.FileWrapper>
                        <S.FileInputButton>
                         <FileUpload onChange={onChangeFile} />
                        </S.FileInputButton>
                            <p>*파일은 1 개만 등록이 가능하며, 용량은 총 50MB 이하로 첨부하여 주시기 바랍니다. <br/>
                             첨부 가능한 파일 확장자 : jpg,jpeg,gif,png,zip,doc,ppt,pptx,xls,xlsx,pdf,hwp</p>
                       </S.FileWrapper>
               </S.InquiryFileWrapper>
            </S.InquiryBodyWrapper>
<<<<<<< HEAD
             <Link to="/support/inquiry-list" >
                <S.InquiryButtonWrapper>
                    <BasicButton children={"취소"} variant={"gray"} basicButton={"medium"} />
                    <BasicButton children={"저장"} variant={"default"} basicButton={"medium"} onClick={onClickPost} />
                </S.InquiryButtonWrapper>
             </Link>
        </S.InquiryWrapper>
=======
                <S.InquiryButtonWrapper>
                    <BasicButton children={"취소"} variant={"gray"} basicButton={"medium"} onClick={onClickCancel}/>
                    <BasicButton children={"저장"} variant={"default"} basicButton={"medium"} onClick={onClickPost} />
                </S.InquiryButtonWrapper>
      </S.InquiryWrapper>
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
    );
};

export default Inquiry;