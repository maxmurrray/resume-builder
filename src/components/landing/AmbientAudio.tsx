"use client";

import { useState, useRef, useCallback } from "react";

/**
 * Generates a gentle lofi ambient soundscape using Web Audio API.
 * Layers: warm pad chord, filtered noise texture, subtle sub bass.
 */
export default function AmbientAudio() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  const start = useCallback(() => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const nodes: AudioNode[] = [];

    // Master gain (keep it quiet — background vibes)
    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2);
    master.connect(ctx.destination);
    nodes.push(master);

    // --- Warm pad chord (C3, E3, G3, B3) ---
    const padFreqs = [130.81, 164.81, 196.0, 246.94];
    padFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      // Slow detune drift for warmth
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.15 + i * 0.05;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 2.5;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);
      lfo.start();

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.06;
      osc.connect(oscGain);
      oscGain.connect(master);
      osc.start();
      nodes.push(osc, lfo, oscGain, lfoGain);
    });

    // --- Second layer: octave-up triangle for shimmer ---
    [261.63, 329.63].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.08 + i * 0.03;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 1.5;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);
      lfo.start();

      // Slow tremolo
      const tremolo = ctx.createGain();
      tremolo.gain.value = 0.03;
      const tremoloLfo = ctx.createOscillator();
      tremoloLfo.type = "sine";
      tremoloLfo.frequency.value = 0.2 + i * 0.1;
      const tremoloDepth = ctx.createGain();
      tremoloDepth.gain.value = 0.015;
      tremoloLfo.connect(tremoloDepth);
      tremoloDepth.connect(tremolo.gain);
      tremoloLfo.start();

      osc.connect(tremolo);
      tremolo.connect(master);
      osc.start();
      nodes.push(osc, lfo, lfoGain, tremolo, tremoloLfo, tremoloDepth);
    });

    // --- Filtered noise for vinyl/tape texture ---
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 800;
    noiseFilter.Q.value = 0.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.012;

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
    nodes.push(noise, noiseFilter, noiseGain);

    nodesRef.current = nodes;
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    // Fade out
    const master = nodesRef.current[0] as GainNode;
    if (master && master.gain) {
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    }

    setTimeout(() => {
      ctx.close();
      ctxRef.current = null;
      nodesRef.current = [];
    }, 600);

    setPlaying(false);
  }, []);

  return (
    <button
      onClick={playing ? stop : start}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center transition-all duration-200 hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.1)] active:scale-[0.95]"
      aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      title={playing ? "Pause music" : "Play ambient music"}
    >
      {playing ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="1" width="3.5" height="12" rx="1" fill="#1d1d1f" />
          <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="#1d1d1f" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 1.5V12.5L12 7L3 1.5Z" fill="#1d1d1f" />
        </svg>
      )}
    </button>
  );
}
