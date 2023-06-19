import React from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import ProfileImg from '../assets/img/profile-img.svg';

const MessageListPage = () => {
  return (
    <>
      <MainHeader type="more"></MainHeader>
      <SWrapChatList>
        <SProfileImg></SProfileImg>
        <SMsgWrap>
          <SMsgName>코딩천재</SMsgName>
          <SContentWrap>
            <SMsgContent>같이 스터디하고싶어요!</SMsgContent>
            <SMsgDate>2023.06.19</SMsgDate>
          </SContentWrap>
        </SMsgWrap>
      </SWrapChatList>
      <SWrapChatList>
        <SProfileImg></SProfileImg>
        <SMsgWrap>
          <SMsgName>돼지버그</SMsgName>
          <SContentWrap>
            <SMsgContent>이 부분만 고치면 될것같아요~</SMsgContent>
            <SMsgDate>2023.06.19</SMsgDate>
          </SContentWrap>
        </SMsgWrap>
      </SWrapChatList>
      <BottomNav></BottomNav>
    </>
  );
};

export default MessageListPage;

const SWrapChatList = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 390px;
  height: 70px;
  border-bottom: 1px solid var(--border-gray);
`;

const SProfileImg = styled.div`
  margin-left: 10px;
  width: 50px;
  height: 50px;
  background-image: url(${ProfileImg});
  background-size: 50px 50px;
`;

const SMsgWrap = styled.div`
  margin-left: 10px;
`;

const SMsgName = styled.p` 
  margin-bottom: 5px;
  color: var(--white);
  font-size: 14px;
`;

const SContentWrap = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SMsgContent = styled.p`
  color: var(--lightgray);
  font-size: 12px;
`;

const SMsgDate = styled.p`
  color: var(--gray);
  font-size: 10px;
`;