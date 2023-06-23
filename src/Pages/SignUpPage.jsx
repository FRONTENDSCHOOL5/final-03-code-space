import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Components/Common/Modal';
import Profile from '../Components/Common/Profile';
import LandingPage from './LandingPage';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [successRes, setSuccessRes] = useState('');
  const [isSubmitBtn, setIsSubmitBtn] = useState(false);

  const inputHandler = e => {
    if (e.target.type === 'email') {
      setUserEmail(e.target.value);
    } else if (e.target.type === 'password') {
      setUserPassword(e.target.value);
    }
  };

  const ValidSubmit = async e => {

    if (userPassword.length < 6) {
      setIsPasswordValid(false);
    }

    const url = 'https://api.mandarin.weniv.co.kr';
    console.log(userEmail);
    try {
      const response = await axios.post(
        url + '/user/emailvalid/',
        {
          user: {
            email: userEmail,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setSuccessRes(response.data.message);
      console.log(response.data.message);

      if (successRes === '사용 가능한 이메일 입니다.' && isSubmitBtn) {
        navigate(`/profile`, { state: { userEmail, userPassword } });
      }
    } catch (error) {
      setSuccessRes(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <LandingPage />
      <Modal
        title="이메일로 회원가입"
        ValidSubmit={ValidSubmit}
        userEmail={userEmail}
        userPassword={userPassword}
        inputHandler={inputHandler}
        isPasswordValid={isPasswordValid}
        successRes={successRes}
        setIsSubmitBtn={setIsSubmitBtn}
      />
    </>
  );
};

export default SignUpPage;
