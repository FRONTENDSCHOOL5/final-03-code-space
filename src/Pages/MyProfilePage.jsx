import { useLocation } from 'react-router-dom';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import MainProfile from '../Components/Profile/MainProfile';
import ProductList from '../Components/Product/ProductList';
import MyProfileInfo from '../Components/Profile/MyProfileInfo';
import styled from 'styled-components';

import ProfilePost from '../Components/Post/ProfilePost';

// 프로필을 클릭했을 때 useLocation으로 해당 profile 정보 가져오기
function MyProfile() {
  const location = useLocation();
  let profile = location.state;
  // console.log(profile);
  // location으로 가져온 값이 있으면 그 값을, 값이 없다면 MyProfileInfo()값을 profile에 재할당
  profile = profile ? profile : MyProfileInfo();

  console.log(profile);
  return (
    <SLayout>
      <MainHeader />
      <SContainer>
        <MainProfile profile={profile} />
      </SContainer>
      <SContainer>
        <ProductList profile={profile} />
      </SContainer>
      <ProfilePost />
      <BottomNav />
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
