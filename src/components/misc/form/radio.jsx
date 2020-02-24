import React from 'react';
import Card from './../card';

const Radio = ({ name, label, options, error, ...rest }) => {
    return ( 
        <div className='mb-3'>
            {options.map(option => 
                <li key={option[0]._id}>
                    <input type='radio' name={option[0].name} id={option[0]._id} />
                    <label htmlFor={option[0]._id}>
                        <Card img={option[0].img} cardTitle={option[0].cardTitle} cardBody={option[0].cardBody} />
                    </label>
                </li>
            )}
        </div>
    );
}
 
export default Radio;