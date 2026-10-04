// Stesso URL che hai messo in form.js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQflHOHp5n1X5xETm_AZFr0DexxANyGDaS0LfX6cMEdZp5jMyIvNUfQI2glB-9bM8IyQ/exec";

const bracketEl = document.getElementById("bracket");
const championEl = document.getElementById("champion");
const updatedEl = document.getElementById("updated");

function colorOf(name) {
    const n = name.toLowerCase();
    if (n.indexOf("red") === 0 || n.indexOf("ross") === 0) return "red";
    if (n.indexOf("blu") === 0) return "blue";
    if (n.indexOf("green") === 0 || n.indexOf("verd") === 0) return "green";
    if (n.indexOf("yellow") === 0 || n.indexOf("giall") === 0) return "yellow";
    return "";
}

function sameTeam(a, b) {
    return a !== "" && a.toLowerCase() === b.toLowerCase();
}

function teamRow(name, match) {
    const row = document.createElement("div");
    const unknown = name === "" || name === "?";
    row.className = "team " + (unknown ? "tbd" : colorOf(name));

    if (match.winner !== "") {
        row.classList.add(sameTeam(match.winner, name) ? "won" : "lost");
    }

    const dot = document.createElement("span");
    dot.className = "team-dot";
    row.appendChild(dot);

    const label = document.createElement("span");
    label.textContent = unknown ? "To be decided" : name.toUpperCase();
    row.appendChild(label);

    return row;
}

function matchCard(match) {
    const card = document.createElement("div");
    card.className = "match";

    const title = document.createElement("div");
    title.className = "match-title";
    title.textContent = match.name.toUpperCase();
    card.appendChild(title);

    card.appendChild(teamRow(match.a, match));
    card.appendChild(teamRow(match.b, match));

    if (match.score) {
        const score = document.createElement("div");
        score.className = "match-score";
        score.textContent = match.score;
        card.appendChild(score);
    }

    return card;
}

function render(matches) {
    bracketEl.innerHTML = "";

    const semis = document.createElement("div");
    semis.className = "round";
    semis.appendChild(matchCard(matches[0]));
    semis.appendChild(matchCard(matches[1]));

    const final = document.createElement("div");
    final.className = "round round-final";
    final.appendChild(matchCard(matches[2]));

    bracketEl.appendChild(semis);
    bracketEl.appendChild(final);

    const champion = matches[2].winner;
    championEl.innerHTML = "";

    if (champion !== "" && champion !== "?") {
        const banner = document.createElement("div");
        banner.className = "champion " + colorOf(champion);
        banner.textContent = "🏆 " + champion.toUpperCase() + " TEAM WINS!";
        championEl.appendChild(banner);
    }

    const now = new Date();
    updatedEl.textContent = "Updated " +
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");
}

async function load() {
    try {
        const response = await fetch(SCRIPT_URL + "?what=bracket");
        const data = await response.json();
        render(data.matches);
    } catch (error) {
        if (!bracketEl.querySelector(".match")) {
            bracketEl.innerHTML = '<div class="empty">Could not load the bracket. Refresh the page.</div>';
        }
    }
}

load();
setInterval(load, 20000);
