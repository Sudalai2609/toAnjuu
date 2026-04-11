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
