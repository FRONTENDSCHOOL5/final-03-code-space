import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import FetchFeed from '../Components/Feed/FetchFeed';
import TagButton from '../Components/Feed/TagButton';
import { SMainLayout } from '../Styles/MainLayoutStyle';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { headerToggle } from '../Atom/atom';

// 피드 메인 페이지
const FeedPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = index => {
    setActiveIndex(index);
  };
  const tagItem = ['#전체', '#스터디 모집', '#질문있어요!', '#자유게시판'];

  const headerToggleState = useRecoilValue(headerToggle);

  return (
    <SFeedLayout>
      <MainHeader type="feed" />
      {headerToggleState === 'feed' ? (
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
    </SFeedLayout>
  );
};
export default FeedPage;

// FeedPage =====================================================

const STagLayout = styled.div`
  display: flex;
  gap: 10px;
  padding: 6px 20px;
`;
const SFeedLayout = styled(SMainLayout)`
  padding-bottom: 70px;
`;
