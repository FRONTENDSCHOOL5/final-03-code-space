import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import backIcon from '../../assets/icon-arrow-left.svg';
import searchIcon from '../../assets/icon-search.svg';
import Button from './Button';
import { useNavigate } from 'react-router-dom';


const MainHeader = ({ type, handleUploadPost}) => {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }
  return (
    <>
      <SLayout>
        {type === 'feed' ? (
          <>
            <div>코드스페이스</div>
            <img src={searchIcon} alt="돋보기"></img>
          </>
        ) : type === 'search' ? (
          <>
            <img src={backIcon} alt="뒤로가기" onClick={goBack}></img>
            <SSearch type="text" placeholder="Search" />
          </>
        ) : type === 'profile' ? (
          <>
            <img src={backIcon} alt="뒤로가기" onClick={goBack}></img>
            <img src={searchIcon} alt="돋보기"></img>
          </>
        ) : type === 'save' ? (
          <>
            <img src={backIcon} alt="뒤로가기"></img>
            <SSaveBtn>저장</SSaveBtn>
          </>
        ) : type === 'upload' ? (
          <>
            <img src={backIcon} alt="뒤로가기"></img>
            <SSaveBtn onClick={handleUploadPost}>업로드</SSaveBtn>
          </>
        ) : (
          <>에러</>
        )}
      </SLayout>
    </>
  );
};

export default MainHeader;
const SLayout = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 390px;
  max-height: 48px;
  margin: 0 auto;
  border-bottom: 1px solid var(--darkgray);
  background-color: var(--black);
  color: var(--white);
  padding: 15px;
  box-sizing: border-box;
  font-family: var(--title-font);
  font-weight: bold;
  align-items: center;
`;

const SSearch = styled.input`
  display: flex;
  flex: 1;
  border-radius: 32px;
  font-size: 14px;
  padding: 6px 12px;
  margin-left: 10px;
  border: none;
  box-sizing: border-box;
`;

const SSaveBtn = styled(Button)`
  width: 90px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
