export const simulateDoublePendulum = (params, theta1, theta2, omega1, omega2, steps = 2000) => {
  const { L1, L2, m1, m2, g, damping, airResistance } = params;
  const dt = 0.01;
  let data = [];

  for (let i = 0; i < steps; i++) {
    const sin_delta = Math.sin(theta2 - theta1);
    const cos_delta = Math.cos(theta2 - theta1);

    const den1 = (m1 + m2) * L1 - m2 * L1 * cos_delta * cos_delta;
    const den2 = (L2 / L1) * den1;

    const alpha1 = (m2 * L1 * omega1 * omega1 * sin_delta * cos_delta
                  + m2 * g * Math.sin(theta2) * cos_delta
                  + m2 * L2 * omega2 * omega2 * sin_delta
                  - (m1 + m2) * g * Math.sin(theta1)) / den1;

    const alpha2 = (-m2 * L2 * omega2 * omega2 * sin_delta * cos_delta
                  + (m1 + m2) * g * Math.sin(theta1) * cos_delta
                  - (m1 + m2) * L1 * omega1 * omega1 * sin_delta
                  - (m1 + m2) * g * Math.sin(theta2)) / den2;

    omega1 = (omega1 + alpha1 * dt - airResistance * omega1) * damping;
    omega2 = (omega2 + alpha2 * dt - airResistance * omega2) * damping;
    theta1 += omega1 * dt;
    theta2 += omega2 * dt;

    const x1 = L1 * Math.sin(theta1);
    const y1 = -L1 * Math.cos(theta1);
    const x2 = x1 + L2 * Math.sin(theta2);
    const y2 = y1 - L2 * Math.cos(theta2);

    const kineticEnergy = 0.5 * m1 * L1 * L1 * omega1 * omega1 +
                          0.5 * m2 * (L1 * L1 * omega1 * omega1 + L2 * L2 * omega2 * omega2 +
                          2 * L1 * L2 * omega1 * omega2 * Math.cos(theta1 - theta2));
    const potentialEnergy = -(m1 + m2) * g * L1 * Math.cos(theta1) - m2 * g * L2 * Math.cos(theta2);
    const totalEnergy = kineticEnergy + potentialEnergy;

    data.push({ t: i * dt, x1, y1, x2, y2, theta1, theta2, omega1, omega2, kineticEnergy, potentialEnergy, totalEnergy });
  }

  return data;
};
