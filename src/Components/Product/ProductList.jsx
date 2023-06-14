import React from 'react';
import { styled } from 'styled-components';
import ProductCard from './ProductCard';

export default function ProductList() {
  // 상품 요청 (토큰 필요)

  // 상품이 있을 때
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

  // 상품이 없을 때
}

const SLayout = styled.div`
  padding: 20px;
  background-color: var(--black);
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
