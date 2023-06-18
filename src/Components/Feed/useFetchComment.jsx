import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { isfeedFetchToggle, setToken } from '../../Atom/atom';
import { MainAccountToken, BASEURL } from './COMMON';

const useFetchComment = ({ postID, setCommentList, setIsFetchData, fetchType }) => {
  const UserToken = useRecoilValue(setToken);
  const refreshFeedState = useRecoilValue(isfeedFetchToggle);

  const instance = axios.create({
    baseURL: BASEURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: MainAccountToken,
    },
  });

  const POST_instance = axios.create({
    baseURL: BASEURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + UserToken,
    },
  });

  useEffect(() => {
    if (fetchType === 'feed') {
      console.log(fetchType);
      getFeed();
    } else if (fetchType === 'comment') {
      console.log(fetchType);
      getComment();
    }
  }, [refreshFeedState]);

  async function getComment() {
    console.log('getComment');
    const CommentPOST = `post/${postID}/comments`;

    try {
      const response = await instance.get(CommentPOST);
      console.log(response.data);
      setCommentList(response.data.comments.reverse());
      setIsFetchData(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function getFeed(setReactionCount) {
    const FeedGET = `post/${postID}/?limit=20`;

    console.log('getfeed');
    try {
      const response = await POST_instance.get(FeedGET);
      console.log(response.data);
      setReactionCount(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function postHeart(hearted, setReactionCount) {
    console.log('하트');
    let POST_URL = '';
    const HeartPost = `post/${postID}/heart`;
    const UNHeartPost = `post/${postID}/unheart`;
    const FeedGET = `post/${postID}/?limit=20`;

    if (!hearted) {
      POST_URL = HeartPost;
    } else {
      POST_URL = UNHeartPost;
    }
    console.log(POST_URL);
    try {
      if (!hearted) {
        const response = await POST_instance.post(POST_URL);
        getFeed(setReactionCount);
        console.log(response.data);
      } else {
        console.log('delete!!');
        const response = await POST_instance.delete(POST_URL);
        getFeed(setReactionCount);

        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return { postHeart, getComment, getFeed };
};

export default useFetchComment;
