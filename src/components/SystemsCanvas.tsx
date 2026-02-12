"use client";

import { useRef, useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════════ */
const NODE_COUNT = 120;
const FOCAL = 550;
const TILT_X = 0.22;
const ROT_SPEED = 0.001;
const MAX_DPR = 2;
const CONN_DIST = 0.58; // fraction of R — increased for denser connections

// Assembly — all nodes arrive together from all directions
const PLACED_RATIO = 0;
const ARRIVE_INTERVAL = 0;
const ARRIVE_DUR_MIN = 180;
const ARRIVE_DUR_MAX = 280;
const FIRST_ARRIVE = 10;

// Connections phase — only appear after most nodes are placed
const CONN_START_RATIO = 0.85; // connections begin fading in at 85% placed
const CONN_FADE_FRAMES = 90;   // frames to fully fade connections in

// Hover repel
const REPEL_RADIUS = 120; // px screen distance
const REPEL_STRENGTH = 60; // px push amount
const REPEL_RECOVER = 0.04; // lerp speed back

// Palette — blue spectrum gradient
const NODE_COL: [number, number, number] = [30, 100, 220];   // deep blue base
const NODE_MID: [number, number, number] = [50, 140, 255];   // mid electric blue
const NODE_HI:  [number, number, number] = [100, 180, 255];  // bright blue highlight
const GLOW_COL: [number, number, number] = [80, 170, 255];   // halo glow
const EDGE_COL: [number, number, number] = [40, 130, 255];   // connection lines
const CORE_COL: [number, number, number] = [55, 155, 255];   // central glow
const SPEC_COL: [number, number, number] = [160, 210, 255];  // specular highlight

// Pulse
const PULSE_INTERVAL = 45; // frames between new pulses
const PULSE_SPEED = 0.025;

/* ═══════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════ */
interface Node {
  tx: number; ty: number; tz: number;
  sx: number; sy: number; sz: number;
  x: number; y: number; z: number;
  // repel offset (screen space)
  rx: number; ry: number;
  r: number;
  t0: number;
  dur: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  t: number;
}

interface Proj {
  px: number; py: number; s: number;
  progress: number; idx: number; flash: number;
}

/* ═══════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════ */
function fibSphere(n: number, R: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rr = Math.sqrt(1 - y * y);
    const θ = golden * i;
    pts.push([Math.cos(θ) * rr * R, y * R, Math.sin(θ) * rr * R]);
  }
  return pts;
}

function makeNodes(R: number, cw: number, ch: number): Node[] {
  const targets = fibSphere(NODE_COUNT, R);

  return targets.map(([tx, ty, tz]) => {
    // Scatter start positions in all directions (spherical distribution)
    const θ = Math.random() * Math.PI * 2;
    const φ = Math.acos(2 * Math.random() - 1);
    const dist = R * 2.5 + Math.random() * R * 2;
    const sx = Math.sin(φ) * Math.cos(θ) * dist;
    const sy = Math.sin(φ) * Math.sin(θ) * dist;
    const sz = Math.cos(φ) * dist;

    return {
      tx, ty, tz,
      sx, sy, sz,
      x: 0, y: 0, z: 0,
      rx: 0, ry: 0,
      r: 2.5 + Math.random() * 3.5,
      t0: FIRST_ARRIVE + Math.random() * 15, // all start near the same time with slight stagger
      dur: ARRIVE_DUR_MIN + Math.random() * (ARRIVE_DUR_MAX - ARRIVE_DUR_MIN),
    };
  });
}

function easeOut(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2; } // easeInOutCubic

function rotY(
  x: number, y: number, z: number, ry: number,
): [number, number, number] {
  const a = x * Math.cos(ry) - z * Math.sin(ry);
  const b = x * Math.sin(ry) + z * Math.cos(ry);
  return [
    a,
    y * Math.cos(TILT_X) - b * Math.sin(TILT_X),
    y * Math.sin(TILT_X) + b * Math.cos(TILT_X),
  ];
}

function prj(
  x: number, y: number, z: number, cx: number, cy: number,
): { px: number; py: number; s: number } {
  const s = Math.max(0.01, FOCAL / Math.max(1, FOCAL + z));
  return { px: cx + x * s, py: cy + y * s, s };
}

/* ═══════════════════════════════════════════════════════════════
   Draw
   ═══════════════════════════════════════════════════════════════ */
function draw(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  pulses: Pulse[],
  w: number, h: number,
  angle: number, R: number, frame: number,
  mouseX: number, mouseY: number, mouseActive: boolean,
) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const maxConn = R * CONN_DIST;
  const [nr, ng, nb] = NODE_COL;
  const [gr, gg, gb] = GLOW_COL;
  const [er, eg, eb] = EDGE_COL;
  const [sr, sg, sb] = SPEC_COL;

  // ── Interpolate positions ────────────────────────────────
  const prog: number[] = [];
  for (const n of nodes) {
    let t = 0;
    if (frame >= n.t0 + n.dur) t = 1;
    else if (frame > n.t0) t = easeOut((frame - n.t0) / n.dur);
    n.x = n.sx + (n.tx - n.sx) * t;
    n.y = n.sy + (n.ty - n.sy) * t;
    n.z = n.sz + (n.tz - n.sz) * t;
    prog.push(t);
  }

  // ── Sphere assembly ratio ────────────────────────────────
  const nPlaced = prog.filter((p) => p >= 1).length;
  const ratio = nPlaced / nodes.length;

  // ── Sphere gradient shell (ambient + specular) ───────────
  if (ratio > 0.05) {
    const shellA = ratio * 0.08;

    // Outer ambient glow — large soft halo
    const ambR = R * 1.8;
    const amb = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, ambR);
    amb.addColorStop(0, `rgba(${CORE_COL[0]},${CORE_COL[1]},${CORE_COL[2]},${(shellA * 1.1).toFixed(3)})`);
    amb.addColorStop(0.35, `rgba(${CORE_COL[0]},${CORE_COL[1]},${CORE_COL[2]},${(shellA * 0.4).toFixed(3)})`);
    amb.addColorStop(0.7, `rgba(${er},${eg},${eb},${(shellA * 0.12).toFixed(3)})`);
    amb.addColorStop(1, `rgba(${er},${eg},${eb},0)`);
    ctx.beginPath();
    ctx.arc(cx, cy, ambR, 0, Math.PI * 2);
    ctx.fillStyle = amb;
    ctx.fill();

    // Inner gradient sphere shell — gives a 3D "globe" feel
    const innerA = ratio * 0.055;
    const inner = ctx.createRadialGradient(
      cx - R * 0.25, cy - R * 0.3, R * 0.05,
      cx, cy, R * 1.05,
    );
    inner.addColorStop(0, `rgba(${sr},${sg},${sb},${(innerA * 1.8).toFixed(3)})`);
    inner.addColorStop(0.2, `rgba(${gr},${gg},${gb},${(innerA * 0.7).toFixed(3)})`);
    inner.addColorStop(0.5, `rgba(${CORE_COL[0]},${CORE_COL[1]},${CORE_COL[2]},${(innerA * 0.25).toFixed(3)})`);
    inner.addColorStop(0.85, `rgba(${er},${eg},${eb},${(innerA * 0.08).toFixed(3)})`);
    inner.addColorStop(1, `rgba(${er},${eg},${eb},0)`);
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2);
    ctx.fillStyle = inner;
    ctx.fill();

    // Specular highlight — bright spot upper-left
    const specR = R * 0.55;
    const specX = cx - R * 0.32;
    const specY = cy - R * 0.35;
    const specA = ratio * 0.07;
    const spec = ctx.createRadialGradient(specX, specY, 0, specX, specY, specR);
    spec.addColorStop(0, `rgba(${sr},${sg},${sb},${(specA * 1.4).toFixed(3)})`);
    spec.addColorStop(0.3, `rgba(${sr},${sg},${sb},${(specA * 0.4).toFixed(3)})`);
    spec.addColorStop(1, `rgba(${sr},${sg},${sb},0)`);
    ctx.beginPath();
    ctx.arc(specX, specY, specR, 0, Math.PI * 2);
    ctx.fillStyle = spec;
    ctx.fill();

    // Subtle pulsing core glow
    const pulse = 0.05 + Math.sin(frame * 0.007) * 0.02;
    const ga = ratio * (pulse + 0.04);
    const glR = R * 1.3;
    const g = ctx.createRadialGradient(cx, cy, R * 0.05, cx, cy, glR);
    g.addColorStop(0, `rgba(${CORE_COL[0]},${CORE_COL[1]},${CORE_COL[2]},${(ga * 1.3).toFixed(3)})`);
    g.addColorStop(0.4, `rgba(${CORE_COL[0]},${CORE_COL[1]},${CORE_COL[2]},${(ga * 0.3).toFixed(3)})`);
    g.addColorStop(1, `rgba(${CORE_COL[0]},${CORE_COL[1]},${CORE_COL[2]},0)`);
    ctx.beginPath();
    ctx.arc(cx, cy, glR, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }

  // ── Project nodes ────────────────────────────────────────
  const projected: Proj[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const p = prog[i];

    if (p < 1) {
      const fx = Math.sin(frame * 0.002 + i * 1.7) * 3;
      const fy = Math.cos(frame * 0.003 + i * 2.3) * 3;
      const [rx, ry, rz] = rotY(n.x, n.y, n.z, angle);
      const sp = prj(rx, ry, rz, cx, cy);
      const scX = cx + n.sx + fx;
      const scY = cy + n.sy + fy;

      projected.push({
        px: scX + (sp.px - scX) * p,
        py: scY + (sp.py - scY) * p,
        s: 0.5 + p * (sp.s - 0.5),
        progress: p, idx: i, flash: 0,
      });
    } else {
      const [rx, ry, rz] = rotY(n.x, n.y, n.z, angle);
      const sp = prj(rx, ry, rz, cx, cy);
      const since = frame - (n.t0 + n.dur);
      const flash = since >= 0 && since < 35 ? 1 - since / 35 : 0;

      projected.push({
        px: sp.px + n.rx,
        py: sp.py + n.ry,
        s: sp.s, progress: 1, idx: i, flash,
      });
    }
  }

  // ── Mouse hover → repel placed nodes ─────────────────────
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const p = projected.find((pp) => pp.idx === i);
    if (!p || p.progress < 1) { n.rx *= (1 - REPEL_RECOVER); n.ry *= (1 - REPEL_RECOVER); continue; }

    if (mouseActive) {
      const [rx2, ry2] = rotY(n.x, n.y, n.z, angle);
      const base = prj(rx2, ry2, rotY(n.x, n.y, n.z, angle)[2], cx, cy);
      const dx = base.px - mouseX;
      const dy = base.py - mouseY;
      const dist = Math.hypot(dx, dy);

      if (dist < REPEL_RADIUS && dist > 1) {
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
        const targetRx = (dx / dist) * force;
        const targetRy = (dy / dist) * force;
        n.rx += (targetRx - n.rx) * 0.08;
        n.ry += (targetRy - n.ry) * 0.08;
      } else {
        n.rx *= (1 - REPEL_RECOVER);
        n.ry *= (1 - REPEL_RECOVER);
      }
    } else {
      n.rx *= (1 - REPEL_RECOVER);
      n.ry *= (1 - REPEL_RECOVER);
    }

    // Recompute projected position with repel
    const [rx3, ry3] = rotY(n.x, n.y, n.z, angle);
    const base2 = prj(rx3, ry3, rotY(n.x, n.y, n.z, angle)[2], cx, cy);
    p.px = base2.px + n.rx;
    p.py = base2.py + n.ry;
  }

  // Depth sort
  projected.sort((a, b) => a.s - b.s);

  // ── Connection fade — only show after nodes are placed ───
  // connFade goes from 0 → 1 once ratio passes CONN_START_RATIO
  let connFade = 0;
  if (ratio >= 1) {
    // All placed — ramp up over CONN_FADE_FRAMES after the last node arrived
    const lastArrival = Math.max(...nodes.map((n) => n.t0 + n.dur));
    const since = frame - lastArrival;
    connFade = Math.min(1, Math.max(0, since / CONN_FADE_FRAMES));
  } else if (ratio >= CONN_START_RATIO) {
    // Partially there — start a subtle fade
    connFade = ((ratio - CONN_START_RATIO) / (1 - CONN_START_RATIO)) * 0.3;
  }

  // ── Connection lines (gradient edges, phased in) ─────────
  const pMap: (Proj | undefined)[] = new Array(nodes.length);
  for (const p of projected) pMap[p.idx] = p;

  ctx.lineCap = "round";

  if (connFade > 0.001) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const pi = pMap[i];
        const pj = pMap[j];
        if (!pi || !pj) continue;
        if (pi.progress < 1 || pj.progress < 1) continue;

        const dd = Math.hypot(
          nodes[i].x - nodes[j].x,
          nodes[i].y - nodes[j].y,
          nodes[i].z - nodes[j].z,
        );
        if (dd >= maxConn) continue;

        const distFade = 1 - dd / maxConn;
        const depthAvg = (pi.s + pj.s) * 0.5;
        const a = distFade * connFade * (0.4 + depthAvg * 0.6);

        // Gradient stroke from node to node
        const lg = ctx.createLinearGradient(pi.px, pi.py, pj.px, pj.py);
        const aI = a * (0.4 + pi.s * 0.6);
        const aJ = a * (0.4 + pj.s * 0.6);

        // Outer glow pass
        lg.addColorStop(0, `rgba(${er},${eg},${eb},${(aI * 0.12).toFixed(4)})`);
        lg.addColorStop(0.5, `rgba(${gr},${gg},${gb},${(a * 0.08).toFixed(4)})`);
        lg.addColorStop(1, `rgba(${er},${eg},${eb},${(aJ * 0.12).toFixed(4)})`);
        ctx.beginPath();
        ctx.moveTo(pi.px, pi.py);
        ctx.lineTo(pj.px, pj.py);
        ctx.lineWidth = 4;
        ctx.strokeStyle = lg;
        ctx.stroke();

        // Core line
        const lg2 = ctx.createLinearGradient(pi.px, pi.py, pj.px, pj.py);
        lg2.addColorStop(0, `rgba(${er},${eg},${eb},${(aI * 0.35).toFixed(4)})`);
        lg2.addColorStop(0.5, `rgba(${gr},${gg},${gb},${(a * 0.28).toFixed(4)})`);
        lg2.addColorStop(1, `rgba(${er},${eg},${eb},${(aJ * 0.35).toFixed(4)})`);
        ctx.beginPath();
        ctx.moveTo(pi.px, pi.py);
        ctx.lineTo(pj.px, pj.py);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = lg2;
        ctx.stroke();
      }
    }
  }

  // ── Data pulses (only when connections are visible) ───────
  if (connFade > 0.3) {
    for (const pulse of pulses) {
      const pi = pMap[pulse.fromIdx];
      const pj = pMap[pulse.toIdx];
      if (!pi || !pj) continue;

      const px = pi.px + (pj.px - pi.px) * pulse.t;
      const py = pi.py + (pj.py - pi.py) * pulse.t;
      const pa = 0.7 * connFade * (1 - Math.abs(pulse.t - 0.5) * 2);

      const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
      pg.addColorStop(0, `rgba(${sr},${sg},${sb},${(pa * 0.8).toFixed(3)})`);
      pg.addColorStop(0.4, `rgba(${gr},${gg},${gb},${(pa * 0.3).toFixed(3)})`);
      pg.addColorStop(1, `rgba(${gr},${gg},${gb},0)`);
      ctx.beginPath();
      ctx.arc(px, py, 8, 0, Math.PI * 2);
      ctx.fillStyle = pg;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${sr},${sg},${sb},${pa.toFixed(3)})`;
      ctx.fill();
    }
  }

  // ── Draw nodes ───────────────────────────────────────────
  const [mr, mg, mb] = NODE_MID;
  const [hr, hg2, hb] = NODE_HI;

  for (const p of projected) {
    const n = nodes[p.idx];
    const sc = Math.max(0.01, p.s);
    const depthA = 0.3 + sc * 0.7;
    const vizR = n.r * sc * (0.4 + p.progress * 0.6);

    // Arrival flash
    if (p.flash > 0.01) {
      const fr = Math.max(1, vizR * 5 * p.flash);
      const fg = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, fr);
      fg.addColorStop(0, `rgba(${sr},${sg},${sb},${(p.flash * 0.45).toFixed(3)})`);
      fg.addColorStop(0.3, `rgba(${hr},${hg2},${hb},${(p.flash * 0.2).toFixed(3)})`);
      fg.addColorStop(1, `rgba(${mr},${mg},${mb},0)`);
      ctx.beginPath();
      ctx.arc(p.px, p.py, fr, 0, Math.PI * 2);
      ctx.fillStyle = fg;
      ctx.fill();
    }

    // Glow halo — blue gradient
    const haloR = Math.max(1, vizR * 3.5);
    const haloA = (p.progress < 1 ? 0.08 : 0.18) * depthA;
    const haloG = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, haloR);
    haloG.addColorStop(0, `rgba(${hr},${hg2},${hb},${haloA.toFixed(3)})`);
    haloG.addColorStop(0.25, `rgba(${mr},${mg},${mb},${(haloA * 0.5).toFixed(3)})`);
    haloG.addColorStop(0.5, `rgba(${gr},${gg},${gb},${(haloA * 0.2).toFixed(3)})`);
    haloG.addColorStop(1, `rgba(${nr},${ng},${nb},0)`);
    ctx.beginPath();
    ctx.arc(p.px, p.py, haloR, 0, Math.PI * 2);
    ctx.fillStyle = haloG;
    ctx.fill();

    // Core dot with rich blue gradient (light → mid → deep blue)
    if (vizR > 0.5) {
      const coreA = (p.progress < 1 ? 0.45 + p.progress * 0.35 : 0.9) * depthA;
      const coreR = Math.max(0.5, vizR);
      const cg = ctx.createRadialGradient(
        p.px - coreR * 0.3, p.py - coreR * 0.3, coreR * 0.05,
        p.px, p.py, coreR,
      );
      // Specular center → bright blue → electric blue → mid blue → deep blue rim
      cg.addColorStop(0, `rgba(${sr},${sg},${sb},${(coreA * 1.15).toFixed(3)})`);
      cg.addColorStop(0.2, `rgba(${hr},${hg2},${hb},${(coreA * 1.0).toFixed(3)})`);
      cg.addColorStop(0.45, `rgba(${mr},${mg},${mb},${(coreA * 0.9).toFixed(3)})`);
      cg.addColorStop(0.7, `rgba(${nr},${ng},${nb},${(coreA * 0.75).toFixed(3)})`);
      cg.addColorStop(1, `rgba(${nr},${ng},${nb},${(coreA * 0.35).toFixed(3)})`);
      ctx.beginPath();
      ctx.arc(p.px, p.py, coreR, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      // Bright specular pip
      if (vizR > 2 && sc > 0.25) {
        const pipR = Math.max(0.3, vizR * 0.3);
        const pipX = p.px - vizR * 0.22;
        const pipY = p.py - vizR * 0.22;
        const pipG = ctx.createRadialGradient(pipX, pipY, 0, pipX, pipY, pipR);
        pipG.addColorStop(0, `rgba(${sr},${sg},${sb},${(coreA * 1.0).toFixed(3)})`);
        pipG.addColorStop(1, `rgba(${hr},${hg2},${hb},${(coreA * 0.3).toFixed(3)})`);
        ctx.beginPath();
        ctx.arc(pipX, pipY, pipR, 0, Math.PI * 2);
        ctx.fillStyle = pipG;
        ctx.fill();
      }
    }
  }

  // ── Floor reflection ─────────────────────────────────────
  if (ratio > 0.1) {
    const refY = cy + R * 1.15;
    const refH = R * 0.6;
    const refA = ratio * 0.04;
    const ref = ctx.createRadialGradient(cx, refY, R * 0.1, cx, refY, R * 0.9);
    ref.addColorStop(0, `rgba(${CORE_COL[0]},${CORE_COL[1]},${CORE_COL[2]},${(refA * 1.2).toFixed(3)})`);
    ref.addColorStop(0.5, `rgba(${er},${eg},${eb},${(refA * 0.4).toFixed(3)})`);
    ref.addColorStop(1, `rgba(${er},${eg},${eb},0)`);
    ctx.save();
    ctx.scale(1, 0.35);
    ctx.beginPath();
    ctx.arc(cx, refY / 0.35, R * 0.9, 0, Math.PI * 2);
    ctx.fillStyle = ref;
    ctx.fill();
    ctx.restore();

    // Soft horizontal light streak
    const streakG = ctx.createLinearGradient(cx - R * 0.8, refY, cx + R * 0.8, refY);
    streakG.addColorStop(0, `rgba(${er},${eg},${eb},0)`);
    streakG.addColorStop(0.3, `rgba(${gr},${gg},${gb},${(refA * 0.6).toFixed(3)})`);
    streakG.addColorStop(0.5, `rgba(${sr},${sg},${sb},${(refA * 0.8).toFixed(3)})`);
    streakG.addColorStop(0.7, `rgba(${gr},${gg},${gb},${(refA * 0.6).toFixed(3)})`);
    streakG.addColorStop(1, `rgba(${er},${eg},${eb},0)`);
    ctx.beginPath();
    ctx.ellipse(cx, refY, R * 0.8, refH * 0.08, 0, 0, Math.PI * 2);
    ctx.fillStyle = streakG;
    ctx.fill();
  }
}

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */
export default function SystemsEcosystemCanvas() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const frameRef = useRef(0);
  const angleRef = useRef(0);
  const rRef = useRef(100);
  const szRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [rm, setRm] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRm(mq.matches);
    const cb = (e: MediaQueryListEvent) => setRm(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const { width: w, height: h } = parent!.getBoundingClientRect();
      if (w <= 0 || h <= 0) return;
      const dpr = Math.min(devicePixelRatio || 1, MAX_DPR);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const R = Math.min(w, h) * 0.44;
      rRef.current = R;
      szRef.current = { w, h };
      nodesRef.current = makeNodes(R, w, h);
      pulsesRef.current = [];
      frameRef.current = 0;
      angleRef.current = 0;
    }

    // Mouse handlers
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    resize();

    if (rm) {
      draw(ctx, nodesRef.current, [], szRef.current.w, szRef.current.h, 0, rRef.current, 999999, 0, 0, false);
      const ro = new ResizeObserver(() => {
        resize();
        draw(ctx, nodesRef.current, [], szRef.current.w, szRef.current.h, 0, rRef.current, 999999, 0, 0, false);
      });
      ro.observe(parent);
      return () => { ro.disconnect(); canvas.removeEventListener("mousemove", onMouseMove); canvas.removeEventListener("mouseleave", onMouseLeave); };
    }

    let lastPulse = 0;

    function loop() {
      const f = frameRef.current++;
      const { w, h } = szRef.current;
      if (w <= 0 || h <= 0) { raf.current = requestAnimationFrame(loop); return; }

      angleRef.current += ROT_SPEED;
      const nodes = nodesRef.current;
      const pulses = pulsesRef.current;
      const maxC = rRef.current * CONN_DIST;

      // Spawn pulses — only after all nodes are placed
      const allPlaced = nodes.every((n) => f >= n.t0 + n.dur);
      if (allPlaced && f - lastPulse > PULSE_INTERVAL && pulses.length < 8) {
        for (let a = 0; a < 15; a++) {
          const i = Math.floor(Math.random() * nodes.length);
          const j = Math.floor(Math.random() * nodes.length);
          if (i === j) continue;
          const dd = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y, nodes[i].z - nodes[j].z);
          if (dd < maxC) {
            pulses.push({ fromIdx: i, toIdx: j, t: 0 });
            lastPulse = f;
            break;
          }
        }
      }

      // Advance pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += PULSE_SPEED;
        if (pulses[i].t > 1) pulses.splice(i, 1);
      }

      const { x: mx, y: my, active } = mouseRef.current;

      draw(ctx!, nodes, pulses, w, h, angleRef.current, rRef.current, f, mx, my, active);
      raf.current = requestAnimationFrame(loop);
    }

    raf.current = requestAnimationFrame(loop);
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [rm]);

  return (
    <canvas
      ref={cvs}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
