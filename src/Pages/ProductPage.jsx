import React from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import Input from '../Components/Common/Input';
import uploadImg from '../assets/icons/uploadImg.svg'

const ProductPage = () => {
  return (
    <>
      <MainHeader type="save"/>
      <SImgWrap>
        <SImgBg>
          <SUploadImgBtn>
            <SInputImg></SInputImg>
          </SUploadImgBtn>
        </SImgBg>
      </SImgWrap>
      <Input placeholder="2~15자 이내여야 합니다." label="상품명" />
      <Input placeholder="숫자만 입력 가능합니다." label="가격" />
      <Input placeholder="URL을 입력해 주세요." label="판매 링크" />
    </>
  );
};

export default ProductPage;

const SImgBg = styled.div`
  margin: 34px;
  width: 322px;
  height: 204px;
  background-color: var(--lightgray);
  border: 0.5px solid var(--gray);
  border-radius: 10px;
`;

const SImgWrap = styled.div`
`;

const SUploadImgBtn = styled.div`
  float: right;
  bottom: 100px;
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