import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setToken, isfeedFetchToggle, loginUserImageAtom } from '../../Atom/atom';
import { profileImg, APIDefaultImage } from './COMMON';
import useFetchComment from '../../Hooks/useFetchComment';

const WriteComment = ({ feedList, commentList, setCommentList, isFetchData, setIsFetchData, setReactionCount }) => {
  const [inputComment, setInputComment] = useState('');
  const isToken = useRecoilValue(setToken);
  const LoginUserImage = useRecoilValue(loginUserImageAtom);

  const { getFeed } = useFetchComment({
    postID: feedList.id,
  });

  const handleAddComment = async () => {
    const URL = 'https://api.mandarin.weniv.co.kr/';
    const CommentPOST = `post/${feedList.id}/comments`;
    const Authorization = 'Bearer ' + isToken;

    const instance = axios.create({
      baseURL: URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: Authorization,
      },
    });

    try {
      const response = await instance.post(CommentPOST, {
        comment: {
          content: inputComment,
        },
      });
      console.log(response.data);

      // 댓글 작성 후, 새로운 댓글을 commentList에 추가하고 isFetchData를 true로 설정하여 댓글 목록을 다시 불러옴
      setCommentList(prevCommentList => [...prevCommentList, response.data.comment]);
      setIsFetchData(true);
      console.log('댓글쓰기2');

      getFeed({ setReactionCount }); // 컴포넌트가 마운트될 때 FetchDetailFeed 실행

      // 입력 필드 초기화
      setInputComment('');
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <>
      <SNavLayout>
        {LoginUserImage === APIDefaultImage ? (
          <SCommentProfileImg src={profileImg} alt="프사" />
        ) : (
          <SCommentProfileImg src={LoginUserImage} alt="프사" />
        )}
        <SInputComment
          onChange={e => setInputComment(e.target.value)}
          value={inputComment}
          type="text"
          placeholder="댓글 작성하기"
          onKeyDown={event => handleKeyDown(event)}
        />
        <SSubmutBtn onClick={handleAddComment} className={inputComment ? 'active' : ''}>
          게시
        </SSubmutBtn>
      </SNavLayout>
    </>
  );
};

export default WriteComment;

const SSubmutBtn = styled.div`
  cursor: pointer;
  &.active {
    color: var(--point-color);
  }
`;

const SNavLayout = styled.nav`
  max-width: 390px;
  margin: 0 auto;
  background: var(--black);
  border-top: 0.5px solid var(--darkgray);
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  color: var(--gray);

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;
const SCommentProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;
const SInputComment = styled.input`
  flex: 1;
  background-color: var(--black);
  color: var(--white);

  border: none;
  outline: none;
  padding: 5px;
  &:focus {
    transition: all 0.5s;
    border-bottom: 1px solid var(--point-color);
  }
  &::placeholder {
    color: var(--gray);
  }
`;
