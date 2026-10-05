export const currentUserProfile = {
  id: 1,
  authUserId: 101,
  username: "sandun_dev",
  displayName: "Sandun Perera",
  bio: "Fullstack Architect & Live Streamer. Passionate about real-time apps, high performance systems, and modern UI.",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  country: "Sri Lanka",
  tokens: 2850,
  followersCount: 14200,
  followingCount: 38,
  createdAt: "2025-01-15T09:30:00",
  isLive: false
};

export const virtualGifts = [
  { id: 'rose', name: 'Rose', icon: '🌹', cost: 1 },
  { id: 'heart', name: 'Love Heart', icon: '💖', cost: 5 },
  { id: 'rocket', name: 'Rocket', icon: '🚀', cost: 50 },
  { id: 'car', name: 'Sports Car', icon: '🏎️', cost: 200 },
  { id: 'yacht', name: 'Super Yacht', icon: '🛥️', cost: 500 },
  { id: 'crown', name: 'Royal Crown', icon: '👑', cost: 1000 },
  { id: 'dragon', name: 'Golden Dragon', icon: '🐉', cost: 2500 }
];

export const categories = [
  { id: "all", name: "🔥 Explore", icon: "🔥", count: "128 Live" },
  { id: "pk", name: "⚔️ PK Battles", icon: "⚔️", count: "34 Battles" },
  { id: "nearby", name: "🇱🇰 Sri Lanka", icon: "🇱🇰", count: "42 Live" },
  { id: "multi-guest", name: "🎙️ Multi-Guest", icon: "🎙️", count: "18 Rooms" },
  { id: "gaming", name: "🎮 Gaming", icon: "🎮", count: "18.4K Viewers" },
  { id: "music", name: "🎵 Music & Talent", icon: "🎵", count: "9.1K Viewers" },
  { id: "just-chatting", name: "💬 Just Chatting", icon: "💬", count: "14.2K Viewers" }
];

export const liveStreams = [
  {
    id: "stream-1",
    title: "⚡ Building Fullstack Real-Time Apps | 1v1 PK LIVE with Maya! ⚔️",
    streamer: {
      name: "Kasun Dev",
      username: "kasun_code",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      followers: "42.8K",
      verified: true
    },
    hostLevel: 48,
    country: "🇱🇰 LK",
    beans: "68.4K",
    bigoId: "ID: 981240",
    isPkActive: true,
    pkOpponent: {
      name: "Maya Frost",
      username: "maya_f",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      videoPoster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      level: 52,
      score: 1840,
      country: "🇦🇪 UAE"
    },
    topContributors: [
      { rank: 1, name: "Tharindu_LK", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80", amount: "24.5K" },
      { rank: 2, name: "Naveen_X", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80", amount: "18.2K" },
      { rank: 3, name: "Sarah_C", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", amount: "12.0K" }
    ],
    category: "Tech & Coding",
    tags: ["PKBattle", "React", "LiveCoding", "Sinhala"],
    viewers: 1420,
    startedAt: "1h 14m ago",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    isLive: true,
    videoPoster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    description: "1v1 Live PK Battle in progress! Send roses and sports cars to help Kasun win the round! 🚀"
  },
  {
    id: "stream-2",
    title: "🏆 Radiant Ranked Grinding | PK Battle vs Pro Streamer! 🔥",
    streamer: {
      name: "Neon Valkyrie",
      username: "neon_valk",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      followers: "89.3K",
      verified: true
    },
    hostLevel: 62,
    country: "🇺🇸 US",
    beans: "142.8K",
    bigoId: "ID: 772190",
    isPkActive: true,
    pkOpponent: {
      name: "Apex King LK",
      username: "apexking_lk",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      videoPoster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      level: 45,
      score: 2150,
      country: "🇱🇰 LK"
    },
    topContributors: [
      { rank: 1, name: "GamerPro", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", amount: "45.0K" },
      { rank: 2, name: "ValkArmy", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80", amount: "32.1K" },
      { rank: 3, name: "Kavi", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80", amount: "19.8K" }
    ],
    category: "Gaming",
    tags: ["PK", "Valorant", "Radiant", "FPS"],
    viewers: 3840,
    startedAt: "2h 45m ago",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    isLive: true,
    videoPoster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    description: "Playing duo with pro players today. Send gifts to push the PK meter to victory!"
  },
  {
    id: "stream-3",
    title: "🎧 Late Night Chill Lo-Fi Beats & Synth Jam 🌙 Relax & Chat",
    streamer: {
      name: "Cyber Chants",
      username: "cyberchants",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      followers: "115K",
      verified: true
    },
    hostLevel: 39,
    country: "🇯🇵 JP",
    beans: "94.0K",
    bigoId: "ID: 441029",
    isPkActive: false,
    topContributors: [
      { rank: 1, name: "ChillVibes", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", amount: "15.0K" },
      { rank: 2, name: "LofiFan", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80", amount: "9.2K" }
    ],
    category: "Music & Talent",
    tags: ["LoFi", "Synthesizer", "Ambient", "Chill"],
    viewers: 2240,
    startedAt: "4h 10m ago",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    isLive: true,
    videoPoster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    description: "Live improvisation using analog synths, electric keys and mellow drums."
  },
  {
    id: "stream-4",
    title: "💬 Colombo Street Stories & Life Updates! ☕ Multi-Guest Mic Open 🎙️",
    streamer: {
      name: "Shanika Vlogs",
      username: "shanika_v",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      followers: "24.5K",
      verified: false
    },
    hostLevel: 34,
    country: "🇱🇰 LK",
    beans: "41.2K",
    bigoId: "ID: 310892",
    isPkActive: false,
    topContributors: [
      { rank: 1, name: "Amila_SL", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", amount: "11.4K" }
    ],
    category: "Multi-Guest",
    tags: ["MultiGuest", "SriLanka", "CoffeeTalk", "Community"],
    viewers: 950,
    startedAt: "45m ago",
    thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    isLive: true,
    videoPoster: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    description: "Chilling after a busy week! Multi-guest seats are open, click a seat to join the mic!"
  }
];

export const initialChatMessages = [
  {
    id: "m-1",
    user: "Naveen_X",
    badge: "MOD",
    badgeColor: "#34d399",
    color: "#67e8f9",
    message: "Ado supiri UI eka ban! Looking super crisp! 🔥",
    time: "13:20"
  },
  {
    id: "m-2",
    user: "Kavindu99",
    badge: "VIP",
    badgeColor: "#e5b869",
    color: "#c084fc",
    message: "Can you explain how the stream latency is configured here?",
    time: "13:21"
  },
  {
    id: "m-3",
    user: "Sarah_Cloud",
    badge: "SUB 6m",
    badgeColor: "#df829a",
    color: "#f472b6",
    message: "Loving the calm vibes today! Super chill stream 🌙",
    time: "13:21"
  },
  {
    id: "m-4",
    user: "DevGhost",
    badge: "FOUNDER",
    badgeColor: "#707df2",
    color: "#fb923c",
    message: "React + Vite performance is insane compared to other stacks.",
    time: "13:22"
  },
  {
    id: "m-5",
    user: "Minoli_96",
    badge: null,
    badgeColor: null,
    color: "#4ade80",
    message: "Drop the github link when finished! 👏",
    time: "13:23"
  }
];

export const simulatedChatResponses = [
  { user: "Tharindu_LK", message: "Live stream quality 1080p60 is buttery smooth! 😍", badge: "VIP", badgeColor: "#e5b869", color: "#67e8f9" },
  { user: "GamerBro99", message: "Let's goooo! 🔥🔥🔥", badge: null, badgeColor: null, color: "#f472b6" },
  { user: "Vimukthi_G", message: "Wave tokens system is super neat 💎", badge: "SUB 3m", badgeColor: "#df829a", color: "#34d399" },
  { user: "CodeNinja", message: "Clean layout, calm dark mode looks very sleek! 🚀", badge: "MOD", badgeColor: "#34d399", color: "#fb923c" },
  { user: "Ashan_Pixel", message: "Can we clip this stream moment? 🎥", badge: null, badgeColor: null, color: "#818cf8" }
];
