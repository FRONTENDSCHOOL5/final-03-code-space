import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import LandingPage from './Pages/LandingPage';
<<<<<<< HEAD
import ProductPage from './Pages/ProductPage';
=======
>>>>>>> a6b5bc3fb350dad087b1f5c7fa42dc688ef0c0a1
import FeedPage from './Pages/FeedPage';
import ProfileSetPage from './Pages/ProfileSetPage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import MessagePage from './Pages/MessagePage';
import MessageListPage from './Pages/MessageListPage';
import PostPage from './Pages/PostPage';
import FollowPage from './Pages/FollowPage';
import FollowingPage from './Pages/FollowingPage';
import MyProfilePage from './Pages/MyProfilePage';
import SearchPage from './Pages/SearchPage';
<<<<<<< HEAD
=======
import FeedDetailPage from './Pages/FeedDetailPage';
import Modal from './Components/Common/Modal';
import { SMainLayout } from './Styles/MainLayoutStyle';
>>>>>>> a6b5bc3fb350dad087b1f5c7fa42dc688ef0c0a1

function App() {
  return (
    <div>
      <GlobalStyle />
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfileSetPage />} />
        <Route path="/myprofile" element={<MyProfilePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/messagelist" element={<MessageListPage />} />
        <Route path="/messagelist" element={<MessagePage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/follow" element={<FollowPage />} />
        <Route path="/following" element={<FollowingPage />} />
      </Routes>
=======
      <SMainLayout>
        <SMainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feeddetail" element={<FeedDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfileSetPage />} />
            <Route path="/myprofile" element={<MyProfilePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/messagelist" element={<MessageListPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/follow" element={<FollowPage />} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/Modal" element={<Modal />} />
          </Routes>
          /
        </SMainLayout>
      </SMainLayout>
>>>>>>> a6b5bc3fb350dad087b1f5c7fa42dc688ef0c0a1
    </div>
  );
}
export default App;
