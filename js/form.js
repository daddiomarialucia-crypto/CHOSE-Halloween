// Incolla qui l'URL dell'app web di Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQflHOHp5n1X5xETm_AZFr0DexxANyGDaS0LfX6cMEdZp5jMyIvNUfQI2glB-9bM8IyQ/exec";

const form = document.getElementById("form");
const message = document.getElementById("message");
const submitButton = document.getElementById("submit");
const costumeBox = document.getElementById("costumeBox");
const costumeName = document.getElementById("nomeCostume");

form.querySelectorAll('input[name="costume"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        const joining = form.elements["costume"].value === "si";
        costumeBox.hidden = !joining;
        costumeName.required = joining;
        if (!joining) costumeName.value = "";
    });
});

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

        form.innerHTML =
            '<div class="form-message success">REGISTRATION COMPLETE 🎃<br>' +
            "See you in the lab, " + data.nome + ".</div>";
    } catch (error) {
        message.textContent = "Something went wrong. Check your connection and try again.";
        message.hidden = false;
        submitButton.disabled = false;
        submitButton.textContent = "REGISTER";
    }
});
