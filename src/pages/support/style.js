import styled, { css } from "styled-components";
import BasicInput from "../../components/input/BasicInput";

const S = {}

S.FaqWrapper = styled.div`
  width: 100%;
  height: 100vh;
`

S.InquiryWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 128px;
`


S.MenuWrapper = styled.div`
  border-top: 1px solid #B5B5B5;
  border-bottom: 1px solid #B5B5B5;
  display: inline-flex;
  width: 100%;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`


S.FAQButton = styled.button`
  font-size: ${({ theme }) => theme.FONT_SIZE["body1"]};
  color: ${({ isActive, theme }) => (isActive ? theme.PALLETE.primary.main : theme.PALLETE.text.sub2)};
  border: none;
  background: none;
  
  `

S. BetweenButton = styled.span`
  /* margin-bottom: 39px ; */
  /* margin-top: 39px ; */
  color: #D9D9D9;
  margin-left: 40px;
  margin-right: 40px;
  font-size: 35px;
  ` 

S.InquiryButton = styled.button`
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.FONT_SIZE["body1"]};
  color: ${({ isActive, theme }) => (isActive ? theme.PALLETE.primary.main : theme.PALLETE.text.sub2)};
  `


// faq ===========================================================================================================

S.FAQTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.FONT_SIZE["h4"]};
  color: ${({ theme }) => theme.PALLETE.primary.main};
  padding : 80px 0;
  `


S.AccordionWrapper = styled.div`
  width: 1440px;
  margin-bottom: 175px;
  border-top: 3px solid #CF4B05;
`


// inquiry ===========================================================================================================
S.InquiryTitle = styled.div`
  margin-top: 83px;
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.FONT_SIZE["h4"]};
  color: ${({ theme }) => theme.PALLETE.primary.main};
`

S.InquiryTitleBottom = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  color: #777777;
  line-height: ${({ theme }) => theme.LINE_HEIGHT.h5};
`

S.InfoInputWrapper = styled.div`
  margin-top: 117px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

S.InquiryBodyWrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 width: 100%;
 height: fit-content;
 margin-top: 117px;
 gap: 42px;
`

S.InputsWrapper = styled.div`
 display: flex;
 align-items: center;
 margin-left: auto;
 width: 700px;
 height: 100%;
 gap: 20px;
`

// 이름

S.InquiryNameWrapper = styled.div`
 display: flex;
 align-items: center;
 width: 960px;
 height: 72px;
`

S.NameInput = styled.div`
 width: 700px;
 margin-left: auto;
`

// 전화번호

S.InquiryPhoneWrapper = styled.div`
 display: flex;
 align-items: center;   
 width: 960px;
 height: 72px;
`

S.SelectPhonStart = styled.div`
 width: 220px;
 height: 100%;
`

S.PhoneInput = styled.div`
 width: 220px;
 margin: 0px;
`

// email

S.InquiryEmailWrapper = styled.div`
 display: flex;
 align-items: center;
 width: 960px;
 height: 672px;
`

S.Email = styled.p`
 font-size: 48px;
`

S.EmailSelectBox = styled.div`
 width: 320px;
 height: 100%;
 flex: 0 0 auto;
`

// 문의유형

S.InquiryQuestionCategoryWrapper = styled.div`
 display: flex;
 align-items: center;
 width: 960px;
 height: 72px;
`

S.RadiosWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-left: auto;
width: 700px;
height: 100%;
gap: 20px;

p{
  font-size: ${({ theme }) => theme.FONT_SIZE.body2};
}
`

// 제목

S.InquiryQuestionTitleWrapper = styled.div`
 display: flex;
 align-items: center;
 width: 960px;
 height: 72px;
`

// 내용

S.InquiryQuestionBodyWrapper = styled.div`
 display: flex;
 align-items: center;
 width: 960px;
 height: 230px;
`
S.CharWrapper = styled.div`
 display: flex;
 flex-direction: column;
`

S.QuestionBodyInput = styled(BasicInput)`
 height: 100%;
 vertical-align: top;
`

S.InquiryBody = styled.div`
 width: 700px;
 height: 230px;
`

S.CharCount = styled.div`
  margin-top: 4px;
  text-align: right;
  font-size: 14px;
  color: ${({theme}) => theme.PALLETE.text.main};
`

// 파일

S.InquiryFileWrapper = styled.div`
 display: flex;
 align-items: center;
 width: 960px;
 height: 114px;
`

S.FileWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-left: auto;
width: 700px;
height: 100%;
gap: 4px;

p{
  color: ${({ theme }) => theme.PALLETE.text.sub2}
}
`

S.FileInputButton = styled.div`
 display: flex;
 height: 72px;
`

S.FileInput = styled.div`
width: 535px;
height: 64px;
`

S.InquiryCategory = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE["body2"]};
  color: ${({ theme }) => theme.PALLETE.text.sub2};
  display: flex;
  align-items: center;
`


// 버튼

S.InquiryButtonWrapper = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 width: 100%;
 height: 412px;
 gap: 60px;
`

// inquiry list ===========================================================================================================


S.ListWrapper = styled.div`
  width: 1440px;
  margin-bottom: 175px;
<<<<<<< HEAD
  border-top: 3px solid #CF4B05;
`

S.RadioInputWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 width: 1440px;
 padding-top: 132px;
 gap: 974px;
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


=======
`

>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
// inquiry detail ========================================================================

S.InquiryContentWrapper = styled.div`
 display: flex;
 flex-direction: column;
 width: 1440px;
 height: fit-content;
 /* padding: 0 24px; */
 border-bottom: solid 2px #cccccc;
<<<<<<< HEAD
=======
 padding-bottom: 180px;
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
`

S.ProfileDateWrapper = styled.div`
 display: flex;
 width: 1440px;
 height: 126px;
 gap: 1054px;
`

S.AuthorProfileWrapper = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 width: 224px;
 gap: 30px;
`

S.Profile = styled.img`
 width: 64px;
 height: 64px;
<<<<<<< HEAD
 border-radius: 50%;
=======
 border-radius: 50px;
 object-fit: cover;
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
`

S.AuthorName = styled.p`
 font-size: ${({ theme }) => theme.FONT_SIZE.body1 };
`

S.DateWrapper = styled.div`
 display: flex;
 justify-content: right;
 align-items: center;
 width: 138px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body3 };
`

S.InquiryTitile = styled.div`
 width: 1440px;
 height: 74px;
 padding-left: 120px;
 font-size: ${({ theme }) => theme.FONT_SIZE.h6 };
`

S.InquiryContent = styled.div`
 width: 1440px;
 height: fit-content;
 padding: 0 24px 0 120px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body2 };
`

S.FileLinkWrapper = styled.div`
 display: flex;
 justify-content: right;
 align-items: end;
 width: 100%;
 height: 186px;
<<<<<<< HEAD
=======
 flex: 0 0 auto;
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
 padding: 0 24px 56px 0;
 font-size: ${({ theme }) => theme.FONT_SIZE.button2 };
`

S. InquiryReplyWapper = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 width: 1440px;
 height: fit-content;
 padding: 0 24px 0 122px;
`

S.ReplyProfileDateWrapper = styled.div`
 display: flex;
 align-items: center;
 width: 100%;
 height: 126px;
 gap: 776px;
`

S.ReplyProfileWrapper = styled.div`
 display: flex;
 align-items: center;
 width: 380px;
 height: 100%;
 gap: 30px;
`

S.ReplyContent = styled.div`
 width: 100%;
 height: fit-content;
<<<<<<< HEAD
 padding-left: 152px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body2 };
=======
 padding-left: 56px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body2 };
 border-bottom: solid 2px #cccccc;
 padding-bottom: 90px;
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
`

S.TextAreaWrapper = styled.div`
 position: relative;
 width: 100%;
 height: 346px;
 padding-top: 106px;
`

S.Replybutton = styled.button`
 position: absolute;
 width: 36px;
 height: 36px;
 background-color: white;
 top:120px;
 right: 14px;
<<<<<<< HEAD
=======

 img{
  opacity: 50%;
  &:hover {
    opacity: 100%;
   }
 };


>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
`

S.ButtonToList = styled.div`
 display: flex;
 justify-content: center;
 align-items: end;
 width: 100%;
 height: 360px;
`




export default S;