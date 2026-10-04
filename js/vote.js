// Stesso URL che hai messo in form.js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQflHOHp5n1X5xETm_AZFr0DexxANyGDaS0LfX6cMEdZp5jMyIvNUfQI2glB-9bM8IyQ/exec";

const content = document.getElementById("content");
const listEl = document.getElementById("list");
const searchEl = document.getElementById("search");
const pickedEl = document.getElementById("picked");
const voteButton = document.getElementById("vote");
const message = document.getElementById("message");

let candidates = [];
let selected = null;

const ERRORS = {
    closed: "Voting is not open yet.",
    not_registered: "We can't find you in the registration list. Check your name or ask the organizers.",
    self_vote: "You can't vote for yourself!",
    already_voted: "You have already voted. One vote each!",
    bad_target: "This contestant is not valid. Refresh the page and try again."
};

function clean(text) {
    return String(text).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function showMessage(text) {
    message.textContent = text;
    message.hidden = false;
}

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
            message.hidden = true;
            render();
        });

        listEl.appendChild(button);
    });
}

async function load() {
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();

        if (!data.open) {
            content.innerHTML = '<div class="empty">Voting opens on Halloween night. 🎃</div>';
            return;
        }

        candidates = data.candidates.sort(function (a, b) {
            return a.nome.localeCompare(b.nome, "it", { sensitivity: "base" }) ||
                   a.cognome.localeCompare(b.cognome, "it", { sensitivity: "base" });
        });

        render();
    } catch (error) {
        listEl.innerHTML = '<div class="empty">Could not load the list. Refresh the page.</div>';
    }
}

searchEl.addEventListener("input", render);

voteButton.addEventListener("click", async function () {
    const voterNome = document.getElementById("voterNome").value.trim();
    const voterCognome = document.getElementById("voterCognome").value.trim();

    if (!voterNome || !voterCognome) {
        showMessage("Enter your first and last name at the top first.");
        window.scrollTo(0, 0);
        return;
    }

    voteButton.disabled = true;
    voteButton.textContent = "SENDING...";
    message.hidden = true;

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
            content.innerHTML =
                '<div class="form-message success">VOTE RECORDED 🎃<br>Thank you, ' +
                voterNome.replace(/[<>&]/g, "") + ".</div>";
            return;
        }

        showMessage(ERRORS[data.error] || "Something went wrong. Try again.");
    } catch (error) {
        showMessage("Something went wrong. Check your connection and try again.");
    }

    voteButton.disabled = false;
    voteButton.textContent = "VOTE";
});

load();
