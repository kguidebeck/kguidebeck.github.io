import { createGlobalStyle } from 'styled-components';
import { rem } from 'polished';
// import screen from 'superior-mq';
// import { bp } from './helpers';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after { box-sizing: border-box; }

  body {
    position: relative;
    background: ${props => props.theme.lightSand};
    margin: 0;
    font-family: ${props => props.theme.sansSerif};
    font-size: ${rem(16)};
    font-weight: 400;
    color: ${props => props.theme.black};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: 700;
    font-family: inherit;
    color: ${props => props.theme.teal};
    text-transform: uppercase;
  }

  h1,
  h2 {
    font-family: ${props => props.theme.yanone};
    font-size: ${rem(24)};
    line-height: 1.2;
  }

  h3 {
    font-size: ${rem(14)};
    font-family: ${props => props.theme.sansSerif};
  }

  img,
  video { max-width: 100%; }

  a {
    color: inherit;
    transition: color .3s ease;
  }

  a,
  button { cursor: pointer; }

  figure { margin: 0; }


`;

export default GlobalStyle;
