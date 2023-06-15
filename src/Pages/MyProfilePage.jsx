import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
const MyProfile = () => {
  return (
    <>
      <Link to="/follow">팔로우</Link>
      <Link to="/following">팔로잉</Link>
=======
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
>>>>>>> a6b5bc3fb350dad087b1f5c7fa42dc688ef0c0a1
    </>
  );
};

export default MyProfile;
