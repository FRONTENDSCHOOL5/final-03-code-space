import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { extractString } from './extractString';

import {
  SFeedCard,
  STitle,
  SContent,
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
} from '../../Styles/FeedStyle/PostStyle';

import iconHeart from '../../assets/icons/heart.svg';
import iconComment from '../../assets/icons/chat-green.svg';
import profileImg from '../../assets/default-profile-image.svg';
const APIDefaultImage = 'http://146.56.183.55:5050/Ellipse.png';

const Post = ({ isFetchData, FeedList }) => {
  const navigate = useNavigate();
  function goFeedDetail(item, extracted, remaining) {
    navigate('/feeddetail', { state: { item, extracted, remaining } });
  }

  return (
    <>
      {isFetchData === false ? (
        <div>로딩중....</div>
      ) : (
        <div>
          {FeedList.map(item => {
            const extractedData = extractString(item.content, 'title');
            console.log(extractedData);
            if (extractedData === null) {
              return null; // 추출된 값이 없는 경우 해당 항목을 건너뜁니다.
            }
            const { extracted, remaining } = extractedData;
            return (
              <SFeedCard key={item.id} onClick={() => goFeedDetail(item, extracted, remaining)}>
                <SAuthor>
                  {item.author.image === APIDefaultImage ? (
                    <SProfileImg src={profileImg} alt="프사" />
                  ) : (
                    <SProfileImg src={item.author.image} alt="프사" />
                  )}
                  <STitleContainer>
                    <STitle>{extracted}</STitle>
                    <SAuthorInfo>
                      <SUserName>{item.author.username}</SUserName>
                      <SAccountname>@{item.author.accountname}</SAccountname>
                    </SAuthorInfo>
                  </STitleContainer>
                </SAuthor>
                <div>
                  <SContent>{remaining}</SContent>
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
