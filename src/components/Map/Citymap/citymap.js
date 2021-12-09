import React, { Component, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import ncbounder from "../../../data/Enriched_neighborhood_councils.json";
import ncbounder from "../../../data/Enriched_NCs_w_vz_crashes2.geojson";
import bbox from "@turf/bbox";
import Optionsfield from "./citymap_options";
import Legend from "./citymap_legend";
import {mapboxaccess} from "../../../ignore.js";

import "./citymap.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiamF3c2h2IiwiYSI6ImNrNnZmYncwdjAxYjAzcG16ZG1zaXY4NmoifQ.o6Dleq9Ibuv2JSXw9JDZcw';

const CityMap = () => {
  console.log("changemap");

  const options = [
    // {
    //   name: "Pedestrian Crashes",
    //   description:
    //     "Acre(s) of park per 1,000 people. The Median large city in the US has 6.8 acres per 1,000 people.",
    //   property: "Pedestrian_inv_crashes",
    //   stops: [
    //     [0, "#5cd043"],
    //     [50, "#cbf087"],
    //     [100, "#f0e087"],
    //     [500, "#f2a641"],
    //     [1000, "#eb6314"],
    //   ],
    //   after: " Crashes",
    // },
    // {
    //   name: "Bike Crashes",
    //   description:
    //     "Acre(s) of park per 1,000 people. The Median large city in the US has 6.8 acres per 1,000 people.",
    //   property: "BIke_inv_Crashed",
    //   stops: [
    //     [0, "#5cd043"],
    //     [50, "#cbf087"],
    //     [100, "#f0e087"],
    //     [500, "#f2a641"],
    //     [1000, "#eb6314"],
    //   ],
    //   after: " Crashes",
    // },

    {
      name: "Park per Capita",
      description:
        "Acre(s) of park per 1,000 people. The Median large city in the US has 6.8 acres per 1,000 people.",
      property: "Acres_1k",
      stops: [
        [0, "#eb6314"],
        [1, "#f2a641"],
        [5, "#f0e087"],
        [10, "#cbf087"],
        [40, "#5cd043"],
      ],
      after: " acres",
    },

    {
      name: "Tree Cover",
      description:
        "Percent of NC with shade providing Tree Cover",
      property: "Enriched_NCs_w_vz_tree_% Tree Cover",
      stops: [
        [10, "#eb6314"],
        [20, "#f2a641"],
        [30, "#f0e087"],
        [40, "#cbf087"],
        [50, "#5cd043"],
      ],
      after: "%",
    },

    {
      name: "Median Income",
      description: "Estimated Area Median Income per Census Data",
      property: "MEDHINC_CY_1",
      stops: [
        [30000, "#eb6314"],
        [50000, "#f2a641"],
        [70000, "#cbf087"],
        [90000, "#97f087"],
        [110000, "#5cd043"],
      ],
      before: "$",
    },
    {
      name: "Traffic Fatalities",
      description:
        "Number of deaths due to traffic violence since 2015 (beginning of Vision Zero)",
      property: "Killed",
      stops: [
        [0, "#5cd043"],
        [10, "#cbf087"],
        [20, "#f0e087"],
        [30, "#f2a641"],
        [40, "#eb6314"],
      ],
      after: " Killed",
    },

    {
      name: "Traffic Injuries",
      description:
      "Number of injuries caused by traffic violence since 2015 (beginning of Vision Zero)",
      property: "Injured",
      stops: [
        [500, "#5cd043"],
        [1000, "#cbf087"],
        [2000, "#f0e087"],
        [5000, "#f2a641"],
        [10000, "#eb6314"],
      ],
      after: " Injured",
    },
    {
      name: "Percent BIPOC",
      description: "Percent BIPOC per Census Data",
      property: "Fixed_%_BIPOC",
      stops: [
        [0, "#befdf7"],
        [25, "#9bd8f0"],
        [50, "#7fb4ec"],
        [75, "#697ce3"],
        [100, "#7c5dd9"],
      ],
      after: "%",
    },
  ];


  const mapContainerRef = useRef(null);
  const [active, setActive] = useState(options[0]);
  const [map, setMap] = useState(null);




  let isReport = window.location.pathname === "/" ? true : false;

  // Initialize map when component mounts
  useEffect(() => {

    let map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/jawshv/ckmy6hprt171m17pipdaadg63",
      // center: [-118.4, 34],
      // zoom: 9.5,
      maxZoom: 11,
      minZoom: 9,
      dragPan: !isReport,
      dragRotate: !isReport,
      scrollZoom: !isReport,
      boxZoom: !isReport,
      zoomControl: !isReport,
      doubleClickZoom: !isReport,
    });
  

    map.on("load", () => {
      map.addSource("ncbounder", {
        type: "geojson",
        data: ncbounder,
      });

      map.addLayer({
        id: "ncbound",
        type: "fill",
        source: "ncbounder",
        paint: {
          "fill-outline-color": "#ffffff",
        },
      });

      map.setPaintProperty("ncbound", "fill-color", {
        property: active.property,
        stops: active.stops,
      });

      // add tooltip when users mouse move over a point
      map.on("click", "ncbound", function (e) {
        console.log(e.features[0].properties)
        console.log(active.property)
        const ExploreLink = isReport ? '/nc/' + e.features[0].properties.Link : '/nc/' + e.features[0].properties.Link
        const description =
          `<b>${e.features[0].properties.Name}</b><br/>
          <a href='${ExploreLink}'>Explore NC →</a>
          `;

        new mapboxgl.Popup({
          closeButton: false,
        })
          .setLngLat(e.lngLat)
          .setHTML(description)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "ncbound", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      map.fitBounds( [
        [-118.67196452112842, 34.36053111813318],
        [-118.11163337331723, 33.67626367599289] // southwestern corner of the bounds

      ]);

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "ncbound", function () {
        map.getCanvas().style.cursor = "";
      });

      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), "top-right");
      setMap(map);
    });

    

    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty("ncbound", "fill-color", {
        property: active.property,
        stops: active.stops,
      });
    }
  };

  const changeState = (i) => {
    setActive(options[i]);
    map.setPaintProperty("ncbound", "fill-color", {
      property: active.property,
      stops: active.stops,
    });

  };

  return (
    <div className="city-map">
      {isReport ? <Link to="/nc"><button class="mapOut">Explore Full Map</button></Link> : ""}
      <div className="city-map-container" ref={mapContainerRef} />
      <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      />
      <Legend active={active} stops={active.stops} />
    </div>
  );
};

export default CityMap;
