export const predictTrajectory = (params, theta1, theta2, omega1, omega2, steps = 2000) => {
  const dt = 0.01;
  let data = [];

  for (let i = 0; i < steps; i++) {
    // Simple ML-like prediction
    const input = [theta1, theta2, omega1, omega2];
    const hidden = input.map(x => Math.tanh(x));
    const output = hidden.map((x, i) => x * [0.8, 0.9, 1.1, 1.2][i]);

    theta1 += output[0] * dt;
    theta2 += output[1] * dt;
    omega1 += output[2] * dt;
    omega2 += output[3] * dt;

    const x1 = params.L1 * Math.sin(theta1);
    const y1 = -params.L1 * Math.cos(theta1);
    const x2 = x1 + params.L2 * Math.sin(theta2);
    const y2 = y1 - params.L2 * Math.cos(theta2);
    
    data.push({ t: i * dt, x1, y1, x2, y2, theta1, theta2, omega1, omega2 });
  }

  return data;
};
