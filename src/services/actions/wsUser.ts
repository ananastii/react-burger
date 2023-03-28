import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
} from '../constants/wsUser';
import { TWsMessage } from '../types/data';

export interface IWsUserConnectionStart {
  readonly type: typeof WS_USER_CONNECTION_START;
}

export interface IWsUserConnectionSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}

export interface IWsUserConnectionError {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
}

export interface IWsUserConnectionClose {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}

export interface IWsUserGetMessage {
  readonly type: typeof WS_USER_GET_MESSAGE;
  payload: TWsMessage;
}

export type TWsUserActions =
| IWsUserConnectionStart
| IWsUserConnectionSuccess
| IWsUserConnectionError
| IWsUserConnectionClose
| IWsUserGetMessage;

export const wsUserConnect = (): IWsUserConnectionStart => ({
  type: WS_USER_CONNECTION_START
})

export const wsUserClose = (): IWsUserConnectionClose => ({
  type: WS_USER_CONNECTION_CLOSED
})
