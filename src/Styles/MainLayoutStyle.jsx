import styled from 'styled-components';
function setScreenSize() {
  let vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();

const SMainLayout = styled.div`
  margin: 0 auto;
  max-width: 390px;
  background-color: var(--black);
  min-height: 100vh;
  /* min-height: calc(var(--vh, 1vh) * 100); */

  box-shadow: rgba(0, 0, 0, 0.8) 0 0 50px;
`;

const Sbackground = styled.div`
  background-color: var(--black);
  min-height: 100vh;
`;

export { SMainLayout, Sbackground };
