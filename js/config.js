// ============================================================
// CLUB LOWLIFE // MASTER CONFIGURATION
// EDIT THIS FILE TO CHANGE LINKS, MUSIC, MERCH, AND LORE
// ============================================================

const WORLD_CONFIG = {
  // Current Featured Single / Player Info
  music: {
    title: "DANCING",
    status: "OUT NOW ON ALL PLATFORMS",
    spotifyUrl: "https://open.spotify.com",
    appleUrl: "https://music.apple.com",
    youtubeUrl: "https://youtube.com"
  },

  // Cassette Giveaway Claim Form
  giveawayFormUrl: "https://forms.gle/TsE7MAHSD1erDca59",

  // Top-Right "ALL LINKS" Menu
  quickLinks: [
    { label: "STREAM 'DANCING' (SPOTIFY)", url: "https://open.spotify.com" },
    { label: "STREAM 'DANCING' (APPLE MUSIC)", url: "https://music.apple.com" },
    { label: "INSTAGRAM SYNDICATE (@CLUBLOWLIFE)", url: "https://instagram.com" },
    { label: "CASSETTE TAPE GIVEAWAY CLAIM", url: "https://forms.gle/TsE7MAHSD1erDca59" },
    { label: "RETROCADE ARCHIVE STORE", url: "https://clublowlife.world" }
  ],

  // Merch Trunk Drop
  merchDrop: {
    title: "CAR TRUNK // ARCHIVE CLEARANCE",
    discountCode: "LOWLIFE10",
    storeUrl: "https://clublowlife.world",
    items: [
      { name: "Enforcer Tactical Duster", price: "$120" },
      { name: "Heavyweight Syndicate Tee", price: "$45" },
      { name: "Retrocade Archive Cap", price: "$35" }
    ]
  },

  // Discography Vault Catalog
  discography: [
    { title: "DANCING", year: "2026", type: "Single", desc: "The inaugural release of the dark cyber-noir era. Built on relentless 4-on-the-floor energy, low-pass synth bass, and sharp melodic hooks.", spotify: "https://open.spotify.com", apple: "https://music.apple.com" },
    { title: "777 // LIVING ON THE HIGHS", year: "2026", type: "Single", desc: "High-roller underground anthem celebrating triumph over chaos. Hard 808 slides and atmospheric vocal chops.", spotify: "https://open.spotify.com", apple: "https://music.apple.com" },
    { title: "LOUD!", year: "2026", type: "Single", desc: "Distorted warehouse trap with aggressive sub frequencies designed strictly for peak club system testing.", spotify: "https://open.spotify.com", apple: "https://music.apple.com" },
    { title: "MARTIAN UNIVERSITY", year: "2026", type: "Single", desc: "Futuristic synthwave sound design infused with tight bounce drums and melodic cadence shifts.", spotify: "https://open.spotify.com", apple: "https://music.apple.com" },
    { title: "HOLD ME DOWN", year: "2026", type: "Single", desc: "Melancholic night-drive record with heavy chorus guitar textures and emotional sub-bass separation.", spotify: "https://open.spotify.com", apple: "https://music.apple.com" },
    { title: "XX IT", year: "2026", type: "Single", desc: "Industrial rave pace blended with unapologetic, stripped vocal delivery.", spotify: "https://open.spotify.com", apple: "https://music.apple.com" },
    { title: "RETROCADE", year: "2025", type: "Album", desc: "The vibrant neon genesis. Saturated electronic trap, bright arpeggiators, and nostalgic arcade textures.", spotify: "https://open.spotify.com", apple: "https://music.apple.com" },
    { title: "RETROCADE EVOLVED", year: "2025", type: "Album (Deluxe)", desc: "The expanded dual-era bridge with alternate club VIP mixes and unreleased archive tracks.", spotify: "https://open.spotify.com", apple: "https://music.apple.com" }
  ],

  // 12 Collectible Cassettes (6 Lore + 6 VIP Gold Stems)
  cassettes: [
    { id: 1, type: "lore", realm: "underground", x: 120, y: 120, title: "Tape 01: Retrocade Genesis", log: "LOG 01: Saturated lights once masked the decay. The arcade was our haven until the signal got corrupted." },
    { id: 2, type: "lore", realm: "underground", x: 500, y: 150, title: "Tape 02: Holding Chamber 04", log: "LOG 02: The captive sits bound under the CRT snow. The transition demanded an absolute break with the colorful past." },
    { id: 3, type: "lore", realm: "underground", x: 1200, y: 160, title: "Tape 03: Casshern × Blade", log: "LOG 03: Heavy duster. Blacked-out reflective visor. The identity is sealed to survive the cold streets." },
    { id: 4, type: "lore", realm: "retrocade", x: 150, y: 150, title: "Tape 04: The 777 Casino Run", log: "LOG 04: Tokens rattling across the casino carpet. High-rollers thought the lights would never dim." },
    { id: 5, type: "lore", realm: "retrocade", x: 1350, y: 680, title: "Tape 05: The Afterhours Syndicate", log: "LOG 05: Beneath the dancefloor rhythm lies the backdoor key. Those who move together survive together." },
    { id: 6, type: "lore", realm: "retrocade", x: 950, y: 220, title: "Tape 06: Dimensional Fracture", log: "LOG 06: Two worlds occupying the same frequency. Retrocade dreams bound to Underground reality." },
    { id: 7, type: "vip", realm: "underground", x: 260, y: 820, title: "VIP 01: 'DANCING' (Club VIP)", log: "AUDIO STEM: 130 BPM 4-on-the-floor kick punch + isolated sub-bass lead synth." },
    { id: 8, type: "vip", realm: "underground", x: 1350, y: 820, title: "VIP 02: 'LIVING ON THE HIGHS' (Stems)", log: "AUDIO STEM: High-roller arpeggiator chops and saturated 808 glide patterns." },
    { id: 9, type: "vip", realm: "underground", x: 1400, y: 350, title: "VIP 03: 'LOUD!' (Sub Isolation)", log: "AUDIO STEM: 35Hz fundamental sine wave with tape-saturated transient crunch." },
    { id: 10, type: "vip", realm: "retrocade", x: 620, y: 150, title: "VIP 04: 'RETROCADE EVOLVED' (Bonus)", log: "AUDIO STEM: Unreleased chord progressions and chiptune lead stabs." },
    { id: 11, type: "vip", realm: "retrocade", x: 1450, y: 180, title: "VIP 05: 'MARTIAN UNIVERSITY' (Drums)", log: "AUDIO STEM: Tight acoustic snare layers paired with punchy digital claps." },
    { id: 12, type: "vip", realm: "retrocade", x: 1200, y: 820, title: "VIP 06: 'AFTERHOURS' (VIP Bounce)", log: "AUDIO STEM: Live club crowd cheer textures and dynamic hi-hat rolls." }
  ]
};
