// ── PASSWORD ──────────────────────────────────
const PASSWORD = "SHAWARMA"; // ← change this 

function checkPassword() {
  const val = document.getElementById('passwordInput').value.trim().toLowerCase();
  const err = document.getElementById('passwordError');
  if (val === PASSWORD.toLowerCase()) {
    navigate('page-hub');
  } else {
    err.classList.add('show');
    document.getElementById('passwordInput').value = '';
    setTimeout(() => err.classList.remove('show'), 2000);
  }
}

// Allow pressing Enter key too
document.getElementById('passwordInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPassword();
});

const REASONS = [
  "the way ik you miss me but act like you don't (you don't always tell me nonchalant ass 😭😭",
  "how you make me sooo happy, relaxed, worryless all at oncee 😭😭",
  "you listen to me like the world would endd if you didn't, I love it smmm 🎀",
  "talking to you feels like the most comfortable placee 🎀",
  "I lovee it when you call me by my namee 😋",
  "I'm always smiling soo hardd when you say 'my babyyyy'",
  "waking up to a text from you is the favorite part of my dayy 😭",
  "I love it when you know I'm dull/upset without me saying it 😭🙏🏻",
  "you look SOOO GORGEOUS (and hawt😇) and I have no idea how I pulled you😭😭",
  "I JUST LOVE YOU SOOO MUCHHH DARLINGG 🎀💗",
  "gnggg you basically have my heart in the palm of your hands, don't squeeze too hard 😔🙏🏻",
  "the extent to which you made me yap abt you to literally everyone I speak to 😇🙏🏻",
  "I love how clingy you areeee, be more clingyy  more territorial idc 😭😭",
  "how comfortable and talkative you're with meee 🎀",
  "mwahhh - you know what you're doinggg when youu say itt 😭😭",
  "I love how we can talK abt ANYTHINGGG",
  "I MISS YOU I NEED YOU NOWWW 😭",
];

const BUCKET_LIST = [
  "fall asleep into each others arms whilst stargazing 😭",
  "watch the sunrise after staying up all night getting lost in your eyess 🎀",
  "dance and soak together in the rainnn 😋",
  "hold hands, buy you flowers and take you on a dateee 😭😭",
  "go to a photobooth and have the day of our lives 😋",
  "I cook while you yap with mee, then we'll both eat togetherrr",
  "write each other love letter(s) 🎀",
  "go to movies together!!",
  "travel places together!!!! 😭",
  "definitely (not) taste each other 😇",
  "get matching stuffs like instagram namee, bracelets etccc 😭😭",
  "try every flavour of ice cream (you included)",
  "watch the sunset while taking a walk together in the a beach",
  "celebrate our first anniversaryyy 😋",
  "I'll doo your hair you can do mineee 😭",
  "sit on a rooftop together at night and just vibe 😋😋",
  "dance together to OUR song 🤗",
  "pamper you 100%",
  "make hearts with our fingers and take photos",
  "take soo many photos together 😭😭",
  "give each other forehead kisses and kisses on cheek for no reason 😇",
  "double date with dikshu and her bandar",
];

const PROMISES = [
  "I promise that you will never feel unheard with me, every word you say matters to meee!!!",
  "I promise to NEVER let you feel unloved, unwanted or uncared for, NOT even for a SECOND 😋🤙",
  "I promise to ALWAYS prioritise you, not sometimes, not when it's convenient, alfuckingwaysss",
  "Our firsts shall be together, every firstss 😭",
  "I promise that when you're sadddd I won't pretend I can fix everythinggg, but I'll sit in it with you EVERY SINGLE time",
  "If you ever cry because of me, its only gonna be happy tearsss 😭😭",
  "To always be respectful and to always communicate to the best of my abilities!! 😋",
  "I'll be someone who you'd feel PROUD to call YOURSS 💅🏻👺",
  "I WILL ALWAYS BE DOWNNN BAD 😋💅🏻 FOR YOUU AND YOUU ONLYY",
  "I will always argue with you and ragebait youuuu 😋😋",
];

/* ─── NAVIGATION ──────────────────────────────────────────────────────────── */

function navigate(targetId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Wire up portal buttons
document.querySelectorAll('.portal[data-target]').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.target));
});

/* ─── MUSIC ───────────────────────────────────────────────────────────────── */

const PLAYLIST = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3'];
let currentTrack = 0;

const music    = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

function setMusicState(playing) {
  if (playing) {
    musicBtn.textContent = '❚❚';
    musicBtn.classList.add('playing');
  } else {
    musicBtn.textContent = '♪';
    musicBtn.classList.remove('playing');
  }
}

function loadTrack(index) {
  document.getElementById('musicSource').src = PLAYLIST[index];
  music.load();
}

function playNext() {
  currentTrack = (currentTrack + 1) % PLAYLIST.length;
  loadTrack(currentTrack);
  music.play().then(() => setMusicState(true)).catch(() => {});
}

// Auto advance to next song
music.addEventListener('ended', playNext);

musicBtn.addEventListener('click', () => {
  if (music.paused) { music.play(); setMusicState(true); }
  else              { music.pause(); setMusicState(false); }
});

// Auto-play on first interaction
window.addEventListener('click', () => {
  if (music.paused) { music.play().then(() => setMusicState(true)).catch(() => {}); }
}, { once: true });

/* ─── REASONS ─────────────────────────────────────────────────────────────── */

let reasonIndex = 0;
let reasonShown = 1;

function nextReason() {
  reasonIndex = (reasonIndex + 1) % REASONS.length;
  reasonShown++;

  const box     = document.getElementById('reasonBox');
  const counter = document.getElementById('counter');

  box.classList.remove('show');

  setTimeout(() => {
    box.textContent     = REASONS[reasonIndex];
    counter.textContent = `Reason #${reasonShown}`;
    box.classList.add('show');
  }, 200);

  if (reasonShown >= 10) {
    document.getElementById('secretMessage').classList.add('show');
  }
}

// Init first reason
document.getElementById('reasonBox').textContent = REASONS[0];
document.getElementById('reasonBox').classList.add('show');

/* ─── BUCKET LIST ─────────────────────────────────────────────────────────── */

const bucketDone = new Set();

function buildBucketList() {
  const container = document.getElementById('bucketList');
  container.innerHTML = '';

  BUCKET_LIST.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'bucket-item' + (bucketDone.has(i) ? ' done' : '');
    el.style.animationDelay = `${i * 0.05}s`;
    el.innerHTML = `
      <div class="bucket-check">${bucketDone.has(i) ? '✓' : ''}</div>
      <span class="bucket-text">${item}</span>
    `;
    el.addEventListener('click', () => {
      if (bucketDone.has(i)) bucketDone.delete(i);
      else                   bucketDone.add(i);
      buildBucketList();
    });
    container.appendChild(el);
  });
}

buildBucketList();

/* ─── PROMISES ────────────────────────────────────────────────────────────── */

function buildPromises() {
  const container = document.getElementById('promisesGrid');
  container.innerHTML = '';

  PROMISES.forEach((promise, i) => {
    const card = document.createElement('div');
    card.className = 'promise-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="promise-num">${String(i + 1).padStart(2, '0')}</div>
      <p class="promise-text">${promise}</p>
    `;
    container.appendChild(card);
  });
}

buildPromises();

/* ─── FLOATING PARTICLES ──────────────────────────────────────────────────── */

const particleContainer = document.getElementById('particles');
const PARTICLE_COLORS = ['#8b0000', '#c0112b', '#e8405a', '#f4a0ae', '#4a0010'];
const PARTICLE_SHAPES = ['❤', '✦', '·', '◦', '✿', '❋'];

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';

  const useShape = Math.random() > 0.5;

  if (useShape) {
    p.style.borderRadius = '0';
    p.style.background = 'transparent';
    p.style.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    p.style.fontSize = (Math.random() * 14 + 8) + 'px';
    p.textContent = PARTICLE_SHAPES[Math.floor(Math.random() * PARTICLE_SHAPES.length)];
    p.style.width = 'auto';
    p.style.height = 'auto';
  } else {
    const size = Math.random() * 5 + 2;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.background = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    p.style.opacity = (Math.random() * 0.4 + 0.1).toString();
  }

  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = (Math.random() * 10 + 8) + 's';
  p.style.animationDelay = (Math.random() * 4) + 's';

  particleContainer.appendChild(p);
  setTimeout(() => p.remove(), 20000);
}

setInterval(createParticle, 400);

// Kick off a few immediately
for (let i = 0; i < 8; i++) {
  setTimeout(createParticle, i * 100);
}

// ── RELATIONSHIP COUNTER ──────────────────────
const START_DATE = new Date('2026-04-06T20:00:00');

function updateTicker() {
  const now  = new Date();
  const diff = Math.max(0, now - START_DATE);

  const secs  = Math.floor(diff / 1000) % 60;
  const mins  = Math.floor(diff / 60000) % 60;
  const hours = Math.floor(diff / 3600000) % 24;
  const days  = Math.floor(diff / 86400000);

  document.getElementById('t-days').textContent  = days;
  document.getElementById('t-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('t-mins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('t-secs').textContent  = String(secs).padStart(2, '0');
}

updateTicker();
setInterval(updateTicker, 1000);

// ── SHOOTING STARS ────────────────────────────
function createStar() {
  const star = document.createElement('div');
  star.className = 'star';

  const startX = Math.random() * window.innerWidth;
  const angle  = Math.random() * 30 + 20; // degrees downward
  const dist   = Math.random() * 400 + 200;
  const rad    = (angle * Math.PI) / 180;

  star.style.left = startX + 'px';
  star.style.top  = Math.random() * (window.innerHeight * 0.5) + 'px';
  star.style.setProperty('--angle', angle + 'deg');
  star.style.setProperty('--tx', dist * Math.cos(rad) + 'px');
  star.style.setProperty('--ty', dist * Math.sin(rad) + 'px');

  const duration = Math.random() * 1000 + 800;
  star.style.animation = `shoot ${duration}ms ease-out forwards`;

  document.body.appendChild(star);
  setTimeout(() => star.remove(), duration + 100);
}

// Fire a star every 3-6 seconds randomly
function scheduleStar() {
  createStar();
  setTimeout(scheduleStar, Math.random() * 3000 + 3000);
}

setTimeout(scheduleStar, 2000);

// ── ENVELOPE ──────────────────────────────────
function openEnvelope() {
  const flap   = document.getElementById('envFlap');
  const wrap   = document.getElementById('envelopeWrap');
  const letter = document.getElementById('letterFrame');

  if (flap.classList.contains('open')) return;

  flap.classList.add('open');

  setTimeout(() => {
    wrap.style.display = 'none';
    letter.style.display = 'inline-block';
    letter.classList.add('revealed');
  }, 900);
    }

// ── EASTER EGG ENGINE ─────────────────────────
function showEgg(message, sub) {
  document.getElementById('eggMessage').textContent = message;
  document.getElementById('eggSub').textContent     = sub || '';
  document.getElementById('eggOverlay').classList.add('show');
  burstHearts();
}

function closeEgg() {
  document.getElementById('eggOverlay').classList.remove('show');
}

function burstHearts() {
  const emojis = ['❤', '🌹', '✦', '❋', '♡'];
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.className = 'burst-heart';
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = Math.random() * 360;
      const dist  = Math.random() * 300 + 100;
      const rad   = (angle * Math.PI) / 180;
      h.style.left = '50vw';
      h.style.top  = '50vh';
      h.style.setProperty('--bx', dist * Math.cos(rad) + 'px');
      h.style.setProperty('--by', dist * Math.sin(rad) + 'px');
      h.style.setProperty('--br', (Math.random() * 60 - 30) + 'deg');
      h.style.animationDuration = (Math.random() * 600 + 800) + 'ms';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1500);
    }, i * 40);
  }
}

// ── EGG 1: Click counter ──────────────────────
document.getElementById('ticker').addEventListener('click', () => {
  showEgg(
    'yes!! counting every second! 😭😭',
    'and everyone one of them is yours 😋'
  );
});

// ── EGG 2: Click hub title 5 times ───────────
let titleClicks = 0;
let titleTimer;
document.querySelector('.hub-title').addEventListener('click', () => {
  titleClicks++;
  clearTimeout(titleTimer);
  titleTimer = setTimeout(() => titleClicks = 0, 2000);
  if (titleClicks >= 5) {
    titleClicks = 0;
    burstHearts();
    setTimeout(() => showEgg(
      'okay you found me out, im obsessed 😭',
      'happy now anjana 😋'
    ), 600);
  }
});

// ── EGG 3: Type her name anywhere ────────────
let nameBuffer = '';
const HER_NAME = 'anjana';
document.addEventListener('keydown', e => {
  nameBuffer += e.key.toLowerCase();
  nameBuffer  = nameBuffer.slice(-HER_NAME.length);
  if (nameBuffer === HER_NAME) {
    nameBuffer = '';
    showEgg(
      'yes this is all for youuu 😭😭',
      '🎀💗'
    );
  }
});

// ── EGG 4: Wrong password 3 times ────────────
let wrongCount = 0;

// Replace your existing checkPassword with this one
function checkPassword() {
  const val = document.getElementById('passwordInput').value.trim().toLowerCase();
  const err = document.getElementById('passwordError');
  if (val === PASSWORD.toLowerCase()) {
    wrongCount = 0;
    navigate('page-hub');
  } else {
    wrongCount++;
    document.getElementById('passwordInput').value = '';
    if (wrongCount >= 3) {
      wrongCount = 0;
      showEgg(
        'dumbass, think harder 😭🙏🏻',
        'shawarma. the answer is shawarma 💀'
      );
    } else {
      err.classList.add('show');
      setTimeout(() => err.classList.remove('show'), 2000);
    }
  }
}

// ── EGG 5: Click music button 10 times ───────
let musicClicks = 0;
let musicEggDone = false;
document.getElementById('musicBtn').addEventListener('click', () => {
  if (musicEggDone) return;
  musicClicks++;
  if (musicClicks >= 10) {
    musicEggDone = true;
    showEgg(
      'BE MY BABYYYY!',
      'for every kiss you give me, i will give you three'
    );
  }
}, true);

// ── EGG 6: Hover letter 5 seconds ────────────
let letterTimer;
const letterFrame = document.getElementById('letterFrame');
if (letterFrame) {
  letterFrame.addEventListener('mouseenter', () => {
    letterTimer = setTimeout(() => {
      showEgg(
        'go on, open it 😭 i wrote that for you',
        'for your eyes only 😇'
      );
    }, 5000);
  });
  letterFrame.addEventListener('mouseleave', () => {
    clearTimeout(letterTimer);
  });
}

// ── EGG 7: Triple click big photo ────────────
let photoClicks = 0;
let photoTimer;
const bigPhoto = document.querySelector('.photo-card.big');
if (bigPhoto) {
  bigPhoto.addEventListener('click', () => {
    photoClicks++;
    clearTimeout(photoTimer);
    photoTimer = setTimeout(() => photoClicks = 0, 800);
    if (photoClicks >= 3) {
      photoClicks = 0;
      showEgg(
        'caught you staring 😇',
        'same tbh 😭'
      );
    }
  });
}

// ── EGG 8: Midnight message ───────────────────
function checkMidnight() {
  const now = new Date();
  if (now.getHours() === 0) {
    document.getElementById('midnightBanner').classList.add('show');
  }
}

checkMidnight();
setInterval(checkMidnight, 60000);
