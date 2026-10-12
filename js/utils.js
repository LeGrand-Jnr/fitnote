/**
 * FitNote - Helper Utilities
 * Formats, conversions, toasts, avatars, and Ghanaian phone formatting
 */

/**
 * Format date nicely like Ghanaian fashion books: "12 Sept 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return "Not measured";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Not measured";

  const now = new Date();
  const isToday = (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );

  if (isToday) return "Today";

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Format full timestamp with time: "12 Sept 2026, 2:30 PM"
 */
export function formatDateTime(dateString) {
  if (!dateString) return "Never";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Never";

  const formattedDate = formatDate(dateString);
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${formattedDate}, ${time}`;
}

/**
 * Generate 2-letter avatar initials (e.g., "Ama Mensah" -> "AM")
 */
export function getInitials(name) {
  if (!name) return "FN";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Generate consistent warm avatar color based on name
 */
export function getAvatarColor(name) {
  const colors = [
    "#8B4513", // Saddle Brown
    "#A66A3F", // Terracotta
    "#6E473B", // Rich Espresso
    "#995D3F", // Caramel
    "#7D5A50", // Muted Umber
    "#5C3D2E", // Deep Mocha
    "#B07D62"  // Warm Sandstone
  ];
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Convert measurement between inches and cm
 */
export function convertUnit(val, fromUnit, toUnit) {
  const num = parseFloat(val);
  if (isNaN(num)) return "";
  if (fromUnit === toUnit) return num;
  if (fromUnit === "inches" && toUnit === "cm") {
    return Math.round(num * 2.54 * 10) / 10;
  }
  if (fromUnit === "cm" && toUnit === "inches") {
    return Math.round((num / 2.54) * 10) / 10;
  }
  return num;
}

/**
 * Format measurement number with whole and fractions (e.g., 38.5 -> 38½", 15.25 -> 15¼")
 * Matches Ghanaian tailoring tape measure conventions
 */
export function formatMeasurementValue(val, unit = "inches") {
  if (val === undefined || val === null || val === "") return "";
  const num = parseFloat(val);
  if (isNaN(num)) return val;

  if (unit === "cm") {
    return `${num} cm`;
  }

  // Inches fraction mapping
  const whole = Math.floor(num);
  const frac = Math.round((num - whole) * 1000) / 1000;

  let fracStr = "";
  if (Math.abs(frac - 0.5) < 0.05) {
    fracStr = "½";
  } else if (Math.abs(frac - 0.25) < 0.05) {
    fracStr = "¼";
  } else if (Math.abs(frac - 0.75) < 0.05) {
    fracStr = "¾";
  } else if (Math.abs(frac - 0.125) < 0.05) {
    fracStr = "⅛";
  } else if (Math.abs(frac - 0.375) < 0.05) {
    fracStr = "⅜";
  } else if (Math.abs(frac - 0.625) < 0.05) {
    fracStr = "⅝";
  } else if (Math.abs(frac - 0.875) < 0.05) {
    fracStr = "⅞";
  } else if (frac > 0) {
    // Other decimals
    fracStr = `.${Math.round(frac * 10)}`;
  }

  if (whole === 0 && fracStr && fracStr !== "0") {
    return `${fracStr}"`;
  }
  return `${whole}${fracStr}"`;
}

/**
 * Parse input string which could be "38 1/2", "38½", "38.5", "38¼" into numeric float
 */
export function parseMeasurementInput(raw) {
  if (typeof raw === "number") return raw;
  if (!raw || typeof raw !== "string") return null;

  let str = raw.trim();
  // Replace unicode fractions
  str = str.replace(/½/g, " 0.5")
           .replace(/¼/g, " 0.25")
           .replace(/¾/g, " 0.75")
           .replace(/⅛/g, " 0.125")
           .replace(/⅜/g, " 0.375")
           .replace(/⅝/g, " 0.625")
           .replace(/⅞/g, " 0.875");

  // Handle "38 1/2" or "38 1/4"
  const fractionMatch = str.match(/^(\d+)?\s*(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const whole = fractionMatch[1] ? parseFloat(fractionMatch[1]) : 0;
    const numerator = parseFloat(fractionMatch[2]);
    const denominator = parseFloat(fractionMatch[3]);
    if (denominator !== 0) {
      return whole + (numerator / denominator);
    }
  }

  // Handle "38 0.5" from previous replace
  const compoundMatch = str.match(/^(\d+)\s+(0\.\d+)$/);
  if (compoundMatch) {
    return parseFloat(compoundMatch[1]) + parseFloat(compoundMatch[2]);
  }

  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Show a sleek floating toast notification
 */
export function showToast(message, type = "success", duration = 3200) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  // Trigger smooth animate in
  requestAnimationFrame(() => {
    toast.classList.add("toast-show");
  });

  setTimeout(() => {
    toast.classList.remove("toast-show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
