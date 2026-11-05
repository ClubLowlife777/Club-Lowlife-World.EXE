// WEB AUDIO SYNTHESIZER & MULTIVERSE AUDIO ENGINE
let audioCtx = null;
let masterGain = null;
let isAudioRunning = false;
let currentTrackMode = 'orig';
let audioTimer = null;
let synthStep = 0;

function initAudioEngine() {
  if (audioCtx) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);
  startMultiverseLoop();
}

function toggleAudioEngine() {
  if (!audioCtx) initAudioEngine();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  isAudioRunning = !isAudioRunning;
  document.getElementById('audioToggleBtn').innerText = isAudioRunning ? '[AUDIO: ON]' : '[AUDIO: MUTED]';
}

function setWorldVolume(val) {
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(parseFloat(val), audioCtx.currentTime);
  }
}

function switchTrackMode(mode) {
  currentTrackMode = mode;
  synthStep = 0;
}

function startMultiverseLoop() {
  const notesUnderground = [65.41, 65.41, 77.78, 65.41, 58.27, 65.41, 87.31, 77.78];
  const notesRetrocade = [130.81, 164.81, 196.00, 261.63, 196.00, 220.00, 164.81, 196.00];

  setInterval(() => {
    if (!isAudioRunning || !audioCtx) return;
    const now = audioCtx.currentTime;
    const isUnderground = currentRealm === 'underground';
    const notes = isUnderground ? notesUnderground : notesRetrocade;
    const freq = notes[synthStep % notes.length];

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = isUnderground ? 'sawtooth' : 'square';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isUnderground ? 600 : 2400, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (currentTrackMode === 'slow' ? 0.45 : 0.2));

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.45);
    synthStep++;
  }, 220);
}

function toggleCrtScanlines() {
  const crt = document.getElementById('crtOverlay');
  const btn = document.getElementById('crtToggleBtn');
  if (crt.style.display === 'none') {
    crt.style.display = 'block';
    btn.innerText = '📺 CRT: ON';
  } else {
    crt.style.display = 'none';
    btn.innerText = '📺 CRT: OFF';
  }
}
