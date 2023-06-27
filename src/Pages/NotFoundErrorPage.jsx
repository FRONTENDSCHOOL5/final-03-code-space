import React from 'react';
import styled from 'styled-components';
import Splash from 'assets/img/splash.png';
import errorIcon from 'assets/img/error404.svg';
import Button from 'Components/Common/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <SBackground>
        <LogoBox>
          <SLogoImg src={errorIcon} alt="로고이미지" />
          <SEnter>페이지를 찾을 수 없습니다 : </SEnter>
          <Button width="30%" onClick={() => navigate('/')}>
            홈으로 가기
          </Button>
        </LogoBox>
      </SBackground>
    </>
  );
};

export default NotFoundErrorPage;

const SLogoImg = styled.img`
  width: 300px;
  display: block;
  transition: all 2s;
`;
const LogoBox = styled.div`
  padding-top: 170px;
  padding-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SEnter = styled.div`
  cursor: pointer;
  color: var(--white);
  font-family: var(--title-font);
  font-size: 26px;
  text-align: center;
  font-style: italic;
  margin-bottom: 20px;
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
