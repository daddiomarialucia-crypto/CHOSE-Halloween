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
            "You arrive at the research facility and realize the Halloween party has already started. What's your first move?",

        answers: [
            {
                text: "Find out what's going on and get straight into the action.",
                type: "SILICON"
            },
            {
                text: "Observe the room for a moment. Something feels... interesting.",
                type: "DSSC"
            },
            {
                text: "Ignore the plan. Find the most unusual person in the room and introduce yourself.",
                type: "ORGANIC"
            },
            {
                text: "Check that everything is running smoothly before joining the party.",
                type: "CIGS"
            }
        ]
    },


    {
        question:
            "Your experiment suddenly produces a result nobody expected. What do you do?",

        answers: [
            {
                text: "Perfect. This is exactly the kind of chaos I was hoping for.",
                type: "PEROVSKITE"
            },
            {
                text: "Stay calm, figure out what changed, and work around it.",
                type: "CIGS"
            },
            {
                text: "Document everything immediately. Unexpected results are still results.",
                type: "SILICON"
            },
            {
                text: "Follow the strange result. It might lead somewhere much more interesting.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Someone challenges you to a completely unnecessary competition at the party. Your reaction?",

        answers: [
            {
                text: "Absolutely. I was hoping someone would ask.",
                type: "SILICON"
            },
            {
                text: "Depends. Is there a clever way to win without doing all the work?",
                type: "CIGS"
            },
            {
                text: "I'll participate, but I'm probably going to make up my own rules.",
                type: "ORGANIC"
            },
            {
                text: "I have no idea why we're doing this, but somehow I am already involved.",
                type: "PEROVSKITE"
            }
        ]
    },


    {
        question:
            "The lights suddenly go out. The entire laboratory is dark. What happens next?",

        answers: [
            {
                text: "Someone needs to take control. I'll handle it.",
                type: "SILICON"
            },
            {
                text: "Wait... why does the darkness actually make this place look better?",
                type: "ORGANIC"
            },
            {
                text: "No problem. I'll find another way to keep things moving.",
                type: "CIGS"
            },
            {
                text: "Don't turn the lights back on yet. This is getting interesting.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "You are allowed to design one completely ridiculous Halloween experiment. What do you choose?",

        answers: [
            {
                text: "Something beautiful, weird and probably impossible to explain afterwards.",
                type: "ORGANIC"
            },
            {
                text: "Something that has never been attempted before.",
                type: "PEROVSKITE"
            },
            {
                text: "Something surprisingly practical that actually works.",
                type: "SILICON"
            },
            {
                text: "Something mysterious involving strange lights, glowing liquids and absolutely no explanation.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Your team has 30 minutes to solve a problem before the experiment begins. How do you behave?",

        answers: [
            {
                text: "Make a plan. Divide the work. Get it done.",
                type: "SILICON"
            },
            {
                text: "Try three completely different approaches and see what survives.",
                type: "PEROVSKITE"
            },
            {
                text: "Find the simplest solution nobody else noticed.",
                type: "CIGS"
            },
            {
                text: "Let everyone contribute. The weird idea might be the one that works.",
                type: "ORGANIC"
            }
        ]
    },


    {
        question:
            "You discover that the mysterious object on the lab table is actually part of tonight's experiment. What do you do?",

        answers: [
            {
                text: "Touch nothing until someone explains the procedure.",
                type: "SILICON"
            },
            {
                text: "I need to know what it does. Immediately.",
                type: "PEROVSKITE"
            },
            {
                text: "Look at it from every possible angle. There has to be a clue.",
                type: "CIGS"
            },
            {
                text: "If nobody knows what it is, I am definitely pressing the button.",
                type: "DSSC"
            }
        ]
    },


    {
        question:
            "Which Halloween costume would suit you best?",

        answers: [
            {
                text: "Something that glows in the dark and makes people wonder how it works.",
                type: "DSSC"
            },
            {
                text: "Something nobody has ever seen before.",
                type: "PEROVSKITE"
            },
            {
                text: "Something clever that looks simple but has a very good reason behind it.",
                type: "CIGS"
            },
            {
                text: "Something elegant, strange and slightly difficult to explain.",
                type: "ORGANIC"
            }
        ]
    },


    {
        question:
            "Your experiment fails five minutes before the party. What is your response?",

        answers: [
            {
                text: "Stare at it in silence for a moment. The explanation is hiding somewhere in there.",
                type: "DSSC"
            },
            {
                text: "Well... that wasn't supposed to happen. Interesting.",
                type: "PEROVSKITE"
            },
            {
                text: "Salvage what works, change the approach and keep going.",
                type: "CIGS"
            },
            {
                text: "Maybe it didn't fail. Maybe it discovered something.",
                type: "ORGANIC"
            }
        ]
    },


    {
        question:
            "At the end of the night, what would you like people to say about you?",

        answers: [
            {
                text: "You could always count on them.",
                type: "SILICON"
            },
            {
                text: "I have absolutely no idea what they were doing, but it was impressive.",
                type: "PEROVSKITE"
            },
            {
                text: "They made the whole night a little more colorful.",
                type: "ORGANIC"
            },
            {
                text: "There was definitely something unusual about them.",
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
        text: "You are the benchmark everyone else is measured against. You show up, you do the job and you rarely make a scene. Nobody throws a good party without someone like you.",
        power: "Decades of proven reliability.",
        weakness: "A little rigid, a little heavy, and quietly offended when someone calls you boring."
    },

    PEROVSKITE: {
        emoji: "🔮",
        name: "PEROVSKITE",
        title: "The Brilliant Troublemaker",
        text: "Spectacular efficiency, unpredictable behavior. You light up the room and nobody is entirely sure how long it will last.",
        power: "Record-breaking performance in record time.",
        weakness: "Stability. Please keep away from humidity, heat and unexpected situations."
    },

    CIGS: {
        emoji: "🧩",
        name: "CIGS",
        title: "The Clever Problem Solver",
        text: "Copper, indium, gallium, selenium: four ingredients that shouldn't work together, and somehow do. You are the one who quietly fixes everything while the others argue.",
        power: "Thin, flexible and surprisingly effective.",
        weakness: "The recipe is complicated, and nobody remembers that you did the hard part."
    },

    ORGANIC: {
        emoji: "🎨",
        name: "ORGANIC",
        title: "The Flexible Free Spirit",
        text: "Light, colorful and endlessly tunable. You bend without breaking, rewrite the rules and make everything look better in the process.",
        power: "Flexibility and style.",
        weakness: "Needs encapsulation, moral support and a plan for tomorrow morning."
    },

    DSSC: {
        emoji: "🧪",
        name: "DSSC",
        title: "The Mysterious Dreamer",
        text: "Dye, electrolyte and a lot of atmosphere. You are inspired by nature, you work beautifully in dim light and you were clearly made for nights like this.",
        power: "Performs best when the lights are low.",
        weakness: "There is liquid inside. Handle with care, leaks are possible."
    },

    TANDEM: {
        emoji: "🥞",
        name: "TANDEM",
        title: "The Overachiever",
        text: "You are not one personality but two, stacked on top of each other. Together you capture more than either could alone.",
        power: "Efficiency beyond what a single material can reach.",
        weakness: "Complicated to build and even harder to explain at a party."
    },

    MULTIJUNCTION: {
        emoji: "🛰️",
        name: "MULTIJUNCTION",
        title: "The Impossible to Classify",
        text: "Three or more personalities tied for first place. You harvest every color of the party at once.",
        power: "Captures the whole spectrum.",
        weakness: "Extremely expensive. Usually found on satellites."
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

    add("p", "result-note", "Screenshot your result and send it to the group chat.");

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
