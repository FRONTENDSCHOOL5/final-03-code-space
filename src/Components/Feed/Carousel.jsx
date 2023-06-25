import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import delImg from '../../assets/icons/delete1.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

const Carousel = ({ imgArr }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(false);
  const [imgView, setImgView] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // Enable transition after the initial render
    setTransition(true);
  }, []);
  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : imgArr.length - 1));
    setTransition(true);
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex < imgArr.length - 1 ? prevIndex + 1 : 0));
    setTransition(true);
  };

  const handleTransitionEnd = () => {
    setTransition(false);
  };

  const handleOnImgView = () => {
    setImgView(true);
    console.log('이미지 열림');
  };

  const handleCloseImgView = () => {
    setImgView(false);
  };

  const handleClickOutside = event => {
    const target = event.target;
    console.log('in');

    if (modalRef.current && !modalRef.current.contains(target)) {
      console.log('in');
      handleCloseImgView();
    }
  };

  const ImgModal = ({ isOpen, src }) => {
    if (!isOpen) return null;

    return (
      <StyledModal onClick={handleClickOutside}>
        <SImgWrap ref={modalRef}>
          <SDelBtn onClick={handleCloseImgView} />
          <SSingleModal src={src} />
          {imgArr.length > 1 && (
            <>
              <CarouselButton onClick={goToPrevious} disabled={currentIndex === 0}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </CarouselButton>
              <CarouselButton onClick={goToNext} disabled={currentIndex === imgArr.length - 1}>
                <FontAwesomeIcon icon={faChevronRight} />
              </CarouselButton>
            </>
          )}
        </SImgWrap>
      </StyledModal>
    );
  };

  return (
    <div>
      <CarouselContainer>
        <CarouselImageContainer>
          <CarouselImageWrapper currentIndex={currentIndex}>
            {imgArr.map((img, index) => (
              <CarouselImage
                key={index}
                src={img.url}
                alt="feed"
                currentIndex={currentIndex}
                transition={transition}
                onTransitionEnd={handleTransitionEnd}
                onClick={handleOnImgView}
              />
            ))}
          </CarouselImageWrapper>
        </CarouselImageContainer>

        {imgArr.length > 1 && (
          <>
            <CarouselButton onClick={goToPrevious} disabled={currentIndex === 0}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </CarouselButton>
            <CarouselButton onClick={goToNext} disabled={currentIndex === imgArr.length - 1}>
              <FontAwesomeIcon icon={faChevronRight} />
            </CarouselButton>
          </>
        )}

        <IndicatorsContainer>
          {imgArr.map((_, index) => (
            <Indicator key={index} active={index === currentIndex} />
          ))}
        </IndicatorsContainer>
      </CarouselContainer>
      <ImgModal isOpen={imgView} key={currentIndex} src={imgArr[currentIndex].url} />
    </div>
  );
};

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselImageContainer = styled.div`
  max-width: 390px;
  height: 200px;
  overflow: hidden;
  perspective: 1000px; /* 3D 효과를 위한 perspective 설정 */
`;

const CarouselImageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease; /* 슬라이드 애니메이션 설정 */
  transform-style: preserve-3d; /* 3D 변환 유지 */
  transform: translate3d(${({ currentIndex }) => -currentIndex * 100}%, 0, 0); /* X축으로 이동 */
`;
const CarouselImage = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
`;
const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 32px;
  font-weight: bold;
  transition: all 1s;
  z-index: 1;
  color: ${({ disabled }) => (disabled ? 'var(--darkgray)' : 'var(--point-color)')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};

  z-index: 1;

  &:not(:disabled):hover {
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
`;

const Indicator = styled.li`
  width: 10px;
  height: 10px;
  background-color: ${props => (props.active ? 'var(--point-color)' : 'var(--lightgray)')};
  border-radius: 50%;
  margin: -15px 5px;
  cursor: pointer;
  z-index: 5;
`;

const StyledModal = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: hidden;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
`;

const SImgWrap = styled.div`
  width: 390px;
  background-color: var(--black);
  background-size: auto;
  position: fixed;
`;

const SSingleModal = styled.img`
  width: 100%;
`;

const SDelBtn = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  background-image: url(${delImg});
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export default Carousel;
