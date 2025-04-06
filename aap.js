const buttonColors = ["red", "yellow", "grey", "purple"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start game when any key is pressed
document.addEventListener("keydown", () => {
    if (!started) {
        document.querySelector("h2").textContent = `Level ${level}`;
        nextSequence();
        started = true;
    }
});

// Button click listener
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
        const userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // If the user has finished their input
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.querySelector("h2").textContent = "Game Over, Press Any Key to Restart";

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("h2").textContent = `Level ${level}`;

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Flash the button
    const button = document.getElementById(randomChosenColor);
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 200);

    playSound(randomChosenColor);
}

function animatePress(color) {
    const button = document.getElementById(color);
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 100);
}

function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
