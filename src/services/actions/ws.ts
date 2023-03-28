import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../constants/ws';
import { TWsMessage } from '../types/data';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TWsMessage;
}

export type TWsActions =
| IWsConnectionStart
| IWsConnectionSuccess
| IWsConnectionError
| IWsConnectionClose
| IWsGetMessage;

export const wsConnect = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START
})

export const wsClose = (): IWsConnectionClose => ({
  type: WS_CONNECTION_CLOSED
})
