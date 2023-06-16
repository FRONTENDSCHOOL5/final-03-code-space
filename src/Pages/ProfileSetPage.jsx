import React from 'react';
import ProfileHeader from '../Components/Common/ProfileHeader';
import Profile from '../Components/Common/Profile';
import Button from '../Components/Common/Button';
import styled from 'styled-components';

const ProfileSetPage = () => {
  return (
    <>
      <ProfileHeader HeadTitle="프로필 설정" HeadTxt="나중에 언제든 변경할 수 있습니다." />
      <Profile />
      <SBtnBox>
        <Button type="button">CodeSpace 시작하기</Button>
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
