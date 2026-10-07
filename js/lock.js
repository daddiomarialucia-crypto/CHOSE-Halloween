// Funzioni condivise per le pagine segrete (esperimenti, quiz, beer pong)
(function () {
    var ORG = new URLSearchParams(window.location.search).get("org") || "";
    var CFG = window.CHOSE_CONFIG || {};

    // "2026-10-30T21:00:00+01:00" -> { open, ms }
    function parse(value) {
        var v = String(value || "").trim();
        if (!v) return { open: false, ms: null };
        if (v.toLowerCase() === "open") return { open: true, ms: 0 };

        var t = Date.parse(v);
        if (isNaN(t)) return { open: false, ms: null };

        var ms = t - Date.now();
        return { open: ms <= 0, ms: ms > 0 ? ms : 0 };
    }

    // [MODIFICATO] niente piu' richiesta al server: risponde subito
    function status() {
        return Promise.resolve({
            quiz: parse(CFG.quiz),
            beerpong: parse(CFG.beerpong),
            organizer: ORG !== "" && ORG === String(CFG.key || "")
        });
    }

    // [NUOVO] "2026-10-30T21:00:00+01:00" -> millisecondi (null = mai, 0 = gia' scattato)
    function time(value) {
        var v = String(value || "").trim();
        if (!v) return null;
        if (v.toLowerCase() === "open") return 0;
        var t = Date.parse(v);
        return isNaN(t) ? null : t;
    }

    // [NUOVO] fase del contest: iscrizioni / votazioni (stessa logica del server)
    function phase() {
        var mode = String(CFG.mode || "auto").trim().toLowerCase();
        var now = Date.now();

        if (mode === "chiuso") return { signup: false, voting: false, switchMs: null, endMs: null };
        if (mode === "test")   return { signup: true,  voting: true,  switchMs: null, endMs: null };

        var t1 = time(CFG.signupEnd);
        var t2 = time(CFG.votingEnd);

        return {
            signup: t1 === null || now < t1,
            voting: t1 !== null && now >= t1 && (t2 === null || now < t2),
            switchMs: (t1 !== null && now < t1) ? t1 - now : null,
            endMs: (t2 !== null && now < t2) ? t2 - now : null
        };
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
        ORG: ORG, status: status, phase: phase, countdown: countdown, format: format,
        lockBox: lockBox, previewBanner: previewBanner, withOrg: withOrg
    };
})();
