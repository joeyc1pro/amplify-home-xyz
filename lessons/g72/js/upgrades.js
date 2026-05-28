import e from "../data/tree_upgrades.js?v=2.19";
import t from "../data/upgrades.js?v=2.19";
import {
    Pages as o
} from "./pages.js?v=2.19";
import s from "./select.js?v=2.19";
import {
    game as r
} from "./game.js?v=2.19";
import {
    currentPage as n,
    numToValuta as i,
    user as a
} from "../script.js?v=2.19";
import {
    checkRequirements as u,
    fulfillRequirements as f
} from "./requirementChecker.js?v=2.19";
import {
    giveRewards as p
} from "./rewardsGiver.js?v=2.19";
import {
    setStat as l
} from "./stats.js?v=2.19";

function d() {
    for (const e in t) {
        a.upgrades[e] ??= t[e].default || 0
    }
}
if (!a._v || a._v < 1) {
    a._v = 1;
    a._ou = Object.assign({}, a.upgrades);
    a.upgrades = {}
}
d();
if (!a.upgradesBought) a.upgradesBought = [];

function g(t) {
    if (a.upgradesBought.includes(t)) return false;
    for (const o of e[t].parents) {
        if (!a.upgradesBought.includes(o) && o !== "main") return false
    }
    if (!u(e[t].requirements)) return false;
    return true
}

function c(t) {
    if (g(t)) {
        if (f(e[t].requirements)) {
            a.upgradesBought.push(t);
            p(e[t].rewards);
            r.emit("update")
        }
    }
}
const m = o.createPage("upgrades");
m.q(".upgrades-header", {
    children: [q("h1", {
        text: "Upgrades"
    }), q("button.button", {
        text: "Return to start",
        onclick() {
            k = [0, 0];
            B()
        }
    })]
});
const h = m.q("canvas", {
    style: {
        position: "absolute"
    }
});
const v = h.getContext("2d");
const b = m.q({
    style: {
        position: "absolute"
    }
});
let j = {};

function y() {
    b.q(".upgrade.upgrade-bought", {
        style: {
            backgroundImage: `url('./images/upgrades/tree-root.png')`
        },
        children: [q(".upgrade-name", "")]
    });
    for (const t in e) {
        const o = e[t];
        let s = false;
        const r = b.q(".upgrade", {
            style: {
                top: o.position[1] * 150 + "px",
                left: o.position[0] * 150 + "px",
                backgroundImage: `url(${'./images/upgrades/' + o.icon.split('/upgrades/').pop()})`
            },
            children: [q(".upgrade-name", o.name)],
            onclick() {
                c(t)
            },
            onmouseenter() {
                if (!s) {
                    s = b.q(".upgrade-info", {
                        style: {
                            top: o.position[1] * 150 + "px",
                            left: o.position[0] * 150 + 75 + "px"
                        }
                    });
                    s.q(".upgrade-info-name", o.name);
                    s.q(".upgrade-info-description", o.description);
                    if (!a.upgradesBought.includes(t)) {
                        for (const t of o.parents) {
                            if (t !== "main" && !a.upgradesBought.includes(t)) s.q(".upgrade-info-requirement", "You need to get " + e[t].name + " to unlock this.")
                        }
                        for (const e of o.requirements) {
                            let t = u([e]);
                            switch (e.type) {
                                case "level": {
                                    if (!t) s.q(".upgrade-info-requirement", "You need to get to level " + e.min + " to unlock this.");
                                    break
                                }
                                case "money": {
                                    if (e.isPrice) s.q(".upgrade-info-requirement" + (t ? ".upgrade-info-requirement-fulfilled" : ""), t ? "Costs " + i(e.total, 2) : "You need " + i(e.total, 2) + " to purchase this.");
                                    else s.q(".upgrade-info-requirement" + (t ? ".upgrade-info-requirement-fulfilled" : ""), t ? "Have " + i(e.total, 2) : "You need to have " + i(e.total, 2));
                                    break
                                }
                            }
                        }
                    }
                }
            },
            onmouseleave() {
                if (s) {
                    b.removeChild(s);
                    s = false
                }
            }
        });
        j[t] = r
    }
}

function w(t) {
    if (n !== "upgrades") {
        requestAnimationFrame(w);
        return
    }
    h.width = s("#pages").offsetWidth;
    h.height = s("#pages").offsetHeight;
    v.strokeStyle = "white";
    v.resetTransform();
    v.translate(...k);
    v.translate(s("#pages").offsetWidth / 2, s("#pages").offsetHeight / 2);
    let o = t % 1e3 / 1e3;
    for (const t in e) {
        const s = e[t];
        for (const r of s.parents) {
            const n = r === "main" ? {
                position: [0, 0]
            } : e[r];
            let i = Math.floor(n.position[0] * 150);
            let u = Math.floor(s.position[0] * 150);
            let f = Math.floor(n.position[1] * 150);
            let p = Math.floor(s.position[1] * 150);
            let l = u - i;
            let d = p - f;
            v.beginPath();
            v.moveTo(i, f);
            v.lineTo(u, p);
            v.stroke();
            let g = i + l * o;
            let c = f + d * o;
            v.beginPath();
            v.fillStyle = a.upgradesBought.includes(t) ? "#fff" : "#fff4";
            v.arc(g, c, 5, 0, Math.PI * 2);
            v.fill()
        }
    }
    requestAnimationFrame(w)
}
requestAnimationFrame(w);
let k = [0, 0];

function B() {
    b.style.top = k[1] + s("#pages").offsetHeight / 2 - 75 + "px";
    b.style.left = k[0] + s("#pages").offsetWidth / 2 - 75 + "px"
}

function x(e) {
    let t = 0;
    for (const e in j) {
        if (g(e)) t++
    }
    document.getElementById("upgrades_available").innerText = t || "";
    if (e || n !== "upgrades") return;
    for (const e in j) {
        const t = j[e];
        t.classList.toggle("upgrade-can-buy", g(e));
        t.classList.toggle("upgrade-bought", a.upgradesBought.includes(e))
    }
    l("tree_upgrades_purchased", a.upgradesBought.length)
}
r.on("update", x);
window.addEventListener("mousemove", (e => {
    if (e.buttons && n === "upgrades") {
        k[0] += e.movementX;
        k[1] += e.movementY;
        B()
    }
}));
let _ = false;
window.addEventListener("touchmove", (e => {
    if (n === "upgrades") e.preventDefault();
    if (_ && n === "upgrades") {
        k[0] += e.touches[0].screenX - _.screenX;
        k[1] += e.touches[0].screenY - _.screenY;
        B()
    }
    _ = e.touches[0]
}));
window.addEventListener("touchend", (e => {
    _ = false
}));
y();
r.on("showPage", (e => {
    if (e.page === "upgrades") {
        B();
        x()
    }
}));