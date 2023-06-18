import React from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';

const MessageListPage = () => {
  return (
    <>
      <MainHeader type="more"></MainHeader>
      <SWrapChatList></SWrapChatList>
      <BottomNav></BottomNav>
    </>
  );
};

export default MessageListPage;

const SWrapChatList = styled.div`
  width: 390px;
  height: 70px;
  background-color: white;
`;