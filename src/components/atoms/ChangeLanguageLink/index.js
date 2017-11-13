import React from 'react';
import { translate } from 'react-i18next';
import styled from 'styled-components';

import { Link } from 'components';
import i18n from 'i18n';


const Holder = styled.div``;
const ChangeLanguageLink = ({ t })=>{
  const curLng = i18n.language;
  const defaultLng = i18n.options.fallbackLng;
  const lngList = i18n.options.whitelist;
  const path = window.location.pathname;
  const { protocol, host } = window.location;
  const links = lngList
    .filter((lng) => [curLng, 'cimode'].indexOf(lng) < 0)
    .map(lng => {
      let to = path.replace(curLng, lng);
      if(lng === defaultLng[0]){
        to = path.replace(`${curLng}/`, '');
      }
      if(curLng == defaultLng[0]){
        to = `/${lng}${path}`;
      }
      to = `${protocol}//${host}${to}`;
      return (
        <a
          target=""
          key={lng}
          style={{color: 'white', textDecoration: 'none'}}
          href={to}
          title={t(`seeThisSiteIn_${lng}`)}>
          {lng}
        </a>
      );
    });
  return (
    <Holder>
      { links }
    </Holder>
  );
}

export default translate('navbar')(ChangeLanguageLink);