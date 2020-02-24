import React from 'react';

const LinkBox = ({ body, icon, bgClr,  fntClr}) => {
    return ( 
        <div className="card p-2 dashboard-card" style={{color: fntClr, backgroundColor: bgClr}}>
            <blockquote className="card-bodyquote">
                <p>{body} {icon}</p>
            </blockquote>
        </div>
    );
}
 
export default LinkBox;