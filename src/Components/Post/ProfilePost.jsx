import React from 'react';
import styled from 'styled-components';
import postAlbumIcon from '../../assets/icons/post-album.svg';
import postListIcon from '../../assets/icons/post-list.svg';

export default function ProfilePost() {
  const changeAlbum = e => {
    const postList = document.querySelector('.post');

    if (e.target.classList.contains('album')) {
      postList.classList.add('active');
    } else if (e.target.classList.contains('list')) {
      postList.classList.remove('active');
    }
  };
  return (
    <SPostLayout>
      <SPostHeader>
        <SListBtn className="list" onClick={changeAlbum} />
        <SAlbumBtn className="album" onClick={changeAlbum} />
      </SPostHeader>
      <SPostList className="post">
        <SPostCard>post</SPostCard>
        <SPostCard>post</SPostCard>
        <SPostCard>post</SPostCard>
        <SPostCard>post</SPostCard>
        <SPostCard>post</SPostCard>
      </SPostList>
    </SPostLayout>
  );
}

const SPostLayout = styled.section`
  background-color: var(--black);
`;

const SPostHeader = styled.div`
  box-shadow: inset 0 0 10px red;
  padding: 9px 16px 9px;
  border-bottom: 1px solid #4d4d4d;
  text-align: end;

  button {
    width: 26px;
    height: 26px;
    box-shadow: inset 0 0 10px red;
  }
`;

const SListBtn = styled.button`
  background: url(${postListIcon}) no-repeat center;
  margin-right: 16px;
`;

const SAlbumBtn = styled.button`
  background: url(${postAlbumIcon}) no-repeat center;
  width: 50px;
`;

const SPostList = styled.div`
  padding: 11px 16px;
  box-sizing: border-box;

  &.active {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* min-height: 114px; */
    gap: 8px;
  }
`;

const SPostCard = styled.div`
  box-shadow: inset 0 0 10px red;
  color: white;
`;
