import styled from 'styled-components';

// 태그버튼 컴포넌트
const TagButton = ({ text, active, onClick }) => {
  return (
    <STagButton onClick={onClick} className={active ? 'active' : ''}>
      {text}
    </STagButton>
  );
};

export default TagButton;
const STagButton = styled.div`
  border-radius: 44px;
  border: 1px solid var(--darkgray);
  padding: 5px 8px;
  font-size: 12px;
  color: var(--lightgray);
  cursor: pointer;
  &.active {
    color: var(--white);
    background-color: var(--point-color);
    border: 1px solid var(--point-color);
  }
  &:hover {
    scale: 1.05;
  }
`;
