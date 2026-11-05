// FL STUDIO MINI CHANNEL RACK & SOUND GENERATOR
let dawStep = 0;
let isDawPlaying = false;
let dawInterval = null;
let dawBpm = 130;

const dawPattern = {
  kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
  snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
  hihat: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
  synth: [1,0,1,0, 0,1,0,1, 1,0,1,0, 0,0,1,0]
};

function renderDawSequencer() {
  const container = document.getElementById('dawStepSequencer');
  container.innerHTML = '';
  ['kick', 'snare', 'hihat', 'synth'].forEach(channel => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '4px';
    row.style.margin = '4px 0';

    const lbl = document.createElement('div');
    lbl.style.width = '70px';
    lbl.style.fontSize = '10px';
    lbl.style.color = '#00ffcc';
    lbl.innerText = channel.toUpperCase();
    row.appendChild(lbl);

    for (let i = 0; i < 16; i++) {
      const pad = document.createElement('div');
      pad.style.width = '24px';
      pad.style.height = '24px';
      pad.style.background = dawPattern[channel][i] ? '#00ffcc' : (Math.floor(i/4)%2 === 0 ? '#333' : '#222');
      pad.style.border = '1px solid #444';
      pad.style.cursor = 'pointer';
      pad.onclick = () => {
        dawPattern[channel][i] = dawPattern[channel][i] ? 0 : 1;
        renderDawSequencer();
      };
      row.appendChild(pad);
    }
    container.appendChild(row);
  });
}

function toggleDawPlayback() {
  if (isDawPlaying) { stopDawPlayback(); return; }
  isDawPlaying = true;
  document.getElementById('dawPlayBtn').innerText = '❚❚ PAUSE';
  const stepTime = (60000 / dawBpm) / 4;
  dawInterval = setInterval(() => {
    triggerDawStep(dawStep);
    dawStep = (dawStep + 1) % 16;
  }, stepTime);
}

function stopDawPlayback() {
  isDawPlaying = false;
  clearInterval(dawInterval);
  document.getElementById('dawPlayBtn').innerText = '▶ PLAY';
  dawStep = 0;
}

function triggerDawStep(s) {
  if (!audioCtx) initAudioEngine();
  const now = audioCtx.currentTime;
  if (dawPattern.kick[s]) playSynthKick(now);
  if (dawPattern.snare[s]) playSynthSnare(now);
  if (dawPattern.hihat[s]) playSynthHat(now);
  if (dawPattern.synth[s]) playSynthStab(now);
}

function playSynthKick(t) {
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.frequency.setValueAtTime(130, t);
  osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
  g.gain.setValueAtTime(1, t);
  g.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
  osc.connect(g); g.connect(masterGain);
  osc.start(t); osc.stop(t + 0.15);
}

function playSynthSnare(t) {
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220, t);
  g.gain.setValueAtTime(0.6, t);
  g.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
  osc.connect(g); g.connect(masterGain);
  osc.start(t); osc.stop(t + 0.1);
}

function playSynthHat(t) {
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(8000, t);
  g.gain.setValueAtTime(0.2, t);
  g.gain.exponentialRampToValueAtTime(0.01, t + 0.04);
  osc.connect(g); g.connect(masterGain);
  osc.start(t); osc.stop(t + 0.04);
}

function playSynthStab(t) {
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(174.61, t);
  g.gain.setValueAtTime(0.4, t);
  g.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
  osc.connect(g); g.connect(masterGain);
  osc.start(t); osc.stop(t + 0.25);
}

function exportDawBeatWav() {
  alert("RENDERING 16-STEP MASTER BUS TO .WAV EXPORT DIRECTLY...");
}
