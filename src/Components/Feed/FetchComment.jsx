import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setToken, isfeedFetchToggle } from '../../Atom/atom';

// 댓글 리스트 불러오기
const FetchComment = ({ postID, setCommentList, setIsFetchData, fetchType, inputComment, setReactionCount }) => {
  const URL = 'https://api.mandarin.weniv.co.kr/';
  const FeedGET = `post/${postID}`;
  const CommentPOST = `post/${postID}/comments`;
  const Authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzZjYjJjYjIwNTY2MzJjZmZlYiIsImV4cCI6MTY5MDY5NDM4MCwiaWF0IjoxNjg1NTEwMzgwfQ.Bjwk8EyTTxyFP8-QYiY1SlXsAXTAYQ_Fwmi-nJ-NDx4';
  const refreshFeedState = useRecoilValue(isfeedFetchToggle);

  useEffect(() => {
    console.log(fetchType);

    if (fetchType === 'feed') {
      console.log(fetchType);

      getFeed();
    } else if (fetchType === 'comment') {
      console.log(fetchType);

      getComment();
    }
  }, [refreshFeedState]);

  const instance = axios.create({
    baseURL: URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: Authorization,
    },
  });

  async function getComment() {
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
  async function getFeed() {
    try {
      console.log(FeedGET);
      const response = await instance.get(FeedGET);
      console.log(response.data);
      setReactionCount(response.data);
      // setIsFetchData(true);
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
