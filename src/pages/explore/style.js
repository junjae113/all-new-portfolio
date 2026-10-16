import styled from "styled-components";
import Text from "../../components/text/size";
import BasicButton from "../../components/button/BasicButton";

const S = {};

S.Banner = styled.div`
  background-color: #FFF5EF;
  height: fit-content;
  padding: 42px 42px 24px 42px;
  text-align: center;
  p{
    color: #CF4B05;
  }
`

S.TitleWrapper = styled.div`
  margin: 18px;
  padding-bottom: 36px;
`

S.ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 60px;
  background-color: #FFF5EF;
  padding-bottom: 24px;
`

S.RecordButton = styled.button`
  width: 132px;
  height: 48px;
  background-color: white;
  border: 2px solid #CF4B05;
  color: ${({$recordShare}) => ($recordShare ? "white" : "#CF4B05")};
  border-radius: 24px;
  font-size: 20px;
  font-weight: bold;
  margin: 48px 0px;
  background-color: ${({$recordShare}) => ($recordShare ? "#CF4B05" : "white")};
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background-color: #CF4B05;
    color: white;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`

S.ShareButton = styled.button`
  width: 132px;
  height: 48px;
  background-color: white;
  border: 2px solid #CF4B05;
  color: ${({$recordShare}) => ($recordShare ? "#CF4B05" : "white")};
  border-radius: 24px;
  font-size: 20px;
  font-weight: bold;
  margin: 48px 0px;
  background-color: ${({$recordShare}) => ($recordShare ? "white" : "#CF4B05")};
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
  background-color: #CF4B05;
  color: white;
  transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`

S.Line = styled.div`
  position: absolute;
  top: 72px;
  height: 0px;
  width: 60px;
  border: 1px solid #CF4B05;
`

// login component

S.LogInRecordWrapper = styled.div`
  display: grid;
  background-color: #FFFAF5;
  gap: 12px;
  padding: 80px 336px 80px 336px;
`

S.LogInBannersWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  height: fit-content;
  margin-top: 48px;
`

S.LinkBanner = styled.div`
  display: grid;
  gap: 24px;
  height: 240px;
  width: 100%;
  border: solid 1px lightgray;
  border-radius: 24px;
  background-color: white;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
  padding: 32px 32px 12px 32px;
`

S.LinkBannerTextWrapper = styled.div`
  height: fit-content;
  margin-bottom: 24px;
`

S.LogInShareWrapper = styled.div`
  display: flex;
  justify-content: center;
`

// Explore Record

S.RecordWrapper = styled.div`
  height: fit-content;
  width: 100%;
  /* padding-bottom: 120px; */
  `

S.RecordFirstContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 80px 0 120px 0;
  background-color: #FFFAF5;
`

S.RecordPhotoWrapper = styled.div`
  display: grid;
  gap: 24px;
  width: fit-content;
  height: fit-content;
  `
  
S.ProfileImage = styled.img`
  width: 400px;
  height: auto;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`

S.RecordFirstTextWrppaer = styled.div`
  width: 800px;
  height: 545px;
  display: grid;
  gap: 34px;
  padding: 24px 0 0 80px;
  `

S.SignUpLinkBannerWrapper = styled.div`
  display: grid;
  gap: 12px;
  height: fit-content;
  background-color: white;
  /* border: solid 2px lightgray; */
  border-radius: 24px;
  margin: 28px 0 24px 0;
  padding: 24px 32px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`
S.RecordSecondContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 80px 0 120px 0;
  `
  
S.RecordSecondTextWrppaer = styled.div`
  width: 500px;
  height: fit-content;
  display: grid;
  gap: 30px;
  padding: 12px 80px 12px 0;
`

S.CalendarImage = styled.img`
  width: 700px;
  height: auto;
  border-radius: 12px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`

S.CalendarCompenetWrapper = styled.div`
  display: grid;
  gap: 12px;
`

S.PlanWrapper = styled.img`
  width: 450px;
  height: auto;
  border-radius: 12px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`

S.DairyWrapper = styled.img`
  width:450px;
  height: auto;
  border-radius: 12px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`

// Explore Share

S.ShareContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 80px 0 200px 0;
  background-color: #FFFAF5;
  `
  
S.ShareTextWrppaer = styled.div`
  width: 600px;
  height: fit-content;
  display: grid;
  gap: 30px;
  padding: 12px 80px 0 0;

  button{
    height: 100px;
    margin-top: 110px;
  }
`

S.ShareButtonWrapper = styled.div`
  width: 100%;
`

S.CommunityImage = styled.img`
  width: 600px;
  height: auto;
  border-radius: 12px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
`

//cta

S.ExploreCtaBanner = styled.div`
  height: fit-content;
  background-color: #CF4B05;
  display: grid;
  justify-content: center;
  padding: 120px 0 200px 0;
`

S.ExploreCtaTitle = styled(Text.H4)`
  color: white;
`

S.ExploreCtaBody = styled(Text.Body2)`
  color: white;
  width: 100%;
  display: grid;
  justify-content: center;
  padding: 40px 0;
`

S.CtaButtonWrapper = styled.div`
  height: 80px;
  display: flex;
  gap: 42px;
`

S.ExploreSignUpButton = styled(BasicButton)`
  border-radius: 100px;
  background-color: white;
`

S.ExploreSignInButton = styled(BasicButton)`
  border-radius: 100px;
  background-color: #CF4B05;
  border: solid 3px white;
  color: white;
`

export default S;