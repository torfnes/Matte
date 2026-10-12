let currentTask = {};
let score = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTask() {
    // Skjul forrige tilbakemelding og nullstill inputfelt
    document.getElementById("feedback").className = "feedback-box hidden";
    document.getElementById("user-perimeter").value = "";
    document.getElementById("user-area").value = "";
    document.getElementById("submit-btn").classList.remove("hidden");
    document.getElementById("next-btn").classList.add("hidden");

    const shapes = ['Rektangel', 'Kvadrat', 'Trekant', 'Sirkel'];
    const chosenShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    let title = "";
    let desc = "";
    let correctPerimeter = 0;
    let correctArea = 0;

    if (chosenShape === 'Rektangel') {
        const b = getRandomInt(3, 15);
        const h = getRandomInt(3, 15);
        title = "Rektangel 📐";
        desc = `Bredde: ${b} cm, Høyde: ${h} cm`;
        correctPerimeter = 2 * (b + h);
        correctArea = b * h;
    } 
    else if (chosenShape === 'Kvadrat') {
        const s = getRandomInt(3, 12);
        title = "Kvadrat 🔲";
        desc = `Sidekant: ${s} cm`;
        correctPerimeter = 4 * s;
        correctArea = s * s;
    } 
    else if (chosenShape === 'Trekant') {
        // Rettvinklet trekant for enkelhets skyld
        const b = getRandomInt(3, 12);
        const h = getRandomInt(3, 12);
        const hypotenus = Math.sqrt(b*b + h*h);
        title = "Rettvinklet trekant 🔺";
        desc = `Grunnlinje: ${b} cm, Høyde: ${h} cm`;
        correctPerimeter = b + h + hypotenus;
        correctArea = (b * h) / 2;
    } 
    else if (chosenShape === 'Sirkel') {
        const r = getRandomInt(2, 10);
        title = "Sirkel ⚪";
        desc = `Radius: ${r} cm (Bruk gjerne pi-knapp eller 3.14)`;
        correctPerimeter = 2 * Math.PI * r;
        correctArea = Math.PI * r * r;
    }

    currentTask = {
        perimeter: correctPerimeter,
        area: correctArea
    };

    document.getElementById("shape-title").innerText = title;
    document.getElementById("shape-description").innerText = desc;
}

function checkAnswers() {
    const userP = parseFloat(document.getElementById("user-perimeter").value);
    const userA = parseFloat(document.getElementById("user-area").value);
    
    if (isNaN(userP) || isNaN(userA)) {
        alert("Vennligst skriv inn svar i begge felt.");
        return;
    }

    // Tillater et lite avvik på 0.2 på grunn av pi-avrundinger
    const pCorrect = Math.abs(userP - currentTask.perimeter) < 0.2;
    const aCorrect = Math.abs(userA - currentTask.area) < 0.2;

    const feedbackEl = document.getElementById("feedback");
    feedbackEl.classList.remove("hidden");

    if (pCorrect && aCorrect) {
        feedbackEl.innerText = "Riktig! Bra jobba! 🎉";
        feedbackEl.className = "feedback-box correct";
        score++;
        document.getElementById("score").innerText = score;
    } else {
        feedbackEl.innerText = `Feil. Riktig svar var:\nOmkrets: ${currentTask.perimeter.toFixed(1)} cm\nAreal: ${currentTask.area.toFixed(1)} cm²`;
        feedbackEl.className = "feedback-box wrong";
    }

    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

// Start første oppgave automatisk når siden lastes
window.onload = generateTask;