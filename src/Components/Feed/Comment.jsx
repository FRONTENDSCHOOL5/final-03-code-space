import React, { useEffect } from 'react';
import styled from 'styled-components';
import elapsedTime from './elapsedTime';
import { useNavigate } from 'react-router-dom';
import { APIDefaultImage, profileImg } from './COMMON';
import useFetchComment from 'Hooks/useFetchComment';
import configIcon from 'assets/icons/icon- more-vertical.svg';
import { configModalAtom } from 'Atom/atomStore';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const Comment = ({
  feedList,
  commentList,
  setCommentList,
  isFetchData,
  setIsFetchData,
  setCommentId,
  setCommentAccount,
}) => {
  const navigate = useNavigate();
  const setconfigModalAtom = useSetRecoilState(configModalAtom);

  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }
  // FetchDetailFeed 커스텀 훅 사용
  const { getComment } = useFetchComment({
    postID: feedList.id,
    setIsFetchData,
    setCommentList,
  });

  useEffect(() => {
    setIsFetchData(false); // 컴포넌트가 리렌더링될 때마다 데이터를 다시 불러오기 위해 isFetchData 상태를 false로 설정

    getComment(); // 컴포넌트가 마운트될 때 FetchDetailFeed 실행
  }, []);

  return (
    <SCommentListLayout>
      {isFetchData ? (
        <div>
          {commentList.map(comment => {
            return (
              <SCommentLayout key={comment.id}>
                {comment.author.image === APIDefaultImage ? (
                  <SProfileImg src={profileImg} alt="프사" onClick={() => goProfile(comment.author)} />
                ) : (
                  <SProfileImg src={comment.author.image} alt="프사" onClick={() => goProfile(comment.author)} />
                )}
                <SCommentContainer>
                  <SComment>
                    <SUsername>
                      <div>{comment.author.username}</div>
                      <SCreateTime>{elapsedTime(comment.createdAt)}</SCreateTime>
                    </SUsername>
                    <SCommentContents>{comment.content}</SCommentContents>
                  </SComment>
                  <SConfigIcon
                    src={configIcon}
                    alt="config"
                    onClick={() => {
                      setconfigModalAtom('comment-config');
                      setCommentId(comment.id);
                      setCommentAccount(comment.author.accountname);
                    }}></SConfigIcon>
                </SCommentContainer>
              </SCommentLayout>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </SCommentListLayout>
  );
};

export default Comment;

const SCommentListLayout = styled.div`
  padding-bottom: 50px;
`;
const SCommentLayout = styled.div`
  display: flex;
  color: var(--white);
  padding: 20px;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const SConfigIcon = styled.img`
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  cursor: pointer;
  display: flex;
  align-self: flex-start;
`;

const SCommentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const SProfileImg = styled.img`
  max-width: 36px;
  max-height: 36px;
  width: 36px;
  height: 36px;

  border-radius: 50%;
  object-fit: cover;
  display: flex;
  align-self: flex-start;
`;
const SComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const SUsername = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const SCreateTime = styled.div`
  color: var(--gray);
  font-size: 10px;
  &::before {
    content: '•';
    margin-right: 5px;
  }
`;
const SCommentContents = styled.div`
  line-height: 21px;
`;
