import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import MainHeader from 'Components/Common/MainHeader';
import Input from 'Components/Common/Input';
import uploadImg from 'assets/icons/uploadImg.svg';
import { motion } from 'framer-motion';

import axios from 'axios';
import { setToken } from 'Atom/atomStore';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const url = 'https://api.mandarin.weniv.co.kr/';

  const navigate = useNavigate();
  const isToken = useRecoilValue(setToken);

  const imgInput = useRef();

  const [imgAddList, setImgAddList] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [commaProductPrice, setCommaProductPrice] = useState('');
  const [saleUrl, setSaleURl] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    if (productName !== '' && productPrice !== '' && saleUrl !== '' && uploadedImageUrl !== '') {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [productName, productPrice, saleUrl, uploadedImageUrl]);

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

    try {
      const response = await axios.post(url + 'image/uploadfiles/', formData, config).then(alert('업로드완료!'));
      const uploadedImageUrl = response.data[0].filename;

      setUploadedImageUrl(uploadedImageUrl);
      setImgAddList([...imgAddList, { url: uploadedImageUrl }]);
    } catch (error) {}
  };

  // 상품명
  function writeProductName(e) {
    const productName = e.target.value;
    const trimProductName = productName.slice(0, 15);
    setProductName(trimProductName);
  }

  // 상품가격 1000 단위로 콤마
  function writeProductPrice(e) {
    const productPrice = e.target.value;
    const commaProductPrice = productPrice.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setProductPrice(productPrice);
    setCommaProductPrice(commaProductPrice);
  }

  // 판매링크
  function writeSaleUrl(e) {
    setSaleURl(e.target.value);
  }

  // 상품정보 보내기
  const handleUploadProduct = async e => {
    const imgUrl = imgAddList[0].url;
    const image = url + imgUrl;
    const removedCommaPrice = productPrice.replace(/,/g, '');

    if (productName.length === 1) {
      // 한 글자인 경우 저장을 막음
      alert('상품명을 2~15자 이내로 작성해주세요.');
      return;
    }

    const config = {
      headers: { Authorization: 'Bearer ' + isToken, 'Content-type': 'application/json' },
    };

    try {
      const response = await axios.post(
        url + 'product',
        {
          product: {
            itemName: productName,
            price: Number(removedCommaPrice), //1원 이상
            link: saleUrl,
            itemImage: image,
          },
        },
        config,
      );

      navigate('/myprofile');
    } catch (error) {}
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <MainHeader
          type="save"
          buttonDisabled={isSaveEnabled ? false : true}
          handleUploadProduct={isSaveEnabled ? handleUploadProduct : null}
        />
        <SImgWrap>
          <SImgBg imageUrl={uploadedImageUrl}>
            <SUploadImgBtn onClick={handleClick}>
              <SInputImg
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp, image/tif, image/heic"
                multiple
                ref={imgInput}
                onChange={handleUploadImg}></SInputImg>
            </SUploadImgBtn>
          </SImgBg>
        </SImgWrap>
        <Input
          placeholder="2~15자 이내여야 합니다."
          label="상품명"
          onChange={writeProductName}
          minLength={2}
          maxLength={15}
          style={{ fontSize: '16px' }}
        />
        <Input
          placeholder="숫자만 입력 가능합니다."
          label="가격"
          onChange={writeProductPrice}
          value={commaProductPrice}
          onkeyup="inputNumberFormat(this)"
          style={{ fontSize: '16px' }}
        />
        <Input
          placeholder="상품 설명을 입력해주세요."
          label="판매 설명"
          onChange={writeSaleUrl}
          style={{ fontSize: '16px' }}
        />
      </motion.div>
    </>
  );
};

export default ProductPage;

const SImgBg = styled.div`
  width: 100%;
  height: 204px;
  margin: 34px;
  border: 0.5px solid var(--gray);
  border-radius: 10px;
  background-color: var(--lightgray);
  background-image: ${({ imageUrl }) => imageUrl && `url(https://api.mandarin.weniv.co.kr/${imageUrl})`};
  background-size: cover;
  background-position: center;
`;

const SImgWrap = styled.div`
  position: relative; /* 부모 요소를 relative로 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SUploadImgBtn = styled.div`
  position: absolute; /* 절대 위치로 설정 */
  bottom: 0; /* 바닥에 붙이기 */
  right: 0; /* 오른쪽에 붙이기 */
  float: right;
  width: 60px;
  height: 60px;
  margin: 20px;
  border-radius: 50%;
  background-image: url(${uploadImg});
  background-size: 60px 60px;
  cursor: pointer;
`;

const SInputImg = styled.input`
  display: none;
`;
