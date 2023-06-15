import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { isLandingEnter } from '../../Atom/atom';

const Modal = ({ title, loginSubmit, userEmail, userPassword, inputHandler, showErrorMessage }) => {
  const isFormValid = userEmail !== '' && userPassword !== '';
  const isLandingEnteState = useRecoilValue(isLandingEnter);

  const handleLoginSubmit = e => {
    e.preventDefault();
    loginSubmit(e);
  };

  return (
    <>
      {!isLandingEnteState ? (
        <SModal>
          <SModalTitle>{title}</SModalTitle>
          <SForm onSubmit={handleLoginSubmit}>
            <SFormWrap className="EmailForm">
              <label htmlFor="user-email">이메일</label>
              <SInput
                type="email"
                placeholder={title === '이메일로 회원가입' ? '이메일 주소를 입력해주세요' : ''}
                id="user-email"
                value={userEmail}
                onChange={inputHandler}
              />
            </SFormWrap>

            <SFormWrap className="PwForm">
              <label htmlFor="user-pw">비밀번호</label>
              <SInput
                type="password"
                id="user-password"
                placeholder={title === '이메일로 회원가입' ? '비밀번호를 설정해주세요' : ''}
                value={userPassword}
                onChange={inputHandler}
              />
              {showErrorMessage && <SErrorMessage>*이메일 또는 비밀번호가 일치하지 않습니다.</SErrorMessage>}
            </SFormWrap>
            <SBtnBox>
              <Button type="submit" disabled={!isFormValid}>
                로그인
              </Button>
            </SBtnBox>
          </SForm>
        </SModal>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;

const modalfadeOut = keyframes`
  0% {  top: 100%;  }
  100% {  top: 40%;  }
`;

const SModal = styled.article`
  width: 100%;
  max-width: 390px;
  height: 100%;
  background-color: var(--modal-gray);
  border-radius: 47px 47px 0 0;
  position: fixed;
  top: 40%;

  /* transition: all 2s; */
  animation: ${({ isLandingEnterState }) => (isLandingEnterState ? 'none' : modalfadeOut)} 1.4s ease-in;

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

const SModalTitle = styled.h1`
  color: var(--black);
  text-align: center;
  margin-top: 45px;
  font-size: 24px;
`;

const SForm = styled.form`
  padding: 15px 50px;
`;

const SFormWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  label {
    font-size: 12px;
    color: #767676;
  }
`;
const SInput = styled.input`
  background-color: var(--modal-gray);
  border: none;
  outline: none;
  border-bottom: 1px solid var(--gray);
  padding: 15px 0;
  color: var(--black);
  font-size: 14px;
  &:focus {
    transition: all 0.5s;
    border-bottom: 1px solid var(--point-color);
  }
  &::placeholder {
    color: var(--gray);
  }
`;

const SErrorMessage = styled.p`
  color: #eb5757;
  font-size: 12px;
  margin-top: 5px;
`;

const SBtnBox = styled.div`
  margin: 16px 32px;

  button:disabled {
    background-color: var(--secondary-color);
  }
`;
