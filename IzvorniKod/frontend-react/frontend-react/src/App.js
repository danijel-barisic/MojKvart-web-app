import React from 'react';
import StreetList from './components/StreetList';
import StreetForm from './components/StreetFrom';
import Header from './components/Header';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import DistrictList from './components/DistrictList';
import DistrictForm from './components/DistrictForm';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path='/streets' exact component={StreetList} />
          <Route path='/streets/add' exact component={StreetForm} />
          <Route path='/districts' exact component={DistrictList} />
          <Route path='/districts/add' exact component={DistrictForm} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
