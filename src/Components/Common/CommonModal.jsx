import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isConfigModal, setToken } from '../../Atom/atom';
const CommonModal = ({ deleteFeed }) => {
  const modalRef = useRef(null);
  const setIsConfigModal = useSetRecoilState(isConfigModal);

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsConfigModal(false);
    }
  };
  return (
    <SBackground onClick={handleClickOutside}>
      <SModal ref={modalRef}>
        <SContents>
          <div onClick={() => deleteFeed()}>삭제</div>
          <div>수정</div>
        </SContents>
      </SModal>
    </SBackground>
  );
};

export default CommonModal;
const SContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: var(--white);
  margin-top: 50px;
  gap: 40px;
  div {
    width: 40%;
    text-align: center;
  }
  div:nth-child(1) {
    color: red;
  }
  div:hover {
    background-color: var(--gray);
  }
`;
const SBackground = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: hidden;
  /* text-align: center; */
  background-color: rgba(0, 0, 0, 0.2);
`;
const modalfadeOut = keyframes`
  0% {  top: 100%;  }
  100% {  top: 80%;  }
`;

const SModal = styled.article`
  width: 100%;
  max-width: 390px;
  height: 100%;
  background-color: var(--black);
  border-radius: 47px 47px 0 0;
  position: fixed;
  top: 80%;

  transition: all 0.2s;
  animation: ${({ isLandingEnterState }) => (isLandingEnterState ? 'none' : modalfadeOut)} 0.1s ease-in;

  ::before {
    content: '';
    width: 50px;
    height: 4px;
    background-color: var(--border-gray);
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    border-radius: 15px;
    margin: 17px 0;
  }
`;
