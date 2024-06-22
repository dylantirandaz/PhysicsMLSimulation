import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ParameterSlider from './ParameterSlider';

const ParameterCard = ({ key, value, max, step, onChange }) => (
  <Card key={key}>
    <CardHeader>
      <CardTitle className="text-sm font-medium">{key}</CardTitle>
    </CardHeader>
    <CardContent>
      <ParameterSlider
        value={value}
        max={max}
        step={step}
        onChange={onChange}
      />
      <p className="text-xs text-gray-500 mt-2">{value.toFixed(2)}</p>
    </CardContent>
  </Card>
);

export default ParameterCard;
