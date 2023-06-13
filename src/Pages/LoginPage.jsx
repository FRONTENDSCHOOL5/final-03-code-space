import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LoginHeader from '../Components/Common/LoginHeader';
import Input from '../Components/Common/Input';
import Button from '../Components/Common/Button';

import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';

import { setToken } from '../Atom/atom';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const setTokenAtom = useSetRecoilState(setToken);

  const isToken = useRecoilValue(setToken);

  console.log(isToken);

  const InputHandler = e => {
    if (e.target.type === 'email') {
      setUserEmail(e.target.value);
    } else if (e.target.type === 'password') {
      setUserPassword(e.target.value);
    }
  };

  console.log(userEmail, userPassword);

  async function LoginSubmit(e) {
    console.log('gkjgkg');
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
      console.log(response.data.user.token);
      setTokenAtom(response.data.user.token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SMain onSubmit={LoginSubmit}>
      <LoginHeader HeadTitle="로그인" />
      <Input
        id="user-email"
        type="email"
        placeholder="email"
        label="이메일"
        LabelHtmlFor="user-email"
        value={userEmail}
        onChange={InputHandler}
      />
      <Input
        id="user-password"
        type="password"
        placeholder="password"
        label="비밀번호"
        LabelHtmlFor="user-password"
        value={userPassword}
        onChange={InputHandler}
      />
      <SBtnBox>
        <Button type="submit">다음</Button>
      </SBtnBox>
    </SMain>
  );
};

export default LoginPage;

const SMain = styled.form`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  height: 100vh;

  .Error {
    margin-left: 32px;
    margin-top: -10px;
    font-size: 12px;
    color: #2bae66;
  }

  Button {
    margin-top: 20px;
  }
`;

const SBtnBox = styled.div`
  margin: 16px 32px;
`;
