import { compose, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from '../services/reducers';
import { socketMiddleware } from '../services/middleware/socketMiddleware.js';
import { UrlWS } from './constants';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../services/constants/ws';

import {
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
} from '../services/constants/wsUser';

interface IWs {
  wsInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
}

interface IWsUser {
  wsInitUser: typeof WS_USER_CONNECTION_START;
  onOpen: typeof WS_USER_CONNECTION_SUCCESS;
  onClose: typeof WS_USER_CONNECTION_CLOSED;
  onError: typeof WS_USER_CONNECTION_ERROR;
  onMessage: typeof WS_USER_GET_MESSAGE;
}

const wsActions: IWs = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const userWsActions: IWsUser = {
  wsInitUser: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE,
};

const enhancer = composeWithDevTools(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(UrlWS.All, wsActions)),
  applyMiddleware(socketMiddleware(UrlWS.User, userWsActions))
);

export const store = createStore(rootReducer, enhancer);
