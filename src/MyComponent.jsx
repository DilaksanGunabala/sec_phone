import { useState, useEffect, useCallback } from "react";
import React from "react";

// ─── DESIGN TOKENS ───
const T = {
  bg: "#0A0E1A",
  surface: "#111827",
  card: "#1A2236",
  cardHover: "#1E2844",
  border: "#2A3550",
  accent: "#00D4AA",
  accentDim: "#00D4AA22",
  accentGlow: "#00D4AA44",
  danger: "#FF4D6A",
  dangerDim: "#FF4D6A22",
  warning: "#FFB547",
  warningDim: "#FFB54722",
  info: "#4D9EFF",
  infoDim: "#4D9EFF22",
  text: "#F1F5F9",
  textMuted: "#8896AB",
  textDim: "#4A5568",
  white: "#FFFFFF",
  gradient: "linear-gradient(135deg, #00D4AA, #00A3FF)",
  gradientDanger: "linear-gradient(135deg, #FF4D6A, #FF8A5C)",
};

// ─── ICONS (SVG inline) ───
const Icons = {
  shield: (c = T.accent, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  map: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  clock: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  alert: (c = T.danger, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  check: (c = T.accent, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  user: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  users: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  camera: (c = T.white, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  send: (c = T.accent, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  bell: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  scan: (c = T.accent, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/><path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
  home: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  menu: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  chevron: (c = T.textMuted, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  back: (c = T.text, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  location: (c = T.accent, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  calendar: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  chart: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  file: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  phone: (c = T.danger, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
  settings: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  msg: (c = T.textMuted, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  power: (c = T.danger, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 11-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>,
  mic: (c = T.white, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>,
};

// ─── ANIMATION KEYFRAMES ───
const styleId = "sgm-app-styles-v2";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Space+Mono:wght@400;700&display=swap');
    @keyframes sgm-fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
    @keyframes sgm-fadeIn { from { opacity:0 } to { opacity:1 } }
    @keyframes sgm-slideRight { from { opacity:0; transform:translateX(-30px) } to { opacity:1; transform:translateX(0) } }
    @keyframes sgm-slideLeft { from { opacity:0; transform:translateX(30px) } to { opacity:1; transform:translateX(0) } }
    @keyframes sgm-scaleIn { from { opacity:0; transform:scale(0.85) } to { opacity:1; transform:scale(1) } }
    @keyframes sgm-pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
    @keyframes sgm-breathe { 0%,100% { box-shadow:0 0 0 0 #00D4AA44 } 50% { box-shadow:0 0 0 12px #00D4AA00 } }
    @keyframes sgm-spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
    @keyframes sgm-scanLine { 0% { top:10% } 50% { top:85% } 100% { top:10% } }
    @keyframes sgm-sosPulse { 0%,100% { transform:scale(1); box-shadow:0 0 0 0 #FF4D6A66 } 50% { transform:scale(1.05); box-shadow:0 0 0 20px #FF4D6A00 } }
    .sgm-no-scrollbar::-webkit-scrollbar { display:none }
    .sgm-no-scrollbar { -ms-overflow-style:none; scrollbar-width:none }
  `;
  document.head.appendChild(style);
}

// ─── HELPERS ───
const Anim = ({ children, type = "sgm-fadeUp", delay = 0, duration = 0.45, style = {} }) => (
  <div style={{ animation: `${type} ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s both`, ...style }}>{children}</div>
);
const Badge = ({ text, color = T.accent, bg }) => (
  <span style={{ background: bg || color + "22", color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap" }}>{text}</span>
);
const Dot = ({ color = T.accent, pulse }) => (
  <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0, animation: pulse ? "sgm-pulse 2s infinite" : "none" }} />
);

/*
 * ─── PHONE FRAME (FIXED LAYOUT) ───
 * Architecture: flexbox column with 3 zones
 *   1. Status bar (fixed height, never scrolls)
 *   2. Content area (flex:1, scrollable)
 *   3. Tab bar (fixed height, never scrolls)
 * This ensures the tab bar ALWAYS stays at the bottom.
 */
const PHONE_W = 375;
const PHONE_H = 812;
const STATUS_H = 50;
const TAB_H = 72;

const PhoneFrame = ({ children, showTab, tabContent }) => (
  <div style={{ width: PHONE_W, height: PHONE_H, background: T.bg, borderRadius: 44, border: `3px solid ${T.border}`, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)", fontFamily: "'DM Sans', sans-serif" }}>
    {/* 1. Status bar — FIXED top, never scrolls */}
    <div style={{ height: STATUS_H, minHeight: STATUS_H, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", background: T.bg, zIndex: 10, flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: "'Space Mono', monospace" }}>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <div style={{ width: 16, height: 10, border: `1px solid ${T.textMuted}`, borderRadius: 2, position: "relative", overflow: "hidden" }}>
          <div style={{ width: "70%", height: "100%", background: T.accent, borderRadius: 1 }} />
        </div>
      </div>
    </div>
    {/* 2. Content area — SCROLLABLE, takes remaining space */}
    <div className="sgm-no-scrollbar" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", minHeight: 0 }}>
      {children}
    </div>
    {/* 3. Tab bar — FIXED bottom, never scrolls */}
    {showTab && (
      <div style={{ height: TAB_H, minHeight: TAB_H, padding: "4px 12px 8px", background: T.bg, zIndex: 10, flexShrink: 0, borderTop: `1px solid ${T.border}33` }}>
        {tabContent}
      </div>
    )}
  </div>
);

// ─── TAB BAR ───
const TabBar = ({ role, active, onTab }) => {
  const tabs = role === "guard"
    ? [["home", "Home", Icons.home], ["patrol", "Patrol", Icons.map], ["scan", "Scan", Icons.scan], ["schedule", "Schedule", Icons.calendar], ["menu", "More", Icons.menu]]
    : role === "admin"
    ? [["home", "Dashboard", Icons.home], ["schedule", "Schedule", Icons.calendar], ["incidents", "Incidents", Icons.alert], ["analytics", "Analytics", Icons.chart], ["menu", "More", Icons.menu]]
    : [["home", "Overview", Icons.home], ["incidents", "Incidents", Icons.alert], ["analytics", "Reports", Icons.chart], ["messages", "Messages", Icons.msg], ["menu", "More", Icons.menu]];

  return (
    <div style={{ display: "flex", height: "100%", background: T.surface, borderRadius: 20, border: `1px solid ${T.border}`, overflow: "hidden" }}>
      {tabs.map(([key, label, iconFn]) => {
        const isActive = active === key;
        return (
          <div key={key} onClick={() => onTab(key)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", transition: "all 0.2s", position: "relative" }}>
            {isActive && <div style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: 2, background: T.accent, borderRadius: "0 0 2px 2px" }} />}
            {iconFn(isActive ? T.accent : T.textDim, 20)}
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? T.accent : T.textDim, transition: "all 0.2s" }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ─── SCREEN: LOGIN ───
const LoginScreen = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("guard");
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: `linear-gradient(180deg, ${T.bg} 0%, #0D1525 100%)` }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <Anim delay={0}>
          <div style={{ width: 80, height: 80, borderRadius: 24, background: T.gradient, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 32px #00D4AA33" }}>{Icons.shield(T.white, 40)}</div>
        </Anim>
        <Anim delay={0.1}>
          <h1 style={{ color: T.text, fontSize: 28, fontWeight: 700, margin: 0, textAlign: "center" }}>SecureGuard</h1>
          <p style={{ color: T.textMuted, fontSize: 14, margin: "8px 0 32px", textAlign: "center" }}>Security Operations Platform</p>
        </Anim>
        <Anim delay={0.2} style={{ width: "100%" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 24, background: T.surface, borderRadius: 14, padding: 4 }}>
            {[["guard", "Guard"], ["admin", "Admin"], ["client", "Client"]].map(([k, v]) => (
              <button key={k} onClick={() => setRole(k)} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s", background: role === k ? T.gradient : "transparent", color: role === k ? T.white : T.textMuted }}>{v}</button>
            ))}
          </div>
          {["Email or ID", "Password"].map((ph, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <input placeholder={ph} type={i === 1 ? "password" : "text"} defaultValue={i === 0 ? (role === "guard" ? "john.guard@demo.com" : role === "admin" ? "admin@demo.com" : "client@demo.com") : "••••••••"} style={{ width: "100%", padding: "16px 18px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, color: T.text, fontSize: 15, outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
            </div>
          ))}
        </Anim>
        <Anim delay={0.3} style={{ width: "100%" }}>
          <button onClick={() => { setLoading(true); setTimeout(() => onLogin(role), 1200); }} style={{ width: "100%", padding: "16px 0", background: loading ? T.card : T.gradient, border: "none", borderRadius: 14, color: T.white, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px #00D4AA33" }}>
            {loading ? <span style={{ animation: "sgm-spin 1s linear infinite", display: "inline-block" }}>⟳</span> : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>
          <p style={{ color: T.textDim, fontSize: 12, textAlign: "center", marginTop: 16 }}>Forgot password? <span style={{ color: T.accent, cursor: "pointer" }}>Reset</span></p>
        </Anim>
      </div>
    </div>
  );
};

// ─── SCREEN: GUARD HOME ───
const GuardHome = ({ onNav, clockedIn, onClockIn }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);
  const shiftTime = clockedIn ? `${Math.floor((Date.now() - clockedIn) / 60000)}m` : "--";
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <Anim delay={0}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
        <div><p style={{ color: T.textMuted, fontSize: 13, margin: 0 }}>Good {time.getHours() < 12 ? "Morning" : time.getHours() < 17 ? "Afternoon" : "Evening"}</p><h2 style={{ color: T.text, fontSize: 22, fontWeight: 700, margin: "4px 0 0" }}>John Carter</h2></div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div onClick={() => onNav("notifications")} style={{ cursor: "pointer", position: "relative" }}>{Icons.bell(T.textMuted)}<span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: T.danger, border: `2px solid ${T.bg}` }} /></div>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: T.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: T.white }}>JC</div>
        </div>
      </div></Anim>
      <Anim delay={0.1}>
        <div onClick={onClockIn} style={{ background: clockedIn ? "linear-gradient(135deg, #0A2E1F, #0D1A14)" : T.card, borderRadius: 24, padding: 24, marginTop: 8, cursor: "pointer", border: `1px solid ${clockedIn ? T.accent + "44" : T.border}`, animation: clockedIn ? "sgm-breathe 3s infinite" : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><p style={{ color: T.textMuted, fontSize: 12, margin: 0, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>{clockedIn ? "On Duty" : "Off Duty"}</p><h3 style={{ color: T.text, fontSize: 32, fontWeight: 700, margin: "8px 0 4px", fontFamily: "'Space Mono', monospace" }}>{time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</h3><p style={{ color: T.textMuted, fontSize: 13, margin: 0 }}>{clockedIn ? `Shift duration: ${shiftTime}` : "Tap to clock in"}</p></div>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: clockedIn ? T.gradientDanger : T.gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 24px ${clockedIn ? "#FF4D6A33" : "#00D4AA33"}`, flexShrink: 0 }}>{Icons.power(T.white, 28)}</div>
          </div>
          {clockedIn && <div style={{ marginTop: 16, padding: "12px 16px", background: T.accentDim, borderRadius: 12, display: "flex", alignItems: "center", gap: 10, animation: "sgm-fadeIn 0.5s" }}>{Icons.location(T.accent, 16)}<span style={{ color: T.accent, fontSize: 12, fontWeight: 600 }}>GPS Verified — Westfield Mall, Level 2</span></div>}
        </div>
      </Anim>
      <Anim delay={0.15}><div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        {[{ label: "Today's Site", value: "Westfield Mall", icon: Icons.location(T.accent, 16) }, { label: "Shift Time", value: "06:00 - 14:00", icon: Icons.clock(T.info, 16) }].map((item, i) => (
          <div key={i} style={{ flex: 1, background: T.card, borderRadius: 16, padding: 16, border: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>{item.icon}<span style={{ color: T.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</span></div>
            <p style={{ color: T.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div></Anim>
      <Anim delay={0.2}><h3 style={{ color: T.text, fontSize: 16, fontWeight: 600, margin: "24px 0 12px" }}>Quick Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[{ label: "Start Patrol", icon: Icons.map(T.accent), color: T.accent, bg: T.accentDim, nav: "patrol" }, { label: "Report Incident", icon: Icons.alert(T.danger), color: T.danger, bg: T.dangerDim, nav: "incident" }, { label: "Scan Checkpoint", icon: Icons.scan(T.info), color: T.info, bg: T.infoDim, nav: "scan" }, { label: "Messages", icon: Icons.msg(T.warning), color: T.warning, bg: T.warningDim, nav: "messages" }].map((a, i) => (
            <div key={i} onClick={() => onNav(a.nav)} style={{ background: T.card, borderRadius: 18, padding: 20, cursor: "pointer", border: `1px solid ${T.border}`, transition: "all 0.25s", display: "flex", flexDirection: "column", gap: 12 }} onMouseEnter={e => { e.currentTarget.style.borderColor = a.color + "66"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{a.icon}</div>
              <span style={{ color: T.text, fontSize: 13, fontWeight: 600 }}>{a.label}</span>
            </div>
          ))}
        </div>
      </Anim>
      <Anim delay={0.3}>
        <div onClick={() => onNav("sos")} style={{ marginTop: 20, background: "linear-gradient(135deg, #3A0A15, #2A0A0F)", borderRadius: 18, padding: 18, cursor: "pointer", border: "1px solid #FF4D6A33", display: "flex", alignItems: "center", gap: 16, animation: "sgm-sosPulse 3s infinite" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.gradientDanger, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{Icons.phone(T.white, 24)}</div>
          <div><p style={{ color: T.danger, fontSize: 15, fontWeight: 700, margin: 0 }}>SOS Emergency</p><p style={{ color: T.textMuted, fontSize: 12, margin: "4px 0 0" }}>Tap to alert all supervisors immediately</p></div>
        </div>
      </Anim>
      <Anim delay={0.35}><h3 style={{ color: T.text, fontSize: 16, fontWeight: 600, margin: "24px 0 12px" }}>Today's Tasks</h3>
        {[{ task: "Patrol Route A — Main Entrance", time: "07:00", status: "done" }, { task: "Checkpoint Scan — Parking B2", time: "08:30", status: "done" }, { task: "Patrol Route B — Food Court", time: "10:00", status: "active" }, { task: "Fire Exit Inspection", time: "11:30", status: "pending" }, { task: "Patrol Route C — Loading Dock", time: "13:00", status: "pending" }].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${T.border}22` }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: t.status === "done" ? T.accentDim : t.status === "active" ? T.infoDim : T.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{t.status === "done" ? Icons.check(T.accent, 16) : t.status === "active" ? <Dot color={T.info} pulse /> : Icons.clock(T.textDim, 14)}</div>
            <div style={{ flex: 1, minWidth: 0 }}><p style={{ color: t.status === "pending" ? T.textMuted : T.text, fontSize: 13, fontWeight: 500, margin: 0, textDecoration: t.status === "done" ? "line-through" : "none", opacity: t.status === "done" ? 0.6 : 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.task}</p><p style={{ color: T.textDim, fontSize: 11, margin: "2px 0 0" }}>{t.time}</p></div>
            <Badge text={t.status} color={t.status === "done" ? T.accent : t.status === "active" ? T.info : T.textDim} />
          </div>
        ))}
      </Anim>
    </div>
  );
};

// ─── SCREEN: PATROL ───
const PatrolScreen = ({ onBack }) => {
  const [scanned, setScanned] = useState([]);
  const checkpoints = [{ id: 1, name: "Main Entrance", zone: "Ground Floor" }, { id: 2, name: "Parking B2", zone: "Basement" }, { id: 3, name: "Food Court East", zone: "Level 1" }, { id: 4, name: "Emergency Exit C", zone: "Level 1" }, { id: 5, name: "Loading Dock", zone: "Ground Floor" }, { id: 6, name: "Server Room", zone: "Basement" }];
  const progress = (scanned.length / checkpoints.length) * 100;
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <Anim><div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
        <div onClick={onBack} style={{ cursor: "pointer", width: 36, height: 36, borderRadius: 12, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.back()}</div>
        <h2 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0, flex: 1 }}>Patrol Tour</h2>
        <Badge text={`${scanned.length}/${checkpoints.length}`} color={T.accent} />
      </div></Anim>
      <Anim delay={0.1}><div style={{ height: 160, borderRadius: 20, background: "linear-gradient(135deg, #0D1F2D, #152238)", border: `1px solid ${T.border}`, marginTop: 8, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "radial-gradient(circle at 30% 40%, #00D4AA 1px, transparent 1px), radial-gradient(circle at 70% 60%, #4D9EFF 1px, transparent 1px)", backgroundSize: "40px 40px, 60px 60px" }} />
        <div style={{ position: "absolute", top: "40%", left: "35%", width: 14, height: 14, borderRadius: "50%", background: T.accent, border: `3px solid ${T.bg}`, animation: "sgm-breathe 2s infinite", zIndex: 2 }} />
        {[{ t: "25%", l: "20%" }, { t: "60%", l: "50%" }, { t: "30%", l: "70%" }, { t: "70%", l: "25%" }, { t: "50%", l: "80%" }, { t: "75%", l: "65%" }].map((p, i) => (
          <div key={i} style={{ position: "absolute", top: p.t, left: p.l, width: 10, height: 10, borderRadius: "50%", background: scanned.includes(i + 1) ? T.accent : T.textDim, border: `2px solid ${T.bg}`, transition: "all 0.4s" }} />
        ))}
        <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.6)", borderRadius: 8, padding: "5px 10px", display: "flex", alignItems: "center", gap: 6 }}><Dot color={T.accent} pulse /><span style={{ color: T.text, fontSize: 11, fontWeight: 500 }}>Live Tracking</span></div>
      </div></Anim>
      <Anim delay={0.15}><div style={{ marginTop: 12, background: T.card, borderRadius: 14, padding: 14, border: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: T.textMuted, fontSize: 12 }}>Patrol Progress</span><span style={{ color: T.accent, fontSize: 14, fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>{Math.round(progress)}%</span></div>
        <div style={{ height: 6, borderRadius: 3, background: T.surface, overflow: "hidden" }}><div style={{ height: "100%", width: `${progress}%`, background: T.gradient, borderRadius: 3, transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)" }} /></div>
      </div></Anim>
      <h3 style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "14px 0 10px" }}>Checkpoints</h3>
      {checkpoints.map((cp, i) => {
        const done = scanned.includes(cp.id);
        return (<Anim key={cp.id} delay={0.2 + i * 0.04}><div onClick={() => !done && setScanned(p => [...p, cp.id])} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: done ? T.accentDim : T.card, borderRadius: 14, marginBottom: 8, cursor: done ? "default" : "pointer", border: `1px solid ${done ? T.accent + "44" : T.border}`, transition: "all 0.3s" }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: done ? T.accent : T.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{done ? Icons.check(T.white, 16) : Icons.scan(T.textDim, 16)}</div>
          <div style={{ flex: 1, minWidth: 0 }}><p style={{ color: T.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{cp.name}</p><p style={{ color: T.textMuted, fontSize: 11, margin: "2px 0 0" }}>{cp.zone}</p></div>
          {done ? <span style={{ color: T.accent, fontSize: 10, fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>✓ Done</span> : <span style={{ color: T.textDim, fontSize: 11, flexShrink: 0 }}>Tap to scan</span>}
        </div></Anim>);
      })}
    </div>
  );
};

// ─── SCREEN: INCIDENT REPORT ───
const IncidentScreen = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const types = [{ label: "Trespassing", icon: "🚷", color: T.danger }, { label: "Property Damage", icon: "🏚️", color: T.warning }, { label: "Theft", icon: "💰", color: T.danger }, { label: "Suspicious Activity", icon: "👁️", color: T.warning }, { label: "Medical Emergency", icon: "🏥", color: T.danger }, { label: "Fire / Safety", icon: "🔥", color: T.danger }, { label: "Maintenance Issue", icon: "🔧", color: T.info }, { label: "Other", icon: "📋", color: T.textMuted }];

  if (submitted) return (
    <div style={{ minHeight: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <Anim type="sgm-scaleIn"><div style={{ width: 100, height: 100, borderRadius: "50%", background: T.accentDim, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>{Icons.check(T.accent, 48)}</div></Anim>
      <Anim delay={0.2}><h2 style={{ color: T.text, fontSize: 22, fontWeight: 700, textAlign: "center", margin: 0 }}>Report Submitted</h2></Anim>
      <Anim delay={0.3}><p style={{ color: T.textMuted, fontSize: 14, textAlign: "center", marginTop: 8 }}>Incident #INC-2847 filed. Supervisors notified.</p></Anim>
      <Anim delay={0.4}><button onClick={onBack} style={{ marginTop: 32, padding: "14px 32px", background: T.gradient, border: "none", borderRadius: 14, color: T.white, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Back to Home</button></Anim>
    </div>
  );

  return (
    <div style={{ padding: "0 20px 20px" }}>
      <Anim><div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
        <div onClick={step > 0 ? () => setStep(s => s - 1) : onBack} style={{ cursor: "pointer", width: 36, height: 36, borderRadius: 12, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.back()}</div>
        <h2 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0 }}>Report Incident</h2>
      </div></Anim>
      <Anim delay={0.1}><div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {["Type", "Details", "Media"].map((s, i) => (<div key={i} style={{ flex: 1, textAlign: "center" }}><div style={{ height: 3, borderRadius: 2, background: i <= step ? T.accent : T.surface, transition: "all 0.3s", marginBottom: 6 }} /><span style={{ fontSize: 11, color: i <= step ? T.accent : T.textDim, fontWeight: 600 }}>{s}</span></div>))}
      </div></Anim>
      {step === 0 && <Anim delay={0.15}><h3 style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "16px 0 10px" }}>Select Incident Type</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {types.map((t, i) => (<div key={i} onClick={() => { setSelected(t.label); setTimeout(() => setStep(1), 300); }} style={{ background: selected === t.label ? t.color + "22" : T.card, border: `1px solid ${selected === t.label ? t.color + "66" : T.border}`, borderRadius: 16, padding: 16, cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}><span style={{ fontSize: 26 }}>{t.icon}</span><span style={{ color: T.text, fontSize: 12, fontWeight: 600, textAlign: "center" }}>{t.label}</span></div>))}
        </div></Anim>}
      {step === 1 && <Anim delay={0.1} type="sgm-slideLeft"><h3 style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "16px 0 10px" }}>Incident Details</h3>
        <div style={{ background: T.card, borderRadius: 14, padding: 14, border: `1px solid ${T.border}`, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>{Icons.location(T.accent, 14)}<span style={{ color: T.accent, fontSize: 12, fontWeight: 600 }}>Westfield Mall, Level 1</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>{Icons.clock(T.info, 14)}<span style={{ color: T.info, fontSize: 12, fontWeight: 600 }}>{new Date().toLocaleString()}</span></div>
        </div>
        <label style={{ color: T.textMuted, fontSize: 12, marginBottom: 6, display: "block" }}>Severity</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["Low", "Medium", "High", "Critical"].map((s, i) => (<button key={s} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${[T.accent, T.warning, T.danger, "#FF0044"][i]}33`, background: i === 2 ? T.dangerDim : T.surface, color: [T.accent, T.warning, T.danger, "#FF0044"][i], fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{s}</button>))}
        </div>
        <label style={{ color: T.textMuted, fontSize: 12, marginBottom: 6, display: "block" }}>Description</label>
        <textarea placeholder="Describe what happened..." style={{ width: "100%", height: 80, padding: 14, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, color: T.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif", resize: "none", outline: "none", boxSizing: "border-box" }} defaultValue="Unidentified individual spotted near emergency exit C." />
        <button onClick={() => setStep(2)} style={{ width: "100%", padding: "14px 0", background: T.gradient, border: "none", borderRadius: 14, color: T.white, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginTop: 14 }}>Next: Add Media</button>
      </Anim>}
      {step === 2 && <Anim delay={0.1} type="sgm-slideLeft"><h3 style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "16px 0 10px" }}>Attach Evidence</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[{ icon: Icons.camera(T.white, 22), label: "Photo", bg: T.gradient }, { icon: <span style={{ fontSize: 18 }}>🎥</span>, label: "Video", bg: "linear-gradient(135deg, #4D9EFF, #0066FF)" }, { icon: Icons.mic(T.white, 22), label: "Audio", bg: "linear-gradient(135deg, #FFB547, #FF8A00)" }].map((m, i) => (
            <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{m.icon}</div>
              <span style={{ color: T.textMuted, fontSize: 11 }}>{m.label}</span>
            </div>))}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
          {["📷 IMG_001.jpg", "📷 IMG_002.jpg"].map((f, i) => (<div key={i} style={{ background: T.surface, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 11, color: T.text }}>{f}</span><span style={{ color: T.danger, cursor: "pointer", fontSize: 14, lineHeight: 1 }}>×</span></div>))}
        </div>
        <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: "16px 0", background: T.gradientDanger, border: "none", borderRadius: 14, color: T.white, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px #FF4D6A33" }}>Submit Incident Report</button>
      </Anim>}
    </div>
  );
};

// ─── SCREEN: SCAN ───
const ScanScreen = ({ onBack }) => {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  useEffect(() => { if (scanning) { const t = setTimeout(() => { setScanning(false); setResult({ name: "Checkpoint B2-04", zone: "Parking Level B2", time: new Date().toLocaleTimeString() }); }, 2500); return () => clearTimeout(t); } }, [scanning]);
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <Anim><div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
        <div onClick={onBack} style={{ cursor: "pointer", width: 36, height: 36, borderRadius: 12, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.back()}</div>
        <h2 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0 }}>Scan Checkpoint</h2>
      </div></Anim>
      <Anim delay={0.1}><div style={{ marginTop: 8, height: 280, borderRadius: 24, background: "#000", overflow: "hidden", position: "relative", border: `2px solid ${result ? T.accent : T.border}` }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #1a1a2e 0%, #000 100%)" }} />
        {scanning && <>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 160, height: 160, border: `2px solid ${T.accent}`, borderRadius: 16 }}>
            {[["0","0","borderTop","borderLeft","8px 0 0 0"],["0","","borderTop","borderRight","0 8px 0 0"],["","0","borderBottom","borderLeft","0 0 0 8px"],["","","borderBottom","borderRight","0 0 8px 0"]].map(([t,l,bv,bh,br],i)=>(<div key={i} style={{ position:"absolute",...(t===""?{bottom:0}:{top:0}),...(l===""?{right:0}:{left:0}),width:26,height:26,[bv]:`3px solid ${T.accent}`,[bh]:`3px solid ${T.accent}`,borderRadius:br }} />))}
          </div>
          <div style={{ position: "absolute", left: "calc(50% - 70px)", width: 140, height: 2, background: T.accent, boxShadow: `0 0 20px ${T.accent}`, animation: "sgm-scanLine 2s ease-in-out infinite", opacity: 0.8 }} />
        </>}
        {result && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", animation: "sgm-scaleIn 0.4s" }}><div style={{ width: 80, height: 80, borderRadius: "50%", background: T.accentDim, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.check(T.accent, 40)}</div></div>}
        <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, textAlign: "center" }}><span style={{ color: T.white, fontSize: 13, background: "rgba(0,0,0,0.7)", padding: "6px 14px", borderRadius: 20 }}>{scanning ? "Hold phone near NFC tag..." : "Checkpoint scanned!"}</span></div>
      </div></Anim>
      {result && <Anim delay={0.2}>
        <div style={{ marginTop: 14, background: T.card, borderRadius: 18, padding: 16, border: `1px solid ${T.accent}44` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>{Icons.check(T.accent, 18)}<span style={{ color: T.accent, fontSize: 14, fontWeight: 700 }}>Scan Successful</span></div>
          {[["Checkpoint", result.name], ["Zone", result.zone], ["Time", result.time], ["GPS", "6.9271° N, 79.8612° E"]].map(([k, v], i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0" }}><span style={{ color: T.textMuted, fontSize: 13 }}>{k}</span><span style={{ color: T.text, fontSize: 13, fontWeight: 600 }}>{v}</span></div>))}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button onClick={() => { setScanning(true); setResult(null); }} style={{ flex: 1, padding: "13px 0", background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, color: T.text, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Scan Next</button>
          <button onClick={onBack} style={{ flex: 1, padding: "13px 0", background: T.gradient, border: "none", borderRadius: 14, color: T.white, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Done</button>
        </div>
      </Anim>}
      <Anim delay={0.3}><div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        {["NFC Tap", "QR Scan", "Manual ID"].map((m, i) => (<button key={m} style={{ flex: 1, padding: "12px 0", background: i === 0 ? T.accentDim : T.surface, border: `1px solid ${i === 0 ? T.accent + "44" : T.border}`, borderRadius: 12, color: i === 0 ? T.accent : T.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{m}</button>))}
      </div></Anim>
    </div>
  );
};

// ─── SCREEN: MESSAGES ───
const MessagesScreen = ({ onBack }) => {
  const [msg, setMsg] = useState("");
  const messages = [
    { from: "ops", text: "All guards: Fire drill at 11:00 AM. Stand by.", time: "08:15", type: "broadcast" },
    { from: "me", text: "Copy that, will inform visitors.", time: "08:17" },
    { from: "ops", text: "John, extra pass through loading dock. Motion alert.", time: "09:30" },
    { from: "me", text: "On my way to loading dock now.", time: "09:32" },
    { from: "ops", text: "Good, keep us posted.", time: "09:33" },
    { from: "me", text: "Loading dock clear. No issues found.", time: "09:48" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", flexShrink: 0 }}>
        <div onClick={onBack} style={{ cursor: "pointer", width: 36, height: 36, borderRadius: 12, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.back()}</div>
        <div style={{ flex: 1 }}><h2 style={{ color: T.text, fontSize: 18, fontWeight: 700, margin: 0 }}>HQ Operations</h2><p style={{ color: T.accent, fontSize: 11, margin: 0, display: "flex", alignItems: "center", gap: 4 }}><Dot color={T.accent} /> Online</p></div>
        {Icons.phone(T.textMuted, 18)}
      </div>
      <div className="sgm-no-scrollbar" style={{ flex: 1, padding: "0 20px", overflowY: "auto", minHeight: 0 }}>
        {messages.map((m, i) => (
          <Anim key={i} delay={i * 0.07} type={m.from === "me" ? "sgm-slideLeft" : "sgm-slideRight"}>
            <div style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start", marginBottom: 10 }}>
              <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.from === "me" ? T.accent + "22" : T.card, border: `1px solid ${m.from === "me" ? T.accent + "33" : T.border}` }}>
                {m.type === "broadcast" && <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>{Icons.bell(T.warning, 12)}<span style={{ color: T.warning, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Broadcast</span></div>}
                <p style={{ color: T.text, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{m.text}</p>
                <p style={{ color: T.textDim, fontSize: 10, margin: "6px 0 0", textAlign: "right" }}>{m.time}</p>
              </div>
            </div>
          </Anim>
        ))}
      </div>
      <div style={{ padding: "10px 20px 12px", background: T.bg, flexShrink: 0, borderTop: `1px solid ${T.border}22` }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>{Icons.camera(T.textMuted, 18)}</div>
          <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type message..." style={{ flex: 1, padding: "12px 16px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, color: T.text, fontSize: 14, outline: "none", fontFamily: "'DM Sans', sans-serif", minWidth: 0 }} />
          <div style={{ width: 40, height: 40, borderRadius: 14, background: T.gradient, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>{Icons.send(T.white, 16)}</div>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN: SCHEDULE ───
const ScheduleScreen = ({ onBack }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [sel, setSel] = useState(2);
  const shifts = [[{ site: "Westfield Mall", time: "06:00 - 14:00", status: "completed" }], [{ site: "Hilton Hotel", time: "14:00 - 22:00", status: "completed" }], [{ site: "Westfield Mall", time: "06:00 - 14:00", status: "active" }], [{ site: "Tech Park Office", time: "22:00 - 06:00", status: "upcoming" }], [{ site: "Westfield Mall", time: "06:00 - 14:00", status: "upcoming" }], [], [{ site: "Hilton Hotel", time: "14:00 - 22:00", status: "upcoming" }]];
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <Anim><div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}><div onClick={onBack} style={{ cursor: "pointer", width: 36, height: 36, borderRadius: 12, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.back()}</div><h2 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0 }}>My Schedule</h2></div></Anim>
      <Anim delay={0.1}><div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        {days.map((d, i) => (<div key={i} onClick={() => setSel(i)} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 14, cursor: "pointer", background: sel === i ? T.accent : T.card, border: `1px solid ${sel === i ? T.accent : T.border}`, transition: "all 0.2s" }}><p style={{ color: sel === i ? T.bg : T.textMuted, fontSize: 10, margin: 0, fontWeight: 600 }}>{d}</p><p style={{ color: sel === i ? T.bg : T.text, fontSize: 16, fontWeight: 700, margin: "4px 0 0" }}>{24 + i}</p>{shifts[i]?.length > 0 && <div style={{ width: 4, height: 4, borderRadius: "50%", background: sel === i ? T.bg : T.accent, margin: "4px auto 0" }} />}</div>))}
      </div></Anim>
      <Anim delay={0.2}><h3 style={{ color: T.text, fontSize: 16, fontWeight: 600, margin: "20px 0 12px" }}>{days[sel]}, March {24 + sel}</h3>
        {shifts[sel].length === 0 ? <div style={{ background: T.card, borderRadius: 16, padding: 32, textAlign: "center", border: `1px solid ${T.border}` }}><p style={{ color: T.textMuted, fontSize: 14, margin: 0 }}>No shifts — Day off 🎉</p></div>
        : shifts[sel].map((s, i) => (<div key={i} style={{ background: T.card, borderRadius: 18, padding: 18, border: `1px solid ${s.status === "active" ? T.accent + "44" : T.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ color: T.text, fontSize: 15, fontWeight: 700 }}>{s.site}</span><Badge text={s.status} color={s.status === "completed" ? T.accent : s.status === "active" ? T.info : T.warning} /></div>
          <div style={{ display: "flex", gap: 16 }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icons.clock(T.textMuted, 14)}<span style={{ color: T.textMuted, fontSize: 12 }}>{s.time}</span></div><div style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icons.location(T.textMuted, 14)}<span style={{ color: T.textMuted, fontSize: 12 }}>8 hrs</span></div></div>
        </div>))}
      </Anim>
    </div>
  );
};

// ─── SCREEN: ADMIN DASHBOARD ───
const AdminDashboard = ({ onNav }) => (
  <div style={{ padding: "0 20px 20px" }}>
    <Anim><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
      <div><p style={{ color: T.textMuted, fontSize: 13, margin: 0 }}>Admin Panel</p><h2 style={{ color: T.text, fontSize: 22, fontWeight: 700, margin: "4px 0 0" }}>Dashboard</h2></div>
      <div onClick={() => onNav("notifications")} style={{ cursor: "pointer", width: 40, height: 40, borderRadius: 14, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>{Icons.bell(T.textMuted)}<span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: T.danger }} /></div>
    </div></Anim>
    <Anim delay={0.1}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
      {[{ label: "Guards Active", value: "47", change: "+3", icon: Icons.users(T.accent), bg: T.accentDim, color: T.accent }, { label: "Sites Covered", value: "12", change: "All", icon: Icons.shield(T.info), bg: T.infoDim, color: T.info }, { label: "Incidents Today", value: "3", change: "+1", icon: Icons.alert(T.warning), bg: T.warningDim, color: T.warning }, { label: "Late Clock-ins", value: "2", change: "-1", icon: Icons.clock(T.danger), bg: T.dangerDim, color: T.danger }].map((s, i) => (
        <div key={i} style={{ background: T.card, borderRadius: 18, padding: 18, border: `1px solid ${T.border}` }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>{s.icon}</div>
          <p style={{ color: T.text, fontSize: 26, fontWeight: 700, margin: 0, fontFamily: "'Space Mono', monospace" }}>{s.value}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}><span style={{ color: T.textMuted, fontSize: 11 }}>{s.label}</span><Badge text={s.change} color={s.color} /></div>
        </div>))}
    </div></Anim>
    <Anim delay={0.15}><div style={{ marginTop: 14, height: 140, borderRadius: 20, background: "linear-gradient(135deg, #0D1F2D, #152238)", border: `1px solid ${T.border}`, overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle, #00D4AA 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      {[{ t: "30%", l: "25%", c: T.accent }, { t: "50%", l: "60%", c: T.accent }, { t: "70%", l: "40%", c: T.accent }, { t: "25%", l: "75%", c: T.warning }].map((g, i) => (<div key={i} style={{ position: "absolute", top: g.t, left: g.l, width: 10, height: 10, borderRadius: "50%", background: g.c, border: `2px solid ${T.bg}`, animation: g.c === T.warning ? "sgm-pulse 2s infinite" : "none" }} />))}
      <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.7)", padding: "7px 12px", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}><Dot color={T.accent} pulse /><span style={{ color: T.text, fontSize: 12, fontWeight: 500 }}>47 guards live • 12 sites</span></div>
    </div></Anim>
    <Anim delay={0.2}><h3 style={{ color: T.text, fontSize: 16, fontWeight: 600, margin: "16px 0 10px" }}>Management</h3>
      {[{ label: "Guard Scheduling", desc: "Create & manage shifts", icon: Icons.calendar(T.accent), nav: "schedule" }, { label: "Incident Reports", desc: "3 pending review", icon: Icons.file(T.warning), badge: "3", nav: "incidents" }, { label: "Guard Performance", desc: "Analytics & KPIs", icon: Icons.chart(T.info), nav: "analytics" }, { label: "Client Management", desc: "12 active clients", icon: Icons.users(T.accent), nav: "clients" }].map((item, i) => (
        <div key={i} onClick={() => onNav(item.nav)} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, background: T.card, borderRadius: 16, marginBottom: 8, cursor: "pointer", border: `1px solid ${T.border}`, transition: "border 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = T.accent + "44"} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}><p style={{ color: T.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{item.label}</p><p style={{ color: T.textMuted, fontSize: 12, margin: "2px 0 0" }}>{item.desc}</p></div>
          {item.badge && <Badge text={item.badge} color={T.warning} />}{Icons.chevron()}
        </div>))}
    </Anim>
    <Anim delay={0.25}><h3 style={{ color: T.text, fontSize: 16, fontWeight: 600, margin: "16px 0 10px" }}>Recent Activity</h3>
      {[{ text: "John Carter clocked in at Westfield Mall", time: "2m ago", color: T.accent }, { text: "Incident #2846 resolved — Hilton Hotel", time: "15m ago", color: T.info }, { text: "Sarah Lee missed checkpoint at Tech Park", time: "28m ago", color: T.warning }, { text: "Night shift started — 8 guards on duty", time: "1h ago", color: T.accent }].map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 3 ? `1px solid ${T.border}22` : "none" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 6, flexShrink: 0 }} />
          <div><p style={{ color: T.text, fontSize: 13, margin: 0 }}>{a.text}</p><p style={{ color: T.textDim, fontSize: 11, margin: "2px 0 0" }}>{a.time}</p></div>
        </div>))}
    </Anim>
  </div>
);

// ─── SCREEN: CLIENT PORTAL ───
const ClientPortal = ({ onNav }) => (
  <div style={{ padding: "0 20px 20px" }}>
    <Anim><div style={{ padding: "12px 0" }}><p style={{ color: T.textMuted, fontSize: 13, margin: 0 }}>Client Portal</p><h2 style={{ color: T.text, fontSize: 22, fontWeight: 700, margin: "4px 0 0" }}>Westfield Group</h2></div></Anim>
    <Anim delay={0.1}><div style={{ background: T.card, borderRadius: 20, padding: 18, border: `1px solid ${T.border}`, marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><h3 style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: 0 }}>Live Guard Status</h3><Badge text="3 Active" color={T.accent} /></div>
      {[{ name: "John Carter", zone: "Level 1 — Food Court", status: "patrolling" }, { name: "Sarah Lee", zone: "Parking Level B2", status: "stationary" }, { name: "Mike Ross", zone: "Main Entrance", status: "patrolling" }].map((g, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${T.border}22` : "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: T.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: T.white, flexShrink: 0 }}>{g.name.split(" ").map(n => n[0]).join("")}</div>
          <div style={{ flex: 1, minWidth: 0 }}><p style={{ color: T.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{g.name}</p><p style={{ color: T.textMuted, fontSize: 11, margin: "2px 0 0" }}>{g.zone}</p></div>
          <Badge text={g.status} color={g.status === "patrolling" ? T.accent : T.warning} />
        </div>))}
    </div></Anim>
    <Anim delay={0.15}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14 }}>
      {[{ label: "Patrol Rate", value: "97%", color: T.accent }, { label: "Incidents", value: "2", color: T.warning }, { label: "Attendance", value: "100%", color: T.info }].map((s, i) => (
        <div key={i} style={{ background: T.card, borderRadius: 16, padding: 14, border: `1px solid ${T.border}`, textAlign: "center" }}><p style={{ color: s.color, fontSize: 22, fontWeight: 700, margin: 0, fontFamily: "'Space Mono', monospace" }}>{s.value}</p><p style={{ color: T.textMuted, fontSize: 10, margin: "4px 0 0", textTransform: "uppercase" }}>{s.label}</p></div>))}
    </div></Anim>
    <Anim delay={0.2}><div style={{ marginTop: 14, background: T.card, borderRadius: 18, padding: 18, border: `1px solid ${T.border}` }}>
      <h3 style={{ color: T.text, fontSize: 14, fontWeight: 600, margin: "0 0 14px" }}>Patrol Completion — 7 Days</h3>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90 }}>
        {[85, 92, 88, 97, 95, 100, 97].map((v, i) => (<div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}><span style={{ color: T.textMuted, fontSize: 9 }}>{v}%</span><div style={{ width: "100%", height: `${v}%`, borderRadius: 6, background: v >= 95 ? T.gradient : `${T.accent}66`, transition: "height 0.5s", transitionDelay: `${i * 0.05}s` }} /><span style={{ color: T.textDim, fontSize: 9 }}>{["M", "T", "W", "T", "F", "S", "S"][i]}</span></div>))}
      </div>
    </div></Anim>
    <Anim delay={0.25}><h3 style={{ color: T.text, fontSize: 16, fontWeight: 600, margin: "16px 0 10px" }}>Recent Incidents</h3>
      {[{ id: "#2847", type: "Trespassing", time: "Today, 09:45", severity: "High", status: "Reviewing" }, { id: "#2846", type: "Maintenance", time: "Today, 07:20", severity: "Low", status: "Resolved" }].map((inc, i) => (
        <div key={i} style={{ background: T.card, borderRadius: 16, padding: 16, marginBottom: 10, border: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: T.text, fontSize: 14, fontWeight: 600 }}>{inc.id} — {inc.type}</span><Badge text={inc.status} color={inc.status === "Resolved" ? T.accent : T.warning} /></div>
          <div style={{ display: "flex", gap: 16 }}><span style={{ color: T.textMuted, fontSize: 12 }}>{inc.time}</span><Badge text={inc.severity} color={inc.severity === "High" ? T.danger : T.info} /></div>
        </div>))}
    </Anim>
  </div>
);

// ─── SCREEN: SOS ───
const SOSScreen = ({ onBack }) => {
  const [active, setActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  useEffect(() => { if (active && countdown > 0) { const t = setTimeout(() => setCountdown(c => c - 1), 1000); return () => clearTimeout(t); } }, [active, countdown]);
  return (
    <div style={{ minHeight: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, background: active ? "linear-gradient(180deg, #2A0A0F 0%, #0A0E1A 100%)" : T.bg, transition: "background 0.5s" }}>
      <Anim><div onClick={() => !active && setActive(true)} style={{ width: 180, height: 180, borderRadius: "50%", background: active ? T.gradientDanger : "linear-gradient(135deg, #3A1020, #2A0A15)", border: `3px solid ${active ? T.danger : T.danger + "66"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: active ? "default" : "pointer", animation: active ? "sgm-sosPulse 1s infinite" : "none" }}>
        {active && countdown > 0 ? <span style={{ color: T.white, fontSize: 60, fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>{countdown}</span>
        : active ? <div style={{ textAlign: "center" }}><div style={{ animation: "sgm-pulse 1s infinite" }}>{Icons.phone(T.white, 36)}</div><p style={{ color: T.white, fontSize: 12, marginTop: 8 }}>ALERT SENT</p></div>
        : <div style={{ textAlign: "center" }}>{Icons.phone(T.danger, 44)}<p style={{ color: T.danger, fontSize: 13, fontWeight: 700, marginTop: 8 }}>SOS</p></div>}
      </div></Anim>
      <Anim delay={0.2}><h2 style={{ color: T.text, fontSize: 22, fontWeight: 700, textAlign: "center", marginTop: 28, marginBottom: 0 }}>{active ? (countdown > 0 ? "Sending Alert..." : "Emergency Alert Active") : "Emergency SOS"}</h2>
        <p style={{ color: T.textMuted, fontSize: 13, textAlign: "center", marginTop: 8, maxWidth: 280 }}>{active ? "All supervisors notified with your live GPS location." : "Tap the button to send an emergency alert."}</p></Anim>
      <Anim delay={0.3}><button onClick={() => { setActive(false); setCountdown(3); onBack(); }} style={{ marginTop: 28, padding: "14px 32px", background: active ? T.card : T.surface, border: `1px solid ${T.border}`, borderRadius: 14, color: T.text, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{active ? "Cancel Alert" : "Go Back"}</button></Anim>
    </div>
  );
};

// ─── SCREEN: NOTIFICATIONS ───
const NotificationsScreen = ({ onBack }) => (
  <div style={{ padding: "0 20px 20px" }}>
    <Anim><div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
      <div onClick={onBack} style={{ cursor: "pointer", width: 36, height: 36, borderRadius: 12, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.back()}</div>
      <h2 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0, flex: 1 }}>Notifications</h2><Badge text="5 new" color={T.danger} />
    </div></Anim>
    {[{ title: "Late Clock-in Alert", desc: "Sarah Lee 15min late — Hilton Hotel", time: "5m ago", color: T.danger }, { title: "Patrol Complete", desc: "Route A done by John Carter — 100%", time: "12m ago", color: T.accent }, { title: "New Incident Report", desc: "Trespassing at Westfield Mall #2847", time: "45m ago", color: T.warning }, { title: "Shift Swap Request", desc: "Mike Ross wants Thursday swap", time: "1h ago", color: T.info }, { title: "System Update", desc: "App v2.4 with new patrol features", time: "3h ago", color: T.textMuted }].map((n, i) => (
      <Anim key={i} delay={0.1 + i * 0.06}><div style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: `1px solid ${T.border}22`, cursor: "pointer" }}>
        <div style={{ width: 40, height: 40, borderRadius: 14, background: n.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: n.color }} /></div>
        <div style={{ flex: 1, minWidth: 0 }}><p style={{ color: T.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{n.title}</p><p style={{ color: T.textMuted, fontSize: 12, margin: "4px 0 0" }}>{n.desc}</p><p style={{ color: T.textDim, fontSize: 11, margin: "4px 0 0" }}>{n.time}</p></div>
      </div></Anim>
    ))}
  </div>
);

// ─── SCREEN: SETTINGS ───
const SettingsScreen = ({ onLogout }) => (
  <div style={{ padding: "0 20px 20px" }}>
    <Anim><h2 style={{ color: T.text, fontSize: 22, fontWeight: 700, padding: "12px 0", margin: 0 }}>Settings</h2></Anim>
    {[{ label: "My Profile", icon: Icons.user(T.accent) }, { label: "Notifications", icon: Icons.bell(T.info) }, { label: "App Settings", icon: Icons.settings(T.textMuted) }, { label: "Help & Support", icon: Icons.msg(T.warning) }].map((item, i) => (
      <Anim key={i} delay={0.1 + i * 0.05}><div style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, background: T.card, borderRadius: 16, marginBottom: 8, border: `1px solid ${T.border}`, cursor: "pointer" }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
        <span style={{ flex: 1, color: T.text, fontSize: 14, fontWeight: 500 }}>{item.label}</span>{Icons.chevron()}
      </div></Anim>
    ))}
    <Anim delay={0.4}><button onClick={onLogout} style={{ width: "100%", marginTop: 20, padding: "14px 0", background: T.dangerDim, border: `1px solid ${T.danger}33`, borderRadius: 14, color: T.danger, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Sign Out</button></Anim>
  </div>
);

// ─── MAIN APP ───
export default function SecurityGuardApp() {
  const [role, setRole] = useState(null);
  const [screen, setScreen] = useState("home");
  const [clockedIn, setClockedIn] = useState(null);
  const [tab, setTab] = useState("home");

  const nav = useCallback((s) => setScreen(s), []);
  const goHome = useCallback(() => { setScreen("home"); setTab("home"); }, []);
  const handleTab = (t) => { setTab(t); setScreen(t === "menu" ? "settings" : t); };
  const handleLogout = () => { setRole(null); setScreen("home"); setTab("home"); setClockedIn(null); };

  const renderScreen = () => {
    if (!role) return <LoginScreen onLogin={(r) => { setRole(r); setScreen("home"); setTab("home"); }} />;
    switch (screen) {
      case "home": return role === "guard" ? <GuardHome onNav={nav} clockedIn={clockedIn} onClockIn={() => setClockedIn(clockedIn ? null : Date.now())} /> : role === "admin" ? <AdminDashboard onNav={nav} /> : <ClientPortal onNav={nav} />;
      case "patrol": return <PatrolScreen onBack={goHome} />;
      case "incident": return <IncidentScreen onBack={goHome} />;
      case "scan": return <ScanScreen onBack={goHome} />;
      case "messages": return <MessagesScreen onBack={goHome} />;
      case "schedule": return <ScheduleScreen onBack={goHome} />;
      case "sos": return <SOSScreen onBack={goHome} />;
      case "notifications": return <NotificationsScreen onBack={goHome} />;
      case "incidents": return <NotificationsScreen onBack={goHome} />;
      case "analytics": return <ClientPortal onNav={nav} />;
      case "settings": return <SettingsScreen onLogout={handleLogout} />;
      default: return <GuardHome onNav={nav} clockedIn={clockedIn} onClockIn={() => setClockedIn(clockedIn ? null : Date.now())} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050810", padding: 20, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ textAlign: "center", animation: "sgm-fadeIn 1s" }}>
          <h1 style={{ color: T.text, fontSize: 20, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>{Icons.shield(T.accent, 24)} SecureGuard</h1>
          <p style={{ color: T.textDim, fontSize: 12, marginTop: 6 }}>Security Guard Management Platform — Full Workflow Prototype</p>
          {role && <p style={{ color: T.accent, fontSize: 11, marginTop: 4, fontFamily: "'Space Mono', monospace" }}>Logged in as: {role.toUpperCase()} • Screen: {screen}</p>}
        </div>

        <PhoneFrame showTab={!!role} tabContent={role ? <TabBar role={role} active={tab} onTab={handleTab} /> : null}>
          {renderScreen()}
        </PhoneFrame>

        {role && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", maxWidth: 375, animation: "sgm-fadeIn 1s 0.5s both" }}>
            {(role === "guard" ? ["home", "patrol", "scan", "incident", "messages", "schedule", "sos"] : role === "admin" ? ["home", "schedule", "notifications"] : ["home", "messages"]).map(s => (
              <button key={s} onClick={() => { setScreen(s); if (["home", "patrol", "scan", "schedule", "messages"].includes(s)) setTab(s); }} style={{ padding: "6px 12px", background: screen === s ? T.accentDim : T.surface, border: `1px solid ${screen === s ? T.accent + "44" : T.border}`, borderRadius: 8, color: screen === s ? T.accent : T.textMuted, fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{s}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
