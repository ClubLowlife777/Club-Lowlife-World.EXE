// WORLD LOOP, COLLISION, RIFT WARPING & DANCEFLOOR
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentRealm = 'underground'; // 'underground' or 'retrocade'
let player = { x: 750, y: 750, w: 24, h: 32, speed: 4 };
let keys = {};

// WIDE DOORWAY WALL BOUNDS [X, Y, W, H]
const boundsUnderground = [
  [0, 0, 1600, 30], [0, 930, 1600, 30], [0, 0, 30, 960], [1570, 0, 30, 960],
  // Main dividing corridor with 120px open doorways
  [30, 480, 220, 20], [340, 480, 420, 20], [860, 480, 420, 20], [1380, 480, 190, 20]
];

const boundsRetrocade = [
  [0, 0, 1600, 30], [0, 930, 1600, 30], [0, 0, 30, 960], [1570, 0, 30, 960],
  // Wide open pavilion passages
  [30, 480, 320, 20], [440, 480, 300, 20], [840, 480, 320, 20], [1260, 480, 310, 20]
];

window.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
  if (e.key.toLowerCase() === 'e') triggerPlayerInteract();
  if (e.key.toLowerCase() === 'c') toggleCrtScanlines();
  if (e.key === 'Escape') closeModals();
});
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

function triggerDimensionalWarp() {
  currentRealm = currentRealm === 'underground' ? 'retrocade' : 'underground';
  player.x = 750;
  player.y = 750;
  document.getElementById('hudUniverseTag').innerText = `UNIVERSE: ${currentRealm.toUpperCase()}`;
}

function checkCollision(nx, ny) {
  const bounds = currentRealm === 'underground' ? boundsUnderground : boundsRetrocade;
  for (let b of bounds) {
    if (nx < b[0] + b[2] && nx + player.w > b[0] &&
        ny < b[1] + b[3] && ny + player.h > b[1]) {
      return true;
    }
  }
  return false;
}

function updateWorld() {
  let dx = 0, dy = 0;
  if (keys['w'] || keys['arrowup']) dy -= player.speed;
  if (keys['s'] || keys['arrowdown']) dy += player.speed;
  if (keys['a'] || keys['arrowleft']) dx -= player.speed;
  if (keys['d'] || keys['arrowright']) dx += player.speed;

  if (dx !== 0 && !checkCollision(player.x + dx, player.y)) player.x += dx;
  if (dy !== 0 && !checkCollision(player.x, player.y + dy)) player.y += dy;

  document.getElementById('hudCoords').innerText = `POS: ${Math.round(player.x)}, ${Math.round(player.y)}`;
  checkProximityTriggers();
}

function checkProximityTriggers() {
  const toast = document.getElementById('interactionToast');
  if (currentRealm === 'retrocade' && player.x > 1160 && player.x < 1540 && player.y > 520 && player.y < 830) {
    toast.style.display = 'block';
    toast.innerText = "PRESS [E] // JOIN DANCEFLOOR (+2 TOKENS)";
  } else if (player.x > 700 && player.x < 800 && player.y > 700 && player.y < 800) {
    toast.style.display = 'block';
    toast.innerText = "PRESS [E] // ENTER DIMENSIONAL RIFT";
  } else {
    toast.style.display = 'none';
  }
}

function triggerPlayerInteract() {
  if (currentRealm === 'retrocade' && player.x > 1160 && player.x < 1540 && player.y > 520 && player.y < 830) {
    currentProfile.tokens += 2;
    updateHudStats();
    alert("DANCED WITH THE SYNDICATE! +2 SOUND TOKENS ACQUIRED.");
  } else if (player.x > 700 && player.x < 800 && player.y > 700 && player.y < 800) {
    triggerDimensionalWarp();
  }
}

function renderWorld() {
  ctx.fillStyle = currentRealm === 'underground' ? '#080808' : '#050014';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw walls & open doorways
  const bounds = currentRealm === 'underground' ? boundsUnderground : boundsRetrocade;
  ctx.fillStyle = currentRealm === 'underground' ? '#222' : '#ff007f';
  for (let b of bounds) ctx.fillRect(b[0], b[1], b[2], b[3]);

  // Dimensional Rift Portal
  ctx.fillStyle = '#00ffcc';
  ctx.beginPath();
  ctx.arc(750, 750, 30, 0, Math.PI * 2);
  ctx.fill();

  // Draw Avatar
  ctx.fillStyle = currentProfile.activeSkin === 'enforcer' ? '#fff' : '#ff007f';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  updateWorld();
  requestAnimationFrame(renderWorld);
}

// Global modal triggers
function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.style.display = 'none');
}

function openQuickLinks() {
  const container = document.getElementById('quickLinksContainer');
  container.innerHTML = WORLD_CONFIG.quickLinks.map(l => `
    <a href="${l.url}" target="_blank" class="action-btn" style="display:block;margin:6px 0;">${l.label}</a>
  `).join('');
  document.getElementById('quickLinksModal').style.display = 'flex';
}

function openProfileHub() {
  document.getElementById('profileHandleInput').value = currentProfile.handle;
  document.getElementById('profilePinInput').value = currentProfile.pin;
  document.getElementById('profileModal').style.display = 'flex';
}

function openTapesModal() {
  switchTapeTab('lore');
  document.getElementById('tapesModal').style.display = 'flex';
}

function switchTapeTab(type) {
  const container = document.getElementById('tapesListContainer');
  const tapes = WORLD_CONFIG.cassettes.filter(t => t.type === type);
  container.innerHTML = tapes.map(t => `
    <div style="background:#111;padding:10px;margin:6px 0;border-left:3px solid #00ffcc;">
      <h4 style="color:#00ffcc;font-size:12px;">${t.title} [${t.realm.toUpperCase()}]</h4>
      <p style="font-size:11px;color:#aaa;">${t.log}</p>
    </div>
  `).join('');
}

// INITIALIZE APP
loadUserProfile();
renderDawSequencer();
renderWorld();
