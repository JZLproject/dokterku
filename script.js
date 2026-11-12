// ==========================================
// KONFIGURASI UTAMA (MUDAH DIEDIT)
// ==========================================
const CONFIG = {
    name: "Medina Ayu Prameswari",
    nickname: "my sweaties rollade",
    birthday: "26 November 2026",
    password: "12102x2087",
    canvaUrl: "https://miru.my.canva.site/2087" // <-- Ganti dengan link website Canva kamu nanti
};

document.addEventListener("DOMContentLoaded", () => {
    // Terapkan konfigurasi nickname jika ada elemen dinamis
    document.querySelectorAll(".nickname-text").forEach(el => {
        el.textContent = CONFIG.nickname;
    });

    // ==========================================
    // 1. FLOATING HEARTS GENERATOR
    // ==========================================
    const heartsContainer = document.getElementById("hearts-container");
    const heartSymbols = ["💗", "💖", "🤍", "❤️"];

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 12 + 12) + "px";
        heart.style.animationDuration = (Math.random() * 4 + 6) + "s";
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    setInterval(createHeart, 900);

    // ==========================================
    // 2. AUDIO / MUSIC CONTROLLER
    // ==========================================
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle");
    let isPlaying = false;

    function playMusic() {
        bgMusic.volume = 0.4; // Volume lembut
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.remove("hidden");
            musicBtn.classList.add("playing");
        }).catch(() => {
            // Jika file audio belum ada atau diblokir browser, tombol tetap muncul agar bisa diklik manual
            musicBtn.classList.remove("hidden");
        });
    }

    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove("playing");
            isPlaying = false;
        } else {
            bgMusic.play();
            musicBtn.classList.add("playing");
            isPlaying = true;
        }
    });

    // ==========================================
    // 3. STAGE TRANSITIONS (OPENING -> GIFT BOX -> JOURNEY)
    // ==========================================
    const stageOpening = document.getElementById("stage-opening");
    const stageGift = document.getElementById("stage-gift");
    const stageJourney = document.getElementById("stage-journey");
    const stagePassword = document.getElementById("stage-password");

    // Tombol Opening
    document.getElementById("btn-open-gift").addEventListener("click", () => {
        playMusic();
        stageOpening.style.opacity = "0";
        setTimeout(() => {
            stageOpening.classList.add("hidden");
            stageGift.classList.remove("hidden");
        }, 500);
    });

    // Interaksi Kotak Hadiah
    const giftBox = document.getElementById("gift-box");
    const giftHint = document.getElementById("gift-hint");
    const giftRevealText = document.getElementById("gift-reveal-text");
    let boxOpened = false;

    giftBox.addEventListener("click", () => {
        if (boxOpened) return;
        boxOpened = true;

        giftBox.classList.add("opened");
        giftHint.classList.add("hidden");
        giftRevealText.classList.remove("hidden");

        // Confetti Celebration
        confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ff758c", "#ff7eb3", "#e63956", "#ffffff"]
        });

        // Lanjut ke halaman utama setelah 2.4 detik
        setTimeout(() => {
            stageGift.style.opacity = "0";
            setTimeout(() => {
                stageGift.classList.add("hidden");
                stageJourney.classList.remove("hidden");
                window.scrollTo(0, 0);
                triggerScrollReveal();
            }, 600);
        }, 2400);
    });

    // ==========================================
    // 4. LOVE LETTER ENVELOPE INTERACTION
    // ==========================================
    const envelope = document.getElementById("envelope");
    const btnOpenLetter = document.getElementById("btn-open-letter");
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const letterPaper = document.getElementById("letter-paper");

    function openLoveLetter() {
        envelope.classList.add("open");
        setTimeout(() => {
            envelopeWrapper.classList.add("hidden");
            letterPaper.classList.remove("hidden");

            // Staggered animation untuk tiap paragraf surat
            const paragraphs = letterPaper.querySelectorAll("p");
            paragraphs.forEach((p, index) => {
                p.style.animationDelay = `${index * 0.25}s`;
            });
        }, 650);
    }

    envelope.addEventListener("click", openLoveLetter);
    btnOpenLetter.addEventListener("click", openLoveLetter);

    // ==========================================
    // 5. SCROLL REVEAL ANIMATION
    // ==========================================
    function triggerScrollReveal() {
        const reveals = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.15 });

        reveals.forEach(el => observer.observe(el));
    }

    // ==========================================
    // 6. ONE LAST SURPRISE -> PASSWORD GATE
    // ==========================================
    document.getElementById("btn-to-password").addEventListener("click", () => {
        stageJourney.classList.add("hidden");
        stagePassword.classList.remove("hidden");
        window.scrollTo(0, 0);
    });

    // ==========================================
    // 7. PASSWORD VERIFICATION & CANVA REDIRECT
    // ==========================================
    const passwordInput = document.getElementById("password-input");
    const passwordError = document.getElementById("password-error");
    const passwordGate = document.getElementById("password-gate");
    const passwordSuccess = document.getElementById("password-success");
    const redirectState = document.getElementById("redirect-state");

    function checkPassword() {
        const userInput = passwordInput.value.trim();

        if (userInput === CONFIG.password) {
            passwordError.classList.add("hidden");
            passwordGate.classList.add("hidden");
            passwordSuccess.classList.remove("hidden");

            confetti({
                particleCount: 110,
                spread: 80,
                origin: { y: 0.6 }
            });
        } else {
            passwordError.classList.remove("hidden");
            // Trigger ulang animasi shake
            passwordError.style.animation = "none";
            passwordError.offsetHeight;
            passwordError.style.animation = null;
        }
    }

    document.getElementById("btn-unlock").addEventListener("click", checkPassword);
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") checkPassword();
    });

    // Tombol Final Redirect ke Canva
    document.getElementById("btn-final-canva").addEventListener("click", () => {
        passwordSuccess.classList.add("hidden");
        redirectState.classList.remove("hidden");

        setTimeout(() => {
            if (CONFIG.canvaUrl && CONFIG.canvaUrl !== "PASTE_CANVA_LINK_HERE") {
                window.location.href = CONFIG.canvaUrl;
            } else {
                alert("Link Canva belum diisi di script.js (bagian CONFIG.canvaUrl) 😊");
            }
        }, 2200);
    });
});