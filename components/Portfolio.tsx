"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as any } },
};
const stagger: Variants = { show: { transition: { staggerChildren: 0.13 } } };


function Typewriter({ words }: { words: string[] }) {
  const [idx,       setIdx]       = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const [charIdx,   setCharIdx]   = useState(0);

  useEffect(() => {
    const word  = words[idx];
    const speed = deleting ? 38 : 82;
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplayed(word.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
        if (charIdx + 1 === word.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setDisplayed(word.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
        if (charIdx - 1 === 0) { setDeleting(false); setIdx(i => (i + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, words]);

  return (
    <span style={{ color: "#a78bfa" }}>
      {displayed}<span className="animate-pulse">|</span>
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Academics", "Skills", "Projects", "Achievements", "Teamwork", "Hobbies", "Contact"];

  return (
    <nav
      className="fixed w-full top-0 z-50 px-6 md:px-14 py-4 flex justify-between items-center transition-all duration-500"
      style={{
        background:     scrolled ? "rgba(10,10,15,0.78)" : "transparent",
        borderBottom:   scrolled ? "1px solid rgba(124,58,237,0.2)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
      }}
    >
      <motion.span
        initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
        className="text-xl md:text-2xl font-extrabold tracking-tight"
        style={{ fontFamily: "'Space Mono',monospace", color: "#a78bfa" }}
      >
        Shraddha Maku<span style={{ color: "#fff" }}></span>
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
        className="hidden md:flex gap-8 text-sm"
        style={{ color: "#9ca3af" }}
      >
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            className="relative group transition-colors duration-200 hover:text-violet-400"
          >
            {l}
            <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
              style={{ background: "#7c3aed" }} />
          </a>
        ))}
      </motion.div>

      <a
        href="mailto:shraddhamaku@gmail.com"
        className="hidden md:inline-flex px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:text-white"
        style={{ border: "1px solid rgba(124,58,237,0.45)", color: "#a78bfa", background: "rgba(124,58,237,0.08)" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7c3aed"; el.style.boxShadow = "0 0 24px rgba(124,58,237,0.5)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(124,58,237,0.08)"; el.style.boxShadow = "none"; }}
      >
        Hire Me ✦
      </a>

      <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300 text-xl">
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full flex flex-col items-center gap-5 py-7 text-sm text-gray-400"
          style={{ background: "rgba(10,10,15,0.97)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href="mailto:shraddhamaku@gmail.com" style={{ color: "#a78bfa" }}>Hire Me ✦</a>
        </div>
      )}
    </nav>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{
        opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(167,139,250,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,0.6) 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full blur-3xl"
        style={{ background: "rgba(124,58,237,0.07)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl"
        style={{ background: "rgba(167,139,250,0.04)" }} />
    </div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val,     setVal]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let f = 0;
    const total = 60;
    const t = setInterval(() => { f++; setVal(Math.round(to * f / total)); if (f >= total) clearInterval(t); }, 18);
    return () => clearInterval(t);
  }, [started, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function SkillBar({ label, pct }: { label: string; pct: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between text-sm mb-1.5" style={{ color: "#9ca3af" }}>
        <span>{label}</span>
        <span style={{ color: "#a78bfa" }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: animated ? `${pct}%` : "0%", background: "linear-gradient(90deg,#7c3aed,#a78bfa)" }} />
      </div>
    </div>
  );
}

function ProjectCard({ title, description, points, tag }: { title: string; description: string; points: string[]; tag: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
      className="p-7 rounded-2xl transition-all duration-300"
      style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(124,58,237,0.4)"; el.style.boxShadow = "0 0 40px rgba(124,58,237,0.08)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(255,255,255,0.05)"; el.style.boxShadow = "none"; }}
    >
      <span className="text-xs rounded-full px-3 py-0.5 mb-4 inline-block"
        style={{ border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa" }}>{tag}</span>
      <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#6b7280" }}>{description}</p>
      <ul className="space-y-1.5">
        {points.map((p, i) => (
          <li key={i} className="text-sm flex items-start gap-2" style={{ color: "#9ca3af" }}>
            <span style={{ color: "#7c3aed", marginTop: 2 }}>▹</span>{p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function AchCard({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }} viewport={{ once: true }}
      className="p-7 rounded-2xl transition-all duration-300"
      style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(124,58,237,0.4)"; el.style.boxShadow = "0 0 28px rgba(124,58,237,0.08)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(255,255,255,0.05)"; el.style.boxShadow = "none"; }}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2" style={{ color: "#a78bfa" }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{desc}</p>
    </motion.div>
  );
}

export default function Page() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main style={{ background: "#0a0a0f", color: "#fff", fontFamily: "'DM Sans',sans-serif" }} className="overflow-x-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .auto-scroll { animation: scroll-left 30s linear infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        .float-anim         { animation: float 4s ease-in-out infinite; }
        .float-anim-delay-1 { animation: float 5s ease-in-out 0.8s infinite; }
        .float-anim-delay-2 { animation: float 5s ease-in-out 1.6s infinite; }
        .float-anim-delay-3 { animation: float 6s ease-in-out 1.0s infinite; }

        @keyframes spin-ring {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .spin-ring { animation: spin-ring 12s linear infinite; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1; }
        }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[100]"
        style={{ scaleX, background: "linear-gradient(90deg,#7c3aed,#a78bfa)" }}
      />

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 pt-28 pb-16"
        style={{ background: "#0a0a0f" }}>
        <GridBg />
        <div className="relative z-10 w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          {/* Left – text */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
              style={{ border: "1px solid rgba(124,58,237,0.4)", background: "rgba(124,58,237,0.08)", color: "#a78bfa" }}>
              <span className="w-2 h-2 rounded-full pulse-glow" style={{ background: "#a78bfa" }} />
              Available for Opportunities
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-4xl md:text-[3.4rem] lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight mb-5">
              Hi, I&apos;m{" "}
              <span className="block" style={{
                fontFamily: "'Space Mono',monospace",
                background: "linear-gradient(135deg,#7c3aed 0%,#a78bfa 50%,#c4b5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Shraddha Maku
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl mb-5" style={{ color: "#9ca3af" }}>
              Designing intelligent systems for{" "}
              <Typewriter words={["Real-World Scale.", "AI Applications.", "Innovative Solutions.", "Modern Tech."]} />
            </motion.p>

            <motion.p variants={fadeUp} className="text-base leading-relaxed max-w-lg mb-4" style={{ color: "#6b7280" }}>
              Final-year Computer Science student passionate about scalable software, AI-driven applications, and modern technologies. Actively seeking entry-level software development opportunities.
            </motion.p>

            <motion.p variants={fadeUp} className="text-xs mb-6" style={{ color: "#4b5563" }}>Find me on</motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a href="#projects"
                className="px-7 py-3 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.55)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}>
                View My Work
              </a>
              <a href="#contact"
                className="px-7 py-3 rounded-full text-sm transition-all duration-300"
                style={{ border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(124,58,237,0.12)"; el.style.boxShadow = "0 0 20px rgba(124,58,237,0.2)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.boxShadow = "none"; }}>
                Get In Touch
              </a>
              <a href="https://github.com/MakuShraddha" target="_blank" rel="noreferrer"
                className="px-7 py-3 rounded-full text-sm transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(124,58,237,0.4)"; el.style.color = "#a78bfa"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.color = "#9ca3af"; }}>
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/shraddhamaku/" target="_blank" rel="noreferrer"
                className="px-7 py-3 rounded-full text-sm transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(124,58,237,0.4)"; el.style.color = "#a78bfa"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.color = "#9ca3af"; }}>
                LinkedIn ↗
              </a>
            </motion.div>
          </motion.div>

          {/* Right – circular profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center"
          >
            <div className="relative float-anim" style={{ width: 300, height: 300 }}>

              {/* Spinning dashed ring */}
              <div className="spin-ring absolute pointer-events-none" style={{
                inset: "-22px", border: "2px dashed rgba(124,58,237,0.3)", borderRadius: "50%",
              }} />

              {/* Ambient glow */}
              <div className="pulse-glow absolute pointer-events-none" style={{
                inset: "-32px",
                background: "radial-gradient(circle,rgba(124,58,237,0.28) 0%,transparent 70%)",
                filter: "blur(12px)", borderRadius: "50%",
              }} />

              {/* Gradient border ring */}
              <div className="absolute pointer-events-none" style={{
                inset: "-4px",
                background: "linear-gradient(135deg,#7c3aed,#a78bfa,#c4b5fd,#7c3aed)",
                borderRadius: "50%", padding: "3px",
              }} />

              {/* Dark gap ring */}
              <div className="absolute pointer-events-none" style={{
                inset: "-1px", background: "#0a0a0f", borderRadius: "50%",
              }} />

              {/* Profile image */}
              <div className="relative overflow-hidden" style={{
                width: 300, height: 300, borderRadius: "50%",
                background: "linear-gradient(135deg,#1a0a2e,#0f0f1a)",
              }}>
                <Image
                  src="/profile.jpeg"
                  alt="Shraddha Maku"
                  fill
                  priority
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none"
                  style={{ background: "linear-gradient(to top,rgba(10,10,15,0.25),transparent)" }} />
              </div>

              {/* Badge top-right */}
              <div className="float-anim-delay-1 absolute px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{
                  top: "-18px", right: "-60px",
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.45)",
                  color: "#c4b5fd", backdropFilter: "blur(12px)", whiteSpace: "nowrap",
                }}>
                🏆 AIR 566 · NCAT 2025
              </div>

              {/* Badge bottom-left */}
              <div className="float-anim-delay-2 absolute px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{
                  bottom: "-18px", left: "-60px",
                  background: "rgba(15,15,26,0.9)",
                  border: "1px solid rgba(124,58,237,0.4)",
                  color: "#a78bfa", backdropFilter: "blur(12px)", whiteSpace: "nowrap",
                }}>
                🤖 AI Intern · Infosys
              </div>

              {/* Skill pills right */}
              <div className="float-anim-delay-3 absolute flex flex-col gap-2"
                style={{ top: "40px", right: "-85px" }}>
                {["JavaScript", "Python", "ML / AI"].map(s => (
                  <div key={s} className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: "rgba(15,15,26,0.9)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      color: "#a78bfa", backdropFilter: "blur(8px)", whiteSpace: "nowrap",
                    }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs"
          style={{ color: "#4b5563" }}>
          <span>Scroll</span>
          <div className="w-px h-8"
            style={{ background: "linear-gradient(to bottom,#7c3aed,transparent)", animation: "float 1.6s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <motion.section id="about" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="py-28 px-6 md:px-16 lg:px-24" style={{ background: "#0d0d18" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-m tracking-widest uppercase mb-4" style={{ color: "#7c3aed" }}>Who I Am</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">About Me</h2>
            <p className="text-lg leading-relaxed mb-5" style={{ color: "#9ca3af" }}>
              I am <span className="text-white font-semibold">Shraddha Maku</span>, a final-year Computer Science student at Malla Reddy College of Engineering for Women. Strong fundamentals in Python, OOP, SQL, Machine Learning and Data Analytics.
            </p>
            <p className="leading-relaxed" style={{ color: "#6b7280" }}>
              Highly motivated and detail-oriented, eager to contribute to real-world software engineering teams. I believe great software lives at the intersection of technical rigor and creative problem-solving.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["🎨 Creative", "⚡ Fast Learner", "🤝 Team Player", "💡 Problem Solver", "🤖 AI Enthusiast", "📊 Data-Driven"].map(t => (
                <span key={t} className="px-3 py-1.5 text-xs rounded-full"
                  style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.25)", color: "#c4b5fd" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { val: 6,   suffix: "+", label: "Projects Built"       },
              { val: 566, suffix: "",  label: "NCAT AIR 2025"        },
              { val: 92,  suffix: "%", label: "Best Model Accuracy"  },
              { val: 100, suffix: "%", label: "Dedication"           },
            ].map(({ val, suffix, label }) => (
              <div key={label} className="p-6 rounded-2xl transition-all duration-300"
                style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(124,58,237,0.35)"; el.style.boxShadow = "0 0 20px rgba(124,58,237,0.07)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(255,255,255,0.05)"; el.style.boxShadow = "none"; }}>
                <div className="text-3xl font-black mb-1" style={{ fontFamily: "'Space Mono',monospace", color: "#a78bfa" }}>
                  <CountUp to={val} suffix={suffix} />
                </div>
                <div className="text-sm" style={{ color: "#6b7280" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── ACADEMICS ────────────────────────────────────── */}
      <motion.section id="academics" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="py-28 px-6 md:px-16 lg:px-24" style={{ background: "#0a0a0f" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-m tracking-widest uppercase mb-4 text-center" style={{ color: "#7c3aed" }}>Education</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-14 text-center">Academics</h2>
          <div className="p-10 rounded-3xl transition-all duration-500"
            style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.05)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(124,58,237,0.4)"; el.style.boxShadow = "0 0 40px rgba(124,58,237,0.07)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(255,255,255,0.05)"; el.style.boxShadow = "none"; }}>
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.35)" }}>🎓</div>
              <div>
                <div className="text-xs rounded-full px-3 py-0.5 inline-block mb-3"
                  style={{ border: "1px solid rgba(124,58,237,0.35)", color: "#a78bfa" }}>2022 – 2026</div>
                <h3 className="text-2xl font-bold text-white mb-1">B.Tech – Computer Science Engineering</h3>
                <p className="font-medium mb-2" style={{ color: "#a78bfa" }}>Malla Reddy College of Engineering for Women</p>
                <p className="text-sm" style={{ color: "#6b7280" }}>Hyderabad, Telangana · Final Year Student</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Python", "Machine Learning", "Data Analytics", "SQL", "OOP", "DSA"].map(s => (
                    <span key={s} className="text-xs px-3 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.04)", color: "#9ca3af" }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SKILLS ───────────────────────────────────────── */}
      <motion.section id="skills" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="py-28 px-6 md:px-16 lg:px-24" style={{ background: "#0d0d18" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-m tracking-widest uppercase mb-4 text-center" style={{ color: "#7c3aed" }}>Expertise</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-14 text-center">Skills & Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "⚙", title: "Technical Skills",
                skills: [["Python", 85], ["Machine Learning", 80], ["SQL / Databases", 75], ["Data Analytics", 82], ["REST APIs", 72]] as [string, number][] },
              { icon: "🧪", title: "Frameworks & Tools",
                skills: [["Scikit-learn", 80], ["Streamlit", 75], ["Next.js / React", 68], ["Supabase / PostgreSQL", 70], ["Google OAuth", 65]] as [string, number][] },
              { icon: "✨", title: "Soft Skills",
                skills: [["Problem Solving", 90], ["Fast Learning", 92], ["Team Collaboration", 88], ["Communication", 85], ["Attention to Detail", 93]] as [string, number][] },
            ].map(({ icon, title, skills }) => (
              <div key={title} className="p-8 rounded-2xl transition-all duration-300"
                style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.border = "1px solid rgba(124,58,237,0.3)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.05)")}>
                <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                  <span style={{ color: "#7c3aed" }}>{icon}</span>{title}
                </h3>
                {skills.map(([l, p]) => <SkillBar key={l} label={l} pct={p} />)}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── PROJECTS ─────────────────────────────────────── */}
      <motion.section id="projects" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="py-28 px-6 md:px-16 lg:px-24" style={{ background: "#0a0a0f" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-m tracking-widest uppercase mb-4 text-center" style={{ color: "#7c3aed" }}>Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-14 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard tag="Machine Learning" title="AI Loan Eligibility Advisory System"
              description="ML-based credit risk assessment system predicting loan approval probability using classification models."
              points={["Extensive data preprocessing & feature engineering", "Model training using Scikit-learn", "Performance evaluation & cross-validation", "REST API-based system architecture"]} />
            <ProjectCard tag="Anomaly Detection" title="Fraud Detection in Banking Data"
              description="Anomaly detection system identifying fraudulent financial transactions using supervised learning."
              points={["Advanced feature engineering pipeline", "Classification modeling & performance tuning", "Precision-recall optimization", "Data visualization & reporting"]} />
            <ProjectCard tag="Full-Stack" title="Smart Bookmark Manager"
              description="Full-stack bookmark management system with secure authentication and real-time database operations."
              points={["Google OAuth integration", "Supabase PostgreSQL schema design", "Real-time CRUD operations", "Responsive modern UI"]} />
            <ProjectCard tag="NLP · 92% Accuracy" title="Spam Email Classifier"
              description="NLP-based spam detection model using probabilistic classification achieving high accuracy."
              points={["TF-IDF vectorization pipeline", "Naive Bayes classifier", "Model accuracy optimization", "Streamlit deployment"]} />
          </div>
        </div>
      </motion.section>

      {/* ── ACHIEVEMENTS ─────────────────────────────────── */}
      <motion.section id="achievements" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="py-28 px-6 md:px-16 lg:px-24" style={{ background: "#0d0d18" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-m tracking-widest uppercase mb-4 text-center" style={{ color: "#7c3aed" }}>Milestones</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-14 text-center">Achievements</h2>
          <div className="grid md:grid-cols-3 gap-7">
            <AchCard icon="🏆" title="AIR 566 – NCAT 2025"
              desc="Secured All India Rank 566 among thousands of participants nationwide in the National Common Aptitude Test." />
            <AchCard icon="🤖" title="Infosys Springboard – AI Intern"
              desc="Successfully completed AI Internship with hands-on exposure to real-world AI workflows and industry practices." />
            <AchCard icon="🎯" title="92% Model Accuracy"
              desc="Built and deployed a Spam Email Classifier achieving 92% accuracy using NLP and Naive Bayes classification." />
          </div>
        </div>
      </motion.section>

      {/* ── TEAMWORK ─────────────────────────────────────── */}
      <motion.section id="teamwork" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="py-28 px-6 md:px-16 lg:px-24" style={{ background: "#0a0a0f" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-m tracking-widest uppercase mb-4 text-center" style={{ color: "#7c3aed" }}>Collaboration</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-center">Teamwork & Community</h2>
          <p className="max-w-2xl mx-auto text-center mb-14 leading-relaxed" style={{ color: "#6b7280" }}>
            Beyond individual projects, I thrive in collaborative environments — leading teams, participating in events, and contributing to the community around me.
          </p>

          {/* 3-column image cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              
            ].map(({ src }, i) => (
              <motion.div
                
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden transition-all duration-500"
                style={{ border: "1px solid rgba(255,255,255,0.05)", background: "#0f0f1a" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(124,58,237,0.4)"; el.style.boxShadow = "0 0 30px rgba(124,58,237,0.08)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(255,255,255,0.05)"; el.style.boxShadow = "none"; }}
              >
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden">
                  <img
                    src={src}

                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      const p = el.parentElement!;
                      p.style.background = `hsl(${260 + i * 20},25%,10%)`;
                      p.style.display = "flex";
                      p.style.alignItems = "center";
                      p.style.justifyContent = "center";
                      p.innerHTML = `<span style="font-size:3.5rem">$</span>`;
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(to top,rgba(124,58,237,0.25),transparent)" }} />
                </div>

                {/* Caption */}
                <div className="p-5">
                  <h3 className="font-bold text-white mb-1 group-hover:text-violet-400 transition-colors duration-300"></h3>
                  <p className="text-xs" style={{ color: "#6b7280" }}></p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Auto-scrolling team photos strip */}
          <div className="relative overflow-hidden">
            <div className="flex gap-5 auto-scroll">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-52 h-52 rounded-2xl overflow-hidden group"
                  style={{ border: "1px solid rgba(124,58,237,0.15)" }}>
                  <img
                    src={`/team/team${(i % 6) + 1}.jpeg`}
                    alt={`Team photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      const p = el.parentElement!;
                      p.style.background = `hsl(${270 + (i * 12) % 40},25%,10%)`;
                      p.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem">${["🤝","🏆","🎓","💡","🌍","⚡"][i % 6]}</div>`;
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-16 pointer-events-none"
              style={{ background: "linear-gradient(to right,#0a0a0f,transparent)" }} />
            <div className="absolute inset-y-0 right-0 w-16 pointer-events-none"
              style={{ background: "linear-gradient(to left,#0a0a0f,transparent)" }} />
          </div>
        </div>
      </motion.section>

      {/* ── HOBBIES ──────────────────────────────────────── */}
      <motion.section id="hobbies" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="py-28 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ background: "#0a0a0f" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-m tracking-widest uppercase mb-4 text-center" style={{ color: "#7c3aed" }}>Beyond Code</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-center">Photography-Card Designing</h2>
          <p className="max-w-2xl mx-auto text-center mb-14 leading-relaxed" style={{ color: "#6b7280" }}>
            I enjoy capturing unique perspectives through photography and designing digital invitation cards — creative pursuits that sharpen my attention to detail and positively influence my approach to software development.
          </p>
          <div className="relative">
            <div className="flex gap-5 auto-scroll">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-52 h-52 rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(124,58,237,0.15)" }}>
                  <img
                    src={`/hobbies/photo${(i % 6) + 1}.jpeg`}
                    alt={`Photography ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      const p = el.parentElement!;
                      p.style.background = `hsl(${260 + (i * 15) % 40},30%,10%)`;
                      p.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem">${["📸", "🌅", "🌆", "🌃", "🏙️", "✨"][i % 6]}</div>`;
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-16 pointer-events-none"
              style={{ background: "linear-gradient(to right,#0a0a0f,transparent)" }} />
            <div className="absolute inset-y-0 right-0 w-16 pointer-events-none"
              style={{ background: "linear-gradient(to left,#0a0a0f,transparent)" }} />
          </div>
        </div>
      </motion.section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <motion.section id="contact" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="py-28 px-6 md:px-16 lg:px-24 relative overflow-hidden" style={{ background: "#0d0d18" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full blur-3xl" style={{ background: "rgba(124,58,237,0.04)" }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#7c3aed" }}>Reach Out</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5">Let&apos;s Connect</h2>
          <p className="leading-relaxed mb-12" style={{ color: "#6b7280" }}>
            Actively seeking internships and entry-level software development opportunities. Open to remote and on-site roles — eager to contribute to impactful engineering projects.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: "📧", label: "Email",    href: "mailto:shraddhamaku@gmail.com",             sub: "shraddhamaku@gmail.com" },
              { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/shraddhamaku/", sub: "shraddhamaku"           },
              { icon: "🐙", label: "GitHub",   href: "https://github.com/MakuShraddha",           sub: "MakuShraddha"           },
              { icon: "📍", label: "Location", href: "#",                                         sub: "Hyderabad, India"       },
            ].map(({ icon, label, href, sub }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="p-5 rounded-2xl block transition-all duration-300"
                style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(124,58,237,0.4)"; el.style.boxShadow = "0 0 20px rgba(124,58,237,0.08)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.border = "1px solid rgba(255,255,255,0.05)"; el.style.boxShadow = "none"; }}>
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-sm font-medium text-white mb-1">{label}</div>
                <div className="text-xs truncate" style={{ color: "#4b5563" }}>{sub}</div>
              </a>
            ))}
          </div>
          <a href="mailto:shraddhamaku@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(124,58,237,0.5)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}>
            Send Me a Direct Email →
          </a>
        </div>
      </motion.section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="py-8 px-6 text-center text-sm"
        style={{ borderTop: "1px solid rgba(124,58,237,0.12)", background: "#0a0a0f", color: "#4b5563" }}>
        © 2026{" "}
        <span className="font-medium" style={{ color: "#9ca3af" }}>Shraddha Maku</span>
        . Built with ♥ and Next.js
      </footer>

    </main>
  );
}
