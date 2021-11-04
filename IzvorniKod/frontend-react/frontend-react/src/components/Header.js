import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
   return (
      <header className='Header'>
         <Link to='/streets'>Streets </Link>
         <Link to='/streets/add'>Add street</Link>
         <Link to='/districts'>Districts </Link>
         <Link to='/districts/add'>Add district</Link>
      </header>
   );


}

export default Header;