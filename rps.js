// Simple Rock Paper Scissors Game (Player vs Computer)
// Run with: node rps.js

const readline = require('readline');

const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

// Rules for Rock Paper Scissors Lizard Spock
// Returns 'player', 'computer', or 'draw'
function getWinner(player, computer) {
  if (player === computer) return 'draw';
  // Map of what each choice beats
  const beats = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],
  };
  if (beats[player] && beats[player].includes(computer)) {
    return 'player';
  }
  return 'computer';
}

function getComputerChoice() {
  const idx = Math.floor(Math.random() * choices.length);
  return choices[idx];
}

function playGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Choose rock, paper, scissors, lizard, or spock: ', (answer) => {
    const playerChoice = answer.trim().toLowerCase();
    if (!choices.includes(playerChoice)) {
      console.log(
        'Invalid choice. Please choose rock, paper, scissors, lizard, or spock.'
      );
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
