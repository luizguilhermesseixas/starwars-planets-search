const fetchApi = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const resultadoSemResidents = data.results.map((el) => {
    delete el.residents;
    return el;
  });
  return resultadoSemResidents;
};

export default fetchApi;
