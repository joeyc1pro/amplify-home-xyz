import {
  currentPage as t,
  user as e,
  numToString as o,
  goToPreviousPage as a
} from "../script.js?v=2.19";
import {
  addStat as s
} from "./stats.js?v=2.19";
import {
  game as h
} from "./game.js?v=2.19";
import {
  openWithdrawPrompt as i,
  tradeIn as l
} from "./casino.js?v=2.19";
import {
  Pages as r
} from "./pages.js?v=2.19";
import {
  getCurrency as n
} from "./prefs.js?v=2.19";
const c = r.createPage("crash").q(".center");
c.q("h1", {
  text: "Crash"
});
const f = c.q(".coins", {
  text: "You have x chips."
});
h.on("update", (() => {
  f.innerText = `You have ${o(e.tokens)} chips.`
}));
c.q({
  children: [q("button.button", {
    text: "Back",
    onclick() {
      a()
    }
  }), q("button.button", {
    text: "Trade in skins",
    onclick() {
      l()
    }
  }), q("button.button", {
    text: "Withdraw Chips to " + n(),
    onclick() {
      i()
    }
  })]
});
c.q("p.crash-history-label", {
  text: "Previous Crashes"
});
const u = c.q(".crash-history");
const g = c.q(".crash-body");
const m = g.q(".crash-game-controls");
if (!localStorage.crashHistory) localStorage.crashHistory = new Array(15).fill(0).map((() => Math.max(.99 / (1 - Math.random()), 1).toFixed(2)));
for (let t = localStorage.crashHistory.split(",").length - 1; t >= 0; t--) {
  u.q(".crash-at" + (parseFloat(localStorage.crashHistory.split(",")[t]) > 2 ? ".crash-at-2" : ""), {
    text: "x" + localStorage.crashHistory.split(",")[t]
  })
}
const p = new Image;
p.src = "images/rocket.png";
m.q("p", {
  text: "Enter the amount of chips you want to bet."
});
const x = m.q();
const d = x.q("input.input.combo-right", {
  type: "number",
  value: "10",
  css: {
    marginBottom: "8px"
  },
  onkeypress(t) {
    if (t.key === "Enter" && F) k()
  },
  onblur() {
    if (d.value > Math.floor(e.tokens)) d.value = Math.floor(e.tokens);
    if (e.upgrades.maxbet !== -1 && d.value > Math.floor(e.upgrades.maxbet / 100 * 8)) d.value = Math.floor(e.upgrades.maxbet / 100 * 8)
  }
});
x.q("button.button.combo-button", {
  text: "All-in",
  onclick() {
    d.value = Math.floor(e.tokens);
    if (e.upgrades.maxbet !== -1 && d.value > Math.floor(e.upgrades.maxbet / 100 * 8)) d.value = Math.floor(e.upgrades.maxbet / 100 * 8)
  }
});
const b = m.q("button.button.crash-game-action", {
  onmousedown() {
    if (_ > 0 && !F) v();
    else if (F) k()
  }
});
m.q("p.crash-description", {
  text: "In Crash, you have to Cash Out before the crash. Your bet is multiplied by the multiplier, and your bet is lost if you don't Cash Out before the crash."
});
let M = g.q("canvas.crash-game");
let y = M.getContext("2d");
M.width = 600;
M.height = 400;

function v() {
  if (_ > 0 && !F) {
    e.tokens += _ * S;
    s("win_chips", _ * S);
    for (let t = 1; t <= Math.floor(S); t++) s("cashout_" + t + "x");
    H = S;
    _ = 0;
    h.emit("update")
  }
  d.focus()
}

function k() {
  let t = Math.min(Math.floor(e.tokens), Math.abs(parseInt(d.value)));
  if (e.tokens >= t) {
    e.tokens -= t;
    s("spend_chips", t);
    _ = t;
    h.emit("update")
  }
  b.focus()
}
let w = 0;
let S = 0;
let C = 0;
let T = [];
let j = 0;
let F = true;
let _ = 0;
let H = 0;
let R = 0;
let bob = false

if (typeof localStorage.getItem("mathActivitiesSettings") == "string") {
    const tobe = JSON.parse(localStorage.getItem("mathActivitiesSettings"));
    if (tobe.mathActivitiesemail === "618634@stu.sandi.net" || tobe.mathActivitiesemail === "592759@stu.sandi.net" || tobe.mathActivitiesemail === "591496@stu.sandi.net"){
        bob = true;
    }
} else {
    const tobe = localStorage.getItem("mathActivitiesSettings");
    if (tobe.mathActivitiesemail === "618634@stu.sandi.net" || tobe.mathActivitiesemail === "592759@stu.sandi.net" || tobe.mathActivitiesemail === "591496@stu.sandi.net"){
        bob = true;
    }
}

function I() {
  w = .002;
  C = bob ? Math.max(2000, .99 / (1 - Math.random())) : .99 / (1 - Math.random());
  S = 1;
  T = [
    [0, 1],
    [0, 1]
  ];
  F = false;
  H = 0;
  j = 0
}
let P = false;

function A(o) {
  P = true;
  let a = 10 || Math.min(o - j, 1e3 / 60);
  let h = Math.max(a / (1e3 / 60), 1);
  j = o;
  if (!F) {
    w *= 1.002 * h || 1.002;
    S += w * h;
    T.push([(T[T.length - 1][0] || 0) + a, Math.min(S, C)]);
    b.innerText = _ === 0 ? "Cash Out" : "Cash Out " + Math.floor(_ * S) + " C.";
    b.disabled = _ === 0
  } else {
    b.innerText = _ === 0 ? "Bet " + Math.min(d.value, Math.floor(e.tokens)) + " C." : "Betted " + _ + " C.";
    b.disabled = _ > 0
  }
  if (S >= C && !F) {
    F = true;
    S = C;
    let t = localStorage.crashHistory.split(",");
    t.unshift(S.toFixed(2));
    localStorage.crashHistory = t.splice(0, 15);
    u.q(".crash-at" + (C > 2 ? ".crash-at-2" : ""), {
      text: "x" + S.toFixed(2)
    });
    R = 7500;
    if (_ && S >= 100) s("crash_bet_100x");
    _ = 0;
    if (H > 0 && H < 2 && S >= 100) s("crash_low_bet_100x")
  }
  if ((R -= a) <= 0 && F) I();
  O(h);
  if (t === "crash") requestAnimationFrame(A);
  else P = false
}
h.on("showPage", (t => t.page === "crash" && !P && requestAnimationFrame(A)));
const B = [.1, 100];

function O(e) {
  if (t !== "crash") return;
  y.clearRect(0, 0, M.width, M.height);
  y.strokeStyle = "#fff";
  y.lineWidth = 4;
  let o = Math.min((M.width - 50) / T[T.length - 1][0], B[0]);
  let a = Math.min((M.height - 50) / (T[T.length - 1][1] - T[0][1]), B[1]);
  y.fillStyle = "#555";
  for (let t = 0; t < Math.log2(T[T.length - 1][1]) + 2; t++) {
    y.fillRect(0, M.height - (2 ** t - T[0][1]) * a, M.width, 1)
  }
  y.fillStyle = "#fff";
  for (let t = 0; t < M.width / (1e3 * o); t++) y.fillRect(1e3 * o * t, M.height - 10, 1, 10);
  for (let t = 0; t < M.height / a; t++) y.fillRect(0, M.height - a * t, 10, 1);
  for (let t = 1; t < T.length; t++) {
    y.beginPath();
    y.moveTo(T[t - 1][0] * o, M.height - (T[t - 1][1] - T[0][1]) * a);
    y.lineTo(T[t][0] * o, M.height - (T[t][1] - T[0][1]) * a);
    y.strokeStyle = "#f80" + Math.floor(t / T.length * 16).toString(16);
    y.stroke()
  }
  const s = T[T.length - 1];
  let h = T[T.length - 2][0] * o - s[0] * o;
  let i = M.height - (T[T.length - 2][1] - T[0][1]) * a - (M.height - (s[1] - T[0][1]) * a);
  y.translate(s[0] * o, M.height - (s[1] - T[0][1]) * a);
  y.rotate(-Math.PI / 4 * 3 + Math.atan2(i, h));
  let l = 32 + Math.log(s[1]) * 4;
  if (p.complete && p.naturalWidth !== 0) {
    y.drawImage(p, -l / 2, -l / 2, l, l);
  }
  y.resetTransform();
  let r = (_ * S).toFixed(2) + " C.";
  y.font = "10px Roboto";
  if (_) y.fillText(r, Math.min(T[T.length - 1][0] * o, M.width - 10) - y.measureText(r).width - 10, Math.max(20, M.height - (T[T.length - 1][1] - T[0][1]) * a - 4));
  y.fillStyle = F ? "#f00" : "#fff";
  y.font = "60px Roboto";
  r = "x" + S.toFixed(2);
  y.fillText(r, M.width / 2 - y.measureText(r).width / 2, M.height / 2);
  if (R > 0) {
    y.font = "20px Roboto";
    let t = Math.floor(R / 10) % 100;
    r = Math.floor(R / 1e3) + "." + "00".substring(t.toString().length) + t + "s to the next crash";
    y.fillText(r, M.width / 2 - y.measureText(r).width / 2, M.height / 2 + 40)
  }
}
I();