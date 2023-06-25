import React from 'react';
import styled from 'styled-components';
import alertImg from '../../assets/icons/alert.png';

export default function AlertModal({ message, onClose }) {
  return (
    <SAlertWrap>
      <img src={alertImg} alt="alert이미지" />
      <SMessage>{message}</SMessage>
      <SButton onClick={() => onClose()}>확인</SButton>
    </SAlertWrap>
  );
}

const SAlertWrap = styled.div`
  background-color: var(--white);
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 200px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.671);

  img {
    display: block;
    margin-bottom: 25px;
  }
`;

const SMessage = styled.p`
  font-size: 16px;
  font-weight: bolder;
  color: var(--black);
`;

const SButton = styled.button`
  font-size: 12px;
  width: 50px;
  height: 30px;
  background-color: var(--point-color);
  border-radius: 10px;
  margin-top: auto;
  margin-left: auto;
`;
