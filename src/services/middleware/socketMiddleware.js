import { getCookie } from '../../utils/cookies';
import { updateToken } from '../actions/auth';

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {

      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsInitUser } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (type === wsInitUser) {
        const accessToken = getCookie("accessToken");
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
          console.log(`Соединение открыто`);
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
          console.log(`Ошибка ${event.message}`);
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          if (!success) {
            if (restParsedData.message === "Invalid or missing token") {
              socket.close(1000, "некорректный токен, попытка обновления")
              updateToken(dispatch)
              .then(() => {
                  dispatch({ type: wsInitUser });
                })
                .catch((e) => {
                  console.log(`Ошибка при попытке подключения: ${e}`);
                });
            } else {
              dispatch({ type: onError });
            }
          }

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
          if (event.wasClean){
            console.log(`Соединение закрыто корректно c кодом ${event.code} по причине - ${event.reason}`);
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
