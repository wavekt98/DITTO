import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ClassListPage from "../pages/Class/ClassListPage";
import ClassDetailPage from "../pages/Class/ClassDetailPage";
import MeetingPage from "../pages/Meeting/MeetingPage";
import LoginPage from "../pages/User/LoginPage";
import KakaoCallback from "../pages/User/KakaoCallback";
import MyPage from "../pages/Mypage/MyPage";
import SignupPage from "../pages/User/SignupPage";
import BoardListPage from "../pages/Board/BoardListPage";
import BoardDetailPage from "../pages/Board/BoardDetailPage";
import BoardAddPage from "../pages/Board/BoardAddPage";
import ProfileDetailPage from "../pages/Profile/ProfileDetailPage";
import ProfileSearchPage from "../pages/Profile/ProfileSearchPage";
import UserInfoDetail from "../pages/Mypage/UserInfoPage/UserInfoDetailPage";
import PaymentPage from "../pages/Mypage/PaymentPage/PaymentPage";
import ClassAddPage from "../pages/Class/ClassAddPage";
import MyQuestionsPage from "../pages/Mypage/QuestionPage/MyQuestionsPage";
import ReviewListPage from "../pages/Mypage/ReviewListPage/ReviewListPage";
import LikedPage from "../pages/Mypage/LikedPage/LikedPage";
import ProAccountPage from "../pages/Mypage/UserInfoPage/ProUserInfoDetailPage";
import MileagePage from "../pages/Mypage/Mileage/MileagePage";
import ProQuestionPage from "../pages/Mypage/QuestionPage/ProQuestionPage";
import MyClassroomPage from "../pages/MyClassroom/MyClassroomPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/classes/detail/:classId" element={<ClassDetailPage />} />
      <Route path="/classes" element={<ClassListPage />} />
      <Route path="/classes/:classCategory" element={<ClassListPage />} />
      <Route path="/classes/add" element={<ClassAddPage />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/callback" element={<KakaoCallback />} />
      <Route path="/mypage/*" element={<MyPage />}>
        {/* Nested Routes */}
        <Route path="userinfo" element={<UserInfoDetail />} />
        <Route path="payments" element={<PaymentPage />} />
        <Route path="questions" element={<MyQuestionsPage />} />
        <Route path="reviews" element={<ReviewListPage />} />
        <Route path="liked" element={<LikedPage />} />
        <Route path="prouserinfo" element={<ProAccountPage />} />
        <Route path="mileage" element={<MileagePage />} />
        <Route path="proquestion" element={<ProQuestionPage />} />
      </Route>
      <Route path="/myclassroom" element={<MyClassroomPage />} />
      <Route path="/board/:boardCategory" element={<BoardListPage />} />
      <Route
        path="/board/:boardCategory/:postId"
        element={<BoardDetailPage />}
      />
      <Route path="/board/add" element={<BoardAddPage />} />
      <Route path="/board/edit/:postId" element={<BoardAddPage />} />
      <Route path="/profile/:profileId" element={<ProfileDetailPage />} />
      <Route path="/profile/search" element={<ProfileSearchPage />} />
    </Routes>
  );
};

export default AppRoutes;
