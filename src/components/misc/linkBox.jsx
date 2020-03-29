import React from 'react';

const LinkBox = ({ body, icon, bgClr, fntClr, topIcon }) => {
    return ( 
        <div className="card p-2 dashboard-card" style={{color: fntClr, backgroundColor: bgClr}}>
            <span style={{fontSize: '.8rem', position: 'absolute', right: '5%'}}>{topIcon}</span>
            <blockquote className="card-bodyquote">
                <p>{body} {icon}</p>
            </blockquote>
        </div>
    );
}
 
export default LinkBox;