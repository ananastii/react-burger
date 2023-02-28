import { getCookie } from '../../utils/cookies';

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {

      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const accessToken = getCookie("accessToken");

      if (type === wsInit) {
        socket = accessToken ?
          new WebSocket(`${wsUrl}?token=${accessToken}`) :
          new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
          console.log(`Ошибка ${event.message}`);
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
          if (event.wasClean){
            console.log(`Соединение закрыто корректно c кодом ${event.code}`);
            console.log(`Причина закрытия - ${event.reason}`)
          } else {
            console.log(`Соединение закрыто некорректно с кодом -  ${event.code}`);
          };
        };

        if (type === onClose && socket.readyState === 1) {
          socket.close(1000, "закрыта страница");
        }
      }

      next(action);
    };
  };
};
