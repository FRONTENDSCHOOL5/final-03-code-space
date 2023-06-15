import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Components/Common/Modal';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [successRes, setSuccessRes] = useState('');

  const inputHandler = e => {
    if (e.target.type === 'email') {
      setUserEmail(e.target.value);
    } else if (e.target.type === 'password') {
      setUserPassword(e.target.value);
    }
  };

  const SignupSubmit = async e => {
    e.preventDefault();

    if (userPassword.length < 6) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }

    const url = 'https://api.mandarin.weniv.co.kr';

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
      console.log(response.data.message)

      if (successRes === '이미 가입된 이메일 주소 입니다.') {
      } else if (successRes === '사용 가능한 이메일 입니다.') {
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="이메일로 회원가입"
      SignupSubmit={SignupSubmit}
      userEmail={userEmail}
      userPassword={userPassword}
      inputHandler={inputHandler}
      isPasswordValid={isPasswordValid}
      successRes={successRes}
    />
  );
};

export default SignUpPage;
