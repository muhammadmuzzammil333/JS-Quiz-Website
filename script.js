// Step 1 : Quiz Data for Example : (Questions, Options, and Correct Answer)
const quizData = [
    //Question 1
    {
        question: 'What does HTML stand for',
        options: [
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language",
        ],
        correct: 0,  // The correct option is the first one (index 0)
    },
    //Question 2

    {
        question: "Which CSS property is used to control the spacing between elements?",
        options: ["margin", "padding", "spacing", "border-spacing"],
        correct: 1,  // The correct option is the second one (index 1)
    },
    // Question 3

    {
        question: "What is the JavaScript function used to select an HTML element by its id?",
        options: [
            "document.query",
            "getElementById",
            "selectElement",
            "findElementById",
        ],
        correct: 1,  // The correct option is the second one (index 1)
    },
    //Question 4

    {
        question: "In React.js, which hook is used to perform side effects in a function component?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 0,  // The correct option is the first one (index 0)
    },
    //Question 5

    {
        question: "Which HTML tag is used to create an ordered list?",
        options: ["<ul>", "<li>", "<ol>", "<dl>"],
        correct: 2,  // The correct option is the third one (index 2)
    },
    //Question 6

    {
        question: "Which of the following is not a JavaScript data type?",
        options: ["Number", "String", "Boolean", "Character"],
        correct: 3,  // Character is not a JavaScript data type
    },
    //Question 7

    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: [
            "<script href='script.js'>",
            "<script name='script.js'>",
            "<script src='script.js'>",
            "<script file='script.js'>"
        ],
        correct: 2,  // The correct option is the third one
    },
    //Question 8

    {
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Mozilla", "Microsoft", "Apple"],
        correct: 0,  // Netscape developed JavaScript
    },
    //Question 9

    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "style", "font", "styles"],
        correct: 1,  // The "style" attribute is used for inline styles
    },
    //Question 10
    {
        question: "What does JSON stand for?",
        options: [
            "JavaScript Object Notation",
            "Java Syntax Over Network",
            "JavaScript Operation Node",
            "JavaScript Object Network"
        ],
        correct: 0,  // JSON stands for JavaScript Object Notation
    }

];


// Step 2 : DOM Manipulation of elements
const quizSection = document.querySelector('.quiz-section');  // The main quiz section
const questionElement = document.querySelector('#question');  // The question text
const optionElements = document.querySelectorAll('.option_1, .option_2, .option_3, .option_4');  // The option texts
const answerElements = document.querySelectorAll('.answer');  // The radio buttons for answers

const submitBttn = document.querySelector('.submitBttn');  // The submit button

let currentQuiz = 0;  // To track the current quiz question
let score = 0;  // To keep track of the user's score

// Step 3: Function to apply quiz data to elements
const QuizImplement = () => {
    const { question, options } = quizData[currentQuiz];  // Destructuring the current question and options from the quiz data
    questionElement.innerText = `Q${currentQuiz + 1} : ${question}`;  // Display the question number and question text

    // Display the options for the current question
    optionElements.forEach((optionElement, index) => {
        optionElement.innerText = options[index];  // Assign each option to the respective element
    })
}

QuizImplement();  // Initial call to display the first question


// Function to get the selected answer (if any)
const getSelectedAnswer = () => {
    let ans_index;  // Variable to store the index of the selected answer
    answerElements.forEach((answer, index) => {
        if (answer.checked) {  // Check if the radio button is checked
            ans_index = index;  // Store the index of the selected answer
        }
    });
    return ans_index;  // Return the index of the selected answer
}

// Function to deselect all answers (reset the radio buttons)
const deSelectedAnswer = () => {
    answerElements.forEach((currentAnswer, index) => {
        currentAnswer.checked = false;  // Uncheck all radio buttons
    });
};


// Event listener for the submit button
submitBttn.addEventListener('click', () => {
    let selectedAnswer = getSelectedAnswer();  // Get the selected answer

    // Check if an option is selected
    if (selectedAnswer === undefined) {  // If no option is selected, alert the user
        alert("Please select an answer before submitting!");
        return;  // Exit the function to avoid further execution
    }

    // Check if the selected answer is correct
    if (selectedAnswer === quizData[currentQuiz].correct) {
        score++;  // Increment the score if the answer is correct
        console.log(score);  // Log the current score
    }

    currentQuiz++;  // Move to the next question

    // Check if there are more questions or show the final score
    if (currentQuiz < quizData.length) {
        QuizImplement();  // Load the next question
        deSelectedAnswer();  // Reset the radio buttons for the next question
    } else {
        let evaluationMessage = '';

        // Evaluate the user's performance based on their score
        if (score < 4) {
            evaluationMessage = `<p class="text-red-600 text-2xl">Bad Score</p>`;
        } else if (score >= 4 && score <= 6) {
            evaluationMessage = `<p class="text-yellow-600 text-2xl">Good Score</p>`;
        } else if (score > 6) {
            evaluationMessage = `<p class="text-green-600 text-2xl">Excellent Score</p>`;
        }



        // Display the final score and end the quiz
        quizSection.innerHTML = `<div class="text-center">
            <h1 class="text-3xl font-extrabold pb-5">🏆 Your Score ${score}/${quizData.length} Correct Answer(s)</h1>
            ${evaluationMessage}    
            <p>Congratulations on completing the quiz! 🎉</p>
            <button type="button" class="tryAgainBtn w-40 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Try Again</button>
        </div>`;        

        const tryAgainButton = quizSection.querySelector('button');
        tryAgainButton.addEventListener('click', () => {
            location.reload();
        })

    }
});



