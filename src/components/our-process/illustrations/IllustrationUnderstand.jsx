import React from 'react';

/**
 * IllustrationUnderstand
 * Step 01: Understand
 * "We learn how your business operates, where the friction exists, and what actually needs to improve."
 *
 * Bespoke editorial line-art illustration with transparent background,
 * signature #A0BBFF accents, collaborative discovery figures, pulsing insight bulb,
 * and rotating friction analysis radar.
 */
export default function IllustrationUnderstand({ className = '', isSimActive = false }) {
  return (
    <div className={`process-illustration-wrap illust-understand ${isSimActive ? 'is-sim-active' : ''} ${className}`}>
      <svg
        className="process-illustration-svg"
        viewBox="0 0 520 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration representing Understand phase: team discovery and friction analysis"
      >
        <defs>
          {/* Ambient organic backdrop glow */}
          <radialGradient id="undGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#A0BBFF" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0" />
          </radialGradient>

          {/* Lightbulb radiating gradient */}
          <radialGradient id="bulbAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#A0BBFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="undPillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* ── 1. Soft Backdrop Ambient Aura (Transparent background) ── */}
        <circle cx="260" cy="200" r="165" fill="url(#undGlow)" />

        {/* Backdrop architectural circle & geometry */}
        <circle
          cx="260"
          cy="200"
          r="135"
          className="illust-stroke-faint"
          strokeDasharray="4 6"
        />
        <circle
          cx="260"
          cy="200"
          r="95"
          className="illust-stroke-faint"
          strokeDasharray="2 4"
        />

        {/* ── 2. Rotating Friction Analysis Radar / Gear ─────────────── */}
        <g className="anim-radar-spin" style={{ transformOrigin: '380px 110px' }}>
          <circle
            cx="380"
            cy="110"
            r="32"
            stroke="#A0BBFF"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity="0.7"
          />
          <circle cx="380" cy="110" r="18" fill="url(#undPillGrad)" />
          <circle cx="380" cy="110" r="5" fill="#A0BBFF" />
          {/* Radar Spokes */}
          <line x1="380" y1="74" x2="380" y2="146" stroke="#A0BBFF" strokeWidth="1.2" opacity="0.5" />
          <line x1="344" y1="110" x2="416" y2="110" stroke="#A0BBFF" strokeWidth="1.2" opacity="0.5" />
        </g>

        {/* ── 3. Floating Insight Bulb (Center Idea Concept) ─────────── */}
        <g className="anim-bulb-float">
          {/* Bulb Outer Glow */}
          <circle cx="260" cy="95" r="42" fill="url(#bulbAura)" className="anim-pulse-aura" />

          {/* Spark Rays */}
          <g className="illust-sparks" stroke="#A0BBFF" strokeWidth="1.8" strokeLinecap="round">
            <line x1="260" y1="36" x2="260" y2="44" />
            <line x1="298" y1="52" x2="292" y2="58" />
            <line x1="316" y1="95" x2="308" y2="95" />
            <line x1="222" y1="52" x2="228" y2="58" />
            <line x1="204" y1="95" x2="212" y2="95" />
          </g>

          {/* Lightbulb Body */}
          <path
            d="M246 112 C240 106 236 97 236 88 C236 74.7 246.7 64 260 64 C273.3 64 284 74.7 284 88 C284 97 280 106 274 112 L274 118 L246 118 Z"
            fill="#A0BBFF"
            fillOpacity="0.25"
            className="illust-stroke-main"
            strokeWidth="2"
          />
          {/* Filament */}
          <path
            d="M253 96 L257 84 L263 84 L267 96"
            stroke="#A0BBFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Bulb Screw Base */}
          <path
            d="M250 118 L270 118 M252 122 L268 122 M255 126 L265 126"
            className="illust-stroke-main"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* ── 4. Collaborative Discovery Team (Editorial Linework) ──── */}
        {/* Ground / Studio Baseline */}
        <line
          x1="80"
          y1="340"
          x2="440"
          y2="340"
          className="illust-stroke-faint"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Sleek Collaborative Desk */}
        <path
          d="M130 290 L390 290"
          className="illust-stroke-main"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="160" y1="290" x2="150" y2="340" className="illust-stroke-main" strokeWidth="1.8" />
        <line x1="360" y1="290" x2="370" y2="340" className="illust-stroke-main" strokeWidth="1.8" />

        {/* Laptop on Desk with Active Workflow Map */}
        <rect
          x="235"
          y="262"
          width="48"
          height="28"
          rx="3"
          className="illust-stroke-main"
          strokeWidth="1.8"
          fill="#A0BBFF"
          fillOpacity="0.18"
        />
        <path d="M225 290 L293 290" className="illust-stroke-main" strokeWidth="2" strokeLinecap="round" />
        {/* Screen Content */}
        <line x1="242" y1="270" x2="258" y2="270" stroke="#A0BBFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="242" y1="276" x2="274" y2="276" stroke="#A0BBFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="242" y1="282" x2="265" y2="282" stroke="#A0BBFF" strokeWidth="1.5" strokeLinecap="round" />

        {/* ── Person Left: Observant Senior Analyst (Seated) ────────── */}
        <g className="illust-person-left">
          {/* Head & Hair */}
          <path
            d="M165 198 C165 186 174 177 186 177 C198 177 207 186 207 198 C207 209 198 218 186 218 C174 218 165 209 165 198 Z"
            className="illust-stroke-main"
            strokeWidth="2"
            fill="var(--bg-surface, #191A1D)"
          />
          {/* Hair swoosh */}
          <path
            d="M167 192 C170 180 182 175 194 176 C202 177 207 183 207 188 C200 186 186 186 178 193 Z"
            fill="#A0BBFF"
            fillOpacity="0.8"
          />
          {/* Glasses */}
          <circle cx="189" cy="198" r="4.5" className="illust-stroke-main" strokeWidth="1.4" />
          <line x1="193.5" y1="198" x2="198" y2="198" className="illust-stroke-main" strokeWidth="1.2" />

          {/* Torso / Sweater in #A0BBFF tint */}
          <path
            d="M172 224 C162 232 152 248 150 270 L212 270 C212 246 204 230 196 224 Z"
            fill="#A0BBFF"
            fillOpacity="0.4"
            className="illust-stroke-main"
            strokeWidth="2"
          />
          {/* Seated leg line */}
          <path
            d="M152 270 L146 312 L180 312"
            className="illust-stroke-main"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Arm resting on desk taking notes */}
          <path
            d="M192 240 L216 265 L234 274"
            className="illust-stroke-main"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* ── Person Right: Strategy Lead (Gesturing to Insight Bulb) ─ */}
        <g className="illust-person-right">
          {/* Head & Hair */}
          <circle
            cx="326"
            cy="188"
            r="20"
            className="illust-stroke-main"
            strokeWidth="2"
            fill="var(--bg-surface, #191A1D)"
          />
          {/* Curly hair outline */}
          <path
            d="M312 178 C314 168 326 166 338 169 C346 172 348 180 346 188 C340 180 328 178 316 182 Z"
            fill="#A0BBFF"
            fillOpacity="0.75"
          />
          {/* Torso in dark / theme tone */}
          <path
            d="M310 216 C298 226 290 244 288 274 L356 274 C356 242 346 224 336 216 Z"
            fill="#A0BBFF"
            fillOpacity="0.22"
            className="illust-stroke-main"
            strokeWidth="2"
          />
          {/* Left Arm pointing gracefully up at Insight Lightbulb */}
          <path
            d="M302 232 L282 176 L268 136"
            className="illust-stroke-main"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Index finger pointer */}
          <circle cx="268" cy="136" r="2.5" fill="#A0BBFF" />

          {/* Right Arm gesturing towards desk */}
          <path
            d="M344 234 L362 260 L350 274"
            className="illust-stroke-main"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Standing legs */}
          <line x1="310" y1="274" x2="306" y2="340" className="illust-stroke-main" strokeWidth="2" />
          <line x1="336" y1="274" x2="340" y2="340" className="illust-stroke-main" strokeWidth="2" />
        </g>

        {/* ── 5. Floating Insight Cards / Telemetry Markers ─────────── */}
        {/* Card 1: Friction Detected */}
        <g className="anim-chip-float-1">
          <rect
            x="84"
            y="120"
            width="104"
            height="36"
            rx="8"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-subtle"
            strokeWidth="1.2"
          />
          <circle cx="102" cy="138" r="4" fill="#CF6733" />
          <line x1="114" y1="134" x2="168" y2="134" stroke="#A0BBFF" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="114" y1="142" x2="148" y2="142" className="illust-stroke-faint" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* Card 2: Workflow Metrics */}
        <g className="anim-chip-float-2">
          <rect
            x="354"
            y="210"
            width="98"
            height="34"
            rx="8"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-subtle"
            strokeWidth="1.2"
          />
          <circle cx="370" cy="227" r="4" fill="#A0BBFF" />
          <line x1="382" y1="223" x2="434" y2="223" stroke="#A0BBFF" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="382" y1="231" x2="416" y2="231" className="illust-stroke-faint" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* Connected dashed telemetry thread */}
        <path
          d="M136 156 Q170 200 186 218"
          stroke="#A0BBFF"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.4"
          fill="none"
        />
        <path
          d="M346 160 Q370 170 380 210"
          stroke="#A0BBFF"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.4"
          fill="none"
        />
      </svg>
    </div>
  );
}
