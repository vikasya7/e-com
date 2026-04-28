/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import ProductSection from "./ProductSection";
import api from "../utils/api";
import TrustSection from "./TrustSection";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const MESSAGES = [
  "Makhana time! 🌾", "So crunchy! 😋", "Squrll Bites! 🐿️",
  "No preservatives! 🚫", "Catch me! 😜", "Roasted not fried! 🔥",
  "So yummy! 😍", "100% natural! 🌿", "Want some? 🥜",
];
const MAKHANA_SIZES    = [10, 14, 18, 22, 28, 34];
const MAKHANA_DURATION = [4, 5, 6, 7, 8];
const STAR_EMOJIS      = ["✨", "⭐", "🌟", "💫", "🌾"];

// ─────────────────────────────────────────────
// Floating 3-D Makhana Particle
// ─────────────────────────────────────────────
function MakhanaParticle({ left, bottom, size, duration, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none rounded-full"
      style={{
        left, bottom, width: size, height: size,
        background: "radial-gradient(circle at 35% 30%,#fff8ee,#f5d891 48%,#c9933a 78%,#8a4f12)",
        boxShadow:
          "inset -2px -2px 5px rgba(0,0,0,.18),inset 2px 2px 4px rgba(255,255,220,.5),0 4px 12px rgba(196,138,58,.3)",
      }}
      initial={{ opacity: 0, y: 0, scale: 0.5, rotate: 0 }}
      animate={{ opacity: [0,1,1,0], y: [0,-180,-360,-520], scale: [0.5,1,0.9,0.4], rotate: [0,120,240,360] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─────────────────────────────────────────────
// Orbiting Ring
// ─────────────────────────────────────────────
function OrbitRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360;
        const rx = 120, ry = 45;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 16, height: 16,
              background: "radial-gradient(circle at 35% 30%,#fff8ee,#f5d891 48%,#c9933a 80%)",
              boxShadow: "0 2px 8px rgba(196,138,58,.35)",
            }}
            animate={{
              x: [0,1,2,3,4].map(s => Math.cos(((angle + s*90)*Math.PI)/180)*rx),
              y: [0,1,2,3,4].map(s => Math.sin(((angle + s*90)*Math.PI)/180)*ry),
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// Speech Bubble
// ─────────────────────────────────────────────
function SpeechBubble({ msg, visible, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 6 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7, y: visible ? 0 : 6 }}
      transition={{ duration: 0.25 }}
      className="absolute pointer-events-none z-40 bg-white border-2 border-[#C48A3A] rounded-2xl px-3 py-2 text-sm font-bold text-[#6B3E26] whitespace-nowrap shadow-lg"
      style={{ ...style, bottom: 178 }}
    >
      {msg}
      <span
        className="absolute -bottom-2.5 left-4 w-0 h-0"
        style={{
          borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
          borderTop: "10px solid #C48A3A",
        }}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Sparkle burst
// ─────────────────────────────────────────────
function Sparkle({ x, y, id, onDone }) {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-lg select-none"
          style={{ left: x + Math.random()*60-30, top: y + Math.random()*40-20 }}
          initial={{ opacity: 1, scale: 0, rotate: 0 }}
          animate={{ opacity: 0, scale: [0,1.4,0], rotate: 360, y: -30 }}
          transition={{ duration: 0.65, delay: i*0.06 }}
          onAnimationComplete={i === 5 ? onDone : undefined}
        >
          {STAR_EMOJIS[Math.floor(Math.random()*STAR_EMOJIS.length)]}
        </motion.div>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────
// Paw print
// ─────────────────────────────────────────────
function PawPrint({ x, flipped, onDone }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-xs"
      style={{ left: x, bottom: 52, transform: flipped ? "scaleX(-1)" : "scaleX(1)" }}
      initial={{ opacity: 0.8, scale: 1 }}
      animate={{ opacity: 0, scale: 0.6, y: 8 }}
      transition={{ duration: 1.2 }}
      onAnimationComplete={onDone}
    >
      🐾
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Squrll SVG — receives animation class names
// ─────────────────────────────────────────────
function SqurllSVG({ mode, sleeping }) {
  // animation styles per part per mode
  const anims = {
    run: {
      tail:  "tailWag .3s ease-in-out infinite",
      body:  "bodyBounce .22s ease-in-out infinite",
      legL:  "legL .22s ease-in-out infinite",
      legR:  "legR .22s ease-in-out infinite .11s",
      armL:  "armSwing .22s ease-in-out infinite",
      armR:  "armSwing .22s ease-in-out infinite .11s",
      head:  "headBob .22s ease-in-out infinite",
      eye:   "eyeBlink 3s ease-in-out infinite",
    },
    dance: {
      tail:  "tailWag .25s ease-in-out infinite",
      body:  "danceBody .5s ease-in-out infinite",
      legL:  "danceLeg .5s ease-in-out infinite",
      legR:  "danceLeg .5s ease-in-out infinite .25s",
      armL:  "danceArm .5s ease-in-out infinite",
      armR:  "danceArm .5s ease-in-out infinite .25s",
      head:  "headBob .5s ease-in-out infinite",
      eye:   "eyeBlink 2s ease-in-out infinite",
    },
    sniff: {
      tail:  "idleTailSway .8s ease-in-out infinite",
      body:  "sniffAnim 1.2s ease-in-out infinite",
      legL:  "none",
      legR:  "none",
      armL:  "none",
      armR:  "none",
      head:  "sniffAnim 1.2s ease-in-out infinite .3s",
      eye:   "eyeBlink 5s ease-in-out infinite",
    },
    sleep: {
      tail:  "idleTailSway 3s ease-in-out infinite",
      body:  "idleFloat 3s ease-in-out infinite",
      legL:  "none", legR: "none", armL: "none", armR: "none",
      head:  "none",
      eye:   "none",
    },
    idle: {
      tail:  "idleTailSway 1.2s ease-in-out infinite",
      body:  "idleFloat 2s ease-in-out infinite",
      legL:  "none", legR: "none",
      armL:  "nibbleAnim 1.5s ease-in-out infinite",
      armR:  "nibbleAnim 1.5s ease-in-out infinite .3s",
      head:  "lookAnim 2s ease-in-out infinite",
      eye:   "eyeBlink 4s ease-in-out infinite",
    },
  };
  const a = anims[mode] || anims.run;

  return (
    <>
      <style>{`
        @keyframes tailWag       { 0%,100%{transform:rotate(-12deg)} 50%{transform:rotate(18deg)} }
        @keyframes bodyBounce    { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-5px) rotate(3deg)} }
        @keyframes legL          { 0%,100%{transform:rotate(-25deg)} 50%{transform:rotate(25deg)} }
        @keyframes legR          { 0%,100%{transform:rotate(25deg)}  50%{transform:rotate(-25deg)} }
        @keyframes armSwing      { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
        @keyframes headBob       { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-4px)} }
        @keyframes eyeBlink      { 0%,92%,100%{transform:scaleY(1)}  96%{transform:scaleY(0.08)} }
        @keyframes danceBody     { 0%,100%{transform:rotate(-8deg) translateY(0)} 25%{transform:rotate(8deg) translateY(-6px)} 50%{transform:rotate(-8deg) translateY(0)} 75%{transform:rotate(8deg) translateY(-6px)} }
        @keyframes danceArm      { 0%,100%{transform:rotate(-40deg)} 50%{transform:rotate(40deg)} }
        @keyframes danceLeg      { 0%,100%{transform:rotate(-30deg)} 50%{transform:rotate(30deg)} }
        @keyframes sniffAnim     { 0%,100%{transform:translateY(0) rotate(0)} 30%{transform:translateY(4px) rotate(8deg)} 60%{transform:translateY(-2px) rotate(-4deg)} }
        @keyframes idleFloat     { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-8px)} }
        @keyframes idleTailSway  { 0%,100%{transform:rotate(-8deg)}  50%{transform:rotate(8deg)} }
        @keyframes nibbleAnim    { 0%,100%{transform:translateY(0)}  30%,70%{transform:translateY(-3px)} }
        @keyframes lookAnim      { 0%,100%{transform:translateX(0)}  50%{transform:translateX(4px)} }
        @keyframes zzzFloat      { 0%,100%{transform:translateY(0) scale(1);opacity:1} 50%{transform:translateY(-10px) scale(1.1);opacity:.6} }
      `}</style>

      <svg viewBox="0 0 130 165" xmlns="http://www.w3.org/2000/svg" width="130" height="165">
        {/* Shadow */}
        <ellipse cx="65" cy="158" rx={mode==="sleep"?32:26} ry="5" fill="rgba(0,0,0,0.12)" />

        {/* Tail */}
        <g style={{ transformOrigin:"30px 110px", animation: a.tail }}>
          <ellipse cx="95" cy="105" rx="30" ry="42" fill="#C68B3A"/>
          <ellipse cx="95" cy="100" rx="21" ry="30" fill="#E8A84E"/>
          <ellipse cx="95" cy="95"  rx="13" ry="20" fill="#F5C877"/>
        </g>

        {/* Body */}
        <g style={{ transformOrigin:"65px 155px", animation: a.body }}>
          <ellipse cx="58" cy="108" rx="27" ry="32" fill="#A0622A"/>
          <ellipse cx="58" cy="112" rx="19" ry="24" fill="#C68B3A"/>
          <ellipse cx="57" cy="116" rx="12" ry="17" fill="#F2D4A4"/>
        </g>

        {/* Legs */}
        <g style={{ transformOrigin:"48px 128px", animation: a.legL }}>
          <rect x="42" y="128" width="13" height="22" rx="6" fill="#8B4F1E"/>
          <ellipse cx="48" cy="152" rx="10" ry="6" fill="#6B3A12"/>
        </g>
        <g style={{ transformOrigin:"68px 128px", animation: a.legR }}>
          <rect x="62" y="128" width="13" height="22" rx="6" fill="#8B4F1E"/>
          <ellipse cx="68" cy="152" rx="10" ry="6" fill="#6B3A12"/>
        </g>

        {/* Arms */}
        <g style={{ transformOrigin:"40px 105px", animation: a.armL }}>
          <path d="M36 108 Q18 95 22 80" stroke="#A0622A" strokeWidth="7" fill="none" strokeLinecap="round"/>
          <circle cx="22" cy="75" r="9" fill="url(#mkHand)"/>
        </g>
        <g style={{ transformOrigin:"76px 105px", animation: a.armR }}>
          <path d="M78 108 Q94 95 90 80" stroke="#A0622A" strokeWidth="7" fill="none" strokeLinecap="round"/>
          <circle cx="90" cy="75" r="9" fill="url(#mkHand)"/>
        </g>

        {/* Head */}
        <g style={{ transformOrigin:"60px 80px", animation: a.head }}>
          <ellipse cx="60" cy="68" rx="25" ry="23" fill="#A0622A"/>
          <ellipse cx="60" cy="65" rx="21" ry="19" fill="#C68B3A"/>
          {/* Ears */}
          <ellipse cx="43" cy="50" rx="10" ry="14" fill="#A0622A" transform="rotate(-18,43,50)"/>
          <ellipse cx="45" cy="49" rx="5.5" ry="9"  fill="#E8A84E" transform="rotate(-18,45,49)"/>
          <ellipse cx="77" cy="50" rx="10" ry="14" fill="#A0622A" transform="rotate(18,77,50)"/>
          <ellipse cx="75" cy="49" rx="5.5" ry="9"  fill="#E8A84E" transform="rotate(18,75,49)"/>
          {/* Eyes */}
          <g style={{ transformOrigin:"51px 65px", animation: a.eye }}>
            <circle cx="51" cy="65" r="5.5" fill="#1e1008"/>
            <circle cx="52.5" cy="63" r="2" fill={sleeping ? "none" : "white"}/>
            {sleeping && <line x1="46" y1="65" x2="56" y2="65" stroke="#1e1008" strokeWidth="3" strokeLinecap="round"/>}
          </g>
          <g style={{ transformOrigin:"69px 65px", animation: a.eye }}>
            <circle cx="69" cy="65" r="5.5" fill="#1e1008"/>
            <circle cx="70.5" cy="63" r="2" fill={sleeping ? "none" : "white"}/>
            {sleeping && <line x1="64" y1="65" x2="74" y2="65" stroke="#1e1008" strokeWidth="3" strokeLinecap="round"/>}
          </g>
          {/* Nose + smile */}
          <ellipse cx="60" cy="74" rx="4" ry="3" fill="#7A3A10"/>
          <path d="M56 78 Q60 83 64 78" stroke="#7A3A10" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Cheeks */}
          <ellipse cx="45" cy="72" rx="7" ry="5.5" fill="#E8A84E" opacity=".65"/>
          <ellipse cx="75" cy="72" rx="7" ry="5.5" fill="#E8A84E" opacity=".65"/>
        </g>

        {/* Zzz */}
        {sleeping && (
          <>
            <text x="88" y="55" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#7B9FD4" style={{animation:"zzzFloat 1.5s ease-in-out infinite"}}>z</text>
            <text x="96" y="43" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#7B9FD4" style={{animation:"zzzFloat 1.5s ease-in-out infinite .3s"}}>z</text>
            <text x="106" y="28" fontFamily="sans-serif" fontSize="18" fontWeight="700" fill="#7B9FD4" style={{animation:"zzzFloat 1.5s ease-in-out infinite .6s"}}>Z</text>
          </>
        )}

        <defs>
          <radialGradient id="mkHand" cx="35%" cy="30%">
            <stop offset="0%"   stopColor="#fff8ee"/>
            <stop offset="45%"  stopColor="#f5d891"/>
            <stop offset="100%" stopColor="#c9933a"/>
          </radialGradient>
        </defs>
      </svg>
    </>
  );
}

// ─────────────────────────────────────────────
// Mode Button
// ─────────────────────────────────────────────
function ModeBtn({ label, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-bold border transition
        ${active
          ? "bg-[#C48A3A] border-[#C48A3A] text-white shadow-md"
          : "bg-white/80 border-[#C48A3A] text-[#6B3E26] hover:bg-[#C48A3A] hover:text-white"}`}
    >
      {label}
    </motion.button>
  );
}

// ─────────────────────────────────────────────
// Product Chip
// ─────────────────────────────────────────────
function ProductChip({ name, emoji, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.07, y: -3 }}
      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#e8c98a] px-4 py-2 rounded-full shadow-md cursor-default"
    >
      <span className="text-xl">{emoji}</span>
      <span className="text-sm font-semibold text-[#6B3E26]">{name}</span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Hero
// ─────────────────────────────────────────────
function Hero() {
  const [products, setProducts]   = useState([]);
  const [sqMode, setSqMode]       = useState("run");   // run | dance | sniff | sleep
  const [sqX, setSqX]             = useState(-160);
  const [sqDir, setSqDir]         = useState(1);
  const [bubble, setBubble]       = useState({ visible: false, msg: "" });
  const [sparkles, setSparkles]   = useState([]);
  const [paws, setPaws]           = useState([]);
  const [cursor, setCursor]       = useState({ x: -100, y: -100 });
  const [jumping, setJumping]     = useState(false);

  const sectionRef  = useRef(null);
  const rafRef      = useRef(null);
  const sqXRef      = useRef(-160);
  const sqDirRef    = useRef(1);
  const modeRef     = useRef("run");
  const lastPawXRef = useRef(0);
  const bubbleTimer = useRef(null);
  const sparkleId   = useRef(0);
  const pawId       = useRef(0);

  const sceneWidth = useCallback(
    () => sectionRef.current?.offsetWidth || 1200,
    []
  );

  const showBubble = useCallback((msg) => {
    setBubble({ visible: true, msg });
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() =>
      setBubble(b => ({ ...b, visible: false })), 2200
    );
  }, []);

  const addSparkle = useCallback((x, y) => {
    const id = sparkleId.current++;
    setSparkles(s => [...s, { id, x, y }]);
  }, []);

  const removeSparkle = useCallback((id) =>
    setSparkles(s => s.filter(sp => sp.id !== id)), []);

  const addPaw = useCallback((x, flipped) => {
    const id = pawId.current++;
    setPaws(p => [...p, { id, x, flipped }]);
  }, []);

  const removePaw = useCallback((id) =>
    setPaws(p => p.filter(pw => pw.id !== id)), []);

  // Run loop
  const runLoop = useCallback(() => {
    if (modeRef.current !== "run") return;
    const speed = 2.8;
    sqXRef.current += sqDirRef.current * speed;
    setSqX(sqXRef.current);

    if (Math.abs(sqXRef.current - lastPawXRef.current) > 44) {
      addPaw(sqXRef.current + 10, sqDirRef.current === -1);
      lastPawXRef.current = sqXRef.current;
    }

    const W = sceneWidth();
    if (sqDirRef.current === 1 && sqXRef.current > W + 20) {
      sqDirRef.current = -1;
      setSqDir(-1);
      showBubble(MESSAGES[Math.floor(Math.random()*MESSAGES.length)]);
    }
    if (sqDirRef.current === -1 && sqXRef.current < -160) {
      sqDirRef.current = 1;
      setSqDir(1);
      showBubble(MESSAGES[Math.floor(Math.random()*MESSAGES.length)]);
    }

    rafRef.current = requestAnimationFrame(runLoop);
  }, [addPaw, sceneWidth, showBubble]);

  const startRun = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(runLoop);
  }, [runLoop]);

  // Mode change
  const setMode = useCallback((m) => {
    modeRef.current = m;
    setSqMode(m);
    cancelAnimationFrame(rafRef.current);

    if (m === "run") {
      startRun();
    } else {
      // centre the squirrel
      const cx = sceneWidth() / 2 - 65;
      sqXRef.current = cx;
      setSqX(cx);
      if (m === "dance") {
        showBubble("I love Squrll Bites! 💃");
        for (let i = 0; i < 8; i++)
          setTimeout(() => addSparkle(cx + 40, 260), i * 130);
      }
      if (m === "sniff")  showBubble("I can smell the makhana… 👃");
      if (m === "sleep")  showBubble("Zzz… dreaming of makhana 😴");
    }
  }, [addSparkle, sceneWidth, showBubble, startRun]);

  // Squirrel click
  const handleSqClick = useCallback((e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    addSparkle(sqXRef.current + 30, e.clientY - rect.top);
    showBubble(MESSAGES[Math.floor(Math.random()*MESSAGES.length)]);
    if (modeRef.current === "run" && !jumping) {
      setJumping(true);
      setTimeout(() => setJumping(false), 650);
    }
  }, [addSparkle, jumping, showBubble]);

  // Makhana cursor
  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) setCursor({ x: e.clientX - rect.left - 9, y: e.clientY - rect.top - 9 });
  }, []);

  useEffect(() => {
    api.get("/api/v1/products")
      .then(res => setProducts(res.data.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    startRun();
    return () => cancelAnimationFrame(rafRef.current);
  }, [startRun]);

  // Makhana particles config
  const particles = Array.from({ length: 28 }).map((_, i) => ({
    left:     `${(i * 3.7) % 96}%`,
    bottom:   `-${10 + (i%4)*8}px`,
    size:     MAKHANA_SIZES[i % 6],
    duration: MAKHANA_DURATION[i % 5],
    delay:    (i * 0.35) % 8,
  }));

  // Squirrel bottom position — lower when sleeping
  const sqBottom = sqMode === "sleep" ? 46 : 56;

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={sectionRef}
        className="relative w-full bg-[#FFF7EC] overflow-hidden min-h-[90vh]"
        style={{ cursor: "none" }}
        onMouseMove={handleMouseMove}
      >
        {/* Ambient blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FFD8A8] rounded-full blur-3xl opacity-35 animate-pulse"/>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FFE8CC] rounded-full blur-3xl opacity-35 animate-pulse"/>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#FFC87A] rounded-full blur-3xl opacity-15"/>

        {/* 28 floating makhanas */}
        {particles.map((p, i) => <MakhanaParticle key={i} {...p}/>)}

        {/* Paw prints */}
        {paws.map(p => (
          <PawPrint key={p.id} x={p.x} flipped={p.flipped} onDone={() => removePaw(p.id)}/>
        ))}

        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none z-50">
          {sparkles.map(s => (
            <Sparkle key={s.id} x={s.x} y={s.y} onDone={() => removeSparkle(s.id)}/>
          ))}
        </div>

        {/* Speech bubble */}
        <SpeechBubble
          msg={bubble.msg}
          visible={bubble.visible}
          style={{ left: Math.max(4, Math.min(sqXRef.current + 10, sceneWidth() - 200)) }}
        />

        {/* Ground line */}
        <div className="absolute bottom-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8c98a]/50 to-transparent"/>

        {/* ── Running Squirrel ── */}
        <motion.div
          className="absolute pointer-events-auto select-none z-30 cursor-pointer"
          style={{
            left: sqX,
            bottom: sqBottom,
            width: 130,
            scaleX: sqDir,
            transformOrigin: "center",
          }}
          animate={jumping ? { y: [0, -90, 0] } : {}}
          transition={jumping ? { duration: 0.6, ease: "easeOut" } : {}}
          onClick={handleSqClick}
        >
          <SqurllSVG mode={sqMode} sleeping={sqMode === "sleep"}/>
        </motion.div>

        {/* Mode controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          <ModeBtn label="🏃 Run"    active={sqMode==="run"}   onClick={() => setMode("run")}/>
          <ModeBtn label="💃 Dance"  active={sqMode==="dance"} onClick={() => setMode("dance")}/>
          <ModeBtn label="👃 Sniff"  active={sqMode==="sniff"} onClick={() => setMode("sniff")}/>
          <ModeBtn label="😴 Sleep"  active={sqMode==="sleep"} onClick={() => setMode("sleep")}/>
        </div>

        {/* Makhana cursor */}
        <div
          className="absolute pointer-events-none z-50 rounded-full"
          style={{
            left: cursor.x, top: cursor.y, width: 18, height: 18,
            background: "radial-gradient(circle at 35% 30%,#fff8ee,#f5d891 48%,#c9933a 78%,#8a4f12)",
            boxShadow: "inset -1px -1px 3px rgba(0,0,0,.18)",
          }}
        />

        {/* Main grid */}
        <div
          className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 items-center gap-12"
          style={{ perspective: 800 }}
        >
          {/* ── Left content ── */}
          <div className="space-y-7 z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#C48A3A]/10 border border-[#C48A3A]/30 px-4 py-1.5 rounded-full"
            >
              <span className="text-sm font-bold text-[#C48A3A] tracking-widest uppercase">Squrll Bites</span>
              <span className="text-base">🐿️</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold text-[#6B3E26] leading-tight"
            >
              Har Break Ka{" "}
              <motion.span
                className="text-[#C48A3A] font-['Pacifico'] inline-block"
                animate={{ y: [0,-6,0], rotate: [0,-2,0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                Bite
              </motion.span>
            </motion.h1>

            <motion.svg viewBox="0 0 200 20" className="w-40"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }}>
              <motion.path d="M5 15 Q 100 5 195 15" stroke="#C48A3A" strokeWidth="4" fill="transparent" strokeLinecap="round"/>
            </motion.svg>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-lg text-gray-700 max-w-lg">
              Premium roasted makhana, irresistible namkeen &amp; crunchy peanuts
              — guilt-free snacking crafted for every craving.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3">
              <ProductChip name="Classic Makhana Chiwda" emoji="🌾" delay={0.6}/>
              <ProductChip name="Squrll Namkeen"         emoji="🧂" delay={0.75}/>
              <ProductChip name="Crunch Peanuts"         emoji="🥜" delay={0.9}/>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex gap-4 pt-2">
              <motion.a whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} href="#products"
                className="relative bg-[#C48A3A] px-8 py-4 rounded-full text-white font-semibold overflow-hidden shadow-lg">
                Get Your Bite →
                <motion.span className="absolute inset-0 bg-[#C48A3A] rounded-full -z-10"
                  animate={{ scale: [1,1.18,1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ filter: "blur(18px)", opacity: 0.4 }}/>
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#products"
                className="px-8 py-4 rounded-full border border-[#6B3E26] text-[#6B3E26] font-semibold hover:bg-[#6B3E26] hover:text-white transition">
                Explore Flavors
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="flex gap-3 flex-wrap text-sm text-[#6B3E26] font-medium pt-1">
              <span className="bg-[#F3E5D3] px-3 py-1 rounded-full">🌿 100% Natural</span>
              <span className="bg-[#F3E5D3] px-3 py-1 rounded-full">🔥 Roasted Not Fried</span>
              <span className="bg-[#F3E5D3] px-3 py-1 rounded-full">🚫 No Preservatives</span>
            </motion.div>
          </div>

          {/* ── Right image ── */}
          <div className="flex justify-center md:justify-end relative" style={{ perspective: 600 }}>
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <OrbitRing/>
            </div>
            <div className="absolute w-[380px] h-[380px] rounded-full bg-[#FFD8A8]/40 blur-2xl"/>
            <motion.div className="relative z-10"
              animate={{ y: [0,-14,0], rotateY: [0,4,-4,0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}>
              <img src="/hero/hero2.png" alt="Squrll Bites Makhana"
                className="w-[380px] md:w-[460px] rounded-3xl"
                style={{ filter: "drop-shadow(0 30px 60px rgba(196,138,58,.3))" }}/>
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,.18) 0%,transparent 60%)" }}/>
            </motion.div>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
              whileHover={{ rotate: 0, scale: 1.1 }}
              className="absolute -top-4 -right-4 z-20 bg-[#C48A3A] text-white px-5 py-3 rounded-full font-semibold shadow-xl rotate-6 text-sm">
              Bestseller ⭐
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -right-6 bottom-24 z-20 bg-white rounded-2xl shadow-xl p-3 text-center border border-[#f0d9b5]">
              <p className="text-2xl font-extrabold text-[#C48A3A]">10K+</p>
              <p className="text-xs text-gray-500 font-medium">Happy Snackers</p>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#C48A3A] opacity-60"
          animate={{ y: [0,8,0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5"/>
            <motion.rect x="6.5" y="5" width="3" height="6" rx="1.5" fill="currentColor"
              animate={{ y: [0,8,0] }} transition={{ duration: 1.5, repeat: Infinity }}/>
          </svg>
        </motion.div>
      </section>

      <ProductSection title="Shop Our Range" products={products}/>
      <TrustSection/>
    </>
  );
}

export default Hero;
