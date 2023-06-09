import React from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import Input from '../Components/Common/Input';

const ProductPage = () => {
  return (
  <SMain>
    <MainHeader type="save"/>
    <SImgTitle>이미지 등록</SImgTitle>
    <SImgBg></SImgBg>
    <Input placeholder="2~15자 이내여야 합니다." label="상품명" />
    <Input placeholder="숫자만 입력 가능합니다." label="가격" />
    <Input placeholder="URL을 입력해 주세요." label="판매 링크" />
  </SMain>
  );
};

export default ProductPage;

const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  height: 100vh;
`;

const SImgTitle = styled.p`
  font-size: 12px;
  color: var(--lightgray);
  margin: 30px 0 18px 34px;
`;

const SImgBg = styled.div`
  margin: 0 34px;
  width: 322px;
  height: 204px;
  background-color: var(--lightgray);
  border: 0.5px solid var(--gray);
  border-radius: 10px;
`;