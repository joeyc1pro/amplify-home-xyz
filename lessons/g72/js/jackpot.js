import {
    goToPreviousPage as e,
    showPage as t
} from "../script.js?v=2.19";
import {
    getItem as o,
    getItemsValue as a,
    getItemsWorth as n,
    giveItemsWorth as i,
    removeItemsFromInventory as l,
    renderItem as r,
    selectItems as s
} from "./items.js?v=2.19";
import {
    addStat as c
} from "./stats.js?v=2.19";
import {
    getProfilePictureDataURL as p
} from "./online/profile.js?v=2.19";
import {
    Pages as d
} from "./pages.js?v=2.19";
import {
    global as m
} from "../script.js?v=2.19";
const f = d.createPage("jackpot").q(".center", [q("h1", "Jackpot"), qn("wheel", "#jackpot-wheel", [qn("wheel-inner", "#jackpot-wheel-inner")]), qn("countdown", "#jackpot-roll-countdown"), q([q("button.button", {
    text: "Back",
    onclick() {
        e()
    }
}), qn("join-button", "button.button", {
    onclick() {
        if (B.joined) H();
        else A()
    }
})]), q(".jackpot-header.m", [qn("player-count", "span.jackpot-highlighted"), " players next roll"]), q(".jackpot-header", ["Total Pool: ", qn("pool-total", "span.jackpot-highlighted")]), qn("players", "#jackpot-players"), q("#jackpot-items", [qn("items-title", "span.jackpot-section-title-centered", "Top items:"), qn("items", ".jackpot-items-container.compact")])]);
const {
    qget: u
} = f;
const y = u("wheel");
const h = u("wheel-inner");
const j = u("countdown");
const k = u("join-button");
const g = u("player-count");
const T = u("pool-total");
const b = u("players");
const M = u("items-title");
const x = u("items");

function v() {
    let e = "";
    let t = Math.floor(Math.random() * 3) + 1;
    for (let o = 0; o < t; o++) {
        let t = L[Math.floor(Math.random() * L.length)];
        e += Math.random() > .5 / (o + 1) ? t.toLowerCase() : t
    }
    return e
}

function w() {
    const e = 5e4 / (1 - Math.random());
    const t = n(e);
    return {
        bet: a(t),
        items: t,
        name: v(),
        joinAt: Math.random() * 10 + 30,
        avatar: `/images/avatars/${Math.floor(Math.random() * 121)}.jpeg`
    }
}
let P = {};
let L = ["-", "00", "007", "2", "4", "42", "420", "51", "69", "96", "97", "98", "99", "A", "Addict", "Addicted", "All", "Alpha", "Away", "B", "Ban", "Bandit", "Bear", "Beast", "Beautiful", "Beauty", "Best", "Big", "Bounty", "Brain", "Brakes", "Brave", "Bravo", "Bull", "C", "Cap", "Captain", "Chief", "Claw", "Cold", "Cry", "Cool", "Cop", "Crew", "Crow", "D", "Dad", "Day", "Dead", "Deep", "Diamond", "Duo", "E", "Eagle", "Ed", "Er", "Est", "Example", "F", "Fast", "Fast", "Father", "Fever", "Fly", "Fox", "Furious", "G", "Game", "Gamer", "Gem", "Goat", "Go", "Gon", "Gone", "Grim", "H", "Hamburger", "Hammer", "Hate", "Hero", "Holy", "Honest", "Hot", "Human", "I", "Ice", "Ie", "Ing", "Is", "J", "Juicy", "Karsten", "K", "Kid", "King", "Knife", "L", "Lcky", "Live", "Living", "Lonely", "Loser", "Lovely", "Lovin", "Loyal", "Lucky", "Ly", "M", "MC", "Mac", "Malthe", "Man", "Master", "Mc", "Me", "Mi", "Min", "Mini", "Mom", "Mother", "Mr", "My", "N", "New", "Night", "No", "Nuke", "Ny", "O", "Odd", "Omega", "P", "Pain", "Pickle", "Pink", "Plaza", "Polo", "Proud", "Purple", "Q", "Queen", "R", "Ra", "Random", "Rat", "Rick", "Rifle", "Ris", "Rock", "Rook", "Rookie", "Royal", "S", "Sausage", "Scary", "Shark", "Shooter", "Shot", "Sir", "Snake", "Solo", "Speed", "Split", "Sq", "Star", "Sun", "Sur", "T", "Taco", "Tank", "Tet", "The", "Thor", "Toast", "Thunder", "Tiger", "Ty", "U", "Un", "V", "Vater", "View", "Villian", "W", "Win", "Winner", "West", "X", "XXX", "Xx", "Y", "Yak", "Yank", "Ye", "Yeet", "YT", "Z", "_", "_", "xX"];
let B = {
    joined: false
};

function S() {
    P = {
        rollin: 40,
        players: new Array(Math.floor(Math.random() * 4) + 2).fill().map((() => w()))
    };
    if (B.joined === false && B.bet) {
        P.players.unshift({
            isPlayer: true,
            items: B.items,
            bet: B.bet,
            name: "You",
            avatar: p()
        });
        B.joined = true
    }
    I();
    let e = setInterval((() => {
        --P.rollin;
        if (B.bet && P.rollin > 0) k.innerText = "Leave Jackpot";
        else k.innerText = P.rollin > 5 ? "Join Roll" : "Joining is closed";
        if (P.rollin > 5) {
            j.innerText = "Next roll locks in " + (P.rollin - 5) + " seconds...";
            k.disabled = false
        } else if (P.rollin > 0) {
            j.innerText = "Next roll in " + P.rollin + " seconds...";
            k.disabled = true
        } else {
            j.innerText = "Rolling...";
            _();
            clearInterval(e)
        }
        R()
    }), 1e3);
    R()
}
let C = [];

function R() {
    I();
    let e = P.players.filter((e => !e.joinAt || P.rollin <= e.joinAt));
    b.innerHTML = "";
    g.innerText = e.length;
    T.innerText = Math.floor(P.pool / 100) + " €";
    let t = [];
    e.forEach((e => {
        let o = b.q(".jackpot-player");
        if (e.isPlayer) o.classList.add("jackpot-player-you");
        o.q(".jackpot-player-avatar", {
            style: {
                backgroundImage: "url(" + e.avatar + ")"
            }
        });
        o.q(".jackpot-player-info", [q(".jackpot-player-name", {
            text: e.name
        }), q(".jackpot-player-bet", {
            text: "Bet: " + (e.bet / 100).toFixed(2) + " €  -  Odds: " + Math.round(e.odds * 100) + "%"
        })]);
        t.push(...e.items)
    }));
    t = t.sort(((e, t) => o(t).price - o(e).price));
    const a = t.splice(0, 10 * e.length);
    if (a.join(",") !== C.join(",")) {
        x.innerHTML = "";
        M.innerText = t.length > a.length ? "Top " + a.length + " items:" : "Pool contains " + a.length + " items:";
        a.forEach((e => {
            x.appendChild(r(e))
        }))
    }
    C = a
}
setTimeout(S, 0);
async function A() {
    let e = await s(100);
    B.items = e;
    B.bet = 0;
    e.forEach((e => B.bet += e.price));
    if (P.rollin > 0) {
        P.players.unshift({
            isPlayer: true,
            items: B.items,
            bet: B.bet,
            name: "You",
            avatar: p()
        });
        B.joined = true;
        k.innerText = "Leave Jackpot"
    } else {
        k.innerText = "Too late, joining next roll!"
    }
    R();
    t("jackpot", true)
}

function H() {
    if (B.joined && P.rollin > 5) {
        B.joined = false;
        B.bet = 0;
        B.items = [];
        P.players.splice(P.players.findIndex((e => e.isPlayer)), 1);
        k.innerText = "...";
        k.disabled = true;
        R()
    }
}

function _() {
    h.innerHTML = "";
    h.style.opacity = "1";
    h.style.transition = "0s";
    h.style.transform = "translateX(0)";
    if (B.joined) m.noSpoilers = true;
    let e, t = false;
    for (let o = 0; o < 200; o++) {
        let a = E();
        let n = h.q(".jackpot-tile", {
            style: {
                backgroundImage: "url(" + a.avatar + ")"
            }
        });
        if (a.isPlayer) n.classList.add("jackpot-tile-you");
        n.q(".jackpot-tile-name", "" + a.name);
        if (o === 190) e = {
            el: n,
            player: a
        };
        if ((o === 189 || o === 191) && a.isPlayer) t = true
    }
    if (e.player.isPlayer) {
        c("win_jackpot");
        if (B.odds < .025) c("win_jackpot_low");
        if (B.odds > .35) c("win_jackpot_big")
    } else if (B.joined) {
        l(B.items.map((e => e.name)));
        c("lose_jackpot");
        if (B.odds > .35) c("lose_jackpot_big");
        if (t) c("lose_jackpot_close")
    }
    setTimeout((() => {
        h.style.transition = "20s cubic-bezier(0, 0, 0, 1)";
        h.style.transform = "translateX(-" + (Math.random() * 72 + 13680 - y.offsetWidth / 2) + "px)"
    }), 100);
    setTimeout((() => {
        e.el.classList.add("jackpot-winner");
        j.innerText = e.player.name + " won!";
        if (e.player.isPlayer) i(P.pool - B.bet);
        if (B.joined) B = {
            joined: false
        };
        m.noSpoilers = false
    }), 20100);
    setTimeout((() => {
        S();
        h.style.transition = "30s cubic-bezier(0, 0, 0, 1)";
        h.style.opacity = "0"
    }), 25100)
}

function E() {
    let e = Math.random();
    let t = 0;
    for (let o = 0; o < P.players.length; o++) {
        let a = P.players[o];
        t += a.odds;
        if (t > e) return a
    }
    console.warn("Please send this to me (the developer)", t, e, P)
}

function I() {
    P.pool = 0;
    P.players.filter((e => !e.joinAt || P.rollin <= e.joinAt)).forEach((e => P.pool += e.bet));
    P.players.forEach((e => {
        e.odds = e.bet / P.pool;
        if (e.isPlayer) B.odds = e.odds
    }));
    P.players.sort(((e, t) => t.odds - e.odds))
}