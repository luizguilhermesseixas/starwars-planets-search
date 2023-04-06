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
    /*     setColumnOptions, */
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

  const removeSelectedFilter = (filter) => {
    /* let originalOptions = columnOptions; */
    const newFilter = selectedFilters.filter((eachFilter) => eachFilter.id !== filter.id);
    /* originalOptions = [...columnOptions, filter.column]; */
    filterByNumericValue(newFilter);
    setSelectedFilters(newFilter);
    /* setColumnOptions(originalOptions); */
  };

  const handleClick = () => {
    if (columnFilter !== undefined) {
      const filters = [...selectedFilters,
        {
          id: selectedFilters.length + 1,
          column: columnFilter,
          comparison: comparisonFilter,
          value: valueFilter,
        }];
      setSelectedFilters(filters);
      filterByNumericValue(filters);
    }
  };

  const removeAllFilters = () => {
    setSelectedFilters([]);
    filterByNumericValue([]);
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
      { selectedFilters.length > 0 ? selectedFilters.map((eachFilter, i) => (
        <div
          key={ i }
          data-testid="filter"
        >

          {eachFilter.column}
          {' '}
          {eachFilter.comparison}
          {' '}
          {eachFilter.value}

          <button
            type="button"
            onClick={ () => removeSelectedFilter(eachFilter) }
          >
            excluir
          </button>
        </div>
      )) : null }
      <button
        type="button"
        onClick={ removeAllFilters }
        data-testid="button-remove-filters"
      >
        Remover todas filtragens
      </button>
    </header>
  );
}

export default Filters;
