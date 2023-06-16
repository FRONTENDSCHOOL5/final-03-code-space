import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profileicon.svg';
import { ReactComponent as UploadImgIcon } from '../../assets/icons/uploadImg.svg';
import Input from './Input';

export default function Profile() {
  return (
    <Container>
      <CenteredDiv>
        <MarginDiv>
          <StyledUploadImg />
          <ProfileIcon />
        </MarginDiv>
      </CenteredDiv>
      <Input placeholder="2~10자 이내여야 합니다." label="사용자 이름" />
      <Input placeholder="영문, 숫자, 특수문자(.), (_)만 사용 가능합니다." label="계정 ID" />
      <Input placeholder="자신과 판매할 상품에 대해 소개해주세요." label="소개" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  Input {
    width: 300px;
  }
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarginDiv = styled.div`
  margin: 30px;
  position: relative;
`;

const StyledUploadImg = styled(UploadImgIcon)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px; 
  height: 40px; 
`;
