/**
 * FitNote - Core Application Controller
 * Digital Measurement Book for Ghanaian Fashion Designers
 */

import { store } from "./store.js";
import { authService } from "./auth.js";
import { MEASUREMENT_TEMPLATES, getTemplateById, FIELD_LABELS } from "./templates.js";
import { formatDate, formatDateTime, getInitials, getAvatarColor, convertUnit, formatMeasurementValue, parseMeasurementInput, escapeHtml, showToast } from "./utils.js";
import { isFirebaseConfigured } from "./firebase-config.js";

class FitNoteApp {
  constructor() {
    this.currentCustomer = null;
    this.currentMeasurement = null;
    this.selectedTemplateId = "kaba-slit";
    this.currentUnit = "inches";
    this.searchQuery = "";
    this.activeProfileTab = "measurements";

    this.init();
  }

  async init() {
    // Listen to store updates
    store.subscribe((event, data) => this.handleStoreEvent(event, data));

    // Setup global hash router
    window.addEventListener("hashchange", () => this.handleRoute());

    // Setup global listeners (forms, search, preview toggle)
    this.bindGlobalEvents();

    // Initial sync status update
    this.updateSyncBadge();

    // First route load
    this.handleRoute();
  }

  handleStoreEvent(event, data) {
    if (event === "sync-status" || event === "ready") {
      this.updateSyncBadge();
    }
    if (event === "customer-saved" || event === "customer-archived" || event === "data-restored") {
      this.refreshCurrentView();
    }
    if (event === "auth-change") {
      this.updateSyncBadge();
      this.handleRoute();
    }
  }

  updateSyncBadge() {
    const badges = document.querySelectorAll(".sync-status-indicator");
    const isCloud = isFirebaseConfigured();
    const isOnline = navigator.onLine;

    badges.forEach(badge => {
      if (!isOnline) {
        badge.innerHTML = `<span style="color:#C5221F">●</span> Offline (Saved locally)`;
      } else if (isCloud) {
        badge.innerHTML = `<span style="color:#137333">✓</span> Synced with Cloud`;
      } else {
        badge.innerHTML = `<span style="color:#B06000">⚡</span> Local Storage (Offline-ready)`;
      }
    });
  }

  refreshCurrentView() {
    const hash = window.location.hash || "#dashboard";
    if (hash.startsWith("#dashboard")) this.renderDashboard();
    if (hash.startsWith("#customers")) this.renderCustomersList();
    if (hash.startsWith("#customer?")) {
      const params = new URLSearchParams(hash.split("?")[1]);
      const id = params.get("id");
      if (id) this.renderCustomerProfile(id);
    }
  }

  // ================= ROUTER =================

  async handleRoute() {
    const fullHash = window.location.hash || "";
    const [route, queryStr] = fullHash.split("?");
    const params = new URLSearchParams(queryStr || "");
    const user = store.getCurrentUser();

    // If no user exists and route is not splash/login/register, redirect to splash
    if (!user && !["#splash", "#login", "#register"].includes(route)) {
      if (!fullHash) {
        window.location.hash = "#splash";
      } else {
        window.location.hash = "#login";
      }
      return;
    }

    // Hide all views first
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active-view"));

    // Update bottom nav active state
    this.updateBottomNav(route);

    // Route dispatch
    switch (route) {
      case "#splash":
      case "":
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

      case "#dashboard":
        this.showView("view-dashboard");
        await this.renderDashboard();
        break;

      case "#customers":
        this.showView("view-customers");
        await this.renderCustomersList();
        break;

      case "#add-customer":
        this.showView("view-customer-form");
        this.renderCustomerForm(params.get("id"));
        break;

      case "#customer":
        this.showView("view-customer-profile");
        await this.renderCustomerProfile(params.get("id"));
        break;

      case "#add-measurement":
        this.showView("view-measurement-form");
        await this.renderMeasurementForm(params.get("customerId"), params.get("measurementId"));
        break;

      case "#measurement-detail":
        this.showView("view-measurement-detail");
        await this.renderMeasurementDetail(params.get("id"));
        break;

      case "#history":
        this.showView("view-history");
        await this.renderHistoryTimeline(params.get("customerId"));
        break;

      case "#settings":
        this.showView("view-settings");
        this.renderSettings();
        break;

      default:
        window.location.hash = "#dashboard";
        break;
    }

    // Scroll to top on view change
    const appEl = document.getElementById("app");
    if (appEl) appEl.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  showView(viewId) {
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add("active-view");
    }
  }

  updateBottomNav(route) {
    const bottomNav = document.getElementById("bottom-nav");
    if (!bottomNav) return;

    // Hide bottom nav on splash, login, register, setup
    const noNavRoutes = ["#splash", "#login", "#register", "#setup", ""];
    if (noNavRoutes.includes(route)) {
      bottomNav.style.display = "none";
      return;
    }

    bottomNav.style.display = "flex";

    document.querySelectorAll(".bottom-nav-item").forEach(item => {
      item.classList.remove("active");
      const targetHash = item.getAttribute("href");
      if (targetHash === route || (targetHash === "#customers" && (route === "#customer" || route === "#history" || route === "#measurement-detail"))) {
        item.classList.add("active");
      }
    });
  }

  // ================= VIEW: DASHBOARD =================

  async renderDashboard() {
    const user = store.getCurrentUser();
    if (!user) return;

    // Greeting
    const greetingEl = document.getElementById("dashboard-greeting");
    if (greetingEl) {
      const firstName = user.fullName ? user.fullName.split(" ")[0] : "Ama";
      greetingEl.textContent = `Good morning, ${firstName}! 👋🏾`;
    }

    // Business Name
    const bizEl = document.getElementById("dashboard-business-name");
    if (bizEl) {
      bizEl.textContent = user.businessName || "Your Fashion Business";
    }

    // Stats
    const stats = await store.getDashboardStats();
    document.getElementById("stat-total-customers").textContent = stats.totalCustomers;
    document.getElementById("stat-recently-measured").textContent = stats.recentlyMeasured;
    document.getElementById("stat-this-week").textContent = stats.thisWeek;

    // Recent Customers List
    const recentContainer = document.getElementById("dashboard-recent-list");
    if (!recentContainer) return;

    if (stats.recentList.length === 0) {
      recentContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📏</div>
          <div class="empty-state-title">No customers yet</div>
          <div class="empty-state-text">Add your first customer to keep measurements safe and organized.</div>
          <a href="#add-customer" class="btn btn-primary btn-sm">+ Add First Customer</a>
        </div>
      `;
      return;
    }

    recentContainer.innerHTML = stats.recentList.map(c => this.renderCustomerCardHtml(c)).join("");
  }

  // ================= VIEW: CUSTOMERS LIST & FAST SEARCH =================

  async renderCustomersList() {
    const container = document.getElementById("customers-full-list");
    const countBadge = document.getElementById("customers-count-badge");
    const searchInput = document.getElementById("customers-search-input");

    if (searchInput) {
      searchInput.value = this.searchQuery;
    }

    const customers = await store.getCustomers(this.searchQuery);

    if (countBadge) {
      countBadge.textContent = `${customers.length} customer${customers.length === 1 ? "" : "s"}`;
    }

    if (!container) return;

    if (customers.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-title">${this.searchQuery ? "No matching customers" : "No customers yet"}</div>
          <div class="empty-state-text">
            ${this.searchQuery ? `No results found for "${escapeHtml(this.searchQuery)}". Check phone number or spelling.` : "Start recording measurements digitally today."}
          </div>
          ${this.searchQuery ? `<button class="btn btn-secondary btn-sm" id="btn-clear-search-empty">Clear Search</button>` : `<a href="#add-customer" class="btn btn-primary btn-sm">+ Add Customer</a>`}
        </div>
      `;
      const clearBtn = document.getElementById("btn-clear-search-empty");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          this.searchQuery = "";
          this.renderCustomersList();
        });
      }
      return;
    }

    container.innerHTML = customers.map(c => this.renderCustomerCardHtml(c)).join("");
  }

  renderCustomerCardHtml(customer) {
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
      </div>
    `;
  }

  // ================= VIEW: CUSTOMER PROFILE =================

  async renderCustomerProfile(customerId) {
    const customer = await store.getCustomer(customerId);
    if (!customer) {
      showToast("Customer not found", "error");
      window.location.hash = "#customers";
      return;
    }

    this.currentCustomer = customer;

    // Header info
    document.getElementById("profile-name").textContent = customer.fullName;
    document.getElementById("profile-phone").innerHTML = `📞 ${escapeHtml(customer.phone)}`;
    document.getElementById("profile-phone").setAttribute("href", `tel:${customer.phone.replace(/\s+/g, "")}`);

    const avatar = document.getElementById("profile-avatar");
    avatar.textContent = getInitials(customer.fullName);
    avatar.style.backgroundColor = getAvatarColor(customer.fullName);

    // Tags
    const tagsRow = document.getElementById("profile-tags-row");
    tagsRow.innerHTML = `
      <span class="badge badge-cream">${escapeHtml(customer.gender || "Female")}</span>
      ${customer.notebookRef ? `<span class="badge badge-cream" style="border:1px solid var(--color-accent); color:var(--color-accent);">📖 ${escapeHtml(customer.notebookRef)}</span>` : ""}
      ${customer.notes ? `<span class="badge badge-cream">${escapeHtml(customer.notes.substring(0, 32))}</span>` : ""}
    `;

    // Fetch Measurements for this customer
    const measurements = await store.getMeasurements(customerId);

    // Render Latest Measurement Card
    const latestSection = document.getElementById("profile-latest-measurement-card");
    const historyCountBadge = document.getElementById("profile-history-count");

    if (historyCountBadge) {
      historyCountBadge.textContent = `${measurements.length} record${measurements.length === 1 ? "" : "s"}`;
    }

    if (measurements.length > 0) {
      const latest = measurements[0];
      const template = getTemplateById(latest.templateId);
      const measuredDateStr = formatDate(latest.measuredAt);

      // Extract top 6 measurements for the preview card
      const entries = Object.entries(latest.measurements || {}).slice(0, 6);

      latestSection.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <div style="font-weight:700; font-size:1.05rem; color:var(--color-primary);">${template.icon} ${escapeHtml(latest.measurementType)}</div>
            <div style="font-size:0.8rem; color:var(--color-text-muted);">${measuredDateStr}</div>
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
        </div>
      `;
    } else {
      latestSection.innerHTML = `
        <div class="empty-state" style="padding:24px 12px;">
          <div class="empty-state-icon">📏</div>
          <div class="empty-state-title">No measurements yet</div>
          <div class="empty-state-text">Take measurements for ${escapeHtml(customer.fullName)} to keep them safe.</div>
          <a href="#add-measurement?customerId=${customer.customerId}" class="btn btn-primary btn-sm">+ Add Measurement</a>
        </div>
      `;
    }

    // Set Customer Notes
    const notesEl = document.getElementById("profile-customer-notes");
    if (notesEl) {
      notesEl.textContent = customer.notes || "No notes recorded yet for this client.";
    }

    // Set action links
    document.getElementById("btn-profile-add-meas").setAttribute("href", `#add-measurement?customerId=${customer.customerId}`);
    document.getElementById("btn-profile-history-link").setAttribute("href", `#history?customerId=${customer.customerId}`);
    document.getElementById("btn-profile-edit-customer").setAttribute("href", `#add-customer?id=${customer.customerId}`);
  }

  // ================= VIEW: MEASUREMENT DETAIL =================

  async renderMeasurementDetail(measurementId) {
    const measurement = await store.getMeasurement(measurementId);
    if (!measurement) {
      showToast("Measurement record not found", "error");
      window.location.hash = "#customers";
      return;
    }

    this.currentMeasurement = measurement;
    const customer = await store.getCustomer(measurement.customerId);
    const template = getTemplateById(measurement.templateId);

    // Mini customer header
    const customerNameEl = document.getElementById("detail-customer-name");
    customerNameEl.textContent = customer ? customer.fullName : "Customer";
    
    const customerMetaEl = document.getElementById("detail-customer-meta");
    customerMetaEl.textContent = `${customer ? customer.gender + " • " : ""}${formatDate(measurement.measuredAt)}`;

    const typeBadge = document.getElementById("detail-type-badge");
    typeBadge.textContent = measurement.measurementType;

    const unitBadge = document.getElementById("detail-unit-badge");
    unitBadge.textContent = measurement.unit === "cm" ? "Centimeters (cm)" : 'Inches (")';

    // Grid of all measurements
    const grid = document.getElementById("detail-measurements-grid");
    const entries = Object.entries(measurement.measurements || {});

    if (entries.length === 0) {
      grid.innerHTML = `<div class="empty-state-text">No measurement numbers entered in this session.</div>`;
    } else {
      grid.innerHTML = entries.map(([key, val]) => `
        <div class="measurement-cell">
          <span class="measurement-cell-label">${FIELD_LABELS[key] || key}</span>
          <span class="measurement-cell-val">${formatMeasurementValue(val, measurement.unit)}</span>
        </div>
      `).join("");
    }

    // Notes
    const notesEl = document.getElementById("detail-notes");
    notesEl.textContent = measurement.notes || "No specific garment notes.";

    // Action buttons
    const editBtn = document.getElementById("detail-btn-edit");
    editBtn.setAttribute("href", `#add-measurement?customerId=${measurement.customerId}&measurementId=${measurement.measurementId}`);

    const historyBtn = document.getElementById("detail-btn-history");
    historyBtn.setAttribute("href", `#history?customerId=${measurement.customerId}`);
  }

  // ================= VIEW: MEASUREMENT HISTORY TIMELINE =================

  async renderHistoryTimeline(customerId) {
    const customer = await store.getCustomer(customerId);
    if (!customer) {
      window.location.hash = "#customers";
      return;
    }

    document.getElementById("history-customer-name").textContent = `${customer.fullName}'s History`;

    const timelineContainer = document.getElementById("history-timeline-container");
    const measurements = await store.getMeasurements(customerId);

    if (measurements.length === 0) {
      timelineContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <div class="empty-state-title">No measurement history</div>
          <div class="empty-state-text">Every time you measure ${escapeHtml(customer.fullName)}, a permanent record will appear here.</div>
          <a href="#add-measurement?customerId=${customer.customerId}" class="btn btn-primary btn-sm">+ Add First Record</a>
        </div>
      `;
      return;
    }

    timelineContainer.innerHTML = `
      <div class="history-timeline">
        ${measurements.map((m, index) => {
          const isLatest = index === 0;
          const dateStr = formatDate(m.measuredAt);
          const entries = Object.entries(m.measurements || {}).slice(0, 3);

          return `
            <div class="timeline-item" onclick="location.hash='#measurement-detail?id=${m.measurementId}'">
              <div class="timeline-marker ${isLatest ? "marker-latest" : ""}"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <div class="timeline-date">${dateStr}</div>
                  ${isLatest ? `<span class="badge badge-success">Latest</span>` : `<span class="badge badge-cream">${escapeHtml(m.measurementType)}</span>`}
                </div>
                <div class="timeline-summary">
                  ${entries.map(([k, v]) => `<span>${FIELD_LABELS[k] || k}: <strong>${formatMeasurementValue(v, m.unit)}</strong></span>`).join(" • ")}
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    document.getElementById("btn-history-add-new").setAttribute("href", `#add-measurement?customerId=${customer.customerId}`);
  }

  // ================= VIEW: ADD / EDIT MEASUREMENT FORM =================

  async renderMeasurementForm(customerId, measurementId) {
    const customer = await store.getCustomer(customerId);
    if (!customer) {
      showToast("Please select a customer first", "error");
      window.location.hash = "#customers";
      return;
    }

    let existingRecord = null;
    if (measurementId) {
      existingRecord = await store.getMeasurement(measurementId);
    }

    this.currentCustomer = customer;
    this.selectedTemplateId = existingRecord ? existingRecord.templateId : (customer.gender === "Male" ? "mens-shirt" : "womens-dress");
    this.currentUnit = existingRecord ? existingRecord.unit : "inches";

    document.getElementById("meas-form-customer-name").textContent = customer.fullName;
    document.getElementById("meas-form-title").textContent = existingRecord ? "Edit Measurement" : "Add Measurement";

    // Set Date input (default to today or existing)
    const dateInput = document.getElementById("meas-input-date");
    if (dateInput) {
      const d = existingRecord && existingRecord.measuredAt ? new Date(existingRecord.measuredAt) : new Date();
      dateInput.value = d.toISOString().split("T")[0];
    }

    // Set Notes input
    const notesInput = document.getElementById("meas-input-notes");
    if (notesInput) {
      notesInput.value = existingRecord ? (existingRecord.notes || "") : "";
    }

    // Render template chips
    this.renderTemplateChips(this.selectedTemplateId);

    // Render unit selector
    this.renderUnitSelector(this.currentUnit);

    // Render measurement fields for the chosen template
    this.renderMeasurementInputFields(existingRecord ? existingRecord.measurements : {});

    // Save Form Handler
    const form = document.getElementById("form-add-measurement");
    form.onsubmit = async (e) => {
      e.preventDefault();
      await this.saveMeasurementForm(customer.customerId, measurementId);
    };
  }

  renderTemplateChips(selectedId) {
    const container = document.getElementById("template-chips-container");
    if (!container) return;

    container.innerHTML = MEASUREMENT_TEMPLATES.map(t => `
      <button type="button" class="template-chip ${t.id === selectedId ? "active" : ""}" data-template-id="${t.id}">
        <span>${t.icon}</span> ${t.name}
      </button>
    `).join("");

    container.querySelectorAll(".template-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        this.selectedTemplateId = chip.dataset.templateId;
        this.renderTemplateChips(this.selectedTemplateId);
        this.renderMeasurementInputFields({});
      });
    });
  }

  renderUnitSelector(selectedUnit) {
    const buttons = document.querySelectorAll(".unit-toggle-btn");
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.unit === selectedUnit);
      btn.onclick = () => {
        this.currentUnit = btn.dataset.unit;
        this.renderUnitSelector(this.currentUnit);
        // Update label units
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
              <div class="fraction-chips" style="display:flex; gap:3px;">
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
        </div>
      `;
    }).join("");

    // Bind fraction quick chip clicks
    container.querySelectorAll(".frac-chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const inputId = btn.dataset.target;
        const frac = btn.dataset.frac;
        const input = document.getElementById(inputId);
        if (!input) return;

        let cur = input.value.trim();
        // Remove any existing fraction or decimal
        cur = cur.replace(/[¼½¾⅛⅜⅝⅞]/g, "").replace(/\.25|\.5|\.75|\.50/g, "").replace(/\s*1\/[248]|\s*3\/[48]/g, "").trim();

        if (cur === "") {
          input.value = frac;
        } else {
          input.value = `${cur}${frac}`;
        }
        input.focus();
      });
    });
  }

  async saveMeasurementForm(customerId, existingMeasurementId) {
    const template = getTemplateById(this.selectedTemplateId);
    const dateInput = document.getElementById("meas-input-date");
    const notesInput = document.getElementById("meas-input-notes");

    const measuredDate = dateInput && dateInput.value ? new Date(dateInput.value).toISOString() : new Date().toISOString();
    const notes = notesInput ? notesInput.value.trim() : "";

    // Gather measurement values using smart fraction parsing
    const measurements = {};
    let hasAtLeastOne = false;

    document.querySelectorAll(".measurement-input-field").forEach(input => {
      const key = input.dataset.key;
      const rawVal = input.value.trim();
      if (rawVal !== "") {
        const num = parseMeasurementInput(rawVal);
        if (num !== null && !isNaN(num) && num >= 0) {
          measurements[key] = num;
          hasAtLeastOne = true;
        }
      }
    });

    if (!hasAtLeastOne) {
      showToast("Please enter at least one measurement value.", "error");
      return;
    }

    try {
      const record = {
        measurementId: existingMeasurementId || undefined,
        customerId: customerId,
        templateId: template.id,
        measurementType: template.name,
        unit: this.currentUnit,
        measurements: measurements,
        notes: notes,
        measuredAt: measuredDate
      };

      const saved = await store.saveMeasurement(record);
      showToast("Measurements saved successfully! ✓", "success");
      
      // Redirect to customer profile
      window.location.hash = `#customer?id=${customerId}`;
    } catch (err) {
      showToast(err.message || "Failed to save measurement.", "error");
    }
  }

  // ================= VIEW: CUSTOMER FORM (ADD / EDIT) =================

  renderCustomerForm(customerId) {
    const isEdit = !!customerId;
    document.getElementById("customer-form-title").textContent = isEdit ? "Edit Customer" : "Add Customer";
    
    const nameInput = document.getElementById("cust-input-name");
    const phoneInput = document.getElementById("cust-input-phone");
    const genderSelect = document.getElementById("cust-input-gender");
    const notebookInput = document.getElementById("cust-input-notebook");
    const notesInput = document.getElementById("cust-input-notes");

    if (isEdit) {
      store.getCustomer(customerId).then(customer => {
        if (!customer) return;
        nameInput.value = customer.fullName || "";
        phoneInput.value = customer.phone || "";
        genderSelect.value = customer.gender || "Female";
        if (notebookInput) notebookInput.value = customer.notebookRef || "";
        notesInput.value = customer.notes || "";
      });
    } else {
      nameInput.value = "";
      phoneInput.value = "";
      genderSelect.value = "Female";
      if (notebookInput) notebookInput.value = "";
      notesInput.value = "";
    }

    const form = document.getElementById("form-add-customer");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const fullName = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const gender = genderSelect.value;
      const notebookRef = notebookInput ? notebookInput.value.trim() : "";
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

      try {
        const saved = await store.saveCustomer({
          customerId: customerId || undefined,
          fullName,
          phone,
          gender,
          notebookRef,
          notes
        });

        showToast("Customer saved successfully! ✓", "success");
        window.location.hash = `#customer?id=${saved.customerId}`;
      } catch (err) {
        showToast("Could not save customer: " + err.message, "error");
      }
    };
  }

  // ================= VIEW: BUSINESS SETUP =================

  populateSetupScreen() {
    const user = store.getCurrentUser();
    if (!user) return;

    const bizInput = document.getElementById("setup-input-biz");
    const nameInput = document.getElementById("setup-input-name");

    if (bizInput) bizInput.value = user.businessName || `${user.fullName}'s Fashion`;
    if (nameInput) nameInput.value = user.fullName || "";
  }

  // ================= VIEW: SETTINGS =================

  renderSettings() {
    const user = store.getCurrentUser();
    if (user) {
      document.getElementById("settings-designer-name").textContent = user.fullName || "Designer";
      document.getElementById("settings-biz-name").textContent = user.businessName || "Fashion Brand";
      document.getElementById("settings-email").textContent = user.email || "";
    }
    this.updateSyncBadge();
  }

  // ================= GLOBAL EVENT BINDING =================

  bindGlobalEvents() {
    // 1. Splash Get Started & Login buttons
    const btnGetStarted = document.getElementById("btn-splash-get-started");
    if (btnGetStarted) {
      btnGetStarted.addEventListener("click", () => {
        window.location.hash = "#register";
      });
    }

    const btnSplashLogin = document.getElementById("btn-splash-login");
    if (btnSplashLogin) {
      btnSplashLogin.addEventListener("click", () => {
        window.location.hash = "#login";
      });
    }

    // 2. Auth Form: Login
    const loginForm = document.getElementById("form-login");
    if (loginForm) {
      loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-input-email").value;
        const pass = document.getElementById("login-input-password").value;
        try {
          await authService.login(email, pass);
          showToast("Welcome back! 👋🏾", "success");
          window.location.hash = "#dashboard";
        } catch (err) {
          showToast(err.message, "error");
        }
      };
    }

    // Toggle password visibility
    const togglePassBtn = document.getElementById("btn-toggle-password");
    if (togglePassBtn) {
      togglePassBtn.addEventListener("click", () => {
        const input = document.getElementById("login-input-password");
        if (input.type === "password") {
          input.type = "text";
          togglePassBtn.textContent = "🙈";
        } else {
          input.type = "password";
          togglePassBtn.textContent = "👁";
        }
      });
    }

    // 3. Auth Form: Register
    const registerForm = document.getElementById("form-register");
    if (registerForm) {
      registerForm.onsubmit = async (e) => {
        e.preventDefault();
        const fullName = document.getElementById("reg-input-name").value;
        const email = document.getElementById("reg-input-email").value;
        const pass = document.getElementById("reg-input-pass").value;
        const confirmPass = document.getElementById("reg-input-confirm").value;

        try {
          await authService.register({ fullName, email, password: pass, confirmPassword: confirmPass });
          showToast("Account created successfully!", "success");
          window.location.hash = "#setup";
        } catch (err) {
          showToast(err.message, "error");
        }
      };
    }

    // 4. Setup Form
    const setupForm = document.getElementById("form-setup");
    if (setupForm) {
      setupForm.onsubmit = async (e) => {
        e.preventDefault();
        const bizName = document.getElementById("setup-input-biz").value;
        const designerName = document.getElementById("setup-input-name").value;
        const selectedCat = document.querySelector('input[name="setup_category"]:checked');

        try {
          await authService.completeBusinessSetup({
            businessName: bizName,
            fullName: designerName,
            clothingCategory: selectedCat ? selectedCat.value : "Women's Wear"
          });
          showToast("Business profile ready!", "success");
          window.location.hash = "#dashboard";
        } catch (err) {
          showToast(err.message, "error");
        }
      };
    }

    // 5. Fast Search in Header / Customers Page
    const handleSearch = (query) => {
      this.searchQuery = query;
      if (window.location.hash !== "#customers") {
        window.location.hash = "#customers";
      } else {
        this.renderCustomersList();
      }
    };

    const dashboardSearch = document.getElementById("dashboard-search-input");
    if (dashboardSearch) {
      dashboardSearch.addEventListener("input", (e) => handleSearch(e.target.value));
    }

    const customersSearch = document.getElementById("customers-search-input");
    if (customersSearch) {
      customersSearch.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderCustomersList();
      });
    }

    // 6. Backup & Restore in Settings
    const exportBtn = document.getElementById("btn-export-backup");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const data = store.exportData();
        const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const dlAnchor = document.createElement("a");
        dlAnchor.setAttribute("href", jsonStr);
        dlAnchor.setAttribute("download", `fitnote-backup-${new Date().toISOString().split("T")[0]}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        showToast("Notebook data exported safely! ☁️", "success");
      });
    }

    const restoreInput = document.getElementById("input-restore-file");
    if (restoreInput) {
      restoreInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            store.importData(data);
            showToast("Backup data restored successfully! ✓", "success");
            window.location.hash = "#dashboard";
          } catch (err) {
            showToast("Invalid backup file: " + err.message, "error");
          }
        };
        reader.readAsText(file);
      });
    }

    // 7. Reset to Ghanaian Demo Data
    const demoResetBtn = document.getElementById("btn-reset-demo-data");
    if (demoResetBtn) {
      demoResetBtn.addEventListener("click", () => {
        if (confirm("Reset local storage to Ghanaian sample customers (Ama Mensah, Kofi Boateng, Serwaa Gyan)?")) {
          store.seedDemoData();
          showToast("Ghanaian demo records loaded! ✓", "success");
          window.location.hash = "#dashboard";
        }
      });
    }

    // 8. Logout
    const logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await authService.logout();
        showToast("Logged out safely.", "info");
        window.location.hash = "#login";
      });
    }

    // 9. Desktop frame toggle
    const toggleWideBtn = document.getElementById("btn-toggle-wide-mode");
    if (toggleWideBtn) {
      toggleWideBtn.addEventListener("click", () => {
        document.body.classList.toggle("wide-mode");
        toggleWideBtn.textContent = document.body.classList.contains("wide-mode") ? "Switch to Phone Frame" : "Switch to Fullscreen";
      });
    }
  }
}

// Bootstrap app on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.fitNoteApp = new FitNoteApp();
});
