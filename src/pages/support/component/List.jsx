import React, { useEffect, useState } from "react";
import S from "./style";
import { Link, useNavigate } from "react-router-dom";
import RadioWithLabel from "../../../components/radio/RadioWithLabel";



const ITEMS_PER_PAGE = 10;

const List = () => {
  
 const [data, setData] = useState([])

 useEffect(() => {
   fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry`)
   .then(response => response.json())
   .then(data => setData(data.data))
   .catch(error => console.error("문의글 불러오는 중 오류" + error))
 }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // 페이지 나누기

 const getPageNumbers = () => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }
  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    ];
  }
  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2
  ];
 };
 
 const currentItems = data.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE,
 )

 const link = useNavigate("")

 
 // localStorage 에 저장된 토큰 가져오기
 const token = localStorage.getItem("jwt_token");

 const base64Payload = token.split(".")[1];
 const payload = JSON.parse(atob(base64Payload));
 const user_id = payload.user_id;
 

 // 리스트

 const [isChecked, setIsChecked] = useState(false)

 const onChangeFilter = (e) => {
   setIsChecked(e)
 }


 const linkToDetail = (e) => {
   if(e.user_id == user_id) {
     link(`/support/inquiry-detail/${e.inquiry_id}`)
    } else if (user_id == "junjae114") {
     link(`/support/inquiry-detail/${e.inquiry_id}`)
   } else {
     window.alert("본인 문의글만 조회할 수 있습니다")
   }
  }

  const setList = (e) => {
    const name = e.user_name.slice(0,1) + " * " + e.user_name.slice(2)
    const title = e.title;
    const date = e.created_at.slice(0, 10).split("-").join(".")
    const reply = e.reply_yn ? "답변완료" : "답변중"

    return (
     <S.Data>
       <S.Author>{name}</S.Author>
       <S.Title onClick={() => linkToDetail(e)}>{title}</S.Title>
       <S.Date>{date}</S.Date>
       <S.Reply>{reply}</S.Reply>
      </S.Data>
    )
  }

  const inquiryList = currentItems.map((data) => setList(data))
  const filteredInquiryList = data.filter((data) => data.user_id == user_id).map((data) => setList(data)) // 라디오 체크 시 페이지 나눔 X

  const finalList = isChecked ? filteredInquiryList : inquiryList

  return (
    <div>
      <S.RadioInputWrapper>
          <RadioWithLabel label='내가 쓴 글' checked={setIsChecked} onChange={onChangeFilter}/>
          <S.SerachInput>
          </S.SerachInput>
      </S.RadioInputWrapper>
      <S.ListWrapper>
        <div>
          {finalList}
        </div>
      </S.ListWrapper>

     <S.PaginationWrapper id="pagination">
       <button
        className="pagination"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        style={{
          display: isChecked ? "none" : "block" // 라디오 체크 시 숨김
        }}
       >
         &lt;
       </button>

       {getPageNumbers().map((page) => (
         <button
          className="pagination"
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled={page === currentPage}
          style={{
           color: page === currentPage ? "#CF4B05" : "black",
           display: isChecked ? "none" : "block"
          }}
         >
           {page}
         </button>
       ))}

       <button
        className="pagination"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        style={{
          display: isChecked ? "none" : "block"
        }}
       >
         &gt;
       </button>
     </S.PaginationWrapper>
    </div>
  );
}

export default List;