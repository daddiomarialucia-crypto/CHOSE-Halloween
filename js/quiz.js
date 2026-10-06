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
            "Halloween night. You arrive at the casale: isolated farmhouse, dark road, zero phone signal. This is the first fifteen minutes of a horror movie. What is your move?",

        answers: [
            {
                text: "Check that everyone else arrived safely. Somebody has to be the responsible one.",
                type: "SILICON"
            },
            {
                text: "Follow the smell of food. Whatever it is, it's already better than any plan.",
                type: "DSSC"
            },
            {
                text: "Walk straight toward the weirdest noise. That's where the party is.",
                type: "ORGANIC"
            },
            {
                text: "Find the only spot with phone signal. Become very popular.",
                type: "CIGS"
            }
        ]
    },


    {
        question:
            "Something in the lab breaks. Again. Honestly, it's a Tuesday. What do you do?",

        answers: [
            {
                text: "Open it up and poke around. Worst case, it was already broken.",
                type: "PEROVSKITE"
            },
            {
                text: "Read the manual, page by page. Yes, there is a manual. Yes, I'm the only one who knows.",
                type: "SILICON"
            },
            {
                text: "Make everyone a plate of pasta first. Nobody fixes anything on an empty stomach.",
                type: "DSSC"
            },
            {
                text: "Declare it a feature and go refill my drink.",
                type: "ORGANIC"
            }
        ]
    },


    {
        question:
            "The machine breaks and nobody can fix it. Somebody whispers: \"Call Fabio.\" Everyone goes quiet. What do you do?",

        answers: [
            {
                text: "Call Fabio. That's the procedure. Fabio IS the procedure.",
                type: "SILICON"
            },
            {
                text: "Who is Fabio? Has anyone actually seen Fabio in daylight?",
                type: "PEROVSKITE"
            },
            {
                text: "Volunteer the youngest PhD student to call him. Leadership is delegation.",
                type: "CIGS"
            },
            {
                text: "Prepare an offering. Fabio responds well to food.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "The aperitivo table appears. How do you approach it?",

        answers: [
            {
                text: "One spritz, slowly. Someone has to drive home from a farmhouse in the middle of nowhere.",
                type: "SILICON"
            },
            {
                text: "Mix three bottles and call it a new composition. Efficiency unknown.",
                type: "PEROVSKITE"
            },
            {
                text: "Invent a cocktail on the spot and name it after my supervisor. Bitter finish.",
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
            "It's the fifth hour on the same experiment. A fellow PhD student says: \"One more try and we stop.\" What happens?",

        answers: [
            {
                text: "One more try. And then one more. This one is going to be the record.",
                type: "PEROVSKITE"
            },
            {
                text: "Change one parameter at random and pretend it was in the protocol.",
                type: "CIGS"
            },
            {
                text: "Suggest a break. Ten people appear with wine. The experiment is forgotten.",
                type: "ORGANIC"
            },
            {
                text: "Go to the kitchen. Everything looks different after a plate of pasta.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Lunch at the casale. The pasta is on the stove and a heated debate about the right cooking time begins. What do you do?",

        answers: [
            {
                text: "Package time. To the second. Rules exist for a reason.",
                type: "SILICON"
            },
            {
                text: "Drain it early and claim it was intentional. Nobody can prove otherwise.",
                type: "CIGS"
            },
            {
                text: "Add three ingredients nobody asked for and call it fusion.",
                type: "ORGANIC"
            },
            {
                text: "Take the pot. \"Step aside, I'll handle the sauce.\"",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "A strange noise comes from the old machine in the corner. Everyone ignores it, because PhD students learn to ignore everything. You...",

        answers: [
            {
                text: "Switch it off and ask who used it last. Someone has to take this seriously.",
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
                text: "Dim the lights and wait. Mysterious noises are more fun in the dark.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Rumor says something is broken again. Which one makes you panic?",

        answers: [
            {
                text: "The printer. My supervisor wants a paper copy and I don't have one.",
                type: "SILICON"
            },
            {
                text: "The glovebox. My samples are already dying and now it has a hole.",
                type: "PEROVSKITE"
            },
            {
                text: "The moka. No coffee, no PhD. Simple as that.",
                type: "CIGS"
            },
            {
                text: "The stove. If it's broken, nobody eats and the casale falls into chaos.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Somebody asks you to bring something to the party. What do you bring?",

        answers: [
            {
                text: "The reliable choice: chips, napkins and a list of who owes me money.",
                type: "SILICON"
            },
            {
                text: "A homemade drink I invented yesterday. Nobody asked, but it exists.",
                type: "PEROVSKITE"
            },
            {
                text: "Whatever was already in the kitchen. Nobody will notice. I'll take the credit.",
                type: "CIGS"
            },
            {
                text: "Decorations. Glitter, fake spiderwebs and a plastic skeleton that I will absolutely put on someone's desk.",
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
        text: "You are the only PhD student who has actually read the safety rules. You return every tool, label every sample and arrive on time to meetings. Everyone in the lab trusts you, and a small part of them is slightly afraid of you.",
        power: "Works every day for 25 years without complaining.",
        weakness: "A bit rigid, a bit heavy, and deeply offended when someone calls the plan flexible.",
        fabio: "\"Hmph. You can stay.\""
    },

    PEROVSKITE: {
        emoji: "🔮",
        name: "PEROVSKITE",
        title: "The Brilliant Troublemaker",
        text: "Record-breaking efficiency on Monday, completely dead by Friday. You are the most exciting PhD student in the lab and nobody can say how long it will last.",
        power: "Unbelievable results when everything goes right.",
        weakness: "Humidity, heat and anyone who asks: but is it stable?",
        fabio: "\"Don't touch the glovebox. I mean it.\""
    },

    CIGS: {
        emoji: "🧰",
        name: "CIGS",
        title: "The Duct-Tape Genius",
        text: "Copper, indium, gallium, selenium: four ingredients that should not work together. And yet you fix the broken pump with tape, a screwdriver and absolute confidence.",
        power: "Finds a solution when nothing is working.",
        weakness: "Nobody remembers how you did it, including you.",
        fabio: "\"Don't tell me how you fixed it. I don't want to know.\""
    },

    ORGANIC: {
        emoji: "🎨",
        name: "ORGANIC",
        title: "The Flexible Free Spirit",
        text: "Light, colorful and endlessly tunable. You bend without breaking, rewrite the rules and somehow turn every lab disaster into a party.",
        power: "Flexibility, style and excellent vibes.",
        weakness: "Does not survive sunlight, oxygen or the third year of a PhD.",
        fabio: "\"Move the glitter away from the equipment. NOW.\""
    },

    DSSC: {
        emoji: "🍝",
        name: "DSSC",
        title: "The Lab Chef",
        text: "Dye, electrolyte and a lot of atmosphere. You are the cell you can literally make with blackberries and tea, and the reason the whole casale smells like soffritto by lunchtime.",
        power: "Works even in low light, which is perfect for Halloween and for aperitivo lighting.",
        weakness: "There is liquid inside. Leaks, stains and unplanned seconds are possible.",
        fabio: "\"...Is there a plate for me?\""
    },

    TANDEM: {
        emoji: "🥞",
        name: "TANDEM",
        title: "The Overachiever",
        text: "You are not one personality but two, stacked on top of each other. Together you capture more than either could alone.",
        power: "Efficiency beyond what any single material can reach.",
        weakness: "Complicated to build and impossible to explain to your supervisor.",
        fabio: "\"Two of you. Wonderful. Twice the noise.\""
    },

    MULTIJUNCTION: {
        emoji: "🦸",
        name: "MULTIJUNCTION",
        title: "Fabio (Probably)",
        text: "Three or more personalities tied for first place. Nobody knows exactly what you do, but when you are around, everything works. Either you are very rare and expensive, or you are Fabio.",
        power: "Captures the whole spectrum and fixes everything in the lab.",
        weakness: "Extremely expensive. Usually found on satellites, or in the cellar next to the wine.",
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

    add("p", "result-note", "Screenshot your result and send it to the group chat. Fabio has been notified. He did not reply.");

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
