import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Logo from '../assets/img/icon-logo.svg';
import Splash from '../assets/img/splash.png';
import LoginPage from './LoginPage';
import { useRecoilState, useSetRecoilState, userec } from 'recoil';
import { useRecoilValue } from 'recoil';
import {
  isLandingEnter,
  isModalAtom,
  noneEnterAtom,
  isLoginModalSuccessAtom,
  setIsLogined,
  isLoginAlertAtom,
} from '../Atom/atom';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertModal from '../Components/Common/AlertModal';

const LandingPage = () => {
  const [isModal, setIsModal] = useRecoilState(isModalAtom);
  const noneEnter = useRecoilValue(noneEnterAtom);
  const isLoginModalSuccess = useRecoilValue(isLoginModalSuccessAtom);

  const setIsLandingEnter = useSetRecoilState(isLandingEnter);
  const isLandingEnterState = useRecoilValue(isLandingEnter);
  const [isLoginAlert, setisLoginAlert] = useRecoilState(isLoginAlertAtom);

  const location = useLocation();

  const handleClick = () => {
    setIsLandingEnter(false);
    setIsModal(true);
  };

  const isSignupPage = location.pathname === '/signup';
  const isAnimationDisabled = isSignupPage; // "/signup" 경로일 때 애니메이션 비활성화
  const isLoginSuccess = useRecoilValue(setIsLogined);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/feed');
    }
  }, []);

  return (
    <SBackground>
      {isLoginAlert ? <AlertModal message="로그인을 해주세요!" onClose={() => setisLoginAlert(false)} /> : null}

      <LogoBox>
        <SLogoImg
          isLandingEnterState={isLandingEnterState}
          src={Logo}
          alt="로고이미지"
          isAnimationDisabled={isAnimationDisabled}
          isLoginModalSuccess={isLoginModalSuccess}
        />
        {isModal ? (
          <LoginPage />
        ) : (
          !isSignupPage &&
          !noneEnter && ( // 회원가입 페이지와 로그인 완료시 Enter는 보이지 않게
            <SEnter
              isLandingEnterState={isLandingEnterState}
              isAnimationDisabled={isAnimationDisabled}
              onClick={handleClick}>
              ENTER
            </SEnter>
          )
        )}
      </LogoBox>
    </SBackground>
  );
};

export default LandingPage;

const logofadeOut = keyframes`
  0% { transform: translateY(0);  }
  100% { transform: translateY(-95%);  }
`;

const enterScale = keyframes`
  0% { scale: 1;   }
  100% { scale: 1.1;  }
`;

// 로그인 성공 후 애니메이션

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  12.5% {
    transform: rotate(90deg) scale(1.2);
  }
  25% {
    transform: rotate(180deg) scale(1.4);
  }
  37.5% {
    transform: rotate(270deg) scale(1.6);
  }
  50% {
    transform: rotate(360deg) scale(1.8);
  }
  62.5% {
    transform: rotate(450deg) scale(2);
  }
  75% {
    transform: rotate(540deg) scale(1.8);
  }
  87.5% {
    transform: rotate(630deg) scale(1.6);
  }
  100% {
    transform: rotate(720deg) scale(1);
    opacity: 0;
  }
`;

const textAnimation = keyframes`
  0% {
    color: var(--white); 
    content: "";
  }
  50% {
    color: var(--point-color);
    content: "CodeSpace";
  }
  100% {
    color: var(--point-color);
    content: "CodeSpace";
  }
`;

const SLogoImg = styled.img`
  width: 300px;
  position: relative;
  display: block;
  transition: all 2s;
  width: ${({ isLandingEnterState, isAnimationDisabled }) =>
    isAnimationDisabled ? '200px' : isLandingEnterState ? '300px' : '200px'};
  transform: translateY(${({ isLandingEnterState }) => (isLandingEnterState ? '40%' : '-95%')});
  animation: ${({ isLandingEnterState, isAnimationDisabled }) =>
      isAnimationDisabled ? 'none' : isLandingEnterState ? 'none' : logofadeOut}
    0.8s ease-in;

  // 로그인에 성공했을 때 로고이미지의 애니메이션

  ${({ isLoginModalSuccess }) =>
    isLoginModalSuccess &&
    css`
      animation: ${rotationAnimation} 3s linear forwards;
      transform-origin: center;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: ${textAnimation} 2.5s ease-in forwards;
        color: var(--point-color);
        content: '';
      }
    `};
`;
const LogoBox = styled.div`
  padding-top: 170px;
  padding-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const SEnter = styled.div`
  cursor: pointer;
  opacity: ${({ isLandingEnterState }) => (isLandingEnterState ? 1 : 0)};
  animation: ${({ isLandingEnterState, isAnimationDisabled }) =>
      isAnimationDisabled ? 'none' : isLandingEnterState ? enterScale : fadeOut}
    1s ease-out;
  color: var(--white);
  font-family: var(--title-font);
  font-size: 40px;
  margin-top: 100px;
  text-align: center;
  font-style: italic;
  &:hover {
    transition: all 0.8s;
    color: var(--point-color);
    scale: 1.3;
  }
`;

const SBackground = styled.div`
  min-height: 100vh;
  background-image: url(${Splash});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.5);
`;
