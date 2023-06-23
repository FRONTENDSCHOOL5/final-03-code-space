import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import uploadImg from '../assets/icons/uploadImg.svg';
import ProfileImg from '../assets/img/profile-img.svg';
import { motion } from 'framer-motion';

const MessagePage = () => {
  const imgInput = useRef();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleClick = () => {
    imgInput.current.click();
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: message,
      isMine: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <>
      <MainHeader type="message" />
      <SMsgWrap>
        <SProfileImg />
        <SContentWrap>
          <SMsgContent>
            옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,
            뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는
            풍부하게 뛰노는 인생의 힘있다.
          </SMsgContent>
          <SMsgTime>10:23</SMsgTime>
        </SContentWrap>
      </SMsgWrap>
      <SMsgWrap>
        <SProfileImg />
        <SContentWrap>
          <SMsgContent>어쩌고 저쩌고 이상입니다.</SMsgContent>
          <SMsgTime>10:24</SMsgTime>
        </SContentWrap>
      </SMsgWrap>
      {messages.map((msg) => (
        <SMsgWrap key={msg.id} isMine={msg.isMine}>
          <SContentWrap>
            <SMsgTime>{msg.timestamp}</SMsgTime>
            <SMsgContent isMine={msg.isMine}>
              <SMsgText isMine={msg.isMine}>{msg.text}</SMsgText>
            </SMsgContent>
          </SContentWrap>
        </SMsgWrap>
      ))}
      <SLayout>
        <SUploadImgBtn onClick={handleClick} />
        <SInputImg
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          ref={imgInput}
        />
        <SWriteMsg
          placeholder="메세지 입력"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
        <SSendBtn onClick={handleSendMessage}>전송</SSendBtn>
      </SLayout>
    </>
  );
};

export default MessagePage;

const SMsgWrap = styled.div`
  margin: 10px;
  display: flex;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  align-items: center;
`;

const SProfileImg = styled.div`
  width: 42px;
  height: 42px;
  background-image: url(${ProfileImg});
  background-size: 42px 42px;
`;

const SContentWrap = styled.div`
  display: flex;
  align-items: end;
`;

const SMsgContent = styled.div`
  max-width: 240px;
  margin-left: 10px;
  padding: 10px 8px;
  color : ${(props) => 
  props.isMine ? 'var(--black)': 'var(--white)'};
  background-color : ${(props) => 
  props.isMine ? 'var(--point-color)': 'var(--black)'};
  border : ${(props) => 
  props.isMine ? 'none': '0.5px solid var(--white)'};
  border-radius: ${(props) =>
  props.isMine ? '9px 0px 9px 9px' : '0px 9px 9px 9px'};
  font-size: 13px;
  line-height: 1.3;
`;

const SMsgTime = styled.p`
  align-items: end;
  margin-left: 10px;
  color: var(--white);
  font-size: 12px;
`;

const SMsgText = styled.p`
  color: var(--blacks);
  font-size: 13px;
  line-height: 1.3;
`;

const SLayout = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background: var(--black);
  border-top: 0.5px solid var(--darkgray);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SUploadImgBtn = styled.div`
  float: right;
  width: 36px;
  height: 36px;
  margin: 10px 0 10px 10px;
  border-radius: 50%;
  background-image: url(${uploadImg});
  background-size: cover;
  cursor: pointer;
`;

const SInputImg = styled.input`
  display: none;
`;

const SWriteMsg = styled.input`
  height: 30px;
  width: 260px;
  background-color: var(--black);
  border: none;
  outline: none;
  border-bottom: 1px solid var(--gray);
  padding: 10px 0;
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

const SSendBtn = styled.button`
  color: var(--white);
  margin-right: 10px;
  &:hover {
    transition: all 0.5s;
    color: var(--point-color);
  }
`;