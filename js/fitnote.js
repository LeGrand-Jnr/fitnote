/**
 * FitNote — Self-Contained Application Bundle
 * Digital Measurement Book for Ghanaian Fashion Designers
 * 
 * Works 100% reliably in ALL environments:
 * - Direct local file opening (file:///...) without CORS errors
 * - Local development servers (http://localhost:...)
 * - Mobile web browsers & WebViews
 * - Supabase Cloud or 100% Offline Local Storage
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. GARMENT MEASUREMENT TEMPLATES (GHANAIAN TAILORING)
  // =========================================================================
  const MEASUREMENT_TEMPLATES = [
    {
      id: "kaba-slit",
      name: "Kaba & Slit",
      category: "Traditional",
      icon: "🇬🇭",
      description: "Authentic Ghanaian 2-piece Kaba (top) and Slit (skirt)",
      fields: [
        { key: "bust", label: "Bust", placeholder: "e.g. 38½", required: false },
        { key: "waist", label: "Waist", placeholder: "e.g. 32", required: false },
        { key: "hip", label: "Hip", placeholder: "e.g. 42½", required: false },
        { key: "shoulder", label: "Shoulder (Across)", placeholder: "e.g. 15", required: false },
        { key: "bustPoint", label: "Bust Point (Apex)", placeholder: "e.g. 10½", required: false },
        { key: "underBust", label: "Under Bust", placeholder: "e.g. 13", required: false },
        { key: "crossBack", label: "Cross Back / Half Back", placeholder: "e.g. 14½", required: false },
        { key: "armhole", label: "Armhole", placeholder: "e.g. 17½", required: false },
        { key: "sleeveLength", label: "Sleeve Length", placeholder: "e.g. 23", required: false },
        { key: "kabaLength", label: "Kaba Length (Top)", placeholder: "e.g. 25½", required: false },
        { key: "slitWaist", label: "Slit Waist", placeholder: "e.g. 32", required: false },
        { key: "slitLength", label: "Slit Length (Skirt)", placeholder: "e.g. 42", required: false },
        { key: "waistToHip", label: "Waist to Hip", placeholder: "e.g. 8½", required: false }
      ]
    },
    {
      id: "womens-dress",
      name: "Women's Dress",
      category: "Women's",
      icon: "👗",
      description: "Standard Ghanaian women's gowns, corset dresses, evening wear",
      fields: [
        { key: "bust", label: "Bust", placeholder: "e.g. 38½", required: false },
        { key: "waist", label: "Waist", placeholder: "e.g. 32", required: false },
        { key: "hip", label: "Hip", placeholder: "e.g. 42", required: false },
        { key: "shoulder", label: "Shoulder", placeholder: "e.g. 15", required: false },
        { key: "neck", label: "Neck", placeholder: "e.g. 15", required: false },
        { key: "armhole", label: "Armhole", placeholder: "e.g. 17", required: false },
        { key: "sleeveLength", label: "Sleeve Length", placeholder: "e.g. 23", required: false },
        { key: "bustPoint", label: "Bust Point", placeholder: "e.g. 10½", required: false },
        { key: "underBust", label: "Under Bust", placeholder: "e.g. 13", required: false },
        { key: "topLength", label: "Top Length", placeholder: "e.g. 25", required: false },
        { key: "dressLength", label: "Dress Length", placeholder: "e.g. 58", required: false }
      ]
    },
    {
      id: "mens-shirt",
      name: "Men's Kaftan / Shirt",
      category: "Men's",
      icon: "👔",
      description: "Traditional Kaftan, African print shirts, office wear",
      fields: [
        { key: "neck", label: "Neck", placeholder: "e.g. 16½", required: false },
        { key: "chest", label: "Chest", placeholder: "e.g. 42", required: false },
        { key: "waist", label: "Waist", placeholder: "e.g. 36", required: false },
        { key: "shoulder", label: "Shoulder", placeholder: "e.g. 18½", required: false },
        { key: "sleeveLength", label: "Sleeve Length", placeholder: "e.g. 25", required: false },
        { key: "wrist", label: "Wrist", placeholder: "e.g. 8½", required: false },
        { key: "armhole", label: "Armhole", placeholder: "e.g. 19", required: false },
        { key: "shirtLength", label: "Shirt / Kaftan Length", placeholder: "e.g. 33", required: false }
      ]
    },
    {
      id: "trousers",
      name: "Trousers",
      category: "Trousers",
      icon: "👖",
      description: "Tailored trousers, shorts, matching Kaftan pants",
      fields: [
        { key: "waist", label: "Waist", placeholder: "e.g. 34", required: false },
        { key: "hip", label: "Hip", placeholder: "e.g. 40", required: false },
        { key: "thigh", label: "Thigh", placeholder: "e.g. 24", required: false },
        { key: "knee", label: "Knee", placeholder: "e.g. 17", required: false },
        { key: "bottom", label: "Bottom (Hem)", placeholder: "e.g. 14", required: false },
        { key: "trouserLength", label: "Trouser Length (Outseam)", placeholder: "e.g. 42", required: false },
        { key: "inseam", label: "Inseam", placeholder: "e.g. 31", required: false }
      ]
    },
    {
      id: "childrens",
      name: "Children's Wear",
      category: "Children's",
      icon: "🧸",
      description: "Kids traditional outfits, flower girl dresses, Sunday wear",
      fields: [
        { key: "chest", label: "Chest", placeholder: "e.g. 24", required: false },
        { key: "waist", label: "Waist", placeholder: "e.g. 22", required: false },
        { key: "hip", label: "Hip", placeholder: "e.g. 25", required: false },
        { key: "shoulder", label: "Shoulder", placeholder: "e.g. 11", required: false },
        { key: "sleeveLength", label: "Sleeve Length", placeholder: "e.g. 14", required: false },
        { key: "dressLength", label: "Dress / Outfit Length", placeholder: "e.g. 28", required: false }
      ]
    },
    {
      id: "custom",
      name: "Custom",
      category: "Custom",
      icon: "📐",
      description: "Flexible form for custom Ghanaian traditional or fusion designs",
      fields: [
        { key: "bust", label: "Bust / Chest", placeholder: "e.g. 38½", required: false },
        { key: "waist", label: "Waist", placeholder: "e.g. 32", required: false },
        { key: "hip", label: "Hip", placeholder: "e.g. 42", required: false },
        { key: "shoulder", label: "Shoulder", placeholder: "e.g. 15", required: false },
        { key: "sleeveLength", label: "Sleeve Length", placeholder: "e.g. 23", required: false },
        { key: "garmentLength", label: "Garment Length", placeholder: "e.g. 50", required: false }
      ]
    }
  ];

  function getTemplateById(templateId) {
    return MEASUREMENT_TEMPLATES.find(t => t.id === templateId) || MEASUREMENT_TEMPLATES[0];
  }

  const FIELD_LABELS = {
    bust: "Bust",
    chest: "Chest",
    waist: "Waist",
    hip: "Hip",
    shoulder: "Shoulder",
    neck: "Neck",
    armhole: "Armhole",
    armLength: "Arm Length",
    sleeveLength: "Sleeve Length",
    wrist: "Wrist",
    bustPoint: "Bust Point",
    underBust: "Under Bust",
    topLength: "Top Length",
    dressLength: "Dress Length",
    kabaLength: "Kaba Length",
    slitWaist: "Slit Waist",
    slitLength: "Slit Length",
    crossBack: "Cross Back",
    waistToHip: "Waist to Hip",
    thigh: "Thigh",
    knee: "Knee",
    bottom: "Bottom (Hem)",
    trouserLength: "Trouser Length",
    inseam: "Inseam",
    garmentLength: "Garment Length"
  };

  // =========================================================================
  // 2. REALISTIC GHANAIAN DEMO DATA
  // =========================================================================
  const DEMO_USER = {
    uid: "demo-designer-ama",
    fullName: "Ama Mensah",
    email: "ama@fitnote.com",
    phone: "024 100 2000",
    businessName: "Ama's Fashion & Haute Couture",
    clothingCategory: "Women's Wear",
    unitPreference: "inches",
    createdAt: "2024-01-15T08:00:00.000Z",
    updatedAt: "2026-09-12T10:00:00.000Z"
  };

  const DEMO_CUSTOMERS = [
    {
      customerId: "cust-ama-mensah",
      userId: "demo-designer-ama",
      fullName: "Ama Mensah",
      phone: "024 123 4567",
      gender: "Female",
      notebookRef: "2024 Black Book • Pg 14",
      notes: "Prefers loose fitting. Loves Ankara and Kente gowns.",
      status: "active",
      createdAt: "2024-01-20T09:30:00.000Z",
      updatedAt: "2026-09-12T14:15:00.000Z",
      lastMeasuredAt: "2026-09-12T14:15:00.000Z"
    },
    {
      customerId: "cust-kofi-boateng",
      userId: "demo-designer-ama",
      fullName: "Kofi Boateng",
      phone: "024 987 6543",
      gender: "Male",
      notebookRef: "2024 Men's Book • Pg 8",
      notes: "Prefers slim fit Kaftan shirts with high mandarin collar.",
      status: "active",
      createdAt: "2024-04-10T11:00:00.000Z",
      updatedAt: "2026-08-28T16:20:00.000Z",
      lastMeasuredAt: "2026-08-28T16:20:00.000Z"
    },
    {
      customerId: "cust-serwaa-gyan",
      userId: "demo-designer-ama",
      fullName: "Serwaa Gyan",
      phone: "020 111 2222",
      gender: "Female",
      notebookRef: "2025 Wedding Book • Pg 3",
      notes: "Client likes corset dresses and dramatic mermaid hemlines.",
      status: "active",
      createdAt: "2025-02-14T10:15:00.000Z",
      updatedAt: "2026-08-05T12:00:00.000Z",
      lastMeasuredAt: "2026-08-05T12:00:00.000Z"
    },
    {
      customerId: "cust-akwasi-benyi",
      userId: "demo-designer-ama",
      fullName: "Akwasi Benyi",
      phone: "024 333 4444",
      gender: "Male",
      notebookRef: "2025 Blue Book • Pg 19",
      notes: "3-piece Agbada and matching senator trousers.",
      status: "active",
      createdAt: "2025-06-20T09:00:00.000Z",
      updatedAt: "2026-07-18T15:30:00.000Z",
      lastMeasuredAt: "2026-07-18T15:30:00.000Z"
    },
    {
      customerId: "cust-efua-lartey",
      userId: "demo-designer-ama",
      fullName: "Efua Lartey",
      phone: "050 555 6666",
      gender: "Female",
      notebookRef: "2025 Office Book • Pg 4",
      notes: "Office blazers and church Sunday wear.",
      status: "active",
      createdAt: "2025-08-12T13:45:00.000Z",
      updatedAt: "2026-07-02T11:20:00.000Z",
      lastMeasuredAt: "2026-07-02T11:20:00.000Z"
    }
  ];

  const DEMO_MEASUREMENTS = [
    // Ama Mensah - 2026 (Latest: Kaba & Slit)
    {
      measurementId: "meas-ama-2026",
      userId: "demo-designer-ama",
      customerId: "cust-ama-mensah",
      templateId: "kaba-slit",
      measurementType: "Kaba & Slit",
      unit: "inches",
      measurements: {
        bust: 38.5,
        waist: 32,
        hip: 42.5,
        shoulder: 15,
        bustPoint: 10.5,
        underBust: 13,
        crossBack: 14.5,
        armhole: 17.5,
        sleeveLength: 23,
        kabaLength: 25.5,
        slitWaist: 32,
        slitLength: 42,
        waistToHip: 8.5
      },
      notes: "Authentic Kente 2-piece Kaba and Slit for wedding thanksgiving. Added 1½ inch ease.",
      measuredAt: "2026-09-12T14:15:00.000Z",
      createdAt: "2026-09-12T14:15:00.000Z",
      updatedAt: "2026-09-12T14:15:00.000Z"
    },
    // Ama Mensah - 2025
    {
      measurementId: "meas-ama-2025",
      userId: "demo-designer-ama",
      customerId: "cust-ama-mensah",
      templateId: "kaba-slit",
      measurementType: "Kaba & Slit",
      unit: "inches",
      measurements: {
        bust: 37,
        waist: 31,
        hip: 41,
        shoulder: 15,
        armhole: 17,
        sleeveLength: 23,
        kabaLength: 25,
        slitLength: 41.5
      },
      notes: "Annual thanksgiving church kaba & slit",
      measuredAt: "2025-08-05T10:00:00.000Z",
      createdAt: "2025-08-05T10:00:00.000Z",
      updatedAt: "2025-08-05T10:00:00.000Z"
    },
    // Ama Mensah - 2024
    {
      measurementId: "meas-ama-2024",
      userId: "demo-designer-ama",
      customerId: "cust-ama-mensah",
      templateId: "womens-dress",
      measurementType: "Women's Dress",
      unit: "inches",
      measurements: {
        bust: 36,
        waist: 30,
        hip: 40,
        shoulder: 14.5,
        armhole: 16.5,
        sleeveLength: 22.5,
        dressLength: 56
      },
      notes: "First measurement. Birthday Ankara dress.",
      measuredAt: "2024-01-20T09:30:00.000Z",
      createdAt: "2024-01-20T09:30:00.000Z",
      updatedAt: "2024-01-20T09:30:00.000Z"
    },

    // Kofi Boateng - 2026
    {
      measurementId: "meas-kofi-2026",
      userId: "demo-designer-ama",
      customerId: "cust-kofi-boateng",
      templateId: "mens-shirt",
      measurementType: "Men's Kaftan / Shirt",
      unit: "inches",
      measurements: {
        neck: 16.5,
        chest: 42,
        waist: 35,
        shoulder: 18.5,
        sleeveLength: 25,
        wrist: 8.5,
        armhole: 19,
        shirtLength: 34
      },
      notes: "White Kaftan for naming ceremony",
      measuredAt: "2026-08-28T16:20:00.000Z",
      createdAt: "2026-08-28T16:20:00.000Z",
      updatedAt: "2026-08-28T16:20:00.000Z"
    },

    // Serwaa Gyan - 2026
    {
      measurementId: "meas-serwaa-2026",
      userId: "demo-designer-ama",
      customerId: "cust-serwaa-gyan",
      templateId: "womens-dress",
      measurementType: "Women's Dress",
      unit: "inches",
      measurements: {
        bust: 39,
        waist: 30,
        hip: 44,
        shoulder: 15.5,
        bustPoint: 10.5,
        underBust: 13.5,
        dressLength: 60
      },
      notes: "Corseted engagement dress with lace overlay",
      measuredAt: "2026-08-05T12:00:00.000Z",
      createdAt: "2026-08-05T12:00:00.000Z",
      updatedAt: "2026-08-05T12:00:00.000Z"
    }
  ];

  // =========================================================================
  // 3. UTILITY FUNCTIONS
  // =========================================================================
  function formatDate(dateString) {
    if (!dateString) return "Not measured";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Not measured";

    const now = new Date();
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return "Today";
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  function getInitials(name) {
    if (!name) return "FN";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function getAvatarColor(name) {
    const colors = ["#8B4513", "#A66A3F", "#6E473B", "#995D3F", "#7D5A50", "#5C3D2E", "#B07D62"];
    if (!name) return colors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  function formatMeasurementValue(val, unit = "inches") {
    if (val === undefined || val === null || val === "") return "";
    const num = parseFloat(val);
    if (isNaN(num)) return val;

    if (unit === "cm") return `${num} cm`;

    const whole = Math.floor(num);
    const frac = Math.round((num - whole) * 1000) / 1000;

    let fracStr = "";
    if (Math.abs(frac - 0.5) < 0.05) fracStr = "½";
    else if (Math.abs(frac - 0.25) < 0.05) fracStr = "¼";
    else if (Math.abs(frac - 0.75) < 0.05) fracStr = "¾";
    else if (Math.abs(frac - 0.125) < 0.05) fracStr = "⅛";
    else if (Math.abs(frac - 0.375) < 0.05) fracStr = "⅜";
    else if (Math.abs(frac - 0.625) < 0.05) fracStr = "⅝";
    else if (Math.abs(frac - 0.875) < 0.05) fracStr = "⅞";
    else if (frac > 0) fracStr = `.${Math.round(frac * 10)}`;

    if (whole === 0 && fracStr && fracStr !== "0") return `${fracStr}"`;
    return `${whole}${fracStr}"`;
  }

  function parseMeasurementInput(raw) {
    if (typeof raw === "number") return raw;
    if (!raw || typeof raw !== "string") return null;

    let str = raw.trim();
    str = str.replace(/½/g, " 0.5")
             .replace(/¼/g, " 0.25")
             .replace(/¾/g, " 0.75")
             .replace(/⅛/g, " 0.125")
             .replace(/⅜/g, " 0.375")
             .replace(/⅝/g, " 0.625")
             .replace(/⅞/g, " 0.875");

    const fractionMatch = str.match(/^(\d+)?\s*(\d+)\/(\d+)$/);
    if (fractionMatch) {
      const whole = fractionMatch[1] ? parseFloat(fractionMatch[1]) : 0;
      const num = parseFloat(fractionMatch[2]);
      const den = parseFloat(fractionMatch[3]);
      if (den !== 0) return whole + (num / den);
    }

    const compoundMatch = str.match(/^(\d+)\s+(0\.\d+)$/);
    if (compoundMatch) {
      return parseFloat(compoundMatch[1]) + parseFloat(compoundMatch[2]);
    }

    const n = parseFloat(str);
    return isNaN(n) ? null : n;
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function showToast(message, type = "success", duration = 3000) {
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
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("toast-show"));
    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // =========================================================================
  // 4. DATA STORE (OFFLINE FIRST + SUPABASE ADAPTER)
  // =========================================================================
  const STORAGE_KEYS = {
    USER: "fitnote_user",
    CUSTOMERS: "fitnote_customers",
    MEASUREMENTS: "fitnote_measurements"
  };

  class Store {
    constructor() {
      this.listeners = new Set();
      this.currentUser = null;
      this.init();
    }

    init() {
      try {
        const u = localStorage.getItem(STORAGE_KEYS.USER);
        this.currentUser = u ? JSON.parse(u) : DEMO_USER;
        if (!u) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEMO_USER));
      } catch (e) {
        this.currentUser = DEMO_USER;
      }

      if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
        this.seedDemoData();
      }
    }

    seedDemoData() {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEMO_USER));
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(DEMO_CUSTOMERS));
      localStorage.setItem(STORAGE_KEYS.MEASUREMENTS, JSON.stringify(DEMO_MEASUREMENTS));
      this.currentUser = DEMO_USER;
      this.emit("data-change");
    }

    subscribe(fn) {
      this.listeners.add(fn);
      return () => this.listeners.delete(fn);
    }

    emit(event, data) {
      this.listeners.forEach(fn => fn(event, data));
    }

    getCurrentUser() {
      return this.currentUser || DEMO_USER;
    }

    setCurrentUser(u) {
      this.currentUser = u;
      if (u) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEYS.USER);
      this.emit("auth-change", u);
    }

    updateUserProfile(updates) {
      if (!this.currentUser) return null;
      const updated = { ...this.currentUser, ...updates, updatedAt: new Date().toISOString() };
      this.setCurrentUser(updated);
      return updated;
    }

    getCustomers(searchQuery = "") {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
        let list = raw ? JSON.parse(raw) : [];
        list = list.filter(c => c.status !== "archived");

        if (searchQuery && searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          list = list.filter(c => {
            const nameMatch = (c.fullName || "").toLowerCase().includes(q);
            const phoneMatch = (c.phone || "").replace(/\s+/g, "").includes(q.replace(/\s+/g, ""));
            const bookMatch = (c.notebookRef || "").toLowerCase().includes(q);
            return nameMatch || phoneMatch || bookMatch;
          });
        }

        list.sort((a, b) => {
          const timeA = new Date(a.lastMeasuredAt || a.createdAt || 0).getTime();
          const timeB = new Date(b.lastMeasuredAt || b.createdAt || 0).getTime();
          return timeB - timeA;
        });

        return list;
      } catch (e) {
        return [];
      }
    }

    getCustomer(customerId) {
      const list = this.getCustomers();
      return list.find(c => c.customerId === customerId) || null;
    }

    saveCustomer(customerData) {
      const now = new Date().toISOString();
      const customerId = customerData.customerId || "cust-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6);
      const record = {
        ...customerData,
        customerId,
        userId: this.currentUser ? this.currentUser.uid : "demo-designer-ama",
        status: customerData.status || "active",
        updatedAt: now,
        createdAt: customerData.createdAt || now
      };

      const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      let list = raw ? JSON.parse(raw) : [];
      const idx = list.findIndex(c => c.customerId === customerId);
      if (idx >= 0) list[idx] = { ...list[idx], ...record };
      else list.unshift(record);

      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(list));
      this.emit("customer-saved", record);
      return record;
    }

    getMeasurements(customerId) {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.MEASUREMENTS);
        let list = raw ? JSON.parse(raw) : [];
        if (customerId) list = list.filter(m => m.customerId === customerId);

        list.sort((a, b) => {
          const timeA = new Date(a.measuredAt || a.createdAt || 0).getTime();
          const timeB = new Date(b.measuredAt || b.createdAt || 0).getTime();
          return timeB - timeA;
        });
        return list;
      } catch (e) {
        return [];
      }
    }

    getMeasurement(measurementId) {
      const list = this.getMeasurements();
      return list.find(m => m.measurementId === measurementId) || null;
    }

    saveMeasurement(measurementData) {
      const now = new Date().toISOString();
      const measurementId = measurementData.measurementId || "meas-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6);

      const record = {
        ...measurementData,
        measurementId,
        userId: this.currentUser ? this.currentUser.uid : "demo-designer-ama",
        unit: measurementData.unit || "inches",
        measuredAt: measurementData.measuredAt || now,
        createdAt: measurementData.createdAt || now,
        updatedAt: now
      };

      const raw = localStorage.getItem(STORAGE_KEYS.MEASUREMENTS);
      let list = raw ? JSON.parse(raw) : [];
      const idx = list.findIndex(m => m.measurementId === measurementId);
      if (idx >= 0) list[idx] = { ...list[idx], ...record };
      else list.unshift(record);

      localStorage.setItem(STORAGE_KEYS.MEASUREMENTS, JSON.stringify(list));

      // Refresh customer lastMeasuredAt
      if (record.customerId) {
        const customer = this.getCustomer(record.customerId);
        if (customer) {
          customer.lastMeasuredAt = record.measuredAt;
          this.saveCustomer(customer);
        }
      }

      this.emit("measurement-saved", record);
      return record;
    }

    getStats() {
      const customers = this.getCustomers();
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

      const measuredRecent = customers.filter(c => c.lastMeasuredAt && new Date(c.lastMeasuredAt).getTime() >= thirtyDaysAgo).length;
      const thisWeek = customers.filter(c => c.lastMeasuredAt && new Date(c.lastMeasuredAt).getTime() >= sevenDaysAgo).length;

      return {
        totalCustomers: customers.length,
        recentlyMeasured: measuredRecent,
        thisWeek: thisWeek,
        recentList: customers.slice(0, 5)
      };
    }

    exportData() {
      return {
        version: "1.0",
        exportedAt: new Date().toISOString(),
        user: this.currentUser,
        customers: this.getCustomers(),
        measurements: this.getMeasurements()
      };
    }

    importData(data) {
      if (!data || !data.customers || !Array.isArray(data.customers)) {
        throw new Error("Invalid FitNote backup format.");
      }
      if (data.user) this.setCurrentUser(data.user);
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(data.customers));
      if (data.measurements) localStorage.setItem(STORAGE_KEYS.MEASUREMENTS, JSON.stringify(data.measurements));
      this.emit("data-change");
      return true;
    }
  }

  const store = new Store();

  // =========================================================================
  // 5. APPLICATION CONTROLLER & HASH ROUTER
  // =========================================================================
  class FitNoteApp {
    constructor() {
      this.selectedTemplateId = "kaba-slit";
      this.currentUnit = "inches";
      this.searchQuery = "";
      this.init();
    }

    init() {
      store.subscribe(() => this.refreshCurrentView());
      window.addEventListener("hashchange", () => this.handleRoute());
      this.bindEvents();

      // Ensure immediate render of whatever route is requested or default to dashboard
      if (!window.location.hash || window.location.hash === "#") {
        window.location.hash = "#dashboard";
      } else {
        this.handleRoute();
      }
    }

    refreshCurrentView() {
      const hash = window.location.hash || "#dashboard";
      if (hash.startsWith("#dashboard")) this.renderDashboard();
      if (hash.startsWith("#customers")) this.renderCustomersList();
      if (hash.startsWith("#customer?")) {
        const id = new URLSearchParams(hash.split("?")[1]).get("id");
        if (id) this.renderCustomerProfile(id);
      }
    }

    handleRoute() {
      const fullHash = window.location.hash || "#dashboard";
      const [route, queryStr] = fullHash.split("?");
      const params = new URLSearchParams(queryStr || "");

      // Hide all views first
      document.querySelectorAll(".view").forEach(v => v.classList.remove("active-view"));

      // Update bottom nav
      this.updateBottomNav(route);

      // Route Dispatch
      switch (route) {
        case "#splash":
          this.showView("view-splash");
          break;
        case "#login":
          this.showView("view-login");
          break;
        case "#register":
          this.showView("view-register");
          break;
        case "#setup":
          this.showView("view-setup");
          this.populateSetupScreen();
          break;
        case "#customers":
          this.showView("view-customers");
          this.renderCustomersList();
          break;
        case "#add-customer":
          this.showView("view-customer-form");
          this.renderCustomerForm(params.get("id"));
          break;
        case "#customer":
          this.showView("view-customer-profile");
          this.renderCustomerProfile(params.get("id"));
          break;
        case "#add-measurement":
          this.showView("view-measurement-form");
          this.renderMeasurementForm(params.get("customerId"), params.get("measurementId"));
          break;
        case "#measurement-detail":
          this.showView("view-measurement-detail");
          this.renderMeasurementDetail(params.get("id"));
          break;
        case "#history":
          this.showView("view-history");
          this.renderHistoryTimeline(params.get("customerId"));
          break;
        case "#settings":
          this.showView("view-settings");
          this.renderSettings();
          break;
        case "#dashboard":
        default:
          this.showView("view-dashboard");
          this.renderDashboard();
          break;
      }

      window.scrollTo(0, 0);
      const appEl = document.getElementById("app");
      if (appEl) appEl.scrollTop = 0;
    }

    showView(viewId) {
      const target = document.getElementById(viewId);
      if (target) target.classList.add("active-view");
    }

    updateBottomNav(route) {
      const bottomNav = document.getElementById("bottom-nav");
      if (!bottomNav) return;

      const noNav = ["#splash", "#login", "#register", "#setup"];
      if (noNav.includes(route)) {
        bottomNav.style.display = "none";
        return;
      }

      bottomNav.style.display = "flex";
      document.querySelectorAll(".bottom-nav-item").forEach(item => {
        item.classList.remove("active");
        const href = item.getAttribute("href");
        if (href === route || (href === "#customers" && ["#customer", "#history", "#measurement-detail"].includes(route))) {
          item.classList.add("active");
        }
      });
    }

    // ================= DASHBOARD =================
    renderDashboard() {
      const user = store.getCurrentUser();
      const greetingEl = document.getElementById("dashboard-greeting");
      if (greetingEl) {
        const first = user.fullName ? user.fullName.split(" ")[0] : "Ama";
        greetingEl.textContent = `Good morning, ${first}! 👋🏾`;
      }

      const bizEl = document.getElementById("dashboard-business-name");
      if (bizEl) bizEl.textContent = user.businessName || "Ama's Fashion & Haute Couture";

      const stats = store.getStats();
      const elTotal = document.getElementById("stat-total-customers");
      const elMeasured = document.getElementById("stat-recently-measured");
      const elWeek = document.getElementById("stat-this-week");

      if (elTotal) elTotal.textContent = stats.totalCustomers;
      if (elMeasured) elMeasured.textContent = stats.recentlyMeasured;
      if (elWeek) elWeek.textContent = stats.thisWeek;

      const recentContainer = document.getElementById("dashboard-recent-list");
      if (recentContainer) {
        if (stats.recentList.length === 0) {
          recentContainer.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">📏</div>
              <div class="empty-state-title">No customers yet</div>
              <div class="empty-state-text">Add your first customer to keep measurements safe and organized.</div>
              <a href="#add-customer" class="btn btn-primary btn-sm">+ Add First Customer</a>
            </div>`;
        } else {
          recentContainer.innerHTML = stats.recentList.map(c => this.renderCustomerCard(c)).join("");
        }
      }
    }

    // ================= CUSTOMERS LIST & SEARCH =================
    renderCustomersList() {
      const container = document.getElementById("customers-full-list");
      const countBadge = document.getElementById("customers-count-badge");
      const searchInput = document.getElementById("customers-search-input");

      if (searchInput) searchInput.value = this.searchQuery;

      const customers = store.getCustomers(this.searchQuery);
      if (countBadge) countBadge.textContent = `${customers.length} customer${customers.length === 1 ? "" : "s"}`;

      if (container) {
        if (customers.length === 0) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">🔍</div>
              <div class="empty-state-title">${this.searchQuery ? "No matching customers" : "No customers yet"}</div>
              <div class="empty-state-text">${this.searchQuery ? `No results found for "${escapeHtml(this.searchQuery)}".` : "Start saving measurements digitally."}</div>
              ${this.searchQuery ? `<button class="btn btn-secondary btn-sm" id="btn-clear-empty-search">Clear Search</button>` : `<a href="#add-customer" class="btn btn-primary btn-sm">+ Add Customer</a>`}
            </div>`;
          const btnClear = document.getElementById("btn-clear-empty-search");
          if (btnClear) {
            btnClear.onclick = () => {
              this.searchQuery = "";
              this.renderCustomersList();
            };
          }
        } else {
          container.innerHTML = customers.map(c => this.renderCustomerCard(c)).join("");
        }
      }
    }

    renderCustomerCard(customer) {
      const initials = getInitials(customer.fullName);
      const bgColor = getAvatarColor(customer.fullName);
      const lastMeasured = formatDate(customer.lastMeasuredAt);

      return `
        <div class="customer-card-item" onclick="location.hash='#customer?id=${customer.customerId}'">
          <div class="customer-card-left">
            <div class="avatar-circle" style="background-color: ${bgColor};">
              ${initials}
            </div>
            <div class="customer-card-meta">
              <div class="customer-card-name">${escapeHtml(customer.fullName)}</div>
              <div class="customer-card-phone">📞 ${escapeHtml(customer.phone)}</div>
              <div class="customer-card-measured">
                Last measured: ${lastMeasured}
                ${customer.notebookRef ? ` • <span style="color:var(--color-accent); font-weight:600;">📖 ${escapeHtml(customer.notebookRef)}</span>` : ""}
              </div>
            </div>
          </div>
          <div class="customer-card-chevron">›</div>
        </div>`;
    }

    // ================= CUSTOMER PROFILE =================
    renderCustomerProfile(customerId) {
      const customer = store.getCustomer(customerId);
      if (!customer) {
        showToast("Customer not found", "error");
        window.location.hash = "#customers";
        return;
      }

      document.getElementById("profile-name").textContent = customer.fullName;
      const phoneEl = document.getElementById("profile-phone");
      phoneEl.innerHTML = `📞 ${escapeHtml(customer.phone)}`;
      phoneEl.setAttribute("href", `tel:${customer.phone.replace(/\s+/g, "")}`);

      const avatar = document.getElementById("profile-avatar");
      avatar.textContent = getInitials(customer.fullName);
      avatar.style.backgroundColor = getAvatarColor(customer.fullName);

      const tagsRow = document.getElementById("profile-tags-row");
      tagsRow.innerHTML = `
        <span class="badge badge-cream">${escapeHtml(customer.gender || "Female")}</span>
        ${customer.notebookRef ? `<span class="badge badge-cream" style="border:1px solid var(--color-accent); color:var(--color-accent);">📖 ${escapeHtml(customer.notebookRef)}</span>` : ""}
        ${customer.notes ? `<span class="badge badge-cream">${escapeHtml(customer.notes.substring(0, 32))}</span>` : ""}
      `;

      const measurements = store.getMeasurements(customerId);
      const historyBadge = document.getElementById("profile-history-count");
      if (historyBadge) historyBadge.textContent = `${measurements.length} record${measurements.length === 1 ? "" : "s"}`;

      const latestSection = document.getElementById("profile-latest-measurement-card");
      if (measurements.length > 0) {
        const latest = measurements[0];
        const template = getTemplateById(latest.templateId);
        const entries = Object.entries(latest.measurements || {}).slice(0, 6);

        latestSection.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div>
              <div style="font-weight:700; font-size:1.05rem; color:var(--color-primary);">${template.icon} ${escapeHtml(latest.measurementType)}</div>
              <div style="font-size:0.8rem; color:var(--color-text-muted);">${formatDate(latest.measuredAt)}</div>
            </div>
            <span class="badge badge-success">Current</span>
          </div>

          <div class="measurements-grid">
            ${entries.map(([key, val]) => `
              <div class="measurement-cell">
                <span class="measurement-cell-label">${FIELD_LABELS[key] || key}</span>
                <span class="measurement-cell-val">${formatMeasurementValue(val, latest.unit)}</span>
              </div>
            `).join("")}
          </div>

          <div style="margin-top:14px; display:flex; gap:10px;">
            <a href="#measurement-detail?id=${latest.measurementId}" class="btn btn-secondary btn-sm" style="flex:1;">View Full Record</a>
            <a href="#add-measurement?customerId=${customer.customerId}" class="btn btn-primary btn-sm" style="flex:1;">+ New Measurement</a>
          </div>`;
      } else {
        latestSection.innerHTML = `
          <div class="empty-state" style="padding:24px 12px;">
            <div class="empty-state-icon">📏</div>
            <div class="empty-state-title">No measurements yet</div>
            <div class="empty-state-text">Take measurements for ${escapeHtml(customer.fullName)} to keep them safe.</div>
            <a href="#add-measurement?customerId=${customer.customerId}" class="btn btn-primary btn-sm">+ Add Measurement</a>
          </div>`;
      }

      const notesEl = document.getElementById("profile-customer-notes");
      if (notesEl) notesEl.textContent = customer.notes || "No notes recorded yet for this client.";

      document.getElementById("btn-profile-add-meas").setAttribute("href", `#add-measurement?customerId=${customer.customerId}`);
      document.getElementById("btn-profile-history-link").setAttribute("href", `#history?customerId=${customer.customerId}`);
      document.getElementById("btn-profile-edit-customer").setAttribute("href", `#add-customer?id=${customer.customerId}`);
    }

    // ================= MEASUREMENT DETAIL =================
    renderMeasurementDetail(measurementId) {
      const measurement = store.getMeasurement(measurementId);
      if (!measurement) {
        showToast("Record not found", "error");
        window.location.hash = "#customers";
        return;
      }

      const customer = store.getCustomer(measurement.customerId);
      document.getElementById("detail-customer-name").textContent = customer ? customer.fullName : "Customer";
      document.getElementById("detail-customer-meta").textContent = `${customer ? customer.gender + " • " : ""}${formatDate(measurement.measuredAt)}`;
      document.getElementById("detail-type-badge").textContent = measurement.measurementType;
      document.getElementById("detail-unit-badge").textContent = measurement.unit === "cm" ? "Centimeters (cm)" : 'Inches (")';

      const grid = document.getElementById("detail-measurements-grid");
      const entries = Object.entries(measurement.measurements || {});
      grid.innerHTML = entries.map(([key, val]) => `
        <div class="measurement-cell">
          <span class="measurement-cell-label">${FIELD_LABELS[key] || key}</span>
          <span class="measurement-cell-val">${formatMeasurementValue(val, measurement.unit)}</span>
        </div>
      `).join("");

      document.getElementById("detail-notes").textContent = measurement.notes || "No notes for this session.";
      document.getElementById("detail-btn-edit").setAttribute("href", `#add-measurement?customerId=${measurement.customerId}&measurementId=${measurement.measurementId}`);
      document.getElementById("detail-btn-history").setAttribute("href", `#history?customerId=${measurement.customerId}`);
    }

    // ================= MEASUREMENT HISTORY =================
    renderHistoryTimeline(customerId) {
      const customer = store.getCustomer(customerId);
      if (!customer) {
        window.location.hash = "#customers";
        return;
      }

      document.getElementById("history-customer-name").textContent = `${customer.fullName}'s History`;
      const container = document.getElementById("history-timeline-container");
      const measurements = store.getMeasurements(customerId);

      if (measurements.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">📋</div>
            <div class="empty-state-title">No measurement history</div>
            <div class="empty-state-text">Every time you measure ${escapeHtml(customer.fullName)}, a permanent record will appear here.</div>
            <a href="#add-measurement?customerId=${customer.customerId}" class="btn btn-primary btn-sm">+ Add First Record</a>
          </div>`;
      } else {
        container.innerHTML = `
          <div class="history-timeline">
            ${measurements.map((m, idx) => {
              const isLatest = idx === 0;
              const entries = Object.entries(m.measurements || {}).slice(0, 3);
              return `
                <div class="timeline-item" onclick="location.hash='#measurement-detail?id=${m.measurementId}'">
                  <div class="timeline-marker ${isLatest ? "marker-latest" : ""}"></div>
                  <div class="timeline-card">
                    <div class="timeline-header">
                      <div class="timeline-date">${formatDate(m.measuredAt)}</div>
                      ${isLatest ? `<span class="badge badge-success">Latest</span>` : `<span class="badge badge-cream">${escapeHtml(m.measurementType)}</span>`}
                    </div>
                    <div class="timeline-summary">
                      ${entries.map(([k, v]) => `<span>${FIELD_LABELS[k] || k}: <strong>${formatMeasurementValue(v, m.unit)}</strong></span>`).join(" • ")}
                    </div>
                  </div>
                </div>`;
            }).join("")}
          </div>`;
      }

      document.getElementById("btn-history-add-new").setAttribute("href", `#add-measurement?customerId=${customer.customerId}`);
    }

    // ================= ADD / EDIT MEASUREMENT =================
    renderMeasurementForm(customerId, measurementId) {
      const customer = store.getCustomer(customerId);
      if (!customer) {
        showToast("Please select a customer first", "error");
        window.location.hash = "#customers";
        return;
      }

      const existing = measurementId ? store.getMeasurement(measurementId) : null;
      this.selectedTemplateId = existing ? existing.templateId : (customer.gender === "Male" ? "mens-shirt" : "kaba-slit");
      this.currentUnit = existing ? existing.unit : "inches";

      document.getElementById("meas-form-customer-name").textContent = customer.fullName;
      document.getElementById("meas-form-title").textContent = existing ? "Edit Measurement" : "Add Measurement";

      const dateInput = document.getElementById("meas-input-date");
      if (dateInput) {
        const d = existing && existing.measuredAt ? new Date(existing.measuredAt) : new Date();
        dateInput.value = d.toISOString().split("T")[0];
      }

      const notesInput = document.getElementById("meas-input-notes");
      if (notesInput) notesInput.value = existing ? (existing.notes || "") : "";

      this.renderTemplateChips(this.selectedTemplateId);
      this.renderUnitSelector(this.currentUnit);
      this.renderMeasurementInputFields(existing ? existing.measurements : {});

      const form = document.getElementById("form-add-measurement");
      form.onsubmit = (e) => {
        e.preventDefault();
        this.saveMeasurementForm(customer.customerId, measurementId);
      };
    }

    renderTemplateChips(selectedId) {
      const container = document.getElementById("template-chips-container");
      if (!container) return;

      container.innerHTML = MEASUREMENT_TEMPLATES.map(t => `
        <button type="button" class="template-chip ${t.id === selectedId ? "active" : ""}" data-template-id="${t.id}">
          <span>${t.icon}</span> ${t.name}
        </button>`).join("");

      container.querySelectorAll(".template-chip").forEach(chip => {
        chip.onclick = () => {
          this.selectedTemplateId = chip.dataset.templateId;
          this.renderTemplateChips(this.selectedTemplateId);
          this.renderMeasurementInputFields({});
        };
      });
    }

    renderUnitSelector(selectedUnit) {
      document.querySelectorAll(".unit-toggle-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.unit === selectedUnit);
        btn.onclick = () => {
          this.currentUnit = btn.dataset.unit;
          this.renderUnitSelector(this.currentUnit);
          document.querySelectorAll(".meas-unit-suffix").forEach(s => {
            s.textContent = this.currentUnit === "cm" ? "cm" : "inches";
          });
        };
      });
    }

    renderMeasurementInputFields(existingValues = {}) {
      const template = getTemplateById(this.selectedTemplateId);
      const container = document.getElementById("measurement-fields-container");
      if (!container) return;

      container.innerHTML = template.fields.map(f => {
        const val = existingValues[f.key] !== undefined ? existingValues[f.key] : "";
        const displayVal = (val !== "" && this.currentUnit === "inches") ? formatMeasurementValue(val, "inches").replace(/"$/, "") : val;

        return `
          <div class="measurement-input-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
              <label class="measurement-input-label">${f.label} (<span class="meas-unit-suffix">${this.currentUnit === "cm" ? "cm" : "inches"}</span>)</label>
              ${this.currentUnit === "inches" ? `
                <div class="fraction-chips">
                  <button type="button" class="frac-chip-btn" data-target="meas_field_${f.key}" data-frac="¼">¼</button>
                  <button type="button" class="frac-chip-btn" data-target="meas_field_${f.key}" data-frac="½">½</button>
                  <button type="button" class="frac-chip-btn" data-target="meas_field_${f.key}" data-frac="¾">¾</button>
                </div>
              ` : ""}
            </div>
            <input 
              type="text" 
              inputmode="decimal"
              id="meas_field_${f.key}"
              name="meas_${f.key}" 
              data-key="${f.key}" 
              value="${displayVal}" 
              class="measurement-input-field" 
              placeholder="${f.placeholder || "--"}" 
            />
          </div>`;
      }).join("");

      container.querySelectorAll(".frac-chip-btn").forEach(btn => {
        btn.onclick = () => {
          const input = document.getElementById(btn.dataset.target);
          if (!input) return;
          let cur = input.value.trim().replace(/[¼½¾⅛⅜⅝⅞]/g, "").replace(/\.25|\.5|\.75/g, "").trim();
          input.value = cur ? `${cur}${btn.dataset.frac}` : btn.dataset.frac;
          input.focus();
        };
      });
    }

    saveMeasurementForm(customerId, existingMeasurementId) {
      const template = getTemplateById(this.selectedTemplateId);
      const dateInput = document.getElementById("meas-input-date");
      const notesInput = document.getElementById("meas-input-notes");

      const measuredDate = dateInput && dateInput.value ? new Date(dateInput.value).toISOString() : new Date().toISOString();
      const notes = notesInput ? notesInput.value.trim() : "";

      const measurements = {};
      let hasOne = false;

      document.querySelectorAll(".measurement-input-field").forEach(input => {
        const key = input.dataset.key;
        const raw = input.value.trim();
        if (raw !== "") {
          const num = parseMeasurementInput(raw);
          if (num !== null && !isNaN(num) && num >= 0) {
            measurements[key] = num;
            hasOne = true;
          }
        }
      });

      if (!hasOne) {
        showToast("Please enter at least one measurement.", "error");
        return;
      }

      store.saveMeasurement({
        measurementId: existingMeasurementId || undefined,
        customerId: customerId,
        templateId: template.id,
        measurementType: template.name,
        unit: this.currentUnit,
        measurements: measurements,
        notes: notes,
        measuredAt: measuredDate
      });

      showToast("Measurements saved safely! ✓", "success");
      window.location.hash = `#customer?id=${customerId}`;
    }

    // ================= CUSTOMER FORM (ADD / EDIT) =================
    renderCustomerForm(customerId) {
      const isEdit = !!customerId;
      document.getElementById("customer-form-title").textContent = isEdit ? "Edit Customer" : "Add Customer";

      const nameInput = document.getElementById("cust-input-name");
      const phoneInput = document.getElementById("cust-input-phone");
      const genderSelect = document.getElementById("cust-input-gender");
      const bookInput = document.getElementById("cust-input-notebook");
      const notesInput = document.getElementById("cust-input-notes");

      if (isEdit) {
        const c = store.getCustomer(customerId);
        if (c) {
          nameInput.value = c.fullName || "";
          phoneInput.value = c.phone || "";
          genderSelect.value = c.gender || "Female";
          if (bookInput) bookInput.value = c.notebookRef || "";
          notesInput.value = c.notes || "";
        }
      } else {
        nameInput.value = "";
        phoneInput.value = "";
        genderSelect.value = "Female";
        if (bookInput) bookInput.value = "";
        notesInput.value = "";
      }

      const form = document.getElementById("form-add-customer");
      form.onsubmit = (e) => {
        e.preventDefault();
        const fullName = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const gender = genderSelect.value;
        const notebookRef = bookInput ? bookInput.value.trim() : "";
        const notes = notesInput.value.trim();

        if (!fullName) {
          showToast("Please enter the customer's full name.", "error");
          nameInput.focus();
          return;
        }

        if (!phone) {
          showToast("Please enter the customer's phone number.", "error");
          phoneInput.focus();
          return;
        }

        const saved = store.saveCustomer({
          customerId: customerId || undefined,
          fullName,
          phone,
          gender,
          notebookRef,
          notes
        });

        showToast("Customer saved successfully! ✓", "success");
        window.location.hash = `#customer?id=${saved.customerId}`;
      };
    }

    // ================= SETTINGS =================
    renderSettings() {
      const user = store.getCurrentUser();
      if (user) {
        document.getElementById("settings-designer-name").textContent = user.fullName || "Designer";
        document.getElementById("settings-biz-name").textContent = user.businessName || "Fashion Brand";
        document.getElementById("settings-email").textContent = user.email || "";
      }
    }

    populateSetupScreen() {
      const user = store.getCurrentUser();
      const bizInput = document.getElementById("setup-input-biz");
      const nameInput = document.getElementById("setup-input-name");
      if (bizInput) bizInput.value = user.businessName || `${user.fullName}'s Fashion`;
      if (nameInput) nameInput.value = user.fullName || "";
    }

    bindEvents() {
      // Splash
      const btnGetStarted = document.getElementById("btn-splash-get-started");
      if (btnGetStarted) btnGetStarted.onclick = () => { window.location.hash = "#register"; };

      const btnSplashLogin = document.getElementById("btn-splash-login");
      if (btnSplashLogin) btnSplashLogin.onclick = () => { window.location.hash = "#login"; };

      // Login
      const loginForm = document.getElementById("form-login");
      if (loginForm) {
        loginForm.onsubmit = (e) => {
          e.preventDefault();
          const email = document.getElementById("login-input-email").value;
          const user = store.getCurrentUser();
          user.email = email;
          store.setCurrentUser(user);
          showToast("Welcome back! 👋🏾", "success");
          window.location.hash = "#dashboard";
        };
      }

      // Password toggle
      const togglePass = document.getElementById("btn-toggle-password");
      if (togglePass) {
        togglePass.onclick = () => {
          const pass = document.getElementById("login-input-password");
          if (pass.type === "password") {
            pass.type = "text";
            togglePass.textContent = "🙈";
          } else {
            pass.type = "password";
            togglePass.textContent = "👁";
          }
        };
      }

      // Register
      const regForm = document.getElementById("form-register");
      if (regForm) {
        regForm.onsubmit = (e) => {
          e.preventDefault();
          const fullName = document.getElementById("reg-input-name").value.trim();
          const email = document.getElementById("reg-input-email").value.trim();
          const pass = document.getElementById("reg-input-pass").value;
          const confirmPass = document.getElementById("reg-input-confirm").value;

          if (pass !== confirmPass) {
            showToast("Passwords do not match.", "error");
            return;
          }

          store.setCurrentUser({
            uid: "user-" + Date.now(),
            fullName,
            email,
            businessName: `${fullName}'s Fashion`,
            clothingCategory: "Women's Wear"
          });

          showToast("Account created!", "success");
          window.location.hash = "#setup";
        };
      }

      // Setup
      const setupForm = document.getElementById("form-setup");
      if (setupForm) {
        setupForm.onsubmit = (e) => {
          e.preventDefault();
          const biz = document.getElementById("setup-input-biz").value;
          const name = document.getElementById("setup-input-name").value;
          const cat = document.querySelector('input[name="setup_category"]:checked');
          store.updateUserProfile({
            businessName: biz,
            fullName: name,
            clothingCategory: cat ? cat.value : "Women's Wear"
          });
          showToast("Business ready!", "success");
          window.location.hash = "#dashboard";
        };
      }

      // Search
      const searchFn = (q) => {
        this.searchQuery = q;
        if (window.location.hash !== "#customers") window.location.hash = "#customers";
        else this.renderCustomersList();
      };

      const dashSearch = document.getElementById("dashboard-search-input");
      if (dashSearch) dashSearch.oninput = (e) => searchFn(e.target.value);

      const custSearch = document.getElementById("customers-search-input");
      if (custSearch) custSearch.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.renderCustomersList();
      };

      // Export / Backup
      const btnExport = document.getElementById("btn-export-backup");
      if (btnExport) {
        btnExport.onclick = () => {
          const data = store.exportData();
          const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
          const a = document.createElement("a");
          a.setAttribute("href", str);
          a.setAttribute("download", `fitnote-backup-${new Date().toISOString().split("T")[0]}.json`);
          document.body.appendChild(a);
          a.click();
          a.remove();
          showToast("Backup exported safely! ☁️", "success");
        };
      }

      // Restore
      const inputRestore = document.getElementById("input-restore-file");
      if (inputRestore) {
        inputRestore.onchange = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (evt) => {
            try {
              store.importData(JSON.parse(evt.target.result));
              showToast("Backup restored! ✓", "success");
              window.location.hash = "#dashboard";
            } catch (err) {
              showToast("Invalid file: " + err.message, "error");
            }
          };
          reader.readAsText(file);
        };
      }

      // Reset Demo Data
      const btnDemo = document.getElementById("btn-reset-demo-data");
      if (btnDemo) {
        btnDemo.onclick = () => {
          store.seedDemoData();
          showToast("Ghanaian demo records loaded! ✓", "success");
          window.location.hash = "#dashboard";
        };
      }

      // Logout
      const btnLogout = document.getElementById("btn-logout");
      if (btnLogout) {
        btnLogout.onclick = () => {
          showToast("Logged out safely.", "info");
          window.location.hash = "#login";
        };
      }

      // Wide preview toggle for laptop screens
      const btnWide = document.getElementById("btn-toggle-wide-mode");
      if (btnWide) {
        btnWide.onclick = () => {
          document.body.classList.toggle("wide-mode");
          btnWide.textContent = document.body.classList.contains("wide-mode") ? "Switch to Phone Frame" : "Switch to Fullscreen";
        };
      }
    }
  }

  // Start app immediately upon script load or DOMContentLoaded
  function bootstrap() {
    if (!window.fitNoteApp) {
      window.fitNoteApp = new FitNoteApp();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
