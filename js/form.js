// Incolla qui l'URL dell'app web di Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQflHOHp5n1X5xETm_AZFr0DexxANyGDaS0LfX6cMEdZp5jMyIvNUfQI2glB-9bM8IyQ/exec";

const form = document.getElementById("form");
const message = document.getElementById("message");
const submitButton = document.getElementById("submit");
const plusBox = document.getElementById("plusBox");

// Campi del +1 obbligatori solo se si porta un +1
const PLUS_REQUIRED = ["piuNome", "piuCognome", "piuAlcol", "piuGiochi"];

form.querySelectorAll('input[name="plusUno"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        const bringing = form.elements["plusUno"].value === "si";
        plusBox.hidden = !bringing;

        plusBox.querySelectorAll("input, textarea").forEach(function (field) {
            field.required = bringing && PLUS_REQUIRED.indexOf(field.name) !== -1;

            if (!bringing) {
                if (field.type === "radio") field.checked = false;
                else field.value = "";
            }
        });
    });
});

function contestLink(first, last, label) {
    const link = document.createElement("a");
    link.className = "next contest-button";
    link.href = "vote.html?n=" + encodeURIComponent(first) + "&c=" + encodeURIComponent(last);
    link.textContent = label;
    return link;
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "SENDING...";
    message.hidden = true;

    const data = Object.fromEntries(new FormData(form));

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(data)
        });

        const box = document.createElement("div");
        box.className = "form-message success";
        box.appendChild(document.createTextNode("REGISTRATION COMPLETE 🎃"));
        box.appendChild(document.createElement("br"));
        box.appendChild(document.createTextNode("See you in the lab, " + data.nome + "."));

        // invito alla gara dei costumi (con promemoria per il +1)
        const contest = document.createElement("div");
        contest.className = "contest-box";
        contest.style.textAlign = "center";

        const lead = document.createElement("p");
        lead.className = "contest-note";
        lead.textContent = "Want to enter the costume contest?";
        contest.appendChild(lead);
        contest.appendChild(contestLink(data.nome, data.cognome, "SIGN UP FOR THE COSTUME CONTEST →"));

        if (data.plusUno === "si") {
            const reminder = document.createElement("p");
            reminder.className = "contest-note";
            reminder.textContent = "(Remember to sign up your +1 too!)";
            contest.appendChild(reminder);
            contest.appendChild(contestLink(data.piuNome, data.piuCognome, "SIGN UP " + String(data.piuNome).toUpperCase() + " TOO →"));
        }

        form.innerHTML = "";
        form.appendChild(box);
        form.appendChild(contest);
    } catch (error) {
        message.textContent = "Something went wrong. Check your connection and try again.";
        message.hidden = false;
        submitButton.disabled = false;
        submitButton.textContent = "REGISTER";
    }
});
