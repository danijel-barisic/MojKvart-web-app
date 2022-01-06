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
         ? <Link to='/' className="logout" onClick={logout} >Logout</Link>
         : <Link to='/login' className="login" >Login </Link>;
   }

   if (account !== undefined && account.home !== undefined) {
      if (account.home.id === -1) {
         return (
            <>
               <header className='header'>
                  <Link className='logo active' to='/'>Moj Kvart </Link>
                  <div className='header-right'>
                     <Link to='/personal' >Osobni podaci </Link>
                     {renderButton()}
                  </div>
               </header>
               <div className="invalidAddressPoruka">Prije korištenja foruma molimo ispravite svoje osobne podatke!</div>
            </>
         ); 
      } else {
         return (
            <header className='header'>
               <Link className='logo active' to='/'>Moj Kvart </Link>
               <div className='header-right'>
                  <Link to='/forum' >Forum </Link>
                  <Link to='/events' >Događanja </Link>
                  <Link to='/council' >Vijeće četvrti </Link>
                  <Link to='/personal' >Osobni podaci </Link>
                  {renderButton()}
               </div>
            </header>
         ); 
      }
   } else {
      return (
         <header className='header'>
            <Link className='logo active' to='/'>Moj Kvart </Link>
            <div className='header-right'>
               {renderButton()}
            </div>
         </header>
      ); 
   }
}

export default Header;