import { useLocation } from 'react-router-dom';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import MainProfile from '../Components/Profile/MainProfile';
import ProductList from '../Components/Product/ProductList';
import MyProfileInfo from '../Components/Profile/MyProfileInfo';
import styled from 'styled-components';
import CommonModal from '../Components/Common/CommonModal';
import { useRecoilValue } from 'recoil';
import { isModalAtom } from '../Atom/atom';

import ProfilePost from '../Components/Post/ProfilePost';

function MyProfile() {
  // 프로필을 클릭했을 때 useLocation으로 해당 profile 정보 가져오기
  const location = useLocation();
  let profileData = location.state;
  // console.log(profile);

  const myUserData = MyProfileInfo();
  const profile = profileData ? profileData : myUserData;

  const isModalState = useRecoilValue(isModalAtom);

  return (
    <SLayout>
      <MainHeader type={'profile'} />
      <SContainer>
        <MainProfile profile={profile} />
      </SContainer>
      <SContainer>
        <ProductList profile={profile} />
      </SContainer>
      <ProfilePost accountName={profile.accountname} />
      <BottomNav />
      {isModalState ? <CommonModal type="profile" /> : <></>}
    </SLayout>
  );
}

export default MyProfile;

const SLayout = styled.div`
  background-color: #29292d;
`;

const SContainer = styled.div`
  margin-bottom: 6px;
`;
