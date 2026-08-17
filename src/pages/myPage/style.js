import styled from "styled-components";
import { flexCenter, flexColumn, flexRow } from "../../styles/common";

const S = {}

 S.Wrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 800px;
  background-color: #fff5ec;
 `

 S.FirstWrapper = styled.div`
  ${flexRow}
  /* width: 1440px;
  height: 570px; */
  margin-top: 103px;
  gap: 75px;
 `

 S.SecondWrapper = styled.div`
  ${flexRow}
  width: 1000px;
  /* height: 1302px; */
  margin-top: 75px;
  margin-bottom: 174px;
   align-items: flex-start;
 `

//  S.Profile = styled.div`
//   /* width: 480px; */
//   /* height: 570px; */
//   border-radius: 24px;
//   box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
//  `

 S.Friends = styled.div`
  display: flex;
  justify-content: center;
  width: 885px;
  /* height: 570px; */
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
  padding: 0 30px;
 `

 S.CalendarWrapper = styled.div`
  ${flexColumn}
  width: 664px;
  /* height: 1302px; */
  gap: 28px;
 `
<<<<<<< HEAD
 S.Calendar = styled.div`
  width: 664px;
  height: 474px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
 `

 S.Plan = styled.div`
  width: 664px;
  height: 386px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`

 S.Review = styled.div`
  width: 664px;
  height: 386px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`

=======
 // 미니캘린더
 S.Calendar = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
 `
// 다가오는 일정
 S.Plan = styled.div`
  width: 400px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`
// 완료된 일정
 S.Review = styled.div`
  width: 400px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`
// 채팅방
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
 S.Chat = styled.div`
  width: 686px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
  background-color: #DFE1E5;
  /* pointer-events: none;  */
 `


 export default S;