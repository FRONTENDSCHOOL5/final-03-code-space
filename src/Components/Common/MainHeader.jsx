import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import backIcon from '../../assets/icon-arrow-left.svg';
import searchIcon from '../../assets/icon-search.svg';
import Button from './Button';
import configIcon from '../../assets/icons/icon- more-vertical.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { configModalAtom } from '../../Atom/atom';
const MainHeader = ({
  type,
  handleUploadPost,
  handleSearch,
  searchValue,
  handleUploadProduct,
  searchUser,
  buttonDisabled,
}) => {
  const navigate = useNavigate();
  const setconfigModalAtom = useSetRecoilState(configModalAtom);
  const inputRef = useRef(null);
  useEffect(() => {
    if (type === 'search') {
      inputRef.current.focus();
    }
  }, []);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      searchUser();
    }
  };
  return (
    <>
      <SLayout>
        {type === 'feed' ? (
          <>
            <div>코드스페이스</div>
            <SSearchIcon src={searchIcon} alt="돋보기" onClick={() => navigate('/search')} />
          </>
        ) : type === 'search' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate('/feed')}></SBackIcon>
            <SSearch
              type="text"
              ref={inputRef}
              placeholder="검색어를 입력하세요!"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              isFocused={isInputFocused}
              value={searchValue} // 검색어 값 추가
              onChange={event => handleSearch(event)}
            />
          </>
        ) : type === 'search-user' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate('/feed')}></SBackIcon>
            <SSearch
              type="text"
              ref={inputRef}
              placeholder="검색어를 입력하세요!"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              isFocused={isInputFocused}
              value={searchValue} // 검색어 값 추가
              onChange={event => handleSearch(event)}
              onKeyDown={handleKeyDown}
            />
            <SSearchIconBtn src={searchIcon} alt="돋보기" onClick={searchUser} />
          </>
        ) : type === 'profile' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate(-1)}></SBackIcon>
            <SSettingIcon
              src={configIcon}
              alt="설정창"
              onClick={() => setconfigModalAtom('post-config')}></SSettingIcon>
          </>
        ) : type === 'detail' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate('/feed')}></SBackIcon>
            <SSettingIcon
              src={configIcon}
              alt="설정창"
              onClick={() => setconfigModalAtom('post-config')}></SSettingIcon>
          </>
        ) : type === 'search-detail' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate(-1)}></SBackIcon>
            <SSettingIcon
              src={configIcon}
              alt="설정창"
              onClick={() => setconfigModalAtom('post-config')}></SSettingIcon>
          </>
        ) : type === 'save' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기"></SBackIcon>
            <SSaveBtn onClick={handleUploadProduct}>저장</SSaveBtn>
          </>
        ) : type === 'upload' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate(-1)}></SBackIcon>
            <SUploadBtn disabled={buttonDisabled} onClick={handleUploadPost} style={{ marginRight: '5px' }}>
              업로드
            </SUploadBtn>
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
  border: 2.5px solid ${props => (props.isFocused ? 'var(--point-color)' : 'var(--black)')};
  outline: none;
  transition: border-color 0.3s ease-in-out;
`;

const SSaveBtn = styled(Button)`
  width: 90px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SUploadBtn = styled.button`
  width: 90px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--point-color);
  color: var(--white);
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0;
  border: none;
  border-radius: 44px;
  box-sizing: border-box;
  cursor: pointer;

  &:disabled {
    cursor: default;
    background: var(--secondary-color);
  }
`;

const SBackIcon = styled.img`
  &:hover {
    scale: 1.1;
  }
`;
const SSettingIcon = styled.img`
  &:hover {
    scale: 1.1;
  }
`;
const SSearchIcon = styled.img`
  &:hover {
    scale: 1.1;
    fill: var(--point-color);
    filter: invert(53%) sepia(7%) saturate(4534%) hue-rotate(95deg) brightness(105%) contrast(78%);
  }
`;
const SSearchIconBtn = styled(SSearchIcon)`
  margin-left: -30px;
  filter: invert(53%) sepia(7%) saturate(4534%) hue-rotate(95deg) brightness(105%) contrast(78%);
`;
