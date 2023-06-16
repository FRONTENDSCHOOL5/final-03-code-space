import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setToken, isfeedFetchToggle } from '../../Atom/atom';
import { MainAccountToken, BASEURL } from './COMMON';
const instance = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: MainAccountToken,
  },
});

const POST_instance = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODFlYjM3YjJjYjIwNTY2MzJkOTJiZSIsImV4cCI6MTY5MjExMzgyNywiaWF0IjoxNjg2OTI5ODI3fQ.SBk15A0kbXgVGDDrJGBiMywXJnFnVlVZtR82jXhIACA',
  },
});

export const PostHeart = async (postID, hearted, setReactionCount) => {
  let POST_URL = '';
  const HeartPost = `post/${postID}/heart`;
  const UNHeartPost = `post/${postID}/unheart`;
  const FeedGET = `post/${postID}`;

  if (!hearted) {
    POST_URL = HeartPost;
  } else {
    POST_URL = UNHeartPost;
  }
  console.log(POST_URL);
  try {
    if (!hearted) {
      const response = await POST_instance.post(POST_URL);
      getFeed(FeedGET, setReactionCount);
      console.log(response.data);
    } else {
      console.log('delete!!');
      const response = await POST_instance.delete(POST_URL);
      getFeed(FeedGET, setReactionCount);

      console.log(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFeed = async (FeedGET, setReactionCount) => {
  try {
    console.log(FeedGET);
    const response = await POST_instance.get(FeedGET);
    console.log(response.data);
    setReactionCount(response.data);
  } catch (error) {
    console.error(error);
  }
};

// 댓글 리스트 불러오기
const FetchComment = ({
  postID,
  setCommentList,
  setIsFetchData,
  fetchType,
  inputComment,
  setReactionCount,
  hearted,
}) => {
  const FeedGET = `post/${postID}`;
  const CommentPOST = `post/${postID}/comments`;

  const refreshFeedState = useRecoilValue(isfeedFetchToggle);

  useEffect(() => {
    if (fetchType === 'feed') {
      console.log(fetchType);
      getFeed();
    } else if (fetchType === 'comment') {
      console.log(fetchType);

      getComment();
    }
  }, [refreshFeedState]);

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
      const response = await POST_instance.get(FeedGET);
      // console.log(response.data);
      setReactionCount(response.data);
    } catch (error) {
      console.error(error);
    }
  }
};
export default FetchComment;
