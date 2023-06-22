import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { setToken } from '../../Atom/atom';
import axios from 'axios';
import styled from 'styled-components';
import ProductCard from './ProductCard';

export default function ProductList({ accountName }) {
  const [productData, setProductData] = useState([]);
  const token = useRecoilValue(setToken);
  console.log(accountName);

  const URL = 'https://api.mandarin.weniv.co.kr';
  const reqPath = `/product/${accountName}`;
  console.log(reqPath);

  useEffect(() => {
    getUserData();
  }, [reqPath]);

  async function getUserData() {
    try {
      const response = await axios.get(URL + reqPath, {
        method: 'get',
        headers: {
          // 상품 요청 (토큰 필요)
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      console.log(response.data.product);
      setProductData(response.data.product);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(productData);

  if (productData.length === 0) {
    // 상품이 없을 때
    return null;
  } else if (productData.length > 0) {
    // 상품이 있을 때
    return (
      <SLayout>
        <SProductListTitle>판매 중인 상품</SProductListTitle>
        {/* 상품 갯수만큼 상품카드 넣어주기 */}
        <SProductList>
          {productData &&
            productData.map(product => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  itemName={product.itemName}
                  price={product.price}
                  itemImg={product.itemImage}
                />
              );
            })}
        </SProductList>
      </SLayout>
    );
  }
}

const SLayout = styled.div`
  padding: 21px 0 20px 16px;
  background-color: var(--black);
  border-top: 1px solid #4d4d4d;
  border-bottom: 1px solid #4d4d4d;
`;

const SProductList = styled.div`
  display: flex;
  gap: 10px;
  /* overflow: hidden; */
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  div {
    flex-shrink: 0;

    &:last-child {
      margin-right: 16px;
    }
  }
`;

const SProductListTitle = styled.h2`
  margin-bottom: 16px;
  color: var(--white);
  font-size: 16px;
  font-weight: 700;
`;

const ProductListLayout = styled.div`
  display: flex;
  gap: 10px;
`;
