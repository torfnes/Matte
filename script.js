let currentTask = {};
let score = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearCanvas() {
    const canvas = document.getElementById("geometryCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generateTask() {
    // Nullstill UI og tilbakemeldinger
    document.getElementById("feedback").className = "feedback-box hidden";
    document.getElementById("user-perimeter").value = "";
    document.getElementById("user-area").value = "";
    document.getElementById("submit-btn").classList.remove("hidden");
    document.getElementById("next-btn").classList.add("hidden");
    
    clearCanvas();

    const canvas = document.getElementById("geometryCanvas");
    const ctx = canvas.getContext("2d");
    
    // Konfigurasjon for tegning
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 3;
    ctx.fillStyle = "#e6f2ff";
    ctx.font = "bold 14px Arial";
    ctx.textBaseline = "middle";

    // Velg tilfeldig mellom L-form (0) og Hus-form (1)
    const taskType = getRandomInt(0, 1);
    
    let title = "";
    let correctPerimeter = 0;
    let correctArea = 0;

    if (taskType === 0) {
        // --- L-FORM (Sammensatt av to rektangler) ---
        title = "Sammensatt L-figur 📐";
        
        // Generer logiske proporsjoner
        const H = getRandomInt(8, 14); // Total høyde
        const B = getRandomInt(8, 14); // Total bredde
        const h = getRandomInt(3, H - 3); // Høyde på den indre biten
        const b = getRandomInt(3, B - 3); // Bredde på den indre biten
        
        // De resterende ukjente sidene som eleven må tenke seg til eller bruke i omkrets
        const toppBredde = B - b;
        const hoyreHoyde = H - h;

        correctArea = (B * H) - (b * h);
        correctPerimeter = B + H + toppBredde + h + b + hoyreHoyde;

        // Tegnepunkter (skalert for å passe et 300x250 canvas)
        const startX = 50;
        const startY = 30;
        const scaleX = 180 / B;
        const scaleY = 180 / H;

        ctx.beginPath();
        ctx.moveTo(startX, startY); // Topp venstre
        ctx.lineTo(startX + toppBredde * scaleX, startY); // Til høyre (topp)
        ctx.lineTo(startX + toppBredde * scaleX, startY + hoyreHoyde * scaleY); // Ned inn i L-en
        ctx.lineTo(startX + B * scaleX, startY + hoyreHoyde * scaleY); // Til høyre ut til kanten
        ctx.lineTo(startX + B * scaleX, startY + H * scaleY); // Helt ned til bunnen
        ctx.lineTo(startX, startY + H * scaleY); // Tilbake til venstre bunn
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Skriv på mål (velger ut 4 strategiske mål så de må tenke litt)
        ctx.fillStyle = "#333";
        ctx.textAlign = "right";
        ctx.fillText(`${H} cm `, startX - 8, startY + (H * scaleY) / 2); // Venstre totalhøyde
        
        ctx.textAlign = "center";
        ctx.fillText(`${B} cm`, startX + (B * scaleX) / 2, startY + H * scaleY + 15); // Bunnbredde
        
        ctx.textAlign = "left";
        ctx.fillText(` ${h} cm`, startX + toppBredde * scaleX + 5, startY + hoyreHoyde * scaleY + (h * scaleY) / 2); // Indre vertikal side
        
        ctx.textAlign = "center";
        ctx.fillText(`${toppBredde} cm`, startX + (toppBredde * scaleX) / 2, startY - 12); // Toppbredde
    } 
    else {
        // --- HUS-FORM (Rektangel + Trekant) ---
        title = "Sammensatt Hus-figur 🏠";
        
        const B = getRandomInt(6, 12); // Bredde på huset
        const H1 = getRandomInt(5, 10); // Høyde på veggen (rektangelet)
        const H2 = getRandomInt(4, 7); // Høyde på taket (trekanten)
        
        // Beregn taksiden (hypotenusen til halve bredden og takhøyden)
        const halvb = B / 2;
        const takSide = Math.sqrt(halvb * halvb + H2 * H2);

        correctArea = (B * H1) + (B * H2) / 2;
        // Omkrets = bunn + 2 vegger + 2 taksider
        correctPerimeter = B + (2 * H1) + (2 * takSide);

        // Tegnepunkter skalert
        const startX = 60;
        const startY = 40;
        const scaleX = 180 / B;
        const scaleY = 140 / (H1 + H2);

        const husBunnY = startY + (H1 + H2) * scaleY;
        const veggToppY = startY + H2 * scaleY;
        const takSpissX = startX + (B / 2) * scaleX;

        ctx.beginPath();
        ctx.moveTo(startX, husBunnY); // Bunn venstre
        ctx.lineTo(startX + B * scaleX, husBunnY); // Bunn høyre
        ctx.lineTo(startX + B * scaleX, veggToppY); // Vegg høyre
        ctx.lineTo(takSpissX, startY); // Takspiss
        ctx.lineTo(startX, veggToppY); // Vegg venstre
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Stiplet linje mellom hus og tak for å synliggjøre oppdelingen
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(startX, veggToppY);
        ctx.lineTo(startX + B * scaleX, veggToppY);
        ctx.stroke();
        ctx.setLineDash([]); // Nullstill stiplelinje

        // Skriv på mål
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.fillText(`${B} cm`, startX + (B * scaleX) / 2, husBunnY + 15); // Bunn
        
        ctx.textAlign = "right";
        ctx.fillText(`${H1} cm `, startX - 8, veggToppY + (H1 * scaleY) / 2); // Vegghøyde
        
        // Takhøyde (vises med en liten målastrek inni eller ved siden av taket)
        ctx.textAlign = "left";
        ctx.fillText(` Høyde tak: ${H2} cm`, takSpissX + 10, startY + (H2 * scaleY) / 2);
    }

    currentTask = {
        perimeter: correctPerimeter,
        area: correctArea
    };

    document.getElementById("shape-title").innerText = title;
}

function checkAnswers() {
    const userP = parseFloat(document.getElementById("user-perimeter").value);
    const userA = parseFloat(document.getElementById("user-area").value);
    
    if (isNaN(userP) || isNaN(userA)) {
        alert("Vennligst fyll ut begge svarfeltene.");
        return;
    }

    // Vi tillater et slingringsmonn på 0.3 pga kvadratrøtter / desimaler i omkretsen til taket
    const pCorrect = Math.abs(userP - currentTask.perimeter) < 0.3;
    const aCorrect = Math.abs(userA - currentTask.area) < 0.3;

    const feedbackEl = document.getElementById("feedback");
    feedbackEl.classList.remove("hidden");

    if (pCorrect && aCorrect) {
        feedbackEl.innerText = "Helt rett! Utmerket regnet! 🎉";
        feedbackEl.className = "feedback-box correct";
        score++;
        document.getElementById("score").innerText = score;
    } else {
        feedbackEl.innerText = `Ikke helt riktig. Svaret ble:\n\nOmkrets: ${currentTask.perimeter.toFixed(1)} cm\nAreal: ${currentTask.area.toFixed(1)} cm²`;
        feedbackEl.className = "feedback-box wrong";
    }

    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

// Start spillet
window.onload = generateTask;