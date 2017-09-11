import React from 'react';
import { Route } from 'react-router-dom';

import {
  injectGlobal,
  ThemeProvider
} from 'styled-components';
import styled from 'styled-components'; 
import {
  HomePage,
  ContentPage,
  PageTemplate,
  FixedPartnersLogo,
  SmallScreensWarning,
} from 'components';
import { Atlas } from 'containers';
// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';

injectGlobal`
  body {
    margin: 0;
  }
  html, body, div, *{
    box-sizing: border-box;
  }
  a {
    cursor: pointer;
  }
  *[data-tip] {
    cursor: help;
    position: relative;
    &:after {
      content: ' ';
      position: absolute;
      bottom: -2px;
      left: 2px;
      right: 2px;
      border-bottom: 1px dashed #BBB;

    }
  }
  span[data-tip]:after {
    left: 0;
    right:0;
  }

  h6 {
    font-size: 0.85rem !important;
  }
`;

const AtlasHolder = styled.div`
  z-index: 10;
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const OverlayHolder = styled.div`
  background: rgb(255,255,255);
  top: 0px;
  bottom: 0px;
  transition: transform .2s ease;
  transform: translate(0, ${({visible})=>visible?0:3000}px);
  position: absolute;
  width: 100%;
  z-index: 20;
  overflow: auto;
  padding-bottom: 50px;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <PageTemplate>
        <SmallScreensWarning/>
        <AtlasHolder>
          <Atlas/>
        </AtlasHolder>
        <Route path="/" exact children={({match})=>{
          return (
            <OverlayHolder visible={ match!=null }>
              <HomePage/>
            </OverlayHolder>
          );
        }}/>
        <Route path="/page" children={({match})=>(
          <div>
            <OverlayHolder visible={ match!=null }>
              { match && (
                <ContentPage/>
              )} 
            </OverlayHolder>
            <FixedPartnersLogo visible={ match!=null}/>
          </div>
        )}/>
      </PageTemplate>
    </ThemeProvider>
  );
};

export default App;
