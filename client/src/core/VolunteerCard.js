import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {ShowImage,ShowCertificateImage,ShowScheduleImage} from './ShowImage';
import {ratingupdate } from './apiCore';

let ratefinal = 0;
const VolunteerCard = ({
  product,showViewProductButton = true
}) => {
  const [ratingvalue, setrating] = useState({});
  const [success, setSuccess] = useState(false);
  const showViewButton = (showViewProductButton) => {
  
    return(
      showViewProductButton && (
        <Link to={`/Ngo/${product._id}`} className="mr-2" >
   
        <button className="btn btn-outline-primary mt-2 mb-2">
        View NGO
       </button>
       </Link>
      )
    )
  }
  const amountclickSubmit = event => {
    event.preventDefault();
    console.log("rating value",ratingvalue);
   ratefinal =  (parseInt(ratingvalue) + (product && product.rating)*(product && product.count))/(product && product.count + 1)
    console.log("rating value",ratefinal);
    ratingupdate(product._id,ratefinal,product && product.count + 1).then(data => {
      //if (data.error) {
      //    setError(data.error);
      //} else {
      //    setError("");
      //    setSuccess(true);
      //}
      //setError("");
      setSuccess(true);
  });

};

const showSuccess = () => {
  if (success) {
      return <h3 className="text-success">Rated Successfully</h3>;
  }
};
const handleChangeamount = e => {
 setrating(e.target.value);

};


  const rating = () => (
    <form>
        <div className="form-group">
            <label className="text-muted">Rating</label>
            <input onChange={handleChangeamount} value={ratingvalue}  placeholder="Enter number between 1 to 10" type="number" className="form-control" />
        </div>


        <div>
       
            <button className="btn btn-primary" onClick={amountclickSubmit}>
                Save
            </button>
           
        </div>
    </form>
);

  return (
    
    <div className="card ">
      <div className="card-header ">{product.name}</div>
      <div className="card-body">
          <p mt-4> Week Schedule</p>
          <ShowScheduleImage item ={product} url= "ngo" />
          <h2>Please Rate the Ngo after visiting  </h2>
      </div>
      {showSuccess()}
      {rating()}
    </div>
  );
};

export default VolunteerCard;