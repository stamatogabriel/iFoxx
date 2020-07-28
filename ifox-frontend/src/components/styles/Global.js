import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: #fff;
    font-family: 'Roboto', sans-serif;
    color: #333;
  }

  html {
    height: 100vh;
  }

  /* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #FFA459;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #EB2D00;
}
`

export default GlobalStyle