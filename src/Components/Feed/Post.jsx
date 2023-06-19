import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { extractString } from './extractString';
import {
  SFeedCard,
  STitle,
  SUserName,
  SAccountname,
  SAuthor,
  SProfileImg,
  STitleContainer,
  SAuthorInfo,
  SHeartImg,
  SReactionContainer,
  SReactionContent,
  SReactionCount,
  SMainContent,
} from '../../Styles/FeedStyle/PostStyle';

import iconHeart from '../../assets/icons/heart.svg';
import iconComment from '../../assets/icons/chat-green.svg';
import { profileImg, APIDefaultImage } from './COMMON';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { categoryTag, searchFeedList, isEditCheck, isInitialLoadAtom, scrollPositionAtom } from '../../Atom/atom';

const Post = ({ isFetchData, FeedList, allFeed }) => {
  const setFeedListState = useSetRecoilState(searchFeedList);
  const feedListState = useRecoilValue(searchFeedList);
  const navigate = useNavigate();
  const tagState = useRecoilValue(categoryTag);
  const [scrollPosition, setScrollPosition] = useRecoilState(scrollPositionAtom);
  const [isInitialLoad, setIsInitialLoad] = useRecoilState(isInitialLoadAtom);

  function goFeedDetail(item, title, content, category) {
    navigate('/feeddetail', { state: { feedList: { item, title, content, category } } });
  }
  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }
  console.log(scrollPosition);

  useEffect(() => {
    if (isFetchData) {
      // 초기 로딩 시 스크롤 위치 복원
      console.log('ddd');
      window.scrollTo(0, scrollPosition);
      setIsInitialLoad(true);
    }
  }, [isFetchData]);

  useEffect(() => {
    // 스크롤 위치 업데이트 시 상태 변수에 저장
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setFeedFunction();
  }, [allFeed]); // isFetchData 상태도 감시

  const setFeedFunction = () => {
    const updatedFeedList = allFeed.map(item => {
      let title;
      let contents;
      const extractedData = extractString(item.content, 'title');
      if (extractedData === null) {
        return item;
      }
      const { extracted, remaining } = extractedData;

      const categoryData = extractString(remaining, 'category');
      if (categoryData === null) {
        return item;
      }
      title = extracted;
      contents = categoryData.remaining;

      return {
        ...item,
        title,
        contents,
      };
    });

    setFeedListState(updatedFeedList);
  };
  return (
    <>
      {isFetchData === false ? (
        <div>로딩중....</div>
      ) : (
        <div>
          {(tagState === '전체' ? FeedList : allFeed).map(item => {
            let title;
            let content;
            const extractedData = extractString(item.content, 'title');
            if (extractedData === null) {
              return null;
            }
            const { extracted, remaining } = extractedData;

            const categoryData = extractString(remaining, 'category');
            if (categoryData === null) {
              return null;
            }
            const category = categoryData.extracted;
            if (tagState !== '전체' && tagState !== category) {
              return null;
            }
            title = extracted;
            content = categoryData.remaining;
            return (
              <SFeedCard key={item.id}>
                <SAuthor>
                  {item.author.image === APIDefaultImage ? (
                    <SProfileImg src={profileImg} alt="프사" onClick={() => goProfile(item.author)} />
                  ) : (
                    <SProfileImg src={item.author.image} alt="프사" onClick={() => goProfile(item.author)} />
                  )}
                  <STitleContainer onClick={() => goFeedDetail(item, title, content, category)}>
                    <STitle onClick={() => goFeedDetail(item, title, content, category)}>{title}</STitle>
                    <SAuthorInfo>
                      <SUserName>{item.author.username}</SUserName>
                      <SAccountname>@{item.author.accountname}</SAccountname>
                    </SAuthorInfo>
                  </STitleContainer>
                </SAuthor>
                <div>
                  <SMainContent onClick={() => goFeedDetail(item, title, content, category)}>{content}</SMainContent>
                </div>
                <SReactionContainer>
                  <SReactionContent onClick={() => goFeedDetail(item, title, content, category)}>
                    <SReactionCount>
                      <SHeartImg src={iconHeart} alt="하트" />
                      {item.heartCount}
                    </SReactionCount>
                    <SReactionCount>
                      <SHeartImg src={iconComment} alt="댓글" />
                      {item.comments.length}
                    </SReactionCount>
                  </SReactionContent>
                  <SAccountname>{item.createdAt.slice(0, 10)}</SAccountname>
                </SReactionContainer>
              </SFeedCard>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Post;
