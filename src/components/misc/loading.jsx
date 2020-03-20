import React from 'react';
import '../resources/css/loading.css'

const Loading = () => {
    return ( 
        <div className='container' id="pulse-wrapper">
            <div id="pulse">
                <span></span>
                <span></span>
            </div>
        </div>
    );
}
 
export default Loading;