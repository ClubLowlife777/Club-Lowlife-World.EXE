// UNDERGROUND RETRO ARCADE ENGINES
let activeArcadeGame = null;
let arcadeLoopId = null;

function startArcadeGame(gameName) {
  activeArcadeGame = gameName;
  document.getElementById('arcadeModal').style.display = 'flex';
  document.getElementById('arcadeGameTitle').innerText = `ARCADE // ${gameName.toUpperCase()}`;
  const c = document.getElementById('arcadeCanvas');
  const ctx = c.getContext('2d');
  
  if (arcadeLoopId) cancelAnimationFrame(arcadeLoopId);
  let pX = 320;

  function runSimpleArcade() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 640, 480);
    ctx.fillStyle = '#00ffcc';
    ctx.fillRect(pX - 15, 420, 30, 20);
    ctx.fillText(`${gameName.toUpperCase()} ACTIVE // PRESS ESC TO EXIT`, 20, 30);
    arcadeLoopId = requestAnimationFrame(runSimpleArcade);
  }
  runSimpleArcade();
}

function spinSlotMachine(cost) {
  if (currentProfile.tokens < cost) {
    alert("NOT ENOUGH SOUND TOKENS. DANCE ON THE FLOOR TO EARN MORE.");
    return;
  }
  currentProfile.tokens -= cost;
  updateHudStats();

  const symbols = ['7', '📼', '💎', '💀', '⚡'];
  const r1 = symbols[Math.floor(Math.random() * symbols.length)];
  const r2 = symbols[Math.floor(Math.random() * symbols.length)];
  const r3 = symbols[Math.floor(Math.random() * symbols.length)];

  document.getElementById('reel1').innerText = r1;
  document.getElementById('reel2').innerText = r2;
  document.getElementById('reel3').innerText = r3;

  if (r1 === '7' && r2 === '7' && r3 === '7') {
    currentProfile.tokens += 100;
    document.getElementById('casinoPayoutText').innerText = "JACKPOT! +100 TOKENS WON!";
  } else if (r1 === r2 && r2 === r3) {
    currentProfile.tokens += 20;
    document.getElementById('casinoPayoutText').innerText = "MATCH 3! +20 TOKENS WON!";
  } else {
    document.getElementById('casinoPayoutText').innerText = "TRY AGAIN // KEEP SPINNING";
  }
  updateHudStats();
}
