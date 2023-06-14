import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/Logo (1).png';
import LogoTitile from '../assets/img/Code Space.png';
import kakaoIcon from '../assets/icons/kakao.svg';
import GoogleIcon from '../assets/icons/google.svg';
import FacebookIcon from '../assets/icons/facebook.svg';
import Button from '../Components/Common/Button';

const LandingPage = () => {
  return (
    <SMain>
      <LogoBox>
        <img className="LogoImg" src={Logo} alt="로고이미지" />
        <div className="LogoTitleBox">
          <img className="LogoTitleImg" src={LogoTitile} alt="코드스페이스" />
        </div>
      </LogoBox>
      <SLoginList>
        <SLoginItem>
          <KakaoLogin>
            <img src={kakaoIcon} alt="카카오톡 로고" />
            <p>카카오톡 계정으로 로그인</p>
          </KakaoLogin>
        </SLoginItem>
        <SLoginItem>
          <GoogleLogin>
            <img src={GoogleIcon} alt="구글 로고" />
            <p>구글 계정으로 로그인</p>
          </GoogleLogin>
        </SLoginItem>
        <SLoginItem>
          <FacebookLogin>
            <img src={FacebookIcon} alt="페이스북 로고" />
            <p>페이스북 계정으로 로그인</p>
          </FacebookLogin>
        </SLoginItem>
      </SLoginList>
      <FootLink>
        <Link to="/Login" className="EmailLink">
          이메일로 로그인
        </Link>
        <Link to="/signup" className="SignUpLink">
          회원가입
        </Link>
      </FootLink>
    </SMain>
  );
};

export default LandingPage;

const LogoBox = styled.div`
  padding-top: 170px;
  padding-bottom: 90px;
  .LogoImg {
    width: 150px;
    display: block;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  .LogoTitleImg {
    display: block;
    margin: 0 auto;
  }
`;

const SLoginList = styled.ul`
  margin: 0 auto;
  width: 322px;
`;

const SLoginItem = styled.li`
  margin-bottom: 10px;
`;

const KakaoLogin = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  background-color: var(--black);
  border: 1px solid #f2c94c;
  color: #767676;
  img {
    margin-left: 17px;
    margin-right: 52px;
  }
`;

const GoogleLogin = styled(KakaoLogin)`
  border: 1px solid #767676;
  img {
    margin-right: 64px;
  }
`;

const FacebookLogin = styled(KakaoLogin)`
  border: 1px solid #2d9cdb;
  img {
    margin-right: 56px;
  }
`;

const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  height: 100vh;
`;

const FootLink = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  .EmailLink {
    color: #767676;
    position: relative;
    &:hover {
      color: #f8f8f8;
    }
  }

  .EmailLink::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 100%;
    background-color: #cacaca;
    position: absolute;
    left: 110%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .SignUpLink {
    color: #767676;
    padding-left: 20px;
    &:hover {
      color: #f8f8f8;
    }
  }
`;
