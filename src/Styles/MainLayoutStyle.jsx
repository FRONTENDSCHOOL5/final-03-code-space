import styled from 'styled-components';
import astronaut from 'assets/img/astronaut.svg';
function setScreenSize() {
  let vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();

const SMainLayout = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 390px;
  background-color: var(--black);
  min-height: 100vh;

  box-shadow: rgba(0, 0, 0, 0.8) 0 0 50px;
  z-index: 1;
`;
const SAstronaut = styled.img.attrs({
  src: astronaut,
  alt: 'astronaut',
})`
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-120%, -115%);

  z-index: 0;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translate(-80%, -125%);
  }
`;
const Sbackground = styled.div`
  background-color: var(--black);
  min-height: 100vh;
  z-index: -2;
`;

export { SMainLayout, Sbackground, SAstronaut };
