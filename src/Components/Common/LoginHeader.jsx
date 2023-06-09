import React from 'react';
import styled from 'styled-components';

export default function LoginHeader({ HeadTitle, HeadTxt }) {
  return (
    <>
      <SHeader>
        <strong className="HeadTitle">{HeadTitle}</strong>
        {HeadTxt && <p className="HeadTxt">{HeadTxt} </p>}
      </SHeader>
    </>
  );
}

const SHeader = styled.header`
  background-color: #1e1e1e;
  max-width: 390px;
  margin: 0 auto;
  padding-top: 40px;
  text-align: center;

  .HeadTitle {
    color: #f8f8f8;
    font-size: 24px;
    font-family: var(--title-font);
  }

  .HeadTxt {
    color: #cacaca;
    font-size: 14px;
    margin-top:-10px;
    margin-bottom:50px;
  }
`;
