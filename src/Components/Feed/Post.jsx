import React from 'react';

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
import { useRecoilValue } from 'recoil';
import { categoryTag } from '../../Atom/atom';

const Post = ({ isFetchData, FeedList }) => {
  const navigate = useNavigate();
  const tagState = useRecoilValue(categoryTag);

  function goFeedDetail(item, title, content) {
    navigate('/feeddetail', { state: { item, title, content } });
  }
  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }

  return (
    <>
      {isFetchData === false ? (
        <div>로딩중....</div>
      ) : (
        <div>
          {FeedList.map(item => {
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
            if (tagState === '전체') {
              title = extracted;
              content = categoryData.remaining;
            } else if (tagState === category) {
              title = extracted;
              content = categoryData.remaining;
            } else {
              return null;
            }

            return (
              <SFeedCard key={item.id}>
                <SAuthor>
                  {item.author.image === APIDefaultImage ? (
                    <SProfileImg src={profileImg} alt="프사" onClick={() => goProfile(item.author)} />
                  ) : (
                    <SProfileImg src={item.author.image} alt="프사" onClick={() => goProfile(item.author)} />
                  )}
                  <STitleContainer onClick={() => goFeedDetail(item, title, content)}>
                    <STitle>{title}</STitle>
                    <SAuthorInfo>
                      <SUserName>{item.author.username}</SUserName>
                      <SAccountname>@{item.author.accountname}</SAccountname>
                    </SAuthorInfo>
                  </STitleContainer>
                </SAuthor>
                <div>
                  <SMainContent onClick={() => goFeedDetail(item, title, content)}>{content}</SMainContent>
                </div>
                <SReactionContainer>
                  <SReactionContent onClick={() => goFeedDetail(item, title, content)}>
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
