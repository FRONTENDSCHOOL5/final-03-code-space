import React, { useState } from 'react';
import styled from 'styled-components';
import profileImg from '../../assets/default-profile-image.svg';
import FetchComment from './FetchComment';
import axios from 'axios';

const WriteComment = ({ feedList, commentList, setCommentList, isFetchData, setIsFetchData }) => {
  const [inputComment, setInputComment] = useState('');

  const handleAddComment = async () => {
    const URL = 'https://api.mandarin.weniv.co.kr/';
    const CommentPOST = `post/${feedList.id}/comments`;
    const Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzZjYjJjYjIwNTY2MzJjZmZlYiIsImV4cCI6MTY5MDY5NDM4MCwiaWF0IjoxNjg1NTEwMzgwfQ.Bjwk8EyTTxyFP8-QYiY1SlXsAXTAYQ_Fwmi-nJ-NDx4';

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

      // 입력 필드 초기화
      setInputComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SNavLayout>
      <SCommentProfileImg src={profileImg} alt="" />
      <SInputComment
        onChange={e => setInputComment(e.target.value)}
        value={inputComment}
        type="text"
        placeholder="댓글 작성하기"
      />
      <div onClick={handleAddComment}>게시</div>
    </SNavLayout>
  );
};

export default WriteComment;

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
