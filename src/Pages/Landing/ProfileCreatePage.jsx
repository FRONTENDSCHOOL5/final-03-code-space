import React, { useState } from 'react';
import axios from 'axios';
import ProfileHeader from 'Components/Common/ProfileHeader';
import Profile from 'Components/Common/Profile';
import Button from 'Components/Common/Button';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import useMainAccountFollow from 'Hooks/useMainAccountFollow';
import { isModalAtom, ShowGreenlightAtom } from 'Atom/atomStore';
import { useRecoilState } from 'recoil';
import AlertModal from 'Components/Common/AlertModal';

const ProfileCreatePage = ({ userEmail, userPassword }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isModal, setIsModal] = useRecoilState(isModalAtom);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showGreenlight, setShowGreenlight] = useRecoilState(ShowGreenlightAtom);
  const location = useLocation();
  const userLoginInfo = location.state;

  const { followingAcount } = useMainAccountFollow();

  const setUserInfoValue = (key, value) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [key]: value,
    }));
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
        intro: userInfo.intro,
        image: userInfo.profileImage || 'https://api.mandarin.weniv.co.kr/1687265009141.png',
      },
    };

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === '회원가입 성공') {
        setShowAlertModal(true);
        followingAcount(userInfo.accountId);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const handleModalClose = () => {
    setShowAlertModal(false);
    setIsModal(true);
    setShowGreenlight(false);
    navigate('/');
  };

  return (
    <>
      <ProfileHeader HeadTitle="프로필 설정" HeadTxt="나중에 언제든 변경할 수 있습니다." />
      <Profile onFormValidityChange={handleFormValidity} userInfo={userInfo} setUserInfoValue={setUserInfoValue} />
      <SBtnBox>
        <Button
          type="submit"
          disabled={!isFormValid && userInfo.accountMessage !== '사용 가능한 계정 ID 입니다.'}
          onClick={handleSubmit}>
          CodeSpace 시작하기
        </Button>
      </SBtnBox>
      {showAlertModal && <AlertModal message="회원가입 성공" onClose={handleModalClose} />}
    </>
  );
};

export default ProfileCreatePage;

const SBtnBox = styled.div`
  margin: 16px 32px;

  button:disabled {
    background-color: var(--secondary-color);
  }
`;
