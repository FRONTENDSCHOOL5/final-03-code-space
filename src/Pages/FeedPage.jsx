import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import FetchFeed from '../Components/Feed/FetchFeed';
import TagButton from '../Components/Feed/TagButton';

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
            <FetchFeed />
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
