import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  configModalAtom,
  setToken,
  setIsLogined,
  setAccountName,
  searchFeedList,
  setIsFollowed,
  isEditCheck,
} from '../../Atom/atom';
import { useNavigate } from 'react-router-dom';
const CommonModal = ({
  deleteFeed,
  feedList,
  isEdit,
  setIsEdit,
  type,
  deleteComment,
  imgArr,
  title,
  content,
  code,
  category,
  commentId,
  commentAccount,
  language,
}) => {
  const modalRef = useRef(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isModalState, setconfigModalAtom] = useRecoilState(configModalAtom);
  const [isEditCheckState, setEditCheckState] = useRecoilState(isEditCheck);

  const accountName = useRecoilValue(setAccountName);

  const setTokenAtom = useSetRecoilState(setToken);
  const setIsLoginedAtom = useSetRecoilState(setIsLogined);
  const setAccountNameAtom = useSetRecoilState(setAccountName);
  const searchFeedListAtom = useSetRecoilState(searchFeedList);
  const setIsFollowedAtom = useSetRecoilState(setIsFollowed);

  const navigate = useNavigate();

  const handleClickOutside = event => {
    const target = event.target;
    if (target.classList.contains('confirm-title')) {
      return;
    }
    if (modalRef.current && !modalRef.current.contains(target)) {
      setconfigModalAtom('');
    }
  };
  console.log(feedList);
  useEffect(() => {
    if (type === 'post-config') {
      console.log('isEdit=true');
      setIsEdit(true);
      setEditCheckState(true);
    }
    if (type === 'comment-config') {
      if (commentAccount === accountName) {
        setconfigModalAtom('comment-config');
      } else {
        setconfigModalAtom('other-config');
      }
    } else {
      return;
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
    navigate('/post', { state: { isEdit, ...feedList, imgArr, title, content, code, category, language } });
  }

  return (
    <SBackground onClick={handleClickOutside}>
      <>
        {type === 'post-config' ? (
          <SModal ref={modalRef}>
            <SContents>
              <div className="accent" onClick={() => setIsConfirmModal(true)}>
                삭제
              </div>
              <div onClick={() => goEdit()}>수정</div>
            </SContents>
          </SModal>
        ) : type === 'profile' ? (
          <SModal ref={modalRef}>
            <SContents>
              <div>설정 및 개인정보</div>
              <div onClick={() => setIsConfirmModal(true)} className="accent">
                로그아웃
              </div>
            </SContents>
          </SModal>
        ) : type === 'comment-config' ? (
          <SSingleModal ref={modalRef}>
            <SContents>
              <div onClick={() => setIsConfirmModal(true)}>삭제</div>
            </SContents>
          </SSingleModal>
        ) : (
          <SSingleModal ref={modalRef}>
            <SContents>
              <div onClick={() => setIsConfirmModal(true)}>신고하기</div>
            </SContents>
          </SSingleModal>
        )}
      </>

      {isConfirmModal && (
        <SConfirmModalBackground>
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
          ) : type === 'comment-config' ? (
            <SConfirmModal>
              <SConfirmTitle className="confirm-title">댓글을 삭제할까요?</SConfirmTitle>
              <SConfirmContents>
                <SConfirmContent>취소</SConfirmContent>
                <div onClick={() => deleteComment()}>삭제</div>
              </SConfirmContents>
            </SConfirmModal>
          ) : (
            <SConfirmModal>
              <SConfirmTitle className="confirm-title">신고할까요?</SConfirmTitle>
              <SConfirmContents>
                <SConfirmContent>취소</SConfirmContent>
                <div>확인</div>
              </SConfirmContents>
            </SConfirmModal>
          )}
        </SConfirmModalBackground>
      )}
    </SBackground>
  );
};

export default CommonModal;

const SConfirmModalBackground = styled.div`
  background-color: rgba(85, 85, 85, 0.6);
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
  background-color: rgba(0, 0, 0, 0.8);
`;
const modalfadeOut = keyframes`
  0% {  top: 100%;  }
  100% {  top: 80%;  }
`;
const singleModalfadeOut = keyframes`
  0% {  top: 100%;  }
  100% {  top: 90%;  }
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
const SSingleModal = styled.article`
  width: 100%;
  max-width: 390px;
  height: 100%;
  background-color: var(--black);
  border-radius: 47px 47px 0 0;
  position: fixed;
  top: 87%;

  transition: all 0.2s;
  animation: ${singleModalfadeOut} 0.1s ease-in;

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
