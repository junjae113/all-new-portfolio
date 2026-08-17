import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import { flexCenter, flexColumn, flexColumnCenter, flexSpaceBetween} from "../../styles/common";
import Text from "../../components/text/size";


const S = {};

// =========================
// 로그인 페이지 스타일
// =========================
S.LoginWrapper = styled.div`
  width: 600px;
  margin: auto;
  padding: 150px 0;
  ${spacingProps}

  h4{
    text-align: center;
    color: ${({ theme }) => theme.PALLETE.primary.main};
    font-weight: 600;
  }
`;

S.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  margin-top: 40px;
`;

S.Options = styled.div`
  ${flexSpaceBetween}
  margin-top: 16px;
`;

S.LinkGroup = styled.div`
  display: flex;
`;

S.ButtonWrapper = styled.div`
  ${flexColumn};
  gap: 16px 0;
  margin-top: 32px
`;

S.PasswordText = styled.div`
  padding-left: 8px;
  margin-left: 8px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 14px;
    background-color: #acacac;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

// =========================
// 약관동의(이용약관) 페이지 스타일
// =========================
S.AllAgreeWrapper = styled.div`
  ${flexCenter};
  justify-content: flex-end;
  margin-top: 200px;
`;

S.TermsWrapper = styled.div`
  ${flexColumn};
  gap: 60px 0;
`;

S.TermsBoxWrapper = styled.div`
  ${flexColumn};
  gap: 20px 0;
  margin-top: 67px;
`;

S.TermsBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 32px 40px;
  background: #fff;
  max-width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

S.TermsTextBox = styled.div`
  ${flexColumn};
  gap: 10px 0;
  ${spacingProps}
`;

S.TermsTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.primary.dark};
`;

S.TermsText = styled.p`
  font-size: 14px;
  color: #888;
`;

S.TermsListDemical = styled.ul`
  list-style: decimal;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px 0;
`;

S.TermsListDemicalItem = styled.li`
  font-size: 14px;
  color: #888;
`;

S.TermsList = styled.ul`
  list-style: disc;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 16px 0;
`;

S.TermsListItem = styled.li`
  font-size: 14px;
  color: #888;
`;

S.CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0 20px;
`;

S.NoticeWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #F8F8F8;
  border-radius: 24px;
  padding: 48px 40px;
  margin-top: 100px;
`;

S.NoticeText = styled.div`
  ${flexColumn};
  margin-left: 40px;
`;

S.NoticeTextTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

S.TermsButtonWrapper = styled.div`
  ${flexCenter};
  margin-top: 200px;
  margin-bottom: 300px;
`;

// =========================
// 소셜 로그인/탭 스타일 (약관동의 1단계에서만 사용)
// =========================
S.SocialLogin = styled.div`
  margin-top: 80px;
`;

S.TitleArea = styled.div`
  ${flexCenter};
  gap: 20px;
`;

S.TitleLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #acacac;
  flex: 1;
`;

S.IConArea = styled.div`
  ${flexCenter}
  margin-top: 20px;
  gap: 24px;
`;

S.Icon = styled.div`
  width: 44px; 
  height: 44px;

  a{
    width: 100%;
    height: 100%;
    display: block;
  }

  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

S.SocialTabWrapper = styled.div`
  ${flexColumnCenter};
  gap: 20px;
  width: 100%;
  padding-top: 80px;
`;

S.SocialLoginTabWrapper = styled.div`
  width: 100%;
  ${flexCenter};
  padding: 20px 0;
  border-radius: 10px;
  cursor: pointer;
  gap: 24px;
  background: ${({ color, theme }) =>
    color
      ? color === "kakao"
        ? theme.PALLETE.kakao
        : color === "naver"
        ? theme.PALLETE.naver
        : color
      : "#fff"};
`;

S.TabText = styled(Text.Body3)`
  color: ${({ color, theme }) => (color === "naver" ? "#fff" : color === "kakao" ? "#111" : theme.PALLETE.text.main)};
  font-weight: 600;
`;

S.NaverIcon = styled.div`
  width: 30px; 
  height: 30px;

  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

S.KakaoIcon = styled.div`
  width: 30px; 
  height: 30px;

  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

S.RequiredText = styled.span`
  color: ${({ theme }) => theme.PALLETE.primary.main};
  font-weight: 600;
`;

// =========================
// 회원정보 입력 페이지 스타일
// =========================
S.SignUpInfoWrapper = styled.div`
  ${flexColumn};
  gap: 40px 0;
  margin-top: 150px;

  /* Autofill 스타일 오버라이드 */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: inherit !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Firefox autofill 스타일 */
  input:-moz-autofill,
  input:-moz-autofill:focus {
    background-color: white !important;
    color: inherit !important;
  }
`;

S.SignUpInfoInputWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    min-width: 300px;
  }
`;

S.InputButtonWrapper = styled.div`
  width: 100%; 
  flex: 1;
  position: relative;
  ${spacingProps}

  button {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  p {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  img {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

S.EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%; 
  position: relative;
  ${spacingProps}

  > * {
    flex: 1;
    min-width: 0; 
  }

  > *:first-child,
  > *:last-child {
    flex: 1;
    min-width: 0;
  }

  span {
    flex: 0 0 auto;
    min-width: auto;
  }

  > *:nth-child(2) { /
    flex: 0 0 auto;
    min-width: auto;
  }

  > *:nth-child(3) { 
    flex: 1;
    min-width: 0;
  }

  > *:nth-child(4) { 
    flex: 1;
    min-width: 0;
  }
`;

S.ConfirmButtonWrapper = styled.div`
  ${flexCenter};
  margin-top: 200px;
  margin-bottom: 300px;
`;

S.ConfirmMessage = styled.div`
  color: ${({ theme }) => theme.PALLETE.text.error};
  font-size: 16px;
  margin-top: 8px;
  padding-left: 0;
  text-align: left;
`;

S.InputErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

S.BirthdayWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;

  div {
    flex: 1;
  }
`;

// =========================
// 회원가입 완료 페이지 스타일
// =========================
S.SignUpCompleteWrapper = styled.div`
  ${flexColumnCenter};
  gap: 40px 0;
  margin: 126px 0;
  text-align: center;
`;

S.CompleteIcon = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  border-radius: 50%;
  ${flexCenter};

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

S.CompleteTitle = styled.div`
  margin-top: 100px;
`;

S.CompleteButtonWrapper = styled.div`
  ${flexCenter};
  gap: 20px;
  margin-top: 100px;
`;

// =========================
// 프로필 등록 페이지 스타일
// =========================
S.SignUpProfileWrapper = styled.div`
  ${flexColumn};
  gap: 40px 0;
  margin-top: 150px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

S.ProfileSection = styled.div`
  ${flexColumn};
  gap: 40px 0;
`;

S.ProfileImageSection = styled.div`
  ${flexColumn};
  gap: 20px 0;
  align-items: center;
`;

S.ImageUploadArea = styled.div`
  ${flexColumn};
  gap: 20px 0;
  align-items: center;
`;

S.PlaceholderImage = styled.div`
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  ${flexCenter};
  color: #999;
  font-size: 14px;
`;

S.ProfileInfoSection = styled.div`
  ${flexColumn};
  gap: 30px 0;
`;

S.InputGroup = styled.div`
  ${flexColumn};
  gap: 12px 0;
`;

S.InterestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;

S.InterestItem = styled.div`
  padding: 12px 16px;
  border: 1px solid ${({ selected, theme }) => selected ? theme.PALLETE.primary.main : '#ddd'};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  background-color: ${({ selected, theme }) => selected ? theme.PALLETE.primary.main : 'white'};
  color: ${({ selected, theme }) => selected ? 'white' : '#333'};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.ButtonSection = styled.div`
  ${flexCenter};
  margin-top: 60px;
`;

export default S;
