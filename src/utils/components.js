export const styleStatus = (status) => {
  if (status === "done") {
    return {text: "Выполнен", class: `text_color_success`}
  } else if (status === "pending") {
    return {text: "Готовится", class: `text_color_default`};
  } else if (status === "created") {
    return {text: "Создан", class: `text_color_default`};
  } else
    return {text: "Отменён", class: `text_color_error`};
};
