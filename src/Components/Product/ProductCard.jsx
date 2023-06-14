import React from 'react';
import styled from 'styled-components';

export default function ProductCard() {
  return (
    <SProductCard>
      <SImage src="http://placeimg.com/640/480/100" alt="" />
      <STitle>타이틀</STitle>
      <SPrice>{}원</SPrice>
    </SProductCard>
  );
}

const SProductCard = styled.div`
  box-shadow: inset 0px 0px 10px red;
  width: 140px;
`;

const SImage = styled.img`
  width: inherit;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
`;

const STitle = styled.p`
  margin: 6px 0 4px;
  font-size: 14px;
  color: var(--white);
`;

const SPrice = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: var(--point-color);
`;
