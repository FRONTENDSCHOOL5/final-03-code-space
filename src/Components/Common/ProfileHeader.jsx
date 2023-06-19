import React from 'react';
import styled from 'styled-components';

export default function ProfileHeader({ HeadTitle, HeadTxt }) {
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
  background-color: var(--black);
  max-width: 390px;
  margin: 0 auto;
  padding-top: 40px;
  text-align: center;

  .HeadTitle {
    display:block;
    color:var( --white);
    font-size: 24px;
    font-family: var(--title-font);
    margin-bottom:20px;
  }

  .HeadTxt {
    color:var( --darkgray);
    font-size: 14px;
    margin-bottom:30px;
  }
`;
