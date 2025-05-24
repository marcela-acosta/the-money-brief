import React, { useRef, useState } from "react";

export default function Money3DSpinner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#10B981");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
    // Cambia el color de verde a azul según la posición horizontal
    const percent = x / rect.width;
    // Interpolación de color entre verde (#10B981) y azul (#3B82F6)
    const r1 = 16,
      g1 = 185,
      b1 = 129; // verde
    const r2 = 59,
      g2 = 130,
      b2 = 246; // azul
    const r = Math.round(r1 + (r2 - r1) * percent);
    const g = Math.round(g1 + (g2 - g1) * percent);
    const b = Math.round(b1 + (b2 - b1) * percent);
    setColor(`rgb(${r},${g},${b})`);
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setColor("#10B981");
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100vw",
        height: "80vh",
        minHeight: 400,
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        background: "#fff",
      }}
    >
      <svg
        className="animate-spin"
        width={120}
        height={120}
        viewBox="0 0 50 50"
        style={{
          display: "block",
          position: "absolute",
          left: pos.x - 60, // 60 = 120/2 para centrar
          top: pos.y - 60,
          pointerEvents: "none",
          transition: "left 0.1s linear, top 0.1s linear",
        }}
      >
        <circle
          className="opacity-20"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="5"
          fill="none"
        />
        <circle
          className="opacity-80"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="5"
          fill="none"
          strokeDasharray="100"
          strokeDashoffset="60"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          textAlign: "center",
          color: color,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: 0.5,
          fontFamily: "Inter, sans-serif",
          textShadow: "0 2px 8px rgba(16,185,129,0.08)",
        }}
      >
        Just a moment while we prepare your personalized financial results!
      </div>
    </div>
  );
}
