import { React, useRef, useState, useEffect } from "react";
import './ExistingRow.css';

const ROW = {
    Streets: .7587,
    Parking: .1047,
    Sidewalk: .1262,
    BikeLanes: .0096,
    BusLanes: .0008,
    ProtectedBikeLanes: .009,
}


function ExistingRowChart() {
    const ref = useRef(850);
    useEffect(() => {
   
    }, [ref.current]);

    return (
        <div className="customBlock">
            <p><b>Existing Public Right of Way distribution in the City of LA</b></p>
            <div ref={ref} className="ROW_div">
                
                <div className="ROW_car">
                <sub>{(ROW.Streets + ROW.Parking).toFixed(3) * 100}% Space for Cars</sub>
                    <div className="access" style={{ height: ROW.Streets * 500 }}>
                        <p>{ROW.Streets.toFixed(3) * 100}% of public ROW is taken up by car lanes for driving</p>
                    </div>
                    <div className="orange" style={{ height: ROW.Parking * 500 }}>
                        <p>{ROW.Parking.toFixed(3) * 100}% of public ROW is taken up by on-street car parking</p>
                    </div>
                </div>
                <div className="ROW_other">
                <sub>{(ROW.Sidewalk + ROW.BikeLanes + ROW.BusLanes).toFixed(4) * 100}% Space for People</sub>
                    <div className="productive" style={{ height: ROW.Sidewalk * 500 }}>
                        <p> {ROW.Sidewalk.toFixed(3) * 100}% of public ROW is taken up by sidewalks </p>
                    </div>
                    <div className="green" style={{ height: ROW.BikeLanes * 500 }}></div>
                    <div className="healthy" style={{ height: ROW.BusLanes * 500 }}>
                    </div>
                </div>
            </div>
           
           <p> The last two uses, which are almost too small to see, belong to <span className="v green"> Bike Lanes (.98%)</span> and <span className="v healthy"> Bus Lanes (0.08%).</span> It's important to note that these allocations are generous. All bus lanes are peak hour only (around 5 hours a day), and just 6% of all bike infrastructure in the city is protected and comfortable for <a href="https://www.880cities.org/">riders age 8 to 80.</a></p>
        </div>
    );
}

export default ExistingRowChart;