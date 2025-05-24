
import React from "react";
import "./Button.css";

function Button({
    name,
    icon,
    onClick,
    bg = "#007BFF",
    bPad = "12px 24px",
    color = "#fff",
    bRad = "8px",
    disabled = false,
    loading = false
}) {
    return (
        <button
            className={`custom-button ${disabled ? "disabled" : ""}`}
            style={{
                background: bg,
                padding: bPad,
                borderRadius: bRad,
                color: color,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.6 : 1,
            }}
            onClick={disabled ? null : onClick}
            disabled={disabled}
        >
            {loading ? <span className="loader"></span> : icon}
            {loading ? "Loading..." : name}
        </button>
    );
}

export default Button;
