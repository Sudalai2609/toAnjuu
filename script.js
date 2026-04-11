// ── PASSWORD ──────────────────────────────────
const PASSWORD = "FILLER_PASSWORD"; // ← change this 

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
  "FILLER_REASON_1",
  "FILLER_REASON_2",
  "FILLER_REASON_3",
  "FILLER_REASON_4",
  "FILLER_REASON_5",
  "FILLER_REASON_6",
  "FILLER_REASON_7",
  "FILLER_REASON_8",
  "FILLER_REASON_9",
  "FILLER_REASON_10",
  "FILLER_REASON_11",
  "FILLER_REASON_12",
  "FILLER_REASON_13",
  "FILLER_REASON_14",
  "FILLER_REASON_15",
];

const BUCKET_LIST = [
  "FILLER_BUCKET_1",
  "FILLER_BUCKET_2",
  "FILLER_BUCKET_3",
  "FILLER_BUCKET_4",
  "FILLER_BUCKET_5",
  "FILLER_BUCKET_6",
  "FILLER_BUCKET_7",
  "FILLER_BUCKET_8",
  "FILLER_BUCKET_9",
  "FILLER_BUCKET_10",
];

const PROMISES = [
  "FILLER_PROMISE_1",
  "FILLER_PROMISE_2",
  "FILLER_PROMISE_3",
  "FILLER_PROMISE_4",
  "FILLER_PROMISE_5",
  "FILLER_PROMISE_6",
  "FILLER_PROMISE_7",
  "FILLER_PROMISE_8",
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
    'FILLER_COUNTER_EGG_MESSAGE',
    'FILLER_COUNTER_EGG_SUB'
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
      'FILLER_TITLE_EGG_MESSAGE',
      'FILLER_TITLE_EGG_SUB'
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
      'FILLER_NAME_EGG_MESSAGE',
      'FILLER_NAME_EGG_SUB'
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
        'FILLER_WRONG_PASSWORD_EGG_MESSAGE',
        'FILLER_WRONG_PASSWORD_EGG_SUB'
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
      'FILLER_MUSIC_EGG_MESSAGE',
      'FILLER_MUSIC_EGG_SUB'
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
        'FILLER_LETTER_EGG_MESSAGE',
        'FILLER_LETTER_EGG_SUB'
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
        'FILLER_PHOTO_EGG_MESSAGE',
        'FILLER_PHOTO_EGG_SUB'
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
