// References
const timeLeft = document.getElementById("time-left");
const quizContainer = document.getElementById("container");
const nextBtn = document.getElementById("next-button");
const countOfQuestion = document.querySelector(".number-of-question");
const displayContainer = document.getElementById("display-container");
const scoreContainer = document.querySelector(".score-container");
const restart = document.getElementById("restart");
const userScore = document.getElementById("user-score");
const startScreen = document.querySelector(".start-screen");
const startButton = document.getElementById("start-button");
const topicButtons = document.querySelectorAll(".topic-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let quizArray;

// Define Quiz Topics and Questions
const quizTopics = {
    "Computer Science": [
        {
            id: "0",
            question: "What does 'CPU' stand for?",
            options: ["Central Processing Unit", "Central Programming Unit", "Computer Processing Unit", "Central Peripheral Unit"],
            correct: "Central Processing Unit",
        },
        {
            id: "1",
            question: "What is the main function of the operating system?",
            options: ["To manage hardware and software resources", "To browse the internet", "To run applications", "To store data"],
            correct: "To manage hardware and software resources",
        },
        {
            id: "2",
            question: "What does 'HTTP' stand for in web addresses?",
            options: ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "HyperTransfer Text Protocol", "HyperText Tool Protocol"],
            correct: "HyperText Transfer Protocol",
        },
        {
            id: "3",
            question: "Which company developed the first microprocessor?",
            options: ["Intel", "AMD", "IBM", "Microsoft"],
            correct: "Intel",
        },
        {
            id: "4",
            question: "What is the main function of RAM in a computer?",
            options: ["To store data permanently", "To execute instructions", "To store data temporarily", "To manage peripheral devices"],
            correct: "To store data temporarily",
        },
    
    ],
    "General Knowledge": [
        {
            id: "10",
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correct: "Paris",
        },
        {
            id: "11",
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "J.K. Rowling"],
            correct: "Harper Lee",
        },
        {
            id: "12",
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: "Mars",
        },
        {
            id: "13",
            question: "In which year did the Titanic sink?",
            options: ["1912", "1915", "1918", "1920"],
            correct: "1912",
        },
        {
            id: "14",
            question: "Who was the first President of the United States?",
            options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
            correct: "George Washington",
        },
        
    ],
    "Puzzle": [
        {
            id: "20",
            question: "What has keys but can't open locks?",
            options: ["A piano", "A map", "A phone", "A computer"],
            correct: "A piano",
        },
        {
            id: "21",
            question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
            options: ["The letter M", "The letter E", "The letter T", "The letter R"],
            correct: "The letter M",
        },
        {
            id: "22",
            question: "What can travel around the world while staying in a corner?",
            options: ["A stamp", "A coin", "A paper", "A photograph"],
            correct: "A stamp",
        },
        {
            id: "23",
            question: "What has to be broken before you can use it?",
            options: ["An egg", "A lock", "A phone", "A window"],
            correct: "An egg",
        },
        {
            id: "24",
            question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
            options: ["An echo", "A shadow", "A breeze", "A cloud"],
            correct: "An echo",
        },
        
    ],
    "Vocabulary": [
        {
            id: "30",
            question: "What is the synonym of 'elated'?",
            options: ["Happy", "Sad", "Angry", "Confused"],
            correct: "Happy",
        },
        {
            id: "31",
            question: "What does 'benevolent' mean?",
            options: ["Kind", "Evil", "Hostile", "Neutral"],
            correct: "Kind",
        },
        {
            id: "32",
            question: "What is the antonym of 'generous'?",
            options: ["Selfish", "Kind", "Giving", "Charitable"],
            correct: "Selfish",
        },
        {
            id: "33",
            question: "What is the meaning of 'arduous'?",
            options: ["Easy", "Difficult", "Quick", "Simple"],
            correct: "Difficult",
        },
        {
            id: "34",
            question: "What does 'meticulous' mean?",
            options: ["Careful", "Careless", "Fast", "Hasty"],
            correct: "Careful",
        },
    ],
};
 
// Handle Topic Selection
topicButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        let selectedTopic = event.target.dataset.topic;
        quizArray = quizTopics[selectedTopic];
        startQuiz();
    });
});

// Start Quiz
function startQuiz() {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
    initial();
}

// Restart Quiz
restart.addEventListener("click", () => {
    startScreen.classList.remove("hide");
    scoreContainer.classList.add("hide");
    displayContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener("click", () => {
    questionCount += 1;
    if (questionCount === quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = `Your score is ${scoreCount} out of ${quizArray.length}`;
        
        // Show congratulations animation if the user scored 100%
        if (scoreCount === quizArray.length) {
            showCongratulationsAnimation();
        }
    } else {
        countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Question`;
        quizDisplay(questionCount);
        resetTimer();
        startTimer();
    }
});

// Timer
const startTimer = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;

        if (count <= 5) {
            document.querySelector(".timer-div").style.backgroundColor = "red";
        } else {
            document.querySelector(".timer-div").style.backgroundColor = "#e1f5fe"; // Original color
        }

        if (count === 0) {
            clearInterval(countdown);
            nextBtn.click();  // Automatically move to next question when time is up
        }
    }, 1000);
};

// Reset Timer
const resetTimer = () => {
    clearInterval(countdown);
    count = 10;  // Reset timer to 10 seconds
    timeLeft.innerHTML = `${count}s`;
    document.querySelector(".timer-div").style.backgroundColor = "#e1f5fe"; // Reset background color
};

// Display quiz
function quizDisplay(questionCount) {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach(card => card.classList.add("hide"));
    quizCards[questionCount].classList.remove("hide");
}

// Quiz Creation
function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    quizArray.forEach(question => {
        question.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = `1 of ${quizArray.length} Question`;
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = question.question;
        div.appendChild(question_DIV);
        question.options.forEach(option => {
            div.innerHTML += `<button class="option-div" onclick="checker(this)">${option}</button>`;
        });
        quizContainer.appendChild(div);
    });
}

// Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach(element => {
            if (element.innerText === quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    // Clear interval (stop timer)
    clearInterval(countdown);
    // Disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}


// Initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    resetTimer();
    quizCreator();
    quizDisplay(questionCount);
    startTimer();
}

// When user clicks on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

// Hide quiz and display start screen on load
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

// Show Congratulations Animation
const showCongratulationsAnimation = () => {
    const congratsElement = document.createElement("div");
    congratsElement.classList.add("congratulations");
    congratsElement.innerHTML = "🎉 Congratulations! You scored 5 out of 5! 🎉";
    scoreContainer.appendChild(congratsElement);

    // Animation effect
    setTimeout(() => {
        congratsElement.classList.add("animate");
    }, 100);

    // Remove the message after 5 seconds
    setTimeout(() => {
        congratsElement.remove();
    }, 5000);
};

// Add this to the end of your next button click handler
if (scoreCount === quizArray.length) {
    showCongratulationsAnimation();
}

// Test the function directly
window.onload = () => {
    showCongratulationsAnimation();
};



