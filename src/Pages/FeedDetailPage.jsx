import React, { useState, useEffect } from 'react';
import iconHeart from '../assets/icons/heart.svg';
import iconFillHeart from '../assets/icons/fill-heart.svg';
import iconComment from '../assets/icons/chat-green.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../Components/Common/MainHeader';
import Comment from '../Components/Feed/Comment';
import {
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
  SDetailFeedCard,
  SPostImage,
  SHeartImgDetail,
} from '../Styles/FeedStyle/PostStyle';
import WriteComment from '../Components/Feed/WriteComment';
import { APIDefaultImage, profileImg } from '../Components/Feed/COMMON';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setToken, isConfigModal, isEditCheck } from '../Atom/atom';
import CommonModal from '../Components/Common/CommonModal';
import useFetchComment from '../Hooks/useFetchComment';
import { extractString } from '../Components/Feed/extractString';
const FeedDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const feedList = location.state.feedList.item;
  const feedTitle = location.state.feedList.title;
  const feedContent = location.state.feedList.content;
  const category = location.state.feedList.category;
  const editFeed = location.state.edit;
  console.log(location.state);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [commentList, setCommentList] = useState({});
  const [isFetchData, setIsFetchData] = useState(false);
  const [reactionCount, setReactionCount] = useState();
  const [isEdit, setIsEdit] = useState(true);

  const isModalState = useRecoilValue(isConfigModal);
  const isEditCheckState = useRecoilValue(isEditCheck);

  const { postHeart, deletePost } = useFetchComment({ postID: feedList.id });

  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }
  async function deleteFeed() {
    await deletePost(); // deletePost 함수의 비동기 작업 완료까지 기다림
    alert('삭제되었습니다!');
    navigate('/feed');
  }

  const setIsConfigModal = useSetRecoilState(isConfigModal);

  useEffect(() => {
    setIsConfigModal(false); //모달체크
    setIsEdit(false); //수정체크
  }, []);
  useEffect(() => {
    if (!isEditCheckState) {
      return;
    }
    setFeedFunction(editFeed);
  }, [isEditCheckState]);
  const setFeedFunction = editFeed => {
    const extractedData = extractString(editFeed.content, 'title');
    if (extractedData === null) {
      return editFeed;
    }
    const { extracted, remaining } = extractedData;

    const categoryData = extractString(remaining, 'category');
    if (categoryData === null) {
      return editFeed;
    }
    setTitle(extracted);
    setContent(categoryData.remaining);
  };

  return (
    <>
      {location.state.feedList.isSearch ? <MainHeader type="search-detail" /> : <MainHeader type="detail" />}
      <SDetailFeedCard>
        <SAuthor>
          {feedList.author.image === APIDefaultImage ? (
            <SProfileImg src={profileImg} alt="프사" onClick={() => goProfile(feedList.author)} />
          ) : (
            <SProfileImg src={feedList.author.image} alt="프사" onClick={() => goProfile(feedList.author)} />
          )}
          <STitleContainer>
            {title === '' ? <STitle>{feedTitle}</STitle> : <STitle>{title}</STitle>}

            <SAuthorInfo>
              <SUserName>{feedList.author.username}</SUserName>
              <SAccountname>@{feedList.author.accountname}</SAccountname>
            </SAuthorInfo>
          </STitleContainer>
        </SAuthor>
        <div>
          {content === '' ? <SContent>{feedContent}</SContent> : <SContent>{content}</SContent>}
          {!feedList.image ? null : <SPostImage src={feedList.image} alt="feed" />}
        </div>
        <SReactionContainer>
          <SReactionContent>
            <SReactionCount>
              {reactionCount?.post.hearted ? (
                <SHeartImgDetail
                  src={iconFillHeart}
                  alt="하트"
                  onClick={() => postHeart(reactionCount?.post.hearted, setReactionCount)}
                />
              ) : (
                <SHeartImgDetail
                  src={iconHeart}
                  alt="하트"
                  onClick={() => postHeart(reactionCount?.post.hearted, setReactionCount)}
                />
              )}
              {reactionCount?.post.heartCount}
            </SReactionCount>
            <SReactionCount>
              <SHeartImg src={iconComment} alt="댓글" />
              {reactionCount?.post.commentCount}
            </SReactionCount>
          </SReactionContent>

          <SAccountname>{feedList.createdAt.slice(0, 10)}</SAccountname>
        </SReactionContainer>
      </SDetailFeedCard>
      <Comment
        feedList={feedList}
        commentList={commentList}
        setCommentList={setCommentList}
        isFetchData={isFetchData}
        setIsFetchData={setIsFetchData}
      />
      <WriteComment
        feedList={feedList}
        commentList={commentList}
        setCommentList={setCommentList}
        isFetchData={isFetchData}
        setIsFetchData={setIsFetchData}
        setReactionCount={setReactionCount}
      />
      {isModalState ? (
        <CommonModal deleteFeed={deleteFeed} feedList={location.state} isEdit={isEdit} setIsEdit={setIsEdit} />
      ) : (
        <></>
      )}
    </>
  );
};
// username={feedList.author.username} feedId={feedList.id} comments={feedList.comments}
export default FeedDetailPage;
