/* ----------------------------------------------------
   1. INITIAL DATA & CONFIGURATION
   ---------------------------------------------------- */

const state = {
    recipientName: "My Love",
    isLetterOpen: false,
    candlesLit: [true, true, true],
    bgMusicPlaying: false,
    quizStep: 0,
    quizScore: 0
};


const reasonsData = [
    {
        icon: "fa-smile-beam",
        title: "Your Radiance",
        text: "The way your smile instantly lights up even my gloomiest days."
    },
    {
        icon: "fa-heartPulse",
        title: "Your Kind Heart",
        text: "How deeply caring and compassionate you are to everyone around you."
    },
    {
        icon: "fa-comments",
        title: "Our Conversations",
        text: "How we can talk for hours about everything or sit in sweet comfortable silence."
    },
    {
        icon: "fa-hand-holding-heart",
        title: "Your Support",
        text: "You are my biggest cheerleader and my safest anchor in life."
    },
    {
        icon: "fa-laugh-squint",
        title: "Your Laughter",
        text: "That beautiful, contagious laugh that I could listen to forever."
    },
    {
        icon: "fa-sparkles",
        title: "Simply You",
        text: "Because you are uniquely, authentically, and wonderfully yourself."
    }
];


const polaroidsData = [
    {
        img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
        title: "Our Favorite Evening",
        caption: "Holding hands under the sunset light."
    },
    {
        img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
        title: "Sweet Escapes",
        caption: "Every adventure is better with you."
    },
    {
        img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
        title: "Quiet Moments",
        caption: "Just us, warmth, and infinite smiles."
    }
];


const quizQuestions = [
    {
        question: "What is my absolute favorite thing about you?",
        options: [
            "Your cute smile",
            "Your gentle heart",
            "Your sense of humor",
            "All of the above! ♥"
        ],
        correct: 3,
        note: "Correct! Every single thing about you is my favorite!"
    },
    {
        question: "Where is my favorite place in the whole world?",
        options: [
            "At the beach",
            "Right next to you",
            "In a cozy café",
            "Traveling abroad"
        ],
        correct: 1,
        note: "Bingo! Wherever you are, that's my home."
    },
    {
        question: "How much love do I have for you today?",
        options: [
            "100%",
            "1,000%",
            "To the moon and back",
            "Beyond infinite measurement!"
        ],
        correct: 3,
        note: "Exactly! Words and numbers can't measure it!"
    }
];


/* ----------------------------------------------------
   2. DOM INITIALIZATION & RENDER FUNCTIONS
   ---------------------------------------------------- */

window.onload = function () {

    document.getElementById('currentYear').textContent =
        new Date().getFullYear();

    renderReasons();
    renderPolaroids();
    renderQuiz();
    initBgCanvas();
};


/* Edit Recipient Name dynamically */
function changeName() {

    const newName = prompt(
        "Enter your love's name:",
        state.recipientName
    );

    if (newName && newName.trim() !== "") {

        state.recipientName = newName.trim();

        document.getElementById('recipientName').textContent =
            state.recipientName;

        document.getElementById('letterGreeting').textContent =
            `My Sweetest ${state.recipientName},`;
    }
}


/* Toggle Envelope / Love Letter */
function toggleLetter() {

    const envelope =
        document.getElementById('envelope');

    const envelopeClosedHeader =
        document.getElementById('envelopeClosedHeader');

    const letterContent =
        document.getElementById('letterContent');

    state.isLetterOpen = !state.isLetterOpen;

    if (state.isLetterOpen) {

        envelopeClosedHeader.classList.add('hidden');

        letterContent.classList.remove('hidden');

        confetti({
            particleCount: 40,
            spread: 60,
            origin: {
                y: 0.6
            },
            colors: [
                '#f43f5e',
                '#fda4af',
                '#fff'
            ]
        });

    } else {

        letterContent.classList.add('hidden');

        envelopeClosedHeader.classList.remove('hidden');
    }
}


/* Custom Love Letter Edit Modal/Prompt */
function customizeLetter() {

    const newB1 = prompt(
        "Edit 1st Paragraph:",
        document.getElementById('letterBody1').innerText
    );

    if (newB1)
        document.getElementById('letterBody1').innerText = newB1;


    const newB2 = prompt(
        "Edit 2nd Paragraph:",
        document.getElementById('letterBody2').innerText
    );

    if (newB2)
        document.getElementById('letterBody2').innerText = newB2;
}


/* Render Reasons Cards */
function renderReasons() {

    const container =
        document.getElementById('reasonsContainer');

    container.innerHTML =
        reasonsData.map((item, index) => `

            <div class="perspective-1000 h-48 cursor-pointer group"
                 onclick="flipCard(this)">

                <div class="card-inner relative w-full h-full transform-style-3d duration-500 rounded-2xl shadow-md">

                    <!-- Front Face -->
                    <div class="absolute inset-0 backface-hidden glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-rose-200 hover:border-rose-400 transition-colors">

                        <div class="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-xl mb-3">
                            <i class="fas ${item.icon}"></i>
                        </div>

                        <h4 class="font-serif-title font-semibold text-rose-900 text-lg">
                            ${item.title}
                        </h4>

                        <span class="text-xs text-rose-400 mt-2 font-medium">
                            Click to flip
                            <i class="fas fa-rotate text-[10px]"></i>
                        </span>

                    </div>


                    <!-- Back Face -->
                    <div class="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl p-6 flex items-center justify-center text-center shadow-lg">

                        <p class="text-sm font-medium leading-relaxed">
                            ${item.text}
                        </p>

                    </div>

                </div>

            </div>

        `).join('');
}


function flipCard(cardEl) {

    const inner =
        cardEl.querySelector('.card-inner');

    inner.classList.toggle('rotate-y-180');
}


/* Render Memory Scrapbook */
function renderPolaroids() {

    const container =
        document.getElementById('galleryContainer');

    const rotations = [
        '-rotate-2',
        'rotate-3',
        '-rotate-1',
        'rotate-2'
    ];

    container.innerHTML =
        polaroidsData.map((photo, i) => `

            <div class="bg-white p-4 pb-6 rounded-sm shadow-lg border border-slate-200 transform ${rotations[i % rotations.length]} hover:rotate-0 hover:scale-105 transition-all duration-300 group">

                <div class="relative overflow-hidden aspect-4/3 rounded-sm mb-4 bg-rose-50">

                    <img
                        src="${photo.img}"
                        alt="${photo.title}"
                        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onerror="this.src='https://placehold.co/600x400/fda4af/fff?text=Love+Memory'"
                    >

                    <div class="absolute inset-0 bg-rose-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                </div>

                <h4 class="font-handwriting text-2xl text-slate-800 text-center">
                    ${photo.title}
                </h4>

                <p class="text-xs text-slate-500 text-center mt-1 font-light">
                    ${photo.caption}
                </p>

            </div>

        `).join('');
}


/* ----------------------------------------------------
   3. CANDLE BLOWING & CONFETTI INTERACTION
   ---------------------------------------------------- */

function toggleCandle(index) {

    state.candlesLit[index] =
        !state.candlesLit[index];

    const flameEl =
        document.getElementById(`flame-${index}`);

    if (state.candlesLit[index]) {

        flameEl.classList.remove('hidden');

    } else {

        flameEl.classList.add('hidden');
    }

    checkCandleStatus();
}


function blowOutCandles() {

    state.candlesLit = [
        false,
        false,
        false
    ];

    for (let i = 0; i < 3; i++) {

        const flameEl =
            document.getElementById(`flame-${i}`);

        if (flameEl)
            flameEl.classList.add('hidden');
    }

    triggerBirthdayCelebration();
}


function relightCandles() {

    state.candlesLit = [
        true,
        true,
        true
    ];

    for (let i = 0; i < 3; i++) {

        const flameEl =
            document.getElementById(`flame-${i}`);

        if (flameEl)
            flameEl.classList.remove('hidden');
    }

    document.getElementById('blowBtn')
        .classList.remove('hidden');

    document.getElementById('relightBtn')
        .classList.add('hidden');

    document.getElementById('wishStatusText')
        .textContent = "";
}


function checkCandleStatus() {

    const allOut =
        state.candlesLit.every(
            status => status === false
        );

    if (allOut) {

        triggerBirthdayCelebration();
    }
}


function triggerBirthdayCelebration() {

    document.getElementById('blowBtn')
        .classList.add('hidden');

    document.getElementById('relightBtn')
        .classList.remove('hidden');

    document.getElementById('wishStatusText')
        .textContent =
        "✨ Wish Sent to the Stars! Happy Birthday! ✨";


    const duration = 3 * 1000;

    const end = Date.now() + duration;


    (function frame() {

        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: {
                x: 0
            },
            colors: [
                '#f43f5e',
                '#fb7185',
                '#fde047',
                '#ffffff'
            ]
        });


        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: {
                x: 1
            },
            colors: [
                '#f43f5e',
                '#fb7185',
                '#fde047',
                '#ffffff'
            ]
        });


        if (Date.now() < end) {

            requestAnimationFrame(frame);
        }

    })();
}


/* ----------------------------------------------------
   4. ROMANTIC QUIZ GAME
   ---------------------------------------------------- */

function renderQuiz() {

    const container =
        document.getElementById(
            'quizQuestionContainer'
        );


    if (state.quizStep >= quizQuestions.length) {

        container.innerHTML = `

            <div class="text-center py-6">

                <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">

                    <i class="fas fa-crown"></i>

                </div>


                <h4 class="font-serif-title text-2xl font-bold text-rose-900">
                    Quiz Completed!
                </h4>


                <p class="text-sm text-slate-600 mt-2">

                    Love Score:
                    <span class="font-bold text-rose-600">
                        100% Perfect Match!
                    </span>

                </p>


                <p class="text-xs text-slate-500 mt-4">
                    You are officially the most wonderful partner in the world.
                </p>


                <button
                    onclick="restartQuiz()"
                    class="mt-6 px-6 py-2 rounded-full bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition-colors">

                    Play Again

                </button>

            </div>

        `;

        return;
    }


    const q =
        quizQuestions[state.quizStep];


    container.innerHTML = `

        <div class="flex justify-between items-center text-xs text-slate-400 mb-4">

            <span>
                Question ${state.quizStep + 1} of ${quizQuestions.length}
            </span>

            <span>
                ♥ Sweet Quiz
            </span>

        </div>


        <h4 class="font-medium text-slate-800 text-base md:text-lg mb-6">
            ${q.question}
        </h4>


        <div class="space-y-3">

            ${q.options.map((opt, optIndex) => `

                <button
                    onclick="answerQuiz(${optIndex})"
                    class="w-full text-left p-3.5 rounded-xl border border-rose-200 hover:bg-rose-50 hover:border-rose-400 text-sm text-slate-700 font-medium transition-all flex items-center justify-between group">

                    <span>
                        ${opt}
                    </span>

                    <i class="fas fa-heart text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>

                </button>

            `).join('')}

        </div>

    `;
}


function answerQuiz(optionIndex) {

    state.quizStep++;

    renderQuiz();
}


function restartQuiz() {

    state.quizStep = 0;

    renderQuiz();
}


/* ----------------------------------------------------
   5. AUDIO & AMBIENCE (Tone.js Synthesizer Sound)
   ---------------------------------------------------- */

let synth = null;

let loop = null;


async function toggleAmbience() {

    const btnText =
        document.getElementById('musicText');

    const btnIcon =
        document.getElementById('musicIcon');


    if (!state.bgMusicPlaying) {

        try {

            await Tone.start();


            if (!synth) {

                synth =
                    new Tone.PolySynth(
                        Tone.Synth,
                        {
                            oscillator: {
                                type: "triangle"
                            },

                            envelope: {
                                attack: 0.8,
                                decay: 1,
                                sustain: 0.6,
                                release: 2
                            }
                        }
                    ).toDestination();


                synth.volume.value = -12;


                const chords = [

                    [
                        "C4",
                        "E4",
                        "G4",
                        "B4"
                    ],

                    [
                        "A3",
                        "C4",
                        "E4",
                        "G4"
                    ],

                    [
                        "F3",
                        "A3",
                        "C4",
                        "E4"
                    ],

                    [
                        "G3",
                        "B3",
                        "D4",
                        "F#4"
                    ]

                ];


                let step = 0;


                loop =
                    new Tone.Loop(
                        time => {

                            synth.triggerAttackRelease(
                                chords[
                                    step % chords.length
                                ],
                                "2n",
                                time
                            );

                            step++;

                        },
                        "2n"
                    ).start(0);
            }


            Tone.Transport.start();


            state.bgMusicPlaying = true;


            btnText.textContent =
                "Pause Music";


            btnIcon.classList.add(
                'animate-spin'
            );


        } catch (e) {

            console.log(
                "Audio start error",
                e
            );
        }


    } else {

        Tone.Transport.stop();


        state.bgMusicPlaying = false;


        btnText.textContent =
            "Play Music";


        btnIcon.classList.remove(
            'animate-spin'
        );
    }
}


/* ----------------------------------------------------
   6. FLOATING HEARTS & PETALS CANVAS ANIMATION
   ---------------------------------------------------- */

function initBgCanvas() {

    const canvas =
        document.getElementById(
            'bgCanvas'
        );

    const ctx =
        canvas.getContext('2d');


    let width =
        canvas.width =
        window.innerWidth;


    let height =
        canvas.height =
        window.innerHeight;


    window.addEventListener(
        'resize',
        () => {

            width =
                canvas.width =
                window.innerWidth;

            height =
                canvas.height =
                window.innerHeight;

        }
    );


    const particles = [];

    const particleCount = 35;


    class Particle {

        constructor() {

            this.reset();
        }


        reset() {

            this.x =
                Math.random() * width;

            this.y =
                height +
                Math.random() * 100;

            this.size =
                Math.random() * 14 + 8;

            this.speedY =
                Math.random() * 1 + 0.5;

            this.speedX =
                Math.sin(
                    Math.random() * Math.PI
                ) * 0.5;

            this.opacity =
                Math.random() * 0.5 + 0.3;

            this.color =
                Math.random() > 0.4
                    ? '#f43f5e'
                    : '#fda4af';

            this.rotation =
                Math.random() *
                Math.PI *
                2;

            this.rotSpeed =
                (Math.random() - 0.5) *
                0.02;
        }


        update() {

            this.y -=
                this.speedY;

            this.x +=
                Math.sin(
                    this.y * 0.01
                ) * 0.5;

            this.rotation +=
                this.rotSpeed;


            if (this.y < -50) {

                this.reset();
            }
        }


        draw() {

            ctx.save();


            ctx.translate(
                this.x,
                this.y
            );


            ctx.rotate(
                this.rotation
            );


            ctx.globalAlpha =
                this.opacity;


            ctx.fillStyle =
                this.color;


            ctx.beginPath();


            const topCurveHeight =
                this.size * 0.3;


            ctx.moveTo(
                0,
                topCurveHeight
            );


            ctx.bezierCurveTo(
                0,
                0,
                -this.size / 2,
                0,
                -this.size / 2,
                topCurveHeight
            );


            ctx.bezierCurveTo(
                -this.size / 2,
                (this.size + topCurveHeight) / 2,
                0,
                this.size,
                0,
                this.size
            );


            ctx.bezierCurveTo(
                0,
                this.size,
                this.size / 2,
                (this.size + topCurveHeight) / 2,
                this.size / 2,
                topCurveHeight
            );


            ctx.bezierCurveTo(
                this.size / 2,
                0,
                0,
                0,
                0,
                topCurveHeight
            );


            ctx.closePath();


            ctx.fill();


            ctx.restore();
        }
    }


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const p =
            new Particle();

        p.y =
            Math.random() *
            height;

        particles.push(p);
    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(
            p => {

                p.update();
                p.draw();

            }
        );


        requestAnimationFrame(
            animate
        );
    }


    animate();
}