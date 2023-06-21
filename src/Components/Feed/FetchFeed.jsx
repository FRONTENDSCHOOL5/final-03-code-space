import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';
import { setToken, isfeedFetchToggle } from '../../Atom/atom';
import { MainAccountToken } from './COMMON';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchFeedList } from '../../Atom/atom';
import { debounce } from 'lodash';

const FetchFeed = ({ setFeedList, FeedList }) => {
  const URL = 'https://api.mandarin.weniv.co.kr/';
  const FollowingPOST = 'post/feed/';
  const isToken = useRecoilValue(setToken);
  const Authorization = MainAccountToken;

  const [limit, setLimit] = useState(10); // 한 페이지에 표시할 데이터 개수
  const [skip, setSkip] = useState(0); // 건너뛸 데이터 개수
  const [isFetchData, setIsFetchData] = useState(false);
  const [isScrollCheck, setIsScrollCheck] = useState(false);
  const [allFeed, setAllFeed] = useState([]);
  const [followingFeed, setFollowingFeed] = useState([]);
  useEffect(() => {
    if (limit === 10 && skip === 0) {
      // 최초 렌더링 시에만 실행
      getFeed();
      getFeedAll();
      getFollowingFeed();
    }
  }, [limit, skip]);

  useEffect(() => {
    if (limit !== 10 || skip !== 0) {
      // 최초 렌더링 시를 제외한 경우에 실행
      getFeed();
    }
  }, [limit, skip]);

  const instance = axios.create({
    baseURL: URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: Authorization,
    },
  });
  const following_instance = axios.create({
    baseURL: URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + isToken,
    },
  });
  async function getFollowingFeed() {
    console.log(isToken);

    try {
      const response = await following_instance.get(`${FollowingPOST}?limit=999`);
      setFollowingFeed(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  async function getFeedAll() {
    try {
      const response = await instance.get(`${FollowingPOST}?limit=999`);
      setAllFeed(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  async function getFeed() {
    console.log(skip);
    try {
      const response = await instance.get(`${FollowingPOST}?limit=${limit}&skip=${skip}`);
      const newFeedList = response.data.posts;
      if (newFeedList.length === 0) {
        // 데이터가 없으면 작업 중지
        console.log('No more data to fetch.');
        setIsScrollCheck(true);
        return;
      }
      // 기존 데이터와 새로운 데이터를 병합하여 업데이트
      setFeedList(prevFeedList => [...prevFeedList, ...newFeedList]);
      setIsFetchData(true); // 데이터 가져오기가 완료되었음을 표시
    } catch (error) {
      console.error(error);
    }
  }

  const handleScroll = debounce(() => {
    if (isScrollCheck) {
      console.log(isScrollCheck);
      return;
    }
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      console.log('하단!');
      setSkip(prevSkip => prevSkip + limit); // skip 값을 업데이트하여 다음 페이지의 데이터 요청
    }
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Post isFetchData={isFetchData} FeedList={FeedList} allFeed={allFeed} followingFeed={followingFeed} />
    </>
  );
};
export default FetchFeed;
