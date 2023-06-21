import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { isConfigModal, setToken, setAccountName, searchFeedList, setIsFollowed, setIsLogined } from '../../Atom/atom';
import { useNavigate } from 'react-router-dom';

const CommonModal = ({ deleteFeed, feedList, isEdit, setIsEdit, type, deleteComment }) => {
  const modalRef = useRef(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const setConfigModalAtom = useSetRecoilState(isConfigModal); // 이거 충돌날 수도 있는 부분
  const setTokenAtom = useSetRecoilState(setToken);
  const setAccountNameAtom = useSetRecoilState(setAccountName);
  const searchFeedListAtom = useSetRecoilState(searchFeedList);
  const setIsFollowedAtom = useSetRecoilState(setIsFollowed);
  const setIsLoginedAtom = useSetRecoilState(setIsLogined);

  const navigate = useNavigate();

  const handleClickOutside = event => {
    const target = event.target;
    if (target.classList.contains('confirm-title')) {
      return;
    }
    if (modalRef.current && !modalRef.current.contains(target)) {
      setConfigModalAtom(false);
    }
  };

  useEffect(() => {
    if (type === 'post-config') {
      setIsEdit(true);
    }
  }, []);

  // 로그아웃
  const handleLogout = () => {
    // 토큰 상태 초기화 또는 삭제
    setTokenAtom('');
    setAccountNameAtom('');
    searchFeedListAtom('');
    setIsFollowedAtom(null);
    setIsLoginedAtom(false);
    alert('로그아웃 성공');
    navigate('/');
  };

  function goEdit() {
    navigate('/post', { state: { isEdit, ...feedList } });
  }
  return (
    <SBackground onClick={handleClickOutside}>
      <SModal ref={modalRef}>
        {type === 'post-config' ? (
          <SContents>
            <div className="accent" onClick={() => setIsConfirmModal(true)}>
              삭제
            </div>
            <div onClick={() => goEdit()}>수정</div>
          </SContents>
        ) : type === 'profile' ? (
          <SContents>
            <div>설정 및 개인정보</div>
            <div onClick={() => setIsConfirmModal(true)} className="accent">
              로그아웃
            </div>
          </SContents>
        ) : null}
      </SModal>
      {isConfirmModal && (
        <SLayout>
          {type === 'post-config' ? (
            <SConfirmModal>
              <SConfirmTitle className="confirm-title">게시글을 삭제할까요?</SConfirmTitle>
              <SConfirmContents>
                <SConfirmContent>취소</SConfirmContent>
                <div onClick={() => deleteFeed()}>삭제</div>
              </SConfirmContents>
            </SConfirmModal>
          ) : type === 'profile' ? (
            <SConfirmModal>
              <SConfirmTitle className="confirm-title">로그아웃 하시겠어요?</SConfirmTitle>
              <SConfirmContents>
                <SConfirmContent>취소</SConfirmContent>
                <div onClick={handleLogout}>로그아웃</div>
              </SConfirmContents>
            </SConfirmModal>
          ) : null}
        </SLayout>
      )}
    </SBackground>
  );
};

export default CommonModal;

const SLayout = styled.div`
  /* width: inherit; */
  /* height: 100%; */
  background-color: rgba(85, 85, 85, 0.8);
  position: relative;
  width: inherit;
  height: 100%;
`;

const SConfirmModal = styled.div`
  background-color: var(--black);
  width: 250px;
  text-align: center;
  border-radius: 10px;
  color: var(--white);
  position: fixed;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SConfirmTitle = styled.div`
  padding: 22px 40px;
  border-bottom: 1px solid var(--border-gray);
  font-size: 16px;
`;
const SConfirmContents = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  cursor: pointer;
  div {
    flex: 1;
    height: 100%;
    padding: 15px;

    &:hover {
      background-color: var(--point-color);
    }
  }
  div:nth-child(1) {
    border-bottom-left-radius: 10px;
  }
  div:nth-child(2) {
    color: var(--point-color);
    border-bottom-right-radius: 10px;

    &:hover {
      color: var(--white);
    }
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
  gap: 16px;
  font-size: 14px;

  div {
    width: 90%;
    text-align: center;
    padding: 13px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: var(--point-color);
    }
  }

  .accent {
    color: var(--point-color);

    &:hover {
      color: var(--white);
    }
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
