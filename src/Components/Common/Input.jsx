import React from 'react';
import styled from 'styled-components';

export default function Input(props) {
  const label = props.label;
  const LabelHtmlFor = props.LabelHtmlFor;
  return (
    <SInputForm>
      <label htmlFor={LabelHtmlFor}>{label}</label>
      <SInputStyle {...props} />
    </SInputForm>
  );
}

const SInputForm = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--lightgray);
  margin: 16px 34px;
  font-size: 12px;
  label {
    color: var(--lightgray);
  }
`;

const SInputStyle = styled.input`
  background-color: var(--black);
  border: none;
  outline: none;
  border-bottom: 1px solid var(--gray);
  padding: 5px 0;
  color: var(--white);
  font-size: 14px;
  &:focus {
    transition: all 0.5s;
    border-bottom: 1px solid var(--point-color);
  }
  &::placeholder {
    color: var(--gray);
  }
`;
