import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCategories,getFilteredProducts} from './apiCore';
import Checkbox from './Checkbox';
import {ratings} from './fixedRating';
import RadioBox from './RadioBox';




const Ngocard = () => {
    const [myFilters, setMyFilters] = useState({
        filters:{category: [], rating:[]}
    });
    const [categories,setcategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
               setcategories(data)
            }
                
        });
    };
    const loadFilteredResults = newFilters => {
       // console.log(newFilters);
       getFilteredProducts(skip,limit,newFilters).then(data => {
           if(data.error){
               setError(data.error);
           }else{
               setFilteredResults(data.data);
               setSize(data.size)
               setSkip(0)

           }
       });
    };

    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProducts(toSkip,limit,myFilters.filters).then(data => {
            if(data.error){
                setError(data.error);
            }else{
                setFilteredResults([...filteredResults,...data.data]);
                setSize(data.size)
                setSkip(0)
 
            }
        });
     };

     const LoadMoreButton = () => {
         return(
             size > 0 && size >= limit && (
             <button onClick={loadMore} className ="btn btn-warning mb-5" >Load more</button>
             )
         )
     }


    useEffect(() => {
        init();
        loadFilteredResults(skip,limit,myFilters.filters);
    }, []);

    const handleFilters = (filters,filterBy) => {
       //console.log("ngo",filters,filterBy);
       const newFilters = {...myFilters}
       newFilters.filters[filterBy] = filters;
       if(filterBy == "rating"){
           let ratingValues = handleRating(filters);
           newFilters.filters[filterBy] = ratingValues;
       }
       loadFilteredResults(myFilters.filters);
       setMyFilters(newFilters);
    };
    
    const handleRating = value => {
        const data = ratings
        let array = [];
        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return array;

    };

   
    return ( <Layout
        >
          <div className="jumbotron ">
            <h2 >Ngo card search</h2>
            <p className="lead">Search and find Ngo of your choice</p>
            </div>
            <div className = "row">
                <div className = "col-4">
                    <h4>Filter by categories</h4>
                   <ul>
                       <Checkbox categories={categories}
                        handleFilters = {filters => 
                        handleFilters(filters,"category")} />
                   </ul>
                   <h4>Filer by rating</h4>
                   <div>
                       <RadioBox ratings = {ratings}
                        handleFilters = {filters => 
                        handleFilters(filters,"rating")} />
                   </div>
                </div>
                <div className = "col-8">
                   <h2 className="mb-4" >Ngos</h2>
                   <div className="row" >
                      {filteredResults.map((product,i) => (
                          <div key={i} className="col-6 mb-3">
                               <Card product={product}/>
                          </div>

                      ))}
                   </div>
                   <hr/>
                   {LoadMoreButton()}
                </div>

            </div>
            
        </Layout>)
}

export default Ngocard;