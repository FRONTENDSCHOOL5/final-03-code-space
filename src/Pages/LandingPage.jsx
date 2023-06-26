import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Logo from '../assets/img/Logo.svg';
import Light from '../assets/img/light.svg';
import Splash from '../assets/img/splash.png';
import whitelight from '../assets/img/whitelight.svg';
import whitelight2 from '../assets/img/whitelight2.svg';
import whitelight3 from '../assets/img/whitelight3.svg';
import whitelight4 from '../assets/img/whitelight4.svg';
import whitelight5 from '../assets/img/whitelight5.svg';
import whitelight6 from '../assets/img/whitelight6.svg';
import LoginPage from './LoginPage';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  isLandingEnter,
  isModalAtom,
  noneEnterAtom,
  isLoginModalSuccessAtom,
  setIsLogined,
  isLoginAlertAtom,
  ShowGreenlightAtom
} from '../Atom/atom';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertModal from '../Components/Common/AlertModal';

const LandingPage = () => {
  const [isModal, setIsModal] = useRecoilState(isModalAtom);
  const [showGreenlight, setShowGreenlight] = useRecoilState(ShowGreenlightAtom);
  const noneEnter = useRecoilValue(noneEnterAtom);
  const isLoginModalSuccess = useRecoilValue(isLoginModalSuccessAtom);


  const setIsLandingEnter = useSetRecoilState(isLandingEnter);
  const isLandingEnterState = useRecoilValue(isLandingEnter);
  const [isLoginAlert, setisLoginAlert] = useRecoilState(isLoginAlertAtom);

  const location = useLocation();

  const isSignupPage = location.pathname === '/signup';
  const isAnimationDisabled = isSignupPage; // "/signup" 경로일 때 애니메이션 비활성화
  const isLoginSuccess = useRecoilValue(setIsLogined);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/feed');
    }

    if (location.state && location.state.showGreenlight === false) {
      setShowGreenlight(false);
    }
  }, []);

  const [isBlinking, setIsBlinking] = useState(false);
  const [isEnterClicked, setIsEnterClicked] = useState(false);

  const handleEnterHover = () => {
    setIsBlinking(true);
  };

  const handleEnterLeave = () => {
    setIsBlinking(false);
  };

  const handleEnterClick = () => {
    setIsLandingEnter(false);
    setIsModal(true);
    setIsBlinking(false);
    setIsEnterClicked(true);
  };

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
        {showGreenlight && !isEnterClicked && !isSignupPage && (
          <SgreenlightBackground isBlinking={isBlinking} isVisible={!isModal && !noneEnter} />
        )}
        {!isModal && !noneEnter && !isEnterClicked && !isSignupPage && (
          <SEnter
            isLandingEnterState={isLandingEnterState}
            isAnimationDisabled={isAnimationDisabled}
            onMouseEnter={handleEnterHover}
            onMouseLeave={handleEnterLeave}
            onClick={handleEnterClick}>
            ENTER
          </SEnter>
        )}
      </LogoBox>
      {isModal && <LoginPage setIsModal={setIsModal} />}
      {!isEnterClicked && !isSignupPage && (
        <>
          <SWhitelight1 isVisible={!isModal && !noneEnter} />
          <SWhitelight2 isVisible={!isModal && !noneEnter} />
          <SWhitelight3 isVisible={!isModal && !noneEnter} />
          <SWhitelight4 isVisible={!isModal && !noneEnter} />
          <SWhitelight5 isVisible={!isModal && !noneEnter} />
          <SWhitelight6 isVisible={!isModal && !noneEnter} />
        </>
      )}
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
    transform: rotate(540deg) scale(2.2);
  }
  87.5% {
    transform: rotate(630deg) scale(2.4);
  }
  100% {
    transform: rotate(720deg) scale(2.6);
    opacity: 0;
  }
`;

const SLogoImg = styled.img`
  width: 300px;
  position: relative;
  display: block;
  z-index: 2;
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
    `};
`;

// greenlight css

const blinkAnimation = keyframes`
  0% {
    opacity: 0;
  }
   50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const SgreenlightBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -78%);
  width: ${({ isLandingEnterState }) => (isLandingEnterState ? '435px' : '335px')};
  height: ${({ isLandingEnterState }) => (isLandingEnterState ? '435px' : '335px')};
  border-radius: 50%;
  background-image: url(${Light});
  background-size: cover;
  z-index: 1;

  ${({ isBlinking }) =>
    isBlinking &&
    css`
      animation: ${blinkAnimation} 1s ease-in-out infinite;
    `}
`;

// greenlight css 끝

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
  margin-top: 120px;
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
  position: relative;
`;

// whitelight 

const SWhitelight1 = styled.div`
  position: absolute;
  top: 18%;
  left: 18%;
  width: 35px;
  height: 35px;
  background-image: url(${whitelight});
  background-size: cover;
  z-index: 3;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const SWhitelight2 = styled.div`
  position: absolute;
  top: 28%;
  right: 23%;
  width: 20px;
  height: 20px;
  background-image: url(${whitelight2});
  background-size: cover;
  z-index: 3;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const SWhitelight3 = styled.div`
  position: absolute;
  bottom: 35%;
  left: 8%;
  width: 20px;
  height: 20px;
  background-image: url(${whitelight3});
  background-size: cover;
  z-index: 3;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const SWhitelight4 = styled.div`
  position: absolute;
  bottom: 20%;
  left: 30%;
  width: 15px;
  height: 15px;
  background-image: url(${whitelight4});
  background-size: cover;
  z-index: 3;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const SWhitelight5 = styled.div`
  position: absolute;
  top: 12%;
  left: 40%;
  width: 18px;
  height: 18px;
  background-image: url(${whitelight5});
  background-size: cover;
  z-index: 3;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const SWhitelight6 = styled.div`
  position: absolute;
  bottom: 20%;
  right: 13%;
  width: 38px;
  height: 38px;
  background-image: url(${whitelight6});
  background-size: cover;
  z-index: 3;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;
