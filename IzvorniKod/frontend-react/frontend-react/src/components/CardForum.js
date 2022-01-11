import React from "react";
import './Card.css';
import { Link } from "react-router-dom";
import './Header.css';

function CardForum(props) {
  const { children, id, title } = props;

  if (id && title) {
    return (
      <div className="CardForum">
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
      <div className="CardForum">
        {title && <h2>{title}</h2>}
        {children}
      </div>
    );
  }
  else {
    return (
      <div className="CardForum">
        {children}
      </div>
    );
  }

  
}

export default CardForum;
