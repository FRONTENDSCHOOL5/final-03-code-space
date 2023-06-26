import { Route, Routes } from 'react-router-dom';
import GlobalStyle from 'Styles/globalStyle';
import LandingPage from 'Pages/Landing/LandingPage';
import FeedPage from 'Pages/Feed/FeedPage';
import ProfileCreatePage from 'Pages/Landing/ProfileCreatePage';
import SignUpPage from 'Pages/Landing/SignUpPage';
import LoginPage from 'Pages/Landing/LoginPage';
import MessagePage from 'Pages/Message/MessagePage';
import MessageListPage from 'Pages/Message/MessageListPage';
import PostPage from 'Pages/Feed/PostPage';
import FollowPage from 'Pages/Profile/FollowPage';
import FollowingPage from 'Pages/Profile/FollowingPage';
import MyProfilePage from 'Pages/Profile/MyProfilePage';
import SearchPage from 'Pages/Feed/SearchPage';
import FeedDetailPage from 'Pages/Feed/FeedDetailPage';
import ProductPage from 'Pages/Profile/ProductPage';
import NotFoundErrorPage from 'Pages/NotFoundErrorPage';
import ProfileEditPage from 'Pages/Profile/ProfileEditPage';
import { SMainLayout, Sbackground, Sastronaut } from 'Styles/MainLayoutStyle';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from 'Route/PrivateRoute';

function App() {
  return (
    <Sbackground>
      <GlobalStyle />
      <Sastronaut />
      <AnimatePresence>
        <SMainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfileCreatePage />} />
            {/* PrivateRoute로 변경 */}
            <Route path="/feed" element={<PrivateRoute path="/" element={<FeedPage />} />} />
            <Route path="/feeddetail" element={<PrivateRoute path="/" element={<FeedDetailPage />} />} />
            <Route path="/search" element={<PrivateRoute path="/" element={<SearchPage />} />} />
            <Route path="/profile" element={<PrivateRoute path="/" element={<ProfileCreatePage />} />} />
            <Route path="/editprofile" element={<PrivateRoute path="/" element={<ProfileEditPage />} />} />
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
