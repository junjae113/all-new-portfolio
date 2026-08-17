import React, { useEffect, useState } from "react";
import S from "./style";
<<<<<<< HEAD
import { Link } from "react-router-dom";

// const data = Array.from({ length: 1234 }, (_, i) => ({
//   id: i + 1,
//   title: `멍픽 관련해서 문의 드립니다 ${i + 1}`,
//   author: "홍 * 동",
//   date: "2025.07.29",
//   category: i % 2 === 0 ? "답변중" : "답변완료"
// }));

=======
import { Link, useNavigate } from "react-router-dom";
import RadioWithLabel from "../../../components/radio/RadioWithLabel";
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807



const ITEMS_PER_PAGE = 10;

const List = () => {
  
 const [data, setData] = useState([])

 useEffect(() => {
   fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry`)
   .then(response => response.json())
   .then(data => setData(data.data))
   .catch(error => console.error("문의글 불러오는 중 오류" + error))
 }, [])

<<<<<<< HEAD
 console.log(data.length)

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  console.log(data.length)
=======
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // 페이지 나누기
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807

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
<<<<<<< HEAD
// .map((item) => {
//   item.created_at.split(10)
//   console.log(item.created_at)
//  })

  return (
    <div>
      <S.ListWrapper>
        <tbody>
          {currentItems.map((item) => (
            <S.Data key={item.id}>
              <S.Author>{item.user_id}</S.Author>
              <Link to={"/support/inquiry-detail"} >
               <S.Title>{item.title}</S.Title>
              </Link>
              <S.Date>{item.created_at}</S.Date>
              <S.Reply>{item.category}</S.Reply>
            </S.Data>
          ))}
        </tbody>
      </S.ListWrapper>

      <S.PaginattionWrapper>
       <button
         disabled={currentPage === 1}
         onClick={() => setCurrentPage(currentPage - 1)}
=======

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
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
       >
         &lt;
       </button>

       {getPageNumbers().map((page) => (
         <button
<<<<<<< HEAD
           key={page}
           onClick={() => setCurrentPage(page)}
           disabled={page === currentPage}
           style={{
            color: page === currentPage ? "#CF4B05" : "black"
           }}
=======
          className="pagination"
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled={page === currentPage}
          style={{
           color: page === currentPage ? "#CF4B05" : "black",
           display: isChecked ? "none" : "block"
          }}
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
         >
           {page}
         </button>
       ))}

       <button
<<<<<<< HEAD
         disabled={currentPage === totalPages}
         onClick={() => setCurrentPage(currentPage + 1)}
       >
         &gt;
       </button>
     </S.PaginattionWrapper>
=======
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
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
    </div>
  );
}

export default List;