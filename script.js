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

// ---- elements ----
const title = document.getElementById('title');
const lines = document.querySelectorAll('.lyric');
const replayBtn = document.getElementById('replay');
const song = document.getElementById('song');
const startOverlay = document.getElementById('startOverlay');
let timers = [];

function schedule(el, showAt, hideAt) {
  timers.push(setTimeout(() => el.classList.add('show'), showAt * 1000));
  timers.push(setTimeout(() => {
    el.classList.remove('show');
    el.classList.add('hide');
  }, hideAt * 1000));
}

function resetLyrics() {
  timers.forEach(clearTimeout);
  timers = [];
  title.classList.remove('show', 'hide');
  lines.forEach(l => l.classList.remove('show', 'hide'));
  replayBtn.classList.remove('visible');
}

function play() {
  resetLyrics();

  // title shows for the first 3 seconds of the song
  title.classList.add('show');
  timers.push(setTimeout(() => {
    title.classList.remove('show');
    title.classList.add('hide');
  }, 3000));

  // schedule each lyric from its data-start / data-end
  lines.forEach(l => schedule(l, +l.dataset.start, +l.dataset.end));

  // show replay button at the end (last lyric ends at 50s)
  timers.push(setTimeout(() => replayBtn.classList.add('visible'), 50500));
}

// ---- start playback when audio actually begins ----
song.addEventListener('play', () => {
  startOverlay.classList.add('hidden');
  play();
});

// if autoplay is blocked, tapping the overlay starts everything
startOverlay.addEventListener('click', () => {
  song.play();
});

// replay button restarts song + lyrics together
replayBtn.addEventListener('click', () => {
  song.currentTime = 0;
  song.play();
});

// if the song ends on its own, show the replay button
song.addEventListener('ended', () => {
  replayBtn.classList.add('visible');
});