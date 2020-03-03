import React from 'react';
import Card from './../card';
import BeerCard from './../beerCard';

const Radio = ({ name, label, value, options, error, onChange }) => {
    return ( 
        <div className='mb-3 radio-container'>
            <span className='pl-3'>{label}</span>
            {!options[0][0].liquid ? 
                options.map((option, index) => 
                    <li style={{width: 1/options.length * 100 + '%'}} key={option[0]._id} >
                        <input type='radio' value={index + 1} checked={parseInt(value) === index + 1 ? true : false} onChange={onChange} name={name} id={option[0]._id} />
                        <label htmlFor={option[0]._id}>
                            <Card img={option[0].img} cardTitle={option[0].cardTitle} cardBody={option[0].cardBody} />
                        </label>
                    </li>
                ) :
                options.map((option, index) => 
                    <li style={{width: 1/options.length * 100 + '%'}} key={option[0]._id} >
                        <input type='radio' value={index + 1} checked={parseInt(value) === index + 1 ? true : false} onChange={onChange} name={name} id={option[0]._id} />
                        <label htmlFor={option[0]._id}>
                            <BeerCard liquid={option[0].liquid} cardTitle={option[0].cardTitle} cardBody={option[0].cardBody} />
                        </label>
                    </li>
                )   
            }
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default Radio;