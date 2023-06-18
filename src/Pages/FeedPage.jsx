import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import FetchFeed from '../Components/Feed/FetchFeed';
import TagButton from '../Components/Feed/TagButton';
import { SMainLayout } from '../Styles/MainLayoutStyle';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { headerToggle, categoryTag, categoryTagIndex } from '../Atom/atom';
import { extractString } from '../Components/Feed/extractString';
import SearchPage from './SearchPage';
// 피드 메인 페이지
const FeedPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [FeedList, setFeedList] = useState([]);
  const setTagState = useSetRecoilState(categoryTag);
  const setTagIndexState = useSetRecoilState(categoryTagIndex);
  const TagIndexState = useRecoilValue(categoryTagIndex);

  const handleClick = index => {
    setActiveIndex(index);
    setTagState(tagItem[index]);
    setTagIndexState(index);
  };
  useEffect(() => {
    setActiveIndex(TagIndexState);
    setTagState(tagItem[TagIndexState]);
  }, []);

  const tagItem = ['전체', '스터디 모집', '질문있어요!', '자유게시판'];

  const headerToggleState = useRecoilValue(headerToggle);

  return (
    <SFeedLayout>
      {headerToggleState === 'feed' ? (
        <>
          <MainHeader type="feed" />
          <STagLayout>
            {tagItem.map((item, index) => (
              <TagButton
                FeedList={FeedList}
                setFeedList={setFeedList}
                key={index}
                text={'#' + item}
                active={index === activeIndex}
                onClick={() => handleClick(index)}
              />
            ))}
          </STagLayout>
          <FetchFeed setFeedList={setFeedList} FeedList={FeedList} />
        </>
      ) : (
        <>
          <MainHeader type="search" />
          <SearchPage />
        </>
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
