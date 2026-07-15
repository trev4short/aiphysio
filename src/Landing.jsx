import { useState, useEffect, useRef } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % 4);
    }, 2200);
    return () => clearInterval(intervalRef.current);
  }, []);

  const steps = [
    { n: "01", label: "Complete your movement assessment", sub: "Answer questions about your pain, history, and goals in under 2 minutes." },
    { n: "02", label: "Receive your AI-generated program", sub: "Personalised exercises, education, and a step-by-step treatment plan — instantly." },
    { n: "03", label: "Upload your movement video", sub: "Record yourself performing key movements and upload directly to your portal." },
    { n: "04", label: "Get expert PT feedback", sub: "A licensed physiotherapist reviews your video and responds with targeted guidance." },
  ];

  const conditions = [
    "Low back pain", "Neck pain", "Shoulder injury", "Knee pain",
    "Hip & pelvis", "Ankle sprain", "Post-surgery rehab", "Postural issues",
    "Sports injuries", "Elbow & wrist", "Sciatica", "General deconditioning"
  ];

  return (
    <div style={{ background: "#0a0e14", color: "#e2dfd8", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        a { text-decoration: none; }
        a:hover { opacity: 0.8; }
        @media (max-width: 600px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 601px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-nav-drawer { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 1.25rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(10,14,20,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1a2332" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#f0ede8" }}>AIphysio</span>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#how" style={{ color: "#6a6a6a", fontSize: "14px" }}>How it works</a>
          <a href="#conditions" style={{ color: "#6a6a6a", fontSize: "14px" }}>Conditions</a>
          <a href="#pricing" style={{ color: "#6a6a6a", fontSize: "14px" }}>Pricing</a>
          <a href="/assessment" style={{ background: "#4ade80", color: "#0a0e14", padding: "8px 20px", borderRadius: "20px", fontSize: "14px", fontWeight: 600 }}>Start free assessment</a>
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(m => !m)}
          style={{ display: "none", background: "none", border: "1px solid #1a2332", borderRadius: "8px", padding: "6px 10px", cursor: "pointer", flexDirection: "column", gap: "4px" }}>
          <span style={{ display: "block", width: "18px", height: "2px", background: "#e2dfd8" }} />
          <span style={{ display: "block", width: "18px", height: "2px", background: "#e2dfd8" }} />
          <span style={{ display: "block", width: "18px", height: "2px", background: "#e2dfd8" }} />
        </button>
      </nav>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="mobile-nav-drawer" style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
          background: "#0d1117", borderBottom: "1px solid #1a2332",
          padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem",
        }}>
          <a href="#how" onClick={() => setMenuOpen(false)} style={{ color: "#e2dfd8", fontSize: "16px" }}>How it works</a>
          <a href="#conditions" onClick={() => setMenuOpen(false)} style={{ color: "#e2dfd8", fontSize: "16px" }}>Conditions</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ color: "#e2dfd8", fontSize: "16px" }}>Pricing</a>
          <a href="/assessment" style={{ background: "#4ade80", color: "#0a0e14", padding: "12px 24px", borderRadius: "24px", fontSize: "15px", fontWeight: 600, textAlign: "center" }}>Start free assessment</a>
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "8rem 1.25rem 4rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "800px", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "20px", padding: "6px 16px", marginBottom: "1.5rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "11px", color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>AI-powered physical therapy</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.4rem, 10vw, 5.5rem)", fontWeight: 800, lineHeight: 1.0, margin: "0 0 1.25rem", color: "#f0ede8", letterSpacing: "-0.03em" }}>
            Unlimited PT.<br />
            <span style={{ color: "#4ade80" }}>One flat fee.</span>
          </h1>

          <p style={{ fontSize: "clamp(0.95rem, 3vw, 1.2rem)", color: "#8a8680", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 1rem", fontWeight: 300 }}>
            For the cost of a single insurance deductible, get a full year of AI-guided physiotherapy — personalised programs, expert video feedback, and step-by-step treatment from a licensed PT.
          </p>

          <p style={{ fontSize: "1.4rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f0ede8", margin: "0 auto 2rem" }}>
            $80 <span style={{ fontSize: "1rem", color: "#8a8680", fontWeight: 400 }}>/ year</span>
          </p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/assessment" style={{ background: "#4ade80", color: "#0a0e14", padding: "14px 28px", borderRadius: "28px", fontSize: "15px", fontWeight: 600 }}>
              Start your free assessment →
            </a>
            <a href="#how" style={{ background: "transparent", color: "#e2dfd8", padding: "14px 28px", borderRadius: "28px", fontSize: "15px", border: "1px solid #1e2a38" }}>
              See how it works
            </a>
          </div>

          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {["Licensed US physiotherapist", "AI-personalised programs", "Video movement analysis"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#5a5a5a" }}>
                <span style={{ color: "#4ade80" }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ padding: "4rem 1.25rem", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "#1a2332", borderRadius: "16px", overflow: "hidden" }}>
          {[
            { label: "Traditional PT", items: ["$150-300 per session", "Limited appointment slots", "Long wait times", "Insurance gatekeeping", "Generic exercise handouts"], highlight: false },
            { label: "AIphysio", items: ["$80 for a full year", "Unlimited access, 24/7", "Start today", "No referral needed", "AI-personalised to you"], highlight: true },
          ].map(col => (
            <div key={col.label} style={{ background: col.highlight ? "#0f1a14" : "#0d1117", padding: "2rem 1.5rem" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: col.highlight ? "#4ade80" : "#5a5a5a", marginBottom: "1.25rem", fontWeight: 500 }}>{col.label}</div>
              {col.items.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "14px", color: col.highlight ? "#e2dfd8" : "#5a5a5a" }}>
                  <span style={{ color: col.highlight ? "#4ade80" : "#2a2a2a", fontSize: "16px", flexShrink: 0 }}>{col.highlight ? "✓" : "✗"}</span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "4rem 1.25rem", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={eyebrow}>How it works</div>
          <h2 style={sectionHeading}>From assessment to recovery,<br />all in one place</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {steps.map((s, i) => (
            <div key={i} onClick={() => setActiveStep(i)}
              style={{
                background: activeStep === i ? "#0f1a14" : "#0d1117",
                border: "1px solid",
                borderColor: activeStep === i ? "#4ade80" : "#1a2332",
                borderRadius: "12px",
                padding: "1.5rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
              }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "12px", fontWeight: 700, color: activeStep === i ? "#4ade80" : "#2a3a4a", minWidth: "24px", paddingTop: "2px" }}>{s.n}</span>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 500, color: activeStep === i ? "#f0ede8" : "#6a6a6a", marginBottom: activeStep === i ? "6px" : 0 }}>{s.label}</div>
                {activeStep === i && <div style={{ fontSize: "13px", color: "#8a8680", lineHeight: 1.6 }}>{s.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ padding: "4rem 1.25rem", background: "#0d1117" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={eyebrow}>What's included</div>
            <h2 style={sectionHeading}>Everything you need<br />to recover and move better</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
            {[
              { icon: "⚡", title: "AI movement assessment", desc: "Intelligent intake captures your pain pattern, history, and functional limits to generate a precise program." },
              { icon: "📋", title: "Personalised exercise programs", desc: "Sets, reps, frequency, and clear instructions — written for your specific condition and fitness level." },
              { icon: "📄", title: "Illustrated PDF guides", desc: "Downloadable exercise sheets with written instructions and photographic demonstrations for every movement." },
              { icon: "🎥", title: "Condition video library", desc: "Curated video content organised by body region and condition, included with your subscription." },
              { icon: "📱", title: "Movement video upload", desc: "Record your movements and upload directly to your patient portal for expert review." },
              { icon: "👨‍⚕️", title: "Licensed PT feedback", desc: "A Washington-licensed physiotherapist personally reviews your movement and provides targeted guidance." },
            ].map(f => (
              <div key={f.title} style={{ background: "#141920", border: "1px solid #1a2332", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ fontSize: "22px", marginBottom: "10px" }}>{f.icon}</div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#f0ede8", marginBottom: "6px" }}>{f.title}</div>
                <div style={{ fontSize: "13px", color: "#6a6a6a", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section id="conditions" style={{ padding: "4rem 1.25rem", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={eyebrow}>Conditions we treat</div>
          <h2 style={sectionHeading}>Built for the most common<br />musculoskeletal conditions</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
          {conditions.map(c => (
            <div key={c} style={{ background: "#0d1117", border: "1px solid #1a2332", borderRadius: "20px", padding: "7px 16px", fontSize: "13px", color: "#8a8680" }}>{c}</div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "4rem 1.25rem", background: "#0d1117" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={eyebrow}>Pricing</div>
          <h2 style={sectionHeading}>Less than one PT visit.<br />For an entire year.</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginTop: "3rem", textAlign: "left" }}>

            {/* TIER 1 */}
            <div style={{ background: "#0d1117", border: "1px solid #1a2332", borderRadius: "20px", padding: "2rem 1.5rem" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a5a5a", marginBottom: "1rem", fontWeight: 500 }}>Essential</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "3rem", fontWeight: 800, color: "#f0ede8", lineHeight: 1, marginBottom: "4px" }}>$80</div>
              <div style={{ color: "#5a5a5a", fontSize: "13px", marginBottom: "1.75rem" }}>per year — $6.67/month</div>
              {["Unlimited AI movement assessments", "Personalised exercise programs", "Illustrated PDF exercise guides", "Full video library access", "Cancel anytime"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px", fontSize: "13px", color: "#8a8680" }}>
                  <span style={{ color: "#4ade80", flexShrink: 0 }}>✓</span> {item}
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px", fontSize: "13px", color: "#3a3a3a" }}>
                <span style={{ flexShrink: 0 }}>–</span> PT video feedback
              </div>
              <a href="/assessment" style={{ display: "block", marginTop: "1.75rem", textAlign: "center", background: "transparent", color: "#e2dfd8", padding: "13px 20px", borderRadius: "28px", fontSize: "14px", fontWeight: 500, border: "1px solid #2a3a4a" }}>
                Start free assessment →
              </a>
              <p style={{ fontSize: "11px", color: "#3a3a3a", marginTop: "8px", textAlign: "center" }}>No card required to start</p>
            </div>

            {/* TIER 2 */}
            <div style={{ background: "#0f1a14", border: "1px solid #4ade80", borderRadius: "20px", padding: "2rem 1.5rem", position: "relative" }}>
              <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#4ade80", color: "#0a0e14", fontSize: "11px", fontWeight: 700, padding: "4px 14px", borderRadius: "12px", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>MOST POPULAR</div>
              <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4ade80", marginBottom: "1rem", fontWeight: 500 }}>Complete</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "3rem", fontWeight: 800, color: "#f0ede8", lineHeight: 1, marginBottom: "4px" }}>$149</div>
              <div style={{ color: "#5a5a5a", fontSize: "13px", marginBottom: "1.75rem" }}>per year — $12.42/month</div>
              {["Everything in Essential", "Personalised exercise programs", "Illustrated PDF exercise guides", "Full video library access", "Movement video upload portal", "2 PT video reviews per month", "Written PT feedback within 48hrs", "Cancel anytime"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px", fontSize: "13px", color: "#c9c6c0" }}>
                  <span style={{ color: "#4ade80", flexShrink: 0 }}>✓</span> {item}
                </div>
              ))}
              <a href="/assessment" style={{ display: "block", marginTop: "1.75rem", textAlign: "center", background: "#4ade80", color: "#0a0e14", padding: "13px 20px", borderRadius: "28px", fontSize: "14px", fontWeight: 600 }}>
                Start free assessment →
              </a>
              <p style={{ fontSize: "11px", color: "#3a3a3a", marginTop: "8px", textAlign: "center" }}>No card required to start</p>
            </div>

          </div>

          <p style={{ textAlign: "center", fontSize: "13px", color: "#3a3a3a", marginTop: "1.5rem" }}>
            Need more PT feedback? Additional reviews available at $15 each.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2.5rem 1.25rem", borderTop: "1px solid #1a2332", textAlign: "center" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f0ede8", marginBottom: "1rem" }}>AIphysio</div>
        <p style={{ fontSize: "11px", color: "#3a3a3a", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
          AIphysio provides general wellness and exercise guidance only. It is not a substitute for in-person physiotherapy assessment or medical advice. PT feedback is provided by a Washington State licensed physiotherapist. If you are experiencing a medical emergency or red flag symptoms, seek immediate medical attention. © 2026 AIphysio.
        </p>
      </footer>
    </div>
  );
}

const eyebrow = {
  fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
  color: "#4ade80", marginBottom: "1rem", fontWeight: 500,
};

const sectionHeading = {
  fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
  fontWeight: 700, color: "#f0ede8", margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em",
};
