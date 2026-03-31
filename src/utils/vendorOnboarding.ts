export const vendorStep1Fields = [
  { id: "v1_q1", name: "name", label: "Vendor Name", placeholder: "Enter vendor name", fieldType: "text" },
  { id: "v1_q2", name: "legalName", label: "Legal Name", placeholder: "(as per PAN/GST)", fieldType: "text" }, // Corrected name
  {
    id: "v1_q3",
    name: "vendorTypes", // Corrected name
    label: "Vendor Type",
    placeholder: "Select an option",
    fieldType: "dropdown",
    options: [
      { label: "Individual", value: "INDIVIDUAL" }, // Corrected to uppercase
      { label: "Proprietor", value: "PROPRIETOR" }, // Corrected to uppercase
      { label: "Partnership", value: "PARTNERSHIP" }, // Corrected to uppercase
      { label: "LLP", value: "LLP" }, // Corrected to uppercase
      { label: "Pvt Ltd", value: "PVT_LTD" }, // Corrected to uppercase
    ],
  },
  {
    id: "v1_q4",
    name: "category", // Corrected name
    label: "Nature of Service / Category",
    placeholder: "Select vendor type",
    fieldType: "dropdown",
    options: [
      { label: "Printing", value: "PRINTING" },
      { label: "Fabrication", value: "FABRICATION" },
      { label: "Civil Work", value: "CIVIL_WORKS" },
      { label: "Interior Work", value: "INTERIOR_WORK" },
      { label: "Electrical Work", value: "ELECTRICAL" },
      { label: "Plumbing Work", value: "PLUMBING" },
      { label: "Maintenance Services", value: "INFRASTRUCTURE_MAINTENANCE" },
      { label: "Event Production / Setup", value: "EVENT_PRODUCTION_SETUP" },
      { label: "Courier Services", value: "COURIER_SERVICES" },
      { label: "Transportation Services", value: "TRANSPORTATION" },
      { label: "Logistics Services", value: "LOGISTICS" },
      { label: "Office Supplies / Stationery", value: "OFFICE_SUPPLIES" },
      { label: "Equipment Rental", value: "EQUIPMENT_RENTAL" },
      { label: "Purchase of Goods", value: "PURCHASE_OF_GOODS" },
      { label: "Legal Services", value: "LEGAL_SERVICES" },
      { label: "Audit & Accounting Services", value: "AUDIT_AND_ACCOUNTING" },
      { label: "Travel Management", value: "TRAVEL_MANAGEMENT" },
      { label: "Hotel / Accommodation Services", value: "HOTEL_AND_ACCOMMODATION" },
      { label: "Others (Specify)", value: "OTHERS" },
    ],
  },
];

export const vendorStep2Fields = [
  { id: "v2_q1", name: "contactPerson", label: "Contact Person Name", placeholder: "Enter name", fieldType: "text" }, // Corrected name
  { id: "v2_q2", name: "phoneNumber", label: "Contact Number", placeholder: "Enter contact number", fieldType: "text" }, // Corrected name
  {
    id: "v2_q3",
    name: "alternatePhoneNumber", // Corrected name
    label: "Alternate Contact Number",
    placeholder: "Enter alternate contact number",
    fieldType: "text",
    optional: true,
  },
  { id: "v2_q4", name: "email", label: "Email ID", placeholder: "Enter email ID", fieldType: "email" }, // Corrected name
  {
    id: "v2_q5",
    name: "alternateEmail", // Corrected name
    label: "Alternate Email ID",
    placeholder: "Enter alternate email ID",
    fieldType: "email",
    optional: true,
  },
];

export const vendorStep3Fields = [
  { id: "v3_q1", name: "addressLine1", label: "Address Line 1", placeholder: "House/Building No., Street", fieldType: "text" }, // Corrected name
  { id: "v3_q2", name: "addressLine2", label: "Address Line 2", placeholder: "Area, Landmark (Optional)", fieldType: "text", optional: true }, // Corrected name
  { id: "v3_q3", name: "country", label: "Country", placeholder: "Enter country", fieldType: "text" },
  { id: "v3_q4", name: "state", label: "State", placeholder: "Enter state", fieldType: "text" },
  { id: "v3_q5", name: "city", label: "City / District", placeholder: "Enter city or district", fieldType: "text" }, // Corrected name
  { id: "v3_q6", name: "zipCode", label: "Pincode", placeholder: "Enter 6-digit pincode", fieldType: "text" }, // Corrected name
];

export const vendorStep4Fields = [
  { id: "v4_q1", name: "accountName", label: "Beneficiary Name", placeholder: "Must match legal name", fieldType: "text" }, // Corrected name
  { id: "v4_q2", name: "bankName", label: "Bank Name", placeholder: "Enter bank name", fieldType: "text" }, // Corrected name
  { id: "v4_q3", name: "branchName", label: "Branch Name", placeholder: "Enter branch name", fieldType: "text" }, // Corrected name
  { id: "v4_q4", name: "accountNumber", label: "Account Number", placeholder: "Enter account number", fieldType: "text" }, // Corrected name
  { id: "v4_q5", name: "ifscCode", label: "IFSC Code", placeholder: "e.g. SBIN0001234", fieldType: "text" }, // Corrected name
  {
    id: "v4_q6",
    name: "accountType", // Corrected name
    label: "Account Type",
    placeholder: "Select account type",
    fieldType: "dropdown",
    options: [
      { label: "Current", value: "CURRENT" }, // Corrected to uppercase
      { label: "Savings", value: "SAVINGS" }, // Corrected to uppercase
    ],
  },
];

export const vendorStep5Fields = [
  { id: "v5_q1", name: "panNumber", label: "PAN Number", placeholder: "Enter 10-digit PAN", fieldType: "text" }, // Corrected name
  { id: "v5_q2", name: "gstin", label: "GSTIN", placeholder: "Enter GSTIN", fieldType: "text" },
  {
    id: "v5_q3",
    name: "gstStatus", // Corrected name
    label: "GST Registered",
    placeholder: "Select an option",
    fieldType: "dropdown",
    options: [
      { label: "Yes", value: "YES" }, // Corrected to uppercase
      { label: "No", value: "NO" }, // Corrected to uppercase
    ],
  },
];

export const vendorStep6Fields = [
  { id: "v6_q1", name: "panCard", label: "PAN Card Copy", placeholder: "Upload PAN Card", fieldType: "file" },
  { id: "v6_q2", name: "gstCertificate", label: "GST Certificate Copy", placeholder: "Upload GST Certificate", fieldType: "file" },
  { id: "v6_q3", name: "bankProof", label: "Bank Proof", placeholder: "Upload Bank Proof (Cancelled Cheque/Passbook)", fieldType: "file" },
];
