import { API } from "../config";
import queryString from "query-string";
import axios from 'axios';

export const donateobject = (userId, token,ngoId, donateobjects,name) => {
    console.log(userId);
    console.log(ngoId);
    console.log(donateobjects);
    console.log(token);
    return  axios({
        method: 'POST',
        url: `${API}/donate/object`,
        data: { userId,ngoId,donateobjects,name}
       //data: {donateobjects}
    }).then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const ratingupdate = (ngoId,rating,count) => {
    console.log(ngoId);
    console.log(rating);
    console.log(count);
    return  axios({
        method: 'POST',
        url: `${API}/ngo/rate`,
        data: { ngoId,rating,count}
       //data: {donateobjects}
    }).then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const donateamount = (userId, token,ngoId, donateamount,transactionId,name) => {
    console.log(userId);
    console.log(ngoId);
    console.log(donateamount);
    console.log(token);
    return  axios({
        method: 'POST',
        url: `${API}/donate/money`,
        data: { userId,ngoId,donateamount,transactionId,name}
       //data: {donateobjects}
    }).then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getProducts = sortBy => {
    return fetch(`${API}/ngos?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/ngos/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export const list = params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`${API}/ngos/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = productId => {
    return fetch(`${API}/ngo/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getPurchaseHistory = (userId, token) => {
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};