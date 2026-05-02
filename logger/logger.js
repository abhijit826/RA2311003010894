async function Log(stack, level, pkg, message) {
  // Non-blocking logging - don't wait or throw errors
  try {
    const token = process.env.LOG_TOKEN?.trim();
    
    if (!token) {
      console.warn("⚠️ LOG_TOKEN not configured in .env");
      return;
    }

    fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message
      })
    }).catch(err => {
      // Silently fail - don't spam console
      if (process.env.DEBUG_LOGGING === "true") {
        console.debug(`[Log Service Error]: ${err.message}`);
      }
    });

  } catch (err) {
    if (process.env.DEBUG_LOGGING === "true") {
      console.error("Logging error:", err.message);
    }
  }
}

module.exports = Log;