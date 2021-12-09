import React, {
  Component,
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
} from "react";
import { Pie } from "react-chartjs-2";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import "./nc.css";
import Geodata from "../../data/Public-Space-Data";
import NC_Map from "./SelectNC/nc_map.js";
import Nclist from "./SelectNC/ncList.js";
import CityMap from "./Citymap/citymap";
import SelectNC from "./SelectNC/SelectNC";
import Ncbounder from "../../data/Enriched_NCs_w_vz_crashes2.json";

class NC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    console.log("nc built");
    // find current url path, connect data

    const locs = this.props.location.pathname;

    if (locs.length > 4) {
      const loc = this.props.location.pathname.split("/");
      const current_location = loc[loc.length - 1];

    
      const ncArray = Ncbounder.features;

      const obj = ncArray.find((o, i) => {
        return o?.properties?.Link === current_location;
      });

      return (
        <div className="nc">
          <div className="nc-select">
            <div class="ncmaptip">Seeing visual errors? Try zooming in or out.</div>
            <NC_Map currentnc={obj.properties["Name"]} />
            <SelectNC obj={obj} ncArray={ncArray} />
          </div>
          <Nclist Geodata={Geodata} />
        </div>
      );
    } else {
      return (
        <div className="nc">
            <Link class="navButton" to="/">Home</Link>
          <CityMap />
          <Nclist Geodata={Geodata} />
        </div>
      );
    }
  }
}

export default withRouter(NC);
