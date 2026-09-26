// Initial Seed Data for CivicQueue AI (Prototype & Demo Platform)

const services = [
  {
    id: "non-creamy-layer",
    name: "Non-Creamy Layer Certificate",
    category: "Revenue & Certificates",
    description: "Certificate used to establish eligibility under the non-creamy layer category (OBC) where applicable for education and employment reservations.",
    estimatedProcessingDays: "15-21 working days",
    officialFee: "₹50 - ₹100",
    documents: [
      { id: "doc-1", title: "Aadhaar / Identity Proof", desc: "Original and copy of Aadhaar Card, Voter ID, or Passport", mandatory: true },
      { id: "doc-2", title: "Address Proof", desc: "Electricity bill, Ration card, or Rent Agreement", mandatory: true },
      { id: "doc-3", title: "Income Certificate / Proof", desc: "Income proof for the last 3 financial years (ITR / Form 16 / Tahsildar Certificate)", mandatory: true },
      { id: "doc-4", title: "Caste Certificate", desc: "Primary applicant's father or relative caste certificate issued by competent authority", mandatory: true },
      { id: "doc-5", title: "Applicant Photograph", desc: "2 passport sized photographs (35mm x 45mm)", mandatory: true },
      { id: "doc-6", title: "Parent/Guardian Income Documents", desc: "Salary slips or agricultural revenue proof where applicable", mandatory: false },
      { id: "doc-7", title: "Duly Filled Application Form", desc: "Form signed by applicant or natural guardian", mandatory: true },
      { id: "doc-8", title: "Supporting Affidavit / Self-Declaration", desc: "Self-declaration affirming income below statutory creamy-layer ceiling", mandatory: true }
    ],
    tips: [
      "Carry original documents for spot verification by the Tehsildar desk.",
      "Self-attest all photocopy sets with blue ballpoint ink.",
      "Check if your tehsil office requires biometric counter token."
    ]
  },
  {
    id: "caste-certificate",
    name: "Caste Certificate",
    category: "Revenue & Certificates",
    description: "Proof of belonging to a recognized Scheduled Caste (SC), Scheduled Tribe (ST), or Other Backward Class (OBC).",
    estimatedProcessingDays: "21-30 working days",
    officialFee: "₹50",
    documents: [
      { id: "doc-1", title: "Aadhaar / Voter ID of Applicant", desc: "Government issued photo identification", mandatory: true },
      { id: "doc-2", title: "Father / Blood Relative Caste Proof", desc: "1950/1967/1978 baseline caste entry or school leaving certificate", mandatory: true },
      { id: "doc-3", title: "School Leaving Certificate / Birth Proof", desc: "Showing caste entered at time of primary admission", mandatory: true },
      { id: "doc-4", title: "Ration Card or Residential Proof", desc: "Proof of permanent domicile in state", mandatory: true },
      { id: "doc-5", title: "Affidavit in Prescribed Format", desc: "Notarized affidavit stating genealogy tree (Vanshavali)", mandatory: true },
      { id: "doc-6", title: "Passport Photographs", desc: "2 recent identical color photographs", mandatory: true }
    ],
    tips: [
      "Genealogy tree must have village sarpanch or talathi signature if applicable.",
      "Keep pre-1967 revenue records handy for faster verification."
    ]
  },
  {
    id: "income-certificate",
    name: "Income Certificate",
    category: "Revenue & Certificates",
    description: "Official document certifying annual family income from all sources, essential for fee concessions, scholarships and welfare schemes.",
    estimatedProcessingDays: "7-14 working days",
    officialFee: "₹35 - ₹50",
    documents: [
      { id: "doc-1", title: "Applicant Identity & Address Proof", desc: "Aadhaar Card / Ration Card", mandatory: true },
      { id: "doc-2", title: "Employer Salary Certificate or Form 16", desc: "For salaried applicants, or Talathi report for agriculturalists", mandatory: true },
      { id: "doc-3", title: "Income Tax Returns (ITR)", desc: "Past 1 year copy if filing tax, otherwise village accountant declaration", mandatory: false },
      { id: "doc-4", title: "Self-Declaration of Family Income", desc: "Affidavit detailing income of all co-habiting earners", mandatory: true },
      { id: "doc-5", title: "Passport Photograph", desc: "2 color photographs", mandatory: true }
    ],
    tips: [
      "Ensure all family members' earnings are totaled accurately to prevent re-inquiry.",
      "Carry latest electricity bill for residential cross-check."
    ]
  },
  {
    id: "domicile-certificate",
    name: "Domicile Certificate",
    category: "Revenue & Certificates",
    description: "Official proof confirming continuous residence in the state for a specified statutory period (typically 15 years).",
    estimatedProcessingDays: "15-21 working days",
    officialFee: "₹50",
    documents: [
      { id: "doc-1", title: "Proof of 15 Years Continuous Stay", desc: "School certificates, electricity bills, or property tax receipts spanning required years", mandatory: true },
      { id: "doc-2", title: "Birth Certificate or School Leaving Certificate", desc: "Showing place and date of birth", mandatory: true },
      { id: "doc-3", title: "Aadhaar Card and Ration Card", desc: "Current photo ID and family list", mandatory: true },
      { id: "doc-4", title: "Photographs", desc: "2 passport size photographs", mandatory: true },
      { id: "doc-5", title: "Residential Proof of Parents", desc: "If applicant is under 18 years of age", mandatory: false }
    ],
    tips: [
      "Chronological order of documents helps the scrutinizing officer approve quickly.",
      "Bring consecutive school marksheets spanning primary to higher secondary."
    ]
  },
  {
    id: "birth-certificate",
    name: "Birth Certificate",
    category: "Civic Records & Municipal",
    description: "Primary civil registration document confirming date, time, and parentage of birth recorded with local Municipal Corporation or Gram Panchayat.",
    estimatedProcessingDays: "3-7 working days",
    officialFee: "₹20 - ₹50",
    documents: [
      { id: "doc-1", title: "Hospital Discharge Summary / Birth Slip", desc: "Form 1 issued by the delivery hospital or maternity home", mandatory: true },
      { id: "doc-2", title: "Parents' Aadhaar / Voter IDs", desc: "Identity proof of both mother and father", mandatory: true },
      { id: "doc-3", title: "Parents' Marriage Certificate", desc: "Required if mother's surname differs from records", mandatory: false },
      { id: "doc-4", title: "Application Form with Child's Given Name", desc: "Municipal naming registry form", mandatory: true }
    ],
    tips: [
      "Registration within 21 days of birth is free or incurs minimal late fee.",
      "Delayed registration (>1 year) requires SDM order / magistrate verification."
    ]
  },
  {
    id: "death-certificate",
    name: "Death Certificate",
    category: "Civic Records & Municipal",
    description: "Certified death registration document needed for insurance settlement, inheritance, and legal closing of accounts.",
    estimatedProcessingDays: "3-7 working days",
    officialFee: "₹20 - ₹50",
    documents: [
      { id: "doc-1", title: "Hospital Cause of Death Certificate / Form 4/4A", desc: "Signed by attending doctor", mandatory: true },
      { id: "doc-2", title: "Crematorium / Burial Ground Receipt", desc: "Original slip received from dispatch facility", mandatory: true },
      { id: "doc-3", title: "Deceased Person's Identity Proof", desc: "Aadhaar Card / Voter ID / PAN Card (for surrender/marking)", mandatory: true },
      { id: "doc-4", title: "Applicant / Next of Kin Photo ID", desc: "Proof of relationship to the deceased", mandatory: true }
    ],
    tips: [
      "Collect minimum 5 certified copies for bank, pension, and property succession.",
      "Check spelling of deceased's name against Aadhaar."
    ]
  },
  {
    id: "residence-certificate",
    name: "Residence Certificate",
    category: "Revenue & Certificates",
    description: "Proof of current physical residence in a specific taluka/ward, commonly requested for local quotas and subsidies.",
    estimatedProcessingDays: "7-10 working days",
    officialFee: "₹40",
    documents: [
      { id: "doc-1", title: "Current Address Proof", desc: "Electricity Bill, Water Bill, or Registered Rent Agreement", mandatory: true },
      { id: "doc-2", title: "Aadhaar Card", desc: "Primary photo identification", mandatory: true },
      { id: "doc-3", title: "Ward Councilor / Police Verification Report", desc: "Local inquiry certificate if renting for less than 1 year", mandatory: false },
      { id: "doc-4", title: "Passport Photographs", desc: "2 photographs", mandatory: true }
    ],
    tips: [
      "Ensure electricity bill is not older than 3 months.",
      "Check if registered rent deed has active police intimation receipt."
    ]
  },
  {
    id: "senior-citizen-certificate",
    name: "Senior Citizen Certificate",
    category: "Social Welfare",
    description: "Certification of age 60+ to access special transport concessions, dedicated hospital counters, pension plans, and legal benefits.",
    estimatedProcessingDays: "5-10 working days",
    officialFee: "Free / ₹20",
    documents: [
      { id: "doc-1", title: "Age Proof", desc: "School Leaving Certificate, Passport, PAN Card, or Birth Certificate showing age 60+", mandatory: true },
      { id: "doc-2", title: "Residential Proof", desc: "Aadhaar Card, Election Card, or Ration Card", mandatory: true },
      { id: "doc-3", title: "Medical Fitness & Blood Group Report", desc: "From registered medical practitioner with blood group", mandatory: true },
      { id: "doc-4", title: "Photographs", desc: "3 stamp size photographs", mandatory: true }
    ],
    tips: [
      "Carry original PAN or passport for instant spot age confirmation.",
      "Emergency contact details must be included in the form."
    ]
  },
  {
    id: "marriage-certificate",
    name: "Marriage Certificate",
    category: "Civic Records & Municipal",
    description: "Legal registration of marriage under Special Marriage Act or Hindu Marriage Act, required for passport, joint property, and spouse visas.",
    estimatedProcessingDays: "7-15 working days",
    officialFee: "₹100 - ₹250",
    documents: [
      { id: "doc-1", title: "Age Proof of Bride & Groom", desc: "Birth Certificate, 10th Marks card, or Passport (Groom 21+, Bride 18+)", mandatory: true },
      { id: "doc-2", title: "Wedding Invitation Card & Wedding Photos", desc: "Original printed card and 2 clear ceremony photos", mandatory: true },
      { id: "doc-3", title: "Witness Documents (3 Witnesses)", desc: "Aadhaar & PAN cards of 3 witnesses who attended ceremony", mandatory: true },
      { id: "doc-4", title: "Affidavit of Marital Status", desc: "Affirming neither party was barred by subsisting marriage", mandatory: true },
      { id: "doc-5", title: "Joint Photograph of Couple", desc: "4 post-card size joint photos", mandatory: true }
    ],
    tips: [
      "All 3 witnesses must be physically present before the Registrar with original IDs.",
      "Arrive 30 minutes before appointment slot."
    ]
  },
  {
    id: "disability-certificate",
    name: "Disability Certificate",
    category: "Social Welfare & Health",
    description: "UDID (Unique Disability ID) assessment and permanent disability certificate for welfare benefits, assistive devices, and quotas.",
    estimatedProcessingDays: "15-30 working days",
    officialFee: "Free",
    documents: [
      { id: "doc-1", title: "Identity & Residence Proof", desc: "Aadhaar Card and local address proof", mandatory: true },
      { id: "doc-2", title: "Previous Medical Diagnosis & Clinical Records", desc: "Discharge summaries, audiograms, X-rays, or psychiatric assessments", mandatory: true },
      { id: "doc-3", title: "Passport Photographs showing disability", desc: "Full-length or relevant limb photograph as requested", mandatory: true },
      { id: "doc-4", title: "Hospital Medical Board Assessment Slip", desc: "Scheduled evaluation counter slip", mandatory: true }
    ],
    tips: [
      "Medical boards usually sit on designated weekdays (e.g. Tuesday and Thursday mornings).",
      "Check with district civil hospital for board schedule before visiting."
    ]
  },
  {
    id: "character-certificate",
    name: "Character Certificate",
    category: "Revenue & Police",
    description: "Verification of non-involvement in criminal proceedings, required for government employment, higher education, or contractual tenders.",
    estimatedProcessingDays: "10-20 working days",
    officialFee: "₹100",
    documents: [
      { id: "doc-1", title: "Photo Identity Proof", desc: "Aadhaar Card, Passport, or PAN Card", mandatory: true },
      { id: "doc-2", title: "Address Proof of Last 3 Years", desc: "Continuous stay evidence in jurisdiction", mandatory: true },
      { id: "doc-3", title: "Local Police Verification Form", desc: "Filled local police station NOC form", mandatory: true },
      { id: "doc-4", title: "Gazetted Officer Recommendation", desc: "Character certificate issued by Principal or Class-I Officer", mandatory: false },
      { id: "doc-5", title: "Photographs", desc: "3 passport photographs", mandatory: true }
    ],
    tips: [
      "Local police beat constable will conduct home inspection within 5-7 days.",
      "Keep phone reachable for the verification officer call."
    ]
  },
  {
    id: "ews-certificate",
    name: "EWS Certificate (Economically Weaker Section)",
    category: "Revenue & Certificates",
    description: "Eligibility certificate for 10% EWS reservation in central/state government employment and higher educational admissions for non-reserved categories.",
    estimatedProcessingDays: "15-21 working days",
    officialFee: "₹50 - ₹100",
    documents: [
      { id: "doc-1", title: "Aadhaar Card & PAN Card", desc: "Proof of identity of applicant and family head", mandatory: true },
      { id: "doc-2", title: "Income Proof of All Family Members", desc: "Gross annual family income must be below ₹8 Lakhs for the financial year", mandatory: true },
      { id: "doc-3", title: "Agricultural Land Records (7/12 extract)", desc: "Proof agricultural holding is below 5 acres", mandatory: true },
      { id: "doc-4", title: "Residential Flat / House Area Documents", desc: "Proof residential flat < 1000 sq ft or plot < 100 sq yards in notified municipality", mandatory: true },
      { id: "doc-5", title: "Affidavit of Asset Declaration", desc: "Notarized sworn affidavit covering all pan-India family assets", mandatory: true }
    ],
    tips: [
      "Family includes applicant, parents, spouse, and minor children.",
      "Carry municipal property tax receipt to verify carpet area."
    ]
  },
  {
    id: "scholarship-application",
    name: "Scholarship Application Verification",
    category: "Education & Welfare",
    description: "Document verification and biometric authorization for pre-matric, post-matric, and merit-cum-means government student scholarships.",
    estimatedProcessingDays: "7-14 working days",
    officialFee: "Free",
    documents: [
      { id: "doc-1", title: "Admission Fee Receipt & Student ID", desc: "Current academic year Bonafide student certificate", mandatory: true },
      { id: "doc-2", title: "Previous Year Marksheet", desc: "Showing minimum qualifying percentage", mandatory: true },
      { id: "doc-3", title: "Family Income Certificate", desc: "Issued by Tehsildar (valid for current financial year)", mandatory: true },
      { id: "doc-4", title: "Caste / Category Certificate", desc: "If applying under reserved category quota", mandatory: false },
      { id: "doc-5", title: "Student Bank Passbook Copy", desc: "Aadhaar-seeded bank account with IFSC code", mandatory: true },
      { id: "doc-6", title: "Online Application Printout", desc: "Portal registration copy with barcoded application ID", mandatory: true }
    ],
    tips: [
      "Ensure bank account is Aadhaar NPCI-mapped for Direct Benefit Transfer (DBT).",
      "College nodal officer verification signature is mandatory."
    ]
  },
  {
    id: "ration-card-services",
    name: "Ration Card Services",
    category: "Food & Civil Supplies",
    description: "New ration card issue, name addition/deletion of family member, address change, and food security eligibility updation.",
    estimatedProcessingDays: "15-30 working days",
    officialFee: "₹20 - ₹50",
    documents: [
      { id: "doc-1", title: "Aadhaar Card of All Family Members", desc: "With biometric linkage", mandatory: true },
      { id: "doc-2", title: "Surrender Certificate / Deletion Slip", desc: "From previous ration card if moving household", mandatory: false },
      { id: "doc-3", title: "Residential Proof", desc: "LPG gas connection booklet, electricity bill, or property tax slip", mandatory: true },
      { id: "doc-4", title: "Income Certificate or BPL Card Copy", desc: "To determine NFSA / Non-NFSA category", mandatory: true },
      { id: "doc-5", title: "Family Group Photograph", desc: "Joint photo of head of family with all members", mandatory: true }
    ],
    tips: [
      "Head of household is designated as the senior-most female member (age 18+).",
      "LPG consumer number is cross-verified on the civil supplies portal."
    ]
  },
  {
    id: "aadhaar-services",
    name: "Aadhaar-related Services",
    category: "Identity & UIDAI",
    description: "Biometric enrollment, mobile number linking, mandatory photo/iris biometric updates (ages 5 & 15), and address updations.",
    estimatedProcessingDays: "3-10 working days",
    officialFee: "₹50 (Demographic) / ₹100 (Biometric)",
    documents: [
      { id: "doc-1", title: "Proof of Identity (PoI)", desc: "Passport, PAN Card, Voter ID, or Driving Licence", mandatory: true },
      { id: "doc-2", title: "Proof of Address (PoA)", desc: "Bank statement, electricity bill, rent agreement, or passport", mandatory: true },
      { id: "doc-3", title: "Proof of Date of Birth (DoB)", desc: "Birth certificate, 10th standard marksheet, or passport", mandatory: true },
      { id: "doc-4", title: "Existing Aadhaar Slip / Letter", desc: "If applying for correction or mandatory biometric update", mandatory: false }
    ],
    tips: [
      "Appointments booked online skip the walk-in physical queue.",
      "Keep the mobile phone active during the desk session for immediate OTP receipt."
    ]
  },
  {
    id: "pan-services",
    name: "PAN-related Services",
    category: "Taxation & Identity",
    description: "Application for new Permanent Account Number (Form 49A/49AA), reprint of damaged PAN card, or correction of personal details.",
    estimatedProcessingDays: "7-15 working days",
    officialFee: "₹107 (Physical) / ₹72 (e-PAN)",
    documents: [
      { id: "doc-1", title: "Proof of Identity (PoI)", desc: "Aadhaar Card, Voter ID, or Passport", mandatory: true },
      { id: "doc-2", title: "Proof of Address (PoA)", desc: "Aadhaar Card, Utility Bill, or Bank Passbook", mandatory: true },
      { id: "doc-3", title: "Proof of Date of Birth", desc: "Birth Certificate, Aadhaar, or Matriculation Marksheet", mandatory: true },
      { id: "doc-4", title: "Two Passport Photographs", desc: "Recent color 3.5cm x 2.5cm with plain background", mandatory: true }
    ],
    tips: [
      "Aadhaar e-KYC instant PAN can be completed electronically within 1 hour.",
      "Check father's name spelling to match across all documents."
    ]
  },
  {
    id: "driving-licence",
    name: "Driving Licence Services",
    category: "Transport & RTO",
    description: "Learner's Licence issuance, Permanent DL driving test, endorsement of commercial badge, or licence renewal.",
    estimatedProcessingDays: "Same day (Test) / 7 days (Card dispatch)",
    officialFee: "₹200 - ₹500",
    documents: [
      { id: "doc-1", title: "Learner's Licence (LL) Number", desc: "Held for minimum 30 days prior to permanent test", mandatory: true },
      { id: "doc-2", title: "Age Proof & Address Proof", desc: "Aadhaar Card, Passport, or Birth Certificate", mandatory: true },
      { id: "doc-3", title: "Form 1 & Form 1A Medical Certificate", desc: "Signed by registered doctor for commercial / age 40+", mandatory: false },
      { id: "doc-4", title: "Driving School Certificate (Form 5)", desc: "Required for transport or heavy commercial vehicles", mandatory: false },
      { id: "doc-5", title: "Appointment Slot Receipt & Fee Challan", desc: "Parivahan Sarathi booking receipt", mandatory: true }
    ],
    tips: [
      "Wear sports shoes and helmet/seatbelt for the driving ground test track.",
      "Bring the exact vehicle class registered with valid PUC and Insurance."
    ]
  },
  {
    id: "vehicle-registration",
    name: "Vehicle Registration Services",
    category: "Transport & RTO",
    description: "New vehicle permanent RC issuance, transfer of ownership, hypothecation termination (HP removal), and High Security Plate (HSRP) issuance.",
    estimatedProcessingDays: "10-15 working days",
    officialFee: "₹300 - ₹1200 depending on vehicle class",
    documents: [
      { id: "doc-1", title: "Form 20 / Form 29 & 30", desc: "Registration or ownership transfer declaration", mandatory: true },
      { id: "doc-2", title: "Original Registration Certificate (RC)", desc: "Original book/smart card for transfer or NOC", mandatory: true },
      { id: "doc-3", title: "Valid Motor Insurance Certificate", desc: "Comprehensive or third-party active cover note", mandatory: true },
      { id: "doc-4", title: "Pollution Under Control (PUC) Certificate", desc: "Valid online QR-coded certificate", mandatory: true },
      { id: "doc-5", title: "Financier NOC & Form 35", desc: "If removing loan hypothecation", mandatory: false },
      { id: "doc-6", title: "Address Proof & Aadhaar of Buyer & Seller", desc: "Copy of ID and local address proof", mandatory: true }
    ],
    tips: [
      "Chassis engine pencil print tracing is required on Form 20 / 30.",
      "Vehicle physical inspection slot opens from 10:30 AM to 1:30 PM."
    ]
  }
];

const offices = [
  {
    id: "office-andheri",
    name: "Tehsil / Revenue Office - Andheri",
    type: "Revenue & Sub-Divisional Office",
    zone: "Western Suburbs",
    location: "Opposite Andheri Railway Station (East), Mumbai 400069",
    latitude: 19.1136,
    longitude: 72.8697,
    distanceKm: 3.2,
    operatingHours: "10:00 AM - 5:30 PM (Mon - Sat, 2nd & 4th Sat closed)",
    lunchTime: "1:30 PM - 2:00 PM",
    contactPhone: "+91 22 2683 4100",
    queue: 18,
    estimatedWait: 42,
    status: "Moderate Queue", // Low, Moderate, High
    lastUpdated: "5 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    services: [
      "non-creamy-layer",
      "caste-certificate",
      "income-certificate",
      "domicile-certificate",
      "ews-certificate",
      "residence-certificate",
      "senior-citizen-certificate",
      "character-certificate"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 10, wait: 20 },
      { hour: "10:00 AM", queue: 24, wait: 50 },
      { hour: "11:00 AM", queue: 38, wait: 80 },
      { hour: "12:00 PM", queue: 45, wait: 95 },
      { hour: "1:00 PM", queue: 32, wait: 65 },
      { hour: "2:00 PM", queue: 20, wait: 45 },
      { hour: "3:00 PM", queue: 14, wait: 30 },
      { hour: "4:00 PM", queue: 18, wait: 40 },
      { hour: "5:00 PM", queue: 8, wait: 15 }
    ]
  },
  {
    id: "office-bandra",
    name: "Revenue Office - Bandra",
    type: "Tahsildar & Sub-Collectorate",
    zone: "Western Suburbs",
    location: "Administrative Complex, Near Bandra Court, Bandra West, Mumbai 400050",
    latitude: 19.0596,
    longitude: 72.8295,
    distanceKm: 5.1,
    operatingHours: "9:30 AM - 5:00 PM (Mon - Sat)",
    lunchTime: "1:00 PM - 1:45 PM",
    contactPhone: "+91 22 2642 9811",
    queue: 7,
    estimatedWait: 15,
    status: "Low Queue",
    lastUpdated: "12 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    services: [
      "non-creamy-layer",
      "income-certificate",
      "domicile-certificate",
      "ews-certificate",
      "senior-citizen-certificate",
      "scholarship-application"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 8, wait: 15 },
      { hour: "10:00 AM", queue: 16, wait: 30 },
      { hour: "11:00 AM", queue: 22, wait: 45 },
      { hour: "12:00 PM", queue: 28, wait: 55 },
      { hour: "1:00 PM", queue: 19, wait: 35 },
      { hour: "2:00 PM", queue: 11, wait: 20 },
      { hour: "3:00 PM", queue: 6, wait: 12 },
      { hour: "4:00 PM", queue: 9, wait: 18 },
      { hour: "5:00 PM", queue: 5, wait: 10 }
    ]
  },
  {
    id: "office-kurla",
    name: "Taluka Office - Kurla",
    type: "Taluka Revenue & Supplies",
    zone: "Central Suburbs",
    location: "Near Kurla Station East, SG Barve Marg, Mumbai 400024",
    latitude: 19.0726,
    longitude: 72.8845,
    distanceKm: 7.4,
    operatingHours: "10:00 AM - 5:30 PM (Mon - Sat)",
    lunchTime: "1:30 PM - 2:00 PM",
    contactPhone: "+91 22 2522 7140",
    queue: 42,
    estimatedWait: 95,
    status: "High Queue",
    lastUpdated: "3 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    services: [
      "non-creamy-layer",
      "caste-certificate",
      "income-certificate",
      "domicile-certificate",
      "ration-card-services",
      "ews-certificate",
      "disability-certificate"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 25, wait: 50 },
      { hour: "10:00 AM", queue: 42, wait: 90 },
      { hour: "11:00 AM", queue: 58, wait: 120 },
      { hour: "12:00 PM", queue: 65, wait: 140 },
      { hour: "1:00 PM", queue: 40, wait: 85 },
      { hour: "2:00 PM", queue: 35, wait: 75 },
      { hour: "3:00 PM", queue: 28, wait: 60 },
      { hour: "4:00 PM", queue: 32, wait: 70 },
      { hour: "5:00 PM", queue: 15, wait: 30 }
    ]
  },
  {
    id: "office-dadar",
    name: "SDM & Collectorate Office - Dadar",
    type: "Sub-Divisional Magistrate",
    zone: "South Central",
    location: "Senapati Bapat Marg, Near Plaza Cinema, Dadar, Mumbai 400028",
    latitude: 19.0178,
    longitude: 72.8478,
    distanceKm: 9.8,
    operatingHours: "10:00 AM - 5:00 PM (Mon - Sat)",
    lunchTime: "1:00 PM - 1:30 PM",
    contactPhone: "+91 22 2430 8820",
    queue: 11,
    estimatedWait: 25,
    status: "Moderate Queue",
    lastUpdated: "8 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    services: [
      "non-creamy-layer",
      "caste-certificate",
      "marriage-certificate",
      "character-certificate",
      "domicile-certificate"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 6, wait: 15 },
      { hour: "10:00 AM", queue: 15, wait: 35 },
      { hour: "11:00 AM", queue: 26, wait: 55 },
      { hour: "12:00 PM", queue: 30, wait: 65 },
      { hour: "1:00 PM", queue: 18, wait: 40 },
      { hour: "2:00 PM", queue: 14, wait: 30 },
      { hour: "3:00 PM", queue: 10, wait: 20 },
      { hour: "4:00 PM", queue: 12, wait: 25 },
      { hour: "5:00 PM", queue: 6, wait: 12 }
    ]
  },
  {
    id: "office-bmc-kwest",
    name: "Municipal Ward Office (BMC) - K/West",
    type: "Municipal Corporation Ward",
    zone: "Western Suburbs",
    location: "Paliram Path, Near Shoppers Stop, Andheri West, Mumbai 400058",
    latitude: 19.1200,
    longitude: 72.8250,
    distanceKm: 4.1,
    operatingHours: "9:00 AM - 4:30 PM (Mon - Fri)",
    lunchTime: "1:00 PM - 1:30 PM",
    contactPhone: "+91 22 2623 9131",
    queue: 5,
    estimatedWait: 12,
    status: "Low Queue",
    lastUpdated: "20 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    services: [
      "birth-certificate",
      "death-certificate",
      "marriage-certificate",
      "residence-certificate"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 4, wait: 10 },
      { hour: "10:00 AM", queue: 12, wait: 25 },
      { hour: "11:00 AM", queue: 18, wait: 40 },
      { hour: "12:00 PM", queue: 22, wait: 50 },
      { hour: "1:00 PM", queue: 10, wait: 20 },
      { hour: "2:00 PM", queue: 7, wait: 15 },
      { hour: "3:00 PM", queue: 5, wait: 10 },
      { hour: "4:00 PM", queue: 4, wait: 8 }
    ]
  },
  {
    id: "office-rto-wadala",
    name: "Regional Transport Office (RTO MH-01) - Wadala",
    type: "Regional Transport Office",
    zone: "Harbour / Central",
    location: "Bhakti Park, Wadala Truck Terminal, Mumbai 400037",
    latitude: 19.0222,
    longitude: 72.8660,
    distanceKm: 11.2,
    operatingHours: "10:00 AM - 5:00 PM (Mon - Sat)",
    lunchTime: "1:30 PM - 2:00 PM",
    contactPhone: "+91 22 2407 1999",
    queue: 38,
    estimatedWait: 85,
    status: "High Queue",
    lastUpdated: "7 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    services: [
      "driving-licence",
      "vehicle-registration"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 15, wait: 35 },
      { hour: "10:00 AM", queue: 35, wait: 75 },
      { hour: "11:00 AM", queue: 50, wait: 110 },
      { hour: "12:00 PM", queue: 60, wait: 130 },
      { hour: "1:00 PM", queue: 45, wait: 95 },
      { hour: "2:00 PM", queue: 30, wait: 65 },
      { hour: "3:00 PM", queue: 25, wait: 50 },
      { hour: "4:00 PM", queue: 28, wait: 60 },
      { hour: "5:00 PM", queue: 14, wait: 25 }
    ]
  },
  {
    id: "office-rto-andheri",
    name: "Regional Transport Office (RTO MH-02) - Andheri",
    type: "Regional Transport Office",
    zone: "Western Suburbs",
    location: "D/111, Ambivali Village, Versova Road, Andheri West, Mumbai 400053",
    latitude: 19.1305,
    longitude: 72.8280,
    distanceKm: 3.8,
    operatingHours: "10:00 AM - 5:00 PM (Mon - Sat)",
    lunchTime: "1:30 PM - 2:00 PM",
    contactPhone: "+91 22 2636 6901",
    queue: 14,
    estimatedWait: 30,
    status: "Moderate Queue",
    lastUpdated: "15 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    services: [
      "driving-licence",
      "vehicle-registration"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 10, wait: 20 },
      { hour: "10:00 AM", queue: 22, wait: 45 },
      { hour: "11:00 AM", queue: 35, wait: 75 },
      { hour: "12:00 PM", queue: 40, wait: 85 },
      { hour: "1:00 PM", queue: 25, wait: 50 },
      { hour: "2:00 PM", queue: 18, wait: 35 },
      { hour: "3:00 PM", queue: 12, wait: 25 },
      { hour: "4:00 PM", queue: 14, wait: 30 },
      { hour: "5:00 PM", queue: 8, wait: 15 }
    ]
  },
  {
    id: "office-uidai-bkc",
    name: "UIDAI Aadhaar Seva Kendra - BKC",
    type: "Direct Aadhaar Seva Kendra",
    zone: "Bandra-Kurla Complex",
    location: "Tower B, G-Block, International Financial Centre, BKC, Mumbai 400051",
    latitude: 19.0660,
    longitude: 72.8670,
    distanceKm: 6.0,
    operatingHours: "9:00 AM - 6:00 PM (Open 7 days a week)",
    lunchTime: "Continuous / Counter rotation",
    contactPhone: "1947",
    queue: 22,
    estimatedWait: 45,
    status: "Moderate Queue",
    lastUpdated: "4 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    services: [
      "aadhaar-services",
      "pan-services"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 14, wait: 30 },
      { hour: "10:00 AM", queue: 28, wait: 60 },
      { hour: "11:00 AM", queue: 40, wait: 85 },
      { hour: "12:00 PM", queue: 45, wait: 95 },
      { hour: "1:00 PM", queue: 30, wait: 60 },
      { hour: "2:00 PM", queue: 24, wait: 50 },
      { hour: "3:00 PM", queue: 18, wait: 35 },
      { hour: "4:00 PM", queue: 20, wait: 40 },
      { hour: "5:00 PM", queue: 12, wait: 25 }
    ]
  },
  {
    id: "office-social-chembur",
    name: "District Social Welfare Office - Chembur",
    type: "Social Welfare Department",
    zone: "Eastern Suburbs",
    location: "Administrative Building, Postal Colony, Chembur, Mumbai 400071",
    latitude: 19.0600,
    longitude: 72.9000,
    distanceKm: 8.5,
    operatingHours: "10:00 AM - 5:00 PM (Mon - Sat)",
    lunchTime: "1:30 PM - 2:00 PM",
    contactPhone: "+91 22 2528 4402",
    queue: 6,
    estimatedWait: 14,
    status: "Low Queue",
    lastUpdated: "25 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    services: [
      "disability-certificate",
      "scholarship-application",
      "senior-citizen-certificate",
      "caste-certificate"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 5, wait: 12 },
      { hour: "10:00 AM", queue: 12, wait: 28 },
      { hour: "11:00 AM", queue: 18, wait: 40 },
      { hour: "12:00 PM", queue: 20, wait: 45 },
      { hour: "1:00 PM", queue: 14, wait: 30 },
      { hour: "2:00 PM", queue: 8, wait: 18 },
      { hour: "3:00 PM", queue: 5, wait: 12 },
      { hour: "4:00 PM", queue: 6, wait: 14 }
    ]
  },
  {
    id: "office-ration-borivali",
    name: "Food & Civil Supplies / Rationing Office - Borivali",
    type: "Civil Supplies Controller",
    zone: "Northern Suburbs",
    location: "SV Road, Near Borivali Court, Borivali West, Mumbai 400092",
    latitude: 19.2300,
    longitude: 72.8560,
    distanceKm: 13.5,
    operatingHours: "10:00 AM - 5:00 PM (Mon - Sat)",
    lunchTime: "1:30 PM - 2:00 PM",
    contactPhone: "+91 22 2898 5601",
    queue: 29,
    estimatedWait: 65,
    status: "High Queue",
    lastUpdated: "10 minutes ago",
    lastReportedTimestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    services: [
      "ration-card-services",
      "income-certificate",
      "domicile-certificate"
    ],
    hourlyPatterns: [
      { hour: "9:00 AM", queue: 16, wait: 35 },
      { hour: "10:00 AM", queue: 32, wait: 70 },
      { hour: "11:00 AM", queue: 45, wait: 100 },
      { hour: "12:00 PM", queue: 50, wait: 110 },
      { hour: "1:00 PM", queue: 36, wait: 80 },
      { hour: "2:00 PM", queue: 26, wait: 58 },
      { hour: "3:00 PM", queue: 18, wait: 40 },
      { hour: "4:00 PM", queue: 22, wait: 50 },
      { hour: "5:00 PM", queue: 10, wait: 20 }
    ]
  }
];

const initialQueueReports = [
  {
    id: "rep-1",
    officeId: "office-andheri",
    officeName: "Tehsil / Revenue Office - Andheri",
    queue: 18,
    waitTime: "30-60 min",
    reportedBy: "Citizen (At Office)",
    timestamp: "11:28 AM",
    timeAgo: "5 min ago",
    verified: true
  },
  {
    id: "rep-2",
    officeId: "office-andheri",
    officeName: "Tehsil / Revenue Office - Andheri",
    queue: 16,
    waitTime: "15-30 min",
    reportedBy: "Citizen",
    timestamp: "11:05 AM",
    timeAgo: "28 min ago",
    verified: true
  },
  {
    id: "rep-3",
    officeId: "office-andheri",
    officeName: "Tehsil / Revenue Office - Andheri",
    queue: 12,
    waitTime: "15-30 min",
    reportedBy: "Citizen",
    timestamp: "10:42 AM",
    timeAgo: "51 min ago",
    verified: true
  },
  {
    id: "rep-4",
    officeId: "office-bandra",
    officeName: "Revenue Office - Bandra",
    queue: 7,
    waitTime: "0-15 min",
    reportedBy: "Citizen (Desk Queue)",
    timestamp: "11:21 AM",
    timeAgo: "12 min ago",
    verified: true
  },
  {
    id: "rep-5",
    officeId: "office-kurla",
    officeName: "Taluka Office - Kurla",
    queue: 42,
    waitTime: "60+ min",
    reportedBy: "Citizen (Token Counter)",
    timestamp: "11:30 AM",
    timeAgo: "3 min ago",
    verified: true
  }
];

const initialAlerts = [
  {
    id: "alert-1",
    officeId: "office-kurla",
    officeName: "Taluka Office - Kurla",
    serviceName: "Non-Creamy Layer Certificate",
    threshold: 20,
    currentQueue: 42,
    status: "Waiting for queue to decrease",
    createdAt: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    notified: false
  }
];

module.exports = {
  services,
  offices,
  initialQueueReports,
  initialAlerts
};
