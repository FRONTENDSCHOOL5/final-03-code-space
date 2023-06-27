import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
const BackToTopBtn = ({ handleScrollTop }) => {
  return (
    <SButton onClick={() => handleScrollTop()}>
      <FontAwesomeIcon icon={faUpLong} size="xs" style={{ color: '#2bae66' }} />
    </SButton>
  );
};

export default BackToTopBtn;

const SButton = styled.button`
  overflow: hidden;
  border: none;
  color: var(--point-color);
  background: none;
  position: relative;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  width: 50px;
  height: 50px;
  margin-left: auto;
  margin-right: 20px;
  padding-top: 20px;

  & svg {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.5s ease-out;
    transform: rotate(50deg);
  }

  &:hover svg {
    transform: rotate(720deg);
  }
`;
