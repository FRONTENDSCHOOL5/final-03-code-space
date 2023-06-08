import React from 'react';
import styled from 'styled-components';

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

  /* height: ${props => props.height || '100%'}; */

  background-color: ${props => props.bgColor || 'var(--point-color)'};
  color: ${props => props.color || 'var(--white)'};
  font-size: ${props => props.fontSize || '14px'};
  font-weight: ${props => props.fontSize || '500'};
  padding: 12px 0;
  border-radius: ${props => props.borderRadius || '44px'};
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    background-color: var(--darkgray);
  }
`;
