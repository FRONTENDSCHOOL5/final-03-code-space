import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import postAlbumIcon from '../../assets/icons/post-album.svg';
import postListIcon from '../../assets/icons/post-list.svg';
import postAlbumOnIcon from '../../assets/icons/post-album-on.svg';
import postListOnIcon from '../../assets/icons/post-list-on.svg';
import { useRecoilValue } from 'recoil';
import { setToken } from '../../Atom/atom';
import axios from 'axios';
import ProfilePostList from './ProfilePostList';

export default function ProfilePost({ accountName }) {
  const [isData, setIsData] = useState(false);
  const [postData, setPostData] = useState([]);
  const [isGrid, setIsGrid] = useState(false);

  console.log(accountName);

  const token = useRecoilValue(setToken);

  useEffect(() => {
    getPostData();
  }, [accountName]);

  async function getPostData() {
    const URL = 'https://api.mandarin.weniv.co.kr';
    const reqPath = `/post/${accountName}/userpost`;

    console.log(reqPath);
    try {
      const response = await axios.get(URL + reqPath, {
        method: 'get',
        headers: {
          // 프로필 정보 요청 (토큰 필요)
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      console.log(response.data);
      setPostData(response.data);
      setIsData(true);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(postData.post);
  console.log(postData);

  const handleAlbumClick = e => {
    setIsGrid(true);
    e.target.classList.add('active');
  };

  const handleListClick = e => {
    setIsGrid(false);
    e.target.classList.add('active');
  };

  return (
    <>
      {isData === false ? (
        <SNoContent>
          <p>게시물이 없습니다.</p>
        </SNoContent>
      ) : (
        <SPostLayout>
          <SPostHeader>
            <SListBtn className={isGrid ? '' : 'active'} onClick={handleListClick} />
            <SAlbumBtn className={isGrid ? 'active' : ''} onClick={handleAlbumClick} />
          </SPostHeader>
          {isGrid ? (
            <SPostList>
              <ProfilePostList isGrid={isGrid} postData={postData} />
            </SPostList>
          ) : (
            <ProfilePostList isGrid={isGrid} postData={postData} />
          )}
        </SPostLayout>
      )}
    </>
  );
}

const SNoContent = styled.div`
  text-align: center;

  p {
    color: var(--gray);
  }
`;

const SPostLayout = styled.section`
  background-color: var(--black);
  padding-bottom: 65px;
`;

const SPostHeader = styled.div`
  padding: 9px 16px 9px;
  border-bottom: 1px solid #4d4d4d;
  border-top: 1px solid #4d4d4d;
  text-align: end;

  button {
    width: 26px;
    height: 26px;
  }
`;

const SListBtn = styled.button`
  background: url(${postListIcon}) no-repeat center;
  margin-right: 16px;

  &.active {
    background: url(${postListOnIcon}) no-repeat center;
  }
`;

const SAlbumBtn = styled.button`
  background: url(${postAlbumIcon}) no-repeat center;
  width: 50px;

  &.active {
    background: url(${postAlbumOnIcon}) no-repeat center;
  }
`;

const SPostList = styled.div`
  padding: 16px;

  & > div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }
`;
