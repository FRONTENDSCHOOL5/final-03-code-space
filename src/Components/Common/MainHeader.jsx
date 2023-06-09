import React from 'react';
import styled from 'styled-components';
import backIcon from '../../assets/icon-arrow-left.svg';
import searchIcon from '../../assets/icon-search.svg';
import Button from './Button';
const MainHeader = ({ type }) => {
  return (
    <>
      <SLayout>
        {type === 'feed' ? (
          <>
            <div>코드허브 피드</div>
            <img src={searchIcon} alt="돋보기"></img>
          </>
        ) : (
          <>
            <img src={backIcon} alt="뒤로가기"></img>
            <SSearch type="text" placeholder="Search" />
          </>
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
  border-bottom: 1px solid #767676;
  background-color: #1e1e1e;
  color: #f8f8f8;
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
