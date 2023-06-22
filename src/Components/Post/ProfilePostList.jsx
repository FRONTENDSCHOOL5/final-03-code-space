import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractString } from '../Feed/extractString';
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

import iconHeart from '../../assets/icons/heart.svg';
import iconComment from '../../assets/icons/chat-green.svg';
import { useRecoilValue } from 'recoil';
import { categoryTag } from '../../Atom/atom';

const Post = ({ postData, isGrid }) => {
  const navigate = useNavigate();
  const tagState = useRecoilValue(categoryTag);
  const URL = 'https://api.mandarin.weniv.co.kr/';

  // const [img, setImg] = useState('');

  function goFeedDetail(item, title, content, category) {
    navigate('/feeddetail', { state: { feedList: { item, title, content, category } } });
  }
  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }

  // useEffect(() => {
  //   console.log(postData);
  //   setImg(URL + postData.post[0]?.image);
  // }, [postData]);
  // console.log(img, postData);

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

            // const contentImgs = item.image.split(',');
            console.log(item.image);
            return (
              <>
                {isGrid ? (
                  <SContentContainer key={item.id} onClick={() => goFeedDetail(item, title, content, category)}>
                    {/* TODO: 게시물 저장시 이미지에 url이 붙어서 저장되는 애들이 있고, 그냥 이미지 주소만 저장되는 애들이 있는데 이거 처리 의논해봐야될 듯 */}
                    <img src={item.image !== '' ? item.image : iconHeart} alt="" />
                    {/* {contentImgs.length > 1 && <div></div>} */}
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
  width: 114px;
  height: 114px;
  background-color: #29292d;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
