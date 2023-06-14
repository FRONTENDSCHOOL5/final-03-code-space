import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [productData, setProductData] = useState([]);

  const URL = 'https://api.mandarin.weniv.co.kr';
  // const reqPath = `/product/${accountname}`;
  const reqPath = `/product/Alphca/`;

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    try {
      const response = await axios.get(URL + reqPath, {
        method: 'get',
        headers: {
          // 상품 요청 (토큰 필요)
          // Authorization: `Bearer ${token}`
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzc0YjJjYjIwNTY2MzJkMDAwNSIsImV4cCI6MTY5MDY5NDI2NywiaWF0IjoxNjg1NTEwMjY3fQ.5zJTqiHvH3B0rRBfkV9_BQH6atdJX6qg5V3P99I7T8M',
          'Content-type': 'application/json',
        },
      });
      console.log(response.data.product);

      const productData = response.data.product;
      setProductData(productData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SLayout>
      <SProductListTitle>판매 중인 상품</SProductListTitle>
      {/* TODO: 갯수만큼 map으로 뿌려주기 */}
      <SProductList>
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </SProductList>
    </SLayout>
  );
}

const SLayout = styled.div`
  box-shadow: inset 0px 0px 10px red;
  padding-left: 16px;
`;

const SProductList = styled.div`
  display: flex;
  gap: 10px;
  overflow: hidden;
  box-shadow: inset 0px 0px 10px red;
`;

const SProductListTitle = styled.h2`
  margin-bottom: 16px;
  color: var(--white);
  font-size: 16px;
  font-weight: 700;
`;
