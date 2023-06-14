import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Components/Common/Modal';

import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';

import { setToken } from '../Atom/atom';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const setTokenAtom = useSetRecoilState(setToken);
  const isToken = useRecoilValue(setToken);

  const inputHandler = (e) => {
    if (e.target.type === 'email') {
      setUserEmail(e.target.value);
    } else if (e.target.type === 'password') {
      setUserPassword(e.target.value);
    }
  };

  async function loginSubmit(e) {
    e.preventDefault();
    const url = 'https://api.mandarin.weniv.co.kr';

    try {
      const response = await axios.post(
        url + '/user/login/',
        {
          user: {
            email: userEmail,
            password: userPassword,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const userData = response.data.user;
      console.log(userData.token);
      setTokenAtom(userData.token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal
      title="로그인"
      loginSubmit={loginSubmit}
      userEmail={userEmail}
      userPassword={userPassword}
      inputHandler={inputHandler}
    />
  );
};

export default LoginPage;
