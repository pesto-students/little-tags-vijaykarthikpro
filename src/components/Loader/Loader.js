import React from 'react';
import './Loader.scss';

export default function Loader() {
    return (<div className="loader-container">
        <div className="loader"> 
            <span className="blue-circle"></span>
            <span  className="transparent-circle"></span>
        </div>
    </div>)
}