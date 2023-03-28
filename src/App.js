import React from 'react';
import Main from './pages/Main';
import AppProvider from './context/AppProvider';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

export default App;
