import React from 'react';
import { Slider } from '@/components/ui/slider';

const ParameterSlider = ({ value, max, step, onChange }) => (
  <Slider
    defaultValue={[value]}
    max={max}
    step={step}
    onValueChange={([newValue]) => onChange(newValue)}
  />
);

export default ParameterSlider;
