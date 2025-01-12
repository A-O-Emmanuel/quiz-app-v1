const quizData = [
    {
      question: 'What does HTML stand for?',
      options: ['Hyperlinks and Text Markup Language', 'Hypertext Markup Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'],
      answer: 'Hypertext Markup Language',
    },
    {
      question: 'Which of the following is the correct way to comment in JavaScript?',
      options: [' // This is a comment', '<! This is a comment >', '\* This is a comment \*', '# This is a comment'],
      answer: '// This is a comment',
    },
    {
      question: 'What is the purpose of the DOMContentLoaded event in JavaScript?',
      options: ['It triggers when the web page is first loaded in the browser.', 'It triggers when the DOM tree has finished loading and parsing.', 'It triggers when the user clicks on an element.', 'It triggers when an external CSS file is loaded.'],
      answer: 'It triggers when the DOM tree has finished loading and parsing.',
    },
    {
      question: 'Which Front-End framework is developed by Facebook and is used for building user interfaces?',
      options: ['Vue.js', 'Angular', 'React', 'jQuery'],
      answer: 'React',
    },
    {
      question: 'What is the purpose of the box-sizing CSS property?',
      options: [
        'To specify the size of a box element.',
        'To add a border around a box element.',
        'To control the padding and border of a box element.',
        'To control how the total width and height of a box element are calculated.',
      ],
      answer: 'To control how the total width and height of a box element are calculated.',
    },
    {
      question: ' What does the localStorage object in JavaScript do?',
      options: ['It stores data as cookies on the user’s device.', 
      'It allows communication between different browser tabs.', 
      'It provides a way to store key-value pairs in the user’s web browser', 
      'It helps in storing temporary data during a session.'],
      answer: 'It provides a way to store key-value pairs in the user’s web browser permanently.',
    },
    {
      question: 'What is the purpose of media queries in CSS?',
      options: [
        'To target specific devices and apply different styles based on their characteristics.',
        'To embed multimedia content, such as videos and audio files, in a web page.',
        'To create animated effects using CSS transitions and animations.',
        'To write comments in CSS code to explain the styling rules.',
      ],
      answer: 'To target specific devices and apply different styles based on their characteristics.',
    },
    {
      question: 'Which Front-End framework is known for its simplicity and ease of integration into existing projects?',
      options: [
        'React', 
        'Vue.js', 
        'Angular', 
        'Ember.js'],
      answer: ' Vue.js',
    },
    {
      question: 'Which JavaScript function is used to schedule a function to be executed after a specific interval?',
      options: [
        'setInterval()',
        'setImmediate()',
        'setTimeout()',
        'requestAnimationFrame()',
      ],
      answer: 'setTimeout()',
    },
    {
      question: 'Which JavaScript method is used to add a new element to the end of an array?',
      options: [
       'push()', 
      'unshift()', 
      'pop()', 
      'shift()'],
      answer: ' push()',
    },
    
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio'
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();


  // navigation

  const menuButton = document.querySelector(".icon")

function showMenu () {
const navContainer = document.querySelector("ul")
const navItems = document.querySelectorAll("li")

navContainer.classList.toggle("navContainer")

for (let i = 0; i < navItems.length; i++) {
    navItems[i].classList.toggle("show")
}
}

menuButton.addEventListener("click", showMenu) 



//sign in and register form

const signinBtn = document.getElementById('signin-btn');
const registerBtn = document.getElementById('register-btn');
const signinCloseBtn = document.getElementById('signin-close-btn');
const registerCloseBtn = document.getElementById('register-close-btn');
const signinForm = document.getElementById('signin-form');
const registerForm = document.getElementById('register-form');
const overlay = document.getElementById('form-overlay');

// Function to show the overlay with the specified form
function showForm(formToShow) {
  overlay.classList.remove('hidden');
  if (formToShow === 'signin') {
    signinForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  } else if (formToShow === 'register') {
    registerForm.classList.remove('hidden');
    signinForm.classList.add('hidden');
  }
}

// Function to hide the overlay
function hideForm() {
  overlay.classList.add('hidden');
}

// Show Sign-In Form when "Sign In" button is clicked
signinBtn.addEventListener('click', () => showForm('signin'));

// Show Register Form when "Register" button is clicked
registerBtn.addEventListener('click', () => showForm('register'));

// Close buttons for both forms
signinCloseBtn.addEventListener('click', hideForm);
registerCloseBtn.addEventListener('click', hideForm);

// Optional: Close overlay when clicking outside the forms
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    hideForm();
  }
});
