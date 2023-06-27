import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainHeader from 'Components/Common/MainHeader';
import BottomNav from 'Components/Common/BottomNav';
import FetchFeed from 'Components/Feed/FetchFeed';
import TagButton from 'Components/Feed/TagButton';
import { SMainLayout } from 'Styles/MainLayoutStyle';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { headerToggle, categoryTag, categoryTagIndex, isEditCheck } from 'Atom/atomStore';
import { motion } from 'framer-motion';
// 피드 메인 페이지
const FeedPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [FeedList, setFeedList] = useState([]);
  const setTagState = useSetRecoilState(categoryTag);
  const setTagIndexState = useSetRecoilState(categoryTagIndex);
  const TagIndexState = useRecoilValue(categoryTagIndex);
  const setIsEditCheck = useSetRecoilState(isEditCheck);

  const handleClick = index => {
    setActiveIndex(index);
    setTagState(tagItem[index]);
    setTagIndexState(index);
  };
  useEffect(() => {
    setActiveIndex(TagIndexState);
    setTagState(tagItem[TagIndexState]);
    setIsEditCheck(false);
  }, []);

  const tagItem = ['전체', '팔로잉', '스터디 모집', '질문있어요!', '자유게시판'];

  const headerToggleState = useRecoilValue(headerToggle);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SFeedLayout>
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

        <BottomNav />
      </SFeedLayout>
    </motion.div>
  );
};
export default FeedPage;

// FeedPage =====================================================

const STagLayout = styled.div`
  display: flex;
  gap: 10px;
  padding: 6px 20px;
  border-bottom: 1px solid var(--border-gray);
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 2px;
    height: 0px;
  } /* 스크롤 바 */
`;
const SFeedLayout = styled(SMainLayout)`
  padding-bottom: 70px;
`;
