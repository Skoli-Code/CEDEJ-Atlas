import 'babel-polyfill';

import React from 'react';

import { I18nextProvider, translate } from 'react-i18next';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Switch, Redirect } from 'react-router-dom';

import { basename } from 'config';
import configureStore from 'store/configure';
import api from 'services/api';
import App from 'components/App';

import i18n from './i18n';

const store = configureStore({}, { api: api.create() });

const renderApp = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <Switch>
          <Route strict path="/:locale(en|fr)/" component={App} />
          <Route strict path="/" component={App} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </I18nextProvider>
);

const root = document.getElementById('app');
render(renderApp(), root);
