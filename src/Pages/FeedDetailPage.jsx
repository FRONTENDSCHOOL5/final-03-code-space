import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { extractString } from '../Components/Feed/extractString';
import iconHeart from '../assets/icons/heart.svg';
import iconComment from '../assets/icons/chat-green.svg';
import profileImg from '../assets/default-profile-image.svg';
import { useLocation } from 'react-router-dom';
import MainHeader from '../Components/Common/MainHeader';
import Comment from '../Components/Feed/Comment';
import BottomNav from '../Components/Common/BottomNav';
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
} from '../Styles/FeedStyle/PostStyle';
import WriteComment from '../Components/Feed/WriteComment';
import FetchComment from '../Components/Feed/FetchComment';

const APIDefaultImage = 'http://146.56.183.55:5050/Ellipse.png';

const FeedDetailPage = () => {
  const location = useLocation();

  const feedList = location.state.item;
  const extracted = location.state.extracted;
  const remaining = location.state.remaining;

  const [commentList, setCommentList] = useState({});
  const [isFetchData, setIsFetchData] = useState(false);

  const commentArray = [];
  feedList.comments.map(comment => {
    commentArray.push(comment);
  });

  return (
    <>
      <MainHeader type="profile" />
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
              {feedList.heartCount}
            </SReactionCount>
            <SReactionCount>
              <SHeartImg src={iconComment} alt="댓글" />
              {feedList.comments.length}
            </SReactionCount>
          </SReactionContent>

          <SAccountname>{feedList.createdAt.slice(0, 10)}</SAccountname>
        </SReactionContainer>
      </SFeedCard>
      <Comment
        feedList={feedList}
        commentList={commentList}
        setCommentList={setCommentList}
        isFetchData={isFetchData}
        setIsFetchData={setIsFetchData}
      />
      {/* <div>{FetchComment(feedList.id).content}</div> */}
      <div>{/* <img src={feedList.}/> */}</div>
      {/* <FetchComment postID={feedList.id} setIsFetchData={setIsFetchData} setCommentList={setCommentList} /> */}
      {/* {isFetchData ? <div>{commentList.map(comment => comment.content)}</div> : <div>실패</div>} */}
      <WriteComment
        feedList={feedList}
        commentList={commentList}
        setCommentList={setCommentList}
        isFetchData={isFetchData}
        setIsFetchData={setIsFetchData}
      />
    </>
  );
};
// username={feedList.author.username} feedId={feedList.id} comments={feedList.comments}
export default FeedDetailPage;
