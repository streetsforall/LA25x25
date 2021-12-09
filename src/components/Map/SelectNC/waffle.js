import React, { Component } from "react";

const Wafflechart = ({ Park, Road, Walk }) => {
  const tot = Number(Park) + Number(Road) + Number(Walk);
  const walkwidth = (Walk / tot) * 100;
  const parkwidth = (Park / tot) * 100;
  const roadwidth = (Road / tot) * 100;

  return (
    <div className="waffle">
      <div className="wafflekey">
        <th> Public Space Distribution:</th>
        <p className="parkkey">{Park}  Acres of Park 🌳 <span class="grey">({parkwidth.toFixed(1)} % of Public Space)</span></p>
        <p className="sidekey">{Walk}  Acres of Sidewalk 🚶🏽 <span class="grey">({walkwidth.toFixed(1)} % of Public Space)</span></p>
        <p className="roadkey">{Road}  Acres of Road 🚗 <span class="grey">({roadwidth.toFixed(1)} % of Public Space)</span></p>
      </div>
      <div className="wafflechart">
        <div
          style={{
            background: "var(--green)",
            width: "calc(" + [parkwidth] + "% - 3px)",
          }}
        ></div>
        <div
          style={{
            background: "var(--gold)",
            width: "calc(" + [walkwidth] + "% - 3px)",
          }}
        ></div>
        <div
          style={{
            background: "var(--red)",
            width: "calc(" + [roadwidth] + "% - 3px)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Wafflechart;
