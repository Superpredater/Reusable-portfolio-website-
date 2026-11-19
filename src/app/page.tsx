"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Github, Instagram, Linkedin, Menu, Moon, Sun, X, ChevronDown } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { articles } from "@/content/articles";
import { photography } from "@/content/photography";
import { socialLinks } from "@/content/social-links";

const nav = ["About", "Projects", "Experience", "Studio", "Writing", "Contact"];
const usable = (value: string) => Boolean(value && !value.startsWith("["));

export default function Home() {
  const [theme, setTheme] = useState("system");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") || "system";
    setTheme(saved);
    const apply = () => document.documentElement.dataset.theme = saved === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : saved;
    apply();
    const media = matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  function changeTheme(value: string) {
    setTheme(value); localStorage.setItem("portfolio-theme", value);
    document.documentElement.dataset.theme = value === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : value;
  }

  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setSent(false);
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim(); const email = String(data.get("email") || "").trim(); const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) { setError("Please complete each field."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return; }
    setSending(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/contact`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();
      if (!response.ok) { setError(result.error || "Your message could not be sent."); return; }
      setSent(true); event.currentTarget.reset();
    } catch {
      setError("Could not reach the contact service. Make sure the backend is running.");
    } finally { setSending(false); }
  }

  return <main>
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark"><Asterisk size={22}/></span><span>{usable(profile.name) ? profile.name : "[Your Name]"}<small>Independent portfolio</small></span></a>
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
      <div className="top-actions"><label className="theme-label" htmlFor="theme-select">Theme</label><div className="theme-select-wrap"><select id="theme-select" aria-label="Choose theme" value={theme} onChange={(e) => changeTheme(e.target.value)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select><ChevronDown className="theme-chevron" size={15} aria-hidden="true"/></div><button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button></div>
    </header>

    <section className="hero section-shell" id="home"><div className="hero-copy"><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><div className="eyebrow"><span className="status-dot"/> AVAILABLE FOR SELECT PROJECTS <span className="eyebrow-index">01 / 07</span></div><h1>{usable(profile.name) ? profile.name : <><span className="placeholder">[Your</span><br/><span className="serif placeholder">Name]</span></>}</h1><p className="hero-title">{profile.title}</p><p className="hero-intro">{profile.headline}<br/>{profile.introduction}</p><a className="text-link" href="#projects">Explore selected work <ArrowDownRight size={16}/></a></motion.div></div>
      <div className="hero-art"><div className="art-topline"><span>FIG. 01</span><span>PORTFOLIO / 2025—26</span></div><div className="portrait-placeholder"><div className="portrait-orbit orbit-one"/><div className="portrait-orbit orbit-two"/><div className="portrait-symbol"><Asterisk size={86} strokeWidth={0.8}/></div><span className="portrait-label">{profile.photograph}</span><span className="portrait-coord">40° 43′ N<br/>73° 59′ W</span></div><div className="art-caption"><span>CREATIVE PRACTICE</span><span>DESIGN · TECHNOLOGY · CULTURE</span></div></div>
      <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span>{profile.location}</span><span>EST. 2025</span></div>
    </section>

    <section className="intro-band section-shell" id="about"><div className="section-kicker"><span>01</span><span>ABOUT</span></div><div className="intro-content"><h2>A practice built around <span className="serif">curiosity.</span></h2><div className="intro-columns"><p>{profile.biography}</p><p>{profile.journey}<br/><br/>{profile.interests}</p></div><div className="intro-meta"><span>ACHIEVEMENTS</span><span>{profile.achievements}</span></div></div></section>

    <section className="projects-section section-shell" id="projects"><div className="section-heading"><div><div className="section-kicker"><span>02</span><span>SELECTED WORK</span></div><h2>Projects <span className="serif">& studies</span></h2></div><span className="heading-note">A selection of things made with intention.<br/>2023 — 2026</span></div><div className="project-grid">{projects.map((p, i) => <motion.article className={`project-card project-${i+1}`} key={p.index} whileHover={{ y: -5 }} transition={{ duration: .25 }}><div className={`project-visual visual-${i+1}`}><span className="project-number">{p.index} / 04</span><div className="visual-shape"><span>{p.image}</span></div><a href="#contact" className="round-arrow" aria-label="View project"><ArrowUpRight size={19}/></a></div><div className="project-info"><div><h3>{p.name}</h3><p>{p.description}</p></div><span className="project-stack">{p.stack}</span></div><div className="project-links"><a href="#contact"><Github size={14}/> {p.github}</a><a href="#contact">{p.demo} <ArrowUpRight size={13}/></a></div></motion.article>)}</div></section>

    <section className="experience-section section-shell" id="experience"><div className="section-kicker"><span>03</span><span>EXPERIENCE</span></div><div className="experience-layout"><h2>Work, with <span className="serif">purpose.</span></h2><div className="experience-list">{experience.map((item, i) => <div className="experience-row" key={i}><span className="exp-period">{item.period}</span><div><h3>{item.title}</h3><p>{item.company}</p><p className="exp-responsibilities">{item.responsibilities}</p></div><ArrowUpRight size={16}/></div>)}</div></div></section>

    <section className="skills-section section-shell"><div className="section-kicker"><span>04</span><span>TOOLKIT</span></div><div className="skills-layout"><h2>Tools of <span className="serif">the trade.</span></h2><div className="skills-grid">{skills.map((group, i) => <div className="skill-group" key={i}><span className="skill-index">0{i+1}</span><h3>{group.category}</h3><div>{group.entries.map((skill, j) => <span className="skill-pill" key={j}>{skill}</span>)}</div></div>)}</div></div></section>

    <section className="studio-section section-shell" id="studio"><div className="section-heading"><div><div className="section-kicker"><span>05</span><span>CREATIVE STUDIO</span></div><h2>Beyond the <span className="serif">screen.</span></h2></div><span className="heading-note">Notes from a wider creative practice.</span></div><div className="studio-grid">{photography.map((item, i) => <div className={`studio-card studio-${i+1}`} key={i}><div className="studio-art"><span className="studio-art-placeholder">{item.image}</span><span className="studio-art-index">0{i+1}</span>{i === 1 && <div className="sun-shape"/>}{i === 2 && <div className="play-shape">▶</div>}</div><div className="studio-caption"><div><h3>{item.title}</h3><span>{item.category}</span></div><ArrowUpRight size={16}/></div></div>)}</div></section>

    <section className="writing-section section-shell" id="writing"><div className="section-kicker"><span>06</span><span>WRITING & IDEAS</span></div><div className="writing-layout"><h2>Words in <span className="serif">progress.</span></h2><div className="article-list">{articles.map((article, i) => <a className="article-row" key={i} href="#contact"><span className="article-index">0{i+1}</span><div><span className="article-publication">{article.publication}</span><h3>{article.title}</h3><p>{article.description}</p></div><ArrowUpRight size={18}/></a>)}</div></div></section>

    <section className="contact-section section-shell" id="contact"><div className="section-kicker"><span>07</span><span>GET IN TOUCH</span></div><div className="contact-layout"><div><h2>Have a good one<br/>in <span className="serif">mind?</span></h2><p className="contact-copy">A note is a good place to start. Share a little about what you’re working on.</p><div className="contact-details"><span>EMAIL</span><span>{profile.email || "[Your Email]"}</span></div><div className="social-links">{[[Linkedin, socialLinks.linkedin], [Github, socialLinks.github], [Instagram, socialLinks.instagram]].map(([Icon, label], i) => <a key={i} href="#contact"><Icon size={16}/>{String(label)}</a>)}</div></div><form className="contact-form" onSubmit={submitContact} noValidate><label>Your name<input name="name" placeholder="[Your Name]" required/></label><label>Email address<input name="email" type="email" placeholder="[Your Email]" required/></label><label>Your message<textarea name="message" rows={4} placeholder="Tell me a little about it…" required/></label><button type="submit" className="submit-button" disabled={sending}>{sending ? "Sending…" : "Send your message"} <ArrowUpRight size={16}/></button>{error && <p className="form-message error" role="alert">{error}</p>}{sent && <p className="form-message success" role="status">Your message was received by the portfolio API.</p>}</form></div></section>

    <footer className="footer section-shell"><a className="brand" href="#home"><span className="brand-mark"><Asterisk size={20}/></span><span>{usable(profile.name) ? profile.name : "[Your Name]"}<small>Independent portfolio</small></span></a><span>DESIGNED WITH INTENTION · © 2025</span><a href="#home">BACK TO TOP ↑</a></footer>
  </main>;
}
