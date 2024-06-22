import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ErrorPlot = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="t" type="number" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="error" stroke="#ff0000" name="Error" dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export default ErrorPlot;
