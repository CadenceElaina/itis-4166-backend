const outputElement = document.getElementById("time-display");
const formatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});
const getTime = () => {
  outputElement.textContent = formatter.format(new Date());
};
// Run once so the initial val on load isnt blank for 1s
getTime();
setInterval(getTime, 1000);

const input = document.querySelector("input");
const button = document.querySelector("button");
/*
const getTimeUntilBD = () => {
    const i = input.textContent
    if i = input.textContent?.trim() 
} */
/*const localFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});
*/
