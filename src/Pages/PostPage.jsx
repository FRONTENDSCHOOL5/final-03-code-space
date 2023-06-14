import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import uploadImg from '../assets/icons/uploadImg.svg'

const PostPage = () => {
  const url = "https://api.mandarin.weniv.co.kr/";
  const photoInput = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [photoAddList, setPhotoAddList] = useState([]);

  // 카테고리 드롭다운
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = item => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  // 사진 업로드 버튼 클릭시 파일 선택 가능
  const handleClick = () => {
    photoInput.current.click();
  }

  const handlePhoto = (e) => {
    const tmp = [];
    const photoAdd = e.target.files;

    for(let i = 0; i < photoAdd.length; i++){
      tmp.push({
        id: photoAdd[i].name, 
        file: photoAdd[i], 
        url: URL.createObjectURL(photoAdd[i])
      })
    }

    setPhotoAddList(tmp.concat(photoAddList))
  }

  const photoAddPreview = () => {
    return photoAddList.map((photo) => {
      return (
        <SImgBox key={photo.url}>
          <SPreviewImg src={photo.url}></SPreviewImg>
        </SImgBox>
      )
    })
  }

  return(
    <SMain>
      <MainHeader type="upload"/>
      <STitle>
        <DropdownWrapper>
          <DropdownButton onClick={toggleDropdown}>
            {selectedItem ? selectedItem : '▼ 카테고리'}
          </DropdownButton>
          <DropdownContent isOpen={isOpen}>
            <DropdownItem onClick={() => handleItemClick('질문있어요!')}>질문있어요!</DropdownItem>
            <DropdownItem onClick={() => handleItemClick('스터디 모집')}>스터디 모집</DropdownItem>
            <DropdownItem onClick={() => handleItemClick('자유게시판')}>자유게시판</DropdownItem>
          </DropdownContent>
        </DropdownWrapper>

        <SContentTitle placeholder="제목"/>
      </STitle>
      <SPostContent placeholder="게시글 입력하기..."></SPostContent>

      {photoAddPreview()}

      <SUploadImgBtn onClick={handleClick}>
        <SInputImg type="file" accept="image/jpg, image/jpeg, image/png" 
    multiple ref={photoInput} onChange={(e) => handlePhoto(e)}></SInputImg>
    </SUploadImgBtn>
  </SMain>
  );
};

export default PostPage;

const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  height: 100vh;
`;

const DropdownWrapper = styled.div`
  margin: 15px;
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  min-width: 74px;
  padding: 5px 0;
  background-color: var(--black);
  color: var(--gray);
  font-size: 14px;
  border-bottom: 1px solid var(--gray);
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  color: var(--gray);
  background-color: var(--black);
  min-width: 74px;
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
  background-color: var(--black);
  border: none;
  outline: none;
  border-bottom: 1px solid var(--gray);
  padding: 5px 0;
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

const SPostContent = styled.textarea`
  margin: 0 20px;
  padding: 0;
  width: 350px;
  height: 200px;
  background-color: var(--black);
  border: none;
  color: var(--white);
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 16px;
`;

const SUploadImgBtn = styled.div`
  display: flex;
  float: right;
  align-items: end;
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

const SImgBox = styled.div`
  width: 100%;
`

const SPreviewImg = styled.img`
  width: 350px;
  margin: 20px;
  border-radius: 10px;
`;
