import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts,read } from './apiCore';
import Card from './Card';
import CardMain from './CardMain';
import {Link} from 'react-router';

const Ngodetails = (props) => {
  const [product,setProduct] = useState({})
  const [error,setError] = useState(false)
  
  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if(data.error){
        setError(data.error);
      }else{
        setProduct(data);
      }
    });
  };
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  },[])


  return(
    <Layout
    className = "container-fluid"
    >
      <div className="jumbotron ">
        <h2 >{product && product.name}</h2>
        <p className="lead">This page displays detailed information about the NGO, you can verify the NGO by the 
         certificates below and make donations or volunteer. </p>
        </div>
       <div className="row" >
          {product && product.description && 
           <CardMain product={product} showViewProductButton={false} />
          }  
        </div>
        
    </Layout>
  );
}

export default Ngodetails;

