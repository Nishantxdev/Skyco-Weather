const dateTime = "2026-10-21T01:00:00.000Z";

const formatted = new Date(dateTime).toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

console.log(formatted);
console.log("hell")