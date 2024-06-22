import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnergyPlot = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="t" type="number" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="kineticEnergy" stroke="#8884d8" name="Kinetic" dot={false} />
      <Line type="monotone" dataKey="potentialEnergy" stroke="#82ca9d" name="Potential" dot={false} />
      <Line type="monotone" dataKey="totalEnergy" stroke="#ffc658" name="Total" dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export default EnergyPlot;
