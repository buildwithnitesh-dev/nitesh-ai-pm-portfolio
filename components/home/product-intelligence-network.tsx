"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet, decorative network behind the Hero: six anchor nodes for the product
 * loop (signal → diagnosis → decision → experiment → outcome → learning) among
 * smaller supporting nodes. Plain Canvas 2D, no dependencies.
 *
 * Readability rules: elements marked `data-network-quiet` in the Hero are
 * "quiet zones". Nodes are placed mostly outside them, and anything drawn
 * inside them is dimmed to near-invisible, so text always stays dominant.
 *
 * Performance: one canvas clipped to the Hero, typed arrays allocated only on
 * layout, the loop paused when the Hero is off-screen or the tab is hidden,
 * and a single static frame when the user prefers reduced motion.
 */

const ANCHORS = 6; // signal, diagnosis, decision, experiment, outcome, learning
const QUIET_ALPHA = 0.14; // how much survives behind text
const SEGMENTS = 6; // edges are drawn in short pieces so each piece can dim independently

type Layout = {
  w: number; h: number; n: number;
  x: Float32Array; y: Float32Array; z: Float32Array; phase: Float32Array;
  edges: Uint16Array; edgeCount: number;
  quiet: Float32Array; quietCount: number;
};

/** Small seeded PRNG so the composition is stable across reloads. */
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function inQuiet(L: Layout, px: number, py: number) {
  for (let i = 0; i < L.quietCount; i++) {
    const o = i * 4;
    if (px > L.quiet[o] && px < L.quiet[o + 2] && py > L.quiet[o + 1] && py < L.quiet[o + 3]) return true;
  }
  return false;
}

function buildLayout(wrapper: HTMLElement, w: number, h: number): Layout {
  const n = w >= 1024 ? 32 : w >= 640 ? 22 : 14;
  // Quiet zones: the Hero's text and cards, relative to the canvas, padded a little (more below text).
  const box = wrapper.getBoundingClientRect();
  const els = wrapper.parentElement ? Array.from(wrapper.parentElement.querySelectorAll<HTMLElement>("[data-network-quiet]")) : [];
  const quiet = new Float32Array(els.length * 4);
  els.forEach((el, i) => {
    const r = el.getBoundingClientRect(); const pad = 20, padBottom = 32;
    quiet.set([r.left - box.left - pad, r.top - box.top - pad, r.right - box.left + pad, r.bottom - box.top + padBottom], i * 4);
  });
  const L: Layout = {
    w, h, n, x: new Float32Array(n), y: new Float32Array(n), z: new Float32Array(n), phase: new Float32Array(n),
    edges: new Uint16Array(n * 6), edgeCount: 0, quiet, quietCount: els.length,
  };
  const rand = rng(20240707);
  const inset = Math.min(28, w * 0.04);

  // Anchors: a loose loop around the content, each nudged into free space when possible.
  for (let i = 0; i < ANCHORS; i++) {
    const a = -2.6 + (i / ANCHORS) * Math.PI * 2 + (rand() - 0.5) * 0.35;
    let px = w * (0.5 + Math.cos(a) * 0.44), py = h * (0.46 + Math.sin(a) * 0.4);
    for (let tries = 0; tries < 40 && inQuiet(L, px, py); tries++) {
      px += (rand() - 0.5) * 70; py += (rand() - 0.5) * 70;
    }
    L.x[i] = Math.max(inset, Math.min(w - inset, px)); L.y[i] = Math.max(inset, Math.min(h - inset, py));
    L.z[i] = 0.85 + rand() * 0.15; L.phase[i] = rand() * Math.PI * 2;
  }

  // Supporting nodes: spaced out, mostly in free space (a few may sit behind text, dimmed).
  const minD = Math.sqrt((w * h) / n) * 0.62;
  for (let i = ANCHORS; i < n; i++) {
    let px = 0, py = 0;
    for (let tries = 0; tries < 60; tries++) {
      px = inset + rand() * (w - inset * 2); py = inset + rand() * (h - inset * 2);
      let ok = tries > 45 || !inQuiet(L, px, py);
      for (let j = 0; ok && j < i; j++) if (Math.hypot(L.x[j] - px, L.y[j] - py) < minD * (tries > 50 ? 0.6 : 1)) ok = false;
      if (ok) break;
    }
    L.x[i] = px; L.y[i] = py; L.z[i] = 0.3 + rand() * 0.6; L.phase[i] = rand() * Math.PI * 2;
  }

  // Sparse edges: consecutive anchors form the loop; every node links to its nearest neighbour,
  // and roughly a third also to its second nearest. No all-to-all web.
  const seen = new Set<number>();
  const add = (a: number, b: number) => {
    const k = a < b ? a * 1000 + b : b * 1000 + a;
    if (a === b || seen.has(k) || L.edgeCount * 2 >= L.edges.length) return;
    seen.add(k); L.edges[L.edgeCount * 2] = a; L.edges[L.edgeCount * 2 + 1] = b; L.edgeCount++;
  };
  for (let i = 0; i < ANCHORS; i++) add(i, (i + 1) % ANCHORS);
  for (let i = ANCHORS; i < n; i++) {
    let b1 = -1, b2 = -1, d1 = Infinity, d2 = Infinity;
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const d = Math.hypot(L.x[j] - L.x[i], L.y[j] - L.y[i]);
      if (d < d1) { d2 = d1; b2 = b1; d1 = d; b1 = j; } else if (d < d2) { d2 = d; b2 = j; }
    }
    if (b1 >= 0) add(i, b1);
    if (b2 >= 0 && rand() < 0.35) add(i, b2);
  }
  return L;
}

export function ProductIntelligenceNetwork() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapRef.current, canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // no canvas support: the Hero renders exactly as before

    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--ink").trim() || "#111111";
    const accent = css.getPropertyValue("--accent").trim() || "#0f766e";
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    let L: Layout | null = null;
    let disposed = false;
    let dpr = 1, raf = 0, visible = true, lastT = 0;
    // Static (one frame, no loop) under reduced motion, and on phones, where the network is too faint to earn a loop.
    const isStill = () => reduceMq.matches || (L !== null && L.w < 640);
    // Per-frame positions, reused (no allocation in the loop).
    let px = new Float32Array(0), py = new Float32Array(0);
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    const par = { x: 0, y: 0 };
    const pulse = new Float32Array(ANCHORS).fill(-1); // start time of an anchor pulse, -1 = none
    const hovered = new Uint8Array(ANCHORS);
    // A few travellers moving slowly along random edges.
    const travellers = Array.from({ length: 4 }, (_, i) => ({ edge: i * 3, start: -i * 2200, dur: 7000 }));

    const resize = () => {
      const r = wrapper.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      L = buildLayout(wrapper, w, h);
      px = new Float32Array(L.n); py = new Float32Array(L.n);
      draw(lastT || 0);
      start(); // no-op when already running or static; resumes the loop when a phone-width window grows
    };

    const quietFactor = (x: number, y: number) => (L && inQuiet(L, x, y) ? QUIET_ALPHA : 1);

    function draw(t: number) {
      if (!L || !ctx) return;
      const { w, h, n } = L;
      const still = isStill();
      const mobile = w < 640, tablet = w < 1024;
      const amp = still ? 0 : mobile ? 2 : tablet ? 3 : 5; // drift amplitude in px
      const base = mobile ? 0.55 : tablet ? 0.75 : 1; // overall intensity by viewport

      // Pointer parallax (desktop only), eased so it never jumps.
      const usePointer = !still && !tablet && finePointer.matches && pointer.active;
      par.x += ((usePointer ? (pointer.tx / w - 0.5) * 10 : 0) - par.x) * 0.04;
      par.y += ((usePointer ? (pointer.ty / h - 0.5) * 8 : 0) - par.y) * 0.04;
      pointer.x += (pointer.tx - pointer.x) * 0.15; pointer.y += (pointer.ty - pointer.y) * 0.15;

      for (let i = 0; i < n; i++) {
        const z = L.z[i], p = L.phase[i];
        px[i] = L.x[i] + Math.sin(t * 0.00011 + p) * amp * z + par.x * z;
        py[i] = L.y[i] + Math.cos(t * 0.00009 + p * 1.3) * amp * z + par.y * z;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.75;

      // Edges: neutral hairlines, in short pieces so text regions stay clean.
      ctx.strokeStyle = ink;
      for (let e = 0; e < L.edgeCount; e++) {
        const a = L.edges[e * 2], b = L.edges[e * 2 + 1];
        const depth = (L.z[a] + L.z[b]) / 2;
        const alpha = (a < ANCHORS && b < ANCHORS ? 0.16 : 0.1) * (0.55 + depth * 0.45) * base;
        // Most connections sit fully in free space: one stroke. Only those near text are split.
        const clear = quietFactor(px[a], py[a]) === 1 && quietFactor(px[b], py[b]) === 1 &&
          quietFactor((px[a] + px[b]) / 2, (py[a] + py[b]) / 2) === 1;
        if (clear) {
          ctx.globalAlpha = alpha;
          ctx.beginPath(); ctx.moveTo(px[a], py[a]); ctx.lineTo(px[b], py[b]); ctx.stroke();
          continue;
        }
        for (let s = 0; s < SEGMENTS; s++) {
          const t0 = s / SEGMENTS, t1 = (s + 1) / SEGMENTS, tm = (t0 + t1) / 2;
          const mx = px[a] + (px[b] - px[a]) * tm, my = py[a] + (py[b] - py[a]) * tm;
          ctx.globalAlpha = alpha * quietFactor(mx, my);
          ctx.beginPath();
          ctx.moveTo(px[a] + (px[b] - px[a]) * t0, py[a] + (py[b] - py[a]) * t0);
          ctx.lineTo(px[a] + (px[b] - px[a]) * t1, py[a] + (py[b] - py[a]) * t1);
          ctx.stroke();
        }
      }

      // Pointer proximity: a faint teal lift on nearby connections (desktop).
      if (usePointer) {
        ctx.strokeStyle = accent;
        for (let e = 0; e < L.edgeCount; e++) {
          const a = L.edges[e * 2], b = L.edges[e * 2 + 1];
          const mx = (px[a] + px[b]) / 2, my = (py[a] + py[b]) / 2;
          const d = Math.hypot(mx - pointer.x, my - pointer.y);
          if (d > 170) continue;
          ctx.globalAlpha = 0.22 * (1 - d / 170) * quietFactor(mx, my);
          ctx.beginPath(); ctx.moveTo(px[a], py[a]); ctx.lineTo(px[b], py[b]); ctx.stroke();
        }
      }

      // Supporting nodes: small, neutral, depth-scaled.
      ctx.fillStyle = ink;
      for (let i = ANCHORS; i < n; i++) {
        const z = L.z[i];
        ctx.globalAlpha = (0.12 + z * 0.16) * base * quietFactor(px[i], py[i]);
        ctx.beginPath(); ctx.arc(px[i], py[i], 0.8 + z * 1.1, 0, Math.PI * 2); ctx.fill();
      }

      // Anchors: the six loop stages, a touch larger and teal, with a hairline ring.
      for (let i = 0; i < ANCHORS; i++) {
        const q = quietFactor(px[i], py[i]);
        ctx.fillStyle = accent; ctx.globalAlpha = 0.5 * base * q;
        ctx.beginPath(); ctx.arc(px[i], py[i], 2.4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = accent; ctx.globalAlpha = 0.16 * base * q;
        ctx.beginPath(); ctx.arc(px[i], py[i], 5.5, 0, Math.PI * 2); ctx.stroke();

        // Hover pulse (desktop): one slow ring per hover, never a loop.
        if (usePointer) {
          const near = Math.hypot(px[i] - pointer.x, py[i] - pointer.y) < 20;
          if (near && !hovered[i]) pulse[i] = t;
          hovered[i] = near ? 1 : 0;
        }
        if (pulse[i] >= 0) {
          const k = (t - pulse[i]) / 1600;
          if (k >= 1) pulse[i] = -1;
          else {
            ctx.globalAlpha = 0.3 * (1 - k) * q;
            ctx.beginPath(); ctx.arc(px[i], py[i], 5.5 + k * 12, 0, Math.PI * 2); ctx.stroke();
          }
        }
      }

      // Travellers: a few slow teal points moving along connections.
      if (!still && L.edgeCount) {
        const count = mobile ? 1 : tablet ? 2 : travellers.length;
        ctx.fillStyle = accent;
        for (let k = 0; k < count; k++) {
          const tr = travellers[k];
          let prog = (t - tr.start) / tr.dur;
          if (prog >= 1 || prog < 0) {
            if (prog >= 1) { tr.start = t; tr.edge = (tr.edge * 7 + 5) % L.edgeCount; }
            if (prog < 0) continue;
            prog = 0;
          }
          const e = tr.edge % L.edgeCount, a = L.edges[e * 2], b = L.edges[e * 2 + 1];
          const x = px[a] + (px[b] - px[a]) * prog, y = py[a] + (py[b] - py[a]) * prog;
          ctx.globalAlpha = 0.55 * Math.sin(prog * Math.PI) * base * quietFactor(x, y);
          ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    // Motion this slow reads the same at ~30fps, so every other display frame is skipped.
    const frame = (t: number) => {
      if (t - lastT >= 30) { lastT = t; draw(t); }
      raf = visible && !isStill() && !document.hidden ? requestAnimationFrame(frame) : 0;
    };
    const start = () => { if (!raf && visible && !isStill() && !document.hidden) raf = requestAnimationFrame(frame); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const onPointer = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse") return;
      const r = wrapper.getBoundingClientRect();
      pointer.tx = ev.clientX - r.left; pointer.ty = ev.clientY - r.top;
      pointer.active = pointer.ty >= 0 && pointer.ty <= r.height;
      if (!pointer.active) { pointer.tx = pointer.ty = -9999; }
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionPref = () => { stop(); draw(lastT); start(); };

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => { cancelAnimationFrame(resizeRaf); resizeRaf = requestAnimationFrame(resize); });
    ro.observe(wrapper);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); });
    io.observe(wrapper);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduceMq.addEventListener("change", onMotionPref);
    // Web fonts can shift the text after first paint; re-measure the quiet zones once they land.
    document.fonts?.ready.then(() => { if (!disposed) resize(); }).catch(() => {});

    resize();
    start();
    return () => {
      disposed = true;
      stop(); cancelAnimationFrame(resizeRaf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMq.removeEventListener("change", onMotionPref);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
