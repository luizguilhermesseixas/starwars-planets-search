import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  /*   const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]); */

  const columnOptions = useMemo(() => {
    let options = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    selectedFilters.forEach((filter) => {
      options = options.filter((option) => option !== filter.column);
    });
    console.log(options);
    setColumnFilter(options[0]);
    return options;
  }, [selectedFilters]);

  useEffect(() => {
    fetchApi().then((data) => {
      setApiData(data);
      setOriginalData(data);
    });
  }, []);

  useEffect(() => {
    if (filterByName !== '') {
      setApiData(originalData
        .filter((eachPlanet) => eachPlanet.name
          .includes(filterByName)));
    } else {
      setApiData(originalData);
    }
  }, [filterByName, originalData]);

  const filterByNumericValue = (selected) => {
    let filteredPlanets = originalData;
    selected.forEach((eachFilter) => {
      const { column, comparison, value } = eachFilter;
      const parseValueFilter = Number(value);
      if (comparison === 'maior que') {
        filteredPlanets = filteredPlanets
          .filter((eachPlanet) => eachPlanet[column] > parseValueFilter);
      } else if (comparison === 'menor que') {
        filteredPlanets = filteredPlanets
          .filter((eachPlanet) => eachPlanet[column] < parseValueFilter);
      } else if (comparison === 'igual a') {
        filteredPlanets = filteredPlanets
          .filter((eachPlanet) => Number(eachPlanet[column]) === parseValueFilter);
      }
    });
    setApiData(filteredPlanets);
  };

  /*   useEffect(() => {
    let filteredPlanets;
    selectedFilters.forEach((eachFilter) => {
      const { column, comparison, value } = eachFilter;
      const parseValueFilter = Number(value);
      if (comparison === 'maior que') {
        filteredPlanets = apiData
          .filter((eachPlanet) => Number(eachPlanet[column] > parseValueFilter));
        setApiData(filteredPlanets);
      } else if (comparison === 'menor que') {
        filteredPlanets = apiData
          .filter((eachPlanet) => Number(eachPlanet[column] < parseValueFilter));
        setApiData(filteredPlanets);
      } else if (comparison === 'igual a') {
        filteredPlanets = apiData
          .filter((eachPlanet) => Number(eachPlanet[column] === parseValueFilter));
        setApiData(filteredPlanets);
      }
    });
  }, [selectedFilters]); */

  /*   useEffect(() => {
    filterByNumericValue();
  }, [filterByNumericValue]); */

  const values = {
    apiData,
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
    /* setColumnOptions, */
  };

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
