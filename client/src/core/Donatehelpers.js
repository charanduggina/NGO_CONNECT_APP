export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const amountauthenticate = (response, next) => {
    console.log('Amount to donate', response);
    setLocalStorage('Amount', response);
    next();
};
// access user info from localstorage
export const amountisAuth = () => {
    if (window !== 'undefined') {
        if (localStorage.getItem('Amount')) {
            return JSON.parse(localStorage.getItem('Amount'));
        } else {
            return false;
        }
    }
};

export const objectauthenticate = (response, next) => {
    console.log('object to donate', response);
    setLocalStorage('Objects', response);
    next();
};
// access user info from localstorage
export const objectisAuth = () => {
    if (window !== 'undefined') {
        if (localStorage.getItem('Objects')) {
            return JSON.parse(localStorage.getItem('Objects'));
        } else {
            return false;
        }
    }
};