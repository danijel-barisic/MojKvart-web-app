import React from "react";
import './Card.css';
import { Link } from "react-router-dom";
import './Header.css';
import { MdPostAdd } from "react-icons/md";

function CardThreadView(props) {
  const { children, id, title } = props;

  if (id && title) {
    return (
      <div className="CardThreadView">
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
      <div className="CardThreadView">
        {title && <h2>{title}</h2>}
        
        {children}
      </div>
    );
  }
  else {
    return (
      <div className="CardThreadView">
        {children}
      </div>
    );
  }

  
}

export default CardThreadView;
