import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import LandingPage from './Pages/LandingPage';
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
import { SMainLayout } from './Styles/MainLayoutStyle';

function App() {
  return (
    <div>
      <GlobalStyle />
      <SMainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/feed" element={<FeedPage />} />
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
        </Routes>
      </SMainLayout>
    </div>
  );
}
export default App;
