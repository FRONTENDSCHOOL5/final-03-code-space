import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '../Components/Common/Button';

const LandingPage = () => {
  return (
    <SMain>
      <LogoBox>
        <img src="" alt="" />
        <img src="" alt="" />
      </LogoBox>
      <LoginList>
        <li>
          <KakaoLogin></KakaoLogin>
        </li>
      </LoginList>
      <div>
        <Link to="" className="">
          이메일로 로그인
        </Link>
        <Link to="" className="">
          회원가입
        </Link>
      </div>
    </SMain>
  );
};

export default LandingPage;

const LogoBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: white;
`;

const LoginList = styled.ul``;

const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  height: 100vh;
`;

const KakaoLogin = styled(Button)`
  color: var(--black);
  border-color: #f2c94c;
`;

const FootLink = styled.div``;
