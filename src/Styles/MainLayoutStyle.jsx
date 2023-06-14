import React from 'react';
import styled from 'styled-components';

export default function MainLayout() {
  return (
    <>
      <SMainLayout />
    </>
  );
}

const SMainLayout = styled.div`
  margin: 0 auto;
  max-width: 390px;
  background-color: var(--black);
  height: 100vh;
`;
