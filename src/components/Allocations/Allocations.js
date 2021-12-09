import React, { state, useState, useEffect, useRef } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
    BrowserRouter as Router,
    useLocation,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./Allocations.css";

function Allocations({ e }) {

    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(s => !s);

        show ? document.body.style.overflowY = 'unset' : document.body.style.overflowY = 'hidden';
    }
    
    return (
        <>
        <div className="bucket">

            <img className="bucket_img" src={e.image ? e.image.url : ""} />

            <h4>{e.title}</h4>
           
            <sub>{e.acres} Acres • {(e.acres / 55360 * 100).toFixed(1)}% of all Public ROW</sub>

            {e.shortContent ? documentToReactComponents(e.shortContent.json) : ""}

            {/* {show ?
            <>
                <div class="modal">
                    <button onClick={handleClick}>X</button>
                    <div class="modal_copy">
                        <h4>{e.title}</h4>
                        <sub>{e.acres} Acres • {(e.acres / 55360 * 100).toFixed(1)}% of all Public ROW</sub>
                        {documentToReactComponents(e.shortContent.json)}
                        {e.longContent ? documentToReactComponents(e.longContent.json) : ""}
                    </div>
                </div> 
            </> : ""} */}
            {/* <button onClick={handleClick}>Learn More</button> */}

        </div>
        </>
    );
}


export default Allocations;