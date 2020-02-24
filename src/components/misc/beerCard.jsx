import React from 'react';

import '../resources/css/beer.css'

const BeerCard = ({ liquid, cardTitle, cardBody }) => {
    var emptyHeight = 250 * ((100 - liquid) / 100)
    var liquidHeight = 250 * (liquid / 100)
    return ( 
        <div className="card">
            <div className="beer-glass">
                <div className="empty" style={{height: emptyHeight + 'px'}}></div>
                <div className="liquid" style={{height: liquidHeight + 'px'}}>
                    <div className="bubble bubble1"></div>
                    <div className="bubble bubble2"></div>
                    <div className="bubble bubble3"></div>
                    <div className="bubble bubble4"></div>
                    <div className="bubble bubble5"></div>
                </div>
            </div>
            <div className="card-body">
            <h4 className="card-title">{cardTitle}</h4>
            <p className='card-text'>
                {cardBody}
            </p>
            </div>
        </div>
    );
}
 
export default BeerCard;