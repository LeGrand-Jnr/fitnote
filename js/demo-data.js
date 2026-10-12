/**
 * FitNote - Sample Demo Data
 * Ghanaian fashion designers and realistic measurement history
 */

export const DEMO_USER = {
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

export const DEMO_CUSTOMERS = [
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
    notes: "Office blazers and church Sunday wear.",
    status: "active",
    createdAt: "2025-08-12T13:45:00.000Z",
    updatedAt: "2026-07-02T11:20:00.000Z",
    lastMeasuredAt: "2026-07-02T11:20:00.000Z"
  }
];

export const DEMO_MEASUREMENTS = [
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
    notebookRef: "Book 2024 • Page 14",
    measuredAt: "2026-09-12T14:15:00.000Z",
    createdAt: "2026-09-12T14:15:00.000Z",
    updatedAt: "2026-09-12T14:15:00.000Z"
  },
  // Ama Mensah - 2025
  {
    measurementId: "meas-ama-2025",
    userId: "demo-designer-ama",
    customerId: "cust-ama-mensah",
    templateId: "womens-dress",
    measurementType: "Women's Dress",
    unit: "inches",
    measurements: {
      bust: 37,
      waist: 31,
      hip: 41,
      shoulder: 15,
      armhole: 17,
      sleeveLength: 23,
      topLength: 27,
      dressLength: 57
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
    measurementType: "Men's Shirt",
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
  },

  // Akwasi Benyi - 2026
  {
    measurementId: "meas-akwasi-2026",
    userId: "demo-designer-ama",
    customerId: "cust-akwasi-benyi",
    templateId: "mens-shirt",
    measurementType: "Men's Shirt",
    unit: "inches",
    measurements: {
      neck: 17,
      chest: 44,
      waist: 36,
      shoulder: 19,
      sleeveLength: 25.5,
      shirtLength: 35
    },
    notes: "Senator suit top",
    measuredAt: "2026-07-18T15:30:00.000Z",
    createdAt: "2026-07-18T15:30:00.000Z",
    updatedAt: "2026-07-18T15:30:00.000Z"
  },

  // Efua Lartey - 2026
  {
    measurementId: "meas-efua-2026",
    userId: "demo-designer-ama",
    customerId: "cust-efua-lartey",
    templateId: "womens-dress",
    measurementType: "Women's Dress",
    unit: "inches",
    measurements: {
      bust: 35,
      waist: 29,
      hip: 39,
      shoulder: 14,
      sleeveLength: 22,
      dressLength: 44
    },
    notes: "Fitted pencil dress for court appearance",
    measuredAt: "2026-07-02T11:20:00.000Z",
    createdAt: "2026-07-02T11:20:00.000Z",
    updatedAt: "2026-07-02T11:20:00.000Z"
  }
];
