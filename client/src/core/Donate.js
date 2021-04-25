import React, { useState ,useEffect } from 'react';
import { Link,Redirect } from 'react-router-dom';
import Layout from './Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { amountauthenticate,amountisAuth,objectauthenticate,objectisAuth} from './Donatehelpers';
import { isAuth, getCookie} from '../auth/helpers';
import { donateobject,getProducts,read } from './apiCore';

const Donatepage = ( props ) => {
    const [amount, setamount] = useState({});
    const [donateobjects, setdonateobjects] = useState();
    const [error, setError] = useState(false);
    const [product,setProduct] = useState({});
    const [success, setSuccess] = useState(false);
    const token = getCookie('token');

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

    

    const handleChangeamount = e => {
        setError("");
        setamount(e.target.value);
    };
    const handleChangeobject = e => {
        setError("");
        setdonateobjects(e.target.value);
    };

    const amountclickSubmit = event => {
        event.preventDefault();
        setError("");
        amountauthenticate(amount, () => {
            amountisAuth() 
        });
      
       
    };

    const objectclickSubmit = event => {
        event.preventDefault();
        setError("");
        objectauthenticate(donateobjects, () => {
            objectisAuth() 
        });
        setSuccess(false);
        // make request to api to create category
        donateobject(isAuth()._id, token, product._id,donateobjects,product && product.name).then(data => {
            //if (data.error) {
            //    setError(data.error);
            //} else {
            //    setError("");
            //    setSuccess(true);
            //}
            setError("");
             setSuccess(true);
        });
       
    };

    const Donateamount = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Donation Amount</label>
                <input onChange={handleChangeamount} value={amount}  placeholder="Enter the Donation amount" type="number" className="form-control" />
            </div>


            <div>
           
                <button className="btn btn-primary" onClick={amountclickSubmit}>
                    Save
                </button>
               
            </div>
        </form>
    );
    const Donateobjects = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Donate Objects</label>
                <input onChange={handleChangeobject} value={donateobjects}  placeholder="Enter objects you want to donate" type="text" className="form-control" />
            </div>


            <div>
                <button className="btn btn-primary" onClick={objectclickSubmit}>
                   Donate
                </button>
            </div>
        </form>
    );
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Objects Donated Successfully</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Error encountered please try again</h3>;
        }
    };


    return (
        <Layout
             className = "container-fluid"
    >
      <div className="jumbotron ">
        <h2 >{product && product.name}</h2>
        <p className="lead">You can make donations by typing the amount and proceeding to the gateway, If you want to donate any objects please type the objects and courier to the NGO location. </p>
        </div>
       <div className="row" >
          {product && product.description 

          }  
        </div>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Donation Page</h1>
                {showSuccess()}
                    {showError()}
                {Donateamount()}
                <Link to={`/amount/donate/${product._id}`} className="mr-2" >
   
   <button className="btn btn-outline-primary mt-2 mb-2">
   proceed to payment
  </button>
  </Link>
                <br/>
                <br/>
                {Donateobjects()}
            </div>
        </Layout>
    );
};

export default Donatepage;