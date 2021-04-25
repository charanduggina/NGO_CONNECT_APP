import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie} from '../auth/helpers';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
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
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const token = getCookie('token');
    const {
        name,
        location,
       description,
        categories,
        category,
        phone,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
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

        createProduct(isAuth()._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    location:'',
                    description: '',
                    photo: '',
                    schedule_photo: '',
                    certficate_photo: '',
                    phone: '',
                    loading: false,
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


            <button className="btn btn-outline-primary">Create Ngo</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add Ngo details" description={`G'day ${isAuth().name}, ready to add Ngo details?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
