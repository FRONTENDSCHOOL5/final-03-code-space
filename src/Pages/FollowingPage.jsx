import React from 'react';

import { useRecoilValue } from 'recoil';
import { setToken } from '../Atom/atom';

const FollowingPage = () => {
  const isToken = useRecoilValue(setToken);
  console.log(isToken);

  return <div></div>;
};

export default FollowingPage;
