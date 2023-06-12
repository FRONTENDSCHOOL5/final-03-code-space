import React from 'react';
import { Link } from 'react-router-dom';
const MyProfile = () => {
  return (
    <>
      <Link to="/follow">팔로우</Link>
      <Link to="/following">팔로잉</Link>
    </>
  );
};

export default MyProfile;
