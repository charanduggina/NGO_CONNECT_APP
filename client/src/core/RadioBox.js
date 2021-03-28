import React, {useState,useEffect,Fragment} from 'react' ;


const RadioBox = ({ratings,handleFilters}) => {

    const [value,setValue] = useState(0);

    const handleChange = (event) => {
          handleFilters(event.target.value);
          setValue(event.target.value);
    };

    return ratings.map((r,i)=>(
        <div key={i}>
            <input onChange={handleChange}
             value={`${r._id}`}
             name = {r}
              type="radio"
              className = "mr-2 ml-4"/>
            <label className = "form-check-label">{r.name}</label>
        </div>
    ));
};

export default RadioBox;