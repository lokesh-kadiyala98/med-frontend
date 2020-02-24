import React from 'react';

const Card = ({ img, cardBody, cardTitle }) => {
    return ( 
        <div className="card">
            <img className="card-img-top img-fluid" src={img} alt="" />
            <div className="card-body">
            <h4 className="card-title">{cardTitle}</h4>
                <p className="card-text">{cardBody}</p>
            </div>
        </div>
    );
}
 
export default Card;