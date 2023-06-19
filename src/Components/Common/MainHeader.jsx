import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import backIcon from '../../assets/icon-arrow-left.svg';
import searchIcon from '../../assets/icon-search.svg';
import Button from './Button';
import configIcon from '../../assets/icons/icon- more-vertical.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isConfigModal } from '../../Atom/atom';
const MainHeader = ({ type, handleUploadPost, handleSearch }) => {
  const navigate = useNavigate();
  const setIsConfigModal = useSetRecoilState(isConfigModal);
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
  return (
    <>
      <SLayout>
        {type === 'feed' ? (
          <>
            <div>코드스페이스</div>
            <SBackIcon src={searchIcon} alt="돋보기" onClick={() => navigate('/search')} />
          </>
        ) : type === 'search' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate(-1)}></SBackIcon>
            <SSearch
              type="text"
              ref={inputRef}
              placeholder="검색어를 입력하세요!"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              isFocused={isInputFocused}
              onChange={event => handleSearch(event)}
            />
          </>
        ) : type === 'profile' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate(-1)}></SBackIcon>
            <SBackIcon src={configIcon} alt="설정창" onClick={() => setIsConfigModal(true)}></SBackIcon>
          </>
        ) : type === 'detail' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate('/feed')}></SBackIcon>
            <SBackIcon src={configIcon} alt="설정창" onClick={() => setIsConfigModal(true)}></SBackIcon>
          </>
        ) : type === 'search-detail' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate(-1)}></SBackIcon>
            <SBackIcon src={configIcon} alt="설정창" onClick={() => setIsConfigModal(true)}></SBackIcon>
          </>
        ) : type === 'save' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기"></SBackIcon>
            <SSaveBtn>저장</SSaveBtn>
          </>
        ) : type === 'upload' ? (
          <>
            <SBackIcon src={backIcon} alt="뒤로가기" onClick={() => navigate(-1)}></SBackIcon>
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
  border: 2px solid ${props => (props.isFocused ? 'var(--point-color)' : 'var(--black)')};
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
const SBackIcon = styled.img`
  &:hover {
    scale: 1.1;
  }
`;
