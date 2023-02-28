import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../services/reducers';
import { socketMiddleware } from '../services/middleware/socketMiddleware';
import { urlWsFeed, urlWsOrders } from './constants';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  USER_WS_CONNECTION_CLOSED,
  USER_WS_CONNECTION_ERROR,
  USER_WS_CONNECTION_START,
  USER_WS_CONNECTION_SUCCESS,
  USER_WS_GET_MESSAGE
} from '../services/actions/ws';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const userWsActions = {
  wsInit: USER_WS_CONNECTION_START,
  onOpen: USER_WS_CONNECTION_SUCCESS,
  onClose: USER_WS_CONNECTION_CLOSED,
  onError: USER_WS_CONNECTION_ERROR,
  onMessage: USER_WS_GET_MESSAGE,
};

const composeEnhancers =
typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(urlWsFeed, wsActions)),
  applyMiddleware(socketMiddleware(urlWsOrders, userWsActions)));

export const store = createStore(rootReducer, enhancer);
