import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractString } from '../Feed/extractString';
import { extractImageLinks } from '../Feed/extractImage';
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
import styled from 'styled-components';

import logoImg from '../../assets/img/icon-logo.svg';
import iconHeart from '../../assets/icons/heart.svg';
import iconMore from '../../assets/icons/more-img.svg';
import iconComment from '../../assets/icons/chat-green.svg';
import { useRecoilValue } from 'recoil';
import { categoryTag } from '../../Atom/atom';

const Post = ({ postData, isGrid }) => {
  const navigate = useNavigate();
  const tagState = useRecoilValue(categoryTag);
  const URL = 'https://api.mandarin.weniv.co.kr/';

  function goFeedDetail(item, title, content, category) {
    navigate('/feeddetail', { state: { feedList: { item, title, content, category } } });
  }
  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }

  console.log(postData);
  console.log(postData.post);

  return (
    <>
      <div>
        {postData &&
          postData.post?.map(item => {
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

            // 이미지 여러장 배열로 변환
            const contentImgArr = extractImageLinks(item.image);
            console.log(contentImgArr);

            return (
              <>
                {isGrid ? (
                  <SContentContainer
                    key={item.id}
                    className={contentImgArr.length >= 2 ? 'moreImg' : ''}
                    onClick={() => goFeedDetail(item, title, content, category)}>
                    <img src={contentImgArr.length === 0 ? logoImg : contentImgArr[0]} alt="" />
                  </SContentContainer>
                ) : (
                  <SFeedCard key={item.id}>
                    <SAuthor>
                      <SProfileImg src={item.author.image} alt="프사" onClick={() => goProfile(item.author)} />

                      <STitleContainer onClick={() => goFeedDetail(item, title, content, category)}>
                        <STitle onClick={() => goFeedDetail(item, title, content, category)}>{title}</STitle>
                        <SAuthorInfo>
                          <SUserName>{item.author.username}</SUserName>
                          <SAccountname>@{item.author.accountname}</SAccountname>
                        </SAuthorInfo>
                      </STitleContainer>
                    </SAuthor>
                    <div>
                      <SMainContent onClick={() => goFeedDetail(item, title, content, category)}>
                        {content}
                      </SMainContent>
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
                )}
              </>
            );
          })}
      </div>
    </>
  );
};

export default Post;

const SContentContainer = styled.div`
  position: relative;
  width: 114px;
  height: 114px;
  background-color: #29292d;
  cursor: pointer;

  &.moreImg::after {
    content: url(${iconMore});
    display: inline-block;
    position: absolute;
    top: 6px;
    right: 6px;
    width: 20px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
