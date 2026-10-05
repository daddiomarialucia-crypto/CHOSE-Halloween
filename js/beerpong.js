// Stesso URL che hai messo in form.js
const SCRIPT_URL = "INCOLLA_QUI_L_URL";

const bracketEl = document.getElementById("bracket");
const updatedEl = document.getElementById("updated");
const teamsEl = document.getElementById("teams");

const COLORS = { red: "#e5484d", blue: "#3b82f6", green: "#30a46c", yellow: "#f5c518" };
const LINE = "#5b4a70";


/* ---------- utilita' ---------- */

function esc(text) {
    return String(text).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
}

function cleanName(name) {
    const n = String(name || "").trim();
    return (n === "" || n === "?" || n.charAt(0) === "#") ? "" : n;
}

function colorKey(name) {
    const n = name.toLowerCase();
    if (n.indexOf("red") === 0 || n.indexOf("ross") === 0) return "red";
    if (n.indexOf("blu") === 0) return "blue";
    if (n.indexOf("green") === 0 || n.indexOf("verd") === 0) return "green";
    if (n.indexOf("yellow") === 0 || n.indexOf("giall") === 0) return "yellow";
    return "";
}

function colorHex(name) {
    return COLORS[colorKey(name)] || "#9b52ed";
}

function same(a, b) {
    return a !== "" && a.toLowerCase() === b.toLowerCase();
}

function info(a, b, winner) {
    a = cleanName(a);
    b = cleanName(b);
    winner = cleanName(winner);
    const w = same(winner, a) ? a : (same(winner, b) ? b : "");
    return { a: a, b: b, w: w };
}


/* ---------- disegno ---------- */

// Una squadra su una linea del tabellone
function slot(x1, x2, y, name, align, state) {
    const empty = name === "";
    const hex = colorHex(name);
    const left = align === "left";
    const glow = state === "win";

    let stroke = LINE;
    let width = 2.5;
    if (!empty && (state === "win" || state === "known")) {
        stroke = hex;
        width = state === "win" ? 4 : 3;
    }

    const dx = left ? x1 + 16 : x2 - 16;
    const tx = left ? x1 + 36 : x2 - 36;

    let s = '<g opacity="' + (state === "lose" ? 0.35 : 1) + '">';
    s += '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="' + stroke +
         '" stroke-width="' + width + '" stroke-linecap="round"' + (glow ? ' filter="url(#glow)"' : '') + '/>';

    if (empty) {
        s += '<text x="' + dx + '" y="' + (y - 8) + '" text-anchor="' + (left ? "start" : "end") +
             '" class="bp-name bp-tbd">?</text>';
    } else {
        s += '<circle cx="' + dx + '" cy="' + (y - 15) + '" r="8" fill="' + hex + '"/>';
        s += '<text x="' + tx + '" y="' + (y - 8) + '" text-anchor="' + (left ? "start" : "end") +
             '" class="bp-name">' + esc(name.toUpperCase()) + '</text>';
    }

    return s + '</g>';
}

// Una semifinale: due squadre, il connettore e la squadra che avanza
function semi(m, x1, x2, vx, align) {
    const ya = 100, yb = 190, ym = 145;
    const sa = m.w ? (same(m.w, m.a) ? "win" : "lose") : "none";
    const sb = m.w ? (same(m.w, m.b) ? "win" : "lose") : "none";

    let s = '<path d="M' + vx + ' ' + ya + ' V' + yb + '" stroke="' + LINE + '" stroke-width="2.5" fill="none"/>';

    if (m.w) {
        const wy = same(m.w, m.a) ? ya : yb;
        s += '<path d="M' + vx + ' ' + wy + ' V' + ym + '" stroke="' + colorHex(m.w) +
             '" stroke-width="4" fill="none" filter="url(#glow)"/>';
    }

    return s + slot(x1, x2, ya, m.a, align, sa) + slot(x1, x2, yb, m.b, align, sb);
}

// Linee centrali "Winner" e "Runner-up"
function centerSlot(y, name, label, strong) {
    const empty = name === "";
    const stroke = empty ? LINE : colorHex(name);

    return '<line x1="270" y1="' + y + '" x2="490" y2="' + y + '" stroke="' + stroke +
           '" stroke-width="' + (strong ? 4 : 2.5) + '" stroke-linecap="round"' +
           (strong && !empty ? ' filter="url(#glow)"' : '') + '/>' +
           '<text x="380" y="' + (y - 10) + '" text-anchor="middle" class="bp-name' + (empty ? " bp-tbd" : "") + '">' +
           (empty ? "?" : esc(name.toUpperCase())) + '</text>' +
           '<text x="380" y="' + (y + 26) + '" text-anchor="middle" class="bp-label">' + label + '</text>';
}

function score(text, x, y) {
    return text ? '<text x="' + x + '" y="' + y + '" text-anchor="middle" class="bp-score">' + esc(text) + '</text>' : "";
}

function emoji(char, x, y, anchor, float) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + anchor + '" class="bp-emoji' +
           (float ? " bp-float" : "") + '">' + char + '</text>';
}

function render(matches) {
    const s1 = info(matches[0].a, matches[0].b, matches[0].winner);
    const s2 = info(matches[1].a, matches[1].b, matches[1].winner);
    const f = info(s1.w, s2.w, matches[2].winner);

    const champion = f.w;
    const runner = champion ? (same(champion, f.a) ? f.b : f.a) : "";

    const fa = champion ? (same(champion, f.a) ? "win" : "lose") : (f.a ? "known" : "none");
    const fb = champion ? (same(champion, f.b) ? "win" : "lose") : (f.b ? "known" : "none");

    let svg = '<svg class="bp-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tournament bracket">';

    svg += '<defs><filter id="glow" filterUnits="userSpaceOnUse" x="0" y="0" width="760" height="420">' +
           '<feGaussianBlur stdDeviation="3" result="b"/>' +
           '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';

    // decorazioni halloween scientifico
    svg += emoji("🕸️", 8, 38, "start", false) + emoji("🕸️", 752, 38, "end", false);
    svg += emoji("🦇", 380, 44, "middle", true);
    svg += emoji("👻", 40, 280, "start", true) + emoji("🧪", 40, 365, "start", false) + emoji("🔬", 130, 335, "start", false);
    svg += emoji("🦇", 720, 280, "end", true) + emoji("⚗️", 720, 365, "end", false) + emoji("🎃", 630, 335, "end", false);

    // etichette
    svg += '<text x="10" y="64" class="bp-label">SEMIFINAL 1</text>';
    svg += '<text x="750" y="64" text-anchor="end" class="bp-label">SEMIFINAL 2</text>';
    svg += '<text x="380" y="104" text-anchor="middle" class="bp-label">THE FINAL</text>';

    // semifinali
    svg += semi(s1, 10, 200, 200, "left");
    svg += semi(s2, 560, 750, 560, "right");

    // finalisti
    svg += slot(200, 350, 145, f.a, "left", fa);
    svg += slot(410, 560, 145, f.b, "right", fb);
    svg += '<text x="380" y="152" text-anchor="middle" class="bp-vs">VS</text>';

    // punteggi
    svg += score(matches[0].score, 275, 178);
    svg += score(matches[1].score, 485, 178);
    svg += score(matches[2].score, 380, 185);

    // trofeo, vincitore e secondo posto
    svg += '<text x="380" y="262" text-anchor="middle" class="bp-trophy">🏆</text>';
    svg += centerSlot(325, champion, "WINNER", true);
    svg += centerSlot(390, runner, "RUNNER-UP", false);

    svg += '</svg>';

    bracketEl.innerHTML = svg;

    const now = new Date();
    updatedEl.textContent = "Updated " +
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");
}


/* ---------- squadre ---------- */

function renderTeams(teams) {
    teamsEl.innerHTML = "";

    const title = document.createElement("div");
    title.className = "teams-title";
    title.textContent = "THE TEAMS";
    teamsEl.appendChild(title);

    if (!teams || !teams.length) {
        const note = document.createElement("div");
        note.className = "empty";
        note.textContent = "Teams will be revealed on the night. 🎃";
        teamsEl.appendChild(note);
        return;
    }

    const grid = document.createElement("div");
    grid.className = "teams-grid";

    teams.forEach(function (team) {
        const key = colorKey(team.name);

        const card = document.createElement("div");
        card.className = "team-card " + (key || "extra");

        const heading = document.createElement("h3");
        heading.textContent = key ? team.name.toUpperCase() : "RESERVES";
        card.appendChild(heading);

        if (!key) {
            const note = document.createElement("div");
            note.className = "team-note";
            note.textContent = "Teams assigned on the night";
            card.appendChild(note);
        }

        const list = document.createElement("ul");
        const members = team.members.length ? team.members : ["-"];
        members.forEach(function (member) {
            const item = document.createElement("li");
            item.textContent = member;
            list.appendChild(item);
        });
        card.appendChild(list);

        grid.appendChild(card);
    });

    teamsEl.appendChild(grid);
}

async function load() {
    try {
        const response = await fetch(SCRIPT_URL + "?what=bracket");
        const data = await response.json();
        render(data.matches);
        renderTeams(data.teams);
    } catch (error) {
        if (!bracketEl.querySelector("svg")) {
            bracketEl.innerHTML = '<div class="empty">Could not load the bracket. Refresh the page.</div>';
        }
    }
}

load();
setInterval(load, 20000);
