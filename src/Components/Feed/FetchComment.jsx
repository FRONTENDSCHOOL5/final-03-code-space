import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 댓글 리스트 불러오기
const FetchComment = ({ postID, setCommentList, setIsFetchData, fetchType, inputComment }) => {
  const URL = 'https://api.mandarin.weniv.co.kr/';
  const CommentPOST = `post/${postID}/comments`;
  const Authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzZjYjJjYjIwNTY2MzJjZmZlYiIsImV4cCI6MTY5MDY5NDM4MCwiaWF0IjoxNjg1NTEwMzgwfQ.Bjwk8EyTTxyFP8-QYiY1SlXsAXTAYQ_Fwmi-nJ-NDx4';

  useEffect(() => {
    getFeed();
  }, []);

  const instance = axios.create({
    baseURL: URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: Authorization,
    },
  });

  async function getFeed() {
    try {
      console.log(CommentPOST);
      const response = await instance.get(CommentPOST);
      console.log(response.data);
      setCommentList(response.data.comments.reverse());
      setIsFetchData(true);
    } catch (error) {
      console.error(error);
    }
  }
  async function postFeed() {
    try {
      const response = await instance.post(CommentPOST, {
        comment: {
          content: inputComment,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
};
export default FetchComment;
