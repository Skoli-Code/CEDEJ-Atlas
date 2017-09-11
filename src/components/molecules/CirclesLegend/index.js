import React from 'react'; 
import styled from 'styled-components';
import Markdown from 'react-markdown';
import Tooltip from 'react-tooltip';
import {
  LegendCategoryName, 
  Reduced,
  Td,
  Th,
  TrName,
  TrNameContent,
  CirclesRangeSymbol,
} from 'components';

import { visibleTypes } from 'utils'; 

import * as circlesUtils from 'utils/circles';

const CircleTypeSymbol = styled.span`
  background-color: ${({ circle })=>circlesUtils.colorByValue(circle)};
  width: 10px;
  height: 10px;
  border: 1px solid black;
  border-radius: 100%;
  display: inline-block;
`;

const CircleTooltipContent = styled.div`
  font-weight: normal;
  max-width: 400px;
`;


const CircleTypeRow = ({ circle })=> {
  return (
    <tr>
      <td colSpan={2} >
        <span data-tip data-for={`tooltip-circle-${circle}`}>
          <CircleTypeSymbol circle={ circle } />&nbsp;
          <Reduced>
            { circlesUtils.droughtRegime(circle) }
          </Reduced>
        </span>
      </td>
    </tr>
  );
};

const NormalWeight = styled.span`font-weight: normal`;

const CirclesLegend = ({ filters })=>{
  const types = filters.circles.types;
  const hasTypes = (types, ctrl)=>{
    for(let i = 0; i < types.length; i+=1){
      if(Object.keys(ctrl).indexOf(types[i]) < 0){
        return false;
      }
    }
    return true;
  };
  if(!visibleTypes(types).length){ return null; }

  return (
    <tbody>
      <tr>
        <TrName style={{paddingTop: '5px'}}>
          <TrNameContent>Sécheresse</TrNameContent>
        </TrName>
      </tr>
      <tr>
        <Th align={'left'} style={{marginTop:'-5px'}}>
          <LegendCategoryName>
            <span data-tip data-for="tooltip-nb-months">Nombre de mois secs</span>
          </LegendCategoryName>
        </Th>
        <Td>
          <CirclesRangeSymbol width={40} height={40} /> 
        </Td>
      </tr>
      <tr>
        <Th colSpan={2} align={'left'} style={{marginTop:'-5px'}}>
          <LegendCategoryName>
            <span data-tip data-for="tooltip-regime">
              Périodes des sécheresses
            </span>
          </LegendCategoryName>
        </Th>
      </tr>
      { hasTypes(['A', 'B'], types) && (
        <tr><Th colSpan={3} align={ 'left' }>
          <LegendCategoryName>
            <Reduced>Sécheresse d'été dominante</Reduced>
          </LegendCategoryName>
        </Th></tr>
      )}
      {
        types['A'] && (
          <CircleTypeRow circle={ 'A' } />
        )
      }
      {
        types['B'] && (
          <CircleTypeRow circle={ 'B' } />
        )
      }

      { hasTypes(['C', 'D'], types) && (
        <tr><Th colSpan={3} align={'left'}>
          <LegendCategoryName>
            <Reduced>Sécheresse d'hiver dominante</Reduced>
          </LegendCategoryName>
        </Th></tr>
      )}
      {
        types['C'].visible && (
          <CircleTypeRow circle={ 'C' } />
        )
      }
      {
        types['D'].visible && (
          <CircleTypeRow circle={ 'D' } />
        )
      }
      { hasTypes(['E', 'F'], types) && (
        <tr><Th align={ 'left' }>
          <LegendCategoryName>
            <Reduced>Régimes de transition</Reduced>
          </LegendCategoryName>
        </Th></tr>
      )}
      {
        types['E'].visible && (
          <CircleTypeRow circle={ 'E' } />
        )
      }
      {
        types['F'].visible && (
          <CircleTypeRow circle={ 'F' } />
        )
      }
    </tbody>
  );
};

export default CirclesLegend;
