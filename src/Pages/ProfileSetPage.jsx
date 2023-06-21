import React, { useState } from 'react';
import axios from 'axios';
import ProfileHeader from '../Components/Common/ProfileHeader';
import Profile from '../Components/Common/Profile';
import Button from '../Components/Common/Button';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import useMainAccountFollow from '../Hooks/useMainAccountFollow';

const ProfileSetPage = ({ userEmail, userPassword }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const location = useLocation();
  const userLoginInfo = location.state;
  console.log(userLoginInfo);

  const { followingAcount } = useMainAccountFollow();

  const setUserInfoValue = (key, value) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [key]: value,
    }));
    console.log(userInfo);
  };

  const handleFormValidity = isValid => {
    setIsFormValid(isValid);
  };

  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    const url = 'https://api.mandarin.weniv.co.kr/user';

    const requestData = {
      user: {
        username: userInfo.username,
        email: userLoginInfo.userEmail,
        password: userLoginInfo.userPassword,
        accountname: userInfo.accountId,
        Intro: userInfo.intro,
        image: userInfo.profileImage || "https://api.mandarin.weniv.co.kr/1687265009141.png",
      },
    };

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('User profile created:', response.data);

      if (response.data.message === '회원가입 성공') {
        navigate('/login'); 
        followingAcount(userInfo.accountId);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  return (
    <>
      <ProfileHeader HeadTitle="프로필 설정" HeadTxt="나중에 언제든 변경할 수 있습니다." />
      <Profile onFormValidityChange={handleFormValidity} userInfo={userInfo} setUserInfoValue={setUserInfoValue} />
      <SBtnBox>
      <Button type="submit" disabled={!isFormValid && userInfo.accountMessage !== '사용 가능한 계정 ID 입니다.'} onClick={handleSubmit}>
          CodeSpace 시작하기
        </Button>
      </SBtnBox>
    </>
  );
};

export default ProfileSetPage;

const SBtnBox = styled.div`
  margin: 16px 32px;

  button:disabled {
    background-color: var(--secondary-color);
  }
`;
