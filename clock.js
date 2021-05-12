const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours}:${minutes}:${seconds}`;
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

//실행, 1초마다 gettime 갱신
function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();

