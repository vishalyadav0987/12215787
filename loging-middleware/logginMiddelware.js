/**
 * Sends a structured log entry to the AffordMed logging API.
 * @param {string} stack - "backend" or "frontend"
 * @param {string} level - "debug", "info", "warn", "error", "fatal"
 * @param {string} pkg - module or service name (e.g., "db", "handler")
 * @param {string} message - human-readable description of the event
 */
require('dotenv').config({ path: __dirname + '/.env' });
async function Log(stack, level, pkg, message) {
  const logEntry = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(process.env.LOGGING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
      },
      body: JSON.stringify(logEntry)
    });

    if (!response.ok) {
      console.error("Failed to send log:", response.statusText);
    }
  } catch (error) {
    console.error("Logging error:", error);
  }
}

module.exports = { Log };
