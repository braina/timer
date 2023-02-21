
let time = 0;
let running = false;
let fps = 24;
let interval;

function updateTime() {
  time++;
  const seconds = Math.floor(time / fps);
  const frames = time % fps;
  document.getElementById("time").textContent =
    ("0" + seconds).slice(-2) + ":" + ("0" + frames).slice(-2);
  document.getElementById("fps").textContent = fps + "fps";
}

function startTimer() {
  if (!running) {
    interval = setInterval(updateTime, 1000 / fps);
    running = true;
  } else {
    clearInterval(interval);
    running = false;
  }
}


document.addEventListener("click", function (event) {
  if (event.target.id !== "reset" && event.target.className !== "menu-icon" && event.target.className !== "menu_item") {
    startTimer();
  }
});

function resetTimer() {
  clearInterval(interval);
  running = false;
  time = 0;
  document.getElementById("time").textContent = "00:00";
}

document.getElementById("reset").addEventListener("click", resetTimer);


const menuIcon = document.querySelector(".menu-icon");
const menu = document.querySelector(".menu");

menuIcon.addEventListener("click", function () {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    fps = link.getAttribute("data-fps");
    menu.style.display = "none";
    resetTimer();
    document.getElementById("fps").textContent = fps + "fps";
  });
  


});
