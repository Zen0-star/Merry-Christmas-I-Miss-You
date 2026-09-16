// ---- falling snow ----
const snowCount = 90;
for (let i = 0; i < snowCount; i++) {
  const f = document.createElement('div');
  f.className = 'snowflake';
  f.textContent = '❄';
  const size = 8 + Math.random() * 14;
  f.style.left = Math.random() * 100 + 'vw';
  f.style.fontSize = size + 'px';
  f.style.opacity = 0.3 + Math.random() * 0.6;
  f.style.animationDuration = (7 + Math.random() * 10) + 's';
  f.style.animationDelay = (-Math.random() * 15) + 's';
  document.body.appendChild(f);
}

// ---- timed lyrics ----
const title = document.getElementById('title');
const lines = document.querySelectorAll('.lyric');
const replayBtn = document.getElementById('replay');
let timers = [];

function schedule(el, showAt, hideAt) {
  timers.push(setTimeout(() => el.classList.add('show'), showAt * 1000));
  timers.push(setTimeout(() => {
    el.classList.remove('show');
    el.classList.add('hide');
  }, hideAt * 1000));
}

function play() {
  timers.forEach(clearTimeout);
  timers = [];

  title.classList.add('show');
  title.classList.remove('hide');
  lines.forEach(l => l.classList.remove('show', 'hide'));
  replayBtn.classList.remove('visible');

  // hide title after 3 seconds
  timers.push(setTimeout(() => {
    title.classList.remove('show');
    title.classList.add('hide');
  }, 3000));

  // schedule each lyric from its data-start / data-end
  lines.forEach(l => schedule(l, +l.dataset.start, +l.dataset.end));

  // show replay button at the end
  timers.push(setTimeout(() => replayBtn.classList.add('visible'), 40500));
}

replayBtn.addEventListener('click', play);
play();