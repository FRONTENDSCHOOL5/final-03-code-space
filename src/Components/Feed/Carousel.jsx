import React, { useState } from 'react';
import styled from 'styled-components';

const Carousel = ({ imgArr }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : imgArr.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex < imgArr.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <CarouselContainer>
      <CarouselImageContainer>
        <CarouselImage src={imgArr[currentIndex]} alt="feed" />
      </CarouselImageContainer>

      {imgArr.length > 1 && (
        <>
          <CarouselButton onClick={goToPrevious}>&lt;</CarouselButton>
          <CarouselButton onClick={goToNext}>&gt;</CarouselButton>
        </>
      )}

      <IndicatorsContainer>
        {imgArr.map((_, index) => (
          <Indicator key={index} active={index === currentIndex} />
        ))}
      </IndicatorsContainer>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselImageContainer = styled.div`
  max-width: 390px;
  height: 200px;
`;

const CarouselImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 20px;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 32px;
  font-weight: bold;
  color: var(--point-color);
  cursor: pointer;
  z-index: 1;

  &:hover {
    scale: 1.1;
  }

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }
`;

const IndicatorsContainer = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Indicator = styled.li`
  width: 10px;
  height: 10px;
  background-color: ${props => (props.active ? 'var(--point-color)' : 'var(--lightgray)')};
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
`;

export default Carousel;
