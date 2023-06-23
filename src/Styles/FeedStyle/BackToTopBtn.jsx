import React from 'react';
import styled from 'styled-components';
const BackToTopBtn = ({ handleScrollTop }) => {
  return (
    <SButton onClick={() => handleScrollTop()}>
      <div className="text">
        <span>TOP</span>
      </div>
      <div className="clone">
        <span>TOP</span>
      </div>
      <svg
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </SButton>
  );
};

export default BackToTopBtn;
const SButton = styled.button`
  width: 70px;
  overflow: hidden;
  border: none;
  color: var(--point-color);
  background: none;
  position: relative;
  padding-bottom: 2em;

  div,
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
  }

  &:before {
    content: '';
    height: 2px;
    left: 0;
    width: 100%;
    transform: scaleX(0);
    transform-origin: bottom right;
    background: currentColor;
    transition: transform 0.25s ease-out;
  }

  &:hover:before {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  & .clone > *,
  & .text > * {
    opacity: 1;
    font-size: 1.3rem;
    transition: 0.2s;
    margin-left: 4px;
  }

  & .clone > * {
    transform: translateY(60px);
  }

  &:hover .clone > * {
    opacity: 1;
    transform: translateY(0px);
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
  }

  &:hover .text > * {
    opacity: 1;
    transform: translateY(-60px);
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
  }

  &:hover .clone > :nth-child(1) {
    transition-delay: 0.15s;
  }

  &:hover .clone > :nth-child(2) {
    transition-delay: 0.2s;
  }

  &:hover .clone > :nth-child(3) {
    transition-delay: 0.25s;
  }

  &:hover .clone > :nth-child(4) {
    transition-delay: 0.3s;
  }
  /* icon style and hover */
  & svg {
    width: 20px;
    right: 1px;
    top: 50%;
    transform: translateY(-50%) rotate(-50deg);
    transition: 0.2s ease-out;
  }

  &:hover svg {
    transform: translateY(-50%) rotate(-90deg);
  }
`;
