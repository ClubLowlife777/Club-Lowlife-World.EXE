// SYNDICATE ID & SKINS LOCKER MANAGEMENT
let currentProfile = {
  handle: "@enforcer_01",
  pin: "7777",
  tokens: 10,
  activeSkin: "enforcer",
  unlockedSkins: ["enforcer"],
  collectedTapes: []
};

function loadUserProfile() {
  const saved = localStorage.getItem('club_lowlife_profile');
  if (saved) {
    try { currentProfile = JSON.parse(saved); } catch(e){}
  }
  updateHudStats();
}

function saveUserProfile() {
  const h = document.getElementById('profileHandleInput').value;
  const p = document.getElementById('profilePinInput').value;
  if (h) currentProfile.handle = h;
  if (p) currentProfile.pin = p;
  localStorage.setItem('club_lowlife_profile', JSON.stringify(currentProfile));
  updateHudStats();
  alert("SYNDICATE CREDENTIALS ENCRYPTED & SAVED TO VAULT.");
  closeModals();
}

function updateHudStats() {
  document.getElementById('hudTokens').innerText = `TOKENS: ${currentProfile.tokens}`;
  document.getElementById('hudTapesCount').innerText = `TAPES: ${currentProfile.collectedTapes.length}/12`;
}

function openSkinsLocker() {
  const container = document.getElementById('skinsContainer');
  container.innerHTML = `
    <div class="skin-card">
      <h3>DEFAULT ENFORCER</h3>
      <p>Floor-length black duster coat & reflective helmet visor.</p>
      <button class="action-btn" onclick="equipSkin('enforcer')">${currentProfile.activeSkin === 'enforcer' ? 'EQUIPPED' : 'EQUIP'}</button>
    </div>
    <div class="skin-card">
      <h3>RETROCADE CAPTIVE</h3>
      <p>Oversized neon graphic tee & light-wash denim. (Unlocked via Tape 01).</p>
      <button class="action-btn" onclick="equipSkin('captive')">${currentProfile.activeSkin === 'captive' ? 'EQUIPPED' : 'EQUIP'}</button>
    </div>
    <div class="skin-card">
      <h3>SYNDICATE HANDLER</h3>
      <p>Tactical techwear crop vest & combat boots. (Unlocked via Arcade).</p>
      <button class="action-btn" onclick="equipSkin('handler')">${currentProfile.activeSkin === 'handler' ? 'EQUIPPED' : 'EQUIP'}</button>
    </div>
  `;
  document.getElementById('skinsModal').style.display = 'flex';
}

function equipSkin(skinId) {
  currentProfile.activeSkin = skinId;
  localStorage.setItem('club_lowlife_profile', JSON.stringify(currentProfile));
  openSkinsLocker();
}

function copySaveString() {
  navigator.clipboard.writeText(btoa(JSON.stringify(currentProfile)));
  alert("ENCRYPTED SYNDICATE STRING COPIED TO CLIPBOARD.");
}
