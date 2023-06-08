import React from 'react';
import styled from 'styled-components';
import MainHeader from './MainHeader';

export default function LoginHeader({ HeadTitle, HeadTxt }) {
  return (
    <>
      <StyledHeader>
        <strong className="HeadTitle">{HeadTitle}</strong>
        {HeadTxt && <StyleSubTxt className="HeadTxt">{HeadTxt}</StyleSubTxt>}
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
  background-color: #1e1e1e;
  max-width: 390px;
  margin: 0 auto;
  padding: 15px 0;
  text-align: center;

  .HeadTitle {
    color: #f8f8f8;
    font-size: 24px;
    font-family: var(--title-font);
  }
`;

const StyleSubTxt = styled.p`
  color: #cacaca;
  font-size: 14px;
`;
