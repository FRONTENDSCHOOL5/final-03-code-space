import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { setToken, isfeedFetchToggle } from '../../Atom/atom';
import { MainAccountToken } from './COMMON';

// 피드 fetching, 게시글생성
const FetchFeed = ({ setFeedList, FeedList }) => {
  const URL = 'https://api.mandarin.weniv.co.kr/';
  const FollowingPOST = 'post/feed/?limit=50';
  const isToken = useRecoilValue(setToken);
  const Authorization = MainAccountToken;

  const [isFetchData, setIsFetchData] = useState(false);

  useEffect(() => {
    console.log('여기 아니지?');
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
