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

const placeOrder = (url, ingredients, state, setState) => {
  return (
    fetch(url, {
      method: 'POST',
      headers: {
        authorization: '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"ingredients" : ingredients})
    })
    .then(checkResponce)
    .then(dataFromServer => setState({data: dataFromServer, hasError: false}))
    .catch(e => {
      setState({...state, hasError: true})
      console.log(`Ошибка при загрузке данных: ${e}`);
    })
  )


};

export { getIngredientsData, placeOrder };
