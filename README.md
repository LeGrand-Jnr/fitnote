# FitNote — Digital Measurement Book for Ghanaian Fashion Designers

> **"Your Measurements. Always With You."**  
> *A simple, modern, mobile-first web application that helps fashion designers and seamstresses in Ghana safely store, organize, and instantly retrieve customer body measurements in under 10 seconds — with full offline capability and Supabase cloud sync.*

---

## 1. Problem & Product Philosophy

Many Ghanaian fashion designers and seamstresses currently record customer body measurements in paper exercise books and physical notebooks. These notebooks frequently become torn, stained, misplaced, soaked, or impossible to search when a customer calls after several months.

**FitNote Version 1 (MVP)** is laser-focused on solving ONE core problem exceptionally well:
> **Help a fashion designer safely store and quickly retrieve customer measurements.**

Every architectural and UX decision supports fast retrieval, permanent history preservation (never overwriting old measurements), and offline availability when Ghanaian mobile network connectivity fluctuates.

---

## 2. Key Features in Version 1 (MVP)

- 🇬🇭 **Premier "Kaba & Slit" Template**: Specialized traditional Ghanaian 2-piece pattern template with Bust Point (apex), Cross Back (half back), Kaba Length (top), Slit Waist, Slit Length (skirt), and Waist-to-Hip measurements.
- 📏 **Authentic Tape Fractions (Whole & Halves)**: Native support for measuring tape fractions (`½"`, `¼"`, `¾"`, `⅛"`). Tailors can enter values like `38½` or `38.5` with quick one-tap fraction buttons on mobile, and values are beautifully formatted with fraction notation.
- 📖 **Physical Notebook Cross-Referencing**: Allows designers with shelves full of old exercise books to tag and search clients by physical notebook reference (e.g. `2024 Black Book • Pg 14`).
- 🕒 **Permanent Measurement History**: Every new fitting creates an immutable historical session record (e.g. 2024, 2025, 2026). Old measurements are **never** overwritten.
- ⚡ **10-Second Instant Search**: Fast, live filtering by customer name, phone number, or notebook reference.
- ☁️ **Supabase Cloud Ready & 100% Offline Persistence**: Caches all records locally via LocalStorage/IndexedDB. Seamstresses can view and record measurements with zero internet connectivity; data syncs cleanly when connected to Supabase.
- 🔒 **Row Level Security (RLS)**: Enforces strict tenant isolation in PostgreSQL so Designer A can never access Designer B's clients or measurements.
- 🇬🇭 **Pre-Seeded Ghanaian Demo Data**: Comes with realistic sample clients (*Ama Mensah*, *Kofi Boateng*, *Serwaa Gyan*, *Akwasi Benyi*, *Efua Lartey*) and multi-year measurement history for instant review.
- 📦 **Notebook Data Export & Restore**: One-click JSON backup export so designers own their data permanently.

---

## 3. Project Directory Structure

```text
fitnote/
│
├── index.html                  # Mobile-first app shell & single-page views
├── login.html                  # Direct route entry point to Login
├── register.html               # Direct route entry point to Registration
├── dashboard.html              # Direct route entry point to Dashboard
├── customers.html              # Direct route entry point to Customers List
├── customer.html               # Direct route entry point to Customer Profile
├── measurement.html            # Direct route entry point to Measurement Form
│
├── css/
│   ├── style.css               # Fashion palette (#3B2418, #A66A3F, #F8F1E7), cards, grids
│   ├── auth.css                # Splash screen, Login, Register, and Business setup styles
│   └── responsive.css          # Mobile-first (360px-430px) + Desktop Frame Simulator
│
├── js/
│   ├── fitnote.js              # Standalone universal application script (No build, works offline)
│   ├── supabase-config.js      # Supabase configuration & credentials placeholder
│   ├── store.js                # Data store layer with Supabase client adapter & offline storage
│   ├── auth.js                 # Authentication service & session management
│   ├── templates.js            # Garment templates (Kaba & Slit, Women's, Men's, Trousers, Custom)
│   ├── demo-data.js            # Sample Ghanaian data (Ama Mensah, Kofi Boateng, Serwaa Gyan)
│   └── utils.js                # Date/phone formats, initial avatars, unit conversions, toasts
│
├── assets/
│   └── mannequin.svg           # High-resolution vector dressmaker mannequin logo
│
├── supabase_schema.sql         # PostgreSQL schema with Row Level Security (RLS) policies
└── README.md                   # Complete documentation and setup guide
```

---

## 4. Local Development Instructions

The application runs directly in any modern browser without any node_modules, Webpack, or npm build steps required!

### Method A: Direct Double-Click (File Explorer)
Simply double-click `index.html` to open it in your browser (`file:///.../index.html`). The bundled `js/fitnote.js` works instantly with zero CORS or network restrictions!

### Method B: Using Python HTTP Server (Active)
Open a terminal in the `fitnote` folder and run:
```bash
python -m http.server 8080
```
Then open your browser at:
```
http://localhost:8080
```

### Method C: Using VS Code Live Server
1. Open the `fitnote` folder in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

---

## 5. Supabase Manual Connection Guide

Connecting FitNote to your Supabase project takes under 2 minutes:

### Step 1: Create a Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **New Project** and name it (e.g., `fitnote-ghana`).
3. Set a strong database password and select a region.

### Step 2: Run the Database Schema SQL
1. In the Supabase Dashboard, go to the **SQL Editor** tab (left sidebar).
2. Open [`supabase_schema.sql`](file:///C:/Users/samuel/.gemini/antigravity-ide/scratch/fitnote/supabase_schema.sql) from this project.
3. Paste the entire SQL script into the Supabase SQL editor and click **Run**.
   - This creates the `profiles`, `customers`, and `measurements` tables.
   - It automatically enables Row Level Security (RLS) so designers only see their own clients.
   - It sets up performance indexes on customer names, phone numbers, and measurement dates.

### Step 3: Insert Your Credentials
1. In Supabase, go to **Project Settings** (gear icon) > **API**.
2. Copy your **Project URL** and **`anon` `public` API Key**.
3. Open [`js/supabase-config.js`](file:///C:/Users/samuel/.gemini/antigravity-ide/scratch/fitnote/js/supabase-config.js) and insert them:
```javascript
export const supabaseConfig = {
  url: "https://your-project-id.supabase.co",
  anonKey: "your-actual-anon-key-here"
};
```
4. In `index.html`, if you want to use the Supabase CDN client, simply add:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

---

## 6. Validated Design Decisions

1. **Tape Measure Fraction Support (Whole & Halves)**: Validated directly by Ghanaian designers. Seamstresses read tapes and record body measurements in whole and fraction numbers (e.g. `38½`, `42¼`, `10½`). FitNote provides quick one-tap fraction buttons (`¼`, `½`, `¾`) on mobile input and displays authentic fraction formatting throughout profiles, history, and detail views.
2. **First-Class Kaba & Slit Template**: Validated as the primary bespoke outfit tailored across Ghana. A specialized template was created with authentic tailoring fields: Bust Point (apex), Cross Back (half back), Kaba Length (top), Slit Waist, Slit Length (skirt), and Waist-to-Hip.
3. **Physical Notebook Transitioning (`notebookRef`)**: Many tailors have dozens of physical exercise books accumulated over years. Designers can tag clients with their physical notebook reference (e.g. `2024 Black Book • Pg 14`) and search by notebook name to seamlessly bridge physical archives into digital search.
4. **Exclusion of Customer WhatsApp Sharing**: Tailors explicitly confirmed they do not wish to share body measurements with customers over WhatsApp; measurement sheets are proprietary to the atelier. FitNote focuses 100% on the designer's internal digital measurement book.
5. **Measurement Immutability**: Historical measurements are never erased or updated when taking a new fitting. Preserving each session gives designers an invaluable permanent record.
6. **Offline Priority**: Tailoring hubs (e.g., Makola Market, Kantamanto, Kejetia) can experience network drops or power outages (*dumsor*). FitNote operates 100% offline via local persistence and syncs when connectivity returns.

---

## 7. Features Intentionally Excluded from Version 1 (MVP)

Per product specifications and designer validation:
- ❌ WhatsApp customer sharing (measurements remain private designer records)
- ❌ Order management & production tracking (deferred to Version 2)
- ❌ Invoicing, receipts & Mobile Money (MoMo) payments
- ❌ Fabrics & inventory management
- ❌ Employee / apprentice task delegation
- ❌ AI camera 3D body measurement prediction
- ❌ Complex business analytics & accounting reports

---

## 8. Version 2 Roadmap (Post-MVP)

1. **Fabric & Style Photo Uploads**: Allow tailors to snap photos of fabric patterns or style sketches directly into the customer measurement record.
2. **Order Lifecycle**: Simple status badges (*Fabric Received*, *Cutting*, *Fitting Scheduled*, *Ready for Pick-Up*).
3. **Apprentice Management**: Role-based access for junior tailors taking basic measurements.
