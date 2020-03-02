import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
    return ( 
        <div className="mb-3">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{label}</span>
                </div>    
                <select name={name} id={name} {...rest} className="form-control">
                    <option value="" />
                    {options.map((option) =>  
                        <option key={option[0]._id} value={option[0].value}>{option[0].name}</option>)
                    }
                </select>    
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};
 
export default Select;