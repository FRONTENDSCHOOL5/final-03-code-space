import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { setToken } from '../Atom/atom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isEditCheck } from '../Atom/atom';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import uploadImg from '../assets/icons/uploadImg.svg';
import delImg from '../assets/icons/del.svg';
import axios from 'axios';

const PostPage = () => {
  const url = 'https://api.mandarin.weniv.co.kr/';
  const authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzZjYjJjYjIwNTY2MzJjZmZlYiIsImV4cCI6MTY5MDY5NDM4MCwiaWF0IjoxNjg1NTEwMzgwfQ.Bjwk8EyTTxyFP8-QYiY1SlXsAXTAYQ_Fwmi-nJ-NDx4';

  const isToken = useRecoilValue(setToken);
  const contentInput = useRef();
  const imgInput = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.state?.isEdit;
  const feedList = location.state?.feedList;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const setIsEditCheck = useSetRecoilState(isEditCheck);

  const [title, setTitle] = useState(isEdit ? feedList.title : '');
  const [content, setContent] = useState(isEdit ? feedList.content : '');
  const [code, setCode] = useState(isEdit ? feedList.content : '');
  const [imgAddList, setImgAddList] = useState([]);

  useEffect(() => {
    if (isEdit) {
      handleItemClick(feedList.category);
      setImgAddList(feedList.item.image);
    }

    if (selectedItem == '질문있어요!') {
      setIsCode(true);
    }
    else {
      setIsCode(false);
    }

    // 필수 내용 다 입력했는지
    if(selectedItem &&
    title !== '' &&
    content !== '' && 
    imgAddList.length <= 3){
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [selectedItem, title, content,imgAddList]);

  // 카테고리 드롭다운
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = item => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  // 제목
  function writeTitle(e) {
    setTitle(e.target.value);
  }

  // 게시글
  function writePost(e) {
    setContent(e.target.value);
  }

  // 코드
  function writeCode(e){
    setCode(e.target.value);
  }

  // 카테고리, 제목, 게시글 보내기
  const handleUploadPost = async e => {

    // 이미지 넣지 않았을 떄
    let image = ""; // 이미지 변수 초기화 

    // 이미지 3장 이내로 넣었을 때 ','로 각 이미지 구분해줌
    const imgUrls = imgAddList.map((img) => img.url);
    image = imgUrls.join(',');

    const config = {
      headers: { Authorization: 'Bearer ' + isToken, 'Content-type': 'application/json' },
    };

    if (isEdit) {
      const image = feedList.item.image;
      try {
        const response = await axios.put(
          url + `post/${feedList.item.id}`,
          {
            post: {
              content: `\\\"title:${title}\\\"\\\"category:${selectedItem}\\\"\\\"${content}\\\"code:${code}`,
              image: image,
            },
          },
          config,
        );
        console.log(response.data.post);
        setIsEditCheck(true);
        navigate('/feeddetail', { state: { ...location.state, edit: response.data.post } });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(
          url + 'post',
          {
            post: {
              content: `\\\"title:${title}\\\"\\\"category:${selectedItem}\\\"\\\"${content}\\\"code:${code}`,
              image: image,
            },
          },
          config,
        );
        console.log(response);
        navigate('/feed'); // 업로드 후 feed로 이동
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 이미지 업로드 버튼 클릭시 파일 선택 가능
  const handleClick = () => {
    imgInput.current.click();
  };

  // 이미지 서버 업로드
  const handleUploadImg = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    if(imgAddList.length >= 3){
      alert("이미지는 최대 3장까지만 업로드 가능합니다!");
      return;
    }
    else{
      try {
        const response = await axios.post(url + 'image/uploadfiles/', formData, config).then(alert('업로드완료!'));
        const uploadedImageUrl = url + response.data[0].filename;
        console.log(uploadedImageUrl);
        setImgAddList([...imgAddList, { url: uploadedImageUrl }]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 이미지 미리보기
  const imgAddPreview = () => {
    const imgWidth = imgAddList.length === 1 || isEdit ? '350px' : '270px';

    return (
      <SImgContainer>
        {isEdit ? (
          <SImgBox key={feedList.item.id}>
            <SDelBtn onClick={() => onRemoveAdd(imgAddList)} />
            <SPreviewImg src={imgAddList} style={{ width: imgWidth}} />
          </SImgBox>
        ) : (
          imgAddList.map((img, index) => {
            return (
              <SImgBox key={index}>
                <SDelBtn onClick={() => onRemoveAdd(img.url)} />
                <SPreviewImg src={img.url} style={{ width: imgWidth}} />
              </SImgBox>
            );
          })
        )}
      </SImgContainer>
    );
  };

  // 이미지 삭제
  const onRemoveAdd = deleteUrl => {
    setImgAddList(imgAddList.filter(img => img.url !== deleteUrl));
  };

  return (
    <>
      <MainHeader type="upload" buttonDisabled={isSaveEnabled ? false : true} handleUploadPost={isSaveEnabled ? handleUploadPost : null} />
      <STitle>
        <DropdownWrapper>
          <DropdownButton onClick={toggleDropdown}>{selectedItem ? selectedItem : '카테고리'}</DropdownButton>
          <DropdownContent isOpen={isOpen}>
            <DropdownItem onClick={() => handleItemClick('질문있어요!')}>질문있어요!</DropdownItem>
            <DropdownItem onClick={() => handleItemClick('스터디 모집')}>스터디 모집</DropdownItem>
            <DropdownItem onClick={() => handleItemClick('자유게시판')}>자유게시판</DropdownItem>
          </DropdownContent>
        </DropdownWrapper>
        {isEdit ? (
          <SContentTitle placeholder="제목" onChange={writeTitle} value={title} />
        ) : (
          <SContentTitle placeholder="제목" onChange={writeTitle} />
        )}
      </STitle>
      {isEdit ? (
        <SContentWrap>
          <SPostContent
          placeholder="게시글 입력하기..."
          ref={contentInput}
          onChange={writePost}
          value={content}></SPostContent>
        </SContentWrap>
      ) : (
        <SContentWrap>
          <SPostContent
          placeholder="게시글 입력하기..."
          ref={contentInput}
          onChange={writePost}></SPostContent>
        </SContentWrap>
      )}
      {isCode && (<SCodeWrap>
            <SPostContent
              placeholder="코드 입력하기..."
              ref={contentInput}
              onChange={writeCode}/>
            <SCode>
              <SyntaxHighlighter language="jsx" style={atomDark}>{code}</SyntaxHighlighter>
            </SCode>
        </SCodeWrap>)}
      {imgAddPreview()}
      <SUploadImgBtn onClick={handleClick}>
        <SInputImg
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          ref={imgInput}
          onChange={handleUploadImg}></SInputImg>
      </SUploadImgBtn>
    </>
  );
};

export default PostPage;

const DropdownWrapper = styled.div`
  margin: 15px;
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  min-width: 80px;
  padding: 5px 0;
  background-color: var(--point-color);
  color: var(--white);
  font-size: 14px;
  border-radius: 22px;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  margin-top: 2px;
  color: var(--gray);
  background-color: var(--black);
  min-width: 80px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 10px;

  &:hover {
    background-color: var(--gray);
    color: var(--black);
  }
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
  padding-bottom: 10px;
  background-color: var(--black);
  border: none;
  outline: none;
  border-bottom: 1px solid var(--gray);
  padding: 5px 0;
  color: var(--white);
  font-size: 20px;
  &:focus {
    transition: all 0.5s;
    border-bottom: 1px solid var(--point-color);
  }
  &::placeholder {
    color: var(--gray);
  }
`;

const SPostContent = styled(TextareaAutosize)`
  margin: 0 20px 15px 20px;
  padding: 0;
  width: 350px;
  background-color: var(--black);
  border: none;
  color: var(--white);
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  &::-webkit-scrollbar {
  display: none;
}
`;

const SContentWrap = styled.div`
`;

const SCodeWrap = styled.div`
`;

const SCode = styled.div`
  margin: 0 20px;
`;

const SUploadImgBtn = styled.div`
  float: right;
  width: 50px;
  height: 50px;
  margin: 20px;
  border-radius: 50%;
  background-image: url(${uploadImg});
  cursor: pointer;
`;

const SInputImg = styled.input`
  display: none;
`;

const SImgContainer = styled.div`
  margin: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: nowrap;
  overflow-x: auto;
  &::-webkit-scrollbar {
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10px;
    background: var(--darkgray);
    background-clip: padding-box;
    border: 5px solid transparent;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
    height: 100px;
  }
`;

const SImgBox = styled.div`
  position: relative;
  flex: 1;
`;

const SPreviewImg = styled.img`
  border-radius: 10px;
`;

const SDelBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background-image: url(${delImg});
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;