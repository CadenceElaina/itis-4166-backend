const { format } = require("date-fns");

// d: 1 -> 1
// dd: 1 -> 01
// new Date() automatically defaults to reading the local system time of the machine running the Node process.
/*()
const outputElement = document.getElementById("time-display");
export function getTime() {
  outputElement.textContent = format(
    new Date(),
    "iiii',' MMMM d, yyyy G'..'GGG 'at' h:mm:s b",
  );
}
setInterval(getTime, 1000);
*/
console.log(format(new Date(), "M/dd/yyyy"));

//Using Built-in JavaScript Intl (Zero Dependencies):
/*const now = new Date();
const formatted = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "long",
  day: "numeric",
  era: "short",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
}).format(now);
*/
//console.log(formatted);
// Output format: August 29, 2026 AD, 10:38:30 AM

// Eastern Time with Native Intl:
const easternFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  era: "short",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});

console.log(easternFormatter.format(new Date()));
