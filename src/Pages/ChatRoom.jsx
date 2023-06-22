import React, { useState } from 'react';
import styled from 'styled-components';
import profileImg from '../assets/img/profile-img.svg';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: message,
      isMine: true,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ProfileImage src={profileImg} />
        <ChatTitle>친구이름</ChatTitle>
      </ChatHeader>
      <ChatMessages>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} isMine={msg.isMine}>
            <MessageText isMine={msg.isMine}>{msg.text}</MessageText>
          </ChatMessage>
        ))}
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={handleInputChange}
        />
        <SendMessageButton onClick={handleSendMessage}>
          전송
        </SendMessageButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

// 스타일 컴포넌트 코드 생략

export default ChatRoom;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f9f9f9;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const ChatTitle = styled.h1`
  font-size: 16px;
  font-weight: bold;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
`;

const ChatMessage = styled.div`
  display: flex;
  justify-content: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
  margin-bottom: 12px;
`;

const MessageText = styled.p`
  padding: 8px;
  background-color: ${({ isMine }) => (isMine ? '#DCF8C6' : '#E8E8E8')};
  border-radius: ${({ isMine }) =>
    isMine ? '12px 0 12px 12px' : '0 12px 12px 12px'};
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f9f9f9;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
`;

const SendMessageButton = styled.button`
  margin-left: 12px;
  padding: 8px 16px;
  background-color: #3d85c6;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;