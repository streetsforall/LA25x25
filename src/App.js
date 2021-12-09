import { React, prevstate, props, useState, useEffect, useCallback } from "react";
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import ReportHeader from './components/Header/reportHeader.js';
import ExistingRowChart from './components/ExistingRow/ExistingRowChart';
import GoalGrid from './components/GoalGrid.js';
import { HashLink as Link } from 'react-router-hash-link';
import Allocations from './components/Allocations/Allocations';
import visionZeroGraph from './components/Graphs/visionZeroGraph.js'
import BeforeAfter from "./components/BeforeAfter/BeforAfter.js";
import EffectsGrid from "./components/EffectsGrid/EffectsGrid.js";
import query from "./components/query";
import Equity from "./components/Graphs/Equity.js";
import ScrolltoTop from "./components/ScrolltoTop.js";
import Coalition from "./components/coalition/Coalition.js";
import streetCapactiyGraph from "./components/Graphs/streetCapacityGraph.js";
import {Space_Id, G_analytics, Access_Token } from "./ignore.js";
import CityMap from "./components/Map/Citymap/citymap";
import NC_Map from "./components/Map/SelectNC/nc_map.js";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

import NC from "./components/Map/nc.js";
import "./App.css";
import "./Mobile.css";
import ReactGA from 'react-ga';
import {Helmet} from "react-helmet";

var history = createBrowserHistory();

ReactGA.initialize(G_analytics, [])

const componentList = [
  ReportHeader,
  ExistingRowChart,
  GoalGrid,
  Allocations,
  visionZeroGraph,
  BeforeAfter,
  EffectsGrid,
  streetCapactiyGraph,
  CityMap
]

ReportHeader.displayName = 'ReportHeader'
ExistingRowChart.displayName = 'ExistingRowChart'
GoalGrid.displayName = 'GoalGrid'
Allocations.displayName = 'Allocations'
visionZeroGraph.displayName = 'visionZeroGraph'
BeforeAfter.displayName = 'BeforeAfter'
EffectsGrid.displayName = 'EffectsGrid'
streetCapactiyGraph.displayName = 'streetCapactiyGraph'
CityMap.displayName = 'CityMap'


function renderOptions(links) {

  // create an asset map
  const assetMap = new Map();
  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }
  const entryMap = new Map();
  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry);
  }

  return {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },

    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,

      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {

        const entry = entryMap.get(node.data.target.sys.id);

        if (entry.__typename === "CustomBlock") {
          return componentList.map((Comp) => {
            if (entry.name === Comp.displayName) {
              return (
                <Comp />
              )
            }
          });
        };

        if (entry.__typename === "EffectsGrid") {
          return (
            <EffectsGrid intro={entry.intro} effect={entry.effectsCollection.items} />
          )
        };

        if (entry.__typename === "AllocationBucket") {
          return entry.allocationsCollection.items.map((allocations) => {
            return (
              <Allocations e={allocations} />
            )
          })
        };

        if (entry.__typename === "PullQuote") {
          return (
            <h2 className="PullQuote">
              {/* <a target="_blank" href={entry.link}>SOURCE</a> */}
              "{entry.quote}"
            </h2>
          )
        };

        if (entry.__typename === "SubParagraph") {
          return (
            <div class="data full_width">
              <div id="Data" class="">
                {documentToReactComponents(entry.richText.json)}
              </div>
            </div>
          )
        };

        if (entry.__typename === "Goals") {
          return (
            <GoalGrid content={entry} />
          )
        };

        if (entry.__typename === "Cells") {
          return (
            <h2>{entry.title}</h2>
          );
        }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        const asset = assetMap.get(node.data.target.sys.id);
        return (
          <div class="image">
            <img class={asset.contentfulMetadata.tags[0] ? asset.contentfulMetadata.tags[0].name : ''} src={asset.url} alt="My image alt text" />
            <sub>{asset.description}</sub>
          </div>
        );
      },
    },
  };
}

const Bold = ({ children }) => <b>{children}</b>;
const Text = ({ children }) => <p className="">{children}</p>;
const H2 = ({ children }) => <h2 id={children[0].split(' ').join('_')}>{children}</h2>;

async function fetchData() {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${Space_Id}/environments/master`,
    {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${Access_Token}`,
      },
      body: JSON.stringify({ query }),
      method: "POST"
    }
  );
  const body = await response.json();
  return body.data
}

function App() {
  const [document, setdocument] = useState(null);

  useEffect(() => {
    fetchData().then(data => {
      setdocument(data);
    })
  }, [setdocument]);

  const [language, setlanguage] = useState("English");

  const changeLinkText = () => {
    setlanguage((language) => language === "Español" ? "English" : "Español");

  };

  const history = createBrowserHistory();
  history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
  


  const englishBody = document ? documentToReactComponents(document.english.items[0].basicField.json, renderOptions(document.english.items[0].basicField.links)) : "";
  const spanishBody = document ? documentToReactComponents(document.spanish.items[0].basicField.json, renderOptions(document.spanish.items[0].basicField.links)) : "";

  return (
    <Router history={history}>
      <Route path="/" render={({location}) => {
  if (typeof window.ga === 'function') {
    window.ga('set', 'page', location.pathname + location.search);
    window.ga('send', 'pageview');
    console.log(location.pathname + location.search)
  }
  return null;
}} />
<Helmet>
                <meta charSet="utf-8" />
                <title>LA 25x25</title>
                <link rel="canonical" href="http://la25x25.com" />
                <meta property="og:title" content="LA 25x25" />
                <meta property="og:image" content="https://la25x25.com/img/thumb.jpg" />
                <meta
                name="description"
                content="A challenge to the next leaders of Los Angeles to build a more accessible, green, healthy, and productive city by giving space back to people"/>

                <meta name="twitter:title" content="LA 25x25"/>
                <meta name="twitter:description"content="A challenge to the next leaders of Los Angeles to build a more accessible, green, healthy, and productive city by giving space back to people"/>
                <meta name="twitter:image" content="https://la25x25.com/img/thumb.jpg"/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Helmet>
      <Switch>
        

        <Route path="/coalition">
        {ReactGA.pageview(window.location.pathname)}
          <ScrolltoTop>
            <Coalition e={document ? document.coalitionCollection : ""} />
          </ScrolltoTop>
        </Route>

        <Route path="/nc/">
          <NC />
        </Route>

        <Route path="/">
          {ReactGA.pageview(window.location.pathname)}
          <ReportHeader changeLinkText={changeLinkText} language={language} />
          <div className="App">
            {language === "English" ? englishBody : spanishBody}
          </div>
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
