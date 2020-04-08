import React from 'react';
import { Link } from 'react-router-dom'

const LinkBar = ({ to, backgroundColor, color, header }) => {
    return ( 
        <Link to={to} style={{ textDecoration: 'none' }}>
            <div className='p-4 mb-3 forecast-options' style={{backgroundColor: backgroundColor, color: color}}>
                <h4>{header}</h4>
                <i className="far fa-arrow-alt-circle-right"></i>
            </div>
        </Link>
     );
}
 
export default LinkBar;