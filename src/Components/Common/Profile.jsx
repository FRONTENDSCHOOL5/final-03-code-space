import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from 'assets/icons/profileicon.svg';
import { ReactComponent as UploadImgIcon } from 'assets/icons/uploadImg.svg';
import Input from './Input';

export default function Profile({ onFormValidityChange, setUserInfoValue, myProfile }) {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [accountId, setAccountId] = useState('');
  const [accountMessage, setAccountMessage] = useState('');
  const [Intro, setIntro] = useState('');

  useEffect(() => {
    const isValid = username !== '' && accountId !== '' && accountMessage === '사용 가능한 계정ID 입니다.';
    onFormValidityChange(isValid);
  }, [username, accountId, accountMessage, onFormValidityChange]);

  const handleImageUpload = async e => {
    const formData = new FormData();
    const imageFile = e.target.files[0];
    formData.append('image', imageFile);

    try {
      const response = await axios.post('https://api.mandarin.weniv.co.kr/image/uploadfile', formData);
      const imageUrl = 'https://api.mandarin.weniv.co.kr/' + response.data.filename;
      setProfileImage(imageUrl);
      setUserInfoValue('profileImage', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleUsernameChange = e => {
    const value = e.target.value;
    if (value.length <= 10) {
      setUserInfoValue('username', value);
      setUsername(value.slice(0, 10));
    }
  };

  const handleAccountIdChange = e => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^a-zA-Z0-9._]/g, '');
    setUserInfoValue('accountId', sanitizedValue);
    setAccountId(sanitizedValue);
  };

  const handleAccountIdBlur = async () => {
    const url = 'https://api.mandarin.weniv.co.kr';
    try {
      const response = await axios.post(
        url + '/user/accountnamevalid',
        {
          user: {
            accountname: accountId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setAccountMessage(response.data.message);
    } catch (error) {}
  };

  const handleIntroChange = e => {
    const value = e.target.value;
    setUserInfoValue('intro', value);
    setIntro(value);
  };

  return (
    <Container>
      <CenteredDiv>
        <ProfileWrap>
          {myProfile && myProfile.image ? (
            <StyledProfileImageWrapper>
              <StyledProfileImage src={profileImage ? profileImage : myProfile.image} alt="Profile Image" />
            </StyledProfileImageWrapper>
          ) : profileImage ? (
            <StyledProfileImageWrapper>
              <StyledProfileImage src={profileImage} alt="Profile Image" />
            </StyledProfileImageWrapper>
          ) : (
            <DefaultProfileImageWrapper>
              <ProfileIcon />
            </DefaultProfileImageWrapper>
          )}
          <StyledUploadImg htmlFor="profile-image">
            <UploadImgIcon />
          </StyledUploadImg>
          <input id="profile-image" type="file" accept="image/*" onChange={handleImageUpload} hidden />
        </ProfileWrap>
      </CenteredDiv>
      <Input
        placeholder="2~10자 이내여야 합니다."
        label="사용자 이름"
        defaultValue={myProfile ? myProfile.username : username}
        onChange={handleUsernameChange}
      />
      <Input
        placeholder="영문, 숫자, 특수문자(.), (_)만 사용 가능합니다."
        label="계정 ID"
        defaultValue={myProfile ? myProfile.accountname : accountId}
        onChange={handleAccountIdChange}
        onBlur={handleAccountIdBlur}
      />
      {accountMessage === '사용 가능한 계정ID 입니다.' && <SSuccessMessage>{accountMessage}</SSuccessMessage>}
      {accountMessage !== '사용 가능한 계정ID 입니다.' && <SAccountMessage>{accountMessage}</SAccountMessage>}
      <Input
        placeholder="자신과 판매할 상품에 대해 소개해주세요."
        label="소개"
        defaultValue={myProfile ? myProfile.intro : Intro}
        onChange={handleIntroChange}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  Input {
    width: 300px;
  }
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileWrap = styled.div`
  position: relative;
`;

const StyledProfileImageWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const StyledProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const DefaultProfileImageWrapper = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: lightgray;
`;

const StyledUploadImg = styled.label`
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  svg {
    width: 36px;
    height: 36px;
  }
`;

const SAccountMessage = styled.p`
  color: #eb5757;
  font-size: 12px;
  text-align: left;
  margin-left: 32px;
`;

const SSuccessMessage = styled.p`
  color: var(--point-color);
  font-size: 12px;
  text-align: left;
  margin-left: 32px;
`;
