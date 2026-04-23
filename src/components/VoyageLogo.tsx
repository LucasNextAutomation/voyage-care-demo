interface VoyageLogoProps {
  variant?: "full" | "mark" | "white"
  className?: string
}

// Typographic wordmark that evokes Voyage Care without reproducing the
// trademarked logo. Primary colour #007cba matches the live voyagecare.com
// theme; white variant is for dark backgrounds.
export default function VoyageLogo({ variant = "full", className = "h-8" }: VoyageLogoProps) {
  const primary = variant === "white" ? "#ffffff" : "#007cba"
  const accent = variant === "white" ? "rgba(255,255,255,0.72)" : "#005a87"

  if (variant === "mark") {
    return (
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Voyage Care">
        <circle cx="20" cy="20" r="19" fill={primary} />
        <path
          d="M10 24 Q 20 8 30 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="24" r="2.6" fill="#ffffff" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Voyage Care">
      <g>
        {/* arc mark */}
        <path
          d="M6 26 Q 18 6 30 26"
          fill="none"
          stroke={primary}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="18" cy="15" r="2.6" fill={primary} />
      </g>
      <text
        x="44"
        y="27"
        fill={primary}
        fontFamily="'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="-0.3"
      >
        voyage
      </text>
      <text
        x="122"
        y="27"
        fill={accent}
        fontFamily="'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="500"
        fontSize="22"
        letterSpacing="-0.2"
      >
        care
      </text>
    </svg>
  )
}
