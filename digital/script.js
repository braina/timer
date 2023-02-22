let time = 0;
let running = false;
let fps = 24;
let interval;
let stopped = false;

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
    if (!stopped) {
      interval = setInterval(updateTime, 1000 / fps);
      running = true;
    }
  } else {
    clearInterval(interval);
    running = false;
  }
  stopped = false;
}

document.addEventListener("click", function (event) {
  if (
    event.target.id !== "reset" &&
    event.target.className !== "menu-icon" &&
    event.target.className !== "menu_item"
  ) {
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

const longPress = {
  //プロパティ
  el: "",
  count: 0,
  second: 1,
  interval: 10,
  timerId: 0,

  //メソッド
  init: function (param) {
      this.el = document.querySelector(param.el);
    this.second = param.second;
     this.el.addEventListener(
      "touchstart",
      () => {
        this.start();
      },
      false
    );
    this.el.addEventListener(
      "touchend",
      () => {
        this.end();
      },
      false
    );
  },
  start: function () {
    this.timerId = setInterval(() => {
      this.count++;

      if (this.count / 100 === this.second) {
        //長押し判定時の処理
        this.myFunc();
        this.end();
      }
    }, this.interval);
  },
  end: function () {
    clearInterval(this.timerId);
    this.count = 0;
  },
  myFunc: function () {
    clearInterval(interval);
    running = false;
    time = 0;
    document.getElementById("time").textContent = "00:00";
    stopped = true;
  }
};

//初期化
longPress.init({
  el: "body", //長押しの判定を取りたい要素のセレクタを指定する
  second: 0.6 //長押しの秒数を指定する
});

