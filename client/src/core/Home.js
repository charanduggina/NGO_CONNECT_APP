import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import {Link} from 'react-router';
import Search from './Search';


const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('rating').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
        className = "container-fluid"
        >
          <div className="jumbotron ">
            <h2 >Ngo Among Us</h2>
            <p className="lead">NGO among up, a portal to connect trusted NGO's to users who are willing to donate either money or time. The aim of this portal is to bridge the gap between NGOs and users. Often people who want to donate money, essentials or want to
             do social work do not have information about the variety of NGOs that exist. So we bridge the gap between them.</p>
             </div>
             <Search/>
            <h2 className="mb-4">New Ngos </h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Rated</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
            
        </Layout>
    );
};

export default Home;