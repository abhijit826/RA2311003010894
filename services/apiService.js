const Log = require("../logger/logger");

const BASE = "http://20.207.122.201/evaluation-service";

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${process.env.LOG_TOKEN}` 
};

async function getDepots() {
  try {
    await Log("backend", "info", "api", "Fetching depots");

    const res = await fetch(`${BASE}/depots`, {
      method: "GET",
      headers
    });

    const data = await res.json();
    return data;

  } catch (err) {
    await Log("backend", "error", "api", err.message);
    throw err;
  }
}

async function getVehicles() {
  try {
    await Log("backend", "info", "api", "Fetching vehicles");

    const res = await fetch(`${BASE}/vehicles`, {
      method: "GET",
      headers
    });

    const data = await res.json();
    return data;

  } catch (err) {
    await Log("backend", "error", "api", err.message);
    throw err;
  }
}

module.exports = { getDepots, getVehicles };