// Funzioni condivise per le pagine segrete (esperimenti, quiz, beer pong)
(function () {
    var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQflHOHp5n1X5xETm_AZFr0DexxANyGDaS0LfX6cMEdZp5jMyIvNUfQI2glB-9bM8IyQ/exec";
    var ORG = new URLSearchParams(window.location.search).get("org") || "";

    // [MODIFICATO] parametro anti-cache &t=...
    function status() {
        return fetch(SCRIPT_URL + "?what=status&t=" + Date.now() + (ORG ? "&org=" + encodeURIComponent(ORG) : ""))
            .then(function (response) { return response.json(); });
    }

    function pad(n) {
        return String(n).padStart(2, "0");
    }

    function format(ms) {
        var s = Math.floor(ms / 1000);
        var d = Math.floor(s / 86400); s -= d * 86400;
        var h = Math.floor(s / 3600); s -= h * 3600;
        var m = Math.floor(s / 60); s -= m * 60;
        return (d > 0 ? d + "d " : "") + pad(h) + ":" + pad(m) + ":" + pad(s);
    }

    // conto alla rovescia: aggiorna "el" ogni secondo e chiama onDone alla fine
    function countdown(el, ms, onDone) {
        var end = Date.now() + ms;
        (function tick() {
            var left = end - Date.now();
            if (left <= 0) {
                el.textContent = "00:00:00";
                if (onDone) onDone();
                return;
            }
            el.textContent = format(left);
            setTimeout(tick, 1000);
        })();
    }

    function make(tag, className, text) {
        var element = document.createElement(tag);
        element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    // schermata "CLASSIFIED" con conto alla rovescia (ms = null: data non decisa)
    function lockBox(ms, onDone) {
        var box = make("div", "lock-box");
        box.appendChild(make("div", "lock-emoji", "🔒"));
        box.appendChild(make("h2", "lock-title", "CLASSIFIED"));
        box.appendChild(make("p", "lock-text", "This experiment is not available yet. The research team is still working on it."));

        if (ms === null || ms === undefined) {
            box.appendChild(make("div", "lock-label", "DECLASSIFICATION DATE: TOP SECRET 🤫"));
        } else {
            box.appendChild(make("div", "lock-label", "DECLASSIFIED IN"));
            var clock = make("div", "countdown", "--:--:--");
            box.appendChild(clock);
            countdown(clock, ms, onDone);
        }

        return box;
    }

    function previewBanner() {
        return make("div", "preview-banner", "Organizers preview: this experiment is still locked for guests.");
    }

    // mantiene ?org=CHIAVE nei link, cosi' chi gestisce puo' navigare le pagine bloccate
    function withOrg(url) {
        return url + (ORG ? "?org=" + encodeURIComponent(ORG) : "");
    }

    window.ChoseLock = {
        ORG: ORG, status: status, countdown: countdown, format: format,
        lockBox: lockBox, previewBanner: previewBanner, withOrg: withOrg
    };
})();
