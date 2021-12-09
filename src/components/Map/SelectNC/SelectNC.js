import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Tooltip from "./tooltip";
import Wafflechart from "./waffle.js"
import './SelectNC.css'
import ReactTooltip from "react-tooltip";

const SelectNC = ({ obj, ncArray }) => {
  const [Allnc] = useState(ncArray);

  const chain = [
    "city_Parks_acres",
    "Sidewalk_Acres",
    "Fixed_Road_Acres",
    "TOTPOP_CY_1",
    "MEDHINC_CY_1",
    "ACSHHBPOV",
    "Area_Acres",
    "Acres_1k",
    "New_Percent_Road",
    "New_Percent_Park",
    "Killed",
    "Enriched_NCs_w_vz_tree_% Tree Cover",
    "Perc_non_white"
  ];

  // function to build ranks

  const ranked = [];

  chain.forEach((i) => {
    const e = ncArray.map(function (n) {
      return n?.properties?.[i];
    });
    e.sort(function (a, b) {
      return a - b;
    });
    let newranked = (e.indexOf(obj?.properties?.[i])+1) + "/" + e.length;
    ranked.push(newranked);
  });

  console.log(ranked);

  const Name = obj.properties["Name"];
  const Park = obj.properties["city_Parks_acres"].toFixed(1);
  const Parkrank = ranked[0];
  const Walk = obj.properties["Sidewalk_Acres"].toFixed(1);
  const Road = obj.properties["Fixed_Road_Acres"].toFixed(1);
  const Pop = obj.properties["TOTPOP_CY_1"].toFixed(0);
  const Poprank = ranked[3];
  const Income = obj.properties["MEDHINC_CY_1"].toFixed(0);
  const Incomerank = ranked[5];
  const Area = obj.properties["Area_Acres"].toFixed(0);
  const Arearank = ranked[8];
  const cap1k = obj.properties["Acres_1k"].toFixed(2);
  const cap1kRank = ranked[9];
  const PercRoad = obj.properties["New_Percent_Road"];
  const PRoadrank = ranked[10];
  const PercPark = obj.properties["New_Percent_Park"];
  const PParkrank = ranked[11];
  const Killed = obj.properties["Killed"];
  const Injured = obj.properties["Injured"];
  const TreeCover = obj.properties["Enriched_NCs_w_vz_tree_% Tree Cover"];
  const ParkNeed = ((1 - cap1k / Pop *1000)* (Pop /1000)).toFixed(1);
  const Bipoc = obj.properties["Fixed_%_BIPOC"];

  const table = {
    labels: ["Streets", "Parks", "Sidewalks"],

    tablesets: [
      {
        table: [Road, Park, Walk],
        backgroundColor: ["#c16270", "#008000", "#FFCE56"],
      },
    ],
  };

  const options = {
    elements: {
      arc: {
        borderWidth: 0.5,
      },
    },
    tooltips: {
      callbacks: {
        afterLabel: (item) => `${item.yLabel} Acres`,
      },
    },
  };

  return (
    <div className="nc-select-info">
                  <ReactTooltip />
                  <div class="ncnavButton">
      <Link  to="/">Home</Link> 
      <Link  to="/nc/"> City Map</Link>
      </div>
      <h3>{Name}</h3>
      <Wafflechart Park={Park} Walk={Walk} Road={Road} />
      <table>
        <tr>
          <th>NC Statistics:</th>
          <th></th>
          {/* <th style={{ color: "grey", fontWeight: "300", fontSize: ".8em"}} >Rank</th> */}
        </tr>

        <tr>
          <td data-tip="The Median large city in the US has 6.8 acres of park per 1,000 people."> Park space per 1K people: ⓘ
          </td>
          <td className="table">
            {cap1k} Acres
            </td>
          {/* <td className="rank"> {cap1kRank}</td> */}
        </tr>
        <tr>
          <td data-tip="Additional acres of park needed for the neighborhood council to meet 1 acre per 1k people benchmark.">Minimum New Park Need: ⓘ
          </td>
          <td className="table">
            
            { cap1k < 1 ? ParkNeed : 0 } Acres          </td>
        </tr>
        <tr>
          <td>Road Coverage:</td>
          <td className="table">{(PercRoad).toFixed(1)}%</td>
            {/* <td className="rank">{PRoadrank}</td> */}
        </tr>
        <tr>
          <td>Tree Cover:</td>
          <td className="table">{TreeCover.toFixed(1)} %</td>
          {/* <td className="rank"> {Arearank}</td> */}
        </tr>
        <tr>
          <td> Median Income:</td>
          <td className="table">
            ${(Income * 1).toLocaleString("en")}          </td>
            {/* <td className="rank"> {Incomerank}</td> */}
        </tr>
        <tr>
          <td> Population:</td>
          <td className="table">
            {(Pop * 1).toLocaleString("en")}</td>
            {/* <td className="rank"> {Poprank}</td> */}
        </tr>
        <tr>
          <td>Percent BIPOC</td>
          <td className="table">{(Bipoc).toFixed(1)}%</td>
          {/* <td className="rank"> {Arearank}</td> */}
        </tr>
        <tr>
          <td>NC Area:</td>
          <td className="table">{(Area * 1).toLocaleString("en")} Acres</td>
          {/* <td className="rank"> {Arearank}</td> */}
        </tr>
        <tr>
          <td>Traffic Fatalities:</td>
          <td className="table">{Killed} killed</td>
          {/* <td className="rank"> {Arearank}</td> */}
        </tr>
        <tr>
          <td>Traffic Injuries:</td>
          <td className="table">{Injured.toLocaleString("en")} injured</td>
          {/* <td className="rank"> {Arearank}</td> */}
        </tr>
      </table>

    </div>
  );
};

export default SelectNC;
