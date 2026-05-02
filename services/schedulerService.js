const Log = require("../logger/logger");

function knapsack(vehicles, maxHours) {
  const n = vehicles.length;

  const dp = Array.from({ length: n + 1 }, () =>
    Array(maxHours + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const duration = vehicles[i - 1].Duration;  
    const impact = vehicles[i - 1].Impact;      

    for (let w = 0; w <= maxHours; w++) {
      if (duration <= w) {
        dp[i][w] = Math.max(
          impact + dp[i - 1][w - duration],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Backtrack
  let w = maxHours;
  let selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(vehicles[i - 1]);
      w -= vehicles[i - 1].Duration;
    }
  }

  const totalImpact = dp[n][maxHours];
  const totalTime = selected.reduce((sum, v) => sum + v.Duration, 0);

  Log("backend", "info", "service", `Selected ${selected.length} vehicles`);

  return {
    selectedVehicles: selected,
    totalImpact,
    totalTime
  };
}

module.exports = { knapsack };