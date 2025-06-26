// Simple Rock Paper Scissors Game (Player vs Computer)
// Run with: node rps.js

const readline = require('readline');

const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
  const idx = Math.floor(Math.random() * choices.length);
  return choices[idx];
}

function getWinner(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'player';
  }
  return 'computer';
}

function playGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Choose rock, paper, or scissors: ', (answer) => {
    const playerChoice = answer.trim().toLowerCase();
    if (!choices.includes(playerChoice)) {
      console.log('Invalid choice. Please choose rock, paper, or scissors.');
      rl.close();
      return;
    }
    const computerChoice = getComputerChoice();
    console.log(`Computer chose: ${computerChoice}`);
    const winner = getWinner(playerChoice, computerChoice);
    if (winner === 'draw') {
      console.log("It's a draw!");
    } else if (winner === 'player') {
      console.log('You win!');
    } else {
      console.log('Computer wins!');
    }
    rl.close();
  });
}

playGame();
