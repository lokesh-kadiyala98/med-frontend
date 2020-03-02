import React from 'react';

const Card = ({ img, cardBody, cardTitle }) => {
    return ( 
        <div className="card">
            <img className="card-img-top img-fluid" src={img} alt="" />
            <div className="card-body">
            <h4 className="card-title">{cardTitle}</h4>
            <ul>
                <p className="card-text">
                        {cardBody.split(', ').map((item, index) => 
                            <li key={index} className='mb-1 point'>{item}</li> 
                        )}        
                </p>
            </ul>
            </div>
        </div>
    );
}
 
export default Card;