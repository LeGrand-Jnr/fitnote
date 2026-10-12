/**
 * FitNote - Garment Measurement Templates
 * Built for Ghanaian Fashion Designers & Tailors
 */

export const MEASUREMENT_TEMPLATES = [
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
    name: "Men's Shirt",
    category: "Men's",
    icon: "👔",
    description: "Traditional Kaftan, African print shirts, office shirts",
    fields: [
      { key: "neck", label: "Neck", placeholder: "e.g. 16.5", required: false },
      { key: "chest", label: "Chest", placeholder: "e.g. 42", required: false },
      { key: "waist", label: "Waist", placeholder: "e.g. 36", required: false },
      { key: "shoulder", label: "Shoulder", placeholder: "e.g. 18.5", required: false },
      { key: "sleeveLength", label: "Sleeve Length", placeholder: "e.g. 25", required: false },
      { key: "wrist", label: "Wrist", placeholder: "e.g. 8.5", required: false },
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
      { key: "bust", label: "Bust / Chest", placeholder: "e.g. 38", required: false },
      { key: "waist", label: "Waist", placeholder: "e.g. 32", required: false },
      { key: "hip", label: "Hip", placeholder: "e.g. 42", required: false },
      { key: "shoulder", label: "Shoulder", placeholder: "e.g. 15", required: false },
      { key: "sleeveLength", label: "Sleeve Length", placeholder: "e.g. 23", required: false },
      { key: "garmentLength", label: "Garment Length", placeholder: "e.g. 50", required: false }
    ]
  }
];

export function getTemplateById(templateId) {
  return MEASUREMENT_TEMPLATES.find(t => t.id === templateId) || MEASUREMENT_TEMPLATES[0];
}

/**
 * Standard friendly display labels for any measurement field key
 */
export const FIELD_LABELS = {
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
