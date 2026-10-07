// Stesso URL che hai messo in form.js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQflHOHp5n1X5xETm_AZFr0DexxANyGDaS0LfX6cMEdZp5jMyIvNUfQI2glB-9bM8IyQ/exec";

const $ = function (id) { return document.getElementById(id); };

const listEl = $("list");
const searchEl = $("search");
const pickedEl = $("picked");
const voteButton = $("vote");
const voteMsg = $("voteMsg");
const signupMsg = $("signupMsg");
const signupButton = $("signupBtn");

let candidates = [];
let selected = null;
let firstLoad = true;
let closedKey = "";

// i link dal form precompilano nome e cognome (?n=Nome&c=Cognome)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("n")) { $("cNome").value = urlParams.get("n"); $("voterNome").value = urlParams.get("n"); }
if (urlParams.get("c")) { $("cCognome").value = urlParams.get("c"); $("voterCognome").value = urlParams.get("c"); }

const VOTE_ERRORS = {
    closed: "Voting is not open right now.",
    not_registered: "We can't find you in the lists. Check your name or ask the organizers.",
    self_vote: "You can't vote for yourself!",
    already_voted: "You have already voted. One vote each!",
    bad_target: "This contestant is not valid. Refresh the page and try again."
};

const SIGNUP_ERRORS = {
    signup_closed: "Sign-ups are closed.",
    missing: "Fill in all the fields."
};


/* ---------- utilita' ---------- */

function esc(text) {
    return String(text).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
}

function clean(text) {
    return String(text).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function show(el, text) {
    el.textContent = text;
    el.hidden = false;
}

function whenText(iso) {
    return new Date(iso).toLocaleString([], {
        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
    });
}

function setTab(name) {
    $("panelSignup").hidden = name !== "signup";
    $("panelVote").hidden = name !== "vote";
    $("tabSignup").classList.toggle("active", name === "signup");
    $("tabVote").classList.toggle("active", name === "vote");
}

$("tabSignup").addEventListener("click", function () { setTab("signup"); });
$("tabVote").addEventListener("click", function () { setTab("vote"); });


/* ---------- lista candidati ---------- */

function render() {
    const query = clean(searchEl.value.trim());

    const shown = candidates.filter(function (c) {
        return clean(c.nome + " " + c.cognome + " " + c.costume).includes(query);
    });

    listEl.innerHTML = "";

    if (!shown.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = candidates.length ? "No results." : "No contestants yet.";
        listEl.appendChild(empty);
        return;
    }

    shown.forEach(function (c) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer";
        if (selected && selected.nome === c.nome && selected.cognome === c.cognome) {
            button.classList.add("selected");
        }

        const name = document.createElement("strong");
        name.textContent = c.nome + " " + c.cognome;
        button.appendChild(name);

        if (c.costume) {
            const costume = document.createElement("span");
            costume.className = "candidate-costume";
            costume.textContent = c.costume;
            button.appendChild(costume);
        }

        button.addEventListener("click", function () {
            selected = c;
            pickedEl.textContent = "Your vote: " + c.nome + " " + c.cognome;
            voteButton.disabled = false;
            voteMsg.hidden = true;
            render();
        });

        listEl.appendChild(button);
    });
}

searchEl.addEventListener("input", render);


/* ---------- stato (iscrizioni / voti a tempo) ---------- */

// [MODIFICATO] parametro anti-cache ?t=...
async function load() {
    try {
        const response = await fetch(SCRIPT_URL + "?t=" + Date.now());
        const data = await response.json();

        // iscrizione
        $("signupForm").hidden = !data.signup;
        $("signupClosed").hidden = data.signup;
        $("signupClosed").textContent = data.voting
            ? "Sign-ups are closed. Time to vote! 🗳️"
            : "Sign-ups are closed. 🎃";

        // votazione
        $("voteArea").hidden = !data.voting;
        $("voteClosed").hidden = data.voting;

        // la scheda dei voti resta con il lucchetto finche' non si sblocca
        $("tabVote").textContent = data.voting ? "2 · VOTE" : "2 · VOTE 🔒";

        const key = data.signup ? "s:" + data.switchAt : "x";
        if (key !== closedKey) {
            closedKey = key;
            const closed = $("voteClosed");

            if (data.signup && data.switchMs !== null && data.switchMs !== undefined) {
                closed.textContent = "";
                closed.appendChild(document.createTextNode("Voting is locked. It opens in "));
                const clock = document.createElement("strong");
                closed.appendChild(clock);
                closed.appendChild(document.createTextNode(" 🔒"));
                ChoseLock.countdown(clock, data.switchMs, load);
            } else if (data.signup) {
                closed.textContent = "Voting is locked until the organizers open it during the party. 🔒";
            } else {
                closed.textContent = "Voting is closed. The winner is coming... 🏆";
            }
        }

        candidates = data.candidates.sort(function (a, b) {
            return a.nome.localeCompare(b.nome, "it", { sensitivity: "base" }) ||
                   a.cognome.localeCompare(b.cognome, "it", { sensitivity: "base" });
        });
        render();

        if (firstLoad) {
            setTab(data.signup ? "signup" : "vote");
            firstLoad = false;
        }
    } catch (error) {
        if (firstLoad) {
            setTab("signup");
            firstLoad = false;
        }
        listEl.innerHTML = '<div class="empty">Could not load the list. Refresh the page.</div>';
    }
}


/* ---------- invio iscrizione al contest ---------- */

signupButton.addEventListener("click", async function () {
    const nome = $("cNome").value.trim();
    const cognome = $("cCognome").value.trim();
    const costume = $("cCostume").value.trim();

    if (!nome || !cognome || !costume) {
        show(signupMsg, SIGNUP_ERRORS.missing);
        return;
    }

    signupButton.disabled = true;
    signupButton.textContent = "SENDING...";
    signupMsg.hidden = true;

    try {
        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({ action: "costume", nome: nome, cognome: cognome, costume: costume })
        });
        const data = await response.json();

        if (data.ok) {
            $("signupForm").innerHTML =
                '<div class="form-message success">YOU\'RE IN! 🎃<br>' + esc(nome) +
                ' as ' + esc(costume) + '.<br>Voting opens after sign-ups close.</div>';
            return;
        }

        show(signupMsg, SIGNUP_ERRORS[data.error] || "Something went wrong. Try again.");
    } catch (error) {
        show(signupMsg, "Something went wrong. Check your connection and try again.");
    }

    signupButton.disabled = false;
    signupButton.textContent = "SIGN UP";
});


/* ---------- invio voto ---------- */

voteButton.addEventListener("click", async function () {
    const voterNome = $("voterNome").value.trim();
    const voterCognome = $("voterCognome").value.trim();

    if (!voterNome || !voterCognome) {
        show(voteMsg, "Enter your first and last name at the top first.");
        window.scrollTo(0, 0);
        return;
    }

    voteButton.disabled = true;
    voteButton.textContent = "SENDING...";
    voteMsg.hidden = true;

    try {
        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "vote",
                voterNome: voterNome,
                voterCognome: voterCognome,
                targetNome: selected.nome,
                targetCognome: selected.cognome
            })
        });
        const data = await response.json();

        if (data.ok) {
            $("voteArea").innerHTML =
                '<div class="form-message success">VOTE RECORDED 🎃<br>Thank you, ' + esc(voterNome) + '.</div>';
            return;
        }

        show(voteMsg, VOTE_ERRORS[data.error] || "Something went wrong. Try again.");
    } catch (error) {
        show(voteMsg, "Something went wrong. Check your connection and try again.");
    }

    voteButton.disabled = false;
    voteButton.textContent = "VOTE";
});

load();
setInterval(load, 30000);
