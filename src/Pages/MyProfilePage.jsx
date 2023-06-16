import { useLocation } from 'react-router-dom';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import MainProfile from '../Components/Profile/MainProfile';
import ProductList from '../Components/Product/ProductList';
import MyProfileInfo from '../Components/Profile/MyProfileInfo';

// 프로필을 클릭했을 때 useLocation으로 해당 profile 정보 가져오기
function MyProfile() {
  const location = useLocation();
  let profile = location.state;
  // console.log(profile);
  // location으로 가져온 값이 있으면 그 값을, 값이 없다면 MyProfileInfo()값을 profile에 재할당
  profile = profile ? profile : MyProfileInfo();

  console.log(profile);
  return (
    <>
      <MainHeader />
      <MainProfile profile={profile} />
      <ProductList profile={profile} />
      <BottomNav />
    </>
  );
}

export default MyProfile;
