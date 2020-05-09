const question= document.getElementById('question');
const choices= Array.from(document.getElementsByClassName('choice-text')) ;
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter= 0;
let availableQuestions = {};

let questions = [
    {
        question: "Inside which HTML elemnt do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1

    },
    {
        question: "Inside which HTML elemnt do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 3

    },
    {
        question: "Inside what HTML elemnt do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 4

    },
    {
        question: "Inside why HTML elemnt do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 3

    },
    {
        question: "Inside which HTML elemnt do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 2

    },
]

///Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => { 
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        console.log(availableQuestions);
        getNewQuestion(); 
};

getNewQuestion= () => {
    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        ///go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number= choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1); 

    acceptingAnswers= true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice= e.target;
        const selectedAnswer= selectedChoice.dataset['number'];


        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }


        setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();

        }, 1000);
        
       
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();