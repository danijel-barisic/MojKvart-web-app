import React, { useEffect } from 'react';
import Header from './components/Header';
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import DistrictForm from './components/DistrictForm';
import Login from './components/Login';
import Registration from './components/Registration';
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
import UserAdminView from "./components/UserAdminView";
import EventForm from "./components/EventForm";
import EventEditForm from './components/EventEditForm';
import Council from './components/Council';
import CouncilMeetingReport from './components/CouncilMeetingReport';
import CouncilForm from './components/CouncilForm';
import CouncilFormEdit from './components/CouncilFormEdit';
import Forum from './components/Forum';
import ForumNewThread from './components/ForumNewThread';
import ThreadView from './components/ThreadView';
import Personal from "./components/Personal";
import PersonalPassword from  './components/PersonalPassword';
import PerosnalRoleRequest from './components/PersonalRoleRequest';
import ThreadNewPost from './components/ThreadNewPost';
import PostEditForm from './components/PostEditForm';


function App() {
  ReactSession.setStoreType("localStorage");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [account, setAccount] = React.useState([]);
  const [updated, setUpdated] = React.useState(new Date());
  let user = "Stanovnik";
  console.log("isLoggedIn-> ", isLoggedIn, user);

  function onLogin() {
    setUpdated(new Date());
    setIsLoggedIn(true);
  }
    
  function onLogout() {
    localStorage.clear();
    setAccount(undefined);
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const loggedInUser = ReactSession.get("username");
    fetch(`/accounts/${loggedInUser}`)
      .then(data => data.json())
      .then(account => setAccount(account));
    if (loggedInUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    user = ReactSession.get(ReactSession.get("username"));
    if (user === undefined) {
      user = "Stanovnik";
    }
  }, [updated]);

  user = ReactSession.get(ReactSession.get("username"));
  if (user === undefined) {
    user = "Stanovnik";
  }
  if (!isLoggedIn) {
    console.log(ReactSession.get(ReactSession.get("username")));
    return (
      <BrowserRouter>
      <Header onLogout={onLogout} onLogin={onLogin} state={isLoggedIn} account={account}/>
        <div className='App'>
          <Switch>
            <Route path='/login'>
              <Login onLogin={onLogin} state={isLoggedIn} />
            </Route>
            <Route path='/registration'>
              <Registration onLogin={onLogin} state={isLoggedIn} />
            </Route>
            <Route path='/'>
              <Redirect to='/login' />
            </Route>
          </Switch>
        </div>
        </BrowserRouter>
    );
  } else if (account === undefined) {
    return (
      <span>Čekanje na server...</span>
    );
  }
  else if (isLoggedIn && (user === 'Stanovnik') && account !== undefined && account.home !== undefined){
    console.log("check user " + isLoggedIn, (user === "Stanovnik"));
    console.log(account);
    if (account.home.id === -1) {
      return (
        <div className='App'>
          <BrowserRouter>
            <Header onLogout={onLogout} onLogin={onLogin} state={isLoggedIn} account={account}/>
            <div className='App'>
              <Switch>
                <Route path='/personal' exact component={Personal} />
                <Route path='/personal/role_requests' exact component={PerosnalRoleRequest} />
                <Route path='/personal/password' exact component={PersonalPassword} />
                <Route path='/'>
                  <Redirect to='/personal' />
                </Route>
                </Switch>
              </div>
          </BrowserRouter>
        </div>
      );
    } else {
        return (
          <div className='App'>
            <BrowserRouter>
              <Header onLogout={onLogout} onLogin={onLogin} state={isLoggedIn} account={account}/>
              <div className='App'>
                <Switch>
                  <Route path='/forum' exact component={Forum} />
                  <Route path='/forum/:idT' exact component={ThreadView} />
                  <Route path='/novatema' exact component={ForumNewThread}/>
                  <Route path='/novaobjava/:idT/:idP' exact component={ThreadNewPost}/>
                  <Route path = '/novaobjava/:idT/:idP/edit' exact component={PostEditForm} />
                  <Route path='/personal' exact component={Personal} />
                  <Route path='/personal/role_requests' exact component={PerosnalRoleRequest} />
                  <Route path='/personal/password' exact component={PersonalPassword} />
                  <Route path='/events' exact component={Events} />
                  <Route path='/events/suggestion' exact component={EventForm} />
                  <Route path='/events/edit/:id' exact component={EventEditForm} />
                  <Route path='/council' exact component={Council} />
                  <Route path='/council/report/:id' exact component={CouncilMeetingReport} />
                  <Route path='/council/new_report' exact component={CouncilForm} />
                  <Route path='/council/report/edit/:id' exact component={CouncilFormEdit} />
                  <Route path='/'>
                    <Redirect to='/forum' />
                  </Route>
                  </Switch>
                </div>
            </BrowserRouter>
          </div>
      );
    }
  }
    /* ADMIN */
  else if (isLoggedIn && (user === 'ADMIN') && account !== undefined && account.home !== undefined){
    console.log("admin"  + isLoggedIn, user);
    return (
      <div className='App'>
        <BrowserRouter>
          <HeaderAdmin onLogout={onLogout} onLogin={onLogin} state={isLoggedIn}/>
          <div className='App'>
            <Switch>
              <Route path='/zahtjeviUloga' exact component={RoleRequests}/>
              <Route path='/kvartovi' exact component={Districts} />
              <Route path='/kvartovi/novi' exact component={DistrictForm} />
              <Route path='/kvartovi/:id' exact component={DistrictView} />
              <Route path='/kvartovi/:id/edit' exact component={DistrictEditForm} />
              <Route path='/ulice/novi' exact component={StreetForm} />
              <Route path='/ulice/:id/edit' exact component={StreetEditForm} />
              <Route path='/korisnici' exact component={Users} />
              <Route path='/korisnici/:id' exact component={UserAdminView} />
              <Route path='/personal' exact component={Personal} />
              <Route path='/personal/password' exact component={PersonalPassword} />
              <Route path='/' >
                <Redirect to='/korisnici' />
              </Route>
              </Switch>
            </div>
        </BrowserRouter>
      </div>
    );
  }
  else {
    return (<></>);
  }

}

export default App;
