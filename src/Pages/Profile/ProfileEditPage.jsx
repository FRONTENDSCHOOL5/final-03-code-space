import React, { useState } from 'react';
import axios from 'axios';
import Profile from 'Components/Common/Profile';
import MainHeader from 'Components/Common/MainHeader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setToken, setAccountName } from 'Atom/atomStore';
import styled from 'styled-components';
import MyProfileInfo from '../../Components/Profile/MyProfileInfo';

const ProfileEditPage = ({ userEmail, userPassword }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const token = useRecoilValue(setToken);
  const setAccountNameAtom = useSetRecoilState(setAccountName);
  const [myprofile, setMyprofile] = useState({
    user: {
      username: '',
      accountname: '',
      intro: '',
      image: '',
    },
  });

  const setUserInfoValue = (key, value) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [key]: value,
    }));
  };

  const handleFormValidity = isValid => {
    setIsFormValid(isValid);
  };

  const handleSubmit = async () => {
    const URL = 'https://api.mandarin.weniv.co.kr/user';
    const requestData = {
      user: {
        username: userInfo.username,
        accountname: userInfo.accountId,
        intro: userInfo.intro,
        image: userInfo.profileImage,
      },
    };

    try {
      const response = await axios.put(URL, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setAccountNameAtom(response.data.user.accountname);
    } catch (error) {
      console.error(error);
    }
  };

  const myProfile = MyProfileInfo();

  return (
    <>
      <MainHeader type={'set-profile'} handleSubmit={handleSubmit} />
      <ProfileWrapper>
        <Profile
          onFormValidityChange={handleFormValidity}
          userInfo={userInfo}
          setUserInfoValue={setUserInfoValue}
          myProfile={myProfile}
        />
      </ProfileWrapper>
    </>
  );
};

export default ProfileEditPage;

const ProfileWrapper = styled.div`
  padding-top: 30px;
`;
