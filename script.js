// Dynamic Procedural Sentence Generator Engine
const subjects = [
    { pronoun: "Yo", heSub: "אני", estar: "estoy" },
    { pronoun: "Tú", heSub: "אתה", estar: "estás" },
    { pronoun: "Él", heSub: "הוא", estar: "está" },
    { pronoun: "Ella", heSub: "היא", estar: "está" },
    { pronoun: "Nosotros", heSub: "אנחנו", estar: "estamos" },
    { pronoun: "Vosotros", heSub: "אתם", estar: "estáis" },
    { pronoun: "Ellos", heSub: "הם", estar: "están" },
    { pronoun: "Ellas", heSub: "הן", estar: "están" }
];

const verbs = [
    { infinitive: "hablar", heVerb: "לדבר", type: "ar", gerund: "hablando" },
    { infinitive: "comer", heVerb: "לאכול", type: "er", gerund: "comiendo" },
    { infinitive: "vivir", heVerb: "לגור / לחיות", type: "ir", gerund: "viviendo" },
    { infinitive: "estudiar", heVerb: "ללמוד", type: "ar", gerund: "estudiando" },
    { infinitive: "beber", heVerb: "לשתות", type: "er", gerund: "bebiendo" },
    { infinitive: "escribir", heVerb: "לכתוב", type: "ir", gerund: "escribiendo" },
    { infinitive: "trabajar", heVerb: "לעבוד", type: "ar", gerund: "trabajando" },
    { infinitive: "leer", heVerb: "לקרוא", type: "er", gerund: "leyendo" },
    { infinitive: "bailar", heVerb: "לרקוד", type: "ar", gerund: "bailando" },
    { infinitive: "correr", heVerb: "לרוץ", type: "er", gerund: "corriendo" },
    { infinitive: "caminar", heVerb: "ללכת", type: "ar", gerund: "caminando" },
    { infinitive: "comprar", heVerb: "לקנות", type: "ar", gerund: "comprando" }
];

const complements = [
    { es: "con mis amigos", he: "עם החברים שלי" },
    { es: "una pizza deliciosa", he: "פיצה טעימה" },
    { es: "en una casa grande", he: "בבית גדול" },
    { es: "español todos los días", he: "ספרדית כל יום" },
    { es: "agua fría", he: "מים קרים" },
    { es: "una carta importante", he: "מכתב חשוב" },
    { es: "en la oficina", he: "במשרד" },
    { es: "un libro interesante", he: "ספר מעניין" },
    { es: "en la fiesta", he: "במסיבה" },
    { es: "por el parque", he: "בפארק" },
    { es: "un regalo bonito", he: "מתנה יפה" },
    { es: "música alegre", he: "מוזיקה שמחה" }
];

function conjugatePresent(verb, pronoun) {
    const root = verb.infinitive.slice(0, -2);
    const type = verb.type;
    switch (pronoun) {
        case "Yo": return root + 'o';
        case "Tú": return root + (type === 'ar' ? 'as' : 'es');
        case "Él":
        case "Ella": return root + (type === 'ar' ? 'a' : 'e');
        case "Nosotros": return root + (type === 'ar' ? 'amos' : type === 'er' ? 'emos' : 'imos');
        case "Vosotros": return root + (type === 'ar' ? 'áis' : type === 'er' ? 'éis' : 'ís');
        case "Ellos":
        case "Ellas": return root + (type === 'ar' ? 'an' : 'en');
    }
}

function generateRandomQuestions(mode, count = 10) {
    const generated = [];
    const usedCombinations = new Set();

    while (generated.length < count) {
        const sub = subjects[Math.floor(Math.random() * subjects.length)];
        const verb = verbs[Math.floor(Math.random() * verbs.length)];
        const comp = complements[Math.floor(Math.random() * complements.length)];

        const key = `${sub.pronoun}-${verb.infinitive}-${comp.es}`;
        if (usedCombinations.has(key)) continue;
        usedCombinations.add(key);

        if (mode === 'present') {
            const answer = conjugatePresent(verb, sub.pronoun);
            const sentence = `${sub.pronoun} (${verb.infinitive}) ____ ${comp.es}.`;
            const translation = `${sub.heSub} ${verb.heVerb} ${comp.he}.`;
            generated.push({ sentence, answer, translation });
        } else {
            const answer = `${sub.estar} ${verb.gerund}`;
            const sentence = `${sub.pronoun} (estar/${verb.infinitive}) ____ ${comp.es}.`;
            const translation = `${sub.heSub} ${verb.heVerb} ${comp.he} (עכשיו).`;
            generated.push({ sentence, answer, translation });
        }
    }
    return generated;
}


let currentMode = 'present';
let currentQuestionIndex = 0;
let score = 0;
let isCorrectingError = false;

let currentQuestions = [];

const modeSelect = document.getElementById('mode');
const questionCountSelect = document.getElementById('question-count');
const sentenceDisplay = document.getElementById('sentence-display');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const progressDisplay = document.getElementById('progress');
const gameCard = document.getElementById('game-card');
const summaryCard = document.getElementById('summary');
const finalScore = document.getElementById('final-score');
// Create additional UI elements
const translationBtn = document.createElement('button');
translationBtn.id = 'translation-btn';
translationBtn.className = 'hidden';
translationBtn.textContent = 'הצג תרגום';
translationBtn.style.marginTop = '10px';
translationBtn.style.backgroundColor = '#9b59b6';
document.querySelector('.question-container').appendChild(translationBtn);

const translationDisplay = document.createElement('p');
translationDisplay.id = 'translation-display';
translationDisplay.className = 'hidden';
translationDisplay.style.fontStyle = 'italic';
translationDisplay.style.color = '#7f8c8d';
document.querySelector('.question-container').appendChild(translationDisplay);

const refreshBtn = document.createElement('button');
refreshBtn.id = 'refresh-btn';
refreshBtn.textContent = '🔄 צור משפטים חדשים';
refreshBtn.style.marginRight = '10px';
document.querySelector('.settings').appendChild(refreshBtn);


function initGame() {
    currentMode = modeSelect.value;
    const questionCount = parseInt(questionCountSelect.value, 10) || 10;
    currentQuestionIndex = 0;
    score = 0;
    isCorrectingError = false;
    // Generate brand new dynamic questions based on selected count
    currentQuestions = generateRandomQuestions(currentMode, questionCount);
    showQuestion();
    updateStats();
    gameCard.classList.remove('hidden');
    summaryCard.classList.add('hidden');
}


function showQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    sentenceDisplay.textContent = q.sentence;
    answerInput.value = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    nextBtn.classList.add('hidden');
    translationBtn.classList.add('hidden');
    translationDisplay.classList.add('hidden');
    submitBtn.disabled = false;
    answerInput.disabled = false;
    isCorrectingError = false;
    answerInput.focus();
}

function updateStats() {
    scoreDisplay.textContent = `ניקוד: ${score}`;
    progressDisplay.textContent = `שאלה: ${currentQuestionIndex + 1}/${currentQuestions.length}`;
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentQuestions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        if (isCorrectingError) {
            feedback.textContent = 'יפה מאוד! עכשיו זה נכון. 😊';
            feedback.className = 'feedback correct';
        } else {
            feedback.textContent = 'כל הכבוד! נכון מאוד! ✨';
            feedback.className = 'feedback correct';
            score += 10;
        }
        
        submitBtn.disabled = true;
        answerInput.disabled = true;
        nextBtn.classList.remove('hidden');
        translationBtn.classList.remove('hidden');
        updateStats();
    } else {
        feedback.textContent = `לא מדויק. התשובה הנכונה היא: "${currentQuestions[currentQuestionIndex].answer}". רשום אותה עכשיו כדי להמשיך:`;
        feedback.className = 'feedback incorrect';
        isCorrectingError = true;
        answerInput.value = '';
        answerInput.focus();
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
        updateStats();
    } else {
        showSummary();
    }
}

function showSummary() {
    gameCard.classList.add('hidden');
    summaryCard.classList.remove('hidden');
    finalScore.textContent = `צברת ${score} נקודות מתוך ${currentQuestions.length * 10}`;
}

modeSelect.addEventListener('change', initGame);
questionCountSelect.addEventListener('change', initGame);
refreshBtn.addEventListener('click', initGame);

submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !submitBtn.disabled) checkAnswer();
});

nextBtn.addEventListener('click', nextQuestion);

translationBtn.addEventListener('click', () => {
    translationDisplay.textContent = currentQuestions[currentQuestionIndex].translation;
    translationDisplay.classList.toggle('hidden');
    translationBtn.textContent = translationDisplay.classList.contains('hidden') ? 'הצג תרגום' : 'הסתר תרגום';
});

// Start initial game
initGame();
