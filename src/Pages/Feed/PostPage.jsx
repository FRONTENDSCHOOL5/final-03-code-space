import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { setToken } from 'Atom/atomStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { isEditCheck } from 'Atom/atomStore';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import MainHeader from 'Components/Common/MainHeader';
import uploadImg from 'assets/icons/uploadImg.svg';
import delImg from 'assets/icons/delete1.svg';
import axios from 'axios';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';
import AlertModal from 'Components/Common/AlertModal';

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
  const imgArr = location.state?.imgArr;
  const state = location.state;
  const category = ['스터디 모집', '질문있어요!', '자유게시판'];
  const codeLanguages = ['html', 'css', 'javascript', 'jsx', 'python', 'java', 'c'];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isEditCheckState, setEditCheckState] = useRecoilState(isEditCheck);

  const [showAlert, setShowAlert] = useState(false); // 이미지 업로드 alert창 상태
  const [showWarningAlert, setShowWarningAlert] = useState(false); // 이미지 업로드 3장 초과 alert창 상태

  const [isOpenLanguageDropdown, setIsOpenLanguageDropdown] = useState(false);

  const [title, setTitle] = useState(isEditCheckState ? state.title : '');
  const [content, setContent] = useState(isEditCheckState ? state.content : '');
  const [code, setCode] = useState(isEditCheckState ? state.code : '');
  const [language, setLanguage] = useState(isEditCheckState ? state.language : '');
  const [imgAddList, setImgAddList] = useState([]);
  console.log(isEditCheckState, isEdit);
  useEffect(() => {
    if (!isEditCheckState && isEdit) {
      navigate('/feeddetail', { state: { ...location.state, isEdit: false } });
    }
    if (isEditCheckState) {
      handleItemClick(state.category);
      setImgAddList(imgArr);
    }
  }, []);
  useEffect(() => {
    if (selectedItem == '질문있어요!' || selectedItem == '자유게시판') {
      setIsCode(true);
    } else {
      setIsCode(false);
    }

    // 필수 내용 다 입력했는지
    if (selectedItem && title !== '' && content !== '') {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [selectedItem, title, content, imgAddList]);

  // 카테고리 드롭다운
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = item => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  // 코드 언어 드롭다운
  const toggleLanguageDropdown = () => {
    setIsOpenLanguageDropdown(!isOpenLanguageDropdown);
  };

  const handleLanguageItemClick = language => {
    setLanguage(language);
    setIsOpenLanguageDropdown(false);
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
  function writeCode(e) {
    setCode(e.target.value);
  }

  // 카테고리, 제목, 게시글 보내기
  const handleUploadPost = async e => {
    const config = {
      headers: { Authorization: 'Bearer ' + isToken, 'Content-type': 'application/json' },
    };

    let image = ''; // 이미지 변수 초기화

    if (isEditCheckState) {
      const imgUrls = imgAddList.map(img => img.url);
      image = imgUrls.join(',');
      try {
        const response = await axios.put(
          url + `post/${feedList.item.id}`,
          {
            post: {
              content: `\\\"title:${title}\\\"\\\"category:${selectedItem}\\\"\\\"code:${code}\\\"\\\"content:${content}\\\"\\\"language:${language}\\\"`,
              image: image,
            },
          },
          config,
        );

        setEditCheckState(true);
        navigate('/feeddetail', { state: { ...location.state, edit: response.data.post, isEdit: false } });
      } catch (error) {}
    } else {
      // 이미지 넣지 않았을 떄

      // 이미지 3장 이내로 넣었을 때
      const imgUrls = imgAddList.map(img => img.url);
      image = imgUrls.join(',');
      try {
        const response = await axios.post(
          url + 'post',
          {
            post: {
              content: `\\\"title:${title}\\\"\\\"category:${selectedItem}\\\"\\\"code:${code}\\\"\\\"content:${content}\\\"\\\"language:${language}\\\"`,
              image: image,
            },
          },
          config,
        );

        navigate('/feed'); // 업로드 후 feed로 이동
      } catch (error) {}
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

    if (imgAddList.length >= 3) {
      // alert('이미지는 최대 3장까지만 업로드 가능합니다!');
      setShowWarningAlert(true);
      return;
    } else {
      try {
        const response = await axios.post(url + 'image/uploadfiles/', formData, config).then(setShowAlert(true));
        const uploadedImageUrl = url + response.data[0].filename;

        setImgAddList([...imgAddList, { url: uploadedImageUrl }]);
      } catch (error) {}
    }
  };
  // 이미지 미리보기
  const imgAddPreview = () => {
    const imgWidth = imgAddList.length === 1 || isEditCheckState ? '350px' : '270px';

    return (
      <SImgContainer>
        {isEditCheckState
          ? imgAddList.map((img, index) => {
              return (
                <SImgBox key={index}>
                  <SDelBtn onClick={() => onRemoveAdd(img.url)} />
                  <SPreviewImg style={{ width: imgWidth }}>
                    <SPreviewImgCover src={img.url} />
                  </SPreviewImg>
                </SImgBox>
              );
            })
          : imgAddList.map((img, index) => {
              return (
                <SImgBox key={index}>
                  <SDelBtn onClick={() => onRemoveAdd(img.url)} />
                  <SPreviewImg style={{ width: imgWidth }}>
                    <SPreviewImgCover src={img.url} />
                  </SPreviewImg>
                </SImgBox>
              );
            })}
      </SImgContainer>
    );
  };
  // 이미지 삭제
  const onRemoveAdd = deleteUrl => {
    setImgAddList(imgAddList.filter(img => img.url !== deleteUrl));
  };

  return (
    <>
      <MainHeader
        type="upload"
        buttonDisabled={isSaveEnabled ? false : true}
        handleUploadPost={isSaveEnabled ? handleUploadPost : null}
      />
      <STitle>
        <DropdownWrapper>
          <DropdownButton onClick={toggleDropdown}>{selectedItem ? selectedItem : '카테고리'}</DropdownButton>
          <DropdownContent isOpen={isOpen}>
            {category.map(item => (
              <DropdownItem key={item} onClick={() => handleItemClick(item)}>
                {item}
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownWrapper>
        {isEditCheckState ? (
          <SContentTitle placeholder="제목" onChange={writeTitle} value={title} />
        ) : (
          <SContentTitle placeholder="제목" onChange={writeTitle} />
        )}
      </STitle>
      {isEditCheckState ? (
        <SContentWrap>
          <SPostContent
            placeholder="게시글 입력하기..."
            ref={contentInput}
            onChange={writePost}
            value={content}></SPostContent>
        </SContentWrap>
      ) : (
        <SContentWrap>
          <SPostContent placeholder="게시글 입력하기..." ref={contentInput} onChange={writePost}></SPostContent>
        </SContentWrap>
      )}
      {isCode && !isEditCheckState ? (
        <SCodeWrap>
          <DropdownWrapper>
            <DropdownButton onClick={toggleLanguageDropdown}>{language ? language : '코드 언어'}</DropdownButton>
            <DropdownContent isOpen={isOpenLanguageDropdown}>
              {codeLanguages.map(language => (
                <DropdownItem key={language} onClick={() => handleLanguageItemClick(language)}>
                  {language}
                </DropdownItem>
              ))}
            </DropdownContent>
          </DropdownWrapper>
          <SPostContent placeholder="코드 입력하기..." ref={contentInput} onChange={writeCode} />
          <SCode>
            <SSyntaxHighlighter language={language} style={atomDark}>
              {code}
            </SSyntaxHighlighter>
          </SCode>
        </SCodeWrap>
      ) : (
        isEditCheckState &&
        isCode && (
          <SCodeWrap>
            <DropdownWrapper>
              <DropdownButton onClick={toggleLanguageDropdown}>{language ? language : '코드 언어'}</DropdownButton>
              <DropdownContent isOpen={isOpenLanguageDropdown}>
                {codeLanguages.map(language => (
                  <DropdownItem key={language} onClick={() => handleLanguageItemClick(language)}>
                    {language}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </DropdownWrapper>
            <SPostContent placeholder="코드 입력하기..." ref={contentInput} onChange={writeCode} value={code} />
            <SCode>
              <SyntaxHighlighter language={language} style={atomDark}>
                {code}
              </SyntaxHighlighter>
            </SCode>
          </SCodeWrap>
        )
      )}
      {imgAddPreview()}
      <SUploadBtnWrap>
        <SUploadImgBtn onClick={handleClick}>
          <SInputImg
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/gif"
            multiple
            ref={imgInput}
            onChange={handleUploadImg}></SInputImg>
        </SUploadImgBtn>
      </SUploadBtnWrap>
      {showAlert && <AlertModal message="이미지 업로드 완료" onClose={() => setShowAlert(false)} />}
      {showWarningAlert && (
        <AlertModal message="이미지는 최대 3장까지만 업로드 가능합니다." onClose={() => setShowWarningAlert(false)} />
      )}{' '}
      {/* alert 띄우는 곳 */}
    </>
  );
};

export default PostPage;

const SUploadBtnWrap = styled.div`
  width: 390px;
  height: 100px;
  background-color: var(--black);
`;

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
  font-size: 12px;
  border-radius: 10px;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  margin-top: 2px;
  color: var(--gray);
  background-color: var(--black);
  min-width: 110px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: var(--point-color);
    color: var(--white);
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
  font-size: 16px;
  &:focus {
    transition: all 0.5s;
    border-bottom: 1px solid var(--point-color);
  }
  &::placeholder {
    color: var(--gray);
  }
`;

const SPostContent = styled(TextareaAutosize)`
  margin: 10px 20px 15px 20px;
  padding: 0;
  width: 350px;
  min-height: 100px;
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

const SContentWrap = styled.div``;

const SCodeWrap = styled.div``;

const SCode = styled.div`
  margin: 0 20px;
`;

const SSyntaxHighlighter = styled(SyntaxHighlighter)`
  font-size: 11px;
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

const SUploadImgBtn = styled.div`
  float: right;
  width: 50px;
  height: 50px;
  margin: 20px;
  border-radius: 50%;
  background-image: url(${uploadImg});
  cursor: pointer;
  background-color: var(--black);
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

const SPreviewImg = styled.div`
  border-radius: 10px;
  height: 200px;
  overflow: hidden;
`;

const SPreviewImgCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SDelBtn = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
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
