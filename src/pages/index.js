import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SimulateButton from '@/components/SimulateButton';
import SimulationAlert from '@/components/SimulationAlert';
import ParameterCard from '@/components/ParameterCard';
import TrajectoryPlot from '@/components/plots/TrajectoryPlot';
import EnergyPlot from '@/components/plots/EnergyPlot';
import PhaseSpacePlot from '@/components/plots/PhaseSpacePlot';
import ErrorPlot from '@/components/plots/ErrorPlot';
import { simulateDoublePendulum } from '@/utils/simulation';
import { predictTrajectory } from '@/utils/prediction';

const AdvancedPhysicsMLSimulation = () => {
  const [trajectoryData, setTrajectoryData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [phaseSpaceData, setPhaseSpaceData] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [params, setParams] = useState({
    L1: 1,
    L2: 1,
    m1: 1,
    m2: 1,
    g: 9.81,
    damping: 0.999,
    airResistance: 0.01
  });

  const handleSimulate = () => {
    setIsSimulating(true);
    setShowAlert(false);

    const theta1 = Math.random() * Math.PI - Math.PI/2;
    const theta2 = Math.random() * Math.PI - Math.PI/2;
    const omega1 = Math.random() * 2 - 1;
    const omega2 = Math.random() * 2 - 1;

    const trajectoryData = simulateDoublePendulum(params, theta1, theta2, omega1, omega2);
    setTrajectoryData(trajectoryData);

    const predictionData = predictTrajectory(params, theta1, theta2, omega1, omega2);
    setPredictionData(predictionData);

    const errors = trajectoryData.map((actual, i) => ({
      t: actual.t,
      error: Math.sqrt(Math.pow(actual.x2 - predictionData[i].x2, 2) + Math.pow(actual.y2 - predictionData[i].y2, 2))
    }));
    setErrorData(errors);

    const phaseSpace = trajectoryData.map((d, i) => ({
      theta1: d.theta1,
      omega1: d.omega1,
      predTheta1: predictionData[i].theta1,
      predOmega1: predictionData[i].omega1
    }));
    setPhaseSpaceData(phaseSpace);

    setIsSimulating(false);
    setShowAlert(true);
  };

  useEffect(() => {
    handleSimulate();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Advanced Physics-based Simulations for ML Training</h2>
      <p className="mb-6 text-center text-gray-600">Explore the complex dynamics of a double pendulum system and its ML prediction.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(params).map(([key, value]) => (
          <ParameterCard 
            key={key}
            value={value}
            max={key === 'g' ? 20 : key === 'damping' || key === 'airResistance' ? 1 : 5}
            step={0.01}
            onChange={(newValue) => setParams(prev => ({ ...prev, [key]: newValue }))}
          />
        ))}
      </div>

      <SimulateButton onClick={handleSimulate} isSimulating={isSimulating} />

      <SimulationAlert showAlert={showAlert} />

      <Tabs defaultValue="trajectory" className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trajectory">Trajectory</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="phaseSpace">Phase Space</TabsTrigger>
          <TabsTrigger value="error">Prediction Error</TabsTrigger>
        </TabsList>
        <TabsContent value="trajectory">
          <Card>
            <CardHeader>
              <CardTitle>Double Pendulum Trajectory</CardTitle>
            </CardHeader>
            <CardContent>
              <TrajectoryPlot actualData={trajectoryData} predictedData={predictionData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="energy">
          <Card>
            <CardHeader>
              <CardTitle>Energy Plot</CardTitle>
            </CardHeader>
            <CardContent>
              <EnergyPlot data={trajectoryData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="phaseSpace">
          <Card>
            <CardHeader>
              <CardTitle>Phase Space Plot</CardTitle>
            </CardHeader>
            <CardContent>
              <PhaseSpacePlot data={phaseSpaceData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="error">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Error</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorPlot data={errorData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPhysicsMLSimulation;
