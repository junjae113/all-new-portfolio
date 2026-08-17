import styled from "styled-components";

const S = {}

S.ListWrapper = styled.div`
 display: flex;
 flex-direction: column;
 width: 1440px;
 height: fit-content;
`

S.ContenetWrapper = styled.tbody`
display: flex;
flex-direction: column;
width: 1440px;
`

S.Data = styled.div`
 display: flex;
 align-items: center;
 width: 1440px;
 height: 76px;
 border-bottom: solid 2px ${({ theme }) => theme.PALLETE.text.disabled.weak } ;
`

S.Author = styled.div`
 display: flex;
 padding-left: 42px;
 align-items: center;
 width: 280px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body2 };
`

<<<<<<< HEAD
S.Title = styled.div`
 display: flex;
 align-items: center;
 width: 720px;
=======
S.Title = styled.button`
 display: flex;
 align-items: center;
 width: 720px;
 background-color: white;
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
 font-size: ${({ theme }) => theme.FONT_SIZE.body2 };
`

S.Date = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 width: 210px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body3 };
`

S.Reply = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 width: 210px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body3 };
`

<<<<<<< HEAD
S.PaginattionWrapper = styled.div`
=======
S.PaginationWrapper = styled.div`
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
 display: flex;
 justify-content: center;
 align-items: end;
 width: 1440px;
 height: 146px;
 gap: 28px;

 button{
  width: 28px;
  background-color: white;
  font-size: ${({ theme }) => theme.FONT_SIZE.body2 };
 }
`

<<<<<<< HEAD
=======
S.RadioInputWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 width: 1440px;
 padding: 140px 0 20px 0;
 gap: 974px;
 border-bottom: 3px solid #CF4B05;
`

S.SerachInput = styled.div`
 width: 340px;
 height: 46px;
 margin-right: auto;
 flex: 0 0 auto;

 input{
  position: relative;
  height: 46px;
 }

 button{
  position: absolute;
  border-radius: 8px;
  right: 4px;
 }
`

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
export default S;