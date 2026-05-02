const { getDepots, getVehicles } = require("../services/apiService");
const { knapsack } = require("../services/schedulerService");
const Log = require("../logger/logger");

async function runScheduler(req, res) {
  try {
    await Log("backend", "info", "controller", "Scheduler started");

    const depotsData = await getDepots();
    const vehiclesData = await getVehicles();

  
  

    const depots = depotsData.depots;
    const vehicles = vehiclesData.vehicles;

    const results = depots.map(depot => {
      const result = knapsack(vehicles, depot.MechanicHours);

      return {
        depotId: depot.ID,
        ...result
      };
    });

    await Log("backend", "info", "controller", "Scheduler completed");

    res.json({ results });

  } catch (err) {
    console.error("ERROR:", err); 
    await Log("backend", "fatal", "controller", err.message);
    res.status(500).send(err.message); 
  }
}

module.exports = { runScheduler };
