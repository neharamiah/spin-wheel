const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const popup = document.getElementById("resultPopup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");

const punishments = [
    {
        title: "Make-ana",
        description: "Make out with a helmet with a banana in side."
    },
    {
        title: "Post it!",
        description: "Posta photo on you instagram on a pose decided by the organizers for atleast 2 days.`"
    },
    {
        title: "Recreator",
        description: "Recreate an Appaji's insta reel (will be decided by the organizers)."
    },
    {
        title: "Red Carpet Drama",
        description: "Pretend to faint dramatically on stage like a celeb in a heavy gown."
    },
    {
        title: "Chilli Challenge",
        description: "Eat a fiery chilli like it’s no big deal."
    },
    {
        title: "Zara Pose Off",
        description: "Strike three different poses inspired by a Zara model."
    },
    {
        title: "Object of My Affection",
        description: "Dramatically ask out a randomly chosen object (Choosen by organizers)"
    },
    {
        title: "Pole dance",
        description: "Do  a pole dance with a human pole."
    },
    {
        title: "Hand-in-Hand Bond",
        description: "Hold hands with the person on your left for the next 5 minutes."
    },
    {
        title: "Secret Challenge",
        description: "You've uncovered a hidden challenge! The details are a surprise."
    }
];

const numSegments = punishments.length;
const segmentAngle = 360 / numSegments;
let isSpinning = false;
let rotationOffset = 0;

function createWheelText() {
    const wheelTextContainer = document.createElement('div');
    wheelTextContainer.classList.add('wheel-text');
    punishments.forEach((punishment, index) => {
        const textItem = document.createElement('div');
        textItem.classList.add('wheel-text-item');
        textItem.style.transform = `rotate(${index * segmentAngle}deg)`;
        const span = document.createElement('span');
        span.textContent = punishment.title;
        textItem.appendChild(span);
        wheelTextContainer.appendChild(textItem);
    });
    wheel.appendChild(wheelTextContainer);
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    spinButton.disabled = true;

    const fullSpins = 5 + Math.floor(Math.random() * 4);
    const finalAngle = Math.floor(Math.random() * 360);
    const totalRotation = (fullSpins * 360) + finalAngle;
    rotationOffset += totalRotation;

    wheel.style.transform = `rotate(${rotationOffset}deg)`;

    setTimeout(() => {
        const normalizedAngle = (360 - (rotationOffset % 360 + 360) % 360);
        
        // This is the key line to fix the offset
        let winningIndex = Math.floor(normalizedAngle / segmentAngle) - 1;

        // Correct for wrap-around and negative index
        if (winningIndex < 0) {
            winningIndex = punishments.length - 1;
        }

        const result = punishments[winningIndex];

        popupTitle.textContent = result.title;
        popupText.textContent = result.description;
        
        popup.classList.add("show");
        
        launchConfetti();

        setTimeout(() => {
            popup.classList.remove("show");
            spinButton.disabled = false;
            isSpinning = false;
        }, 6000);
    }, 5000);
}

function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.animationDuration = 3 + Math.random() * 3 + "s";
        confetti.style.backgroundColor = "#d4af37";
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 10000);
    }
}

spinButton.addEventListener("click", spinWheel);

// Initialize the wheel text on page load
createWheelText();