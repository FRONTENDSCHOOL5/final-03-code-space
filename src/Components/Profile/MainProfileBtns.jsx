import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconChat from '../../assets/icons/chat.png';
import iconShare from '../../assets/icons/share.png';
import Button from '../Common/Button';

export default function MainProfileBtns({ isMyProfile }) {
  if (isMyProfile) {
    return (
      <SBtnLayout>
        <Button width="120px" myProfileBtn={true}>
          <Link to="/profile">프로필 수정</Link>
        </Button>
        <Button width="100px" myProfileBtn={true}>
          <Link to="/product">상품 등록</Link>
        </Button>
      </SBtnLayout>
    );
  } else if (!isMyProfile) {
    return (
      <SBtnContainer>
        <SChatBtn />
        <Button width="120px">팔로우</Button>
        <SShareBtn />
      </SBtnContainer>
    );
  }
}

const SBtnLayout = styled.div`
  box-shadow: inset 0 0 20px red;
  text-align: center;

  button:first-child {
    margin-right: 12px;
  }
`;

const SBtnContainer = styled.div`
  box-shadow: inset 0 0 20px red;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

const SChatBtn = styled.button`
  background: url(${iconChat}) no-repeat center/ 15px 15px;
  width: 34px;
  height: 34px;
  border: 1px solid var(--border-gray);
  border-radius: 50%;
`;

const SShareBtn = styled(SChatBtn)`
  background: url(${iconShare}) no-repeat center/ 20px 20px;
`;
