"use client";
import React, { useEffect, useRef, useState } from "react";
import CreativeLoader from "./creative-loader";

interface ShaderOverlayProps {
  width: number;
  height: number;
  active: boolean;
}

// A lightweight WebGL fragment shader overlay as a loader effect
// Renders animated diagonal stripes with subtle grain and vignette
const fragShader = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

// simple hash-based noise
float hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)),
           dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float n = mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  return 0.5 + 0.5*n;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // keep aspect ratio for patterns
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy) / u_resolution.y;

  // Animated diagonal stripes
  float angle = 0.8; // tilt
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 q = rot * p * 8.0; // density
  float stripes = 0.5 + 0.5 * sin(q.x + q.y + u_time * 3.0);
  stripes = smoothstep(0.35, 0.65, stripes);

  // Subtle moving noise overlay
  float grain = noise(uv * 300.0 + u_time * 0.5);

  // Vignette
  float r = length(p);
  float vignette = smoothstep(0.9, 0.2, r);

  // darker palette for subtle motion under dark overlay
  vec3 baseA = vec3(0.05, 0.06, 0.08); // near-black blue-gray
  vec3 baseB = vec3(0.12, 0.10, 0.16); // deep purple-gray
  vec3 col = mix(baseA, baseB, stripes);
  col += (grain-0.5)*0.08; // subtle grain
  col *= vignette;

  // Final alpha for overlay feel
  float alpha = 0.6;
  gl_FragColor = vec4(col, alpha);
}
`;

const vertShader = `
precision mediump float;
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("Shader compile failed: " + info);
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error("Program link failed: " + info);
  }
  return program;
}

const ShaderOverlay: React.FC<ShaderOverlayProps> = ({
  width,
  height,
  active,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const programRef = useRef<WebGLProgram | null>(null);
  const bufferRef = useRef<WebGLBuffer | null>(null);
  const [glAvailable, setGlAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      alpha: true,
    });
    if (!gl) {
      setGlAvailable(false);
      return;
    }
    setGlAvailable(true);

    // Create program once
    if (!programRef.current) {
      try {
        programRef.current = createProgram(gl, vertShader, fragShader);
      } catch (e) {
        console.warn(
          "[ShaderOverlay] Shader program creation failed, using fallback.",
          e
        );
        setGlAvailable(false); // force fallback if compile/link fails
        return;
      }
    }

    const program = programRef.current!;
    gl.useProgram(program);

    // Setup geometry (two-triangle full-screen quad)
    const positionLoc = gl.getAttribLocation(program, "a_position");
    
    // Create buffer only if we don't have one
    if (!bufferRef.current) {
      bufferRef.current = gl.createBuffer();
    }
    
    const buffer = bufferRef.current;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");

    const render = (t: number) => {
      if (!active) return; // stop drawing when inactive
      if (!startRef.current) startRef.current = t;
      const time = (t - startRef.current) / 1000;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    if (active) {
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = 0;
      // Clean up WebGL buffer to prevent memory leak
      if (bufferRef.current && gl) {
        gl.deleteBuffer(bufferRef.current);
        bufferRef.current = null;
      }
      // keep program for reuse across activations
    };
  }, [width, height, active]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    const canvas = canvasRef.current;
    return () => {
      // Clean up all WebGL resources on unmount
      if (bufferRef.current && canvas) {
        const gl = canvas.getContext("webgl");
        if (gl && bufferRef.current) {
          gl.deleteBuffer(bufferRef.current);
        }
        bufferRef.current = null;
      }
      if (programRef.current && canvas) {
        const gl = canvas.getContext("webgl");
        if (gl && programRef.current) {
          gl.deleteProgram(programRef.current);
        }
        programRef.current = null;
      }
    };
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 backdrop-blur-lg">
      {/* Dark blur base layer (always below shader/fallback visuals) */}
      <div className="absolute inset-0 bg-black/70" />
      {/* WebGL shader canvas (if available) */}
      {glAvailable !== false && (
        <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />
      )}

      {/* Fallback animated overlay when WebGL is not available */}
      {glAvailable === false && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CreativeLoader />
        </div>
      )}

      {/* Center label over both modes */}
      {glAvailable !== false && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CreativeLoader />
        </div>
      )}
    </div>
  );
};

export default ShaderOverlay;
