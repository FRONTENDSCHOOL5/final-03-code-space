import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { setToken } from '../../Atom/atom';
import axios from 'axios';
import styled from 'styled-components';
import ProductCard from './ProductCard';

export default function ProductList({ profile }) {
  const [productData, setProductData] = useState([]);
  const token = useRecoilValue(setToken);
  console.log(profile.accountname);

  const URL = 'https://api.mandarin.weniv.co.kr';
  const reqPath = `/product/${profile.accountname}`;
  // const reqPath = `/product/pig1`;
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
      console.log(response.data);
      console.log(response.data.product);

      // const productData = ;
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
          {productData.map(product => {
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
  box-shadow: inset 0px 0px 10px red;
  padding: 21px 0 20px 16px;
`;

const SProductList = styled.div`
  display: flex;
  gap: 10px;
  /* overflow: hidden; */
  flex-wrap: nowrap;
  overflow-x: auto;
  box-shadow: inset 0px 0px 10px red;

  div {
    flex-shrink: 0;
  }
`;

const SProductListTitle = styled.h2`
  margin-bottom: 16px;
  color: var(--white);
  font-size: 16px;
  font-weight: 700;
`;
