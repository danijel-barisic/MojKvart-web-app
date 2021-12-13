import React, { useEffect } from 'react';
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
import ReactSession from 'react-client-session/dist/ReactSession';
import HeaderAdmin from './components/HeaderAdmin';

function App() {
  ReactSession.setStoreType("localStorage");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  console.log("isLoggedIn-> ", isLoggedIn);

  function onLogin() {
    setIsLoggedIn(true);
  }
    
  function onLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const loggedInUser = ReactSession.get("username");
    if (loggedInUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    console.log(ReactSession.get(ReactSession.get("username")));
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
            <Route path='/'>
              <Home state={ isLoggedIn }/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
  else if (isLoggedIn && ReactSession.get(ReactSession.get("username")) === 'USER') {
    console.log(ReactSession.get(ReactSession.get("username")));
    return (
      <div className='App'>
        <BrowserRouter>
          <Header onLogout={onLogout} onLogin={onLogin} state={isLoggedIn}/>
          <div className='App'>
            <Switch>
              <Route path='/streets' state={ isLoggedIn } exact component={StreetList} />
              <Route path='/streets/add' exact component={StreetForm} />
              <Route path='/districts' exact component={DistrictList} />
              <Route path='/districts/add' exact component={DistrictForm} />
              <Route path='/' state={ isLoggedIn }/>
              </Switch>
            </div>
        </BrowserRouter>
      </div>
    );
  }
  else {
    console.log(isLoggedIn, ReactSession.get(ReactSession.get("username")));
    return (
      <div className='App'>
        <BrowserRouter>
          <HeaderAdmin onLogout={onLogout} onLogin={onLogin} state={isLoggedIn}/>
          <div className='App'>
            <Switch>
              <Route path='/streets' exact component={StreetList} />
              <Route path='/streets/add' exact component={StreetForm} />
              <Route path='/districts' exact component={DistrictList} />
              <Route path='/districts/add' exact component={DistrictForm} />
              <Route path='/' state={ isLoggedIn }/>
              </Switch>
            </div>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
