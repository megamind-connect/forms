export const vendorStep1Fields = [
  { id: "v1_q1", name: "vendor_name", label: "Vendor Name", placeholder: "Enter vendor name", fieldType: "text" },
  { id: "v1_q2", name: "legal_name", label: "Legal Name", placeholder: "(as per PAN/GST)", fieldType: "text" },
{
    id: "v1_q3", 
    name: "vendor_type",
    label: "Vendor Type ",
    placeholder: "Select an option",
    fieldType: "dropdown",
    options: [
      { label: "Individual", value: "individual" },
      { label: "Proprietor", value: "Proprietor" },
      { label: "Partnership", value: "partnership" },
      { label: "LLP", value: "llp" },
      { label: "Pvt Ltd", value: "pvt_ltd" },
    ],
  },  {
    id: "v1_q4",
    name: "nature_of_service",
    label: "Nature of Service / Category",
    placeholder: "Select vendor type",
    fieldType: "dropdown",
    options: [
      { label: "Printing", value: "printing" },
      { label: "Fabrication", value: "fabrication" },
      { label: "Civil Work", value: "civil_work" },
      { label: "Interior Work", value: "interior_work" },
      { label: "Electrical Work", value: "electrical_work" },
      { label: "Plumbing Work", value: "plumbing_work" },
      { label: "Maintenance Services", value: "maintenance_services" },
      { label: "Event Production / Setup", value: "event_production" },
      { label: "Courier Services", value: "courier_services" },
      { label: "Transportation Services", value: "transportation_services" },
      { label: "Logistics Services", value: "logistics_services" },
      { label: "Office Supplies / Stationery", value: "office_supplies" },
      { label: "Equipment Rental", value: "equipment_rental" },
      { label: "Purchase of Goods", value: "purchase_of_goods" },
      { label: "Legal Services", value: "legal_services" },
      { label: "Audit & Accounting Services", value: "accounting_services" },
      { label: "Travel Management", value: "travel_management" },
      { label: "Hotel / Accommodation Services", value: "hotel_services" },
      { label: "Others (Specify)", value: "other" },
    ],
  },
];

export const vendorStep2Fields = [
  { id: "v2_q1", name: "contact_person_name", label: "Contact Person Name", placeholder: "Enter name", fieldType: "text" },
  { id: "v2_q2", name: "contact_number", label: "Contact Number", placeholder: "Enter contact number", fieldType: "text" },
  { id: "v2_q3", name: "alternate_contact_number", label: "Alternate Contact Number", placeholder: "Enter alternate contact number", fieldType: "text", optional: true },
  { id: "v2_q4", name: "email_id", label: "Email ID", placeholder: "Enter email ID", fieldType: "email" },
  { id: "v2_q5", name: "alternate_email_id", label: "Alternate Email ID", placeholder: "Enter alternate email ID", fieldType: "email", optional: true },
];

export const vendorStep3Fields = [
  { id: "v3_q1", name: "address_line_1", label: "Address Line 1", placeholder: "House/Building No., Street", fieldType: "text" },
  { id: "v3_q2", name: "address_line_2", label: "Address Line 2", placeholder: "Area, Landmark (Optional)", fieldType: "text", optional: true },
  { id: "v3_q3", name: "country", label: "Country", placeholder: "Enter country", fieldType: "text" },
  { id: "v3_q4", name: "state", label: "State", placeholder: "Enter state", fieldType: "text" },
  { id: "v3_q5", name: "city_district", label: "City / District", placeholder: "Enter city or district", fieldType: "text" },
  { id: "v3_q6", name: "pincode", label: "Pincode", placeholder: "Enter 6-digit pincode", fieldType: "text" },
];

export const vendorStep4Fields = [
  { id: "v4_q1", name: "beneficiary_name", label: "Beneficiary Name", placeholder: "Must match legal name", fieldType: "text" },
  { id: "v4_q2", name: "bank_name", label: "Bank Name", placeholder: "Enter bank name", fieldType: "text" },
  { id: "v4_q3", name: "branch_name", label: "Branch Name", placeholder: "Enter branch name", fieldType: "text" },
  { id: "v4_q4", name: "account_number", label: "Account Number", placeholder: "Enter account number", fieldType: "text" },
  { id: "v4_q5", name: "ifsc_code", label: "IFSC Code", placeholder: "e.g. SBIN0001234", fieldType: "text" },
  {
    id: "v4_q6",
    name: "account_type",
    label: "Account Type",
    placeholder: "Select account type",
    fieldType: "dropdown",
    options: [
      { label: "Current", value: "current" },
      { label: "Savings", value: "savings" },
    ],
  },
];

export const vendorStep5Fields = [
  { id: "v5_q1", name: "pan_number", label: "PAN Number", placeholder: "Enter 10-digit PAN", fieldType: "text" },
  { id: "v5_q2", name: "gstin", label: "GSTIN", placeholder: "Enter GSTIN", fieldType: "text" },
  {
    id: "v5_q3",
    name: "gst_registered",
    label: "GST Registered",
    placeholder: "Select an option",
    fieldType: "dropdown",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
];

export const vendorStep6Fields = [
  { id: "v6_q1", name: "pan_card_copy", label: "PAN Card Copy", placeholder: "Upload PAN Card", fieldType: "file" },
  { id: "v6_q2", name: "gst_certificate_copy", label: "GST Certificate Copy", placeholder: "Upload GST Certificate", fieldType: "file" },
  { id: "v6_q3", name: "bank_proof", label: "Bank Proof", placeholder: "Upload Bank Proof (Cancelled Cheque/Passbook)", fieldType: "file" },
];
