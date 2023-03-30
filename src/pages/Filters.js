import { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
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
    columnOptions,
    setColumnOptions,
  } = useContext(AppContext);

  /*   const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]; */

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

  const removeColumnFilter = () => {
    if (columnOptions.length > 0) {
      const newColumnfilter = columnOptions
        .filter((eachOption) => eachOption !== columnFilter);
      setColumnOptions(newColumnfilter);
      setColumnFilter(newColumnfilter[0]);
    }
    /*     if (columnOptions.length === 0) {
      setComparisonFilter('');
      setValueFilter(null);
    } */
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
    removeColumnFilter();
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
      { selectedFilters.map((eachFilter, i) => (
        <span key={ i }>
          {eachFilter.columnFilter}
          {' '}
          {eachFilter.comparisonFilter}
          {' '}
          {valueFilter}
        </span>
      ))}
    </header>
  );
}

export default Filters;
