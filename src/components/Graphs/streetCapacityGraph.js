
import React from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList,
    Bar,
    BarChart
} from "recharts";


const Existing = [
    {
        Name: "Parking",
        Efficiency: 0,
        Allocation: 5850,
    },
    {
        Name: "Driving",
        Efficiency: 1600,
        Allocation: 43510,
    },
    {
        Name: "Bike Lanes",
        Efficiency: 7200,
        Allocation: 493,
    },
    {
        Name: "Bus Lanes",
        Efficiency: 8000,
        Allocation: 40,
    },
    {
        Name: "Sidewalks",
        Efficiency: 9000,
        Allocation: 6000,
    },
];


export default function streetCapactiyGraph() {
    return (
        <div class="noMobile">

            <ResponsiveContainer  width='100%' height={500}>

                <ScatterChart margin={{ top: 40, right: 30, bottom: 50, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        type="number"
                        label={{ value: "Moves More People Per Hour →", dy: 20, }}
                        tickCount={10}
                        angle={45}
                        dy={25}
                        scale="linear"
                        dataKey="Efficiency"
                        domain={[0, 9000]}
                        interval={0}
                        unit=" PpH" />

                    <YAxis
                        type="number"
                        tickCount={5}
                        interval={0}
                        domain={[0, 45000]}
                        dataKey="Allocation"
                        angle={0}
                        label={{ offset: 1000, angle: -90, dx: -50, value: "Space Allocated In LA" }}
                        unit=" Acres" />

                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Exisiting" data={Existing} fill="black">
                        <LabelList fill="var(--dark)" offset="15" position="top" dataKey="Name" />
                    </Scatter>


                </ScatterChart>

            </ResponsiveContainer>
        </div>
    )

}