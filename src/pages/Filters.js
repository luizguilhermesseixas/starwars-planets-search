import { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const { filterByName, setFilterByName } = useContext(AppContext);

  const inputTextChange = ({ target: { value } }) => {
    setFilterByName(
      value,
    );
  };

  return (
    <header>
      <input
        value={ filterByName }
        name="text-filter"
        onChange={ inputTextChange }
        placeholder="Filtrar por nome"
        type="text"
        data-testid="name-filter"
      />
    </header>
  );
}

export default Filters;
