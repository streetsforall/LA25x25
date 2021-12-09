import React, { Component, useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

const Nclist = ({ Geodata}) => {

    return (

        <div className="nc-list">
            <div className="nc-cell">
                <span>Explore a Neighborhood Council:</span>
            </div>
            
        {Geodata.sort((a, b) => {
            return a.properties["NC name"][0] > b.properties["NC name"][0];
        }).map((e, i) => {
            return (
                <div key={i} className="nc-cell">
                    <Link to={"/nc/" + e.properties["Link"]}>
                        {e.properties["NC name"]}
                    </Link>
                </div>
            );
        })}
    </div>
)
}

export default Nclist;
