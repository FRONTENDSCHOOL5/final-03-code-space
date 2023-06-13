import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../Components/Product/ProductList';

const MyProfile = () => {
  return (
    <>
      <Link to="/follow">팔로우</Link>
      <Link to="/following">팔로잉</Link>

      <ProductList />
    </>
  );
};

export default MyProfile;
