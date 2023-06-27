import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainHeader from 'Components/Common/MainHeader';
import uploadImg from 'assets/icons/uploadImg.svg';
import ProfileImg from 'assets/img/profile-img.svg';

const MessagePage = () => {
  const navigate = useNavigate();
  const imgInput = useRef();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    imgInput.current.click();
  };

  const handleInputChange = e => {
    setMessage(e.target.value);
  };

  const handleInputKeyPress = e => {
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const Modal = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
      <StyledModal>
        <SSingleModal>
          <SContents>
            <div onClick={() => navigate('/messagelist')}>채팅방 나가기</div>
          </SContents>
        </SSingleModal>
      </StyledModal>
    );
  };

  return (
    <>
      <MainHeader type="message" handleOpenModal={handleOpenModal} />
      <SMsgWrap>
        <SProfileImg />
        <SContentWrap>
          <SMsgContent>안녕하세요^~^</SMsgContent>
          <SMsgTime>10:23</SMsgTime>
        </SContentWrap>
      </SMsgWrap>
      <SMsgWrap>
        <SProfileImg />
        <SContentWrap>
          <SMsgContent>같이 스터디하고싶어요!</SMsgContent>
          <SMsgTime>10:24</SMsgTime>
        </SContentWrap>
      </SMsgWrap>
      {messages.map(msg => (
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
          accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp, image/tif, image/heic"
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default MessagePage;

const SMsgWrap = styled.div`
  margin: 10px;
  display: flex;
  justify-content: ${props => (props.isMine ? 'flex-end' : 'flex-start')};
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
  color: ${props => (props.isMine ? 'var(--black)' : 'var(--white)')};
  background-color: ${props => (props.isMine ? 'var(--point-color)' : 'var(--black)')};
  border: ${props => (props.isMine ? 'none' : '0.5px solid var(--white)')};
  border-radius: ${props => (props.isMine ? '9px 0px 9px 9px' : '0px 9px 9px 9px')};
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

const StyledModal = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: hidden;
  z-index: 9999;
  /* text-align: center; */
  background-color: rgba(0, 0, 0, 0.8);
`;

const SContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white);
  margin-top: 50px;
  gap: 16px;
  font-size: 14px;

  div {
    width: 90%;
    text-align: center;
    padding: 13px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: var(--point-color);
    }
  }

  .accent {
    color: var(--point-color);

    &:hover {
      color: var(--white);
    }
  }
`;

const SSingleModal = styled.article`
  width: 100%;
  max-width: 390px;
  height: 100%;
  background-color: var(--black);
  border-radius: 47px 47px 0 0;
  position: fixed;
  top: 87%;

  ::before {
    content: '';
    width: 50px;
    height: 4px;
    background-color: var(--border-gray);
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    border-radius: 15px;
    margin: 17px 0;
  }
`;
