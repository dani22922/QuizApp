let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Von wem ist On Hit Wonder: Ice Ice Baby ?",
        "answer_1": "Chocolate Ice",
        "answer_2": "Freeze",
        "answer_3": "Vanilla Ice",
        "answer_4": "Iceman",
        "right_answer": 3
    },
    {
        "question": "Welcher im Januar 2008 verstorbene Schauspieler spielte im Kinofilm: The Dark Knight den Joker?",
        "answer_1": "Arnorld Schwarznegger",
        "answer_2": "Heath Ledger",
        "answer_3": "Jack Nicholson",
        "answer_4": "Jim Carrey",
        "right_answer": 2
    },
    {
        "question": "Der Hauptdarsteller in Stirb langsam ist...?",
        "answer_1": "Bruce Willis",
        "answer_2": "Morgan Freeman",
        "answer_3": "Denzel Washingotn",
        "answer_4": "Günther Jauch",
        "right_answer": 1
    },
    {
        "question": "Wer hat den Song 99 Luftballons gesungen?",
        "answer_1": "Andrea Berg",
        "answer_2": "Helene Fischer",
        "answer_3": "SIDO",
        "answer_4": "Nena",
        "right_answer": 4
    },
    {
        "question": "Wer hat den Hitsong Easy gesungen?",
        "answer_1": "Cro",
        "answer_2": "Sunny",
        "answer_3": "Kool Savas",
        "answer_4": "Drake",
        "right_answer": 1
    }
];

let currentQuestion = 0;
let rightQuestions = 0;
let audioSuccess = new Audio('sounds/correct.mp3');
let audioWrong = new Audio('sounds/wrong.mp3');

function init() {
    document.getElementById('all-qs').innerHTML = questions.length;

    showQuestion();

}

function showQuestion() {

    if (currentQuestion >= questions.length) {
        showEndScreen();
    } else { // Show Question

        let percent = (currentQuestion + 1) / questions.length;
        percent = Math.round(percent * 100);
        document.getElementById('progress-bar').innerHTML = `${percent}%`;
        document.getElementById('progress-bar').style = `width:${percent}%`;

        let question = questions[currentQuestion];

        document.getElementById('q-number').innerHTML = currentQuestion + 1;
        document.getElementById('question-text').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}

function answer(selection) { // selection ist answer_1,2,3,4 jenachdem welche Antwort angeklickt wird.
    let question = questions[currentQuestion]; // Die Variable question ist die 0. Position aus unserem JSON ARRAY questions
    let selectedQuestionNumber = selection.slice(-1); //mit slice(-1) entfernen wir 
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { //wenn die richtige antwort angeklickt wird kommt Richtige Antwort
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audioSuccess.play();
        rightQuestions++;
    } else {                                                //  ansonsten die Meldung Falsche Antwort!
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioWrong.play();
    }
    document.getElementById('next-question').disabled = false;
}

function nextQuestion() {
    currentQuestion++; // z.B. von 0 auf 1 erhöhen
    resetAnswer();
    showQuestion();
    document.getElementById('next-question').disabled = true;

}

function resetAnswer() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('q-pic').src = "img/questionmark.jpg";
    document.getElementById('finish-body').style = `display:none`;
    document.getElementById('q-body').style = ``;
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}

function showEndScreen() {
    document.getElementById('finish-body').style = ``;
    document.getElementById('q-body').style = `display:none`;
    document.getElementById('q-amount').innerHTML = questions.length;
    document.getElementById('q-right').innerHTML = rightQuestions;
    document.getElementById('q-pic').src = "img/pexels-nataliya-vaitkevich-6120398.jpg";
}