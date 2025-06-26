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

  let selected = 0;
  let answered = false;

  function renderOptions() {
    process.stdout.write('\x1Bc');
    console.log(
      'Choose an option (use \u2191/\u2193 arrows, Enter to select, or type a number):'
    );
    choices.forEach((choice, idx) => {
      if (idx === selected) {
        console.log(
          `> ${idx + 1}: ${choice.charAt(0).toUpperCase() + choice.slice(1)}`
        );
      } else {
        console.log(
          `  ${idx + 1}: ${choice.charAt(0).toUpperCase() + choice.slice(1)}`
        );
      }
    });
  }

  function finishSelection(idx) {
    answered = true;
    process.stdin.setRawMode(false);
    process.stdin.pause();
    const playerChoice = choices[idx];
    const computerChoice = getComputerChoice();
    console.log(`\nYou chose: ${playerChoice}`);
    console.log(`Computer chose: ${computerChoice}`);
    const winner = getWinner(playerChoice, computerChoice);
    if (winner === 'draw') {
      console.log("It's a draw!");
    } else if (winner === 'player') {
      console.log('You win!');
    } else {
      console.log('Computer wins!');
    }
    askPlayAgain();
  }

  function askPlayAgain() {
    rl.question('\nPlay again? (y/n): ', (answer) => {
      const ans = answer.trim().toLowerCase();
      if (ans === 'y' || ans === 'yes') {
        selected = 0;
        answered = false;
        renderOptions();
        process.stdin.setRawMode(true);
        process.stdin.resume();
      } else {
        rl.close();
      }
    });
  }

  renderOptions();

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (key) => {
    if (answered) return;
    const keyStr = key.toString();
    if (keyStr === '\u0003') {
      // Ctrl+C
      process.exit();
    } else if (keyStr === '\r' || keyStr === '\n') {
      // Enter
      finishSelection(selected);
    } else if (keyStr === '\u001b[A') {
      // Up arrow
      if (selected > 0) {
        selected--;
        renderOptions();
      }
    } else if (keyStr === '\u001b[B') {
      // Down arrow
      if (selected < choices.length - 1) {
        selected++;
        renderOptions();
      }
    } else if (/^[1-9]$/.test(keyStr)) {
      // Number key
      const num = parseInt(keyStr, 10);
      if (num >= 1 && num <= choices.length) {
        finishSelection(num - 1);
      }
    }
  });
}

playGame();
