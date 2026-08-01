const palettes = {
  clarity: {
    accent: "var(--color-cobalt)",
    highlight: "var(--color-sun)",
    secondary: "var(--color-coral)",
  },
  math: {
    accent: "var(--color-cobalt)",
    highlight: "var(--color-sun)",
    secondary: "#7891ff",
  },
  science: {
    accent: "var(--color-coral)",
    highlight: "var(--color-mint)",
    secondary: "#f3b7a9",
  },
}

export default function NotebookIllustration({ variant = "clarity", className = "", label, reducedLabel }) {
  const safeVariant = palettes[variant] ? variant : "clarity"
  const palette = palettes[safeVariant]
  const accessibleLabel = label || reducedLabel

  return (
    <svg
      className={className}
      data-variant={safeVariant}
      viewBox="0 0 640 520"
      role={accessibleLabel ? "img" : undefined}
      aria-label={accessibleLabel}
      aria-hidden={accessibleLabel ? undefined : "true"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="640" height="520" rx="32" fill="rgba(255,255,255,0.06)" />
      <g opacity="0.24" stroke="rgba(255,255,255,0.8)" strokeWidth="1">
        <path d="M48 88H592" />
        <path d="M48 136H592" />
        <path d="M48 184H592" />
        <path d="M48 232H592" />
        <path d="M48 280H592" />
        <path d="M48 328H592" />
        <path d="M48 376H592" />
        <path d="M48 424H592" />
        <path d="M96 48V472" />
        <path d="M144 48V472" />
        <path d="M192 48V472" />
        <path d="M240 48V472" />
        <path d="M288 48V472" />
        <path d="M336 48V472" />
        <path d="M384 48V472" />
        <path d="M432 48V472" />
        <path d="M480 48V472" />
        <path d="M528 48V472" />
      </g>
      <path
        d="M82 112C160 58 186 232 270 178C350 126 336 318 424 250C488 202 502 306 560 372"
        stroke={palette.secondary}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="16 20"
        opacity="0.86"
      />
      <path
        d="M82 392C178 390 212 376 280 334C346 293 392 264 450 228C494 200 528 170 566 128"
        stroke={palette.accent}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path d="M536 128L568 126L560 158" stroke={palette.accent} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="82" cy="392" r="16" fill={palette.highlight} />
      <circle cx="280" cy="334" r="12" fill={palette.highlight} />
      <circle cx="450" cy="228" r="12" fill={palette.highlight} />
      <circle cx="566" cy="128" r="16" fill={palette.highlight} />
      <g fill="white" opacity="0.88" fontFamily="Manrope, sans-serif" fontSize="17" fontWeight="700">
        <text x="72" y="74">ce qui bloque</text>
        <text x="436" y="470">le prochain pas</text>
      </g>
      <g stroke={palette.highlight} strokeWidth="5" strokeLinecap="round" opacity="0.9">
        <path d="M116 456C140 444 152 448 174 456" />
        <path d="M456 88C480 76 496 78 518 90" />
      </g>
    </svg>
  )
}
