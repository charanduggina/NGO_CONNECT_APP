import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {ShowImage,ShowCertificateImage,ShowScheduleImage} from './ShowImage';


const CardMain = ({
  product,showViewProductButton = true
}) => {
  const showViewButton = (showViewProductButton) => {

    return(
      showViewProductButton && (
        <Link to={`/Ngo/${product._id}`} className="mr-2" >
   
        <button className="btn btn-outline-primary mt-2 mb-2">
        View NGO
       </button>
       </Link>
      )
    )
  }
  return (
    
    <div className="card ">
      <div className="card-header ">{product.name}</div>
      <div className="card-body">
          <ShowImage item ={product} url= "ngo" />
          <p mt-4> Certificates</p>
          <ShowCertificateImage item ={product} url= "ngo" />
        <p>Location :  {product.location} </p>
        <p>PhoneNo:{product.phone} </p>
        <p >Rating: {product.rating}</p>
          {showViewButton(showViewProductButton)}
          <Link to= {`/Ngo/donate/${product._id}`} className="mr-2" >
   
        <button className="btn btn-outline-primary mt-2 mb-2">
        Donate
       </button>
       </Link>
       <Link to={`/Ngo/volunteer/${product._id}`}  className="mr-2" >
   
   <button className="btn btn-outline-primary mt-2 mb-2">
    Volunteer
  </button>
  </Link>
      </div>
    </div>
  );
};

export default CardMain;