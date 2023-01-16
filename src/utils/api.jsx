const checkResponce = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const getIngredientsData = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      authorization: '',
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponce)
}

const placeOrder = (url, ingredients) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      authorization: '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"ingredients" : ingredients})
  })
  .then(checkResponce)
};

export { getIngredientsData, placeOrder };
