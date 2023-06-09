import React from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import Button from '../Components/Common/Button';
import Input from '../Components/Common/Input';
import LoginHeader from '../Components/Common/LoginHeader';
import BottomNav from '../Components/Common/BottomNav';
const MainPage = () => {
  return (
    <SMain>
      <MainHeader type="feed" />
      {/* <LoginHeader HeadTitle="이메일로 회원가입" /> */}
      <Input placeholder="email" label="이메일" />
      <Input placeholder="password" label="비밀번호" />
      <SBtnBox>
        <Button>다음</Button>
      </SBtnBox>
      <BottomNav />
    </SMain>
  );
};

export default MainPage;

const SBtnBox = styled.div`
  margin: 16px 32px;
`;

const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  height: 100vh;
`;
