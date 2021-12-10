import React, {
  Component,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import ncbounder from "../../../data/Enriched_neighborhood_councils.json";
// import ncwalkshed from "../../../data/10min-park-walksheds-merged-extracted.json";
// import ncbounder from "../../../data/Enriched_neighborhood_councils";
import ncbounder from "../../../data/Enriched_NCs_w_vz_crashes2.json";
import ncroads from "../../../data/merged_roads_compressed.geojson";
import ncparks from "../../../data/city_Parks.geojson";
import bbox from "@turf/bbox";
import difference from "@turf/difference";
import {mapboxaccess} from "../../../ignore.js";

mapboxgl.accessToken = mapboxaccess;

const earth = {
  "type": "Polygon", "coordinates": [
    [[-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90]]
  ]
};

const NC_Map = ({ currentnc }) => {


  const mapContainerRef = useRef(null);

  const mapRef = useRef(null);

  useEffect(() => {

    let map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/jawshv/ckkaf3wzh0fkf17muxd04ui0l",
      center: [241.8, 34],
      zoom: 7,
      pitch: 20, // pitch in degrees
      bearing: -20, // bearing in degrees
      maxZoom: 15,
      minZoom: 10,
      antialias: true,
    });
    
    const obj = ncbounder.features.find((o, i) => {
      return o?.properties?.Name === currentnc
    })

    let nc_inv = difference(
      earth,
      obj.geometry
    );

    console.log("mapbox initiated");

    // Register Mapbox 'onload' callback
    map.on("load", () => {
      map.resize();
      // Load source data once on load
      // Boundaries

      map.addSource("ncbound", {
        type: "geojson",
        data: nc_inv,
      });

      map.addSource("ncroads", {
        type: "geojson",
        data: ncroads,
        tolerance: 0.001,
      });

      map.addSource("ncparks", {
        type: "geojson",
        data: ncparks,
      });

      map.addLayer({
        id: `${currentnc}_parks`,
        type: "fill",
        source: "ncparks",
        paint: {
          "fill-color": "#18b818",
          "fill-opacity": .6,
        },
        // filter: ["==", "Name_2", currentnc],
      });

      map.addLayer({
        id: `${currentnc}_roads`,
        type: "fill",
        source: "ncroads",
        paint: {
          "fill-color": "#e95757",
          "fill-opacity": .8,
        },
        filter: ["==", "Name_2", currentnc],
      });

      map.addLayer({
        id:`${currentnc}_bound`,
        type: "fill",
        source: "ncbound",
        paint: {
          "fill-color": "black",
          'fill-opacity': .5,
        },
      });

      // Assign map to ref
      mapRef.current = map;

     let bboxed = bbox(obj.geometry);

      map.fitBounds(bboxed, {
        padding: {top: 50, bottom:50, left: 50, right: 50}
      });
      
      console.log("map loaded");
    });
  }, []);

  // Called when the selected nc changes
  // currentnc prop is updated
  useEffect(() => {
    document.title = currentnc;
    console.log("new nc: ", currentnc);
    let map = mapRef.current;

    const tempIds = {
      bound: `${currentnc}_bound`,
      bound_l: `${currentnc}_bound_l`,
      roads: `${currentnc}_roads`,
      parks: `${currentnc}_parks`,
      walkshed: `${currentnc}_walkshed`,
    };

    // Check that the ref exists (may not be defined on first render)
    if (map) {

      // Ensure the mapbox API is ready to go, otherwise might error out here, could also get fancy and use try-catch.
      if (map.isStyleLoaded()) {

        const obj = ncbounder.features.find((o, i) => {
          return o?.properties?.Name === currentnc
        })
    
        let new_nc_inv = difference(
          earth,
          obj.geometry
        );

        console.log(new_nc_inv);
        
        map.addLayer({
          id: tempIds.parks,
          type: "fill",
          source: "ncparks",
          paint: {
            "fill-color": "#18b818",
            "fill-opacity": .6,
          },
          // filter: ["==", "Name_2", currentnc],
        });

        map.addLayer({
          id: tempIds.roads,
          type: "fill",
          source: "ncroads",
          paint: {
            "fill-color": "#e95757",
            "fill-opacity": .8,
          },
          filter: ["==", "Name_2", currentnc],
        });

        map.addSource(tempIds.bound_l, {
          type: "geojson",
          data: new_nc_inv,
        });
  
        map.addLayer({
          id: tempIds.bound,
          type: "fill",
          source: tempIds.bound_l,
          paint: {
            "fill-color": "black",
            'fill-opacity': .5,
          },
        });

        map.resize();

        let bboxed = bbox(obj.geometry);

        map.fitBounds(bboxed, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          duration: 2000
        });
      }
    }

    return () => {
      // When currentnc changes, lets remove the old layers
      // implement here...
      if (mapRef.current.getLayer(tempIds.bound))
        mapRef.current.removeLayer(tempIds.bound);
      if (mapRef.current.getLayer(tempIds.roads))
        mapRef.current.removeLayer(tempIds.roads);
      if (mapRef.current.getLayer(tempIds.parks))
        mapRef.current.removeLayer(tempIds.parks);
      if (mapRef.current.getLayer(tempIds.walkshed))
        mapRef.current.removeLayer(tempIds.walkshed);
      if (mapRef.current.getSource(tempIds.bound_l))
      mapRef.current.removeSource(tempIds.bound_l);
    };
  }, [currentnc]);

  return (
    <div className="map-container" ref={mapContainerRef} />
  );
};

export default NC_Map;
