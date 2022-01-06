import React from "react";
import { Link } from "react-router-dom";
import './Header.css';


function Header(props) {
   const { state } = props;
   const { account } = props;
   let checkLogin = false;
   console.log(account);

   function logout() {
      fetch("/logout").then(() => {
         props.onLogout();
      });
   }

   //console.log("header->", { state });

   if (state === false || state == null) {
      checkLogin = false;
   } else {
      checkLogin = true;
   }

   const renderButton = () => {
      return (checkLogin)
         ? <Link to='/' className="logout" onClick={logout} > LOG OUT </Link>
         : <Link to='/login' className="login" > LOG IN </Link>;
   }

   if (account !== undefined && account.home !== undefined) {
      if (account.home.id === -1) {
         return (
            <>
               <header className='header'>
                  <Link className='logo active' to='/'> MOJ KVART </Link>
                  <div className='header-right'>
                     <Link to='/personal' > OSOBNI PODACI </Link>
                     {renderButton()}
                  </div>
               </header>
               <div className="invalidAddressPoruka">Prije korištenja foruma molimo ispravite svoje osobne podatke!</div>
            </>
         ); 
      } else {
         return (
            <header className='header'>
               <Link className='logo active' to='/'> MOJ KVART </Link>
               <div className='header-right'>
                  <Link to='/forum' >FORUM </Link>
                  <Link to='/events' >DOGAĐANJA </Link>
                  <Link to='/council' >VIJEĆE ČETVRTI </Link>
                  <Link to='/personal' >OSOBNI PODACI </Link>
                  {renderButton()}
               </div>
            </header>
         ); 
      }
   } else {
      return (
         <header className='header'>
            <Link className='logo active' to='/'> MOJ KVART </Link>
            <div className='header-right'>
               {renderButton()}
            </div>
         </header>
      ); 
   }
}

export default Header;