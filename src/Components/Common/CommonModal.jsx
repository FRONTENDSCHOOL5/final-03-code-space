import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isConfigModal, setToken } from '../../Atom/atom';
import { useNavigate } from 'react-router-dom';
const CommonModal = ({ deleteFeed, feedList, isEdit, setIsEdit }) => {
  const modalRef = useRef(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const setIsConfigModal = useSetRecoilState(isConfigModal);
  const navigate = useNavigate();
  const handleClickOutside = event => {
    const target = event.target;
    if (target.classList.contains('confirm-title')) {
      return;
    }
    if (modalRef.current && !modalRef.current.contains(target)) {
      setIsConfigModal(false);
    }
  };
  setIsEdit(true);

  function goEdit() {
    console.log(isEdit);
    navigate('/post', { state: { isEdit, ...feedList } });
  }
  return (
    <SBackground onClick={handleClickOutside}>
      <SModal ref={modalRef}>
        <SContents>
          <div onClick={() => setIsConfirmModal(true)}>삭제</div>
          <div onClick={() => goEdit()}>수정</div>
        </SContents>
      </SModal>
      {isConfirmModal && (
        <SConfirmModal>
          <SConfirmTitle className="confirm-title">게시글을 삭제할까요?</SConfirmTitle>
          <SConfirmContents>
            <SConfirmContent>취소</SConfirmContent>
            <div onClick={() => deleteFeed()}>삭제</div>
          </SConfirmContents>
        </SConfirmModal>
      )}
    </SBackground>
  );
};

export default CommonModal;
const SConfirmModal = styled.div`
  background-color: var(--black);
  width: 250px;
  text-align: center;
  border-radius: 10px;
  color: var(--white);
`;
const SConfirmTitle = styled.div`
  padding: 20px 40px;
  border-bottom: 1px solid var(--border-gray);
`;
const SConfirmContents = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  div {
    flex: 1;
    height: 100%;
    padding: 15px;
    &:hover {
      background-color: var(--gray);
    }
  }
  div:nth-child(1) {
    border-bottom-left-radius: 10px;
  }
  div:nth-child(2) {
    color: red;
    border-bottom-right-radius: 10px;
  }
`;
const SConfirmContent = styled.div`
  border-right: 1px solid var(--border-gray);
`;

const SContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white);
  margin-top: 50px;
  gap: 30px;
  div {
    width: 40%;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
  }
  div:nth-child(1) {
    color: red;
    font-weight: bold;
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
