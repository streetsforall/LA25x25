
import React from "react";

const Legend = (props) => {
  const renderLegendKeys = (stop, i) => {
    return (
      <div key={i} className="">
        <span
          className="city-legend-dot"
          style={{ backgroundColor: stop[1] }}
        />
        <span>{props.active.before}{`${stop[0].toLocaleString()}`}{props.active.after}</span>
      </div>
    );
  };

  return (
    <>
      <div className="city-legend">
        <div>
          <h3 className="">{props.active.name}</h3>
          <p className="sub">{props.active.description}</p>
        </div>
        {props.stops.map(renderLegendKeys)}
      </div>
    </>
  );
};

export default Legend;