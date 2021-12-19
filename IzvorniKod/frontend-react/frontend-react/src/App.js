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
import UserAdminView from "./components/UserAdminView";
import EventForm from "./components/EventForm";
import UserAdminView2 from './components/UserAdminView2';
import EventEditForm from './components/EventEditForm';
import Council from './components/Council';
import CouncilMeetingReport from './components/CouncilMeetingReport';
import CouncilForm from './components/CouncilForm';
import CouncilFormEdit from './components/CouncilFormEdit';
import Forum from './components/Forum';
import ForumNewThread from './components/ForumNewThread';
import ThreadView from './components/ThreadView';
import PersonalEdit from './components/PersonalEdit';
import Personal from "./components/Personal";
import PersonalDelete from './components/PersonalDelete';
import PersonalPassword from  './components/PersonalPassword';

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
              <Route path='/forum' exact component={Forum} />
              <Route path='/forum/:id' exact component={ThreadView} />
              <Route path='/novatema' exact component={ForumNewThread}/>
              <Route path='/personal' exact component={Personal} />
              <Route path='/personal/edit' exact component={PersonalEdit} />
              <Route path='/personal/password' exact component={PersonalPassword} />
              <Route path='/personal/delete' exact component={PersonalDelete} />
              <Route path='/events' exact component={Events} />
              <Route path='/events/suggestion' exact component={EventForm} />
              <Route path='/events/edit/:id' exact component={EventEditForm} />
              <Route path='/council' exact component={Council} />
              <Route path='/council/report/:id' exact component={CouncilMeetingReport} />
              <Route path='/council/new_report' exact component={CouncilForm} />
              <Route path='/council/report/edit/:id' exact component={CouncilFormEdit} />
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
              <Route path='/korisnici/:id' exact component={UserAdminView2} />
              <Route path='/personal' exact component={Personal} />
              <Route path='/personal/edit' exact component={PersonalEdit} />
              <Route path='/personal/password' exact component={PersonalPassword} />
              <Route path='/'/>
              </Switch>
            </div>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
