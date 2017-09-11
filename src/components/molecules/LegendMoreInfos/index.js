import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Markdown from 'react-markdown';

import { Link, Modal, MarkdownContent } from 'components'
import { showMoreInfos, hideMoreInfos } from 'store/actions';
import { fromLegend } from 'store/selectors';

const Holder = styled.div`
  margin-top: 1em;
`;
const MoreInfoTitle = ()=><span>À propos de la légende</span>

const LegendMoreInfos = ({opened, show, hide}) => (
  <Holder>
    <Link onClick={ show }>Plus d'infos sur la légende</Link>
    <Modal isOpen={ opened } title={<MoreInfoTitle/>} onClose={hide} closeable={true}>
      <Markdown source={ MarkdownContent.LegendInfos }/>
    </Modal>

  </Holder>
);

const mapStateToProps = state => ({
  opened: fromLegend.moreInfosVisible(state),
});

const mapDispatchToProps = dispatch => ({
  show: () => dispatch(showMoreInfos()),
  hide: () => dispatch(hideMoreInfos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LegendMoreInfos);
