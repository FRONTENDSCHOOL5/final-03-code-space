import { useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import MainProfile from '../Components/Profile/MainProfile';
import ProductList from '../Components/Product/ProductList';
// import MyProfileInfo from '../Components/Profile/MyProfileInfo';
import styled from 'styled-components';
import CommonModal from '../Components/Common/CommonModal';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import {
  configModalAtom,
  setAccountName,
  isLogOutAlertAtom,
  setToken,
  setIsLogined,
  searchFeedList,
  setIsFollowed,
  noneEnterAtom,
  isLoginModalSuccessAtom,
} from '../Atom/atom';

import { motion } from 'framer-motion';

import ProfilePost from '../Components/Post/ProfilePost';
import { useState } from 'react';
import AlertModal from '../Components/Common/AlertModal';
import { useEffect } from 'react';

function MyProfile() {
  // 프로필을 클릭했을 때 useLocation으로 해당 profile 정보 가져오기
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state;
  console.log(profile);
  const accountName = useRecoilValue(setAccountName);
  const ConfigModal = useRecoilValue(configModalAtom);
  const [alertModal, setAlertModal] = useRecoilState(isLogOutAlertAtom);
  const setTokenAtom = useSetRecoilState(setToken);
  const setIsLoginedAtom = useSetRecoilState(setIsLogined);
  const setAccountNameAtom = useSetRecoilState(setAccountName);
  const searchFeedListAtom = useSetRecoilState(searchFeedList);
  const setIsFollowedAtom = useSetRecoilState(setIsFollowed);
  // 로그아웃 시 랜딩 페이지 애니메이션
  const [noneEnter, setNoneEnter] = useRecoilState(noneEnterAtom);
  const [isLoginSucess, setIsLoginModalSucess] = useRecoilState(isLoginModalSuccessAtom);

  const [accountNameState, setAccountNameState] = useState(profile ? profile.accountname : accountName);
  useEffect(() => {
    setAccountNameState(profile ? profile.accountname : accountName);
  }, [navigate]);

  const handleLogout = () => {
    setAlertModal(false);
    navigate('/');

    // 토큰 상태 초기화 또는 삭제
    setTokenAtom('');
    setAccountNameAtom('');
    searchFeedListAtom('');
    setIsFollowedAtom(null);
    setIsLoginedAtom(false);
    setNoneEnter(false);
    setIsLoginModalSucess(false);
  };

  console.log(profile?.accountname);
  console.log(accountName);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SLayout>
        {accountNameState === accountName ? <MainHeader type={'myprofile'} /> : <MainHeader type={'profile'} />}
        <SContainer>
          <MainProfile accountName={accountNameState} />
        </SContainer>
        <SContainer>
          <ProductList accountName={accountNameState} />
        </SContainer>
        <ProfilePost accountName={accountNameState} />
        <BottomNav />
        {ConfigModal === 'post-config' ? (
          <CommonModal type="profile" />
        ) : ConfigModal !== '' && accountNameState !== accountName ? (
          <CommonModal type="other" />
        ) : (
          <></>
        )}
        {alertModal ? <AlertModal message="로그아웃 되었습니다." onClose={handleLogout} /> : <></>}
      </SLayout>
    </motion.div>
  );
}

export default MyProfile;

const SLayout = styled.div`
  background-color: #29292d;
`;

const SContainer = styled.div`
  margin-bottom: 6px;
`;
