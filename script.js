// Step 2 & 3: Helper functions stay outside
function getComputerChoice() {
    let randomNumber = Math.random();
    if (randomNumber < 0.33) return "rock";
    if (randomNumber < 0.66) return "paper";
    return "scissors";
}

function getHumanChoice() {
    let choice = prompt("Round Start! Enter rock, paper, or scissors:");
    return choice;
}

// Step 6: The main game logic
function playGame() {
    // Step 4: Scores are now local to the game
    let humanScore = 0;
    let computerScore = 0;

    // Step 5: playRound logic is now inside the game
    function playRound(humanChoice, computerChoice) {
        humanChoice = humanChoice.toLowerCase();
        
        if (humanChoice === computerChoice) {
            console.log(`It's a tie! Both chose ${humanChoice}`);
        } else if (
            (humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")
        ) {
            humanScore++;
            console.log(`You win this round! ${humanChoice} beats ${computerChoice}`);
        } else {
            computerScore++;
            console.log(`You lose this round! ${computerChoice} beats ${humanChoice}`);
        }
    }

    // Play 5 rounds
    for (let i = 1; i <= 5; i++) {
        console.log(`--- Round ${i} ---`);
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
        console.log(`Current Score: Human ${humanScore} - Computer ${computerScore}`);
    }

    // Declare final winner
    console.log("--- FINAL RESULT ---");
    if (humanScore > computerScore) {
        console.log("Congratulations! You won the game!");
    } else if (computerScore > humanScore) {
        console.log("Game Over! The computer won.");
    } else {
        console.log("The whole game is a tie!");
    }
}

// Start the game
playGame();
