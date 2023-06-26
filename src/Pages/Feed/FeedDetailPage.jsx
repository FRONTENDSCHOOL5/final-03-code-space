import React, { useState, useEffect } from 'react';
import iconHeart from 'assets/icons/heart.svg';
import iconFillHeart from 'assets/icons/fill-heart.svg';
import iconComment from 'assets/icons/chat-green.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import MainHeader from 'Components/Common/MainHeader';
import Comment from 'Components/Feed/Comment';
import { motion } from 'framer-motion';
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
  SHeartImgDetail,
  SCodeEditor,
  SSyntaxHighlighter,
  SCodeLanguage,
  SCreateDate,
} from 'Styles/FeedStyle/PostStyle';
import WriteComment from 'Components/Feed/WriteComment';
import { APIDefaultImage, profileImg } from 'Components/Feed/COMMON';
import { useRecoilState, useRecoilValue } from 'recoil';
import { configModalAtom, isEditCheck, setAccountName } from 'Atom/atomStore';
import ConfigModal from 'Components/Common/ConfigModal';
import useFetchComment from 'Hooks/useFetchComment';
import { extractString } from 'Components/Feed/extractString';
import { extractImageLinks } from 'Components/Feed/extractImage';
import Carousel from 'Components/Feed/Carousel';
import WithSkeleton from 'Components/Common/Skeleton';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import AlertModal from 'Components/Common/AlertModal';
const FeedDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const feedList = location.state.feedList.item;
  const feedTitle = location.state.feedList.title;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [imgArr, setImgArr] = useState([]);

  const [commentList, setCommentList] = useState({});
  const [isFetchData, setIsFetchData] = useState(false);
  const [isFeedFetchData, setIsFeedFetchData] = useState(false);
  const [reactionCount, setReactionCount] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [otherAdmin, setOtherAdmin] = useState(false);
  const [commentAccount, setCommentAccount] = useState('');
  const [alertModal, setAlertModal] = useState('');

  const [isModalState, setconfigModalAtom] = useRecoilState(configModalAtom);

  const [isEditCheckState, setEditCheckState] = useRecoilState(isEditCheck);
  const [myAccountName, setMyAccountName] = useRecoilState(setAccountName);

  const accountName = useRecoilValue(setAccountName);

  const { postHeart, deletePost, deleteComment } = useFetchComment({
    postID: feedList.id,
    commentId: commentId,
    setAlertModal: setAlertModal,
  });
  const { getComment, getFeed } = useFetchComment({
    postID: feedList.id,
    setIsFetchData,
    setCommentList,
    setIsFeedFetchData,
  });

  function goProfile(item) {
    if (myAccountName === item.accountname) {
      navigate(`/myprofile`, { state: item });
    } else {
      navigate(`/myprofile/${item.accountname}`, { state: item });
    }
  }
  async function deleteFeed() {
    const message = await deletePost(); // deletePost 함수의 비동기 작업 완료까지 기다림
    setAlertModal(message); // 삭제 완료 메시지 설정
  }
  async function handleAlertModalClose(type) {
    setAlertModal('');
    if (type === 'feed') {
      navigate('/feed');
    } else if (type === 'comment') {
      getComment();
      const type = 'init';
      const feedData = await getFeed({ type: type }); // getFeed 함수에서 데이터를 받아옴
      setReactionCount(feedData); // 받아온 데이터를 reactionCount에 설정
    }
  }
  async function deleteCommentFunction() {
    const message = await deleteComment(); // deletePost 함수의 비동기 작업 완료까지 기다림
    setAlertModal(message);

    // setFeedFunction(feedData.post); // reactionCount.post에 대한 처리

    // navigate('/feed');
  }
  async function initFeed() {
    const type = 'init';
    const feedData = await getFeed({ type: type }); // getFeed 함수에서 데이터를 받아옴

    setReactionCount(feedData); // 받아온 데이터를 reactionCount에 설정

    setFeedFunction(feedData.post); // reactionCount.post에 대한 처리
  }

  useEffect(() => {
    setIsFeedFetchData(false);
    initFeed();
    setconfigModalAtom(''); //모달체크
    setIsEdit(false); //수정체크
    setEditCheckState(false);

    if (feedList.author.accountname !== accountName) {
      setOtherAdmin(true);
    } else {
      setOtherAdmin(false);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setImgArr(extractImageLinks(reactionCount?.post.image));
  }, [reactionCount]);

  const setFeedFunction = async editFeed => {
    const extractedData = extractString(editFeed.content, 'title');
    if (extractedData === null) {
      return editFeed;
    }
    const { extracted, remaining } = extractedData;

    const categoryData = extractString(remaining, 'category');
    if (categoryData === null) {
      return editFeed;
    }
    const codeData = extractString(categoryData.remaining, 'code');
    if (codeData === null) {
      return editFeed;
    }
    const contentData = extractString(codeData.remaining, 'content');
    if (contentData === null) {
      return editFeed;
    }
    const languageData = extractString(contentData.remaining, 'language');
    if (contentData === null) {
      return editFeed;
    }
    setTitle(extracted);
    setContent(contentData.extracted);
    setCode(codeData.extracted);
    setCategory(categoryData.extracted);
    setLanguage(languageData.extracted);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {location.state.feedList.isSearch ? <MainHeader type="search-detail" /> : <MainHeader type="detail" />}
      {isFeedFetchData ? (
        <>
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
              <SContent>{content}</SContent>
              {code !== '' && (
                <SCodeEditor>
                  <SCodeLanguage>{language}</SCodeLanguage>
                  <SSyntaxHighlighter language={language} style={atomDark}>
                    {code}
                  </SSyntaxHighlighter>
                </SCodeEditor>
              )}

              {imgArr.length === 0 ? null : <Carousel imgArr={imgArr} />}
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

              <SCreateDate>{feedList.createdAt.slice(0, 10)}</SCreateDate>
            </SReactionContainer>
          </SDetailFeedCard>
          <Comment
            feedList={feedList}
            commentList={commentList}
            setCommentList={setCommentList}
            isFetchData={isFetchData}
            setIsFetchData={setIsFetchData}
            setCommentId={setCommentId}
            setCommentAccount={setCommentAccount}
          />
          <WriteComment
            feedList={feedList}
            commentList={commentList}
            setCommentList={setCommentList}
            isFetchData={isFetchData}
            setIsFetchData={setIsFetchData}
            setReactionCount={setReactionCount}
          />
          {isModalState === 'post-config' && !otherAdmin ? (
            <ConfigModal
              deleteFeed={deleteFeed}
              feedList={location.state}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              imgArr={imgArr}
              type="post-config"
              title={title}
              content={content}
              code={code}
              category={category}
              language={language}
            />
          ) : isModalState === 'comment-config' ? (
            <ConfigModal
              deleteComment={deleteCommentFunction}
              commentId={commentId}
              commentAccount={commentAccount}
              type="comment-config"
            />
          ) : (
            isModalState !== '' && otherAdmin && <ConfigModal type="other-config" />
          )}
          {alertModal === '게시글이 삭제되었습니다.' ? (
            <AlertModal message="게시글이 삭제되었습니다." onClose={() => handleAlertModalClose('feed')} />
          ) : alertModal === '댓글이 삭제되었습니다.' ? (
            <AlertModal message="댓글이 삭제되었습니다." onClose={() => handleAlertModalClose('comment')} />
          ) : (
            alertModal === '잘못된 접근입니다.' && (
              <AlertModal message="잘못된 접근입니다." onClose={() => handleAlertModalClose()} />
            )
          )}
        </>
      ) : (
        <WithSkeleton isLoading={isFeedFetchData} type="detail" />
      )}
    </motion.div>
  );
};

export default FeedDetailPage;
