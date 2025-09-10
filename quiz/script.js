let quizData = [];
let currentQuestion = {};
let questions = [];
let currentIndex = 0;
let score = 0;
const totalQuestions = 5; 

async function startQuiz() {
  document.getElementById('restart-btn').style.display = "none";
  document.getElementById('quiz-feedback').innerText = "";
  score = 0;
  currentIndex = 0;

  const response = await fetch('quiz.json');
  const data = await response.json();
  quizData = data.questions;

  // Randomly select N questions
  questions = quizData.sort(() => 0.5 - Math.random()).slice(0, totalQuestions);

  loadNextQuestion();
}

function loadNextQuestion() {
  if (currentIndex >= questions.length) {
    showScore();
    return;
  }

  currentQuestion = questions[currentIndex];
  document.getElementById('quiz-question').innerText = `Q${currentIndex + 1}: ${currentQuestion.question}`;
  document.getElementById('quiz-feedback').innerText = "";
  document.getElementById('next-btn').style.display = "none";
  document.getElementById('quiz-options').style.display = "block";
}

function submitAnswer(selected) {
  const isCorrect = selected === currentQuestion.answer;
  if (isCorrect) score++;

  document.getElementById('quiz-feedback').innerText = 
    (isCorrect ? `✅ Correct!` : `❌ Incorrect.`) + ` ${currentQuestion.explanation}`;

  document.getElementById('quiz-options').style.display = "none";
  document.getElementById('next-btn').style.display = "inline-block";
  currentIndex++;
}

function showScore() {
  document.getElementById('quiz-question').innerText = `🎉 You scored ${score} out of ${totalQuestions}!`;
  document.getElementById('quiz-feedback').innerText = "";
  document.getElementById('next-btn').style.display = "none";
  document.getElementById('quiz-options').style.display = "none";
  document.getElementById('restart-btn').style.display = "inline-block";
}

startQuiz();

