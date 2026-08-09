const palette = [
  ["#ff704d", "#7c5cff", "👩‍💻"],
  ["#37d995", "#0f766e", "👨‍💻"],
  ["#58a6ff", "#4338ca", "🧑‍🚀"],
  ["#ffbf47", "#ea580c", "🦸‍♀️"],
  ["#c084fc", "#7e22ce", "🦸‍♂️"],
  ["#fb7185", "#be123c", "👩‍🎓"],
  ["#2dd4bf", "#0f766e", "👨‍🎓"],
  ["#60a5fa", "#1d4ed8", "🧑‍🔬"],
  ["#f472b6", "#9d174d", "👩‍🚀"],
  ["#a3e635", "#3f6212", "🥷"],
  ["#fbbf24", "#b45309", "🤖"],
  ["#818cf8", "#3730a3", "🧙‍♀️"],
];

function svgAvatar(background, accent, emoji, index) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <defs>
        <linearGradient id="g${index}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${background}"/>
          <stop offset="1" stop-color="${accent}"/>
        </linearGradient>
        <filter id="s${index}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" flood-opacity=".22"/>
        </filter>
      </defs>
      <rect width="256" height="256" rx="72" fill="url(#g${index})"/>
      <circle cx="52" cy="48" r="36" fill="#fff" opacity=".12"/>
      <circle cx="216" cy="210" r="56" fill="#fff" opacity=".1"/>
      <circle cx="128" cy="132" r="82" fill="#fff" opacity=".16" filter="url(#s${index})"/>
      <text x="128" y="159" text-anchor="middle" font-size="94" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif">${emoji}</text>
      <circle cx="205" cy="51" r="17" fill="#37d995" stroke="#fff" stroke-width="7"/>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const avatarPresets = palette.map(([background, accent, emoji], index) => ({
  id: `avatar-${index + 1}`,
  label: `Illustrated avatar ${index + 1}`,
  src: svgAvatar(background, accent, emoji, index),
}));
