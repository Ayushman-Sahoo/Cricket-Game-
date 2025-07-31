// Load saved score from localStorage
let scoreStr = localStorage.getItem('Score');
let score;

// Store player name
let playerName = '';  // Store player name

function updateName() {
  const input = document.getElementById('player-name').value.trim();
  if (input) playerName = input;
}

// Reset or load score
function resetScore(scoreStr) {
  score = scoreStr ? JSON.parse(scoreStr) : { win: 0, lost: 0, tie: 0 };

  score.display = function () {
    return `Score: Won: ${score.win}, Lost: ${score.lost}, Tie: ${score.tie}`;
  };

  showResult(); // Update UI immediately
}

resetScore(scoreStr); // Initial setup

// Function to generate a random move for the computer
function generateComputerChoice() {
  const options = ['Bat', 'Ball', 'Stump'];
  const randomIndex = Math.floor(Math.random() * 3);
  return options[randomIndex];
}

// Function to compare moves and update score
function getResult(user, computer) {
  if (user === computer) {
    score.tie++;
    return "It's a tie!";
  }

  if (
    (user === 'Bat' && computer === 'Ball') ||
    (user === 'Ball' && computer === 'Stump') ||
    (user === 'Stump' && computer === 'Bat')
  ) {
    score.win++;
    return `${playerName || 'You'} won!`;
  } else {
    score.lost++;
    return 'Computer has won!';
  }
}

// Core game logic
function playGame(userMove) {
  const input = document.getElementById('player-name').value.trim();
  
  if (!input) {
    alert('Please enter your name before starting the game!');
    return;
  }

  playerName = input; // update global playerName in case it's not set yet

  const computerMove = generateComputerChoice();
  const result = getResult(userMove, computerMove);
  showResult(userMove, computerMove, result);
}

// Display the result and update the UI
function showResult(userMove = '', computerMove = '', result = '') {
  localStorage.setItem('Score', JSON.stringify(score));

  document.getElementById('user-move').innerText =
    userMove ? `${playerName || 'You'} chose ${userMove}` : '';

  document.getElementById('computer-move').innerText =
    computerMove ? `Computer chose ${computerMove}` : '';

  document.getElementById('result').innerText = result;

  document.getElementById('score').innerText = score.display();

  updateScoreBar();
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark');

  const toggleIcon = document.getElementById('theme-toggle');
  toggleIcon.innerText = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// Update progress bars
function updateScoreBar() {
  const total = score.win + score.lost + score.tie || 1;
  document.getElementById('win-bar').style.width = `${(score.win / total) * 100}%`;
  document.getElementById('loss-bar').style.width = `${(score.lost / total) * 100}%`;
  document.getElementById('tie-bar').style.width = `${(score.tie / total) * 100}%`;
}

// Reset game completely
function resetGame() {
  localStorage.clear();
  resetScore(null);
}