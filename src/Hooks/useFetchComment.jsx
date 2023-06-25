import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { isfeedFetchToggle, setToken } from '../Atom/atom';
import { MainAccountToken, BASEURL } from '../Components/Feed/COMMON';

const useFetchComment = ({
  postID,
  setCommentList,
  setIsFetchData,
  fetchType,
  commentId,
  setIsFeedFetchData,
  setAlertModal,
}) => {
  const UserToken = useRecoilValue(setToken);

  const POST_instance = axios.create({
    baseURL: BASEURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + UserToken,
    },
  });

  async function deletePost() {
    const deletePost = `post/${postID}`;
    try {
      const response = await POST_instance.delete(deletePost);
      console.log(response.data);
      console.log(response.data.message);
      return '게시글이 삭제되었습니다.';
      // alert('삭제되었습니다!');
    } catch (error) {
      console.error(error);
      return '잘못된 접근입니다.';

      // return Promise.reject(error);
    }
  }
  async function deleteComment() {
    // /post/:post_id/comments/:comment_id
    const deleteComment = `post/${postID}/comments/${commentId}`;
    try {
      const response = await POST_instance.delete(deleteComment);
      console.log(response.data);
      console.log(response.data.message);
      // alert('삭제되었습니다!');
      return '댓글이 삭제되었습니다.';
    } catch (error) {
      console.error(error);
      return '잘못된 접근입니다.';
    }
  }
  async function editPost() {
    const editPost = `post/${postID}`;
    try {
      const response = await POST_instance.put(editPost);
      console.log(response.data);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
      return '잘못된 접근입니다.';
    }
  }

  async function getComment() {
    const CommentPOST = `post/${postID}/comments`;

    try {
      const response = await POST_instance.get(CommentPOST);
      setCommentList(response.data.comments.reverse());
      setIsFetchData(true);
      console.log(response.data.comments);
    } catch (error) {
      console.error(error);
      return '잘못된 접근입니다.';
    }
  }

  async function getFeed({ setReactionCount, type }) {
    const FeedGET = `post/${postID}/?limit=2`;
    if (type === 'init') {
      try {
        const response = await POST_instance.get(FeedGET);
        // setReactionCount(response.data);
        console.log(response.data.post);
        setIsFeedFetchData(true);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await POST_instance.get(FeedGET);
        setReactionCount(response.data);
        console.log(response.data.post);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function postHeart(hearted, setReactionCount) {
    console.log('하트');
    let POST_URL = '';
    const HeartPost = `post/${postID}/heart`;
    const UNHeartPost = `post/${postID}/unheart`;

    if (!hearted) {
      POST_URL = HeartPost;
    } else {
      POST_URL = UNHeartPost;
    }
    console.log(POST_URL);
    try {
      if (!hearted) {
        const response = await POST_instance.post(POST_URL);
        getFeed({ setReactionCount });
        console.log(response.data);
      } else {
        console.log('delete!!');
        const response = await POST_instance.delete(POST_URL);
        getFeed({ setReactionCount });

        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return { postHeart, getComment, getFeed, deletePost, editPost, deleteComment };
};

export default useFetchComment;
