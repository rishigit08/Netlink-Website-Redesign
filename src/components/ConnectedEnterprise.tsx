"use client";

import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════ */
type NodeShape = "cube" | "diamond" | "circle" | "rect" | "rounded" | "hub";
type GridStyle = "dense" | "medium" | "sparse" | "crosshatch" | "horizontal" | "none";

interface NodeDef {
  x: number;          // 0-1 fraction of layer width
  y: number;          // 0-1 fraction of layer height
  w: number;          // width in px
  h: number;          // height in px
  shape: NodeShape;
  hub?: boolean;      // central orchestration node (automation layer)
}

interface IntraConn {
  from: number;       // index into layer's nodes array
  to: number;
}

interface LayerDef {
  id: string;
  title: string;
  description: string;
  colorRgb: string;
  fillAlpha: number;
  borderAlpha: number;
  glowIntensity: number;
  edgeAlpha: number;
  thicknessAlpha: number;
  /* Structural identity */
  gridStyle: GridStyle;
  gridSize: number;
  gridAlpha: number;
  nodes: NodeDef[];
  intraConns: IntraConn[];         // connections within this layer
  verticalConns: number[];          // x-fractions for upward connectors
}

/* ═══════════════════════════════════════════════════════════════
   Layer definitions — Foundation → Control → Intelligence →
   Systems → Applications → Orchestration
   
   Each layer is structurally distinct:
   different node shape, density, grid, and connection pattern.
   ═══════════════════════════════════════════════════════════════ */
const STACK: LayerDef[] = [
  /* 0 — FOUNDATION: Infrastructure & Cloud
     Dense grid of many small cubes. Heaviest structure. 
     Many evenly-distributed nodes. Dense vertical connectors. */
  {
    id: "infrastructure",
    title: "Infrastructure & Cloud",
    description:
      "When demand shifts, system is able to absorb AI scale without breaking performance",
    colorRgb: "40,130,220",
    fillAlpha: 0.38,
    borderAlpha: 0.55,
    glowIntensity: 0.9,
    edgeAlpha: 0.5,
    thicknessAlpha: 0.28,
    gridStyle: "dense",
    gridSize: 16,
    gridAlpha: 0.16,
    nodes: [
      { x: 0.08, y: 0.15, w: 8, h: 8, shape: "cube" },
      { x: 0.22, y: 0.15, w: 8, h: 8, shape: "cube" },
      { x: 0.36, y: 0.15, w: 8, h: 8, shape: "cube" },
      { x: 0.50, y: 0.15, w: 8, h: 8, shape: "cube" },
      { x: 0.64, y: 0.15, w: 8, h: 8, shape: "cube" },
      { x: 0.78, y: 0.15, w: 8, h: 8, shape: "cube" },
      { x: 0.92, y: 0.15, w: 8, h: 8, shape: "cube" },
      { x: 0.08, y: 0.50, w: 8, h: 8, shape: "cube" },
      { x: 0.22, y: 0.50, w: 8, h: 8, shape: "cube" },
      { x: 0.36, y: 0.50, w: 8, h: 8, shape: "cube" },
      { x: 0.50, y: 0.50, w: 8, h: 8, shape: "cube" },
      { x: 0.64, y: 0.50, w: 8, h: 8, shape: "cube" },
      { x: 0.78, y: 0.50, w: 8, h: 8, shape: "cube" },
      { x: 0.92, y: 0.50, w: 8, h: 8, shape: "cube" },
      { x: 0.08, y: 0.82, w: 8, h: 8, shape: "cube" },
      { x: 0.22, y: 0.82, w: 8, h: 8, shape: "cube" },
      { x: 0.36, y: 0.82, w: 8, h: 8, shape: "cube" },
      { x: 0.50, y: 0.82, w: 8, h: 8, shape: "cube" },
      { x: 0.64, y: 0.82, w: 8, h: 8, shape: "cube" },
      { x: 0.78, y: 0.82, w: 8, h: 8, shape: "cube" },
      { x: 0.92, y: 0.82, w: 8, h: 8, shape: "cube" },
    ],
    intraConns: [
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
      { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 6 },
      { from: 7, to: 8 }, { from: 8, to: 9 }, { from: 9, to: 10 },
      { from: 10, to: 11 }, { from: 11, to: 12 }, { from: 12, to: 13 },
      { from: 0, to: 7 }, { from: 2, to: 9 }, { from: 4, to: 11 }, { from: 6, to: 13 },
    ],
    verticalConns: [0.15, 0.30, 0.50, 0.70, 0.85],
  },

  /* 1 — CONTROL: Security & Governance
     Perimeter gate structure. Diamond-shaped control points
     at strategic positions. Sparse grid. Border-emphasis. */
  {
    id: "security",
    title: "Security & Governance",
    description:
      "Security-driven governance to keep intelligent systems scalable and safe",
    colorRgb: "45,140,235",
    fillAlpha: 0.30,
    borderAlpha: 0.55,
    glowIntensity: 0.75,
    edgeAlpha: 0.5,
    thicknessAlpha: 0.22,
    gridStyle: "crosshatch",
    gridSize: 40,
    gridAlpha: 0.08,
    nodes: [
      /* Perimeter gate nodes — diamonds at edges */
      { x: 0.08, y: 0.50, w: 11, h: 11, shape: "diamond" },
      { x: 0.92, y: 0.50, w: 11, h: 11, shape: "diamond" },
      { x: 0.50, y: 0.12, w: 11, h: 11, shape: "diamond" },
      { x: 0.50, y: 0.88, w: 11, h: 11, shape: "diamond" },
      /* Central control point */
      { x: 0.50, y: 0.50, w: 13, h: 13, shape: "diamond" },
    ],
    intraConns: [
      /* Perimeter to center — gate topology */
      { from: 0, to: 4 }, { from: 1, to: 4 },
      { from: 2, to: 4 }, { from: 3, to: 4 },
      /* Perimeter ring */
      { from: 0, to: 2 }, { from: 2, to: 1 },
      { from: 1, to: 3 }, { from: 3, to: 0 },
    ],
    verticalConns: [0.20, 0.50, 0.80],
  },

  /* 2 — INTELLIGENCE: Data & Intelligence
     Circular nodes. Flowing horizontal connections.
     Moderate density. Data-stream feel. */
  {
    id: "data",
    title: "Data & Intelligence",
    description:
      "Data unified across enterprise systems enables intelligence that keeps operations efficient and adaptive.",
    colorRgb: "20,175,215",
    fillAlpha: 0.30,
    borderAlpha: 0.45,
    glowIntensity: 0.85,
    edgeAlpha: 0.45,
    thicknessAlpha: 0.18,
    gridStyle: "horizontal",
    gridSize: 20,
    gridAlpha: 0.10,
    nodes: [
      /* Left stream */
      { x: 0.08, y: 0.35, w: 10, h: 10, shape: "circle" },
      { x: 0.25, y: 0.30, w: 9, h: 9, shape: "circle" },
      { x: 0.42, y: 0.38, w: 10, h: 10, shape: "circle" },
      /* Center cluster */
      { x: 0.55, y: 0.50, w: 12, h: 12, shape: "circle" },
      /* Right stream */
      { x: 0.68, y: 0.35, w: 9, h: 9, shape: "circle" },
      { x: 0.82, y: 0.42, w: 10, h: 10, shape: "circle" },
      /* Bottom flow */
      { x: 0.20, y: 0.72, w: 8, h: 8, shape: "circle" },
      { x: 0.45, y: 0.75, w: 9, h: 9, shape: "circle" },
      { x: 0.70, y: 0.70, w: 8, h: 8, shape: "circle" },
    ],
    intraConns: [
      /* Flowing left-to-right streams */
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
      { from: 3, to: 4 }, { from: 4, to: 5 },
      { from: 6, to: 7 }, { from: 7, to: 8 },
      /* Cross-stream links */
      { from: 1, to: 7 }, { from: 3, to: 7 }, { from: 4, to: 8 },
    ],
    verticalConns: [0.25, 0.50, 0.75],
  },

  /* 3 — SYSTEMS: ERP & Core Platforms
     Rectangular modular blocks. Organized 2x3 cluster grid.
     Systematic, modular layout. Strong grid. */
  {
    id: "erp",
    title: "ERP & Core Platforms",
    description:
      "Decisions move when intelligence is part of core systems. Netlink embeds it where execution happens.",
    colorRgb: "55,110,230",
    fillAlpha: 0.30,
    borderAlpha: 0.48,
    glowIntensity: 0.80,
    edgeAlpha: 0.42,
    thicknessAlpha: 0.20,
    gridStyle: "medium",
    gridSize: 28,
    gridAlpha: 0.10,
    nodes: [
      /* Row 1 — wide modular blocks */
      { x: 0.15, y: 0.25, w: 28, h: 14, shape: "rect" },
      { x: 0.50, y: 0.25, w: 28, h: 14, shape: "rect" },
      { x: 0.85, y: 0.25, w: 28, h: 14, shape: "rect" },
      /* Row 2 */
      { x: 0.15, y: 0.65, w: 28, h: 14, shape: "rect" },
      { x: 0.50, y: 0.65, w: 28, h: 14, shape: "rect" },
      { x: 0.85, y: 0.65, w: 28, h: 14, shape: "rect" },
    ],
    intraConns: [
      /* Horizontal links within rows */
      { from: 0, to: 1 }, { from: 1, to: 2 },
      { from: 3, to: 4 }, { from: 4, to: 5 },
      /* Vertical links between rows */
      { from: 0, to: 3 }, { from: 1, to: 4 }, { from: 2, to: 5 },
    ],
    verticalConns: [0.25, 0.50, 0.75],
  },

  /* 4 — APPLICATIONS: Agentic Applications & Workflows
     Fewer, larger rounded-rectangle blocks.
     Dynamic diagonal connections. */
  {
    id: "applications",
    title: "Agentic Applications & Workflows",
    description:
      "Enabling faster product scale by embedding intelligence into deeply integrated tools and workflows from the start",
    colorRgb: "50,130,245",
    fillAlpha: 0.26,
    borderAlpha: 0.42,
    glowIntensity: 0.75,
    edgeAlpha: 0.38,
    thicknessAlpha: 0.16,
    gridStyle: "sparse",
    gridSize: 48,
    gridAlpha: 0.05,
    nodes: [
      { x: 0.18, y: 0.40, w: 30, h: 18, shape: "rounded" },
      { x: 0.50, y: 0.30, w: 34, h: 20, shape: "rounded" },
      { x: 0.82, y: 0.45, w: 30, h: 18, shape: "rounded" },
      { x: 0.35, y: 0.72, w: 26, h: 16, shape: "rounded" },
      { x: 0.68, y: 0.75, w: 26, h: 16, shape: "rounded" },
    ],
    intraConns: [
      /* Dynamic star connections */
      { from: 0, to: 1 }, { from: 1, to: 2 },
      { from: 0, to: 3 }, { from: 2, to: 4 },
      { from: 3, to: 4 }, { from: 1, to: 3 }, { from: 1, to: 4 },
    ],
    verticalConns: [0.30, 0.60],
  },

  /* 5 — ORCHESTRATION: Automation & Orchestration
     Fewest nodes. One central hub with satellite nodes.
     Downward/outward radiating connections. No grid. */
  {
    id: "automation",
    title: "Automation & Orchestration",
    description:
      "Netlink builds context-aware automation that adapts as conditions change",
    colorRgb: "70,165,255",
    fillAlpha: 0.22,
    borderAlpha: 0.50,
    glowIntensity: 1.2,
    edgeAlpha: 0.55,
    thicknessAlpha: 0.14,
    gridStyle: "none",
    gridSize: 0,
    gridAlpha: 0,
    nodes: [
      /* Central orchestration hub */
      { x: 0.50, y: 0.45, w: 22, h: 22, shape: "hub", hub: true },
      /* Satellite nodes */
      { x: 0.18, y: 0.30, w: 10, h: 10, shape: "circle" },
      { x: 0.82, y: 0.30, w: 10, h: 10, shape: "circle" },
      { x: 0.18, y: 0.70, w: 10, h: 10, shape: "circle" },
      { x: 0.82, y: 0.70, w: 10, h: 10, shape: "circle" },
    ],
    intraConns: [
      /* Hub radiates to all satellites */
      { from: 0, to: 1 }, { from: 0, to: 2 },
      { from: 0, to: 3 }, { from: 0, to: 4 },
    ],
    verticalConns: [0.50],
  },
];

/* ═══════════════════════════════════════════════════════════════
   SVG icons for left-column buttons
   ═══════════════════════════════════════════════════════════════ */
const icons: Record<string, React.ReactNode> = {
  infrastructure: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 15s2-2 5-2 5 2 5 2 2-2 5-2 5 2 5 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 9s2-2 5-2 5 2 5 2 2-2 5-2 5 2 5 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
      <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
    </svg>
  ),
  erp: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  applications: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M13 8h5" />
      <path d="M13 12h5" />
      <path d="M13 16h3" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

/* Per-layer platform extrusion depth — heavier foundation, lighter top */
const LAYER_DEPTH: Record<string, number> = {
  infrastructure: 14,
  security: 9,
  data: 7,
  erp: 11,
  applications: 9,
  automation: 5,
};

/* 3D stack constants */
const LW = 340;
const LH = 220;
const ZGAP = 58;

/* Helper: clamp-safe rgba string */
const R = (c: string, o: number) => `rgba(${c},${Math.max(0, Math.min(1, o)).toFixed(3)})`;

/* ═══════════════════════════════════════════════════════════════
   Grid renderer — structural pattern per layer
   ═══════════════════════════════════════════════════════════════ */
function renderGrid(L: LayerDef, hm: number): React.ReactNode {
  const c = L.colorRgb;
  const a = L.gridAlpha * hm;
  const s = L.gridSize;
  if (L.gridStyle === "none") return null;

  let bgImage = "";
  switch (L.gridStyle) {
    case "dense": case "medium": case "sparse":
      bgImage = `linear-gradient(90deg,${R(c, a)} 1px,transparent 1px),linear-gradient(${R(c, a)} 1px,transparent 1px)`;
      break;
    case "crosshatch":
      bgImage = `linear-gradient(45deg,${R(c, a)} 1px,transparent 1px),linear-gradient(-45deg,${R(c, a)} 1px,transparent 1px)`;
      break;
    case "horizontal":
      bgImage = `linear-gradient(${R(c, a)} 1px,transparent 1px)`;
      break;
  }
  return (
    <div style={{
      position: "absolute", inset: 0, borderRadius: 5,
      backgroundImage: bgImage,
      backgroundSize: L.gridStyle === "horizontal" ? `100% ${s}px` : `${s}px ${s}px`,
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   True 3D node renderer — each shape is a distinct geometry
   ═══════════════════════════════════════════════════════════════ */
function renderNode(node: NodeDef, L: LayerDef, isActive: boolean, ni: number): React.ReactNode {
  const c = L.colorRgb;
  const f = isActive ? 0.72 : 0.44;   // fill opacity
  const b = isActive ? 0.65 : 0.38;   // border opacity
  const g = isActive ? 0.45 : 0.10;   // glow opacity

  const pos: React.CSSProperties = {
    position: "absolute",
    left: node.x * LW - node.w / 2,
    top: node.y * LH - node.h / 2,
    width: node.w,
    height: node.h,
    transformStyle: "preserve-3d",
    transition: "all 0.5s",
  };

  switch (node.shape) {
    /* ────────────────────────────────────────────────
       CUBE — Infrastructure compute nodes
       3 visible faces: top (brightest), front, right (darkest)
       ──────────────────────────────────────────────── */
    case "cube": {
      const d = Math.min(node.w, node.h) * 0.85;
      return (
        <div key={ni} style={pos}>
          {/* Shadow on layer surface */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 1, background: R(c, f * 0.15) }} />
          {/* Top face — brightest */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 1,
            transform: `translateZ(${d}px)`,
            background: `linear-gradient(135deg, ${R(c, f * 1.1)}, ${R(c, f * 0.65)})`,
            border: `1px solid ${R(c, b)}`,
            boxShadow: `0 0 ${Math.round(node.w * 0.8)}px ${R(c, g)}`,
            transition: "all 0.5s",
          }} />
          {/* Front face — medium */}
          <div style={{
            position: "absolute", left: 0, bottom: 0, width: node.w, height: d,
            transformOrigin: "bottom", transform: "rotateX(-90deg)", borderRadius: 1,
            background: `linear-gradient(180deg, ${R(c, f * 0.6)}, ${R(c, f * 0.22)})`,
            borderBottom: `1px solid ${R(c, b * 0.5)}`,
            borderLeft: `1px solid ${R(c, b * 0.3)}`,
            borderRight: `1px solid ${R(c, b * 0.3)}`,
            transition: "all 0.5s",
          }} />
          {/* Right face — darkest */}
          <div style={{
            position: "absolute", right: 0, top: 0, width: d, height: node.h,
            transformOrigin: "right", transform: "rotateY(90deg)", borderRadius: 1,
            background: `linear-gradient(90deg, ${R(c, f * 0.4)}, ${R(c, f * 0.12)})`,
            borderRight: `1px solid ${R(c, b * 0.35)}`,
            borderTop: `1px solid ${R(c, b * 0.2)}`,
            borderBottom: `1px solid ${R(c, b * 0.2)}`,
            transition: "all 0.5s",
          }} />
        </div>
      );
    }

    /* ────────────────────────────────────────────────
       DIAMOND → 3D Sphere checkpoint (Security)
       Sphere with specular highlight + checkpoint ring
       ──────────────────────────────────────────────── */
    case "diamond": {
      const r = Math.min(node.w, node.h) / 2;
      return (
        <div key={ni} style={{ ...pos, transform: `translateZ(${r}px)` }}>
          {/* Checkpoint ring */}
          <div style={{
            position: "absolute", inset: -4, borderRadius: "50%",
            border: `1.5px solid ${R(c, isActive ? 0.45 : 0.2)}`,
            boxShadow: `0 0 ${r}px ${R(c, g * 0.8)}`,
            transition: "all 0.5s",
          }} />
          {/* Sphere body */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, ${R(c, f * 1.4)}, ${R(c, f * 0.55)} 55%, ${R(c, f * 0.2)} 100%)`,
            border: `1.5px solid ${R(c, b * 0.8)}`,
            boxShadow: [
              `0 0 ${r * 1.5}px ${R(c, g * 1.5)}`,
              `inset 0 ${-r * 0.15}px ${r * 0.4}px ${R(c, 0.15)}`,
              `inset 0 ${r * 0.1}px ${r * 0.3}px rgba(255,255,255,0.07)`,
            ].join(","),
            transition: "all 0.5s",
          }} />
          {/* Specular highlight */}
          <div style={{
            position: "absolute", top: "18%", left: "22%", width: "28%", height: "20%",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(255,255,255,${isActive ? 0.25 : 0.12}), transparent 70%)`,
          }} />
        </div>
      );
    }

    /* ────────────────────────────────────────────────
       CIRCLE → 3D Data sphere (Data & Intelligence)
       Smaller sphere with network-graph glow
       ──────────────────────────────────────────────── */
    case "circle": {
      const r = Math.min(node.w, node.h) / 2;
      const isHub = node.hub;
      return (
        <div key={ni} style={{ ...pos, transform: `translateZ(${r * (isHub ? 1.2 : 0.8)}px)` }}>
          {isHub && (
            <>
              {/* Hub outer ring */}
              <div style={{
                position: "absolute", inset: -5, borderRadius: "50%",
                border: `2px solid ${R(c, b * 0.7)}`,
                boxShadow: `0 0 ${r * 2}px ${R(c, g * 2.5)}, inset 0 0 ${r}px ${R(c, g)}`,
                transition: "all 0.5s",
              }} />
              {/* Reticle */}
              <div style={{ position: "absolute", left: "50%", top: 2, bottom: 2, width: 1, transform: "translateX(-50%)", background: R(c, isActive ? 0.3 : 0.12) }} />
              <div style={{ position: "absolute", top: "50%", left: 2, right: 2, height: 1, transform: "translateY(-50%)", background: R(c, isActive ? 0.3 : 0.12) }} />
            </>
          )}
          {/* Sphere body */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: `radial-gradient(circle at 38% 32%, ${R(c, f * 1.3)}, ${R(c, f * 0.45)} 65%, ${R(c, f * 0.15)} 100%)`,
            border: `1px solid ${R(c, b * 0.7)}`,
            boxShadow: `0 0 ${r * (isHub ? 1.8 : 1)}px ${R(c, g * (isHub ? 2 : 1))}`,
            transition: "all 0.5s",
          }} />
          {isHub && (
            /* Hub core glow */
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: r, height: r, transform: "translate(-50%,-50%)", borderRadius: "50%",
              background: `radial-gradient(circle, ${R(c, isActive ? 0.85 : 0.5)}, transparent 70%)`,
              boxShadow: `0 0 ${r}px ${R(c, isActive ? 0.5 : 0.2)}`,
              transition: "all 0.5s",
            }} />
          )}
          {/* Specular pip */}
          <div style={{
            position: "absolute", top: "20%", left: "25%", width: "22%", height: "16%",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(255,255,255,${isActive ? 0.2 : 0.08}), transparent 70%)`,
          }} />
        </div>
      );
    }

    /* ────────────────────────────────────────────────
       RECT → 3D Modular block (ERP)
       Rectangular with top/front/right + internal divider
       ──────────────────────────────────────────────── */
    case "rect": {
      const d = Math.min(node.w, node.h) * 0.65;
      return (
        <div key={ni} style={pos}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: R(c, f * 0.12) }} />
          {/* Top face */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 2,
            transform: `translateZ(${d}px)`,
            background: `linear-gradient(135deg, ${R(c, f)}, ${R(c, f * 0.6)})`,
            border: `1px solid ${R(c, b)}`,
            boxShadow: `0 0 ${Math.round(node.w * 0.4)}px ${R(c, g)}`,
            transition: "all 0.5s",
          }} />
          {/* Module divider on top face */}
          <div style={{
            position: "absolute", left: "50%", top: 2, bottom: 2, width: 1,
            transform: `translateZ(${d + 0.5}px)`,
            background: R(c, isActive ? 0.35 : 0.15),
          }} />
          {/* Front face */}
          <div style={{
            position: "absolute", left: 0, bottom: 0, width: node.w, height: d,
            transformOrigin: "bottom", transform: "rotateX(-90deg)", borderRadius: 2,
            background: `linear-gradient(180deg, ${R(c, f * 0.55)}, ${R(c, f * 0.18)})`,
            borderBottom: `1px solid ${R(c, b * 0.45)}`,
            borderLeft: `1px solid ${R(c, b * 0.25)}`,
            borderRight: `1px solid ${R(c, b * 0.25)}`,
            transition: "all 0.5s",
          }} />
          {/* Right face */}
          <div style={{
            position: "absolute", right: 0, top: 0, width: d, height: node.h,
            transformOrigin: "right", transform: "rotateY(90deg)", borderRadius: 2,
            background: `linear-gradient(90deg, ${R(c, f * 0.38)}, ${R(c, f * 0.1)})`,
            borderRight: `1px solid ${R(c, b * 0.3)}`,
            transition: "all 0.5s",
          }} />
        </div>
      );
    }

    /* ────────────────────────────────────────────────
       ROUNDED → 3D Application block
       Larger rounded shape with depth + status pip
       ──────────────────────────────────────────────── */
    case "rounded": {
      const d = Math.min(node.w, node.h) * 0.55;
      const br = Math.min(node.h * 0.3, 8);
      return (
        <div key={ni} style={pos}>
          <div style={{ position: "absolute", inset: 0, borderRadius: br, background: R(c, f * 0.1) }} />
          {/* Top face */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: br,
            transform: `translateZ(${d}px)`,
            background: `linear-gradient(160deg, ${R(c, f * 0.9)}, ${R(c, f * 0.4)})`,
            border: `1px solid ${R(c, b * 0.85)}`,
            boxShadow: `0 0 ${Math.round(node.w * 0.5)}px ${R(c, g)}`,
            transition: "all 0.5s",
          }} />
          {/* Status pip */}
          <div style={{
            position: "absolute", right: node.w * 0.14, top: "50%",
            width: 5, height: 5,
            transform: `translateZ(${d + 1}px) translateY(-50%)`,
            borderRadius: "50%",
            background: R(c, isActive ? 1 : 0.5),
            boxShadow: isActive ? `0 0 8px ${R(c, 0.6)}` : "none",
            transition: "all 0.5s",
          }} />
          {/* Front face */}
          <div style={{
            position: "absolute", left: 0, bottom: 0, width: node.w, height: d,
            transformOrigin: "bottom", transform: "rotateX(-90deg)",
            borderRadius: `0 0 ${br}px ${br}px`,
            background: `linear-gradient(180deg, ${R(c, f * 0.5)}, ${R(c, f * 0.15)})`,
            borderBottom: `1px solid ${R(c, b * 0.4)}`,
            transition: "all 0.5s",
          }} />
          {/* Right face */}
          <div style={{
            position: "absolute", right: 0, top: 0, width: d, height: node.h,
            transformOrigin: "right", transform: "rotateY(90deg)",
            borderRadius: `0 ${br}px ${br}px 0`,
            background: `linear-gradient(90deg, ${R(c, f * 0.35)}, ${R(c, f * 0.08)})`,
            borderRight: `1px solid ${R(c, b * 0.3)}`,
            transition: "all 0.5s",
          }} />
        </div>
      );
    }

    /* ────────────────────────────────────────────────
       HUB → Orchestration command sphere
       Central hub with rings, core glow, reticle
       ──────────────────────────────────────────────── */
    case "hub": {
      const r = Math.min(node.w, node.h) / 2;
      return (
        <div key={ni} style={{ ...pos, transform: `translateZ(${r * 1.3}px)` }}>
          {/* Outer ring */}
          <div style={{
            position: "absolute", inset: -6, borderRadius: "50%",
            border: `2px solid ${R(c, b * 0.7)}`,
            boxShadow: `0 0 ${r * 2.5}px ${R(c, g * 3)}, inset 0 0 ${r}px ${R(c, g * 0.8)}`,
            transition: "all 0.5s",
          }} />
          {/* Sphere body */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: `radial-gradient(circle at 40% 35%, ${R(c, f * 1.5)}, ${R(c, f * 0.6)} 50%, ${R(c, f * 0.2)} 100%)`,
            border: `1.5px solid ${R(c, b)}`,
            transition: "all 0.5s",
          }} />
          {/* Core glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: r * 1.1, height: r * 1.1, transform: "translate(-50%,-50%)", borderRadius: "50%",
            background: `radial-gradient(circle, ${R(c, isActive ? 0.9 : 0.55)}, transparent 70%)`,
            boxShadow: `0 0 ${r * 1.2}px ${R(c, isActive ? 0.55 : 0.22)}`,
            transition: "all 0.5s",
          }} />
          {/* Specular */}
          <div style={{
            position: "absolute", top: "15%", left: "20%", width: "30%", height: "22%",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(255,255,255,${isActive ? 0.3 : 0.14}), transparent 70%)`,
          }} />
          {/* Reticle cross */}
          <div style={{ position: "absolute", left: "50%", top: 4, bottom: 4, width: 1, transform: "translateX(-50%)", background: R(c, isActive ? 0.35 : 0.15) }} />
          <div style={{ position: "absolute", top: "50%", left: 4, right: 4, height: 1, transform: "translateY(-50%)", background: R(c, isActive ? 0.35 : 0.15) }} />
        </div>
      );
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   Intra-layer connections — SVG lines between nodes
   Data layer: dashed flow lines
   Applications: dashed dynamic links
   Others: solid structural links
   ═══════════════════════════════════════════════════════════════ */
function renderIntraConns(L: LayerDef, isActive: boolean): React.ReactNode {
  const c = L.colorRgb;
  const o = isActive ? 0.5 : 0.22;
  const w = isActive ? 1.5 : 0.9;
  const dash =
    L.id === "data" ? "4 3" :
    L.id === "applications" ? "6 4" :
    "none";
  return (
    <svg
      style={{
        position: "absolute", inset: 0, width: LW, height: LH,
        pointerEvents: "none", overflow: "visible",
      }}
    >
      {/* Glow filter for connections */}
      <defs>
        <filter id={`glow-${L.id}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {L.intraConns.map((conn, ci) => {
        const a = L.nodes[conn.from];
        const nd = L.nodes[conn.to];
        if (!a || !nd) return null;
        return (
          <line
            key={`ic-${ci}`}
            x1={a.x * LW} y1={a.y * LH}
            x2={nd.x * LW} y2={nd.y * LH}
            stroke={R(c, o)}
            strokeWidth={w}
            strokeDasharray={dash}
            filter={isActive ? `url(#glow-${L.id})` : undefined}
            style={{ transition: "all 0.5s" }}
          />
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */
export default function ConnectedEnterprise() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const cb = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const handleHover = useCallback((id: string | null) => {
    setActiveId(id);
  }, []);

  const activeIdx = activeId
    ? STACK.findIndex((l) => l.id === activeId)
    : -1;
  const hasActive = activeIdx >= 0;

  return (
    <section
      id="connected-enterprise"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0e17 0%, #07090f 100%)" }}
    >
      <div className="bg-dot-pattern absolute inset-0 opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">

        {/* Heading block */}
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Inside the Connected Enterprise
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Bringing data, platforms, and processes together, architected with
            AI at the core
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">

          {/* LEFT: Expertise list */}
          <div className="order-2 lg:order-1 lg:py-4">
            <div className="flex flex-col gap-2">
              {STACK.map((layer) => {
                const isActive = activeId === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    className={`group flex w-full items-start gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-blue-500/40 bg-blue-500/[0.08] shadow-lg shadow-blue-500/5"
                        : hasActive
                          ? "border-slate-800/30 bg-slate-900/20 opacity-70"
                          : "border-slate-800/60 bg-slate-900/30 hover:border-blue-500/25 hover:bg-blue-500/[0.04]"
                    }`}
                    onClick={() => handleSelect(layer.id)}
                    onMouseEnter={() => handleHover(layer.id)}
                    onMouseLeave={() => handleHover(null)}
                    aria-pressed={isActive}
                  >
                    <div
                      className={`mt-0.5 shrink-0 rounded-lg p-2 transition-colors duration-300 ${
                        isActive
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-slate-800/60 text-slate-500 group-hover:bg-blue-500/10 group-hover:text-blue-400"
                      }`}
                    >
                      {icons[layer.id]}
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`text-sm font-semibold transition-colors duration-300 ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {layer.title}
                      </h3>
                      <p
                        className={`mt-1 text-xs leading-relaxed transition-all duration-300 ${
                          isActive
                            ? "max-h-24 text-slate-400 opacity-100"
                            : "max-h-0 overflow-hidden opacity-0"
                        }`}
                      >
                        {layer.description}
                      </p>
                    </div>
                    <div
                      className={`ml-auto mt-1 h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
                        isActive ? "scale-100 bg-blue-400 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: 3D Architecture Stack */}
          <div className="order-1 lg:order-2">
            <div className="relative isolate z-0 aspect-square w-full overflow-hidden">
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: LW,
                    height: LH,
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(60deg) rotateZ(-16deg)",
                  }}
                >
                  {STACK.map((layer, i) => {
                    const L = layer;
                    const isActive = activeIdx === i;
                    const hm = isActive ? 1.5 : 1;
                    const depth = LAYER_DEPTH[L.id] ?? 8;
                    const c = L.colorRgb;

                    return (
                      <div
                        key={L.id}
                        style={{
                          position: "absolute",
                          width: LW,
                          height: LH,
                          transform: `translateZ(${i * ZGAP}px)${isActive ? " scale(1.03)" : ""}`,
                          transformStyle: "preserve-3d",
                          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      >
                        {/* ═══ Float animation wrapper ═══ */}
                        <div
                          style={{
                            position: "absolute", inset: 0,
                            transformStyle: "preserve-3d",
                            animation: reducedMotion ? "none" : `ce-float ${7 + i * 0.8}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`,
                          }}
                        >
                          {/* ── Top surface (raised by depth) ── */}
                          <div
                            style={{
                              position: "absolute", inset: 0, borderRadius: 5,
                              transform: `translateZ(${depth}px)`,
                              border: `1px solid ${R(c, Math.min(0.7, L.borderAlpha * hm))}`,
                              background: `linear-gradient(135deg, ${R(c, L.fillAlpha * hm)}, ${R(c, L.fillAlpha * 0.35 * hm)})`,
                              boxShadow: [
                                `0 0 ${Math.round(18 * L.glowIntensity * hm)}px ${R(c, 0.18 * L.glowIntensity * hm)}`,
                                `inset 0 0 ${Math.round(20 * hm)}px ${R(c, 0.05 * hm)}`,
                                isActive ? `0 0 36px ${R(c, 0.3)}` : "",
                              ].filter(Boolean).join(","),
                              transition: "all 0.5s",
                            }}
                          >
                            {renderGrid(L, hm)}
                          </div>

                          {/* ── Front extrusion face (bottom edge) ── */}
                          <div
                            style={{
                              position: "absolute",
                              left: 0, bottom: 0,
                              width: LW, height: depth,
                              transformOrigin: "bottom",
                              transform: "rotateX(-90deg)",
                              borderRadius: "0 0 5px 5px",
                              background: `linear-gradient(180deg, ${R(c, L.fillAlpha * 0.55 * hm)}, ${R(c, L.fillAlpha * 0.15 * hm)})`,
                              borderBottom: `1px solid ${R(c, L.borderAlpha * 0.35 * hm)}`,
                              borderLeft: `1px solid ${R(c, L.borderAlpha * 0.2 * hm)}`,
                              borderRight: `1px solid ${R(c, L.borderAlpha * 0.2 * hm)}`,
                              transition: "all 0.5s",
                            }}
                          />

                          {/* ── Right extrusion face (right edge) ── */}
                          <div
                            style={{
                              position: "absolute",
                              right: 0, top: 0,
                              width: depth, height: LH,
                              transformOrigin: "right",
                              transform: "rotateY(90deg)",
                              borderRadius: "0 5px 5px 0",
                              background: `linear-gradient(90deg, ${R(c, L.fillAlpha * 0.4 * hm)}, ${R(c, L.fillAlpha * 0.08 * hm)})`,
                              borderRight: `1px solid ${R(c, L.borderAlpha * 0.25 * hm)}`,
                              borderTop: `1px solid ${R(c, L.borderAlpha * 0.15 * hm)}`,
                              borderBottom: `1px solid ${R(c, L.borderAlpha * 0.15 * hm)}`,
                              transition: "all 0.5s",
                            }}
                          />

                          {/* ── Edge glow on top surface ── */}
                          <div style={{
                            position: "absolute", left: 4, right: 4, bottom: 0, height: 2,
                            transform: `translateZ(${depth}px)`,
                            borderRadius: "0 0 5px 5px",
                            background: `linear-gradient(90deg, transparent, ${R(c, L.edgeAlpha * hm)}, transparent)`,
                            transition: "all 0.5s",
                          }} />

                          {/* ── Intra-layer connections (on surface) ── */}
                          <div style={{ position: "absolute", inset: 0, transform: `translateZ(${depth + 1}px)` }}>
                            {renderIntraConns(L, isActive)}
                          </div>

                          {/* ── 3D Nodes (on top surface, preserve-3d for cube faces) ── */}
                          <div style={{
                            position: "absolute", inset: 0,
                            transform: `translateZ(${depth}px)`,
                            transformStyle: "preserve-3d",
                          }}>
                            {L.nodes.map((node, ni) => renderNode(node, L, isActive, ni))}
                          </div>

                          {/* ── Vertical connectors to next layer ── */}
                          {i < STACK.length - 1 &&
                            L.verticalConns.map((xFrac, ci) => {
                              const connActive = isActive || activeIdx === i + 1;
                              const next = STACK[i + 1];
                              return (
                                <div
                                  key={`vc-${ci}`}
                                  style={{
                                    position: "absolute",
                                    left: xFrac * LW,
                                    top: LH * 0.5,
                                    width: connActive ? 2.5 : 1.2,
                                    height: ZGAP,
                                    transformOrigin: "top left",
                                    transform: `translateZ(${depth}px) rotateX(-90deg)`,
                                    background: `linear-gradient(to bottom, ${R(c, connActive ? 0.6 : 0.2)}, ${R(next.colorRgb, connActive ? 0.6 : 0.2)})`,
                                    boxShadow: connActive
                                      ? `0 0 10px ${R(c, 0.4)}`
                                      : `0 0 3px ${R(c, 0.06)}`,
                                    transition: "all 0.5s",
                                    overflow: "hidden",
                                  }}
                                >
                                  {!reducedMotion && (
                                    <div
                                      style={{
                                        position: "absolute",
                                        left: -2, width: 6, height: 6,
                                        borderRadius: "50%",
                                        background: R(c, connActive ? 0.85 : 0.4),
                                        boxShadow: `0 0 8px ${R(c, connActive ? 0.6 : 0.2)}`,
                                        animation: `ce-pulse-up ${3 + ci * 0.5}s linear infinite`,
                                        animationDelay: `${ci * 0.7 + i * 0.35}s`,
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes ce-pulse-up {
          0%   { top: 100%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: -6px; opacity: 0; }
        }
        @keyframes ce-float {
          0%, 100% { transform: translateZ(0px); }
          50%      { transform: translateZ(3px); }
        }
      `}</style>
    </section>
  );
}
