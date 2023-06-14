import React, { useState } from 'react';
import styled from 'styled-components';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = item => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={toggleDropdown}>
        {selectedItem ? selectedItem : '▼ 카테고리'}
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        <DropdownItem onClick={() => handleItemClick('질문')}>질문</DropdownItem>
        <DropdownItem onClick={() => handleItemClick('스터디모집')}>스터디모집</DropdownItem>
        <DropdownItem onClick={() => handleItemClick('정보공유')}>정보공유</DropdownItem>
      </DropdownContent>
    </DropdownWrapper>
  );
};

export default Dropdown;

// 드롭다운 컴포넌트 스타일
const DropdownWrapper = styled.div`
  margin: 15px;
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  min-width: 74px;
  padding: 5px 0;
  background-color: var(--black);
  color: var(--gray);
  font-size: 14px;
  border-bottom: 1px solid var(--gray);
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  color: var(--gray);
  background-color: var(--black);
  min-width: 74px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 10px;

  &:hover {
    background-color: var(--gray);
    color: var(--black);
  }
`;