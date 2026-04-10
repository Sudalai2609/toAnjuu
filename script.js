const reasons = [
  "filler1",
  "filler2",
  "filler3",
  "filler4",
  "filler5",
  "filler6",
  "filler7",
  "filler8",
  "filler9",
  "filler10",
  "filler11",
  "filler12",
  "filler13",
  "filler14",
  "filler15",
  "filler16",
  "filler17",
  "filler18",
  "filler19",
  "filler20"
];

let index = 0;
let shown = 1;

function nextReason(){
  index = (index + 1) % reasons.length;
  shown++;

  const box = document.getElementById('reasonBox');
  const counter = document.getElementById('counter');

  box.classList.remove('show');

  setTimeout(() => {
    box.textContent = reasons[index];
    counter.textContent = `Reason #${shown}`;
    box.classList.add('show');
  }, 180);

  if(shown >= 10){
    document.getElementById('secretMessage').classList.add('show');
  }
}

const hearts = document.getElementById('hearts');

function createHeart(){
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = '❤';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
  heart.style.animationDuration = (Math.random() * 4 + 5) + 's';

  hearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9000);
}

setInterval(createHeart, 350);

const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

musicBtn.addEventListener('click', () => {
  if(music.paused){
    music.play();
    musicBtn.textContent = '❚❚ Pause Our Song';
  } else {
    music.pause();
    musicBtn.textContent = '▶ Play Our Song';
  }
});

window.addEventListener('click', () => {
  if(music.paused){
    music.play();
    musicBtn.textContent = '❚❚ Pause Our Song';
  }
}, { once:true });
