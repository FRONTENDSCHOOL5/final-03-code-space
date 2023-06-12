import 'normalize.css';

const { createGlobalStyle } = require('styled-components');
const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

:root{
    
    --point-color: #2BAE66;
    --black: #1E1E1E;
    --white: #F8F8F8;

    --lightgray:#cacaca;
    --gray:#adadad;
    --darkgray:#6f6f6f;

    --title-font : 'NEXON Lv1 Gothic OTF';
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
}

li{
    list-style: none;
 }

 button{
    background:none;
    border: none;
 }

 a{
    text-decoration: none;
}

p{
    margin:0;
}

img{
    margin:0;
}

`;
export default GlobalStyle;
