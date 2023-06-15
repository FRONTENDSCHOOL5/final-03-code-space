import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { setToken, isfeedFetchToggle } from '../../Atom/atom';

// 피드 fetching, 게시글생성
const FetchFeed = ({ setFeedList, FeedList }) => {
  const URL = 'https://api.mandarin.weniv.co.kr/';
  const FollowingPOST = 'post/feed';
  const isToken = useRecoilValue(setToken);
  const Authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzZjYjJjYjIwNTY2MzJjZmZlYiIsImV4cCI6MTY5MDY5NDM4MCwiaWF0IjoxNjg1NTEwMzgwfQ.Bjwk8EyTTxyFP8-QYiY1SlXsAXTAYQ_Fwmi-nJ-NDx4';

  const [isFetchData, setIsFetchData] = useState(false);

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
      const response = await instance.get(FollowingPOST);
      const FeedListArr = [];
      for (let i = 0; i < response.data.posts.length; i++) {
        FeedListArr.push(response.data.posts[i]);
      }
      setFeedList(FeedListArr);
      setIsFetchData(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Post isFetchData={isFetchData} FeedList={FeedList} />
    </>
  );
};
export default FetchFeed;
