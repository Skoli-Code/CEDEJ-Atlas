import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'; 
import { font, palette } from 'styled-theme';
import {
  Content as GenericContent,
  MarkdownContent,
  Button as _Button,
  LoadingIcon,
  PartnersLogo,
  Markdown,
  Heading,
} from 'components';
import { fromAtlas } from 'store/selectors'; 

import Background from './background.png';

const HomeTitleDescription = `Un portail élaboré par le [CEDEJ](http://cedej-eg.org/), une unité mixte française de recherche à l’étranger du [CNRS](http://www.cnrs.fr/) et du [Ministère de l'Europe et des Affaires étrangères](http://www.diplomatie.gouv.fr/fr/)`;


const HomeActionText = `**Créer votre carte personnalisée des zones arides et [contribuer à l’actualisation de la base de données](/page/contribute) sur l’aridité**`;

const Centered = styled.div`
  text-align: center;
  & p {
    text-align: center !important;
  }
`;
const Button = styled(_Button)`
  height: auto;
  min-height: 2.5em;
  color: white !important;
  &:hover {
    text-decoration: none !important;
  }
`;

const AtlasBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('${Background}');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 5;
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    background: rgba(255,255,255,0.8);
  }
`;

const LoadingHolder = styled.span`
  padding: 0.5rem 0;
  display: block;
`;

const Holder = styled.div`
  font-family: ${font('primary')};
  position: absolute;
  max-width: 60%;
  margin: auto;
  left: 0;
  right: 0;
  top: 4em;
  bottom: 4em;
  z-index: 10;
  @media (max-width: 1200px){
    max-width: 80%;
  }

`;

const Top = styled.div`
  top: 0;
  left: 0;
  right:0;

`;
const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right:0;
`;
const BottomBar = styled.div`
  height: 200px;
  bottom: 0;
  position: absolute;
  left:0;
  right: 0;
  max-with: 500px;
  margin: auto;
`;
const Left = styled.div`
  position: absolute;
  left: 0;
`;

const Center = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`;

const TitleHolder = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
`;
const MainTitle = styled(Heading)`
  display: block;
  padding-right: 1em;
  width: 200px;
  font-size: 4em;
  line-height: 1em;
  margin: 0 !important;
  border-right: 2px solid ${palette('grayscale', 2)};
`;

const MainDescription = styled(Markdown)`
  width: 300px;
  font-size: 1.33em;
  padding-left: 1em;
`;

const Content = styled(GenericContent)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Middle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const HomeTitle = styled(()=>(
  <TitleHolder>
    <MainTitle level={1}>Aridity World Map</MainTitle>
    <MainDescription source={HomeTitleDescription}/>
  </TitleHolder>
))``;

const HomePage = ({isLoading}) => {
  return (
    <div>
      <AtlasBackground />
      <Holder>
        <Content>
          <Top>
            <Left>
              <HomeTitle/>
            </Left>
          </Top>
          <Middle>
            <Centered>
              <Markdown source={HomeActionText}/>
              <Button to='/map'>
                { isLoading && (
                  <LoadingHolder>
                    <LoadingIcon reverse={true}/>Chargement de la carte
                  </LoadingHolder>
                )}
                { !isLoading && (
                  <span>Démarrer</span>
                )}
              </Button>
            </Centered>
            </Middle>

            <Bottom style={{height:'6.66em'}}><Left>© CEDEJ - 2017</Left></Bottom>
            <BottomBar>
              <Center style={{maxWidth:'500px', margin:'auto'}}>
                <PartnersLogo height={'200px'} horizontal={true}/>
              </Center>
            </BottomBar>
        </Content>
      </Holder>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: fromAtlas.isRendering(state)
});

export default connect(mapStateToProps)(HomePage);
