import React from 'react';
import styled from 'styled-components';
import { extractString } from '../Components/Feed/extractString';

import iconHeart from '../assets/icons/heart.svg';
import iconComment from '../assets/icons/chat-green.svg';
import profileImg from '../assets/default-profile-image.svg';
import { useLocation } from 'react-router-dom';
const APIDefaultImage = 'http://146.56.183.55:5050/Ellipse.png';

const FeedDetailPage = () => {
  const location = useLocation();

  console.log(location.state);

  const feedList = location.state.item;
  const extracted = location.state.extracted;
  const remaining = location.state.remaining;

  return (
    <SFeedCard>
      <SAuthor>
        {feedList.author.image === APIDefaultImage ? (
          <SProfileImg src={profileImg} alt="프사" />
        ) : (
          <SProfileImg src={feedList.author.image} alt="프사" />
        )}
        <STitleContainer>
          <STitle>{extracted}</STitle>
          <SAuthorInfo>
            <SUserName>{feedList.author.username}</SUserName>
            <SAccountname>@{feedList.author.accountname}</SAccountname>
            <SAccountname>{feedList.createdAt.slice(0, 10)}</SAccountname>
          </SAuthorInfo>
        </STitleContainer>
      </SAuthor>
      <div>
        <SContent>{remaining}</SContent>
      </div>
      <SReactionContainer>
        <SReactionCount>
          <SHeartImg src={iconHeart} alt="하트" />
          {feedList.heartCount}
        </SReactionCount>
        <SReactionCount>
          <SHeartImg src={iconComment} alt="댓글" />
          {feedList.comments.length}
        </SReactionCount>
      </SReactionContainer>
    </SFeedCard>
  );
};

export default FeedDetailPage;
const STitle = styled.div`
  color: var(--white);
  word-break: break-all;
  font-weight: bold;
`;
const SContent = styled.div`
  color: var(--white);
  font-size: 14px;
  padding: 10px 5px;
  box-sizing: border-box;
  word-break: break-all;
`;
const SUserName = styled.div`
  color: var(--lightgray);
  word-break: break-all;
  font-size: 13px;
`;
const SAccountname = styled.div`
  color: var(--darkgray);
  font-size: 10px;
`;

const SFeedCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--darkgray);
  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;
`;
const SAuthor = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;
const SProfileImg = styled.img`
  max-width: 46px;
  max-height: 46px;
  width: 100%;
  height: 100%;
  border: none;
`;
const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 5px;
`;
const SHeartImg = styled.img`
  max-width: 15px;
  max-height: 15px;
  width: 100%;
  height: 100%;
  fill: var(--point-color);
`;
const SReactionContainer = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: var(--lightgray);
  padding: 5px;
`;
const SReactionCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;
