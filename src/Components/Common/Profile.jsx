import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profileicon.svg';
import { ReactComponent as UploadImgIcon } from '../../assets/icons/uploadImg.svg';
import Input from './Input';

const DEFAULT_PROFILE_IMAGE = ProfileIcon;

export default function Profile({onFormValidityChange}) {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [accountId, setAccountId] = useState('');
  const [accountMessage, setAccountMessage] = useState('')
  const [Intro, setIntro] = useState('');

  useEffect(() => {
    const isValid = username !== '' && accountId !== '';
    onFormValidityChange(isValid);
  }, [username, accountId, onFormValidityChange]); // username과 accountId가 입력됐는지

  const handleImageUpload = async e => {
    const formData = new FormData();
    const imageFile = e.target.files[0];
    formData.append('image', imageFile);


    try {
      const response = await axios.post('https://api.mandarin.weniv.co.kr/image/uploadfile', formData);
      const imageUrl = 'https://api.mandarin.weniv.co.kr/' + response.data.filename;
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setUsername(value.slice(0, 10));
    }
  };

  const handleAccountIdChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^a-zA-Z0-9._]/g, "");
  
    setAccountId(sanitizedValue);
  
    if (sanitizedValue !== value) {
      e.target.value = sanitizedValue;
    }
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
        }
      );
  
      console.log(response.data.message);
      setAccountMessage(response.data.message); 
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const handleIntroChange = e => {
    setIntro(e.target.value);
  };

  
  return (
    <Container>
      <CenteredDiv>
        <MarginDiv>
          {profileImage ? (
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
        </MarginDiv>
      </CenteredDiv>
      <Input
        placeholder="2~10자 이내여야 합니다."
        label="사용자 이름"
        value={username}
        onChange={handleUsernameChange}
      />
      <Input
        placeholder="영문, 숫자, 특수문자(.), (_)만 사용 가능합니다."
        label="계정 ID"
        value={accountId}
        onChange={handleAccountIdChange}
        onBlur={handleAccountIdBlur}
      />
      <SAccountMessage>{accountMessage}</SAccountMessage>
      <Input
        placeholder="자신과 판매할 상품에 대해 소개해주세요."
        label="소개"
        value={Intro}
        onChange={handleIntroChange}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  Input {
    width: 300px;
  }
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarginDiv = styled.div`
  margin: 30px;
  position: relative;
`;

const StyledUploadImg = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const StyledProfileImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const StyledProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const DefaultProfileImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: lightgray;
`;

const SAccountMessage = styled.p `
  color: #eb5757;
  font-size: 12px;
  margin-top: 5px;
  `

