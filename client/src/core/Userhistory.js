import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuth, getCookie,  } from '../auth/helpers';
import 'react-toastify/dist/ReactToastify.min.css';
import { token } from 'morgan';
import { getPurchaseHistory } from './apiCore';
import moment from "moment";

const Userhistory = () => {
    const [history, setHistory] = useState([]);


    const token = getCookie('token');

    const init = () => {
        getPurchaseHistory(isAuth()._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);
    

    const showOrdersLength = () => {
        if(history.length > 0){
            return(
                <h1 className="text-danger display-2" >
                    Total Donations : {history.length}
                </h1>
            );
        } else {
            return <h1 className="text-danger" >No Donations</h1>
        }
    };

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Donation history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Ngo name: {p.recieverId.name}</h6>
                                                <h6>Ngo Id: {p.recieverId._id}</h6>
                                                <h6>
                                                    Amount Donated: ${p.amountdonated}
                                                </h6>
                                                <h6>
                                                    Objects Donated: ${p.objectsdonated}
                                                </h6>
                                                <h6>
                                                    Donated on:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
       

<Layout
title="Donations"
description={`G'day ${isAuth().name}, You can view all your the Donations here.`}
>
<div className="row">
    <div className="col-md-8 offset-md-2">
        {showOrdersLength()}
        {history.map((p,pIndex)=>{
            return(
                <div className="mt-5" key={pIndex} style={{borderBottom:"5px solid indigo" }} >
                  <h2 className="mb-5">
                     <span className="bg-primary">
                        Donation Id :{p._id}
                     </span>
                  </h2>
                  <ul className="list-group mb-2">
                        <li className="list-group-item">
                            Donated To: {p.recieverId.name}
                        </li>
                        <li className="list-group-item">
                            Ngo Id: {p.recieverId._id}
                        </li>
                        <li className="list-group-item">
                            Transaction ID: {p.transactionId}
                        </li>
                        <li className="list-group-item">
                            Amount Donated: ${p.amountdonated}
                        </li>
                        <li className="list-group-item">
                            Objects Donated: {p.objectsdonated}
                        </li>
                       
                        <li className="list-group-item">
                            Donated on:{" "}
                            {moment(p.createdAt).fromNow()}
                        </li>
                    </ul>
                </div>
            )
        })}
       
    </div>
</div>
</Layout>


        
    );
};

export default Userhistory;