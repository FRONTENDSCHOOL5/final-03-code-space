import React from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import Input from '../Components/Common/Input';

const ProductPage = () => {
  return (
  <>
    <MainHeader type="save"/>
    <SImgBg></SImgBg>
    <Input placeholder="2~15자 이내여야 합니다." label="상품명" />
    <Input placeholder="숫자만 입력 가능합니다." label="가격" />
    <Input placeholder="URL을 입력해 주세요." label="판매 링크" />
  </>
  );
};

export default ProductPage;

const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  height: 100vh;
`;

const SImgBg = styled.div`
  margin: 34px;
  width: 322px;
  height: 204px;
  background-color: var(--lightgray);
  border: 0.5px solid var(--gray);
  border-radius: 10px;
`;