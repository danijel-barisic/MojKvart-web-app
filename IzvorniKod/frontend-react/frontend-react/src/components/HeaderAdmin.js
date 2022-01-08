import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import { ReactComponent as Logo } from '../assets/city.svg';


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
         ? <Link to='/' className="logout" onClick={logout} >ODJAVA</Link>
         : <Link to='/login' className="login" >PRIJAVA </Link>;
   }

   return (
      <header className='header'>
         <Link className='logo active' to='/'>MOJ KVART </Link>
         <div style={{ fontSize:"5px"}}> <tbf> Grad spava, svi snivaju slatko</tbf></div>
         <Logo style={{ width: "150px", height: "50px"}} />
         <div className='header-right'>
            <Link to='/korisnici' >KORISNICI </Link>
            <Link to='/zahtjeviUloga' >ZAHTJEVI ULOGA </Link>
            <Link to='/kvartovi' >KVARTOVI </Link>
            <Link to='/osobno' >OSOBNI PODACI </Link>
            {renderButton()}
         </div>
      </header>
   ); 
}

export default HeaderAdmin;