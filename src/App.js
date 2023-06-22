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
import FeedDetailPage from './Pages/FeedDetailPage';
import ProductPage from './Pages/ProductPage';
import NotFoundErrorPage from './Pages/NotFoundErrorPage';
import Modal from './Components/Common/Modal';
import { SMainLayout, Sbackground } from './Styles/MainLayoutStyle';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Sbackground>
      <GlobalStyle />
      <AnimatePresence>
        <SMainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feeddetail" element={<FeedDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfileSetPage />} />
            <Route path="/myprofile" element={<MyProfilePage />} />
            <Route path={'/myprofile/:accountname'} element={<MyProfilePage />} />

            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/messagelist" element={<MessageListPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/follow" element={<FollowPage />} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/*" element={<NotFoundErrorPage />} />
            <Route path="/landing" element={<LandingPage />} />
          </Routes>
        </SMainLayout>
      </AnimatePresence>
    </Sbackground>
  );
}
export default App;
