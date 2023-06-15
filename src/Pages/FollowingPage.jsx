import React from 'react';

<<<<<<< HEAD
const FollowingPage = () => {
=======
import { useRecoilValue } from 'recoil';
import { setToken } from '../Atom/atom';

const FollowingPage = () => {
  const isToken = useRecoilValue(setToken);
  console.log(isToken);

>>>>>>> a6b5bc3fb350dad087b1f5c7fa42dc688ef0c0a1
  return <div></div>;
};

export default FollowingPage;
