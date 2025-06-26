const texts = [
    "UI/UX Designer",
    "Programmer",
    "42 Student",
    "Graphic Designer",
    "Frontend Developer",
    "Software Developer"
];

let count = 0;
let index = 0;
let currentText = '';
let letter = '';
const typingSpan = document.querySelector(".typed-text");

function type() {
    if (count === texts.length) count = 0;

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    typingSpan.textContent = letter;

    if (letter.length === currentText.length) {
        setTimeout(() => erase(), 2000);
    } else {
        setTimeout(type, 100);
    }
}

function erase() {
    letter = currentText.slice(0, --index);
    typingSpan.textContent = letter;

    if (letter.length === 0) {
        count++;
        setTimeout(type, 200);
    } else {
        setTimeout(erase, 50);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 500);
});