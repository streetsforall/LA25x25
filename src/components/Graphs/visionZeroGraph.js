
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  {
    name: "2010",
    Pedestrian: 88,
    Cyclist: 10,
    Motor: 72,
    Motorcyclist: 14,
  },
  {
    name: "2011",
    Pedestrian: 76,
    Cyclist: 7,
    Motor: 52,
    Motorcyclist: 22,
  },
  {
    name: "2012",
    Pedestrian: 91,
    Cyclist: 7,
    Motor: 65,
    Motorcyclist: 35,
  },
  {
    name: "2013",
    Pedestrian: 87,
    Cyclist: 17,
    Motor: 69,
    Motorcyclist: 28,
  },
  {
    name: "2014",
    Pedestrian: 87,
    Cyclist: 6,
    Motor: 66,
    Motorcyclist: 32,
  },
  {
    name: "2015",
    Pedestrian: 88,
    Cyclist: 16,
    Motor: 60,
    Motorcyclist: 34,
  },
  {
    name: "2016",
    Pedestrian: 116,
    Cyclist: 21,
    Motor: 68,
    Motorcyclist: 49,
  },
  {
    name: "2017",
    Pedestrian: 136,
    Cyclist: 18,
    Motor: 57,
    Motorcyclist: 35,
  },
  {
    name: "2018",
    Pedestrian: 132,
    Cyclist: 21,
    Motor: 69,
    Motorcyclist: 23,
  },
  {
    name: "2019",
    Pedestrian: 136,
    Cyclist: 19,
    Motor: 67,
    Motorcyclist: 24,
  },
  {
    name: "2020",
    Pedestrian: 120,
    Cyclist: 15,
    Motor: 68,
    Motorcyclist: 35,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <b>{label} Fatalities</b><br/>
        Total: {payload[0].value+payload[1].value+payload[2].value+payload[3].value}<br/>
        <span className="v healthy">Motorcyclist: {payload[3].value}</span><br/>
        <span className="v orange">Motor: {payload[2].value}</span><br/>
        <span className="access v">Cyclists: {payload[1].value}</span><br/>
        <span className="v green">Pedestrian: {payload[0].value}</span><br/>
       
      </div>
    );
  }

  return null;
};

export default function visionZeroGraph() {
  return (
<>
    <p><b>Traffic Fatalities in the City of LA</b></p>
    <ResponsiveContainer width='100%' height={500}>
      

      <BarChart
        data={data}
        margin={{
          top: 75,
          right: 0,
          left: -30,
          bottom: 50,
        }}
      >


        <CartesianGrid stroke="black" strokeDasharray="1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{ fill: "var(--warmbg)", }} content={<CustomTooltip />} />
        <Legend color="black" fill={'white'} style={{fill: 'black'}} />
        <Bar dataKey="Pedestrian" stackId="a" fill="var(--green)" stroke="var(--bg)" />
        <Bar dataKey="Cyclist" stackId="a" fill="var(--gold)" stroke="var(--bg)" />
        <Bar dataKey="Motor" stackId="a" fill="var(--orange)" stroke="var(--bg)" />
        <Bar dataKey="Motorcyclist" stackId="a" fill="var(--red)" stroke="var(--bg)"/>
        <ReferenceLine x="2015" alwaysShow isFront stroke="black" label={{ width: '300px', position: 'top', value: 'Vision Zero Program Begins' }} />
      </BarChart>
    </ResponsiveContainer>
    </>
  );
}
