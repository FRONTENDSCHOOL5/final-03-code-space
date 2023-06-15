import React from 'react';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import MainProfile from '../Components/Profile/MainProfile';
import ProductList from '../Components/Product/ProductList';

function MyProfile() {
  return (
    <>
      <MainHeader />
      <MainProfile />
      <ProductList />
      <BottomNav />
    </>
  );
}

export default MyProfile;
