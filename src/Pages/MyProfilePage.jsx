import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNav from '../Components/Common/BottomNav';
import MainHeader from '../Components/Common/MainHeader';

const MyProfile = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <MainHeader type="profile" />
      <Link to="/follow">팔로우</Link>
      <Link to="/following">팔로잉</Link>
      <BottomNav />
    </>
  );
};

export default MyProfile;
