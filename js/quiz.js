let currentQuestion = 1;

const totalQuestions = 10;


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

    if (currentQuestion >= totalQuestions) {

        document.getElementById("question").textContent =
            "EXPERIMENT COMPLETE! 🎃";


        document.getElementById("questionNumber").textContent =
            "EXPERIMENT COMPLETE";


        document.getElementById("answers").style.display =
            "none";


        document.getElementById("next").style.display =
            "none";


        return;
    }


    currentQuestion++;


    document.getElementById("question").textContent =
        "Question " + currentQuestion;


    document.getElementById("questionNumber").textContent =
        "QUESTION " +
        String(currentQuestion).padStart(2, "0") +
        " / 10";


    document.getElementById("counter").textContent =
        currentQuestion + " / " + totalQuestions;


    document.getElementById("progress").style.width =
        (currentQuestion / totalQuestions * 100) + "%";


    document.querySelectorAll(".answer").forEach(function(answer) {

        answer.classList.remove("selected");

    });


    document.getElementById("next").disabled = true;


    window.scrollTo(0, 0);

}
