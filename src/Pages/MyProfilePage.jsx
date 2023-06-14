import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../Components/Common/BottomNav';
import MainHeader from '../Components/Common/MainHeader';

const MyProfile = () => {
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
