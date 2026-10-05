let currentQuestion = 0;

const totalQuestions = 10;

const scores = {
    SILICON: 0,
    PEROVSKITE: 0,
    CIGS: 0,
    ORGANIC: 0,
    DSSC: 0
};


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
                text: "Something classic, perfectly executed and impossible to criticize.",
                type: "SILICON"
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
                text: "Five minutes? That's plenty. Let's rebuild it.",
                type: "SILICON"
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
                text: "They somehow made everything work.",
                type: "CIGS"
            },
            {
                text: "There was definitely something unusual about them.",
                type: "DSSC"
            }
        ]
    }

];


function loadQuestion() {

    const question = questions[currentQuestion];

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
            question.answers[index].text;

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
        questions[currentQuestion]
            .answers[selectedIndex]
            .type;

    scores[selectedType]++;

    if (currentQuestion >= totalQuestions - 1) {
        finishQuiz();
        return;
    }

    currentQuestion++;

    loadQuestion();

    window.scrollTo(0, 0);
}


function finishQuiz() {

    let winner = "SILICON";
    let highestScore = scores.SILICON;

    Object.keys(scores).forEach(function(type) {

        if (scores[type] > highestScore) {

            highestScore = scores[type];
            winner = type;

        }

    });


    document.getElementById("question").textContent =
        "EXPERIMENT COMPLETE! 🎃";

    document.getElementById("questionNumber").textContent =
        "EXPERIMENT COMPLETE";

    document.getElementById("answers").style.display =
        "none";

    document.getElementById("next").style.display =
        "none";

    document.getElementById("counter").textContent =
        winner;

    console.log("FINAL SCORES:", scores);
}


/*
    Make the functions explicitly available
    to the onclick attributes in quiz.html.
*/

window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;


loadQuestion();
