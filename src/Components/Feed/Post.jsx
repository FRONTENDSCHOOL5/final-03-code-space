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
import Skeleton from '../Common/Skeleton';
import WithSkeleton from '../Common/Skeleton';

const Post = ({ isFetchData, FeedList, allFeed, followingFeed }) => {
  const setFeedListState = useSetRecoilState(searchFeedList);
  const feedListState = useRecoilValue(searchFeedList);
  const navigate = useNavigate();
  const tagState = useRecoilValue(categoryTag);
  const [scrollPosition, setScrollPosition] = useRecoilState(scrollPositionAtom);
  const [isInitialLoad, setIsInitialLoad] = useRecoilState(isInitialLoadAtom);

  function goFeedDetail(item, title, content, category, code, language) {
    navigate('/feeddetail', { state: { feedList: { item, title, content, category, code, language } } });
  }
  function goProfile(event, item) {
    event.stopPropagation();
    navigate('/myprofile', { state: item });
  }

  useEffect(() => {
    if (isFetchData) {
      // 초기 로딩 시 스크롤 위치 복원
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
      let code;

      const extractedData = extractString(item.content, 'title');
      if (extractedData === null) {
        return item;
      }
      const { extracted, remaining } = extractedData;

      const categoryData = extractString(remaining, 'category');
      if (categoryData === null) {
        return item;
      }
      const codeData = extractString(categoryData.remaining, 'code');
      if (codeData === null) {
        return item;
      }
      const contentData = extractString(codeData.remaining, 'content');
      if (contentData === null) {
        return item;
      }
      title = extracted;
      contents = contentData.extracted;
      code = codeData.extracted;

      return {
        ...item,
        title,
        contents,
        code,
      };
    });

    setFeedListState(updatedFeedList);
  };
  return (
    <>
      {isFetchData === false ? (
        <Skeleton isLoading={isFetchData} />
      ) : (
        <div>
          {(tagState === '전체' ? FeedList : tagState === '팔로잉' ? followingFeed : allFeed).map(item => {
            let title;
            let content;
            let code;
            let language;
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

            const codeData = extractString(categoryData.remaining, 'code');

            if (codeData === null) {
              return null;
            }
            const contentData = extractString(codeData.remaining, 'content');

            if (contentData === null) {
              return null;
            }
            const languageData = extractString(contentData.remaining, 'language');

            if (languageData === null) {
              return null;
            }
            if (tagState !== '팔로잉') {
              if (tagState !== '전체' && tagState !== category) {
                return null;
              }
            }

            title = extracted;
            content = contentData.extracted;
            code = codeData.extracted;
            language = languageData.extracted;
            return (
              <SFeedCard key={item.id} onClick={() => goFeedDetail(item, title, content, category, code, language)}>
                <SAuthor>
                  {item.author.image === APIDefaultImage ? (
                    <SProfileImg src={profileImg} alt="프사" onClick={event => goProfile(event, item.author)} />
                  ) : (
                    <SProfileImg src={item.author.image} alt="프사" onClick={event => goProfile(event, item.author)} />
                  )}
                  <STitleContainer>
                    <STitle>{title}</STitle>
                    <SAuthorInfo>
                      <SUserName>{item.author.username}</SUserName>
                      <SAccountname>@{item.author.accountname}</SAccountname>
                    </SAuthorInfo>
                  </STitleContainer>
                </SAuthor>
                <div>
                  <SMainContent>{content}</SMainContent>
                </div>
                <SReactionContainer>
                  <SReactionContent>
                    <SReactionCount>
                      <SHeartImg src={iconHeart} alt="하트" />
                      <div>{item.heartCount}</div>
                    </SReactionCount>
                    <SReactionCount>
                      <SHeartImg src={iconComment} alt="댓글" />
                      <div>{item.comments.length}</div>
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
