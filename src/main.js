import "./assets/css/reset.css";
import "./assets/css/style.css";

// Constants for count down calculation
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

window.onload = () => {
  const eventDay = new Date("07/20/2023");
  let previousTimeRemaining;

  // Elements
  const daysCtrs = document.querySelectorAll(".days__flipcard span");
  const hoursCtrs = document.querySelectorAll(".hours__flipcard span");
  const minutesCtrs = document.querySelectorAll(".minutes__flipcard span");
  const secondsCtrs = document.querySelectorAll(".seconds__flipcard span");
  const containers = {
    day: document.querySelectorAll(".days__flipcard .fcontent")[0],
    hour: document.querySelectorAll(".hours__flipcard .fcontent")[0],
    minute: document.querySelectorAll(".minutes__flipcard .fcontent")[0],
    second: document.querySelectorAll(".seconds__flipcard .fcontent")[0],
  };

  // Handlers
  const updateCounter = function (elements, count, countType) {
    const paddedCount = count < 10 ? "0" + String(count) : String(count);
    elements.forEach((el) => {
      el.innerText = paddedCount;
    });
  };

  const getRemainigTime = (distance) => {
    const getCount = (adjustedDistance, timeConstant) =>
      Math.floor(adjustedDistance / timeConstant);

    const days = getCount(distance, day, "day");
    const hours = getCount(distance % day, hour, "hour");
    const minutes = getCount(distance % hour, minute, "minute");
    const seconds = getCount(distance % minute, second, "second");
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const countDownHandler = () => {
    if (count.expired) return;
    const now = new Date();
    const distance = eventDay - now;
    if (distance < 0) {
      count.expired = true;
      clearInterval(count.interval);
      updateCounter(daysCtrs, 0);
      updateCounter(hoursCtrs, 0);
      updateCounter(minutesCtrs, 0);
      updateCounter(secondsCtrs, 0);
      return;
    }
    const timeRemaining = getRemainigTime(distance);

    if (timeRemaining.days !== previousTimeRemaining.days) {
      updateCounter(daysCtrs, timeRemaining.days);
      containers.day.classList.add("fanimate");
    } else containers.day.classList.remove("fanimate");

    if (timeRemaining.hours !== previousTimeRemaining.hours) {
      updateCounter(hoursCtrs, timeRemaining.hours);
      containers.hour.classList.add("fanimate");
    } else containers.hour.classList.remove("fanimate");

    if (timeRemaining.minutes !== previousTimeRemaining.minutes) {
      updateCounter(minutesCtrs, timeRemaining.minutes);
      containers.minute.classList.add("fanimate");
    } else containers.minute.classList.remove("fanimate");

    updateCounter(secondsCtrs, timeRemaining.seconds);
    previousTimeRemaining = timeRemaining;
  };

  const initCounter = function (elements, count, countType) {
    const paddedCount = count < 10 ? "0" + String(count) : String(count);
    elements.forEach((el) => {
      el.innerText = paddedCount;
    });
  };

  const initialization = () => {
    const now = new Date();
    const distance = eventDay - now;
    previousTimeRemaining = getRemainigTime(distance);
    initCounter(daysCtrs, previousTimeRemaining.days);
    initCounter(hoursCtrs, previousTimeRemaining.hours);
    initCounter(minutesCtrs, previousTimeRemaining.minutes);
    initCounter(secondsCtrs, previousTimeRemaining.seconds);
  };

  initialization();
  // Timer
  const count = {
    value: 0,
    interval: setInterval(countDownHandler, 1000),
    expired: false,
  };

  // Event listeners
  window.onunload = function () {
    if (!count.expired) {
      clearInterval(count.interval);
      console.log("Count interval cleared");
    }
  };
};
