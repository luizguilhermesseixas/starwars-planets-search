import { useState, useEffect } from 'react';
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

  const filterByNumericValue = () => {
    const parseValueFilter = Number(valueFilter);
    if (comparisonFilter === 'maior que') {
      setApiData(
        apiData
          .filter((eachPlanet) => Number(eachPlanet[columnFilter] > parseValueFilter)),
      );
    }
    if (comparisonFilter === 'menor que') {
      setApiData(
        apiData
          .filter((eachPlanet) => Number(eachPlanet[columnFilter] < parseValueFilter)),
      );
    }
    if (comparisonFilter === 'igual a') {
      setApiData(
        apiData
          .filter((eachPlanet) => Number(eachPlanet[columnFilter] === parseValueFilter)),
      );
    }
  };

  /*   const filterByNumericValue = () => {
    if (valueFilter !== null) {
      setApiData(
        apiData
          .filter((eachPlanet) => comparisonToString(eachPlanet)),
      );
    } else {
      setApiData(originalData);
    }
  }; */

  /*   useEffect(
    () => {
      if (valueFilter !== null) {
        setApiData(
          apiData
            .filter((eachPlanet) => comparisonToString(eachPlanet)),
        );
      } else {
        setApiData(originalData);
      }
    },
    [
      columnFilter,
      comparisonFilter,
      valueFilter,
      originalData,
      apiData,
      comparisonToString,
    ],
  ); */

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
