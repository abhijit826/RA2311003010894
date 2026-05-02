require("dotenv").config();

const BASE = "http://20.207.122.201/evaluation-service";

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${process.env.LOG_TOKEN}`
};

// Priority mapping
function getPriority(type) {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  if (type === "Event") return 1;
  return 0;
}

// Main function
async function getTopNotifications() {
  try {
    

    const res = await fetch(`${BASE}/notifications`, {
      method: "GET",
      headers
    });

    const data = await res.json();

  

  
    if (!data.notifications) {
      console.error(" API did not return notifications. Check token/auth.");
      return;
    }

    const notifications = data.notifications;

    // Sort by priority + timestamp
    notifications.sort((a, b) => {
      const p1 = getPriority(a.Type);
      const p2 = getPriority(b.Type);

      if (p2 !== p1) return p2 - p1;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = notifications.slice(0, 10);

    console.log("\n Top 10 Notifications:\n");
    console.log(top10);

  } catch (err) {
    console.error(" Error:", err.message);
  }
}

getTopNotifications();
