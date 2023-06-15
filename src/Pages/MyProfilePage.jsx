import React from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import MainProfile from '../Components/Profile/MainProfile';
import ProductList from '../Components/Product/ProductList';

// 프로필을 클릭했을 때 useLocation으로 해당 profile 정보 가져오기
function MyProfile() {
  const location = useLocation();
  const profile = location.state;
  console.log(profile);

  return (
    <>
      <MainHeader />
      <MainProfile profile={profile} />
      <ProductList accountName={profile.accountname} />
      <BottomNav />
    </>
  );
}

export default MyProfile;
