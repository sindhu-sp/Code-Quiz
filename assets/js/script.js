var quizEl = document.getElementById('quiz');
var resultsEl = document.getElementById('results');
var submitEl = document.getElementById('submit');
var timerEl = document.getElementById('countdown');
var isPaused = false;
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var numCorrect = 0;


document.getElementById("start").addEventListener("click", displaySetting);

function displaySetting() {
  document.getElementById("container").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("submit").style.display = "block";
  document.getElementById("countdown").style.display = "block";
  document.getElementById("results").style.display = "block";
}
var myQuiz = [{
    question: "What is HTML?",
    answers: {
      a: 'HyperText Markup Language',
      b: 'High Text Marking Language',
      c: 'Hyper Tool Making Language'
    },
    correctAnswer: 'a'
  },
  {
    question: "What is CSS?",
    answers: {
      a: 'Cascading Style Sheets',
      b: 'Casing Style Sheet',
      c: 'Copying Sheets by Style'
    },
    correctAnswer: 'a'
  },

  {
    question: "What is DOM?",
    answers: {
      a: 'Differential Object Making',
      b: 'Document Object Model',
      c: 'Document On Making'
    },
    correctAnswer: 'b'
  },
  {
    question: "What is API?",
    answers: {
      a: 'Applying Programming Input',
      b: 'Apply Programmer Interface',
      c: 'Application Programming Interface'
    },
    correctAnswer: 'c'
  }
];



startQuiz(myQuiz, quizEl, resultsEl, submitEl);


function startQuiz(questions, quizEl, resultsEl, submitEl) {
  var timeLeft = 50;

  function countdown() {


    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      if (isPaused == false)

      {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 0) {
          // Set the `textContent` of `timerEl` to show the remaining seconds
          timerEl.textContent = "Time : " + timeLeft;
          // Decrement `timeLeft` by 1
          timeLeft--;
        } else if (timeLeft <= 0) {
          // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
          timerEl.textContent = "Time : 0";
          //  timeLeft--;
          //  } else {
          // Once `timeLeft` gets to 0, set `timerEl` to an empty string
          timerEl.textContent = '';
          // Use `clearInterval()` to stop the timer
          clearInterval(timeInterval);
        }
      }
    }, 1000);
  }

  function showQuestions(questions, quizEl) {
    countdown();
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

      // first reset the list of answers
      answers = [];

      // for each available answer...
      for (letter in questions[i].answers) {

        // ...add an html radio button
        answers.push(
          '<label>' +
          '<input type="radio" name="question' + i + '" value="' + letter + '">' +
          letter + ': ' +
          questions[i].answers[letter] +
          '</label>'
        );
      }

      // Reading the questions and answers then to the output 
      output.push(
        '<div class="question">' + questions[i].question + '</div>' +
        '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizEl.innerHTML = output.join('');
  }


  function showResults(questions, quizEl, resultsEl) {

    // get answers  from the quiz
    var answerEl = quizEl.querySelectorAll('.answers');

    // tracking user choice of answer
    var userChoice = '';


    // for each question...
    for (var i = 0; i < questions.length; i++) {

      // find selected answer
      userChoice = (answerEl[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

      // if answer is correct
      if (userChoice === questions[i].correctAnswer) {

        timeLeft = timeLeft - 1;
        numCorrect = timeLeft;
        // numCorrect++;

        // color the answers green
        answerEl[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerEl[i].style.color = 'red';
        timeLeft = timeLeft - 10;
        numCorrect = timeLeft;
      }
    }

    // show correct answers 
    resultsEl.innerHTML = numCorrect + ' out of ' + questions.length;
    resultsEl.innerHTML = "Score: " + numCorrect;
  }

  // show questions 
  showQuestions(questions, quizEl);

  // when click on submit, score displayed
  submitEl.onclick = function () {
    isPaused = true;
    showResults(questions, quizEl, resultsEl);
    var initials = prompt("What are your initials?")
    var score = {
      score: numCorrect,
      name: initials
    }
    highScores.push(score)
    highScores.sort((a, b) => {
      return b.score - a.score;
    })
    localStorage.setItem("highScores", JSON.stringify(highScores))


  }

}