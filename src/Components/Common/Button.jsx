import React from 'react';
import styled, { css } from 'styled-components';

export default function Button(props) {
  const { type } = props;
  return (
    <SButton type={type ? type : 'button'} {...props}>
      {props.children}
    </SButton>
  );
}

const SButton = styled.button`
  width: ${props => props.width || '100%'};
  font-family: var(--default-font);
  /* height: ${props => props.height || '100%'}; */
  background: ${props => props.bg || ''};
  background-color: ${props => props.bgColor || 'var(--point-color)'};
  color: ${props => props.color || 'var(--white)'};
  font-size: ${props => props.fontSize || '14px'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '12px 0'};
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.borderRadius || '44px'};
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background-color: var(--secondary-color);
  }

  ${props => props.subscribed && transparentStyle}
  ${props => props.myProfileBtn && transparentStyle}
  ${props => props.followBtn && transparentStyle}
  ${props => props.isFollowing && followStyle}
  ${props => props.mainHeader && headerBtnStyle}
`;

const transparentStyle = css`
  background-color: transparent;
  color: var(--lightgray);
  box-shadow: 0px 0px 0px 1px var(--border-gray);

  &:hover {
    transition: all 0.2.5s ease-in-out;
    color: var(--white);
    background-color: var(--point-color);
    box-shadow: none;
  }
`;

const followStyle = css`
  background-color: var(--point-color);
  color: var(--white);
  box-shadow: none;
`;

const headerBtnStyle = css`
  background-color: var(--secondary-color);
  &:hover {
    background-color: var(--point-color);
  }
`;
