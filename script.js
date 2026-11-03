const data = {
    present: [
        { sentence: "Yo (hablar) ____ con mis amigos.", answer: "hablo", translation: "אני מדבר עם החברים שלי." },
        { sentence: "Tú (comer) ____ una pizza.", answer: "comes", translation: "אתה אוכל פיצה." },
        { sentence: "Él (vivir) ____ en Madrid.", answer: "vive", translation: "הוא גר במדריד." },
        { sentence: "Nosotros (estudiar) ____ español.", answer: "estudiamos", translation: "אנחנו לומדים ספרדית." },
        { sentence: "Ellos (beber) ____ agua.", answer: "beben", translation: "הם שותים מים." },
        { sentence: "Ella (cantar) ____ muy bien.", answer: "canta", translation: "היא שרה טוב מאוד." },
        { sentence: "Ustedes (escribir) ____ una carta.", answer: "escriben", translation: "אתם כותבים מכתב." },
        { sentence: "Nosotras (bailar) ____ salsa.", answer: "bailamos", translation: "אנחנו (נקבה) רוקדות סלסה." },
        { sentence: "Yo (leer) ____ un libro.", answer: "leo", translation: "אני קורא ספר." },
        { sentence: "Tú (abrir) ____ la ventana.", answer: "abres", translation: "אתה פותח את החלון." },
        { sentence: "Él (correr) ____ en el parque.", answer: "corre", translation: "הוא רץ בפארק." },
        { sentence: "Ellos (aprender) ____ mucho.", answer: "aprenden", translation: "הם לומדים הרבה." },
        { sentence: "Nosotros (escuchar) ____ música.", answer: "escuchamos", translation: "אנחנו מקשיבים למוזיקה." },
        { sentence: "Yo (vender) ____ mi coche.", answer: "vendo", translation: "אני מוכר את המכונית שלי." },
        { sentence: "Tú (caminar) ____ por la playa.", answer: "caminas", translation: "אתה הולך בחוף הים." },
        { sentence: "Ella (decidir) ____ el menú.", answer: "decide", translation: "היא מחליטה על התפריט." },
        { sentence: "Nosotros (subir) ____ las escaleras.", answer: "subimos", translation: "אנחנו עולים במדרגות." },
        { sentence: "Ellos (mirar) ____ la televisión.", answer: "miran", translation: "הם רואים טלוויזיה." },
        { sentence: "Yo (comprender) ____ la lección.", answer: "comprendo", translation: "אני מבין את השיעור." },
        { sentence: "Tú (preguntar) ____ mucho.", answer: "preguntas", translation: "אתה שואל הרבה." }
    ],
    progressive: [
        { sentence: "Yo (estar/hablar) ____ por teléfono.", answer: "estoy hablando", translation: "אני מדבר בטלפון." },
        { sentence: "Tú (estar/comer) ____ un sándwich.", answer: "estás comiendo", translation: "אתה אוכל סנדוויץ'." },
        { sentence: "Él (estar/vivir) ____ aquí.", answer: "está viviendo", translation: "הוא גר כאן." },
        { sentence: "Nosotros (estar/bailar) ____.", answer: "estamos bailando", translation: "אנחנו רוקדים." },
        { sentence: "Ellos (estar/correr) ____.", answer: "están corriendo", translation: "הם רצים." },
        { sentence: "Ella (estar/cantar) ____ una canción.", answer: "está cantando", translation: "היא שרה שיר." },
        { sentence: "Yo (estar/estudiar) ____ para el examen.", answer: "estoy estudiando", translation: "אני לומד למבחן." },
        { sentence: "Tú (estar/beber) ____ jugo.", answer: "estás bebiendo", translation: "אתה שותה מיץ." },
        { sentence: "Nosotros (estar/escribir) ____ un correo.", answer: "estamos escribiendo", translation: "אנחנו כותבים אימייל." },
        { sentence: "Ellos (estar/leer) ____ el periódico.", answer: "están leyendo", translation: "הם קוראים עיתון." },
        { sentence: "Ustedes (estar/trabajar) ____ mucho.", answer: "están trabajando", translation: "אתם עובדים הרבה." },
        { sentence: "Yo (estar/cocinar) ____ la cena.", answer: "estoy cocinando", translation: "אני מבשל את ארוחת הערב." },
        { sentence: "Ella (estar/escuchar) ____ la radio.", answer: "está escuchando", translation: "היא מקשיבה לרדיו." },
        { sentence: "Nosotros (estar/limpiar) ____ la casa.", answer: "estamos limpiando", translation: "אנחנו מנקים את הבית." },
        { sentence: "Tú (estar/pintar) ____ un cuadro.", answer: "estás pintando", translation: "אתה מצייר תמונה." },
        { sentence: "Ellos (estar/esperar) ____ el autobús.", answer: "están esperando", translation: "הם מחכים לאוטובוס." },
        { sentence: "Yo (estar/aprender) ____ cosas nuevas.", answer: "estoy aprendiendo", translation: "אני לומד דברים חדשים." },
        { sentence: "Él (estar/mirar) ____ las estrellas.", answer: "está mirando", translation: "הוא מסתכל על הכוכבים." },
        { sentence: "Nosotros (estar/caminar) ____ por el parque.", answer: "estamos caminando", translation: "אנחנו הולכים בפארק." },
        { sentence: "Ella (estar/vender) ____ fruta.", answer: "está vendiendo", translation: "היא מוכרת פירות." }
    ]
};

let currentMode = 'present';
let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];
let isCorrectingError = false;

// אלמנטים
const modeSelect = document.getElementById('mode');
const countSelect = document.getElementById('question-count');
const sentenceDisplay = document.getElementById('sentence-display');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const feedback = document.getElementById('feedback');
const refreshBtn = document.getElementById('refresh-btn');
const specialChars = document.querySelectorAll('#special-chars button');

// יצירת כפתור תרגום דינמי
const translationBtn = document.createElement('button');
translationBtn.textContent = 'הצג תרגום';
translationBtn.className = 'hidden';
translationBtn.style.backgroundColor = '#9b59b6';
document.querySelector('.input-area').appendChild(translationBtn);

const translationDisplay = document.createElement('p');
translationDisplay.className = 'translation-text hidden';
document.querySelector('.question-container').appendChild(translationDisplay);

function initGame() {
    currentMode = modeSelect.value;
    const count = parseInt(countSelect.value);
    currentQuestionIndex = 0;
    score = 0;
    isCorrectingError = false;
    
    // וודא שלא מבקשים יותר שאלות ממה שיש
    const availableQuestions = data[currentMode];
    const actualCount = Math.min(count, availableQuestions.length);
    
    currentQuestions = [...availableQuestions].sort(() => Math.random() - 0.5).slice(0, actualCount);
        
    showQuestion();
    document.getElementById('game-card').classList.remove('hidden');
    document.getElementById('summary').classList.add('hidden');
}

function showQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    sentenceDisplay.textContent = q.sentence;
    answerInput.value = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    translationDisplay.classList.add('hidden');
    translationBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    submitBtn.disabled = false;
    answerInput.disabled = false;
    isCorrectingError = false;
    
    document.getElementById('score').textContent = `ניקוד: ${score}`;
    document.getElementById('progress').textContent = `שאלה: ${currentQuestionIndex + 1}/${currentQuestions.length}`;
    
    answerInput.focus();
}

function checkAnswer() {
    if (submitBtn.disabled) return;
    
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentQuestions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        feedback.textContent = isCorrectingError ? 'יפה, עכשיו זה נכון! 😊' : 'כל הכבוד! נכון! ✨';
        feedback.className = 'feedback correct';
        if (!isCorrectingError) score += 10;
        
        submitBtn.disabled = true;
        answerInput.disabled = true;
        nextBtn.classList.remove('hidden');
        translationBtn.classList.remove('hidden');
        nextBtn.focus();
    } else {
        feedback.textContent = `לא נכון. התשובה היא: ${currentQuestions[currentQuestionIndex].answer}. נסה שוב:`;
        feedback.className = 'feedback incorrect';
        isCorrectingError = true;
        answerInput.value = '';
        answerInput.focus();
    }
}

// אירועים
document.getElementById('start-btn').onclick = () => {
    document.getElementById('start-screen').classList.add('hidden');
    initGame();
};
submitBtn.onclick = checkAnswer;
nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) showQuestion();
    else showSummary();
};

refreshBtn.onclick = initGame;
modeSelect.onchange = initGame;
countSelect.onchange = initGame;

// תמיכה במקש Enter
answerInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
        if (submitBtn.disabled) {
            if (!nextBtn.classList.contains('hidden')) nextBtn.click();
        } else {
            checkAnswer();
        }
    }
};

// כפתורי תווים מיוחדים
specialChars.forEach(btn => {
    btn.onclick = () => {
        if (!answerInput.disabled) {
            const start = answerInput.selectionStart;
            const end = answerInput.selectionEnd;
            const text = answerInput.value;
            answerInput.value = text.slice(0, start) + btn.textContent + text.slice(end);
            answerInput.focus();
            answerInput.setSelectionRange(start + 1, start + 1);
        }
    };
});

translationBtn.onclick = () => {
    translationDisplay.textContent = currentQuestions[currentQuestionIndex].translation;
    translationDisplay.classList.toggle('hidden');
    translationBtn.textContent = translationDisplay.classList.contains('hidden') ? 'הצג תרגום' : 'הסתר תרגום';
};

function showSummary() {
    document.getElementById('game-card').classList.add('hidden');
    document.getElementById('summary').classList.remove('hidden');
    document.getElementById('final-score').textContent = `צברת ${score} נקודות!`;
}
