const buttonColors = ["red", "yellow", "grey", "purple"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// 👉 Start game using KEY PRESS
document.addEventListener("keydown", function () {
    if (!started) {
        level = 0;
        gamePattern = [];
        started = true;

        document.getElementById("level-title").textContent = "Level 1";
        nextSequence();
    }
});

// 👉 Button click
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {

        if (!started) return;

        const userColor = this.id;
        userClickedPattern.push(userColor);

        animatePress(userColor);
        playSound(userColor);

        checkAnswer(userClickedPattern.length - 1);
    });
});

// 👉 Check answer
function checkAnswer(index) {
    if (gamePattern[index] === userClickedPattern[index]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 800);
        }

    } else {
        playSound("wrong");
        gameOver();
    }
}

// 👉 Next level
function nextSequence() {
    userClickedPattern = [];
    level++;

    document.getElementById("level-title").textContent = `Level ${level}`;

    const randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    flashButton(randomColor);
    playSound(randomColor);
}

// 👉 Flash effect
function flashButton(color) {
    const btn = document.getElementById(color);

    btn.classList.add("pressed");
    setTimeout(() => {
        btn.classList.remove("pressed");
    }, 250);
}

// 👉 Click animation
function animatePress(color) {
    const btn = document.getElementById(color);

    btn.classList.add("pressed");
    setTimeout(() => {
        btn.classList.remove("pressed");
    }, 120);
}

// 👉 Sound safe
function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play().catch(() => {
        console.log("Sound:", name);
    });
}

// 👉 Game Over
function gameOver() {
    document.body.classList.add("game-over");

    document.getElementById("level-title").textContent =
        `❌ Game Over! Press any key to restart`;

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 300);

    resetGame();
}

// 👉 Reset
function resetGame() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}