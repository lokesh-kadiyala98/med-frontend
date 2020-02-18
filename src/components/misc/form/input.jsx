import React from 'react';

const Input = ({ type, name, label, value, error, onChange, placeholder, className }) => {
    return ( 
        <div className="mb-3">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{label}</span>
                </div>    
                <input
                    type={type} 
                    name={name}
                    value={value}
                    onChange={onChange}
                    id={name}
                    className="form-control form-control-md"
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default Input;