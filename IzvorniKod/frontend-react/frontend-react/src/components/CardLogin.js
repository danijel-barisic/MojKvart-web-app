import React from "react";
import './CardLogin.css';
import { Link } from "react-router-dom";
import './Header.css';

function CardLogin(props) {
  const { children, id, title } = props;

  if (id && title) {
    return (
      <div className="CardLogin">
          {<p className="headerdist"><Link to={{
            pathname: `/kvartovi/${id}/edit`,
            state: { id }
          }}><h2>{id}. {title}</h2></Link></p>}
          {children}
        </div>
    );
  }
  else if (title) {
    return (
      <div className="CardLogin">
        {title && <h2>{title}</h2>}
        {children}
      </div>
    );
  }
  else {
    return (
      <div className="CardLogin">
        {children}
      </div>
    );
  }

  
}

export default CardLogin;
