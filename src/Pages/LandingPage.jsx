import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Logo from '../assets/img/icon-logo.svg';
import Splash from '../assets/img/splash.png';
import LoginPage from './LoginPage';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { isLandingEnter } from '../Atom/atom';

const LandingPage = () => {
  const [isModal, setIsModal] = useState(false);

  const setIsLandingEnter = useSetRecoilState(isLandingEnter);
  const isLandingEnterState = useRecoilValue(isLandingEnter);
  console.log(isLandingEnterState);
  const handleClick = () => {
    setIsLandingEnter(false);
    setIsModal(true);
  };

  return (
    <>
      <SBackground>
        <LogoBox>
          <SLogoImg isLandingEnterState={isLandingEnterState} src={Logo} alt="로고이미지" />
          {isModal ? (
            <LoginPage />
          ) : (
            <SEnter isLandingEnterState={isLandingEnterState} onClick={handleClick}>
              ENTER
            </SEnter>
          )}
        </LogoBox>
      </SBackground>
    </>
  );
};

export default LandingPage;
const logofadeOut = keyframes`
  0% { transform: translateY(0);  }
  100% { transform: translateY(-45%);  }
`;
const enterScale = keyframes`
  0% { scale: 1;   }
  100% { scale: 1.1;  }
`;
const SLogoImg = styled.img`
  width: 300px;
  display: block;
  transition: all 2s;
  width: ${({ isLandingEnterState }) => (isLandingEnterState ? '300px' : '250px')};
  transform: translateY(${({ isLandingEnterState }) => (isLandingEnterState ? 0 : '-45%')});
  animation: ${({ isLandingEnterState }) => (isLandingEnterState ? 'none' : logofadeOut)} 0.8s ease-in;
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
  animation: ${({ isLandingEnterState }) => (isLandingEnterState ? enterScale : fadeOut)} 1s ease-out;
  color: var(--white);
  font-family: var(--title-font);
  font-size: 40px;
  margin-top: 40px;
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
