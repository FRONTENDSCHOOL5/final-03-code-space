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
  SCreateDate,
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
  function goProfile(event, item) {
    event.stopPropagation();
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
            if (tagState !== '전체' && tagState !== category) {
              return null;
            }

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

            // 이미지 여러장 배열로 변환
            const contentImgArr = extractImageLinks(item.image);
            console.log(contentImgArr);

            return (
              <>
                {isGrid ? (
                  <SContentContainer
                    key={item.id}
                    className={contentImgArr.length >= 2 ? 'moreImg' : ''}
                    onClick={() => goFeedDetail(item, title, content, category, code, language)}>
                    <img src={contentImgArr.length === 0 ? logoImg : contentImgArr[0].url} alt="" />
                  </SContentContainer>
                ) : (
                  <SFeedCard key={item.id} onClick={() => goFeedDetail(item, title, content, category)}>
                    <SAuthor>
                      <SProfileImg
                        src={item.author.image}
                        alt="프사"
                        onClick={event => goProfile(event, item.author)}
                      />

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
                          {item.heartCount}
                        </SReactionCount>
                        <SReactionCount>
                          <SHeartImg src={iconComment} alt="댓글" />
                          {item.comments.length}
                        </SReactionCount>
                      </SReactionContent>
                      <SCreateDate>{item.createdAt.slice(0, 10)}</SCreateDate>
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
