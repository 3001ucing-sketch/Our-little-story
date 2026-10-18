/*
 * PERSONALIZE THIS FILE FIRST.
 * Put your own photos in assets/photos and your audio file in assets/music.
 */
const CONFIG = {
  partnerOne: "Regula Hades Nyx Umbra de Loughrey Salvathore Belloir",
  partnerTwo: "Illya Javincen Addams",
  startDate: "2026-09-15", // Format: YYYY-MM-DD. Change to your anniversary date.
  letter: "If life is a race, I don't need a perfect track. I just want to keep finding my way back to you. Thank you for being my favorite part of ordinary days, for making distance feel smaller, and for reminding me that love can be both a fire and a safe place. I choose you, not because every lap is easy, but because every lap with you is worth it."
};

document.querySelectorAll("[data-config]").forEach(el => {
  const key = el.dataset.config;
  if (key === "startYear") el.textContent = CONFIG.startDate.slice(0, 4);
  else if (CONFIG[key]) el.textContent = CONFIG[key];
});
document.getElementById("letterText").textContent = CONFIG.letter;
document.getElementById("year").textContent = new Date().getFullYear();

function updateDays() {
  const start = new Date(`${CONFIG.startDate}T00:00:00`);
  const now = new Date();
  if (Number.isNaN(start.getTime()) || start > now) {
    document.getElementById("daysTogether").textContent = "000";
    return;
  }
  const days = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - start) / 86400000) + 1;
  document.getElementById("daysTogether").textContent = String(days).padStart(3, "0");
}
updateDays();

// Mobile navigation
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Music only plays after the visitor interacts, as required by most browsers.
const music = document.getElementById("bgMusic");
const soundToggle = document.getElementById("soundToggle");
const soundIcon = document.getElementById("soundIcon");
const soundLabel = document.getElementById("soundLabel");
let musicOn = false;
async function toggleMusic() {
  if (!musicOn) {
    try {
      await music.play();
      musicOn = true;
      soundIcon.textContent = "♫";
      soundLabel.textContent = "SOUND ON";
      showToast("Now playing: your song ♥");
    } catch (error) {
      showToast("Add your song at assets/music/our-song.mp3 first.");
    }
  } else {
    music.pause();
    musicOn = false;
    soundIcon.textContent = "♫";
    soundLabel.textContent = "SOUND OFF";
  }
}
soundToggle.addEventListener("click", toggleMusic);
document.getElementById("startRace").addEventListener("click", () => {
  showToast("Lights out and away we go. ♥");
  document.getElementById("story").scrollIntoView({behavior:"smooth"});
});

// Letter button
document.getElementById("letterButton").addEventListener("click", () => {
  showToast("This message was written just for you. ♥");
  document.getElementById("letterText").classList.remove("letter-reveal");
  void document.getElementById("letterText").offsetWidth;
  document.getElementById("letterText").classList.add("letter-reveal");
});

// Bucket list progress saved on this device/browser.
const bucketItems = [...document.querySelectorAll("#bucketList input[type=checkbox]")];
bucketItems.forEach((box, index) => {
  const key = `our-universe-bucket-${index}`;
  box.checked = localStorage.getItem(key) === "true";
  box.addEventListener("change", () => {
    localStorage.setItem(key, String(box.checked));
    showToast(box.checked ? "One more dream on its way. ♥" : "Saved for another lap.");
  });
});

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
}

// Subtle reveal animation when sections enter view.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll(".section-heading, .driver-card, .timeline-item, .memory, .bucket-item, .radio-panel").forEach(el => observer.observe(el));
}
