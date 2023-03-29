import { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const [localComparison, setLocalComparison] = useState('maior que');
  const [localColumn, setLocalColumn] = useState('population');
  const [localValue, setLocalValue] = useState(0);
  const {
    filterByName,
    setFilterByName,
    /*     columnFilter, */
    setColumnFilter,
    /*     comparisonFilter, */
    setComparisonFilter,
    /*     valueFilter, */
    setValueFilter,
  } = useContext(AppContext);

  const inputTextChange = ({ target: { value } }) => {
    setFilterByName(
      value,
    );
  };

  const inputColumnChange = ({ target: { value } }) => {
    setLocalColumn(
      value,
    );
  };

  const inputComparisonChange = ({ target: { value } }) => {
    setLocalComparison(
      value,
    );
  };

  const inputValueChange = ({ target: { value } }) => {
    setLocalValue(
      value,
    );
  };

  const handleClick = () => {
    if (localComparison === 'maior que') {
      setComparisonFilter('>');
    } if (localComparison === 'menor que') {
      setComparisonFilter('<');
    } if (localComparison === 'igual a') {
      setComparisonFilter('===');
    }
    setColumnFilter(localColumn);
    setValueFilter(localValue);
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
        value={ localColumn }
        onChange={ inputColumnChange }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ localComparison }
        onChange={ inputComparisonChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ localValue }
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
