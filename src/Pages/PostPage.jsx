import React from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import Dropdown from '../Components/Common/Dropdown';
import UploadImg from '../assets/icons/uploadImg.svg';


const PostPage = () => {
  return(
    <SMain>
      <MainHeader type="upload"/>
      <STitle>
        <Dropdown />
        <SContentTitle placeholder="제목"/>
      </STitle>
      <SPostContent placeholder="게시글 입력하기..."></SPostContent>
      <SUploadImgBtn></SUploadImgBtn>
  </SMain>
  );
};

export default PostPage;

const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  height: 100vh;
`;

const STitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SContentTitle = styled.input`
  height: 30px;
  width: 260px;
  margin-right: 20px;
  background-color: var(--black);
  border: none;
  outline: none;
  border-bottom: 1px solid var(--gray);
  padding: 5px 0;
  color: var(--white);
  font-size: 14px;
  &:focus {
    transition: all 0.5s;
    border-bottom: 1px solid var(--point-color);
  }
  &::placeholder {
    color: var(--gray);
  }
`;

const SPostContent = styled.textarea`
  margin: 0 20px;
  padding: 0;
  width: 350px;
  height: 500px;
  background-color: var(--black);
  border: none;
  color: var(--white);
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 16px;
`;

const SUploadImgBtn = styled.div`
  display: flex;
  float: right;
  align-items: end;
  width: 50px;
  height: 50px;
  margin: 20px;
  border-radius: 50%;
  background-image: url(${UploadImg});
`;