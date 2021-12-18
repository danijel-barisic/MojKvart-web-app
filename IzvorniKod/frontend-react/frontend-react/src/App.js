import React, { useEffect } from 'react';
import Header from './components/Header';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import DistrictForm from './components/DistrictForm';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import ReactSession from 'react-client-session/dist/ReactSession';
import HeaderAdmin from './components/HeaderAdmin';
import Districts from './components/Districts';
import DistrictView from './components/DistrictView';
import StreetForm from './components/StreetFrom';
import DistrictEditForm from './components/DistrictEditForm';
import StreetEditForm from './components/StreetEditForm';
import RoleRequests from './components/RoleRequests';
import Events from "./components/Events";
import Users from './components/Users';

function App() {
  ReactSession.setStoreType("localStorage");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  let user = "Stanovnik";
  console.log("isLoggedIn-> ", isLoggedIn, user);

  function onLogin(props) {
    user = props;
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

  user = ReactSession.get(ReactSession.get("username"));
  if (user === undefined) {
    user = "Stanovnik";
  }
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
  else if (isLoggedIn && (user === 'Stanovnik')) {
    console.log("check user " + isLoggedIn, (user==="Stanovnik"));
    return (
      <div className='App'>
        <BrowserRouter>
          <Header onLogout={onLogout} onLogin={onLogin} state={isLoggedIn}/>
          <div className='App'>
            <Switch>
              {/* <Route path='/streets' state={ isLoggedIn } exact component={StreetList} />
              <Route path='/streets/add' exact component={StreetForm} />
              <Route path='/districts' exact component={DistrictList} />
              <Route path='/districts/add' exact component={DistrictForm} /> */}
              {/* <Route path='/forum' exact component={Forum} />
              <Route path='/events' exact component={Events} />
              <Route path='/council' exact component={Council} />
              <Route path='/user' exact component={UserDetails} /> */}
              <Route path='/events' exact component={Events} />
              <Route path='/' />
              </Switch>
            </div>
        </BrowserRouter>
      </div>
    );
  }
    /* ADMIN */
  else {
    console.log("admin"  + isLoggedIn, user);
    return (
      <div className='App'>
        <BrowserRouter>
          <HeaderAdmin onLogout={onLogout} onLogin={onLogin} state={isLoggedIn}/>
          <div className='App'>
            <Switch>
              {/* <Route path='/streets' exact component={StreetList} />
              <Route path='/streets/add' exact component={StreetForm} />
              <Route path='/districts' exact component={DistrictList} /> */}
              {/* <Route path='/users' exact component={Users} />
              <Route path='/rolerequests' exact component={RoleRequests} />
              <Route path='/user' exact component={UserDetails} /> */}
              <Route path='/zahtjeviUloga' exact component={RoleRequests}/>
              <Route path='/kvartovi' exact component={Districts} />
              <Route path='/kvartovi/novi' exact component={DistrictForm} />
              <Route path='/kvartovi/:id' exact component={DistrictView} />
              <Route path='/kvartovi/:id/edit' exact component={DistrictEditForm} />
              <Route path='/ulice/novi' exact component={StreetForm} />
              <Route path='/ulice/:id/edit' exact component={StreetEditForm} />
              <Route path='/korisnici' exact component={Users} />
              <Route path='/'/>
              </Switch>
            </div>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
