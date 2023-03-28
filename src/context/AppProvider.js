import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterByName, setFilterByName] = useState('');

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

  const values = {
    apiData,
    filterByName,
    setFilterByName,
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
