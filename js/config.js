// js/config.js  (SOSTITUISCE il file di prima)
//
// Formato date: "AAAA-MM-GGTHH:MM:00+01:00"
// (l'ora legale e' finita il 25 ottobre 2026, quindi il 30 ottobre e dopo si usa +01:00)
//   - data e ora  -> scatta a quell'ora
//   - "open"      -> gia' scattato
//   - ""          -> mai (bloccata / nessuna scadenza)
//
// "key" = la chiave della cella B6 del foglio "Orari" (tieni quella che avevi gia' messo).

window.CHOSE_CONFIG = {
    // --- pagine segrete ---
    quiz:     "2026-10-30T21:00:00+01:00",
    beerpong: "2026-10-30T22:30:00+01:00",

    // --- contest dei costumi ---
    signupEnd: "2026-10-30T23:00:00+01:00",   // fine iscrizioni = inizio votazioni
    votingEnd: "2026-10-31T00:30:00+01:00",   // fine votazioni ("" = non si chiudono mai)

    // "auto" = usa gli orari qui sopra
    // "test" = iscrizioni e votazioni sempre aperte
    // "chiuso" = iscrizioni e votazioni chiuse
    mode: "auto",

    key: "INCOLLA_QUI_LA_CHIAVE_DI_B6"
};
