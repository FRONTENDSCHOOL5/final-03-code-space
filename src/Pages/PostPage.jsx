import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import uploadImg from '../assets/icons/uploadImg.svg'
import delImg from '../assets/icons/del.svg'
import axios from 'axios';

const PostPage = () => {
  const url = "https://api.mandarin.weniv.co.kr/";

  const imgInput = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [imgAddList, setImgAddList] = useState([]);

  // 카테고리 드롭다운
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = item => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  // 이미지 업로드 버튼 클릭시 파일 선택 가능
  const handleClick = () => {
    imgInput.current.click();
  }


  // 이미지 서버 업로드
  const handleUploadImg = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    for(let value of formData.values()){
      console.log(value);
    }

    const config = {
      headers:{'Content-Type': 'multipart/form-data',}
    };

    try {
      const response = await axios.post(url+"image/uploadfiles/", formData, config).then(alert("업로드완료!"));
      const uploadedImageUrl = response.data[0].filename;
      console.log(uploadedImageUrl);
      setImgAddList([...imgAddList, { url: uploadedImageUrl }]);
      console.log(response);
    }catch (error) {
      console.log(error);
    }
  }

  // 이미지 미리보기
  const imgAddPreview = () => {
    return(
      <SImgContainer>
        {imgAddList.map((img, index) => {
          const imgWidth = imgAddList.length === 1 ? '350px' : '100px';
          const imgMargin = imgAddList.length === 1 ? '20px' : '10px';
          return(
            <SImgBox key={index}>
              <SDelBtn onClick={()=> onRemoveAdd(img.url)}></SDelBtn>
              <SPreviewImg src={url+img.url} style={{width: imgWidth, margin: imgMargin}}></SPreviewImg>
            </SImgBox>
          );
        })};
      </SImgContainer>
    );
  };


  // 이미지 삭제
  const onRemoveAdd = (deleteUrl) => {
    setImgAddList(imgAddList.filter(img => img.url != deleteUrl))
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

      {imgAddPreview()}

      <SUploadImgBtn onClick={handleClick}>
        <SInputImg type="file" accept="image/jpg, image/jpeg, image/png" multiple ref={imgInput} onChange={handleUploadImg}></SInputImg>
    </SUploadImgBtn>
  </SMain>
  );
};

export default PostPage;

const SMain = styled.div`
  position: relative;
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  min-height: 100vh;
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
  /* position: fixed;
  bottom: 10px;
  right: 580px;
  display: flex;
  align-items: end; */
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
  display: flex;
`;

const SImgBox = styled.div`
  flex: 1;
  position: relative;
`;

const SPreviewImg = styled.img`
  border-radius: 10px;
`;

const SDelBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
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