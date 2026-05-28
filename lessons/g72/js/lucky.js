import {
    numToString as e,
    numToValuta as t,
    user as i
} from "../script.js?v=2.19";
import s from "../js/select.js?v=2.19";
import {
    game as l
} from "./game.js?v=2.19";
import {
    getItem as n,
    giveItem as o
} from "./items.js?v=2.19";
import {
    addStat as a
} from "./stats.js?v=2.19";
import r from "../data/lucky.js?v=2.19";
import {
    Pages as f
} from "./pages.js?v=2.19";
import {
    getCurrency as c
} from "./prefs.js?v=2.19";
const h = {
    money: c(),
    xp: "XP"
};

function p() {
    const e = Math.floor((new Date).getTime() / 1e3 / 60 / 60 / 24).toString(36);
    if (localStorage.day !== e) {
        i.tickets += 1;
        localStorage.day = Math.floor((new Date).getTime() / 1e3 / 60 / 60 / 24).toString(36);
        l.emit("update")
    }
}
p();
setInterval(p, 6e4);
l.on("update", (() => {
    s("#lucky-wheel-nav").classList.toggle("show", i.tickets > 0)
}));
const m = f.createPage("spin").q(".center");
m.q("h1", {
    text: "Lucky Wheel"
});
const y = m.q("p");
const d = m.q("", {
    css: {
        display: "flex",
        justifyContent: "center"
    }
});
const u = d.q(".center");
const x = u.q("canvas");
x.width = 600;
x.height = 600;
const g = x.getContext("2d");
let w = 0;
let v = 0;
let T = -1;
let k = 0;
let M = false;
let S = 0;
let b = {};
let j = 0;

function P(t = 0) {
    g.save();
    let i = t - j;
    j = t;
    g.clearRect(0, 0, x.width, x.height);
    g.translate(x.width / 2, x.height / 2);
    if (M) {
        S += i / 1e3;
        v = 2 ** (3 - S) * 3
    }
    if (v < .01) {
        v = 0;
        if (M) {
            M = false;
            I()
        }
    } else {
        M = true;
        w = v
    }
    let s = r.prizes.length;
    for (let t = 0; t < s; t++) {
        let i = r.prizes[t];
        if (t === 0) g.rotate(-(Math.PI * 2 * w - Math.PI * 2 / s * (k - 1)));
        else g.rotate(-(Math.PI * 2 / s));
        g.beginPath();
        g.moveTo(0, 0);
        g.arc(0, 0, x.width / 2.5, 0, Math.PI * 2 / s);
        g.closePath();
        g.fillStyle = !M && T === t ? "#888" : i.color;
        g.fill();
        g.fillStyle = "#000";
        if (!M && T === t) {
            g.save();
            g.clip();
            g.lineWidth = 4;
            g.strokeStyle = "#fff";
            g.stroke();
            g.restore()
        }
        g.save();
        let l = x.width / 2.5;
        let o = l * Math.sin(Math.PI / s);
        g.translate(l, o);
        g.rotate(Math.PI / 2 + Math.PI / s);
        g.fillStyle = i.text || "#fff";
        if (i.type === "money" || i.type === "xp") {
            let t = e(i.amount);
            if (i.type === "money") t = e(i.amount / 100);
            g.font = "30px Teko, sans-serif";
            g.fillText(t, -g.measureText(t).width / 2, 100);
            g.font = "50px Teko, sans-serif";
            g.fillText(h[i.type], -g.measureText(h[i.type]).width / 2, 60)
        } else if (i.type === "item") {
            const e = n(i.item);
            b[e.src] = new Image;
            b[e.src].src = e.src;
            let t = b[e.src].height / b[e.src].width;
            g.drawImage(b[e.src], -40, 20, 80, 80 * t);
            g.font = Math.ceil(150 / i.display[0].length) + "px Teko, sans-serif";
            g.fillText(i.display[0], -g.measureText(i.display[0]).width / 2, 105);
            g.font = Math.ceil(150 / i.display[1].length) + "px Teko, sans-serif";
            g.fillText(i.display[1], -g.measureText(i.display[1]).width / 2, 125)
        }
        g.fillStyle = "#fff";
        g.restore()
    }
    g.restore();
    g.save();
    g.translate(x.width / 2, x.height / 2);
    g.fillStyle = "#fff";
    g.shadowBlur = 4;
    g.shadowColor = "#000";
    g.fillRect(x.width / 2.5 - 10, -1, 20, 2);
    g.restore();
    if (z) requestAnimationFrame(P)
}

function W() {
    if (i.tickets > 0) i.tickets -= 1;
    else return;
    _.innerHTML = "";
    i.luckyWheelWins.forEach((e => {
        _.appendChild(L(e))
    }));
    T = Math.floor(Math.random() * r.prizes.length);
    v = 10;
    k = T + .2 + .7 * Math.random();
    M = true;
    S = 0;
    a("total_lucky_wheel_spins", 1);
    s("#nav").classList.add("menu-disabled");
    l.emit("update")
}

function I() {
    let e = r.prizes[T];
    e.date = (new Date).getTime();
    i.luckyWheelWins.unshift(e);
    _.insertBefore(L(e, true), _.children[0]);
    if (e.type === "money" || e.type === "xp") B(e.amount, e.type);
    else if (e.type === "item") o(e.item, e.amount || 1, true);
    if (i.tickets > 0) C.innerText = "Spin Again!";
    s("#nav").classList.remove("menu-disabled");
    l.emit("update")
}
const C = u.q("button.button", {
    text: "Spin!",
    onclick() {
        if (!M) W()
    }
});
const _ = d.q(".lw-history", [q(".lw-history-title", {
    text: "Previous Winnings"
})]).q("", {
    css: {
        height: "595px",
        overflowY: "scroll"
    }
});
let z = false;
l.on("showPage", (e => {
    let t = z;
    z = e.page === "spin";
    if (z && !t) {
        P();
        _.innerHTML = "";
        i.luckyWheelWins.forEach((e => {
            _.appendChild(L(e))
        }))
    }
}));
l.on("update", (() => {
    y.innerText = i.tickets === 1 ? "You have a ticket" + (T !== -1 ? " left!" : "!") : "You have " + i.tickets + " tickets" + (i.tickets > 1 ? T !== -1 ? " left!" : "!" : ".");
    C.disabled = i.tickets < 1 || M
}));

function L(i, s) {
    const l = q(".lw-history-item");
    l.style.background = "linear-gradient(45deg, " + i.color + (i.color.length === 4 ? "2" : "20") + ", transparent 80%)";
    if (s) l.classList.add("lw-history-just-won");
    if (i.type === "money") l.innerText = "+ " + t(i.amount, 2);
    else if (i.type === "xp") l.innerText = "+ " + e(i.amount, 0) + " XP";
    else if (i.type === "item") l.innerText = "+ " + (i.amount ? i.amount + "x " + i.item : i.item);
    return l
}

function B(n, o) {
    let r = document.body.q("", {
        css: {
            position: "fixed",
            fontSize: "40px",
            transition: "0.8s"
        },
        text: "+ " + (o === "money" ? t(n, 2) : e(n) + " xp")
    });
    const f = x.getBoundingClientRect();
    let c = f.x + f.width / 2 - r.offsetWidth / 2;
    let h = f.y + f.height / 2 - r.offsetHeight;
    r.style.left = c + "px";
    r.style.top = h + "px";
    setTimeout((() => {
        let e;
        if (o === "money") e = s("#money").getBoundingClientRect();
        else e = s("#level-bar-p").getBoundingClientRect();
        r.style.left = e.x + e.width / 2 - r.offsetWidth / 2 + "px";
        r.style.top = e.y + e.height / 2 - r.offsetHeight / 2 + "px"
    }), 50);
    setTimeout((() => r.style.opacity = "0"), 800);
    setTimeout((() => document.body.removeChild(r)), 900);
    setTimeout((() => {
        if (o === "money") {
            s("#money").style.transition = 0 + "s";
            s("#money").style.fontSize = 48 + "px"
        } else if (o === "xp") {
            s("#level-bar-p").style.transition = 0 + "s";
            s("#level-bar-p").style.boxShadow = "0 3px #ffff inset"
        }
        setTimeout((() => {
            if (o === "money") {
                i.money += n;
                a("earned_cash", n);
                a("lucky_wheel_cash_winnings", n);
                s("#money").style.transition = .4 + "s";
                s("#money").style.fontSize = 24 + "px"
            } else if (o === "xp") {
                i.xp += n;
                a("earned_xp", n);
                s("#level-bar-p").style.transition = .4 + "s";
                s("#level-bar-p").style.boxShadow = "0 3px #fff0 inset"
            }
            l.emit("update")
        }), 20)
    }), 800)
}