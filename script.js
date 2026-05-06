let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    const messageDisplay = document.getElementById('message');
    const playerScoreSpan = document.getElementById('player-score');
    const computerScoreSpan = document.getElementById('computer-score');

    if (humanChoice === computerChoice) {
        messageDisplay.textContent = `It's a tie! Both chose ${humanChoice}.`;
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        messageDisplay.textContent = `You win! ${humanChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        messageDisplay.textContent = `You lose! ${computerChoice} beats ${humanChoice}.`;
    }

    // Update the scoreboard on the screen
    playerScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;
}
