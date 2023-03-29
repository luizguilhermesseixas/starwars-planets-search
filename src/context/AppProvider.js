import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [columnFilter, setColumnFilter] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('');
  const [valueFilter, setValueFilter] = useState(null);

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

  const comparisonToString = useCallback((param) => {
    const parseValueFilter = Number(valueFilter);
    const parseColumnItem = Number(param[columnFilter]);
    if (comparisonFilter === '>') {
      return parseColumnItem > parseValueFilter;
    }
    if (comparisonFilter === '<') {
      return parseColumnItem < parseValueFilter;
    }
    if (comparisonFilter === '===') {
      return parseColumnItem === parseValueFilter;
    }
  }, [comparisonFilter, columnFilter, valueFilter]);

  useEffect(() => {
    if (valueFilter !== null) {
      setApiData(
        originalData
          .filter((eachPlanet) => comparisonToString(eachPlanet)),
      );
    } else {
      setApiData(originalData);
    }
  }, [columnFilter, comparisonFilter, valueFilter, originalData, comparisonToString]);

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
