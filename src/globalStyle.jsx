const { createGlobalStyle } = require('styled-components');
const { default: reset } = require('styled-reset');
function setScreenSize() {
  let vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
const GlobalStyle = createGlobalStyle`
 ${reset}


@font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'YESGothic-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/YESGothic-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

:root{
    // color
    --point-color: #2bae66;
    --secondary-color: #b1e0C6;

    --black: #16171e; 
    --white: #f0f0f0;

    --lightgray:#cacaca;
    --gray:#aaaaaa;
    --darkgray:#787878;
 
    --nav-icon-color: #adadad;
    --border-gray:#6f6f6f;
    --modal-gray:#f8f8f8;

    // font
    --title-font : 'NEXON Lv1 Gothic OTF';
    --default-font : 'YESGothic-Regular';
 }

 * {
    box-sizing: border-box;
 }

 .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

ul{
    margin:0;
    padding:0;
}

a{
    text-decoration: none;
    color: inherit;
}

li{
    list-style: none;
 }

 button{
    background:none;
    border: none;
 }

p{
    margin:0;
}

img{
    margin:0;
}

/* html{
  min-height: 100vh;
}
body{
  min-height: calc(var(--vh, 1vh) * 100);


} */

`;
export default GlobalStyle;