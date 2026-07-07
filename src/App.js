import { useState } from "react";

const STEPS = ["region", "pain", "history", "function", "goals"];

const BODY_REGIONS = [
  { id: "neck", label: "Neck", sub: "& upper back" },
  { id: "shoulder", label: "Shoulder", sub: "left / right / both" },
  { id: "elbow", label: "Elbow & wrist", sub: "upper limb" },
  { id: "lower_back", label: "Lower back", sub: "lumbar / sacral" },
  { id: "hip", label: "Hip & pelvis", sub: "& glutes" },
  { id: "knee", label: "Knee", sub: "left / right / both" },
  { id: "ankle", label: "Ankle & foot", sub: "lower limb" },
  { id: "multiple", label: "Multiple areas", sub: "more than one region" },
];

const PAIN_BEHAVIOURS = [
  "Constant", "Intermittent", "Only with movement", "Only at rest", "Worse in the morning", "Worse at night"
];

const AGGRAVATING = [
  "Sitting", "Standing", "Walking", "Bending", "Lifting", "Reaching overhead",
  "Stairs", "Exercise / sport", "Sleeping", "Screen time"
];

const RELIEVING = [
  "Rest", "Heat", "Ice", "Movement / stretching", "Pain medication", "Massage", "Nothing helps"
];

const GOALS = [
  "Return to sport / exercise", "Reduce daily pain", "Get back to work", "Improve posture",
  "Recover from injury / surgery", "Improve mobility / flexibility", "Sleep better", "General fitness"
];

const RED_FLAGS = [
  "Unexplained weight loss", "Night sweats", "Bladder / bowel changes",
  "Numbness in groin / inner thigh", "Severe unrelenting pain"
];

const initialForm = {
  region: [],
  regionDetail: "",
  painScore: 5,
  painBehaviour: [],
  duration: "",
  previousTreatment: "",
  aggravating: [],
  relieving: [],
  functionalLimits: "",
  goals: [],
  age: "",
  activityLevel: "",
  redFlags: [],
};

export default function AIPhysioIntake() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const toggle = (field, value) => {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter(v => v !== value)
        : [...f[field], value]
    }));
  };

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const buildPrompt = () => {
    return "You are an expert physiotherapist AI assistant for AIphysio. Based on the patient intake below, produce:\n\n1. A brief clinical assessment summary (2-3 sentences, professional tone)\n2. A personalised home exercise program (4-6 exercises with sets, reps, frequency, and clear instructions)\n3. Self-management education (3-4 key points about their condition and recovery)\n4. A clear disclaimer that this is general wellness guidance, not a substitute for in-person assessment\n\nIMPORTANT: Write in plain, encouraging language the patient can understand. Format with clear headings.\n\n--- PATIENT INTAKE ---\nBody region: " + form.region.join(", ") + "\nAdditional detail: " + (form.regionDetail || "none") + "\nPain score (0-10): " + form.painScore + "\nPain behaviour: " + form.painBehaviour.join(", ") + "\nDuration: " + form.duration + "\nPrevious treatment: " + (form.previousTreatment || "none") + "\nAggravating factors: " + form.aggravating.join(", ") + "\nRelieving factors: " + form.relieving.join(", ") + "\nFunctional limitations: " + (form.functionalLimits || "none stated") + "\nGoals: " + form.goals.join(", ") + "\nAge: " + (form.age || "not provided") + "\nActivity level: " + (form.activityLevel || "not provided") + "\nRed flags present: " + (form.redFlags.length > 0 ? form.redFlags.join(", ") : "none");
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Use environment variable for the API key. Replace with your key if needed.
          "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: buildPrompt() }],
        }),
      });

      const data = await response.json();
      console.log("API response:", JSON.stringify(data));

      if (data.error) {
        setError("API error: " + data.error.message);
        return;
      }

      const text = data.content && data.content.length > 0
        ? data.content.map(b => b.text || "").join("")
        : "";

      if (!text) {
        setError("No response received. Check console for details.");
        return;
      }

      setResult(text);
      setStep(5);
    } catch (e) {
      console.log("Fetch error:", e.message);
      setError("Connection error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const progress = step < 5 ? Math.round((step / STEPS.length) * 100) : 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1117",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem 1rem",
      fontFamily: "'DM Sans', sans-serif",
      color: "#e8e6e1",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#4ade80", textTransform: "uppercase", marginBottom: "6px", fontWeight: 500 }}>
          AIphysio
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, margin: 0, lineHeight: 1.1, color: "#f0ede8" }}>
          Movement Assessment
        </h1>
        <p style={{ color: "#7a7975", fontSize: "14px", marginTop: "8px", maxWidth: "360px" }}>
          Tell us about your pain and goals — your personalised program takes about 2 minutes to complete.
        </p>
      </div>

      {/* Progress bar */}
      {step < 5 && (
        <div style={{ width: "100%", maxWidth: "560px", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#7a7975", marginBottom: "6px" }}>
            <span>Step {step + 1} of {STEPS.length}</span>
            <span>{progress}%</span>
          </div>
          <div style={{ height: "3px", background: "#1e2530", borderRadius: "2px" }}>
            <div style={{ height: "100%", width: progress + "%", background: "#4ade80", borderRadius: "2px", transition: "width 0.4s ease" }} />
          </div>
        </div>
      )}

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "560px",
        background: "#141920",
        border: "1px solid #1e2a38",
        borderRadius: "16px",
        padding: "2rem",
      }}>

        {/* STEP 0 — Body region */}
        {step === 0 && (
          <div>
            <h2 style={headingStyle}>Where is your pain or problem?</h2>
            <p style={subStyle}>Select all that apply</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "1.5rem 0" }}>
              {BODY_REGIONS.map(r => (
                <button key={r.id} onClick={() => toggle("region", r.id)} style={chipStyle(form.region.includes(r.id))}>
                  <span style={{ fontWeight: 500, fontSize: "14px" }}>{r.label}</span>
                  <span style={{ fontSize: "11px", opacity: 0.6, display: "block" }}>{r.sub}</span>
                </button>
              ))}
            </div>
            <textarea
              placeholder="Any additional detail? (e.g. 'left knee', 'both shoulders')"
              value={form.regionDetail}
              onChange={e => set("regionDetail", e.target.value)}
              style={textareaStyle}
              rows={2}
            />
            <NavRow onNext={() => setStep(1)} nextDisabled={form.region.length === 0} />
          </div>
        )}

        {/* STEP 1 — Pain details */}
        {step === 1 && (
          <div>
            <h2 style={headingStyle}>Tell us about your pain</h2>

            <label style={labelStyle}>Pain score right now (0 = none, 10 = worst imaginable)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "0.75rem 0 1.5rem" }}>
              <input type="range" min={0} max={10} value={form.painScore}
                onChange={e => set("painScore", Number(e.target.value))}
                style={{ flex: 1, accentColor: "#4ade80" }}
              />
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 700, color: form.painScore >= 7 ? "#f87171" : form.painScore >= 4 ? "#fbbf24" : "#4ade80", minWidth: "36px", textAlign: "right" }}>
                {form.painScore}
              </span>
            </div>

            <label style={labelStyle}>How does it behave? (select all that apply)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "0.75rem 0 1.5rem" }}>
              {PAIN_BEHAVIOURS.map(b => (
                <button key={b} onClick={() => toggle("painBehaviour", b)} style={tagStyle(form.painBehaviour.includes(b))}>{b}</button>
              ))}
            </div>

            <label style={labelStyle}>How long have you had this problem?</label>
            <select value={form.duration} onChange={e => set("duration", e.target.value)} style={selectStyle}>
              <option value="">Select duration</option>
              <option>Less than 1 week</option>
              <option>1-4 weeks</option>
              <option>1-3 months</option>
              <option>3-6 months</option>
              <option>6-12 months</option>
              <option>More than 1 year</option>
            </select>

            <NavRow onBack={() => setStep(0)} onNext={() => setStep(2)} nextDisabled={!form.duration || form.painBehaviour.length === 0} />
          </div>
        )}

        {/* STEP 2 — History & red flags */}
        {step === 2 && (
          <div>
            <h2 style={headingStyle}>History & safety check</h2>

            <label style={labelStyle}>What makes it worse? (select all that apply)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "0.75rem 0 1.5rem" }}>
              {AGGRAVATING.map(a => (
                <button key={a} onClick={() => toggle("aggravating", a)} style={tagStyle(form.aggravating.includes(a))}>{a}</button>
              ))}
            </div>

            <label style={labelStyle}>What helps relieve it?</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "0.75rem 0 1.5rem" }}>
              {RELIEVING.map(r => (
                <button key={r} onClick={() => toggle("relieving", r)} style={tagStyle(form.relieving.includes(r))}>{r}</button>
              ))}
            </div>

            <label style={labelStyle}>Any previous treatment for this problem?</label>
            <input type="text" placeholder="e.g. physio, surgery, injections, none"
              value={form.previousTreatment} onChange={e => set("previousTreatment", e.target.value)}
              style={inputStyle}
            />

            <label style={{ ...labelStyle, color: "#f87171", marginTop: "1.5rem" }}>
              Safety screen — do any of these apply? (select if yes)
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "0.75rem 0 1.5rem" }}>
              {RED_FLAGS.map(r => (
                <button key={r} onClick={() => toggle("redFlags", r)}
                  style={{ ...tagStyle(form.redFlags.includes(r)), textAlign: "left", borderColor: form.redFlags.includes(r) ? "#f87171" : "#1e2a38", color: form.redFlags.includes(r) ? "#f87171" : "#9ca3af" }}>
                  {r}
                </button>
              ))}
            </div>

            <NavRow onBack={() => setStep(1)} onNext={() => setStep(3)} />
          </div>
        )}

        {/* STEP 3 — Function */}
        {step === 3 && (
          <div>
            <h2 style={headingStyle}>How does it affect you?</h2>

            <label style={labelStyle}>What cannot you do (or find hard to do) because of this?</label>
            <textarea
              placeholder="e.g. Cannot sit at desk for more than 30 mins, Cannot run, Hard to sleep on side"
              value={form.functionalLimits}
              onChange={e => set("functionalLimits", e.target.value)}
              style={textareaStyle}
              rows={3}
            />

            <label style={labelStyle}>Age (optional)</label>
            <input type="number" placeholder="e.g. 42" value={form.age}
              onChange={e => set("age", e.target.value)} style={{ ...inputStyle, maxWidth: "120px" }}
            />

            <label style={{ ...labelStyle, marginTop: "1.25rem" }}>Activity level</label>
            <select value={form.activityLevel} onChange={e => set("activityLevel", e.target.value)} style={selectStyle}>
              <option value="">Select</option>
              <option>Sedentary (mostly sitting)</option>
              <option>Lightly active (occasional walking / movement)</option>
              <option>Moderately active (exercise 2-3x/week)</option>
              <option>Very active (exercise 4+ times/week)</option>
              <option>Athlete / competitive sport</option>
            </select>

            <NavRow onBack={() => setStep(2)} onNext={() => setStep(4)} />
          </div>
        )}

        {/* STEP 4 — Goals */}
        {step === 4 && (
          <div>
            <h2 style={headingStyle}>What are your goals?</h2>
            <p style={subStyle}>What would a successful outcome look like for you?</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "1.5rem 0" }}>
              {GOALS.map(g => (
                <button key={g} onClick={() => toggle("goals", g)} style={chipStyle(form.goals.includes(g))}>
                  <span style={{ fontSize: "13px" }}>{g}</span>
                </button>
              ))}
            </div>

            <NavRow
              onBack={() => setStep(3)}
              nextLabel={loading ? "Generating..." : "Generate my program"}
              onNext={submit}
              nextDisabled={form.goals.length === 0 || loading}
              nextStyle={{ background: "#4ade80", color: "#0d1117", fontWeight: 600 }}
            />
            {error && <p style={{ color: "#f87171", fontSize: "13px", marginTop: "1rem" }}>{error}</p>}
          </div>
        )}

        {/* STEP 5 — Result */}
        {step === 5 && result && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "20px" }}>✦</span>
              <h2 style={{ ...headingStyle, margin: 0 }}>Your personalised program</h2>
            </div>
            <div style={{
              background: "#0d1117",
              border: "1px solid #1e2a38",
              borderRadius: "10px",
              padding: "1.5rem",
              fontSize: "14px",
              lineHeight: "1.8",
              color: "#c9c6c0",
              whiteSpace: "pre-wrap",
              maxHeight: "420px",
              overflowY: "auto",
            }}>
              {result}
            </div>
            <button
              onClick={() => { setStep(0); setForm(initialForm); setResult(null); }}
              style={{ ...tagStyle(false), marginTop: "1.5rem", padding: "10px 20px" }}
            >
              Start a new assessment
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: "center", padding: "2rem 0", color: "#4ade80" }}>
            <div style={{ fontSize: "28px", animation: "spin 1.2s linear infinite", display: "inline-block" }}>
              &#8635;
            </div>
            <p style={{ marginTop: "12px", fontSize: "14px", color: "#7a7975" }}>Generating your personalised program...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

      </div>

      {/* Disclaimer */}
      <p style={{ maxWidth: "560px", textAlign: "center", fontSize: "11px", color: "#4a4d52", marginTop: "1.5rem", lineHeight: 1.6 }}>
        AIphysio provides general wellness and exercise guidance only. It is not a substitute for professional physiotherapy assessment or medical advice. If you have red flag symptoms, seek urgent medical attention.
      </p>
    </div>
  );
}

const headingStyle = {
  fontFamily: "'Syne', sans-serif",
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#f0ede8",
  margin: "0 0 4px",
};

const subStyle = {
  fontSize: "13px",
  color: "#7a7975",
  margin: "0 0 1rem",
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 500,
  color: "#9ca3af",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: "6px",
};

const chipStyle = (active) => ({
  background: active ? "#162a1e" : "#0d1117",
  border: "1px solid " + (active ? "#4ade80" : "#1e2a38"),
  borderRadius: "10px",
  padding: "12px 14px",
  cursor: "pointer",
  textAlign: "left",
  color: active ? "#4ade80" : "#9ca3af",
  transition: "all 0.15s",
});

const tagStyle = (active) => ({
  background: active ? "#162a1e" : "transparent",
  border: "1px solid " + (active ? "#4ade80" : "#1e2a38"),
  borderRadius: "20px",
  padding: "6px 14px",
  cursor: "pointer",
  fontSize: "13px",
  color: active ? "#4ade80" : "#9ca3af",
  transition: "all 0.15s",
});

const inputStyle = {
  width: "100%",
  background: "#0d1117",
  border: "1px solid #1e2a38",
  borderRadius: "8px",
  padding: "10px 14px",
  color: "#e8e6e1",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  fontFamily: "'DM Sans', sans-serif",
  lineHeight: 1.6,
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
};

function NavRow({ onBack, onNext, nextDisabled, nextLabel, nextStyle }) {
  const label = nextLabel || "Next";
  const extraStyle = nextStyle || {};
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", gap: "10px" }}>
      {onBack ? (
        <button onClick={onBack} style={{ ...tagStyle(false), padding: "10px 20px" }}>Back</button>
      ) : <span />}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        style={{
          background: "#1e2a38",
          border: "1px solid #2d3d50",
          borderRadius: "20px",
          padding: "10px 24px",
          cursor: nextDisabled ? "not-allowed" : "pointer",
          fontSize: "14px",
          color: nextDisabled ? "#4a4d52" : "#e8e6e1",
          fontWeight: 500,
          opacity: nextDisabled ? 0.5 : 1,
          transition: "all 0.15s",
          ...extraStyle,
        }}
      >
        {label}
      </button>
    </div>
  );
}
