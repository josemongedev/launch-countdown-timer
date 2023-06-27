import "./assets/css/reset.css";
import "./assets/css/style.css";

// Constants for count down calculation
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

window.onload = () => {
  const eventDay = new Date("12/20/2023");

  // Elements
  const days = document.querySelectorAll(".days__flipcard span");
  const hours = document.querySelectorAll(".hours__flipcard span");
  const minutes = document.querySelectorAll(".minutes__flipcard span");
  const seconds = document.querySelectorAll(".seconds__flipcard span");

  // Handlers
  const updateCounter = function (elements, timeRemaining) {
    elements.forEach((el) => {
      el.innerHTML = timeRemaining < 10 ? "0" + timeRemaining : timeRemaining;
    });
  };

  const getRemainigTime = (distance) => {
    const getCount = (adjustedDistance, timeConstant) =>
      Math.floor(adjustedDistance / timeConstant);

    const days = getCount(distance, day);
    const hours = getCount(distance % day, hour);
    const minutes = getCount(distance % hour, minute);
    const seconds = getCount(distance % minute, second);
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
      updateCounter(days, 0);
      updateCounter(hours, 0);
      updateCounter(minutes, 0);
      updateCounter(seconds, 0);
      return;
    }
    const timeRemaining = getRemainigTime(distance);
    updateCounter(days, timeRemaining.days);
    updateCounter(hours, timeRemaining.hours);
    updateCounter(minutes, timeRemaining.minutes);
    updateCounter(seconds, timeRemaining.seconds);
  };

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
