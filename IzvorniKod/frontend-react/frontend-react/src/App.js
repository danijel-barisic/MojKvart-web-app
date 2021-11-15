import React from 'react';
import StreetList from './components/StreetList';
import StreetForm from './components/StreetFrom';
import Header from './components/Header';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import DistrictList from './components/DistrictList';
import DistrictForm from './components/DistrictForm';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  console.log("isLoggedIn-> ", isLoggedIn);

  function onLogin() {
    setIsLoggedIn(true);
  }
    
  function onLogout() {
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route path='/login'>
              <Login onLogin={onLogin} state={ isLoggedIn }/>
            </Route>
            <Route path='/registration'>
              <Registration onLogin={onLogin} state={ isLoggedIn }/>
            </Route>
            <Route path='/streets' exact component={StreetList} />
            <Route path='/streets/add' exact component={StreetForm} />
            <Route path='/districts' exact component={DistrictList} />
            <Route path='/districts/add' exact component={DistrictForm} />
            <Route path='/'>
              <Home state={ isLoggedIn }/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Header onLogout={onLogout} onLogin={onLogin} state={isLoggedIn}/>
        <div className='App'>
          <Switch>
            <Route path='/' state={ isLoggedIn }/>
            <Route path='/streets' exact component={StreetList} />
            <Route path='/streets/add' exact component={StreetForm} />
            <Route path='/districts' exact component={DistrictList} />
            <Route path='/districts/add' exact component={DistrictForm} />
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
