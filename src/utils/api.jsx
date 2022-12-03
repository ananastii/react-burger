const getIngredientsData = (url, state, setState) => {
  fetch(url, {
    method: 'GET',
    headers: {
      authorization: '',
      'Content-Type': 'application/json'
    }
  })
  .then(dataFromServer => dataFromServer.json())
  .then(dataFromServer => setState({data: dataFromServer.data, hasError: false}))
    .catch(e => {
      setState({...state, hasError: true})
      console.log(`Ошибка при загрузке данных: ${e}`);
    });
}

export { getIngredientsData };
