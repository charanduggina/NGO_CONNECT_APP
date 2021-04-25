import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie} from '../auth/helpers';
import { Link } from 'react-router-dom';
import { listOrders} from './apiAdmin';
import moment from "moment";

const Orders = () => {
    const [orders,setOrders] = useState([])
    const token = getCookie('token');

    const loadOrders = ( ) => {
        listOrders(isAuth()._id,token).then(data => {
            if(data.error){
                console.log(data.error);
            } else{
                setOrders(data);
            }
        });

    };

    useEffect(() => {
        loadOrders()
    },[]);

    const showOrdersLength = () => {
        if(orders.length > 0){
            return(
                <h1 className="text-danger display-2" >
                    Total Donations : {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-danger" >No Donations</h1>
        }
    };

    return (
        <Layout
            title="Donations"
            description={`G'day ${isAuth().name}, You can view all the Donations here.`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.map((o,oIndex)=>{
                        return(
                            <div className="mt-5" key={oIndex} style={{borderBottom:"5px solid indigo" }} >
                              <h2 className="mb-5">
                                 <span className="bg-primary">
                                    Donation Id :{o._id}
                                 </span>
                              </h2>
                              <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                       Donar Name : {o.donarId.name}
                                    </li>
                                    <li className="list-group-item">
                                       Donar Email : {o.donarId.email}
                                    </li>
                                    <li className="list-group-item">
                                        Donated To: {o.recieverId.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ngo Id: {o.recieverId._id}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction ID: {o.transactionId}
                                    </li>
                                    <li className="list-group-item">
                                        Amount Donated: ${o.amountdonated}
                                    </li>
                                    <li className="list-group-item">
                                        Objects Donated: {o.objectsdonated}
                                    </li>
                                   
                                    <li className="list-group-item">
                                        Donated on:{" "}
                                        {moment(o.createdAt).fromNow()}
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

export default Orders;