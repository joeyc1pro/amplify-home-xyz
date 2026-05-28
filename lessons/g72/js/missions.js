import {
    getPlayerLevel as e,
    numToValuta as s,
    user as t
} from "../script.js?v=2.19";
import n from "../js/select.js?v=2.19";
import {
    game as a
} from "../js/game.js?v=2.19";
import {
    addStat as i
} from "../js/stats.js?v=2.19";
import {
    Pages as m
} from "../js/pages.js?v=2.19";
import {
    getCurrency as o
} from "../js/prefs.js?v=2.19";
import {
    items as r
} from "../data/items.js?v=2.19";
import {
    getItem as p
} from "../js/items.js?v=2.19";
const l = [{
    mission: "earn_money",
    amount: {
        generate: {
            min: 1e5,
            max: 2e6,
            step: 1e5
        }
    },
    title: "Earn %p " + o(),
    pt: "%p " + o(),
    stat: "earned_cash",
    rewards: {
        xp: {
            generate: {
                min: 5e3,
                max: 4e4,
                step: 5e3
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 5e4,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "earn_xp",
    amount: {
        generate: {
            min: 1e3,
            max: 1e4,
            step: 1e3
        }
    },
    title: "Earn %a XP",
    pt: "%a XP",
    stat: "earned_xp",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 15e3,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 25e3,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "clicks",
    amount: {
        generate: {
            min: 1e3,
            max: 8e3,
            step: 500
        }
    },
    title: "Click %a times",
    pt: "%a clicks",
    stat: "clicks",
    rewards: {
        xp: {
            generate: {
                min: 3e3,
                max: 35e3,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 25e4,
                step: 1e4
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "win_conflips",
    amount: {
        generate: {
            min: 2,
            max: 20,
            step: 1
        }
    },
    title: "Win %a coinflips",
    pt: "%a wins",
    stat: "total_coinflips_won",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 2e4,
                step: 500
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 6e4,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "win_conflips_high",
    amount: {
        generate: {
            min: 1,
            max: 3,
            step: 1
        }
    },
    title: "Win %a coinflips with bets over " + s(1e5, 2),
    pt: "%a wins",
    stat: "total_coinflips_won_bet1000",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 2e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 75e3,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "do_coinflips",
    amount: {
        generate: {
            min: 5,
            max: 30,
            step: 1
        }
    },
    title: "Do %a coinflips",
    pt: "%a coinflips",
    stat: "total_coinflips",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 2e4,
                step: 500
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 3e4,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "open_cases",
    amount: {
        generate: {
            min: 20,
            max: 200,
            step: 10
        }
    },
    title: "Open %a cases",
    pt: "%a cases",
    stat: "opened_cases",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 25e3,
                step: 500
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 4e4,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "open_coverts",
    amount: {
        generate: {
            min: 1,
            max: 8,
            step: 1
        }
    },
    title: "Open %a coverts",
    pt: "%a coverts",
    stat: "opened_rarities_5",
    rewards: {
        xp: {
            generate: {
                min: 1500,
                max: 2e4,
                step: 500
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 45e3,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "open_exceedingly_rare",
    amount: {
        generate: {
            min: 1,
            max: 6,
            step: 1
        }
    },
    title: "Open %a exceedingly rare skins",
    pt: "%a exceedingly rares",
    stat: "opened_rarities_6",
    rewards: {
        xp: {
            generate: {
                min: 3e3,
                max: 3e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 65e3,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "win_jackpots",
    amount: {
        generate: {
            min: 1,
            max: 3,
            step: 1
        }
    },
    title: "Win %a jackpots",
    pt: "%a wins",
    stat: "win_jackpot",
    rewards: {
        xp: {
            generate: {
                min: 3e3,
                max: 25e3,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 75e3,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "play_jackpots",
    amount: {
        generate: {
            min: 5,
            max: 25,
            step: 1
        }
    },
    title: "Play %a jackpots",
    pt: "%a",
    stat: "win_jackpot",
    rewards: {
        xp: {
            generate: {
                min: 3e3,
                max: 25e3,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 1e5,
                step: 5e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "sell_rare_skins",
    amount: {
        generate: {
            min: 4,
            max: 20,
            step: 2
        }
    },
    title: "Sell %a skins with a price over " + s(25e3, 2),
    pt: "%a skins sold",
    stat: "skin_sold_gt250",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 15e3,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 2e3,
                max: 2e4,
                step: 2e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "sell_skins",
    amount: {
        generate: {
            min: 50,
            max: 500,
            step: 50
        }
    },
    title: "Sell %a skins",
    pt: "%a skins sold",
    stat: "skin_sold",
    rewards: {
        xp: {
            generate: {
                min: 5e3,
                max: 3e4,
                step: 2500
            }
        },
        money: {
            generate: {
                min: 2e3,
                max: 3e4,
                step: 2e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "discover_skins",
    amount: {
        generate: {
            min: 10,
            max: 25,
            step: 1
        }
    },
    title: "Discover %a new skins",
    pt: "%a skins discovered",
    stat: "skins_discovered",
    rewards: {
        xp: {
            generate: {
                min: 5e3,
                max: 2e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 2e3,
                max: 25e3,
                step: 1e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "win_chips",
    amount: {
        generate: {
            min: 1e3,
            max: 1e6,
            step: 1e3
        }
    },
    title: "Win %a chips in any casino game",
    pt: "%a chips",
    stat: "win_chips",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e5,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e3,
                max: 5e4,
                step: 1e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "spend_chips",
    amount: {
        generate: {
            min: 1e4,
            max: 1e6,
            step: 1e4
        }
    },
    title: "Spend %a chips in any casino game",
    pt: "%a chips",
    stat: "spend_chips",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 6e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e3,
                max: 5e4,
                step: 1e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "win_chips_in_roulette",
    amount: {
        generate: {
            min: 1e3,
            max: 1e5,
            step: 1e3
        }
    },
    title: "Win %a chips in roulette",
    pt: "%a chips",
    stat: "roulette_winnings",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 2e3,
                max: 24e3,
                step: 2e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "spend_chips_on_roulette",
    amount: {
        generate: {
            min: 1e4,
            max: 1e5,
            step: 1e4
        }
    },
    title: "Spend %a chips in roulette",
    pt: "%a chips",
    stat: "spend_chips_on_roulette",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 2e3,
                max: 15e3,
                step: 1e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "roulette_wins",
    amount: {
        generate: {
            min: 5,
            max: 25,
            step: 5
        }
    },
    title: "Win %a roulette spins",
    pt: "%a won",
    stat: "roulette_wins",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 2e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e3,
                max: 25e3,
                step: 1e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "roulette_wins_35to1",
    amount: {
        generate: {
            min: 1,
            max: 4,
            step: 1
        }
    },
    title: "Win on green or a single number in roulette, %a times",
    pt: "%a won",
    stat: "roulette_wins_35to1",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 4e4,
                step: 2e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 2e4,
                step: 1e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "win_chips_on_slotmachine",
    amount: {
        generate: {
            min: 1e3,
            max: 1e5,
            step: 1e3
        }
    },
    title: "Win %a chips on the slot machine",
    pt: "%a chips won",
    stat: "win_chips_on_slotmachine",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 1e4,
                step: 1e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "spend_chips_on_slotmachine",
    amount: {
        generate: {
            min: 2e3,
            max: 2e5,
            step: 2e3
        }
    },
    title: "Spend %a chips on the slot machine",
    pt: "%a chips",
    stat: "spend_chips_on_slotmachine",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 1e4,
                step: 2e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 1e4,
                step: 1e3
            }
        },
        permaUnlockCapsule: .25
    }
}, {
    mission: "win_100x_on_slotmachine",
    amount: 1,
    title: "Win 100x or more on the slot machine",
    pt: "100x wins",
    stat: "win_100x_on_slotmachine",
    rewards: {
        xp: 2e4,
        money: 7500,
        permaUnlockCapsule: .25
    }
}, {
    mission: "win_special_on_slotmachine",
    amount: 1,
    title: "Win a knife or glove on the slot machine",
    pt: "bonus wins",
    stat: "win_special_on_slotmachine",
    rewards: {
        xp: 12500,
        money: 1e4,
        permaUnlockCapsule: .25
    }
}];
t.missions ??= [];
t.unlockedCapsules ??= [];

function c() {
    while (t.missions.length < t.upgrades.missionSlots) {
        t.missions.push(g())
    }
}

function d(e, s) {
    return Math.floor((Math.max(0, Math.min(1, s ? s + (Math.random() - .5) / 3 : Math.random())) * (e.max - e.min + e.step) + e.min) / e.step) * e.step
}

function u() {
    return (1 + .025 * e().level) * t.upgrades.missionRewards
}

function x() {
    if (t.upgrades.unlockStickers === 0) return;
    let e = Object.keys(r).filter((e => !t.unlockedCapsules.includes(e) && p(e).type === "capsule" && !t.missions.find((e => e.permaUnlockCapsule))));
    if (e.length > 0) return e[Math.floor(Math.random() * e.length)];
    return false
}

function g() {
    let s = l[Math.floor(Math.random() * l.length)];
    let n = Math.random() * .4 + .015 * e().level;
    let a = {
        mission: s.mission,
        pt: s.pt,
        stat: s.stat,
        amount: s.amount?.generate ? d(s.amount.generate, n) : s.amount,
        rewards: {
            money: Math.floor((s.rewards.money?.generate ? d(s.rewards.money.generate, n) : s.rewards.money) * u() / 500) * 500,
            xp: Math.floor((s.rewards.xp?.generate ? d(s.rewards.xp.generate, n) : s.rewards.xp) * u() * t.upgrades.xpmul / 5) * 5,
            permaUnlockCapsule: ((typeof s.rewards.permaUnlockCapsule === "number" ? Math.random() < s.rewards.permaUnlockCapsule : s.rewards.permaUnlockCapsule) || false) && x()
        },
        statAtStart: 0,
        status: "available",
        type: "mission"
    };
    a.title = s.title.replace(/%a/g, a.amount).replace(/%p/g, a.amount / 100);
    return a
}

function w(e) {
    if (e.status === "available" && _() === 0) {
        e.status = "started";
        e.statAtStart = t.stats[e.stat] || 0;
        S();
        D(e)
    }
}

function f(e) {
    if (e.status === "done") {
        i("missions_finished", 1);
        e.status = "finished";
        t.missions.splice(t.missions.indexOf(e), 1, {
            time: (new Date).getTime() + 6e4 * (t.upgrades.missionGeneration || 240) / 4,
            type: "mission-waiting"
        });
        S();
        D(e);
        if (e.rewards) {
            if (e.rewards.money) {
                t.money += e.rewards.money;
                i("earnings_from_missions", e.rewards.money)
            }
            if (e.rewards.xp) {
                t.xp += e.rewards.xp;
                i("xp_from_missions", e.rewards.xp)
            }
            if (e.rewards.permaUnlockCapsule) {
                t.unlockedCapsules.push(e.rewards.permaUnlockCapsule)
            }
        }
        a.emit("update")
    }
}

function h(e) {
    t.missions.splice(t.missions.indexOf(e), 1, {
        time: (new Date).getTime() + 6e4 * (t.upgrades.missionGeneration || 240),
        type: "mission-waiting"
    });
    if (W === e) D();
    S()
}

function _() {
    return t.missions.filter((e => e.status === "started" || e.status === "done")).length
}

function k(e) {
    if (e.status === "done") return 1;
    return e.status === "started" ? ((t.stats[e.stat] || 0) - e.statAtStart) / e.amount : 0
}

function y(e) {
    if (e.status === "done" || e.status === "started") return Math.floor((t.stats[e.stat] || 0) - e.statAtStart);
    return 0
}

function C(e) {
    return e.pt.replace(/%a/g, y(e)).replace(/%p/g, y(e) / 100 + "")
}

function v(e) {
    t.missions.splice(t.missions.indexOf(e), 1, g());
    S()
}
const U = m.createPage("missions");
U.style.display = "flex";
U.style.flexDirection = "column";
U.q("h1", {
    text: "Missions"
});
const M = U.q(".missions-columns");
const b = M.q(".missions-column");
const j = M.q(".missions-details-column");

function S() {
    b.innerHTML = "";
    t.missions.forEach((e => {
        if (e.type === "mission") {
            let t = b.q(".missions-mission.missions-mission-available", {
                text: e.title,
                onclick() {
                    D(e)
                }
            });
            let n = t.q(".missions-mission-progress");
            n.style.right = 100 - k(e) * 100 + "%";
            if (k(e) >= 1) {
                t.classList.add("mission-mission-completed");
                t.classList.add("missions-mission-active");
                e.status = "done"
            }
            if (e.status === "started") {
                t.classList.add("missions-mission-active")
            }
        } else if (e.type === "mission-waiting") {
            let a = b.q(".missions-mission.missions-mission-waiting");
            a.q("span", "Waiting for a new mission");
            let i = a.q("span.missions-mission-waiting-time");

            function s() {
                if (e.time - (new Date).getTime() <= 0) v(e);
                if (document.contains(i)) i.innerText = P(e.time - (new Date).getTime());
                else clearInterval(m)
            }
            s();
            let m = setInterval(s, 1e3)
        }
    }))
}
let W;

function D(e) {
    W = e;
    j.innerHTML = "";
    if (!e) {
        j.q("h1", "Please select a mission")
    } else {
        let t = j.q(".md-columns");
        let n = t.q(".md-column");
        n.q("h1", "Mission Details");
        n.q(".md-description", {
            text: e.title + " while this mission is active to complete it and receive the rewards!"
        });
        n.q(".md-progress", [q(".md-progress-text", {
            text: C(e) + " / " + e.pt.replace(/%a/, e.amount).replace(/%p/, e.amount / 100)
        }), q(".md-progress-bar", [q(".md-progress-bar-progress", {
            style: {
                width: k(e) * 100 + "%"
            }
        })])]);
        n.q("button.button.md-discard", {
            text: "Discard Mission",
            onclick() {
                h(e)
            }
        });
        let a = t.q(".md-column").q(".md-rewards-box");
        a.q(".md-rewards-title", {
            text: "Rewards"
        });
        if (e.rewards) {
            if (e.rewards.money) a.q(".md-reward", {
                text: "+ " + s(e.rewards.money, 2)
            });
            if (e.rewards.xp) a.q(".md-reward", {
                text: "+ " + e.rewards.xp + " XP"
            });
            if (e.rewards.permaUnlockCapsule) a.q(".md-reward", ["+ Permanently unlock ", q("span", {
                style: {
                    color: "#fc0"
                },
                text: e.rewards.permaUnlockCapsule
            }), " in the shop!"])
        }
        if (e.status === "available" && _() !== 0) a.q(".md-accept.md-disabled", {
            text: "You can only have 1 active mission!"
        });
        else if (e.status === "available") a.q(".md-accept", {
            text: "Start Mission",
            onclick() {
                w(e)
            }
        });
        else if (e.status === "started") a.q(".md-accept.md-disabled", {
            text: "Mission started"
        });
        else if (e.status === "done") a.q(".md-accept", {
            text: "Finish Mission!",
            onclick() {
                f(e)
            }
        });
        else if (e.status === "finished") a.q(".md-accept.md-disabled", {
            text: "Rewards Received!"
        })
    }
}
a.on("showPage", (e => {
    if (e.page === "missions") {
        c();
        S();
        D(W)
    }
}));
a.on("update", (() => {
    let e = 0;
    for (let s = 0; s < t.missions.length; s++) {
        if (t.missions[s].status === "started") {
            let e = k(t.missions[s]);
            n("#missions-progress").style.width = Math.min(e * 100, 100) + "%";
            n("#missions-progressbar").style.opacity = "1";
            if (k(t.missions[s]) >= 1) {
                t.missions[s].status = "done"
            }
        }
        if (t.missions[s].status === "done") {
            ++e;
            n("#missions-progress").style.width = "0%";
            n("#missions-progressbar").style.opacity = "0"
        }
    }
    n("#missions_not_collected").innerText = e || ""
}));

function P(e) {
    let s = Math.floor(e / 1e3 % 60) + "";
    let t = Math.floor(e / 1e3 / 60 % 60) + "";
    let n = Math.floor(e / 1e3 / 60 / 60 % 60) + "";
    return (n > 0 ? n + ":" : "") + t.padStart(2, "0") + ":" + s.padStart(2, "0")
}