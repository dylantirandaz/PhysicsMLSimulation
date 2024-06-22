import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PhaseSpacePlot = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid />
      <XAxis type="number" dataKey="theta1" name="θ1" domain={[-Math.PI, Math.PI]} />
      <YAxis type="number" dataKey="omega1" name="ω1" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      <Scatter name="Actual" data={data} fill="#8884d8" />
      <Scatter name="Predicted" data={data.map(d => ({ theta1: d.predTheta1, omega1: d.predOmega1 }))} fill="#82ca9d" />
    </ScatterChart>
  </ResponsiveContainer>
);

export default PhaseSpacePlot;
