import { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
/*   const [localComparison, setLocalComparison] = useState('maior que');
  const [localColumn, setLocalColumn] = useState('population');
  const [localValue, setLocalValue] = useState(0); */
  const {
    filterByName,
    setFilterByName,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    filterByNumericValue,
    setSelectedFilters,
    selectedFilters,
  } = useContext(AppContext);

  const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const inputTextChange = ({ target: { value } }) => {
    setFilterByName(
      value,
    );
  };

  const inputColumnChange = ({ target: { value } }) => {
    setColumnFilter(
      value,
    );
  };

  const inputComparisonChange = ({ target: { value } }) => {
    setComparisonFilter(
      value,
    );
  };

  const inputValueChange = ({ target: { value } }) => {
    setValueFilter(
      value,
    );
  };

  const handleClick = () => {
    filterByNumericValue();
    setSelectedFilters([
      ...selectedFilters,
      {
        columnFilter,
        comparisonFilter,
        valueFilter,
      },
    ]);
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
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ inputColumnChange }
      >
        {
          columnOptions.map((option) => <option key={ option }>{option}</option>)
        }
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparisonFilter }
        onChange={ inputComparisonChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ inputValueChange }
      />
      <button
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Aplicar filtro
      </button>
    </header>
  );
}

export default Filters;
