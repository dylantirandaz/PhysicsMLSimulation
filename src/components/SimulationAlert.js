import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SimulationAlert = ({ showAlert }) => (
  showAlert && (
    <Alert className="mb-6">
      <AlertTitle>Simulation Complete</AlertTitle>
      <AlertDescription>
        New double pendulum trajectory generated and ML prediction made.
      </AlertDescription>
    </Alert>
  )
);

export default SimulationAlert;
