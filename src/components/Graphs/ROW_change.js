import { React, useRef, useState, useEffect } from "react";

const existing = {
    People: .179,
    Hybrid: 0,
    Cars: .881,
}

const planned = {
    People: .722,
    Hybrid: .1693,
    Cars: .1084,
}



function ExistingRowChart() {
    const ref = useRef(850);
    useEffect(() => {
        console.log(ref.current ? ref.current.offsetheight : 0);
    }, [ref.current]);

    return (
        <div className="customBlock">
        <h4>Existing Public Right of Way distribution in the City of LA</h4>
    <div ref={ref} className="ROW_div">
       <div className="access" style={{height: ROW.Streets * 400}}>
       <p>72.2% of public ROW is taken up by car lanes for driving</p>
       {/* 2,150,121,600 sq ft  */}
       </div>
       <div className="orange" style={{height: ROW.Parking * 400}}>
       <p>16.9% of public ROW is taken up by on-street car parking</p>
       {/* 408,375,000 sq ft  */}
       </div>
       <div className="productive" style={{height: ROW.Sidewalk * 400 }}>
       <p> 10.8% of public ROW is taken up by sidewalks </p>
       {/* 261,360,000 sq ft  */}
       </div>
       <div className="green" style={{height: ROW.ProtectedBikeLanes * 400 }}></div>
       <div className="healthy" style={{height: ROW.BusLanes * 400 }}>
       </div>
    </div>
    <br></br>
    The last two uses, which are almost too small to see, belong to <span className="v green"> Bike Lanes (0.9%)</span> and <span className="v healthy"> Bus Lanes (0.07%)</span>.
    </div>
    );
}

export default ExistingRowChart;