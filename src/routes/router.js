import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUpLayout from "../pages/auth/SignUpLayout";
import SignUpAgree from "../pages/auth/SignUpAgree";
import SignUpInfo from "../pages/auth/SignUpInfo";
import SignUpProfile from "../pages/auth/SignUpProfile";
import SignUpComplete from "../pages/auth/SignUpComplete";
import Calendar from "../pages/calendar/Calendar";
import CalendarDay from "../pages/calendar/CalendarDay";
import CalendarMonth from "../pages/calendar/CalendarMonth";
import Chatting from "../pages/chat/Chatting";
import Community from "../pages/community/Community";
import Layout from "../pages/layout/Layout";
import MyPage from "../pages/myPage/MyPage";
import AddHealthProfile from "../pages/profile/AddHealthProfile";
import AddProfile from "../pages/profile/AddProfile";
import Faq from "../pages/support/Faq";
import Inquiry from "../pages/support/Inquiry";
import DbtiQuestion from "../pages/dbti/DbtiQuestion";
import DbtiResult from "../pages/dbti/DbtiResult";
import Main from "../pages/main/Main";
import Matching from "../pages/matching/Matching";
import InquiryList from "../pages/support/InquiryList";
import InquiryDetail from "../pages/support/InquiryDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "main", element: <Main /> },
      { path: "sign-in", element: <SignIn /> },
      {
        path: "sign-up",
        element: <SignUpLayout />, // 진행바/공통 레이아웃
        children: [
          { index: true, element: <SignUpAgree /> }, // /sign-up
          { path: "info", element: <SignUpInfo /> }, // /sign-up/info
          { path: "profile", element: <SignUpProfile /> }, // /sign-up/profile
          { path: "complete", element: <SignUpComplete /> }, // /sign-up/complete
        ],
      },
      // 프로필 관련
      {
        path: "profile",
        element: <SignUpLayout />, 
        children: [
          { path: "add", element: <AddProfile /> },
          { path: "add-health", element: <AddHealthProfile /> },
        ],
      },
      // 캘린더 관련
      {
        path: "calendar",
        children: [
          { index: true, element: <Calendar /> },
          { path: "month", element: <CalendarMonth /> },
          // 캘린더 일정 상세
          { path: "day/:eventId", element: <CalendarDay /> },
        ],
      },
      // 커뮤니티 관련
      {
        path: "community",
        children: [
          { index: true, element: <Community /> },
        ],
      },
      // 마이페이지
      { path: "my-page", element: <MyPage /> },
      // 친구들 보러가기
      { path: "friends", element: <Matching /> },
      // DBTI
      { path: "dbti-question", element: <DbtiQuestion /> },
      { path: "dbti-result", element: <DbtiResult /> },
      // 채팅
      { path: "chatting", element: <Chatting /> },
      // 고객지원
      {
        path: "support",
        children: [
          { path: "faq", element: <Faq /> },
          { path: "customer-inquiry", element: <Inquiry /> },
          { path: "inquiry-list", element: <InquiryList />},
<<<<<<< HEAD
          { path: "inquiry-detail", element: <InquiryDetail />},
=======
          { path: "inquiry-detail/:id", element: <InquiryDetail />},
>>>>>>> 7ce7cfeeea3d97adf04799e68203868b9cb0b807
        ],
      },
    ],
  },
]);

export default router;