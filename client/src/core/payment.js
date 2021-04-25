import React, { useState ,useEffect } from 'react';
import { Link,Redirect } from 'react-router-dom';
import Layout from './Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { amountauthenticate,amountisAuth,objectauthenticate,objectisAuth} from './Donatehelpers';
import { isAuth, getCookie} from '../auth/helpers';
import { donateamount,getProducts,read,getBraintreeClientToken,processPayment } from './apiCore';
import DropIn from 'braintree-web-drop-in-react';


const Payment = ( props ) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
    });
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


      const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
            }
        });
    };


      useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        getToken(isAuth()._id, token);
      },[])

      const getTotal = () => {
        return amountisAuth();
    };


    const donate = () => {
        setData({ loading: true });
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            //console.log(data);
            nonce = data.nonce;
            console.log("send nonce and total to process :",nonce,getTotal());
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal()
            };

            processPayment(isAuth()._id,token,paymentData)
            .then(response =>{
               // console.log(response)
              
               //create order

               donateamount(isAuth()._id, token, product._id,getTotal(), response.transaction.id,product && product.name).then(data => {
                //if (data.error) {
                //    setError(data.error);
                //} else {
                //    setError("");
                //    setSuccess(true);
                //}
               
                setData({loading : false,success: true});
            });
            })
            .catch(error => {
                console.log(error);
                setData({loading : false});
            });

        })
        .catch(error =>{
           // console.log('dropin error:',error);
            setData({...data,error:error.message});
        } );
    };
    
    const showDropIn =  () => (
        <div onBlur={() => setData({ ...data, error: '' })} >
            {data.clientToken !==null && getTotal() > 0 ? (
                <div>
                    <DropIn options={{
                        authorization : data.clientToken,
                        paypal:{
                            flow:"vault"
                        }
                    }} onInstance={instance=>(data.instance = instance)} />
                    <button onClick={donate} className="btn btn-success ">Donate</button>
                </div>
            ) : null}
        </div>
    )

    const showError = error => (
       <div className="alert alert-danger" style = {{display : error ? '' : 'none' }} >
           {error}
       </div>
    );
    const showSuccess = success => (
        <div className="alert alert-info" style = {{display : success ? '' : 'none' }} >
            Thanks! Your Donation was successful!
        </div>
     );
    const showLoading = loading => loading && <h2> Loading...</h2>;

    return (
        <Layout
             className = "container-fluid"
    >
      <div className="jumbotron ">
    
        <h2 >{product && product.name}</h2>
        <p className="lead">Payment portal, please enter the following details to make the donation  </p>
        </div>
       <div className="row" >
       <h2>Total: ${getTotal()}</h2>
       {showLoading(data.loading)}
       {showError(data.error)}
       {showSuccess(data.success)}
        </div>
           {showDropIn()}
        </Layout>
    );
};

export default Payment;