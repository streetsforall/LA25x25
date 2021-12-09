import React, { useState, useEffect, useRef } from 'react'
import './BeforeAfter.css';
import ReactTooltip from "react-tooltip";

const BeforeAfter = () => {

    // const _2021 = {
    //     People: .722,
    //     Hybrid: .1693,
    //     Cars: .1084,
    // }

    // const _2025 = {
    //     People: .722,
    //     Hybrid: .1693,
    //     Cars: .1084,
    // }


    return (
        <div className="beforeafter">

            <div className="beforekey">
                <div className="cars"> Space for cars</div>
                <div className="hybrid"> Hybrid</div>
                <div className="ppl"> Space for people</div>
            </div>

            

            <div className="before-graph">

                
                2021
                <div className="before">
                    <div data-tip="88%" className="cars"></div>
                    <div data-tip=".4%" className="hybrid"></div>
                    <div data-tip="12%" className="ppl"></div>
                </div>

                2025 Proposal
                <div className="after">

                    <div data-tip="67%" className="cars"></div>
                    <div data-tip="12%" className="hybrid"></div>
                    <div data-tip="21%" className="ppl"></div>
                </div>

                <div className="twofivepercent"></div>

            </div>
            <ReactTooltip />

        </div>
    )
}

export default BeforeAfter;