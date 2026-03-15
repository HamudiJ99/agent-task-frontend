import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        background: "transparent",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s",
        color: "var(--foreground)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "var(--accent)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
