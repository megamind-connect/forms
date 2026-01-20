export const generalFields = [
  { id: "brand_name", name: "brand_name", label: "Brand Name", placeholder: "Full name of your brand", fieldType: "text" },
  {
    id: "reg_legal_name",
    name: "registered_legal_name",
    label: "Registered Legal Name",
    placeholder: "Registered company or entity name",
    fieldType: "text",
  },
  {
    id: "industry",
    name: "industry_category",
    label: "Industry Category",
    placeholder: "E.g. Food & Beverage, Technology, Retail",
    fieldType: "dropdown",
    options: [
      { label: "Food & Beverage", value: "fnb" },
      { label: "Technology", value: "technology" },
      { label: "Retail", value: "retail" },
      { label: "Healthcare", value: "healthcare" },
      { label: "Education", value: "education" },
      { label: "Real Estate", value: "real_estate" },
      { label: "Finance", value: "finance" },
      { label: "Manufacturing", value: "manufacturing" },
      { label: "Others", value: "others" },
    ],
  },
  { id: "gstin_gen", name: "gstin", label: "GSTIN (if applicable)", placeholder: "Enter Here", fieldType: "text" },
  {
    id: "reg_addr",
    name: "registered_business_address",
    label: "Registered Business Address",
    placeholder: "Complete address as per registration",
    fieldType: "textarea",
  },
  {
    id: "billing_addr",
    name: "official_billing_address",
    label: "Official Billing Address",
    placeholder: "Kindly fill if different from the registered business address",
    fieldType: "textarea",
  },
  { id: "email", name: "business_email_id", label: "Business Email ID", placeholder: "Official business email", fieldType: "text" },
  {
    id: "landline",
    name: "business_landline_numbers",
    label: "Business Landline Number(s)",
    placeholder: "Official business landline number",
    fieldType: "array",
  },
  {
    id: "mobile",
    name: "business_mobile_numbers",
    label: "Business Mobile Number(s)",
    placeholder: "Official business Mobile Number",
    fieldType: "array",
  },
  {
    id: "wa_num",
    name: "whatsapp_business_number",
    label: "WhatsApp Business (If Available)",
    placeholder: "Whatsapp Business API Number",
    fieldType: "text",
  },
  {
    id: "wa_link",
    name: "whatsapp_business_link",
    label: "WhatsApp Business API Link",
    placeholder: "Whatsapp Business API Link",
    fieldType: "text",
  },
  { id: "website", name: "website_url", label: "Website URL (If Available)", placeholder: "Official website URL", fieldType: "text" },
  { id: "est_year", name: "year_of_establishment", label: "Year of Establishment", placeholder: "YYYY", fieldType: "text" },
  {
    id: "legal_structure",
    name: "legal_structure",
    label: "Legal Structure",
    placeholder: "E.g. Private Ltd, LLP, Proprietorship, etc.",
    fieldType: "dropdown",
    options: [
      { label: "Private Ltd", value: "private_ltd" },
      { label: "LLP", value: "llp" },
      { label: "Proprietorship", value: "proprietorship" },
      { label: "Partnership", value: "partnership" },
      { label: "Public Ltd", value: "public_ltd" },
    ],
  },
  {
    id: "timings",
    name: "business_operating_timings",
    label: "Business Operating Timings",
    placeholder: "Enter operating timings (e.g., 9 AM - 6 PM)",
    fieldType: "text",
  },
];

export const clientPageGeneralFields = [
  { id: "name", name: "full_name", label: "Name", placeholder: "Your Full Name", fieldType: "text" },
  { id: "brand_name", name: "brand_name", label: "Brand Name", placeholder: "Full name of your brand", fieldType: "text" },
  {
    id: "role",
    name: "role_in_organisation",
    label: "Role in the Organisation",
    placeholder: "Select your role in the organisation",
    fieldType: "dropdown",
    options: [
      { label: "Managing Director", value: "managing_director" },
      { label: "Marketing Director", value: "marketing_director" },
      { label: "CEO / Founder", value: "ceo_founder" },
      { label: "CMO / Head of Marketing", value: "cmo_head_of_marketing" },
      { label: "Marketing Manager", value: "marketing_manager" },
      { label: "Marketing POC / Coordinator", value: "marketing_poc_coordinator" },
      { label: "Brand Manager", value: "brand_manager" },
      { label: "PR Head", value: "pr_head" },
      { label: "Others", value: "others" },
    ],
  },
];

export const financialLegalFields = [
  {
    id: "company_pan",
    name: "company_pan_number",
    label: "Company PAN Number",
    placeholder: "Company PAN Number",
    fieldType: "text",
    hideLabel: true,
  },
  {
    id: "company_tan",
    name: "company_tan_number",
    label: "Company TAN Number",
    placeholder: "Company TAN Number",
    fieldType: "text",
    hideLabel: true,
  },
  {
    id: "company_reg",
    name: "company_registration_number",
    label: "Company Registration Number",
    placeholder: "Company Registration Number",
    fieldType: "text",
    hideLabel: true,
  },
  // GSTIN moved to General Step
  { id: "cert_incorp", name: "certificate_of_incorporation", label: "Certificate of Incorporation", placeholder: "", fieldType: "file" },
  { id: "gst_cert", name: "gst_registration_certificate", label: "GST Registration Certificate", placeholder: "", fieldType: "file" },
  { id: "pan_card", name: "pan_card", label: "PAN Card (Company & Proprietor)", placeholder: "", fieldType: "file" },
  {
    id: "signed_contract",
    name: "signed_contract_agreement",
    label: "Signed Contract Agreement",
    placeholder: "(If already executed)",
    fieldType: "file",
  },
  { id: "signed_nda", name: "signed_nda", label: "Signed Non-Disclosure Agreement (NDA)", placeholder: "(if already executed)", fieldType: "file" },
];

export const contactFields = [
  // Primary Contact
  { id: "primary_header", name: "", label: "Primary Contact Person", fieldType: "header" },
  { id: "p_name", name: "primary_contact_name", label: "Name", placeholder: "", fieldType: "text" },
  { id: "p_email", name: "primary_contact_email", label: "Email", placeholder: "", fieldType: "text" },
  { id: "p_phone", name: "primary_contact_phone", label: "Phone", placeholder: "Phone", fieldType: "phone" },

  // Alternate Contact
  { id: "alt_header", name: "", label: "Alternate Contact (optional)", fieldType: "header" },
  { id: "alt_name", name: "alternate_contact_name", label: "Name", placeholder: "", fieldType: "text" },
  { id: "alt_email", name: "alternate_contact_email", label: "Email", placeholder: "", fieldType: "text" },
  { id: "alt_phone", name: "alternate_contact_phone", label: "Phone", placeholder: "Phone", fieldType: "phone" },

  // Finance Department Contact
  { id: "fin_header", name: "", label: "Finance Department Contact", fieldType: "header" },
  { id: "fin_name", name: "finance_contact_name", label: "Name", placeholder: "", fieldType: "text" },
  { id: "fin_email", name: "finance_contact_email", label: "Email", placeholder: "", fieldType: "text" },
  { id: "fin_phone", name: "finance_contact_phone", label: "Phone", placeholder: "Phone", fieldType: "phone" },
];

export const commonPersonalFields = [...generalFields];

export const step3ExtraFieldList = [
  { id: "41", name: "free_time_activities", label: "How do you spend your free time?", fieldType: "textarea" },
  { id: "42", name: "hobbies", label: "What are your hobbies?", fieldType: "textarea" },
  { id: "43", name: "favourite_color", label: "Your favourite colour?", fieldType: "textarea" },
  { id: "44", name: "favourite_food", label: "Favourite food?", fieldType: "textarea" },
];

export const brandIdentityFields = [
  {
    id: "bf_1",
    name: "founding_vision",
    label: "What was the founding vision behind your brand?",
    fieldType: "textarea",
    placeholder: "Share the big idea that set your brand in motion and defined what it set out to become.",
  },
  {
    id: "bf_2",
    name: "inspiration_origin",
    label: "What was the inspiration for starting your brand?",
    fieldType: "textarea",
    placeholder: "Was there a story, spark, or innovation that began your journey.",
  },
  {
    id: "bf_3",
    name: "brand_core_values",
    label: "What are your brand’s core values?",
    fieldType: "textarea",
    placeholder: "Talk about the values that anchor your brand and keep it true to its purpose.",
  },
  {
    id: "bf_4",
    name: "brand_description",
    label: "What does your brand do?",
    fieldType: "textarea",
    placeholder: "Please describe your product or services.",
  },
  {
    id: "bf_5",
    name: "brand_strengths_weaknesses",
    label: "What are your brand’s greatest strengths and weaknesses?",
    fieldType: "textarea",
    placeholder: "Share the strengths that power your brand forward and the gaps you aim to improve over time.",
  },
  {
    id: "bf_6",
    name: "primary_goals",
    label: "What are the primary goals of this branding and communication initiative?",
    fieldType: "textarea",
    placeholder: "Spell out what this initiative is meant to achieve and the outcomes you’re aiming for.",
  },
  {
    id: "bf_7",
    name: "unique_value_proposition",
    label: "What is your brand’s unique value proposition?",
    fieldType: "textarea",
    placeholder: "Share the distinct advantage that sets your brand apart and makes it the clear choice.",
  },
  // Note: "What are the primary goals..." is repeated in the screenshot (or similar). The screenshot shows "What are the primary goals of this branding and communication initiative?" appearing twice in the list provided by user (or very similar). I will stick to one instance if it's identical, or include both if they are distinct in some way. Screenshot 2 has "What are the primary goals..." then "What is your brand's unique..." then "What are the primary goals..." again. It might be a mistake in the design or request. I will assume it's a duplicate and include it once unless user clarifies. Wait, looking closely at screenshots...
  // Screenshot 2:
  // 1. Founding vision
  // 2. Inspiration
  // 3. Core values
  // 4. What does brand do
  // 5. Strengths/Weaknesses
  // 6. Primary goals
  // 7. UVP
  // 8. Primary goals (again? - "What are the primary goals of this branding and communication initiative?")
  // 9. Where do you see your brand in 3 years
  // 10. New products/services
  // 11. Expansion plans

  // I'll skip the duplicate "Primary goals" unless it has a different placeholder. Screenshot resolution is low but placeholder looks identical. I will add the remaining unique ones.

  {
    id: "bf_8",
    name: "brand_vision_3_years",
    label: "Where do you see your brand in the next 3 years?",
    fieldType: "textarea",
    placeholder: "Share the milestones you expect your brand to hit and the future you’re building toward.",
  },
  {
    id: "bf_9",
    name: "new_products_launch",
    label: "Are there any new products or services you plan to launch?",
    fieldType: "textarea",
    placeholder: "Share any upcoming products or services that are set to level up your brand’s offering.",
  },
  {
    id: "bf_10",
    name: "expansion_plans",
    label: "Are you planning to expand your brand?",
    fieldType: "textarea",
    placeholder: "If yes, what is the expected timeline?",
  },
];

export const marketAudienceFields = [
  {
    id: "ma_1",
    name: "ideal_customer_profile",
    label: "Who is your ideal customer?",
    fieldType: "textarea",
    placeholder: "Please describe demographics, interests, and behavior patterns.",
  },
  {
    id: "ma_2",
    name: "top_competitors",
    label: "Who are your top three competitors?",
    fieldType: "textarea",
    placeholder: "list the three brands that compete closest with you and share the space you’re battling in.",
  },
  {
    id: "ma_3",
    name: "current_market_challenges",
    label: "What current challenges does your brand face in the market?",
    fieldType: "textarea",
    placeholder: "Break down the hurdles your brand is dealing with and what’s holding it back in the market.",
  },
  {
    id: "ma_4",
    name: "market_opportunities",
    label: "What opportunities do you see for your brand in the market?",
    fieldType: "textarea",
    placeholder: "Highlight the openings in the market that your brand is ready to tap into.",
  },
  {
    id: "ma_5",
    name: "competitor_differentiation",
    label: "What differentiates your brand from your competitors?",
    fieldType: "textarea",
    placeholder: "Share the unique qualities that give your brand an edge over the competition",
  },
  {
    id: "ma_6",
    name: "competitor_challenges",
    label: "What challenges have you faced with competitors in your industry?",
    fieldType: "textarea",
    placeholder: "Share the hurdles and battles your brand has faced while navigating a competitive market.",
  },
  {
    id: "ma_7",
    name: "market_gaps",
    label: "Are there any market gaps or opportunities you want to target?",
    fieldType: "textarea",
    placeholder: "Share the gaps or opportunities that could give your brand a strategic advantage.",
  },
  {
    id: "ma_8",
    name: "admired_brands",
    label: "Are there any brands or campaigns in your industry you admire?",
    fieldType: "textarea",
    placeholder: "Why do they stand out?",
  },
];

export const projectScopeFields = [
  {
    id: "ps_1",
    name: "expectations_creative_partner",
    label: "What are your expectations from us as your creative partner?",
    fieldType: "textarea",
    placeholder: "Please describe your key expectations and desired deliverables.",
  },
  {
    id: "ps_2",
    name: "previous_agency_experience",
    label: "Have you previously worked with an agency?",
    fieldType: "textarea",
    placeholder: "If yes, please share the challenges or drawbacks you experienced.",
  },
  {
    id: "ps_3",
    name: "specific_themes_ideas",
    label: "Do you have any specific themes, ideas, or concerns you want us to be aware of?",
    fieldType: "textarea",
    placeholder: "Share any themes, concepts, or concerns that should guide our approach.",
  },
  {
    id: "ps_4",
    name: "mandatory_branding_elements",
    label: "Are there any mandatory elements, guidelines, or messages that must be included in all branding materials?",
    fieldType: "textarea",
    placeholder: "Share the must-have components and rules that all materials should follow without fail.",
  },
];

export const socialPlatformFields = [
  { id: "sp_2", name: "instagram_profile_url", label: "Instagram", fieldType: "text", placeholder: "Official Instagram Profile URL" },

  { id: "sp_1", name: "facebook_page_url", label: "Facebook Page", fieldType: "text", placeholder: "Facebook Page URL" },
  { id: "sp_3", name: "linkedin_profile_url", label: "LinkedIn Page", fieldType: "text", placeholder: "LinkedIn Profile URL" },
  { id: "sp_4", name: "twitter_profile_url", label: "Twitter / X", fieldType: "text", placeholder: "Twitter (X) Profile URL" },
  { id: "sp_5", name: "youtube_channel_url", label: "YouTube Channel", fieldType: "text", placeholder: "YouTube Channel URL" },
  { id: "sp_6", name: "google_business_url", label: "Google My Business", fieldType: "text", placeholder: "Google My Business URL" },
  { id: "sp_7", name: "website_url_social", label: "Website", fieldType: "text", placeholder: "Website URL" },
  {
    id: "sp_others",
    name: "additional_platforms",
    label: "Additional Platforms (Optional)",
    fieldType: "platform_array",
    placeholder: "Platform Name",
  },
];

export const socialMediaAccessFields = [
  { id: "sma_header_1", name: "meta_header", label: "Meta (Facebook & Instagram)", fieldType: "subheader" },
  {
    id: "sma_meta_desc",
    name: "meta_description",
    label: "Please invite our email: studiomegamind@gmail.com",
    fieldType: "text",
    hideLabel: true,
    placeholder: "Please invite our email: studiomegamind@gmail.com",
  },
  { id: "sma_1a", name: "meta_email", label: "Email", fieldType: "text", placeholder: "Email" },
  { id: "sma_1b", name: "meta_password", label: "Password", fieldType: "password", placeholder: "Password" },

  { id: "sma_header_2", name: "linkedin_header", label: "LinkedIn", fieldType: "subheader" },
  {
    id: "sma_linkedin_desc",
    name: "linkedin_description",
    label: "Please invite our email: studiomegamind@gmail.com",
    fieldType: "text",
    hideLabel: true,
    placeholder: "Please invite our email: studiomegamind@gmail.com",
  },
  { id: "sma_2a", name: "linkedin_email", label: "Email", fieldType: "text", placeholder: "Email" },
  { id: "sma_2b", name: "linkedin_password", label: "Password", fieldType: "password", placeholder: "Password" },

  { id: "sma_header_3", name: "twitter_header", label: "Twitter (X)", fieldType: "subheader" },
  {
    id: "sma_twitter_desc",
    name: "twitter_description",
    label: "Please invite our email: studiomegamind@gmail.com",
    fieldType: "text",
    hideLabel: true,
    placeholder: "Please invite our email: studiomegamind@gmail.com",
  },
  { id: "sma_3a", name: "twitter_email", label: "Email", fieldType: "text", placeholder: "Email" },
  { id: "sma_3b", name: "twitter_password", label: "Password", fieldType: "password", placeholder: "Password" },
];

export const assetTypesFields = [
  {
    id: "asset_desc",
    name: "asset_types_description",
    label: "If you have any of the following assets, please toggle 'Yes' and provide the link for each.",
    fieldType: "text",
    hideLabel: true,
    placeholder: "If you have any of the following assets, please toggle 'Yes' and provide the link for each.",
  },
  { id: "asset_1", name: "brand_logo_files", label: "Brand Logo Files", fieldType: "toggle_input", placeholder: "In AI, EPS, SVG, PNG file types" },
  {
    id: "asset_2",
    name: "brand_guidelines",
    label: "Brand Guidelines",
    fieldType: "toggle_input",
    placeholder: "Inclusive of fonts, colors, tone, spacing",
  },
  {
    id: "asset_3",
    name: "brochures_product_photos",
    label: "Brochures / Product or Service Photos",
    fieldType: "toggle_input",
    placeholder: "Please provide a link to the library",
  },
  {
    id: "asset_4",
    name: "past_campaign_reports",
    label: "Past or Current Campaign Reports",
    fieldType: "toggle_input",
    placeholder: "Please provide a link to the library",
  },
  {
    id: "asset_5",
    name: "moodboards_videos",
    label: "Moodboards / Explainer Videos / Brand Films",
    fieldType: "toggle_input",
    placeholder: "Please provide a link to the library",
  },
  {
    id: "asset_6",
    name: "current_image_assets",
    label: "Current Image Assets",
    fieldType: "toggle_input",
    placeholder: "Please provide a link to the library",
  },
  {
    id: "asset_7",
    name: "current_video_assets",
    label: "Current Video Assets",
    fieldType: "toggle_input",
    placeholder: "Please provide a link to the library",
  },
];

export const websiteDetailsFields = [
  {
    id: "web_1",
    name: "has_domain",
    label: "Do you currently have a domain?",
    fieldType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "web_2",
    name: "has_cms_platform",
    label: "Do you currently have a CMS platform?",
    fieldType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "web_3",
    name: "has_third_party_platform",
    label: "Does the third party platform such as Shopify, bookingsengine, payment gateway, or Google Maps API?",
    fieldType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "web_4",
    name: "form_data_storage",
    label: "Where is the data currently collected from website forms being stored or sent?",
    fieldType: "text",
    placeholder: "E.g., Google Sheets, email, database, etc.",
  },
  {
    id: "web_5",
    name: "hosting_server_details",
    label: "Provide Hosting Server Details (If Any)",
    fieldType: "text",
    placeholder: "URL, username, or type",
  },
  {
    id: "web_6",
    name: "source_code_storage",
    label: "Where should the website's source code be stored and managed?",
    fieldType: "text",
    placeholder: "E.g., GitHub, GitLab, Bitbucket, codebase, etc.",
  },
  {
    id: "web_7",
    name: "current_website_management",
    label: "If you already have a website, please describe how it is currently managed",
    fieldType: "textarea",
    placeholder: "Who manages it and how",
  },
  {
    id: "web_8",
    name: "google_analytics_ga4",
    label: "Google Analytics (GA4)",
    fieldType: "checkbox_single",
    placeholder: "Enable if you want to set up Google Analytics (GA4)",
  },
  {
    id: "web_9",
    name: "google_tag_manager",
    label: "Google Tag Manager",
    fieldType: "checkbox_single",
    placeholder: "Enable if you want to set up Google Tag Manager",
  },
  {
    id: "web_10",
    name: "google_search_console",
    label: "Google Search Console",
    fieldType: "checkbox_single",
    placeholder: "Enable if you want to set up Google Search Console",
  },
  {
    id: "web_11",
    name: "third_party_tools_integration",
    label: "Which third-party tools or services should be integrated with the website?",
    fieldType: "textarea",
    placeholder: "Third party tools",
  },
];

export const accountDetailsFields = [
  { id: "acc_header_1", name: "youtube_header", label: "YouTube Channel", fieldType: "subheader" },
  {
    id: "acc_youtube_desc",
    name: "youtube_description",
    label: "Please invite our email: studiomegamind@gmail.com",
    fieldType: "text",
    hideLabel: true,
    placeholder: "Please invite our email: studiomegamind@gmail.com",
  },
  { id: "acc_1a", name: "youtube_email", label: "Email", fieldType: "text", placeholder: "Email" },
  { id: "acc_1b", name: "youtube_password", label: "Password", fieldType: "password", placeholder: "Password" },

  { id: "acc_header_2", name: "google_ads_header", label: "Google Ads", fieldType: "subheader" },
  {
    id: "acc_gads_desc",
    name: "google_ads_description",
    label: "Please invite our email: studiomegamind@gmail.com",
    fieldType: "text",
    hideLabel: true,
    placeholder: "Please invite our email: studiomegamind@gmail.com",
  },
  { id: "acc_2a", name: "google_ads_email", label: "Email", fieldType: "text", placeholder: "Email" },
  { id: "acc_2b", name: "google_ads_password", label: "Password", fieldType: "password", placeholder: "Password" },

  { id: "acc_header_3", name: "google_analytics_header", label: "Google Analytics", fieldType: "subheader" },
  {
    id: "acc_ga_desc",
    name: "google_analytics_description",
    label: "Please invite our email: studiomegamind@gmail.com",
    fieldType: "text",
    hideLabel: true,
    placeholder: "Please invite our email: studiomegamind@gmail.com",
  },
  { id: "acc_3a", name: "google_analytics_email", label: "Email", fieldType: "text", placeholder: "Email" },
  { id: "acc_3b", name: "google_analytics_password", label: "Password", fieldType: "password", placeholder: "Password" },

  { id: "acc_header_4", name: "google_tag_manager_header", label: "Google Tag Manager", fieldType: "subheader" },
  {
    id: "acc_gtm_desc",
    name: "google_tag_manager_description",
    label: "Please invite our email: studiomegamind@gmail.com",
    fieldType: "text",
    hideLabel: true,
    placeholder: "Please invite our email: studiomegamind@gmail.com",
  },
  { id: "acc_4a", name: "google_tag_manager_email", label: "Email", fieldType: "text", placeholder: "Email" },
  { id: "acc_4b", name: "google_tag_manager_password", label: "Password", fieldType: "password", placeholder: "Password" },

  { id: "acc_header_5", name: "google_search_console_header", label: "Google Search Console", fieldType: "subheader" },
  {
    id: "acc_gsc_desc",
    name: "google_search_console_description",
    label: "Please invite our email: studiomegamind@gmail.com",
    fieldType: "text",
    hideLabel: true,
    placeholder: "Please invite our email: studiomegamind@gmail.com",
  },
  { id: "acc_5a", name: "google_search_console_email", label: "Email", fieldType: "text", placeholder: "Email" },
  { id: "acc_5b", name: "google_search_console_password", label: "Password", fieldType: "password", placeholder: "Password" },
];

export const businessVerificationFields = [
  {
    id: "biz_1",
    name: "certificate_of_incorporation",
    label: "Certificate of Incorporation / Business Registration",
    fieldType: "file",
    placeholder: "Select and Upload your Files Here",
  },
  { id: "biz_2", name: "pan_card_company", label: "PAN Card (Company PAN)", fieldType: "file", placeholder: "Select and Upload your Files Here" },
  {
    id: "biz_3",
    name: "pan_card_proprietor",
    label: "PAN Card (PAN - Proprietor)",
    fieldType: "file",
    placeholder: "Select and Upload your Files Here",
  },
  {
    id: "biz_4",
    name: "driving_license_proprietor",
    label: "Driving License (DL - Proprietor)",
    fieldType: "file",
    placeholder: "Select and Upload your Files Here",
  },
  {
    id: "biz_5",
    name: "gst_registration_certificate",
    label: "GST Registration Certificate",
    fieldType: "file",
    placeholder: "Select and Upload your Files Here",
  },
  {
    id: "biz_6",
    name: "contact_number_customer_query",
    label: "Contact Number for (Customer Query)",
    fieldType: "phone",
    placeholder: "Contact Number for (Customer Query)",
  },
  { id: "biz_7", name: "email_customer_id", label: "Email ID for (Customer ID)", fieldType: "text", placeholder: "Email ID for (Customer ID)" },
  {
    id: "biz_8",
    name: "contact_number_business",
    label: "Contact Number for (Business)",
    fieldType: "phone",
    placeholder: "Contact Number for (Business)",
  },
  { id: "biz_9", name: "email_business", label: "Email ID for (Business)", fieldType: "text", placeholder: "Email ID for (Business)" },
];
