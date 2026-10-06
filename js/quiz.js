let currentQuestion = 0;

const totalQuestions = 10;

const scores = {
    SILICON: 0,
    PEROVSKITE: 0,
    CIGS: 0,
    ORGANIC: 0,
    DSSC: 0
};

// Le risposte della domanda corrente, in ordine mescolato
let currentAnswers = [];


const questions = [

    {
        question:
            "You walk into the lab on Halloween night and the whole corridor smells like a restaurant. What is your first thought?",

        answers: [
            {
                text: "Is anyone watching the stove? Somebody here has to be responsible.",
                type: "SILICON"
            },
            {
                text: "Whatever it is, I want the recipe. And I'm already holding a fork.",
                type: "DSSC"
            },
            {
                text: "Follow the smell. The best parties always start near the stove.",
                type: "ORGANIC"
            },
            {
                text: "Smart plan: arrive early, taste everything, look very busy.",
                type: "CIGS"
            }
        ]
    },


    {
        question:
            "Something in the lab breaks. Again. What do you do?",

        answers: [
            {
                text: "Open it up and poke around inside. This is how breakthroughs happen.",
                type: "PEROVSKITE"
            },
            {
                text: "Check the logbook. This exact thing broke in 2023 and I wrote down the fix.",
                type: "SILICON"
            },
            {
                text: "Stare at it in silence until it feels guilty.",
                type: "DSSC"
            },
            {
                text: "Declare it an art installation and keep partying.",
                type: "ORGANIC"
            }
        ]
    },


    {
        question:
            "Something really breaks and nobody knows how to fix it. Somebody whispers: \"Call Fabio.\" What do you do?",

        answers: [
            {
                text: "Call Fabio. Fabio always knows. That is why we have Fabio.",
                type: "SILICON"
            },
            {
                text: "Who is Fabio? Has anyone actually seen Fabio?",
                type: "PEROVSKITE"
            },
            {
                text: "I fix it myself before Fabio hears about it. Tape, screwdriver and confidence.",
                type: "CIGS"
            },
            {
                text: "Fabio is not a person. Fabio is a concept. I respect that.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "The aperitivo table appears. How do you approach it?",

        answers: [
            {
                text: "One spritz, slowly, while quietly keeping an eye on everyone else's glasses.",
                type: "SILICON"
            },
            {
                text: "Mix three random bottles and call it a new composition. Efficiency unknown.",
                type: "PEROVSKITE"
            },
            {
                text: "Invent a cocktail on the spot and name it after someone in the lab.",
                type: "ORGANIC"
            },
            {
                text: "Read every label twice. The ethanol for cleaning and the ethanol for drinking are NOT the same bottle.",
                type: "CIGS"
            }
        ]
    },


    {
        question:
            "You find an unlabeled container of leftovers sitting in the sample fridge. What now?",

        answers: [
            {
                text: "Open it. Science is about taking risks.",
                type: "PEROVSKITE"
            },
            {
                text: "Analyze it from every angle: smell, color, date. Then decide.",
                type: "CIGS"
            },
            {
                text: "Heat it up and share it with everyone. Lunch is a collective experiment.",
                type: "ORGANIC"
            },
            {
                text: "That's a family recipe. I can tell by the smell. Somebody's grandmother is involved.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "It is 11:45 and the whole lab starts cooking lunch. How do you behave?",

        answers: [
            {
                text: "Be there at 12:00 sharp with my own fork and my own Tupperware, as always.",
                type: "SILICON"
            },
            {
                text: "Offer to help, end up with the best seat and the first plate.",
                type: "CIGS"
            },
            {
                text: "Add my own spice to everybody's pot and call it collaboration.",
                type: "ORGANIC"
            },
            {
                text: "I'm the one stirring the pot. Everyone agrees the sauce is mine.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "A strange noise comes from the old machine in the corner. Everybody ignores it. You...",

        answers: [
            {
                text: "Write it down in the logbook. Someone has to take this seriously.",
                type: "SILICON"
            },
            {
                text: "Turn it up. The more dramatic the noise, the faster we find out what it does.",
                type: "PEROVSKITE"
            },
            {
                text: "Add a beat to it. Suddenly it's the party playlist.",
                type: "ORGANIC"
            },
            {
                text: "Whisper to it. Some machines respond to kindness.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Rumor says something is broken again. Which one makes you panic?",

        answers: [
            {
                text: "The printer. How will I print fourteen copies of the protocol?",
                type: "SILICON"
            },
            {
                text: "The glovebox. My samples are already dying and now it has a hole.",
                type: "PEROVSKITE"
            },
            {
                text: "The coffee machine. No coffee, no solutions.",
                type: "CIGS"
            },
            {
                text: "The kitchen stove. If it's broken, nothing smells good anymore.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Somebody asks you to bring something to the party. What do you bring?",

        answers: [
            {
                text: "The reliable choice: chips, napkins and a list of who brought what.",
                type: "SILICON"
            },
            {
                text: "A homemade drink I invented yesterday. Nobody asked, but it exists.",
                type: "PEROVSKITE"
            },
            {
                text: "Whatever the lab kitchen already had. Nobody will notice. I'll take the credit.",
                type: "CIGS"
            },
            {
                text: "Decorations. Glitter, fake spiderwebs and an inflatable ghost I'll hide near the equipment.",
                type: "ORGANIC"
            }
        ]
    },


    {
        question:
            "At the end of the night, what would you like people to say about you?",

        answers: [
            {
                text: "Incredible performance. Nobody knows what happened to the furniture.",
                type: "PEROVSKITE"
            },
            {
                text: "Somehow everything worked out. Nobody knows how, but Fabio would be proud.",
                type: "CIGS"
            },
            {
                text: "The most colorful person at the party.",
                type: "ORGANIC"
            },
            {
                text: "Best food, best smell, best leftovers. Five stars.",
                type: "DSSC"
            }
        ]
    }

];


const RESULTS = {

    SILICON: {
        emoji: "☀️",
        name: "SILICON",
        title: "The Reliable Classic",
        text: "You label every sample, return every tool and always know where the good screwdriver is. Everyone in the lab trusts you, and a small part of them is slightly afraid of you.",
        power: "Works every day for 25 years without complaining.",
        weakness: "A bit rigid, a bit heavy, and deeply offended when someone puts lunch in the sample fridge.",
        fabio: "\"Reliable. If I ever retire, I want you to take my spot.\""
    },

    PEROVSKITE: {
        emoji: "🔮",
        name: "PEROVSKITE",
        title: "The Brilliant Troublemaker",
        text: "Record-breaking efficiency on Monday, completely dead by Friday. You are the most exciting thing in the lab and nobody can say how long it will last.",
        power: "Unbelievable results when everything goes right.",
        weakness: "Humidity, heat and anyone who asks: but is it stable?",
        fabio: "\"Please don't open the glovebox again.\""
    },

    CIGS: {
        emoji: "🧰",
        name: "CIGS",
        title: "The Duct-Tape Genius",
        text: "Copper, indium, gallium, selenium: four ingredients that should not work together. And yet you fix the broken pump with tape, a screwdriver and absolute confidence.",
        power: "Finds a solution when nothing is working.",
        weakness: "Nobody remembers how you did it, including you.",
        fabio: "\"I have no idea how you did it. Don't tell me.\""
    },

    ORGANIC: {
        emoji: "🎨",
        name: "ORGANIC",
        title: "The Flexible Free Spirit",
        text: "Light, colorful and endlessly tunable. You bend without breaking, rewrite the rules and somehow turn every lab disaster into a party.",
        power: "Flexibility, style and excellent vibes.",
        weakness: "Does not survive sunlight, oxygen or Monday mornings.",
        fabio: "\"Lovely. Now please move the glitter away from the equipment.\""
    },

    DSSC: {
        emoji: "🍝",
        name: "DSSC",
        title: "The Lab Chef",
        text: "Dye, electrolyte and a lot of atmosphere. You are the cell you can literally make with blackberries and tea, and you are the reason the whole corridor smells like ragù at 11 AM.",
        power: "Works even in low light, which is perfect for Halloween and for aperitivo lighting.",
        weakness: "There is liquid inside. Leaks, stains and unplanned seconds are possible.",
        fabio: "\"Whatever you're cooking, save me a plate.\""
    },

    TANDEM: {
        emoji: "🥞",
        name: "TANDEM",
        title: "The Overachiever",
        text: "You are not one personality but two, stacked on top of each other. Together you capture more than either could alone.",
        power: "Efficiency beyond what any single material can reach.",
        weakness: "Complicated to build and impossible to explain to the person who orders the materials.",
        fabio: "\"Two of you? Good. Now I have two people to call.\""
    },

    MULTIJUNCTION: {
        emoji: "🦸",
        name: "MULTIJUNCTION",
        title: "Fabio (Probably)",
        text: "Three or more personalities tied for first place. Nobody knows exactly what you do, but when you are around, everything works. Either you are very rare and expensive, or you are Fabio.",
        power: "Captures the whole spectrum and fixes everything in the lab.",
        weakness: "Extremely expensive. Usually found on satellites, or in the basement.",
        fabio: "\"...Do I know you?\""
    }

};


function shuffle(list) {

    for (let i = list.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        const temp = list[i];

        list[i] = list[j];
        list[j] = temp;

    }

    return list;
}


function loadQuestion() {

    const question = questions[currentQuestion];

    // ordine delle risposte diverso a ogni domanda
    currentAnswers = shuffle(question.answers.slice());

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("questionNumber").textContent =
        "QUESTION " +
        String(currentQuestion + 1).padStart(2, "0") +
        " / " +
        totalQuestions;

    document.getElementById("counter").textContent =
        (currentQuestion + 1) +
        " / " +
        totalQuestions;

    document.getElementById("progress").style.width =
        ((currentQuestion + 1) / totalQuestions * 100) +
        "%";

    const answerButtons =
        document.querySelectorAll(".answer");

    answerButtons.forEach(function(button, index) {

        button.textContent =
            currentAnswers[index].text;

        button.classList.remove("selected");

    });

    document.getElementById("next").disabled = true;
}


function selectAnswer(button) {

    const answers =
        document.querySelectorAll(".answer");

    answers.forEach(function(answer) {
        answer.classList.remove("selected");
    });

    button.classList.add("selected");

    document.getElementById("next").disabled = false;
}


function nextQuestion() {

    const selectedAnswer =
        document.querySelector(".answer.selected");

    if (!selectedAnswer) {
        return;
    }

    const answerButtons =
        Array.from(document.querySelectorAll(".answer"));

    const selectedIndex =
        answerButtons.indexOf(selectedAnswer);

    const selectedType =
        currentAnswers[selectedIndex].type;

    scores[selectedType]++;

    if (currentQuestion >= totalQuestions - 1) {
        finishQuiz();
        return;
    }

    currentQuestion++;

    loadQuestion();

    window.scrollTo(0, 0);
}


function pickResult() {

    const types = Object.keys(scores);

    const highest = Math.max.apply(null, types.map(function(type) {
        return scores[type];
    }));

    const leaders = types.filter(function(type) {
        return scores[type] === highest;
    });

    // un solo primo posto: quel tipo
    if (leaders.length === 1) {
        return { key: leaders[0], text: RESULTS[leaders[0]].text };
    }

    // pareggio tra due: tandem
    if (leaders.length === 2) {
        return {
            key: "TANDEM",
            text: RESULTS.TANDEM.text +
                  " Your two halves: " + leaders[0] + " + " + leaders[1] + "."
        };
    }

    // pareggio tra tre o piu': multigiunzione
    return { key: "MULTIJUNCTION", text: RESULTS.MULTIJUNCTION.text };
}


function makeTrait(label, text) {

    const trait = document.createElement("div");
    trait.className = "trait";

    const strong = document.createElement("strong");
    strong.textContent = label;

    trait.appendChild(strong);
    trait.appendChild(document.createTextNode(text));

    return trait;
}


function finishQuiz() {

    const picked = pickResult();
    const result = RESULTS[picked.key];

    // nasconde le domande
    [
        ".progress-container",
        "#questionNumber",
        "#question",
        "#answers",
        ".quiz-bottom"
    ].forEach(function(selector) {
        document.querySelector(selector).style.display = "none";
    });

    const box = document.createElement("div");
    box.className = "result";

    function add(tag, className, text) {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = text;
        box.appendChild(element);
    }

    add("div", "result-emoji", result.emoji);
    add("div", "result-label", "YOUR SOLAR CELL IS");
    add("h2", "result-name", result.name);
    add("div", "result-title", result.title);
    add("p", "result-text", picked.text);

    box.appendChild(makeTrait("SUPERPOWER", result.power));
    box.appendChild(makeTrait("WEAKNESS", result.weakness));
    box.appendChild(makeTrait("FABIO SAYS", result.fabio));

    // percentuali
    const bars = document.createElement("div");
    bars.className = "result-bars";

    Object.keys(scores).forEach(function(type) {

        const percent = scores[type] / totalQuestions * 100;

        const row = document.createElement("div");
        row.className = "bar-row";

        const label = document.createElement("span");
        label.textContent = RESULTS[type].name;

        const track = document.createElement("div");
        track.className = "bar-track";

        const fill = document.createElement("div");
        fill.className = "bar-fill";
        fill.style.width = percent + "%";
        track.appendChild(fill);

        const value = document.createElement("span");
        value.textContent = Math.round(percent) + "%";

        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(value);
        bars.appendChild(row);

    });

    box.appendChild(bars);

    add("p", "result-note", "Screenshot your result and send it to the group chat. Fabio will be notified.");

    const again = document.createElement("button");
    again.className = "next";
    again.textContent = "TAKE THE TEST AGAIN";
    again.addEventListener("click", function() {
        window.location.reload();
    });
    box.appendChild(again);

    const back = document.querySelector(".back-button");
    back.parentNode.insertBefore(box, back);

    window.scrollTo(0, 0);
}


/*
    Make the functions explicitly available
    to the onclick attributes in quiz.html.
*/

window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;


loadQuestion();
