// js/config.js  (FILE NUOVO: crealo dentro la cartella js)
//
// Orari di sblocco delle pagine segrete.
// Formato: "AAAA-MM-GGTHH:MM:00+01:00"  (il 30 ottobre l'Italia e' a +01:00)
//   - data e ora  -> la pagina si sblocca a quell'ora
//   - "open"      -> sbloccata subito
//   - ""          -> bloccata, senza data ("TOP SECRET")
//
// "key" deve essere UGUALE alla chiave scritta nella cella B6 del foglio "Orari".
// Con la chiave, aprendo la pagina con ?org=CHIAVE si vedono anche le pagine bloccate.

window.CHOSE_CONFIG = {
    quiz:     "2026-10-30T18:00:00+01:00",
    beerpong: "2026-10-30T18:00:00+01:00",
    key:      "fd7236c3"
};
