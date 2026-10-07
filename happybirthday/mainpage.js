/* ===== In mainpage.js, REPLACE everything from the top down to (and including)
   the `setTimeout(()=>{ surprise.style.opacity = "1"; }, 5000);` line with this.
   Keep `button.addEventListener`, typeText(), and the whole BACKGROUND section as they are. ===== */

const message = "お誕生日おめでとう";
const text = document.querySelector("#text");
const romaji = document.querySelector(".romaji");
const music = document.querySelector("#bgMusic");
const button = document.querySelector(".button");
const picture = document.querySelector(".picture");
const surprise = document.querySelector(".surprise");
const box = document.querySelector(".box");
const letter = document.querySelector(".letter");
const letter2 = document.querySelector(".secondletter");
const next = document.querySelector(".next");
const next2 = document.querySelector(".next2");
const gallery = document.querySelector(".gallery");

music.play().catch(() => {});   // browsers may block autoplay; the button still works

/* ---- Put your 9 photos in the "photos" folder and list them here ---- */
const photos = [
    "music/11547.png", "music/11500.jpg", "music/11550.png",
    "music/11498.jpg", "music/11553.jpg", "music/11551.jpg",
    "music/11554.jpg", "music/11555.jpg", "music/11557.jpg"
];
photos.forEach(src => {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    img.src = src;
    img.alt = "memory";
    fig.appendChild(img);
    gallery.appendChild(fig);
});

/* ---- Typewriter (works for any letter) ---- */
document.querySelectorAll(".message").forEach(m => {
    m.dataset.full = m.textContent.replace(/\s+/g, " ").trim();
    m.textContent = "";
});

function typeWrite(el, done) {
    const full = el.dataset.full;
    let n = 0;
    el.classList.add("typing");
    (function step() {
        if (n < full.length) {
            el.textContent += full[n++];
            setTimeout(step, 50);
        } else {
            el.classList.remove("typing");
            if (done) done();
        }
    })();
}

/* ---- Flow: intro -> letter 1 -> letter 2 -> gallery ---- */
surprise.addEventListener("click", () => {
    box.classList.add("slide-away");
    setTimeout(() => {
        letter.classList.add("active");
        typeWrite(letter.querySelector(".message"), () => next.classList.add("show"));
    }, 1000);
});

next.addEventListener("click", () => {
    letter.classList.remove("active");
    letter.classList.add("exit");            // slides away to the left
    letter2.classList.add("active");         // slides in from the right to the center
    setTimeout(() => {
        typeWrite(letter2.querySelector(".message"), () => next2.classList.add("show"));
    }, 1000);
});

next2.addEventListener("click", () => {
    letter2.classList.remove("active");
    letter2.classList.add("exit");
    setTimeout(() => {
        gallery.classList.add("active");
        gallery.querySelectorAll("figure").forEach((fig, i) => {
            setTimeout(() => fig.classList.add("show"), i * 450);   // one by one
        });
    }, 900);
});

setTimeout(() => { picture.style.opacity = "1"; }, 4000);
setTimeout(() => { surprise.style.opacity = "1"; }, 5000);

button.addEventListener("click", ()=>{
    music.play();
})

function typeText(i = 0) {
    if (i <= message.length) {
        text.textContent = message.slice(0, i);
        setTimeout(() => typeText(i + 1), 140);
    } else {
        romaji.style.opacity = "1";
        document.body.classList.add("ready");
        sakuraBurst();
    }
}
typeText();



/* ===================== BACKGROUND (reusable) ===================== */

/* --- Sakura petals --- */
const canvas = document.getElementById("petals");
const ctx = canvas.getContext("2d");
const petalColors = ["#ffb7c5", "#ffc8d6", "#ff9db5", "#ffdce5", "#fff0f3"];
let W, H;
const petals = [];


function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function makePetal(fromTop, temp) {
    return {
        x: Math.random() * W,
        y: fromTop ? -20 : Math.random() * H,
        s: 6 + Math.random() * 9,
        vy: (temp ? 2 : 0.6) + Math.random() * 1.4,
        vx: -0.4 + Math.random() * 0.8,
        sw: Math.random() * 6.28,
        swS: 0.01 + Math.random() * 0.02,
        r: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.05,
        tilt: Math.random() * 6.28,
        c: petalColors[(Math.random() * petalColors.length) | 0],
        temp: !!temp
    };
}

const baseCount = window.innerWidth < 600 ? 45 : 80;
for (let i = 0; i < baseCount; i++) petals.push(makePetal(false, false));

function drawPetal(p) {
    const s = p.s;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.r);
    ctx.scale(1, Math.abs(Math.cos(p.tilt)) * 0.6 + 0.4);
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.6);
    ctx.bezierCurveTo(-s * 1.1, s * 0.2, -s * 0.8, -s, -s * 0.12, -s * 0.9);
    ctx.lineTo(0, -s * 0.7);
    ctx.lineTo(s * 0.12, -s * 0.9);
    ctx.bezierCurveTo(s * 0.8, -s, s * 1.1, s * 0.2, 0, s * 0.6);
    ctx.fill();
    ctx.restore();
}

function tick() {
    ctx.clearRect(0, 0, W, H);
    for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.sw += p.swS;
        p.tilt += 0.03;
        p.x += p.vx + Math.sin(p.sw) * 0.8;
        p.y += p.vy;
        p.r += p.vr;
        if (p.y > H + 20 || p.x < -40 || p.x > W + 40) {
            if (p.temp) { petals.splice(i, 1); continue; }
            Object.assign(p, makePetal(true, false));
        }
        drawPetal(p);
    }
    requestAnimationFrame(tick);
}
tick();

/* extra shower of petals, call sakuraBurst() anytime */
function sakuraBurst() {
    for (let i = 0; i < 90; i++) petals.push(makePetal(true, true));
}

/* --- Floating paper lanterns --- */
const lanternBox = document.querySelector(".lanterns");
const lanternColors = ["#e8344a", "#ff6b6b", "#f4b942", "#fff1e6", "#ff8fab"];

for (let i = 0; i < 8; i++) {
    const l = document.createElement("div");
    l.className = "lantern";
    const size = 34 + Math.random() * 30;
    l.style.cssText =
        "--size:" + size + "px;" +
        "--c:" + lanternColors[i % lanternColors.length] + ";" +
        "left:" + (4 + i * 12 + Math.random() * 6) + "%;" +
        "animation-duration:" + (14 + Math.random() * 10) + "s," + (3 + Math.random() * 2) + "s;" +
        "animation-delay:" + (-Math.random() * 20) + "s,0s;";
    lanternBox.appendChild(l);
}
