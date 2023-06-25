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
import ProfileResetPage from './Pages/ProfileResetPage';
import { SMainLayout, Sbackground } from './Styles/MainLayoutStyle';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from './Route/PrivateRoute';

function App() {
  return (
    <Sbackground>
      <GlobalStyle />
      <AnimatePresence>
        <SMainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfileSetPage />} />
            {/* PrivateRoute로 변경 */}
            <Route path="/feed" element={<PrivateRoute path="/" element={<FeedPage />} />} />
            <Route path="/feeddetail" element={<PrivateRoute path="/" element={<FeedDetailPage />} />} />
            <Route path="/search" element={<PrivateRoute path="/" element={<SearchPage />} />} />
            <Route path="/profile" element={<PrivateRoute path="/" element={<ProfileSetPage />} />} />
            <Route path="/setprofile" element={<PrivateRoute path="/" element={<ProfileResetPage />} />} />
            <Route path="/myprofile" element={<PrivateRoute path="/" element={<MyProfilePage />} />} />
            <Route path={'/myprofile/:accountname'} element={<PrivateRoute path="/" element={<MyProfilePage />} />} />

            <Route path="/messagelist" element={<PrivateRoute path="/" element={<MessageListPage />} />} />
            <Route path="/message" element={<PrivateRoute path="/" element={<MessagePage />} />} />
            <Route path="/post" element={<PrivateRoute path="/" element={<PostPage />} />} />
            <Route path="/product" element={<PrivateRoute path="/" element={<ProductPage />} />} />
            <Route path="/follow" element={<PrivateRoute path="/" element={<FollowPage />} />} />
            <Route path="/following" element={<PrivateRoute path="/" element={<FollowingPage />} />} />
            <Route path="/*" element={<NotFoundErrorPage />} />
          </Routes>
        </SMainLayout>
      </AnimatePresence>
    </Sbackground>
  );
}

export default App;
