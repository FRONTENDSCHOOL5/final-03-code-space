import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import profileImg from '../assets/default-profile-image.svg';
import axios from 'axios';

const MainFeed = () => {
  const URL = 'https://api.mandarin.weniv.co.kr/';
  const FollowingPOST = 'post/feed';
  const Authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzZjYjJjYjIwNTY2MzJjZmZlYiIsImV4cCI6MTY5MDY5NDM4MCwiaWF0IjoxNjg1NTEwMzgwfQ.Bjwk8EyTTxyFP8-QYiY1SlXsAXTAYQ_Fwmi-nJ-NDx4';

  const APIDefaultImage = 'http://146.56.183.55:5050/Ellipse.png';

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
      {fetchData === false ? (
        <div>로딩중....</div>
      ) : (
        <div>
          {FeedList.map(item => {
            return (
              <SFeedCard key={item.id}>
                <SAuthor>
                  {item.author.image === APIDefaultImage ? (
                    <SProfileImg src={profileImg} alt="프사" />
                  ) : (
                    <SProfileImg src={item.author.image} alt="프사" />
                  )}
                  <STitleContainer>
                    <SContent>{item.content}</SContent>
                    <SAuthorInfo>
                      <SUserName>{item.author.username}</SUserName>
                      <SAccountname>@{item.author.accountname}</SAccountname>
                      <SAccountname>{item.createdAt.slice(0, 10)}</SAccountname>
                    </SAuthorInfo>
                  </STitleContainer>
                </SAuthor>
                <div>{/* <SContent>{item.content}</SContent> */}</div>
              </SFeedCard>
            );
          })}
        </div>
      )}
    </>
  );
};

const TagButton = ({ text, active, onClick }) => {
  console.log(active);
  return (
    <STagButton onClick={onClick} className={active ? 'active' : ''}>
      {text}
    </STagButton>
  );
};

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

const FeedPage = () => {
  const [toggle, setToggle] = useState('feed');
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = index => {
    setActiveIndex(index);
    console.log(index);
    console.log(activeIndex);
  };

  const tagItem = ['#전체', '#스터디 모집', '#질문있어요!', '#자유게시판'];
  return (
    <>
      <SMain>
        <MainHeader toggle={toggle} setToggle={setToggle} />
        <STagLayout>
          {tagItem.map((item, index) => (
            <TagButton text={item} active={index === activeIndex} onClick={() => handleClick(index)} />
          ))}
        </STagLayout>

        {toggle === 'feed' ? <MainFeed /> : <div>검색창</div>}
        <BottomNav />
      </SMain>
    </>
  );
};
export default FeedPage;

const STagLayout = styled.div`
  display: flex;
  gap: 10px;
  padding: 6px;
`;

const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  min-height: 100vh;
  padding-bottom: 64px;
  color: var(--white);
  font-family: var(--content-font);
`;

const SContent = styled.div`
  color: var(--white);
  word-break: break-all;
`;
const SUserName = styled.div`
  color: var(--lightgray);
  word-break: break-all;
  font-size: 13px;
`;
const SAccountname = styled.div`
  color: var(--darkgray);
  font-size: 10px;
`;

const SFeedCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--darkgray);
  padding: 20px;
  box-sizing: border-box;
`;
const SAuthor = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  cursor: pointer;
`;
const SProfileImg = styled.img`
  max-width: 46px;
  max-height: 46px;
  width: 100%;
  height: 100%;
  border: none;
`;
const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 5px;
`;
