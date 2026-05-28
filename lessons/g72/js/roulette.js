import {
    user as t,
    goToPreviousPage as e
} from "../script.js?v=2.19";
import {
    game as o
} from "./game.js?v=2.19";
import {
    openWithdrawPrompt as r,
    tradeIn as l
} from "./casino.js?v=2.19";
import {
    addStat as i
} from "./stats.js?v=2.19";
import {
    Pages as c
} from "./pages.js?v=2.19";
import {
    global as n
} from "../script.js?v=2.19";
import {
    getCurrency as s
} from "./prefs.js?v=2.19";
const p = c.createPage("roulette").q(".center");
p.q(".roulette-fade-overlay");
p.q("h1", {
    text: "Roulette"
});
const u = p.q(".coins", {
    text: "You have x chips."
});
const b = p.q();
b.q("button.button", {
    text: "Back",
    onclick() {
        e()
    }
});
const h = b.q("button.button", {
    text: "Trade in Skins to Chips",
    onclick() {
        l()
    }
});
b.q("button.button", {
    text: "Withdraw Chips to " + s(),
    onclick() {
        r()
    }
});
o.on("update", (() => {
    u.innerText = `You have ${Math.floor(t.tokens).toLocaleString()} chips.`;
    h.classList.toggle("btn-arrow-highlight", t.tokens === 0)
}));
const a = p.q(".roulette-wheel-container");
const d = a.q(".roulette-wheel.idle-rotate");
let x = [{
    color: "green",
    number: 0
}, {
    color: "red",
    number: 32
}, {
    color: "black",
    number: 15
}, {
    color: "red",
    number: 19
}, {
    color: "black",
    number: 4
}, {
    color: "red",
    number: 21
}, {
    color: "black",
    number: 2
}, {
    color: "red",
    number: 25
}, {
    color: "black",
    number: 17
}, {
    color: "red",
    number: 34
}, {
    color: "black",
    number: 6
}, {
    color: "red",
    number: 27
}, {
    color: "black",
    number: 13
}, {
    color: "red",
    number: 36
}, {
    color: "black",
    number: 11
}, {
    color: "red",
    number: 30
}, {
    color: "black",
    number: 8
}, {
    color: "red",
    number: 23
}, {
    color: "black",
    number: 10
}, {
    color: "red",
    number: 5
}, {
    color: "black",
    number: 24
}, {
    color: "red",
    number: 16
}, {
    color: "black",
    number: 33
}, {
    color: "red",
    number: 1
}, {
    color: "black",
    number: 20
}, {
    color: "red",
    number: 14
}, {
    color: "black",
    number: 31
}, {
    color: "red",
    number: 9
}, {
    color: "black",
    number: 22
}, {
    color: "red",
    number: 18
}, {
    color: "black",
    number: 29
}, {
    color: "red",
    number: 7
}, {
    color: "black",
    number: 28
}, {
    color: "red",
    number: 12
}, {
    color: "black",
    number: 35
}, {
    color: "red",
    number: 3
}, {
    color: "black",
    number: 26
}];
for (let t = 0; t < 37 * 4; t++) {
    d.q(".roulette-wheel-number.roulette-wheel-color-" + x[t % 37].color, {
        text: x[t % 37].number,
        style: {
            transform: "rotate(" + t / (37 * 4) * 360 + "deg)"
        }
    })
}
const k = p.q(".roulette-bet-info");
k.innerText = "Please enter a bet above.";
const m = p.q(".roulette-bet-picker");
let f = [];
f[0] = m.q(".roulette-bet-picker-slot.roulette-bet-picker-slot-0.roulette-bet-picker-slot-green", {
    text: "0",
    tip: "35:1",
    style: {
        left: "0",
        top: "0",
        height: "120px"
    },
    onclick() {
        if (M === "idle") {
            L = [0];
            j = 35;
            T()
        }
    }
});
for (let t = 0; t < 36; t++) {
    let {
        color: e
    } = x.find((e => e.number === t + 1));
    f[t + 1] = m.q(".roulette-bet-picker-slot.roulette-bet-picker-nums.roulette-bet-picker-slot-" + e, {
        text: t + 1,
        tip: "35:1",
        style: {
            left: 40 + Math.floor(t / 3) * 40 + "px",
            top: 80 - t % 3 * 40 + "px"
        },
        onclick() {
            if (M === "idle") {
                L = [t + 1];
                j = 35;
                T()
            }
        }
    })
}
m.q(".roulette-bet-picker-slot.roulette-bet-picker-12ths", {
    text: "First 12th",
    tip: "2:1",
    style: {
        left: "40px",
        top: "120px",
        height: "40px",
        width: "160px"
    },
    onclick() {
        if (M === "idle") {
            L = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            j = 2;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-12ths", {
    text: "Second 12th",
    tip: "2:1",
    style: {
        left: "200px",
        top: "120px",
        height: "40px",
        width: "160px"
    },
    onclick() {
        if (M === "idle") {
            L = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            j = 2;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-12ths", {
    text: "Third 12th",
    tip: "2:1",
    style: {
        left: "360px",
        top: "120px",
        height: "40px",
        width: "160px"
    },
    onclick() {
        if (M === "idle") {
            L = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
            j = 2;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-first18s", {
    text: "1-18",
    tip: "1:1",
    style: {
        left: "40px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (M === "idle") {
            L = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
            j = 1;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-evens", {
    text: "EVEN",
    tip: "1:1",
    style: {
        left: "120px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (M === "idle") {
            L = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
            j = 1;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-reds", {
    text: "RED",
    tip: "1:1",
    style: {
        left: "200px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (M === "idle") {
            L = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
            j = 1;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-blacks", {
    text: "BLACK",
    tip: "1:1",
    style: {
        left: "280px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (M === "idle") {
            L = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
            j = 1;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-odds", {
    text: "ODD",
    tip: "1:1",
    style: {
        left: "360px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (M === "idle") {
            L = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
            j = 1;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-last18s", {
    text: "19-36",
    tip: "1:1",
    style: {
        left: "440px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (M === "idle") {
            L = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
            j = 1;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-v12ths", {
    text: "2 to 1",
    tip: "2:1",
    style: {
        left: "520px",
        top: "0px",
        height: "40px",
        width: "40px"
    },
    onclick() {
        if (M === "idle") {
            L = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
            j = 2;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-v12ths", {
    text: "2 to 1",
    tip: "2:1",
    style: {
        left: "520px",
        top: "40px",
        height: "40px",
        width: "40px"
    },
    onclick() {
        if (M === "idle") {
            L = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
            j = 2;
            T()
        }
    }
});
m.q(".roulette-bet-picker-slot.roulette-bet-picker-v12ths", {
    text: "2 to 1",
    tip: "2:1",
    style: {
        left: "520px",
        top: "80px",
        height: "40px",
        width: "40px"
    },
    onclick() {
        if (M === "idle") {
            L = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
            j = 2;
            T()
        }
    }
});
const g = m.q(".roulette-bet-picker-slot.roulette-bet-picker-v12ths", {
    text: "Bet",
    style: {
        left: "40px",
        top: "220px",
        height: "40px",
        width: "480px"
    },
    onclick() {
        S()
    }
});
const q = p.q(".roulette-history");
const y = p.q(".roulette-bet-amount-changer");
y.q("button.button", {
    text: "1/2 <-",
    onclick() {
        w /= 2;
        _();
        v.value = w
    }
});
const v = y.q("input.input", {
    value: 0,
    oninput() {
        w = this.value;
        _()
    },
    onblur() {
        v.value = w
    }
});
y.q("button.button", {
    text: "-> 2x",
    onclick() {
        w *= 2;
        if (w === 0) w = 10;
        _();
        v.value = w
    }
});
let w = 0;
let L = [];
let j = 1;
let M = "idle";

function T() {
    f.forEach((t => t.classList.remove("roulette-bet-highlighted")));
    L.forEach((t => f[t].classList.add("roulette-bet-highlighted")))
}

function _() {
    if (w > t.tokens) w = t.tokens;
    if (t.upgrades.maxbet !== -1 && w > Math.floor(t.upgrades.maxbet / 100 * 8)) w = Math.floor(t.upgrades.maxbet / 100 * 8);
    t.tokens = Math.round(t.tokens);
    w = Math.abs(Math.round(w));
    k.innerHTML = "You can only bet on one field. You are currently betting " + w.toLocaleString() + " chips."
}

function S() {
    if (M === "idle" && w && t.tokens >= w && L.length) {
        n.noSpoilers = true;
        M = "spinning";
        g.classList.add("disabled");
        t.tokens -= w;
        i("spend_chips_on_roulette", w);
        i("spend_chips", w);
        let e = w;
        let r = [...L];
        let l = j + 1;
        o.emit("update");
        d.classList.remove("idle-rotate");
        d.style.transition = "0s";
        let c = Math.random();
        d.style.transform = "rotate(" + 1.21622 + "deg)";
        setTimeout((() => {
            d.style.transition = "10s cubic-bezier(0, 0.5, 0, 1)";
            d.style.transform = "rotate(" + (-c * 90 - 270 + 1.21622) + "deg)";
            let s = Math.floor(c * 90 / 2.43243);
            setTimeout((() => {
                if (r.includes(x[s].number)) {
                    t.tokens += e * l;
                    k.innerHTML = "You won " + e * l + " chips!";
                    i("roulette_wins", 1);
                    i("win_chips", e * l);
                    i("roulette_winnings", e * l);
                    if (l === 3) i("roulette_wins_2to1", 1);
                    if (l === 36) i("roulette_wins_35to1", 1)
                } else {
                    k.innerHTML = "Bad luck! You lost."
                }
                const c = q.q(".roulette-history-item.roulette-history-item-color-" + x[s].color, {
                    text: x[s].number
                });
                q.scrollTo({
                    behavior: "smooth",
                    top: c.offsetTop
                });
                M = "idle";
                g.classList.remove("disabled");
                n.noSpoilers = false;
                o.emit("update")
            }), 1e4)
        }), 500)
    }
}