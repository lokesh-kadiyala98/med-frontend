import React from 'react';

const Input = ({ type, name, kannadaLabel, label, value, error, onChange, placeholder, className }) => {
    return ( 
        <div className={className}>
            <label htmlFor={name}>{kannadaLabel} <br/> {label}</label>
            {/*In react, to access an html element value. We use ref, a JSX attr 
            instead of document object as in plain javascript. */}
            <input
                type={type} 
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                id={name}
                className="form-control form-control-md"
            />
                {/*Truesy Notation. If there are errors show an info box.*/}
                {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default Input;