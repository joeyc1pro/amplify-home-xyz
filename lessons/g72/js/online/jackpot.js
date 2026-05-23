import {
    goToPreviousPage as e,
    numToValuta as t,
    showPage as a,
    user as n
} from "../../script.js?v=2.19";
import {
    Pages as o
} from "../pages.js?v=2.19";
import {
    convl as i,
    convr as s
} from "../itemsn.js?v=2.19";
import {
    getItem as l,
    giveItem as r,
    removeItemsFromInventory as c,
    renderItem as p,
    selectItems as d
} from "../items.js?v=2.19";
import {
    getProfile as f,
    getProfilePictureDataURL as m
} from "./profile.js?v=2.19";
import {
    game as j
} from "../game.js?v=2.19";
import {
    promptOnlineKey as h
} from "./online.js?v=2.19";
import {
    displayWinnings as k
} from "../winnings.js?v=2.19";
import {
    SeedRandom as u
} from "../utils.js?v=2.19";
import {
    showError as g
} from "../errors.js?v=2.19";
import {
    createNotification as S
} from "../notifications.js?v=2.19";
import {
    items as y
} from "../../data/items.js?v=2.19";
const I = "https://services.mtsl.dk/caseclicker2/jackpot";
if (!n?.online?.jackpotState) {
    n.online ??= {};
    n.online.jackpotState ??= {}
}
const w = o.createPage("jackpot-online", [q("button.button.back-btn", {
    text: "Back",
    onclick() {
        e("betting")
    }
}), q("h1", "Jackpot Online", [q(".h1-beta-flag", "Beta")]), qn("info", ".jo-info-text", "Welcome to Jackpot Online.\nLoading..."), q(".center", [qn("join-button", "button.button.hidden", {
    text: "Join Jackpot",
    onclick() {
        v()
    }
}), qn("leave-button", "button.button.hidden", {
    text: "Leave Jackpot",
    onclick() {
        x()
    }
}), qn("next-button", "button.button.hidden", {
    text: "Done, Show next jackpot",
    onclick() {
        E()
    }
}), qn("rewards-button", "button.button.hidden", {
    text: "Collect your rewards",
    style: {
        color: "#fc0"
    },
    onclick() {
        T()
    }
})]), q(".center", [qn("wheel", "canvas.jo-wheel")]), qn("status", ".jo-status"), qn("players-header", ".jo-header", {
    text: "Players"
}), qn("players", ".jo-players"), qn("items-header", ".jo-header", {
    text: "Current Pool:"
}), qn("items", ".jo-items-pool"), qn("count", ".jo-info-text", {
    text: "loading..."
})]);
const {
    qget: b
} = w;
async function v() {
    if (!n.online.key) {
        await h()
    }
    const e = await d(1e3, n.online.jackpotState?.lastState?.maxBet || 5e5, 10, 1, false, true, false);
    const t = e.map((e => s[e.name])).join(",");
    fetch(`${I}/join/?profile=${encodeURIComponent(f().name)}&items=${t}&key=${n.online.key}`).then((e => e.json())).then((t => {
        if (t.success) {
            c(e.map((e => e.name)));
            n.online.jackpotState = {
                gameId: t.gameId,
                playerKey: t.playerKey,
                playerId: t.playerId,
                hasRolled: false
            }
        } else {
            g("Failed to join game", t.message || t.error || "Unknown Error")
        }
        a("jackpot-online")
    }))
}

function x() {
    fetch(`${I}/leave/?gameId=${n.online.jackpotState.gameId}&pid=${n.online.jackpotState.playerId}&key=${n.online.jackpotState.playerKey}`).then((e => e.json())).then((e => {
        if (e.success) {
            n.online.jackpotState.lastState.players.find((e => e.id === n.online.jackpotState.playerId)).items.split(",").forEach((e => r(i[e])));
            n.online.jackpotState = {};
            P()
        } else {
            g("Failed to leave game", e.message || e.error || "Unknown Error")
        }
    }));
    P()
}

function E() {
    n.online.jackpotState = {};
    R();
    P()
}

function T() {
    if (n.online.jackpotState.lastState.winner === n.online.jackpotState.playerId) {
        let e = [];
        n.online.jackpotState.lastState.players.forEach((t => {
            t.items.split(",").map((e => l(i[e]))).forEach((t => {
                e.push(t);
                r(t.name)
            }))
        }));
        k({
            title: "Your winnings!",
            returnBtn: {
                text: "Go back!",
                page: "jackpot-online"
            },
            items: e,
            sortBy: "value"
        })
    }
    E()
}

function P() {
    if (n.online.jackpotState.gameId) {
        fetch(I + "/get/?gameId=" + n.online.jackpotState.gameId).then((e => e.json())).then((e => {
            if (e.success) {
                n.online.jackpotState.lastState = e;
                F(e)
            } else if (e.error === "s-gameid-not-found") {
                E()
            } else {
                a("betting");
                g("Oops!", "Something went wrong trying to access Jackpot. Please try again in a minute.\n\nIf this is still showing after 24 hours please send it as an issue in the discord.")
            }
        }))
    } else {
        fetch(I + "/").then((e => e.json())).then((e => {
            if (e.success) {
                n.online.jackpotState.gameId = e.gameId;
                n.online.jackpotState.lastState = e;
                F(e)
            } else {
                a("betting");
                g("Oops!", "Something went wrong trying to access Jackpot. Please try again in a minute.\n\nIf this is still showing after 24 hours please send it as an issue in the discord.")
            }
        }))
    }
}

function R() {
    const e = b("wheel");
    const t = e.getContext("2d");
    t.clearRect(-e.width / 2, 0, e.width, e.height)
}

function $(e, t = false) {
    return new Promise((a => {
        const o = b("wheel");
        const i = o.getContext("2d");
        o.width = o.offsetWidth;
        o.height = o.offsetHeight;
        const s = 250;
        const l = [];
        const r = [];
        const c = new u(e.gameId);
        let p = c.next();
        let d = 0;
        e.players.forEach((t => {
            d += t.value;
            let a = t.id === n.online.jackpotState.playerId;
            const o = new Image;
            o.src = a ? m() : `/images/avatars/${(t.id*3+e.gameId*100)%121}.jpeg`;
            l.push({
                id: t.id,
                name: decodeURIComponent(t.profile),
                avatar: o,
                value: t.value
            })
        }));
        for (let e = 0; e < s + o.width / 80 + 2; e++) {
            const t = c.next();
            let a = 0;
            for (const n of l) {
                a += n.value / d;
                if (a > t) {
                    r[e] = n;
                    break
                }
            }
        }
        const f = s;
        r[f] = l.find((t => t.id === e.winner));
        i.translate(o.width / 2, 0);
        i.strokeStyle = "#fff";
        i.lineWidth = 2;
        let j = -1;

        function h(e) {
            if (j === -1) j = e;
            let n = e - j;
            if (t) n = 10001;
            let l = n / 1e4;
            let c = 1 - Math.pow(1 - l, 5);
            if (n > 1e4) c = 1;
            let d = c * (s - Math.floor(o.width / 80 / 2)) + Math.floor(o.width / 80 / 2);
            i.fillRect(-o.width / 2, 0, o.width, o.height);
            for (let e = Math.floor(d - o.width / 80 / 2); e < Math.floor(d + o.width / 80 / 2 + 2); e++) {
                if (e < 0) continue;
                let t = 80 * (e - d) - p * 80;
                if (r[e]?.avatar) i.drawImage(r[e].avatar, t, 0, 80, 80);
                if (e === f && c === 1) i.strokeRect(t, 0, 80, 80)
            }
            i.beginPath();
            i.moveTo(0, 0);
            i.lineTo(0, 80);
            i.stroke();
            if (n <= 1e4) requestAnimationFrame(h);
            else a()
        }
        requestAnimationFrame(h)
    }))
}
let L, C, O, D;
async function F(e) {
    b("count").innerText = `${e.gameId-1} jackpots has been played!`;
    b("info").innerText = `Welcome to Jackpot Online.\nBet any amount up to ${t(e.maxBet,0)}, against up to ${e.maxPlayers} other players. Winner takes all.\nAs soon as minimum 2 players join, a time will be set for a winner to be choosen. You will get notified when it is about to start!`;
    if (L) clearTimeout(L);
    if (C) clearTimeout(C);
    if (O) clearInterval(O);
    b("join-button").classList.toggle("hidden", !!n.online.jackpotState.playerId || !!n.online.jackpotState.hasRolled);
    b("join-button").disabled = e.state === "CLOSED" || e.state === "FINISHED";
    b("leave-button").classList.toggle("hidden", !(!!n.online.jackpotState.playerId && e.state !== "FINISHED"));
    b("leave-button").disabled = e.state === "CLOSED";
    b("next-button").classList.toggle("hidden", !(n.online.jackpotState.hasRolled && e.winner !== n.online.jackpotState.playerId));
    b("rewards-button").classList.toggle("hidden", !(n.online.jackpotState.hasRolled && e.winner === n.online.jackpotState.playerId));
    let s = e.time - Math.floor(Date.now() / 1e3);
    let l = e.rollTime - s;
    n.online.jackpotState.rollTimeClient = l;

    function r() {
        let t = l - Math.floor(Date.now() / 1e3);
        switch (e.state) {
            case "WAITING_FOR_PLAYERS":
                b("status").innerText = "Waiting for players to join...";
                break;
            case "OPEN":
                b("status").innerText = "Game closing and rolling in " + Math.floor((t - 60) / 60) + ":" + ((t - 60) % 60).toString().padStart(2, "0");
                break;
            case "CLOSED":
                b("status").innerText = "Game is closed! Roll starts in " + t + " seconds!";
                break;
            case "FINISHED":
                const a = e.players.find((t => t.id === e.winner));
                b("status").innerText = n.online.jackpotState.hasRolled ? `${a.id===n.online.jackpotState.playerId?"You":decodeURIComponent(a.profile)+" has"} won the jackpot!` : "Rolling...";
                break
        }
    }
    r();
    if (e.state === "OPEN" || e.state === "CLOSED") O = setInterval(r, 1e3);
    b("players").innerHTML = "";
    b("items").innerHTML = "";
    let c = 0;
    e.players.forEach((e => c += e.value));
    b("players-header").innerText = `Players (${e.players.length}/${e.maxPlayers})`;
    b("items-header").innerText = `Current Pool (Total Value: ${t(c,2)})`;
    e.players.forEach((a => {
        let o = a.id === n.online.jackpotState.playerId;
        let s = a.id === e.winner && n.online.jackpotState.hasRolled;
        const l = b("players").q(".jo-player", {
            children: [q(".jo-player-avatar", {
                style: {
                    backgroundImage: o ? `url(${m()}` : `url(/images/avatars/${(a.id*3+e.gameId*100)%121}.jpeg)`
                }
            }), q(".jo-player-name", {
                text: decodeURIComponent(a.profile) + (o ? " (You)" : "")
            }), q(".jo-player-bet", {
                text: t(a.value, 2) + " - " + (a.value / c * 100).toFixed(2) + "%"
            })]
        });
        if (s) l.classList.add("is-winner");
        const r = b("items").q(".jo-player-items");
        r.q(".jo-player-items-name", {
            text: `${decodeURIComponent(a.profile)}'s Bet (${t(a.value,2)}) ${o?"(You)":""}`
        });
        const d = r.q(".jo-player-items-list");
        a.items.split(",").forEach((e => {
            if (y[i[e]]) d.appendChild(p(y[i[e]]));
            else console.warn("Jackpot Online >> Item Missing: " + e)
        }));
        if (s) r.classList.add("is-winner")
    }));
    switch (e.state) {
        case "WAITING_FOR_PLAYERS":
            break;
        case "OPEN":
            L = setTimeout((() => {
                P();
                if (o.currentPage !== "jackpot-online" && n.online.jackpotState.playerId) S({
                    message: "The jackpot is starting soon!",
                    onclick() {
                        a("jackpot-online")
                    }
                })
            }), (l - Math.floor(Date.now() / 1e3) - 60 + .5) * 1e3);
            break;
        case "CLOSED":
            C = setTimeout((() => {
                if (o.currentPage === "jackpot-online") P();
                else if (n.online.jackpotState.playerId) S({
                    message: "The jackpot has started!",
                    onclick() {
                        a("jackpot-online")
                    }
                })
            }), (l - Math.floor(Date.now() / 1e3) + .5) * 1e3);
            break;
        case "FINISHED":
            if (o.currentPage !== "jackpot-online") {
                S({
                    message: "The jackpot has started!",
                    onclick() {
                        a("jackpot-online")
                    }
                });
                break
            }
            if (D) break;
            if (!n.online.jackpotState.hasRolled) {
                D = true;
                await $(e);
                D = false;
                n.online.jackpotState.hasRolled = true;
                F(e)
            } else {
                $(e, true)
            }
            break
    }
}
setInterval((() => {
    if (o.currentPage === "jackpot-online" && n.online.jackpotState?.lastState?.state !== "FINISHED") P();
    if (o.currentPage !== "jackpot-online" && n.online?.jackpotState?.playerId && n.online.jackpotState?.lastState?.state === "WAITING_FOR_PLAYERS") P()
}), 20 * 1e3);
setTimeout((() => {
    if (o.currentPage !== "jackpot-online" && n.online?.jackpotState?.playerId && n.online.jackpotState?.lastState?.state !== "FINISHED") P()
}), 2e3);
j.on("showPage", (({
    page: e,
    direct: t
}) => {
    if (e === "jackpot-online" && !t) {
        P()
    }
}));