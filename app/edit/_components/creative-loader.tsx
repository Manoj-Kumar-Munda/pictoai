"use client";
import React from "react";

// A creative loader: pulsing core + orbiting nodes; colors customizable via props

type LoaderColors = {
  core?: string; // pulsing core
  glow?: string; // soft glow radial
  ring?: string; // outer ring stroke
  node1?: string; // primary orbiting node
  node2?: string; // secondary orbiting node
  arc?: string; // inner rotating arc color
  node1Shadow?: string;
  node2Shadow?: string;
};

const palettes = {
  violet: {
    core: "rgba(167, 139, 250, 0.9)", // violet-400
    glow: "rgba(99, 102, 241, 0.35)", // indigo-500
    ring: "rgba(255,255,255,0.14)",
    node1: "rgba(168, 85, 247, 0.95)", // purple-500
    node2: "rgba(56, 189, 248, 0.75)", // cyan-400
    arc: "rgba(99, 102, 241, 0.6)",
    node1Shadow: "0 0 14px rgba(168, 85, 247, 0.65)",
    node2Shadow: "0 0 10px rgba(56, 189, 248, 0.5)",
  } as Required<LoaderColors>,
  teal: {
    core: "rgba(45, 212, 191, 0.9)", // teal-400
    glow: "rgba(20, 184, 166, 0.35)", // teal-500
    ring: "rgba(255,255,255,0.14)",
    node1: "rgba(34, 197, 94, 0.9)", // green-500
    node2: "rgba(56, 189, 248, 0.75)", // cyan-400
    arc: "rgba(20, 184, 166, 0.6)",
    node1Shadow: "0 0 14px rgba(34, 197, 94, 0.55)",
    node2Shadow: "0 0 10px rgba(56, 189, 248, 0.5)",
  } as Required<LoaderColors>,
  amber: {
    core: "rgba(251, 191, 36, 0.9)", // amber-400
    glow: "rgba(245, 158, 11, 0.35)", // amber-500
    ring: "rgba(255,255,255,0.14)",
    node1: "rgba(251, 146, 60, 0.9)", // orange-400
    node2: "rgba(250, 204, 21, 0.8)", // yellow-400
    arc: "rgba(245, 158, 11, 0.65)",
    node1Shadow: "0 0 14px rgba(251, 146, 60, 0.55)",
    node2Shadow: "0 0 10px rgba(250, 204, 21, 0.5)",
  } as Required<LoaderColors>,
};

interface CreativeLoaderProps {
  label?: string;
  colors?: LoaderColors; // overrides palette
  variant?: keyof typeof palettes;
}

const CreativeLoader: React.FC<CreativeLoaderProps> = ({
  label = "Applying AI effect…",
  colors,
  variant = "violet",
}) => {
  const c = { ...palettes[variant], ...(colors || {}) } as Required<LoaderColors>;
  return (
    <div className="relative flex flex-col items-center gap-4" aria-live="polite" aria-busy aria-label={label}>
      <div className="relative h-28 w-28">
        {/* soft glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-70"
          style={{
            background: `radial-gradient(circle at center, ${c.glow} 0%, rgba(0,0,0,0) 60%)`,
          }}
        />
        {/* pulsing core */}
        <div
          className="absolute inset-0 m-auto h-16 w-16 rounded-full mix-blend-screen animate-[pulseCore_2s_ease-in-out_infinite]"
          style={{ backgroundColor: c.core }}
        />
        {/* orbit ring */}
        <div
          className="absolute inset-0 m-auto h-24 w-24 rounded-full border"
          style={{ borderColor: c.ring }}
        />
        {/* orbiting nodes */}
        <div className="absolute inset-0 animate-[orbit_4s_linear_infinite]">
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-3 rounded-full"
            style={{ backgroundColor: c.node1, boxShadow: c.node1Shadow }}
          />
        </div>
        <div className="absolute inset-0 animate-[orbit_6s_linear_infinite_reverse]">
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: c.node2, boxShadow: c.node2Shadow }}
          />
        </div>
        {/* inner rotating arc */}
        <div
          className="absolute inset-0 m-auto h-20 w-20 rounded-full border-t-2 animate-spin"
          style={{
            borderTopColor: c.arc,
            borderRightColor: "transparent",
            borderLeftColor: "transparent",
            borderBottomColor: "transparent",
          }}
        />
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseCore {
          0% { transform: scale(0.95); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-35%); }
          100% { transform: translateX(135%); }
        }
      `}</style>
    </div>
  );
};

export default CreativeLoader;
