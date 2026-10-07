const texts = [
    "おはようございます！",
    "言いたい事があります。",
    "ファファちゃんだよね…",
    "これは特別の日から…",
    "何か確認したいです"
];

const questions = [
    {
        question: "What is your favorite color?",
        answer:"blue",
        hint:"It's the color of the sky."
    },
    {
        question:"who is your favorite anime character?",
        answer:"muichiro",
        hint:"He's from demon slayer."
    },
    {
        question:"Who is your favorite artist",
        answer:"cup of joe",
        hint:"It's a filipino brand."
    },
    {
        question:"What is your favorite fruit?",
        answer:"ringo",
        hint:"it's apple in japanese."
    },
    {
        question:"what is your favorite game?",
        answer:"roblox",
        hint:"its legos and robux!"
    },
    {
        question:"When is your birthday??",
        answer:"october 7",
    },
]


const question = document.querySelector("#question")
const quizAnswer = document.querySelector("#answer")
const hint = document.querySelector("#hint")
const submitAnswer = document.querySelector("#submit")
let questionIndex = 0;
function showQuestion(){
    question.textContent = questions[questionIndex].question;
}
submitAnswer.addEventListener("click", ()=>{
    const answerValue = quizAnswer.value.toLowerCase();
    const trueAnswer = questions[questionIndex].answer
    if (answerValue === trueAnswer){
        questionIndex++;
        if (questionIndex<questions.length){
            showQuestion();
        }
        else {
            questionCard.style.opacity = "0";
            setTimeout(()=>{section.style.opacity = "1";
                            section.style.display = "block";

            }, 1000)

        }
    }
    else{
        hint.textContent = questions[questionIndex].hint;
    }
});





const element = document.querySelector("#text")
const section = document.querySelector(".nameSection")
const music = document.querySelector("#bgMusic")
const questionCard = document.querySelector(".questionCard")
music.play();
let messageIndex = 0;
let i = 0;
function typeText(){
    const currentText = texts[messageIndex]
    if (i<currentText.length){
        element.textContent += currentText[i];
        i++;
        setTimeout(typeText, 100);
    }
    else{
        setTimeout(()=>{
            element.textContent="";
            messageIndex++;
            i = 0;
            if ( messageIndex < texts.length ){
                typeText();
            }
            else {
                showQuestion();
                questionCard.style.opacity = "1";

                
            }

        }, 2000);
}}
typeText()

const button = document.querySelector("#button")
const answer = document.querySelector(".inputValue")
const wantedName = "Farah"
button.addEventListener("click", () => {
    const answerValue = answer.value.trim();
    if (answerValue.toLowerCase() !== wantedName.toLowerCase()) {
        document.querySelector("#response").textContent = "Saya sedang mencari nama yang ulang tahunnya tanggal 7 Oktober!";
    } else {
        section.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "happybirthday/mainpage.html";
        }, 800);
    }
});


/* =====================================================
   TINGIN MUSIC CARD  (Spotify-style, play / pause)
   Paste at the BOTTOM of mainpage.js.
   - Controls your existing <audio id="bgMusic">.
   - Builds its own card + styles, no HTML/CSS edits needed.
   - Wrapped in a function, so it can't clash with your
     existing variable names.
   ===================================================== */
(function () {
  /* ---------- SETTINGS ---------- */
  var COVER_SRC = "./happybirthday/music/tingin.png"; // put the cover image here
  var TITLE = "Tataya";
  var ARTIST = "Cup of Joe";
  var AUDIO_SRC = ""; // leave "" to keep the song from your HTML

  var audio = document.getElementById("bgMusic");
  if (!audio) return;
  if (AUDIO_SRC) {
    audio.src = AUDIO_SRC;
    audio.load();
  }

  /* ---------- STYLES ---------- */
  var css = "\
.tm-card{position:fixed;right:20px;bottom:20px;z-index:100;width:210px;padding:12px;border-radius:18px;\
background:linear-gradient(160deg,rgba(20,90,70,.6),rgba(5,35,38,.8));\
-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);\
border:1.5px solid rgba(150,255,200,.45);\
box-shadow:0 14px 40px rgba(0,0,0,.45),0 0 28px rgba(80,230,170,.25);\
color:#eafff3;font-family:'Zen Maru Gothic','Quicksand',sans-serif;\
animation:tm-in .8s cubic-bezier(.2,.9,.3,1) both;transition:width .35s ease,padding .35s ease}\
.tm-cover{position:relative;width:100%;aspect-ratio:1;border-radius:12px;overflow:hidden;\
background:linear-gradient(135deg,#1f9a78,#0a3a31);box-shadow:0 8px 20px rgba(0,0,0,.4)}\
.tm-cover img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .6s ease}\
.tm-card.tm-playing .tm-cover img{animation:tm-breathe 6s ease-in-out infinite alternate}\
.tm-play{position:absolute;right:8px;bottom:8px;width:44px;height:44px;border:none;border-radius:50%;\
cursor:pointer;display:grid;place-items:center;color:#04261f;\
background:linear-gradient(135deg,#8bf5c4,#3fd9a0 55%,#f7d85a);\
box-shadow:0 6px 16px rgba(0,0,0,.45);transition:transform .2s ease,box-shadow .2s ease}\
.tm-play:hover{transform:scale(1.1);box-shadow:0 8px 22px rgba(60,230,160,.6)}\
.tm-play:active{transform:scale(.94)}\
.tm-play:focus-visible,.tm-min:focus-visible{outline:3px solid #f7d85a;outline-offset:2px}\
.tm-play svg{width:20px;height:20px;fill:currentColor}\
.tm-play .tm-i-pause{display:none}\
.tm-card.tm-playing .tm-i-play{display:none}\
.tm-card.tm-playing .tm-i-pause{display:block}\
.tm-info{margin-top:10px}\
.tm-row{display:flex;align-items:center;justify-content:space-between;gap:8px}\
.tm-title{font-weight:700;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
.tm-artist{font-size:12px;color:#b9f5d4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}\
.tm-eq{display:flex;align-items:flex-end;gap:2px;height:14px;flex:none}\
.tm-eq i{display:block;width:3px;height:100%;background:#6dffc0;border-radius:2px;transform:scaleY(.25);transform-origin:bottom}\
.tm-card.tm-playing .tm-eq i{animation:tm-eq .9s ease-in-out infinite alternate}\
.tm-card.tm-playing .tm-eq i:nth-child(2){animation-delay:.25s}\
.tm-card.tm-playing .tm-eq i:nth-child(3){animation-delay:.5s}\
.tm-bar{margin-top:10px}\
.tm-range{-webkit-appearance:none;appearance:none;width:100%;height:4px;margin:0;border-radius:4px;cursor:pointer;outline:none;\
background:linear-gradient(to right,#6dffc0 var(--tm-p,0%),rgba(255,255,255,.22) var(--tm-p,0%))}\
.tm-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 0 8px rgba(120,255,190,.8)}\
.tm-range::-moz-range-thumb{width:12px;height:12px;border:none;border-radius:50%;background:#fff;box-shadow:0 0 8px rgba(120,255,190,.8)}\
.tm-range::-moz-range-track{background:transparent}\
.tm-time{display:flex;justify-content:space-between;margin-top:5px;font-size:10px;color:rgba(234,255,243,.7)}\
.tm-min{position:absolute;top:6px;left:6px;width:26px;height:26px;border:none;border-radius:50%;cursor:pointer;\
background:rgba(4,32,28,.65);color:#eafff3;font-size:16px;line-height:1;display:grid;place-items:center;z-index:2}\
.tm-card.tm-mini{width:78px;padding:7px;border-radius:14px}\
.tm-card.tm-mini .tm-info{display:none}\
.tm-card.tm-mini .tm-play{width:30px;height:30px;right:4px;bottom:4px}\
.tm-card.tm-mini .tm-play svg{width:14px;height:14px}\
.tm-card.tm-mini .tm-min{display:none}\
@keyframes tm-in{from{opacity:0;transform:translateY(30px) scale(.94)}to{opacity:1;transform:none}}\
@keyframes tm-breathe{from{transform:scale(1)}to{transform:scale(1.07)}}\
@keyframes tm-eq{from{transform:scaleY(.2)}to{transform:scaleY(1)}}\
@media (max-width:600px){.tm-card{right:10px;bottom:10px;width:160px;padding:9px}.tm-title{font-size:13px}}\
";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- CARD ---------- */
  var card = document.createElement("div");
  card.className = "tm-card";
  card.innerHTML =
    '<div class="tm-cover">' +
      '<img alt="Album cover">' +
      '<button class="tm-min" type="button" aria-label="Minimize player">&minus;</button>' +
      '<button class="tm-play" type="button" aria-label="Play">' +
        '<svg class="tm-i-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>' +
        '<svg class="tm-i-pause" viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="tm-info">' +
      '<div class="tm-row"><div class="tm-title"></div><div class="tm-eq"><i></i><i></i><i></i></div></div>' +
      '<div class="tm-artist"></div>' +
      '<div class="tm-bar"><input class="tm-range" type="range" min="0" max="1000" step="1" value="0" aria-label="Seek"></div>' +
      '<div class="tm-time"><span class="tm-cur">0:00</span><span class="tm-dur">0:00</span></div>' +
    '</div>';
  document.body.appendChild(card);

  var img = card.querySelector(".tm-cover img");
  var playBtn = card.querySelector(".tm-play");
  var minBtn = card.querySelector(".tm-min");
  var range = card.querySelector(".tm-range");
  var curEl = card.querySelector(".tm-cur");
  var durEl = card.querySelector(".tm-dur");
  card.querySelector(".tm-title").textContent = TITLE;
  card.querySelector(".tm-artist").textContent = ARTIST;

  img.src = COVER_SRC;
  img.onerror = function () { img.style.display = "none"; }; // falls back to the green gradient

  /* start minimized on phones so it doesn't cover the page */
  if (window.innerWidth <= 600) card.classList.add("tm-mini");

  /* ---------- HELPERS ---------- */
  function fmt(s) {
    if (!isFinite(s)) return "0:00";
    var m = Math.floor(s / 60);
    var r = Math.floor(s % 60);
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  function setFill(v) {
    range.style.setProperty("--tm-p", (v / 10) + "%");
  }

  function syncState() {
    var playing = !audio.paused;
    card.classList.toggle("tm-playing", playing);
    playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
  }

  /* ---------- EVENTS ---------- */
  playBtn.addEventListener("click", function () {
    if (audio.paused) {
      var p = audio.play();
      if (p && p.catch) p.catch(function () {});
    } else {
      audio.pause();
    }
  });

  minBtn.addEventListener("click", function () {
    card.classList.add("tm-mini");
  });

  /* tapping the mini cover (not the play button) expands it again */
  card.addEventListener("click", function (e) {
    if (card.classList.contains("tm-mini") && !playBtn.contains(e.target)) {
      card.classList.remove("tm-mini");
    }
  });

  var dragging = false;
  range.addEventListener("pointerdown", function () { dragging = true; });
  window.addEventListener("pointerup", function () { dragging = false; });

  range.addEventListener("input", function () {
    if (audio.duration) audio.currentTime = (range.value / 1000) * audio.duration;
    setFill(range.value);
    curEl.textContent = fmt(audio.currentTime);
  });

  audio.addEventListener("timeupdate", function () {
    if (!audio.duration || dragging) return;
    var v = (audio.currentTime / audio.duration) * 1000;
    range.value = v;
    setFill(v);
    curEl.textContent = fmt(audio.currentTime);
  });

  audio.addEventListener("loadedmetadata", function () { durEl.textContent = fmt(audio.duration); });
  audio.addEventListener("durationchange", function () { durEl.textContent = fmt(audio.duration); });
  audio.addEventListener("play", syncState);
  audio.addEventListener("pause", syncState);
  audio.addEventListener("ended", syncState);

  /* in case the music was already started by your own code */
  if (audio.readyState >= 1) durEl.textContent = fmt(audio.duration);
  syncState();
})();