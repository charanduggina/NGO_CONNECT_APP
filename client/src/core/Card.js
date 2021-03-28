import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {ShowImage} from './ShowImage';


const Card = ({
  product,showViewProductButton = true
}) => {
  const showViewButton = showViewProductButton => {

    return(
      showViewProductButton && (
        <Link to={`/Ngo/${product._id}`} className="mr-2" >
        <button className="btn btn-outline-primary mt-2 mb-2">
        View NGO
       </button>
       </Link>
      )
    );
  };
  return (
    
    <div className="card ">
      <div className="card-header ">{product.name}</div>
      <div className="card-body">
          <ShowImage item ={product} url= "ngo" />
        <p>{product.description.substring(0, 100)} </p>
        <p >Rating: {product.rating}</p>
          {showViewButton(showViewProductButton)}
      </div>
    </div>
  );
};

export default Card;