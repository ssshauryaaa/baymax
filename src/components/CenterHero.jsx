import { useState, useEffect } from 'react'

/* ════════════════════════════════════════════════════════════════
   HIRO & BAYMAX — Beyond the Portal  ·  6-chapter story stage
   Each chapter has: scene SVG, title, body text, mission card,
   colour accent, and a zone label.
   ════════════════════════════════════════════════════════════════ */

const CHAPTERS = [
  {
    num: '01',
    title: 'The Jump',
    zone: 'Portal Edge',
    accent: '#E5383B',
    body: `After the battle with Callaghan, Baymax sacrifices himself to launch Hiro to safety. But Hiro sees Baymax's healthcare chip still blinking in the closing portal — and he knows Baymax is still inside. Against every warning, Hiro turns back and leaps through the shrinking gate.`,
    mission: 'ENTER THE PORTAL — FIND BAYMAX',
    missionSub: 'Time window: closing fast',
    tags: ['Hiro', 'Baymax', 'Sacrifice'],
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        {/* Portal glow ring */}
        <defs>
          <radialGradient id="p1g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5383B" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#E5383B" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="p1inner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#E5383B" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <ellipse cx="180" cy="130" rx="120" ry="120" fill="url(#p1g)" />
        <circle cx="180" cy="130" r="90" fill="none" stroke="#E5383B" strokeWidth="2.5" opacity="0.6" />
        <circle cx="180" cy="130" r="70" fill="url(#p1inner)" stroke="#E5383B" strokeWidth="1.5" opacity="0.9" />
        <circle cx="180" cy="130" r="48" fill="none" stroke="#fff" strokeWidth="1" opacity="0.25" />
        {/* Hiro silhouette — leaping forward */}
        <g transform="translate(148,80)">
          {/* head */}
          <circle cx="16" cy="10" r="9" fill="rgba(255,255,255,0.85)" />
          {/* body */}
          <path d="M10 19 Q16 35 22 19" fill="rgba(255,255,255,0.75)" />
          {/* left arm stretched forward */}
          <line x1="10" y1="24" x2="-4" y2="32" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
          {/* right arm back */}
          <line x1="22" y1="24" x2="34" y2="20" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
          {/* legs leap */}
          <line x1="14" y1="35" x2="6" y2="50" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="18" y1="35" x2="28" y2="46" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* Chip blinking dot */}
        <circle cx="186" cy="118" r="5" fill="#E5383B" opacity="0.9" />
        <circle cx="186" cy="118" r="9" fill="none" stroke="#E5383B" strokeWidth="1.5" opacity="0.5" />
        {/* Speed lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1={80 + i * 8} y1={100 + i * 6} x2={60 + i * 8} y2={102 + i * 6}
            stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
        ))}
        {/* Label */}
        <text x="180" y="248" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="3">PORTAL GATEWAY</text>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'The Empty Shell',
    zone: 'Drift Field',
    accent: '#9B8FD4',
    body: `Inside the portal dimension, gravity has no fixed direction. Debris from countless worlds drifts silently around him. Hiro finds Baymax's white armour floating motionless — empty. The healthcare chip is clutched tightly in his own hand. He has to act fast.`,
    mission: 'LOCATE THE ARMOUR — PREPARE THE CHIP',
    missionSub: 'No power signature detected',
    tags: ['Empty Armour', 'Healthcare Chip', 'Zero-G'],
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="p2g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9B8FD4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="180" cy="130" rx="130" ry="110" fill="url(#p2g)" />
        {/* Baymax empty shell — floating, rounded body */}
        <g transform="translate(115, 55)">
          {/* head */}
          <ellipse cx="65" cy="22" rx="22" ry="20" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
          {/* eyes — dark, off */}
          <ellipse cx="57" cy="22" rx="5" ry="4" fill="rgba(40,40,60,0.8)" />
          <ellipse cx="73" cy="22" rx="5" ry="4" fill="rgba(40,40,60,0.8)" />
          {/* body */}
          <ellipse cx="65" cy="78" rx="38" ry="42" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
          {/* chest port — empty */}
          <circle cx="65" cy="68" r="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* arms drifting */}
          <ellipse cx="18" cy="65" rx="12" ry="28" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" transform="rotate(-20,18,65)" />
          <ellipse cx="112" cy="60" rx="12" ry="28" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" transform="rotate(15,112,60)" />
          {/* legs */}
          <ellipse cx="50" cy="128" rx="11" ry="20" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          <ellipse cx="80" cy="128" rx="11" ry="20" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        </g>
        {/* Floating debris */}
        {[[30, 60, 8], [300, 100, 5], [50, 190, 7], [320, 160, 4], [90, 220, 6], [260, 40, 5]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        ))}
        {/* Chip in Hiro's hand (bottom corner) */}
        <g transform="translate(25,195)">
          <rect x="0" y="0" width="22" height="16" rx="2" fill="rgba(229,56,59,0.7)" stroke="#E5383B" strokeWidth="1" />
          <line x1="4" y1="0" x2="4" y2="-5" stroke="#E5383B" strokeWidth="1.5" />
          <line x1="11" y1="0" x2="11" y2="-5" stroke="#E5383B" strokeWidth="1.5" />
          <line x1="18" y1="0" x2="18" y2="-5" stroke="#E5383B" strokeWidth="1.5" />
        </g>
        <text x="180" y="248" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="3">DRIFT FIELD — SECTOR 0</text>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Restoration',
    zone: 'Quiet Ruins',
    accent: '#2DD4BF',
    body: `Hiro finds a moment of stillness among the ruins of the dimension — fractured platforms suspended in the void. He steadies himself, pulls out the healthcare chip, and slots it into the port in Baymax's chest. A pause. Then — systems online.`,
    mission: 'INSERT CHIP — RESTORE BAYMAX',
    missionSub: '"Hello. I am Baymax."',
    tags: ['Chip Install', 'Baymax Online', 'Reunion'],
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="p3g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="180" cy="130" rx="130" ry="110" fill="url(#p3g)" />
        {/* Baymax — lit up, online */}
        <g transform="translate(108, 50)">
          {/* head glow */}
          <ellipse cx="65" cy="22" rx="26" ry="24" fill="rgba(45,212,191,0.12)" stroke="#2DD4BF" strokeWidth="1.5" />
          <ellipse cx="65" cy="22" rx="22" ry="20" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          {/* eyes — lit */}
          <ellipse cx="57" cy="22" rx="5" ry="4" fill="#1a1a2e" />
          <ellipse cx="73" cy="22" rx="5" ry="4" fill="#1a1a2e" />
          {/* smile line */}
          <path d="M59 28 Q65 32 71 28" fill="none" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" />
          {/* body */}
          <ellipse cx="65" cy="78" rx="38" ry="42" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" />
          {/* chest chip — installed, glowing */}
          <circle cx="65" cy="68" r="10" fill="rgba(45,212,191,0.3)" stroke="#2DD4BF" strokeWidth="2" />
          <circle cx="65" cy="68" r="5" fill="#2DD4BF" opacity="0.9" />
          {/* arms spread welcome */}
          <ellipse cx="15" cy="60" rx="11" ry="28" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" transform="rotate(-30,15,60)" />
          <ellipse cx="115" cy="60" rx="11" ry="28" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" transform="rotate(30,115,60)" />
          {/* legs */}
          <ellipse cx="50" cy="128" rx="11" ry="20" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <ellipse cx="80" cy="128" rx="11" ry="20" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        </g>
        {/* Hiro — beside Baymax, arm raised */}
        <g transform="translate(245, 100)">
          <circle cx="14" cy="10" r="8" fill="rgba(255,255,255,0.8)" />
          <path d="M9 18 Q14 30 19 18" fill="rgba(255,255,255,0.7)" />
          <line x1="9" y1="22" x2="0" y2="15" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="22" x2="26" y2="28" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="30" x2="10" y2="45" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="30" x2="18" y2="45" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Floating ruin platforms */}
        {[[25, 160, 50, 6], [280, 140, 45, 6], [60, 210, 60, 6]].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        ))}
        <text x="180" y="248" textAnchor="middle" fill="rgba(45,212,191,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="3">SYSTEMS RESTORED</text>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'The Strange World',
    zone: 'Inverted Canyon',
    accent: '#FBBF24',
    body: `The dimension defies all physics. Canyons hang upside down. Gravity shifts without warning. Strange energy pillars pulse through the air. Baymax's sensors can't map anything — nothing in his database matches this place. Every step forward is unknown.`,
    mission: 'NAVIGATE THE INVERTED CANYON',
    missionSub: 'Threat level: HIGH — stay close',
    tags: ['Zero-Physics', 'Hazards', 'Unknown Zone'],
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="p4g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="180" cy="130" rx="160" ry="120" fill="url(#p4g)" />
        {/* Inverted cliff shapes from above */}
        <path d="M0 0 Q60 40 80 0 L80 70 Q60 50 0 80 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <path d="M280 0 Q310 50 360 20 L360 90 Q310 60 280 80 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        {/* Energy pillars */}
        {[80, 150, 240, 295].map((x, i) => (
          <g key={i}>
            <rect x={x} y={60} width={8} height={150} fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
            <ellipse cx={x + 4} cy={60} rx={12} ry={6} fill="rgba(251,191,36,0.2)" />
          </g>
        ))}
        {/* Hiro + Baymax walking across a floating path */}
        <rect x="100" y="155" width="160" height="8" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* Baymax */}
        <g transform="translate(128, 110)">
          <ellipse cx="18" cy="14" rx="14" ry="12" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
          <ellipse cx="13" cy="14" rx="3" ry="3" fill="#1a1a2e" />
          <ellipse cx="23" cy="14" rx="3" ry="3" fill="#1a1a2e" />
          <ellipse cx="18" cy="36" rx="22" ry="26" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
          <ellipse cx="-4" cy="32" rx="7" ry="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <ellipse cx="40" cy="32" rx="7" ry="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        </g>
        {/* Hiro */}
        <g transform="translate(196, 122)">
          <circle cx="10" cy="8" r="7" fill="rgba(255,255,255,0.8)" />
          <path d="M6 15 Q10 25 14 15" fill="rgba(255,255,255,0.7)" />
          <line x1="6" y1="18" x2="0" y2="24" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="18" x2="20" y2="22" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="25" x2="6" y2="36" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="25" x2="14" y2="36" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Inverted rocks above */}
        {[[50, 30, 25, 16], [200, 20, 30, 18], [300, 35, 22, 14]].map(([x, y, w, h], i) => (
          <ellipse key={i} cx={x} cy={y} rx={w} ry={h} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        ))}
        <text x="180" y="248" textAnchor="middle" fill="rgba(251,191,36,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="3">GRAVITY UNSTABLE</text>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Working Together',
    zone: 'Glitch Bridge',
    accent: '#B8A4FF',
    body: `Hiro uses his tech genius to analyse the portal dimension's patterns — but the dangers are physical. Baymax provides the shield. Together they build a path across the Glitch Bridge: Hiro designs, Baymax protects. Neither could do it without the other.`,
    mission: 'BUILD THE BRIDGE — CROSS TOGETHER',
    missionSub: 'Combine tech + care protocols',
    tags: ['Teamwork', 'Engineering', 'Protection'],
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="p5g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B8A4FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8A4FF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B8A4FF" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <ellipse cx="180" cy="130" rx="150" ry="120" fill="url(#p5g)" />
        {/* Bridge structure being built */}
        <rect x="30" y="148" width="300" height="10" rx="3" fill="url(#bridgeGrad)" stroke="rgba(184,164,255,0.5)" strokeWidth="1" />
        {/* Bridge supports */}
        {[60, 120, 180, 240, 300].map((x, i) => (
          <line key={i} x1={x} y1={158} x2={x} y2={200} stroke="rgba(184,164,255,0.25)" strokeWidth="2" />
        ))}
        {/* Glitch patches — broken segments */}
        <rect x="130" y="144" width="40" height="18" rx="2" fill="rgba(0,0,0,0.35)" stroke="rgba(184,164,255,0.2)" strokeWidth="1" strokeDasharray="4 2" />
        <rect x="220" y="144" width="30" height="18" rx="2" fill="rgba(0,0,0,0.35)" stroke="rgba(184,164,255,0.2)" strokeWidth="1" strokeDasharray="4 2" />
        {/* Baymax — shielding */}
        <g transform="translate(80, 85)">
          <ellipse cx="20" cy="16" rx="16" ry="14" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" />
          <ellipse cx="14" cy="16" rx="4" ry="3" fill="#1a1a2e" />
          <ellipse cx="26" cy="16" rx="4" ry="3" fill="#1a1a2e" />
          <ellipse cx="20" cy="42" rx="26" ry="30" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
          {/* shield arm outstretched */}
          <ellipse cx="-12" cy="35" rx="8" ry="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" transform="rotate(-40,-12,35)" />
          {/* shield glow */}
          <ellipse cx="-22" cy="42" rx="16" ry="24" fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.3)" strokeWidth="1.5" strokeDasharray="3 2" />
          <ellipse cx="48" cy="35" rx="8" ry="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" transform="rotate(20,48,35)" />
        </g>
        {/* Hiro — kneeling, building */}
        <g transform="translate(225, 108)">
          <circle cx="10" cy="8" r="8" fill="rgba(255,255,255,0.8)" />
          <path d="M6 16 Q10 22 14 16" fill="rgba(255,255,255,0.7)" />
          {/* arm reaching down */}
          <line x1="6" y1="20" x2="-2" y2="30" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="20" x2="22" y2="16" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
          {/* kneeling legs */}
          <line x1="8" y1="22" x2="4" y2="35" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="22" x2="18" y2="34" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
          {/* tool spark */}
          <circle cx="-2" cy="30" r="4" fill="rgba(251,191,36,0.6)" />
        </g>
        <text x="180" y="248" textAnchor="middle" fill="rgba(184,164,255,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="3">GLITCH BRIDGE — ACTIVE</text>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'The Way Home',
    zone: 'Closing Gate',
    accent: '#2DD4BF',
    body: `The exit portal is found — but it is closing fast. Baymax's battery is critically low. With one last burst of power, Baymax launches Hiro through the gate. Then, in the final second, Hiro reaches back through the closing gate and pulls Baymax's armour with him. This time, nobody gets left behind.`,
    mission: 'ESCAPE BEFORE THE GATE SEALS',
    missionSub: 'Battery critical — make it count',
    tags: ['Escape', 'Sacrifice', 'Home'],
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="p6g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#E5383B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="gateGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#2DD4BF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="280" cy="130" rx="80" ry="100" fill="url(#p6g)" />
        {/* Closing gate — half-shut ellipse */}
        <ellipse cx="280" cy="130" rx="55" ry="90" fill="url(#gateGlow)" stroke="#2DD4BF" strokeWidth="2.5" opacity="0.8" />
        <ellipse cx="280" cy="130" rx="35" ry="70" fill="rgba(255,255,255,0.12)" stroke="#fff" strokeWidth="1" opacity="0.6" />
        {/* Closing panels */}
        <path d="M280 40 Q240 80 240 130 Q240 180 280 220 Q260 180 262 130 Q262 80 280 40 Z" fill="rgba(45,212,191,0.15)" />
        {/* Hiro going through — outstretched arm back */}
        <g transform="translate(235, 88)">
          <circle cx="12" cy="8" r="8" fill="rgba(255,255,255,0.85)" />
          <path d="M8 16 Q12 24 16 16" fill="rgba(255,255,255,0.75)" />
          {/* arm reaching back */}
          <line x1="8" y1="20" x2="-10" y2="18" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
          {/* other arm forward */}
          <line x1="16" y1="20" x2="28" y2="24" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="10" y1="24" x2="6" y2="40" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="24" x2="18" y2="40" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* Baymax being pulled — arm extended */}
        <g transform="translate(140, 90)">
          <ellipse cx="20" cy="16" rx="16" ry="14" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
          <ellipse cx="14" cy="16" rx="4" ry="3" fill="#1a1a2e" />
          <ellipse cx="26" cy="16" rx="4" ry="3" fill="#1a1a2e" />
          {/* smile — happy */}
          <path d="M14 22 Q20 26 26 22" fill="none" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="20" cy="42" rx="26" ry="30" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          {/* arm reaching forward to Hiro */}
          <ellipse cx="52" cy="30" rx="8" ry="18" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" transform="rotate(30,52,30)" />
          <ellipse cx="-12" cy="30" rx="8" ry="18" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" transform="rotate(-15,-12,30)" />
          {/* battery low indicator */}
          <rect x="12" y="56" width="16" height="8" rx="1" fill="none" stroke="rgba(229,56,59,0.7)" strokeWidth="1.2" />
          <rect x="13" y="57" width="4" height="6" rx="0.5" fill="rgba(229,56,59,0.7)" />
        </g>
        {/* Connection line — hand to hand */}
        <line x1="193" y1="118" x2="225" y2="116" stroke="rgba(45,212,191,0.5)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
        <text x="180" y="248" textAnchor="middle" fill="rgba(45,212,191,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="3">EXIT PORTAL — CLOSING</text>
      </svg>
    ),
  },
]

/* ── Threat badge colour ─────────────────────────────────────────── */
const THREAT = {
  Low: { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40' },
  Moderate: { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40' },
  Elevated: { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/40' },
  High: { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-500/40' },
}

/* ════════════════════════════════════════════════════════════════ */
export default function CenterHero({ slide, goNext, goPrev, totalChapters }) {
  const idx = Math.min(Math.max(slide, 0), CHAPTERS.length - 1)
  const chapter = CHAPTERS[idx]
  const [visible, setVisible] = useState(true)
  const [visualMode, setVisualMode] = useState('character')

  const quotes = [
    "Tadashi left this chip to help people. I am not leaving you behind, Baymax!",
    "Zero life signs detected. His empty armor is drifting. I have to reach the chest port.",
    "Hello. I am Baymax. Your personal healthcare companion. Hiro... you came back for me.",
    "Warning: Gravitational physics in this canyon are unstable. Hiro, please hold onto my chassis.",
    "Glitch storm frequency locked. Hiro calculates the trajectory, I provide the shield.",
    "Event horizon closing at maximum rate. Prepare for emergency thruster ignition. We exit together!"
  ]

  const speakQuote = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const text = quotes[idx] || chapter.body
      const utter = new SpeechSynthesisUtterance(text)
      utter.rate = 0.95
      utter.pitch = 1.05
      window.speechSynthesis.speak(utter)
    }
  }

  /* Fade transition on chapter change */
  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(t)
  }, [idx])

  const t = THREAT[chapter.tags[0]] || THREAT.Low

  return (
    <div id="center-hero" className="flex-1 flex flex-col relative overflow-hidden select-none">

      {/* ── NAV ARROWS ─────────────────────────────────────────── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 z-30 pointer-events-none">
        <button
          id="nav-prev"
          onClick={goPrev}
          disabled={idx === 0}
          aria-label="Previous chapter"
          className="pointer-events-auto w-10 h-10 rounded-full border border-white/30 bg-black/25 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 hover:border-white/60 transition-all duration-200 shadow-md disabled:opacity-20 disabled:cursor-not-allowed group"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="group-hover:-translate-x-0.5 transition-transform">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          id="nav-next"
          onClick={goNext}
          disabled={idx === totalChapters - 1}
          aria-label="Next chapter"
          className="pointer-events-auto w-10 h-10 rounded-full border border-white/30 bg-black/25 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 hover:border-white/60 transition-all duration-200 shadow-md disabled:opacity-20 disabled:cursor-not-allowed group"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="group-hover:translate-x-0.5 transition-transform">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>

      {/* ── MODE SWITCHER & AUDIO BUTTON ─────────────────────── */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setVisualMode(v => v === 'character' ? 'scene' : 'character')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 hover:bg-black/60 border border-white/20 text-white font-cond font-bold text-[9.5px] uppercase tracking-wider transition-all"
        >
          {visualMode === 'character' ? (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="6" width="14" height="12" rx="2" />
              <line x1="9" y1="1" x2="9" y2="5" />
              <line x1="15" y1="1" x2="15" y2="5" />
              <circle cx="9" cy="11" r="1" fill="currentColor" />
              <circle cx="15" cy="11" r="1" fill="currentColor" />
            </svg>
          )}
          <span>{visualMode === 'character' ? 'View Scene Art' : 'View Hiro & Baymax'}</span>
        </button>

        <button
          onClick={speakQuote}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-hero/25 hover:bg-red-hero/40 border border-red-hero/50 text-white font-cond font-bold text-[9.5px] uppercase tracking-wider transition-all"
          title="Play Voice Audio"
        >
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <span>Voice Log</span>
        </button>
      </div>

      {/* ── MAIN STAGE ─────────────────────────────────────────── */}
      <div
        className="flex-1 flex flex-col lg:flex-row items-stretch gap-0 overflow-hidden relative"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.18s ease',
        }}
      >
        {/* Visual stage — left/center */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[220px]">
          {/* Subtle accent glow */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${chapter.accent} 0%, transparent 70%)` }}
          />

          {/* Chapter number watermark */}
          <span
            className="absolute font-oswald font-black select-none pointer-events-none text-white/[0.04]"
            style={{
              fontSize: 'clamp(90px, 20vw, 200px)',
              lineHeight: 1,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              letterSpacing: '-0.05em',
            }}
            aria-hidden="true"
          >
            {chapter.num}
          </span>

          {/* Character Render Mode vs Scene Mode */}
          {visualMode === 'character' ? (
            <div className="relative z-10 w-full max-w-[420px] px-4 flex flex-col items-center justify-center">
              <div className="relative max-h-[50vh] sm:max-h-[55vh] flex items-center justify-center group cursor-pointer" onClick={speakQuote}>
                <img
                  src="/hiro-baymax-armor.png"
                  alt="Hiro and Baymax in armor"
                  className="max-h-[48vh] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.45)] group-hover:scale-[1.02] transition-transform duration-300"
                />
                {/* Interactive Pulse Radar over Baymax armor */}
                <div
                  className="absolute top-[28%] right-[22%] w-12 h-12 rounded-full border border-red-hero/60 animate-ping pointer-events-none"
                />
                <div className="absolute bottom-2 bg-black/60 backdrop-blur-sm border border-white/20 px-3 py-1 rounded text-white text-[10px] font-cond font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-hero animate-pulse" />
                  <span>Armor Assembly: Chapter {chapter.num}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10 w-full max-w-[400px] px-4" style={{ height: 'min(300px, 45vh)' }}>
              {chapter.scene}
            </div>
          )}
        </div>

        {/* Story text panel — right side */}
        <div
          className="flex flex-col justify-between px-6 py-6 lg:w-[350px] xl:w-[400px] flex-shrink-0 border-t lg:border-t-0 lg:border-l border-white/15"
          style={{ background: 'rgba(18, 30, 44, 0.72)', backdropFilter: 'blur(12px)' }}
        >
          {/* Top meta */}
          <div className="flex flex-col gap-4">
            {/* Zone + chapter counter */}
            <div className="flex items-center justify-between">
              <span
                className="font-cond text-[9.5px] font-bold uppercase tracking-[0.3em] px-2.5 py-1 border rounded-[2px]"
                style={{ color: chapter.accent, borderColor: `${chapter.accent}55`, background: `${chapter.accent}15` }}
              >
                {chapter.zone}
              </span>
              <span className="font-oswald text-xs text-white/50 tracking-wider tabular-nums font-bold">
                {String(idx + 1).padStart(2, '0')} / {String(totalChapters).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <div>
              <p className="font-cond text-[9.5px] font-bold uppercase tracking-[0.28em] text-red-hero mb-1">
                Chapter {chapter.num} · Beyond The Portal
              </p>
              <h2
                className="font-oswald font-black uppercase leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.5rem)', color: '#fff' }}
              >
                {chapter.title}
              </h2>
            </div>

            {/* Body */}
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/85 tracking-normal">
              {chapter.body}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {chapter.tags.map(tag => (
                <span
                  key={tag}
                  className="font-cond text-[8.5px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-[2px] border border-white/20 text-white/70 bg-black/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Mission card */}
          <div
            className="mt-4 border rounded-[3px] p-3.5 flex flex-col gap-1 shadow-sm"
            style={{ borderColor: `${chapter.accent}70`, background: `${chapter.accent}15` }}
          >
            <div className="flex items-center justify-between">
              <p className="font-cond text-[8px] font-bold uppercase tracking-[0.28em] text-white/60">
                Mission Objective
              </p>
              <span className="w-2 h-2 rounded-full" style={{ background: chapter.accent }} />
            </div>
            <p
              className="font-oswald font-bold text-sm uppercase tracking-[0.1em]"
              style={{ color: chapter.accent }}
            >
              {chapter.mission}
            </p>
            <p className="font-cond text-[9.5px] text-white/75 tracking-wider">
              {chapter.missionSub}
            </p>
          </div>
        </div>
      </div>

      {/* ── CHAPTER PROGRESS BAR (bottom) ────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/10 pointer-events-none">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${((idx + 1) / totalChapters) * 100}%`,
            background: `linear-gradient(90deg, #d62027 0%, ${chapter.accent} 70%, #ffffff 100%)`,
          }}
        />
      </div>
    </div>
  )
}

