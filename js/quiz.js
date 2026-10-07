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
            "Halloween night. You arrive at the casale: isolated farmhouse, dark road, fog, one single light on in a window. This is the first fifteen minutes of a horror movie. What is your move?",

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
                text: "Arrive exactly when the setup is done and the food is ready. Timing is a skill.",
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
                text: "Stick an OUT OF ORDER sign on it, politely, and move on to plan B.",
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
                text: "Count the bottles, count the guests. The math has to work.",
                type: "SILICON"
            },
            {
                text: "Mix three bottles and call it a new composition. Efficiency unknown.",
                type: "PEROVSKITE"
            },
            {
                text: "Spritz, wine, a bit of both. I'm very flexible.",
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
            "Lunch is over. The sink is full of dishes and nobody is moving. What do you do?",

        answers: [
            {
                text: "Wash them. Immediately. A sink like this is an insult to civilization.",
                type: "SILICON"
            },
            {
                text: "Create a rota. Make sure my name appears on it as little as possible.",
                type: "CIGS"
            },
            {
                text: "Put on loud music until washing dishes becomes a dance party.",
                type: "ORGANIC"
            },
            {
                text: "I cooked. The rule is that the cook doesn't wash. It's the oldest law of the casale.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Midnight. Somebody proposes telling ghost stories in the dark, at the casale, on Halloween. You...",

        answers: [
            {
                text: "Check that all the doors are locked. Somebody has to.",
                type: "SILICON"
            },
            {
                text: "Make up the most dramatic story possible and swear it's true.",
                type: "PEROVSKITE"
            },
            {
                text: "Add voices, sound effects and a dance. It's now a musical.",
                type: "ORGANIC"
            },
            {
                text: "Light a candle, lower my voice and enjoy being scary.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Rumor says something is broken again. Which one makes you panic?",

        answers: [
            {
                text: "The heating. It's a farmhouse in October. I'm already wearing three layers.",
                type: "SILICON"
            },
            {
                text: "The glovebox. My samples are already dying and now it has a hole.",
                type: "PEROVSKITE"
            },
            {
                text: "The moka. Nobody in this lab survives the morning without it.",
                type: "CIGS"
            },
            {
                text: "The big pasta pot. Without it we would have to cook in two batches. Unacceptable.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "It's late, and somebody appears with a bottle of homemade limoncello. What do you do?",

        answers: [
            {
                text: "One small glass. Slowly. Then water. I have plans for tomorrow.",
                type: "SILICON"
            },
            {
                text: "Pour it for everyone. Whatever happens next is data.",
                type: "PEROVSKITE"
            },
            {
                text: "Offer to carry the bottle to the kitchen. It does not always arrive.",
                type: "CIGS"
            },
            {
                text: "Turn it into a cocktail with whatever is on the table. Garnish: a plastic spider.",
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
        weakness: "Does not survive sunlight, oxygen or Monday mornings.",
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


function startQuiz() {

    document.getElementById("quizBody").hidden = false;

    loadQuestion();
}


// Il quiz e' segreto: parte solo se sbloccato (o se si entra con ?org=CHIAVE)
ChoseLock.status().then(function(s) {

    const gate = document.getElementById("gate");
    gate.innerHTML = "";

    if (s.quiz.open || s.organizer) {

        if (!s.quiz.open) {
            gate.appendChild(ChoseLock.previewBanner());
        }

        startQuiz();
        return;
    }

    gate.appendChild(ChoseLock.lockBox(s.quiz.ms, function() {
        window.location.reload();
    }));

}).catch(function() {

    document.getElementById("gate").textContent =
        "Could not check clearance. Refresh the page.";

});
