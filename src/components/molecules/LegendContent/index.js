import React from 'react';
import { translate } from 'react-i18next';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  TemperaturesLegend,
  CirclesLegend,
  LegendMoreInfos,
} from 'components';
import { visibleTypes } from 'utils';

const Table = styled.table``;

const Holder = styled.div`
  padding-top: ${({ print }) => print ? 0 : 30}px;
  overflow: auto;
`;

const LegendContent = ({ filters, layers, circleSizes, print, t}) => {
  const {
    aridity: { visible: showAridity },
    temperatures: { visible: showTemperatures },
    circles: { visible: showCircles },
  } = layers;
  const allTypes = {
    ...filters.circles.types,
    ...filters.temperatures,
    ...filters.aridity,
  };
  const noFilters = visibleTypes(allTypes).length === 0;
  const noData = (
    (!showTemperatures) && (!showCircles) && (!showAridity)
  ) || (noFilters);
  return (
    <Holder print={print}>
      <Table>
        <TemperaturesLegend
          print={print}
          filters={filters}
          layers={layers}
        />
        { showCircles && (
          <CirclesLegend
            t={t}
            print={print}
            filters={filters}
            circleSizes={circleSizes}
          />
        ) }
        { noData && (
          <tbody><tr><th>{ t('legend.noData') }</th></tr></tbody>
        )}
      </Table>
      { !print && (
        <LegendMoreInfos />
      )}
    </Holder>
  );
};
LegendContent.propTypes = {
  filters: PropTypes.object,
  layers: PropTypes.object,
  circleSizes: PropTypes.object,
  print: PropTypes.bool,
};
LegendContent.defaultProps = {
  print: false,
};

export default translate('atlas')(LegendContent);
