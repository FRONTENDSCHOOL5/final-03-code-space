import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import Post from '../Components/Feed/Post';
import axios from 'axios';


// 피드 fetching, 게시글생성
const MainFeed = () => {
  const URL = 'https://api.mandarin.weniv.co.kr/';
  const FollowingPOST = 'post/feed';
  const Authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzZjYjJjYjIwNTY2MzJjZmZlYiIsImV4cCI6MTY5MDY5NDM4MCwiaWF0IjoxNjg1NTEwMzgwfQ.Bjwk8EyTTxyFP8-QYiY1SlXsAXTAYQ_Fwmi-nJ-NDx4';

  const [fetchData, setfetchData] = useState(false);
  const [FeedList, setFeedList] = useState([]);

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
      console.log(FeedListArr);
      setFeedList(FeedListArr);
      setfetchData(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Post fetchData={fetchData} FeedList={FeedList} />
    </>
  );
};

// 태그버튼 컴포넌트
const TagButton = ({ text, active, onClick }) => {
  console.log(active);
  return (
    <STagButton onClick={onClick} className={active ? 'active' : ''}>
      {text}
    </STagButton>
  );
};

// 피드 메인 페이지
const FeedPage = () => {
  const [toggle, setToggle] = useState('feed');
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = index => {
    setActiveIndex(index);
  };

  const tagItem = ['#전체', '#스터디 모집', '#질문있어요!', '#자유게시판'];
  return (
    <>
      <SMain>
        <MainHeader toggle={toggle} setToggle={setToggle} />
        {toggle === 'feed' ? (
          <>
            <STagLayout>
              {tagItem.map((item, index) => (
                <TagButton key={index} text={item} active={index === activeIndex} onClick={() => handleClick(index)} />
              ))}
            </STagLayout>
            <MainFeed />
          </>
        ) : (
          <div>검색창</div>
        )}
        <BottomNav />
      </SMain>
    </>
  );
};
export default FeedPage;

// TagButton =====================================================
const STagButton = styled.div`
  border-radius: 44px;
  border: 1px solid var(--darkgray);
  padding: 5px 8px;
  font-size: 12px;
  color: var(--lightgray);
  cursor: pointer;
  &.active {
    color: var(--white);
    background-color: var(--point-color);
  }
`;
// FeedPage =====================================================
const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  min-height: 100vh;
  padding-bottom: 64px;
  color: var(--white);
  font-family: var(--content-font);
`;
const STagLayout = styled.div`
  display: flex;
  gap: 10px;
  padding: 6px;
`;
