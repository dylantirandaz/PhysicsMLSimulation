import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrajectoryPlot = ({ actualData, predictedData }) => (
  <ResponsiveContainer width="100%" height={400}>
    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid />
      <XAxis type="number" dataKey="x2" name="X Position" domain={[-2, 2]} />
      <YAxis type="number" dataKey="y2" name="Y Position" domain={[-2, 2]} />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      <Scatter name="Actual" data={actualData} fill="#8884d8" />
      <Scatter name="Predicted" data={predictedData} fill="#82ca9d" />
    </ScatterChart>
  </ResponsiveContainer>
);

export default TrajectoryPlot;
