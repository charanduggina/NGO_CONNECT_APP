import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';
import { isAuth, getCookie} from '../auth/helpers';
const UpdateNgo = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        location: '',
        description: '',
        categories: [],
        category: '',
        phone: '',
        photo: '',
        schedule_photo: '',
        certficate_photo: '',
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const {
        name,
        location,
        description,
        // categories,
        category,
        phone,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;
    const token = getCookie('token');
    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    location: data.location,
                    description: data.description,
                    phone: data.phone,
                    category: data.category._id,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        if(name==='photo'){
            const value =  event.target.files[0];
            formData.set(name, value);
            setValues({ ...values, [name]: value });
        }
        else if(name==='certficate_photo'){
            const value =  event.target.files[0];
            formData.set(name, value);
            setValues({ ...values, [name]: value });
        }
        else if(name==='schedule_photo'){
            const value =  event.target.files[0];
            formData.set(name, value);
            setValues({ ...values, [name]: value });
        }
        else{
            const value =   event.target.value;
            formData.set(name, value);
            setValues({ ...values, [name]: value });
        }
      
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, isAuth()._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    location: '',
                    description: '',
                    phone: '',
                    photo: '',
                    schedule_photo: '',
                    certficate_photo: '',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">location</label>
                <textarea onChange={handleChange('location')} className="form-control" value={location} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            
            <div className="form-group">
                <label className="text-muted">Phone No</label>
                <input onChange={handleChange('phone')} type="number" className="form-control" value={phone} />
            </div>

            <h4>Post Schedule Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('schedule_photo')} type="file" name="schedule_photo" accept="image/*" />
                </label>
            </div>

            <h4>Post Certificate Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('certficate_photo')} type="file" name="certficate_photo" accept="image/*" />
                </label>
            </div>


            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <Layout title="Add a new product" description={`G'day ${isAuth().name}, ready to add a new product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateNgo;