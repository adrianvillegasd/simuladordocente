// 1. Get DOM Elements
const questionArea = document.getElementById('question-area');
const answersArea = document.getElementById('answers-area');
const feedbackArea = document.getElementById('feedback-area');
const nextButton = document.getElementById('next-button');
const resultsArea = document.getElementById('results-area');

// 2. Define Questions
const questions = [
    { question: "2 + 1 = ?", choices: [2, 3, 4, 1], correctAnswer: 3 },
    { question: "4 - 2 = ?", choices: [1, 2, 3, 0], correctAnswer: 2 },
    { question: "3 + 3 = ?", choices: [5, 6, 7, 4], correctAnswer: 6 },
    { question: "5 - 3 = ?", choices: [0, 1, 2, 3], correctAnswer: 2 },
    { question: "1 + 4 = ?", choices: [5, 4, 6, 3], correctAnswer: 5 }
];

// 3. Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
// let userAnswers = []; // Optional: for detailed report

// 4. displayQuestion() Function
function displayQuestion() {
    // Clear previous content
    questionArea.textContent = '';
    answersArea.innerHTML = ''; // Clear any existing buttons
    feedbackArea.textContent = '';

    // Get current question
    const currentQuestion = questions[currentQuestionIndex];

    // Display question
    questionArea.textContent = currentQuestion.question;

    // Display answer choices
    currentQuestion.choices.forEach(choice => {
        const choiceElement = document.createElement('button');
        choiceElement.textContent = choice;
        choiceElement.classList.add('answer-choice'); // For styling
        choiceElement.addEventListener('click', () => handleAnswer(choice));
        answersArea.appendChild(choiceElement);
    });

    // Hide next button initially
    nextButton.style.display = 'none';
}

// 5. handleAnswer(selectedChoice) Function
function handleAnswer(selectedChoice) {
    const currentQuestion = questions[currentQuestionIndex];

    // Store user answer (optional)
    // userAnswers.push({ question: currentQuestion.question, selected: selectedChoice, correct: currentQuestion.correctAnswer });

    if (selectedChoice === currentQuestion.correctAnswer) {
        score++;
        feedbackArea.textContent = "✅ Correct!";
        feedbackArea.style.color = 'green';
    } else {
        feedbackArea.textContent = `❌ Oops! The correct answer was ${currentQuestion.correctAnswer}.`;
        feedbackArea.style.color = 'red';
    }

    // Disable all answer choices
    const answerButtons = answersArea.querySelectorAll('.answer-choice');
    answerButtons.forEach(button => {
        button.disabled = true;
        // Optionally, change style for disabled buttons
        if (button.textContent == currentQuestion.correctAnswer) {
            button.style.backgroundColor = 'lightgreen'; // Highlight correct answer
        } else if (button.textContent == selectedChoice) {
            button.style.backgroundColor = 'lightcoral'; // Highlight incorrect user choice
        }
    });

    // Show next button
    nextButton.style.display = 'block';
}

// 6. nextButton Event Listener
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        displayResults();
    }
});

// 7. displayResults() Function
function displayResults() {
    questionArea.style.display = 'none';
    answersArea.style.display = 'none';
    feedbackArea.style.display = 'none';
    nextButton.style.display = 'none';

    resultsArea.style.display = 'block';
    resultsArea.textContent = `You got ${score} out of ${questions.length} correct!`;

    // Optional: Display detailed report
    // if (userAnswers.length > 0) {
    //     let reportHtml = `<h2>Detailed Report:</h2><ul>`;
    //     userAnswers.forEach(answer => {
    //         reportHtml += `<li>${answer.question} - Your answer: ${answer.selected}, Correct: ${answer.correct}</li>`;
    //     });
    //     reportHtml += `</ul>`;
    //     resultsArea.innerHTML += reportHtml; // Append to existing score message
    // }
}

// 8. Initial Call
displayQuestion();
