


const getIngredientsData = (url) => {
  setState({ ...state, hasError: false, isLoading: true });
  fetch(url)
    .then(data => data.json())
    .then(data => setState({ ...state, data: data, isLoading: false }))
    .catch(e => {
      setState({ ...state, hasError: true, success: false });
    });
  }
