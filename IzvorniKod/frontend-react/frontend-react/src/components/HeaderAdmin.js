import React from "react";
import { Link } from "react-router-dom";
import './Header.css';


function HeaderAdmin(props) {
   const { state } = props;
   let checkLogin = false;

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

   return (
      <header className='header'>
         <Link className='logo active' to='/'>Moj Kvart </Link>
         <div className='header-right'>
            <Link to='/korisnici' >Korisnici </Link>
            <Link to='/zahtjeviUloga' >Zahtjevi uloga </Link>
            <Link to='/kvartovi' >Kvartovi </Link>
            <Link to='/osobno' >Osobni podaci </Link>
            {renderButton()}
         </div>
      </header>
   ); 
}

export default HeaderAdmin;