const infoBtn = document.getElementById('infoBtn');
const infoPopup = document.getElementById('infoPopup');
const bioText = document.getElementById('bioText');


let typingInterval;
let isOpen = false;

function typeText(text) {
  let i = 0;
  bioText.textContent = '';
  clearInterval(typingInterval);
  typingInterval = setInterval(() => {
    if (i < text.length) {
      bioText.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 25);
}

infoBtn.addEventListener('click', () => {
  isOpen = !isOpen;

  if (isOpen) {
    infoPopup.classList.add('show');
    infoBtn.classList.add('active');
    bioText.textContent = '';
  } else {
    infoPopup.classList.remove('show');
    infoBtn.classList.remove('active');
    clearInterval(typingInterval)
  }
});

infoPopup.addEventListener('animationend', () => {
  if (isOpen) {
    typeText(translations[currentLang].bio);
  }
});

const audio = document.getElementById('audioPlayer');
audio.volume = 0.1
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const trackName = document.getElementById('trackName');

const tracks = [
  { file: 'track1.mp3', name: 'nicos nextbots ost - shop' },
  { file: 'track2.mp3', name: 'nicos nextbots ost - cyberia a site' },
  { file: 'track3.mp3', name: 'nicos nextbots ost - club' }
];

let currentTrack = 0;
let isPlaying = false;

function loadTrack(index) {
  audio.src = tracks[index].file;
  trackName.textContent = tracks[index].name;
}

loadTrack(currentTrack);

function playPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶';
  } else {
    audio.play();
    playBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
}

playBtn.addEventListener('click', playPause);

nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
});

prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
});

audio.addEventListener('ended', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
});

const enterScreen = document.getElementById('enterScreen');
const enterBtn = document.getElementById('enterBtn');

const wrapper = document.querySelector('.wrapper');
const socials = document.querySelector('.socials');

enterBtn.addEventListener('click', () => {
  enterScreen.classList.add('hidden');
  audio.play();
  playBtn.textContent = '⏸';
  isPlaying = true;
  wrapper.classList.add('reveal');
  socials.classList.add('reveal');
});

const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = percent + '%';
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  audio.currentTime = percent * audio.duration;
});

const translations = {
  ru: {
    infoBtn: "Информация",
    enterBtn: "Войти",
    bio: "Йоу. Меня зовут по разному, но в остновном обращаются по нику Neticx. Мне 15 лет и проживаю я в Эстонии. В основном я в сети С 7 утра до 1 часа ночи, но отвечать могу с задержками. Играю я в основном под вечер. Соц сети ниже, если интересно можете посмотреть."
  },
  en: {
    infoBtn: "Information",
    enterBtn: "Enter",
    bio: "Hey ya. I have many different names, but most people call me Neticx. I'm 15 y old, and i live in Estonia. Mosstly im online at 7 a.m to 1 a.m, but I might not reply immediately. I mostly play in the evening, and if you interested, you can watch my socials down below."
  }
};

let currentLang = 'ru';

function applyLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyLanguage(btn.getAttribute('data-lang'));
  });
});