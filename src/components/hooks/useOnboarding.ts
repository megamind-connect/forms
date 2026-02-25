import { useState, useEffect } from "react";
import { usePathname, useParams, useSearchParams } from "next/navigation";
import {
  generalFields,
  clientPageGeneralFields,
  financialLegalFields,
  contactFields,
  brandIdentityFields,
  marketAudienceFields,
  projectScopeFields,
  socialPlatformFields,
  socialMediaAccessFields,
  ppcAccessFields,
  ppcSpecificFields,
  websiteAccessFields,
  websiteSpecificFields,
  ppcWebAccessFields,
  assetTypesFields,
  websiteDetailsFields,
  accountDetailsFields,
  businessVerificationFields,
  commonPersonalFields,
} from "@/utils/onboarding";
import toast from "react-hot-toast";
import apiClient from "@/lib/api";

type FormData = Record<string, any>;

const step6Questions = [
  {
    image: "/images/steps/3.png",
    name: "pleasant_surprise",
    title: "Were any deliverables a pleasant surprise?",
    placeholder: "If Yes , we would love to know which ones and what made them stand out for you. ",
  },
  {
    image: "/images/steps/4.png",
    name: "experience_description",
    title: "How would you describe your overall experience with our team?",
    placeholder: "Please specify any areas where we fell short",
  },
  {
    image: "/images/steps/5.png",
    name: "additional_services",
    title: "Are there any additional services or improvements you would like to see in the coming months?",
    placeholder: "If Yes , we would love to know which ones and what made them stand out for you.",
  },
];

export function useOnboarding() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get('type');
  const clientId = params?.id as string;
  const isBrandIdentityPage = pathname.includes("/brand-discovery");
  const isOperationsOnboarding = pathname.includes("/operations/onboarding");
  const isClientOnboarding = pathname.includes("/client/onboarding") && !isBrandIdentityPage;

  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [showSplash, setShowSplash] = useState(true);

  // Parse operations types (e.g., "?type=social,ppc,website")
  const operationsTypes = typeParam ? typeParam.split(',').map(t => t.trim().toLowerCase()) : [];
  const hasSocial = operationsTypes.includes("social");
  const hasPpc = operationsTypes.includes("ppc") || operationsTypes.includes("ppc&web");
  const hasWebsite = operationsTypes.includes("website") || operationsTypes.includes("ppc&web");

  const [generalFormFields] = useState(isClientOnboarding ? generalFields : clientPageGeneralFields);
  const [financialFields] = useState(financialLegalFields);
  const [contactFormFields] = useState(contactFields);
  const [brandIdFields] = useState(brandIdentityFields);
  const [marketFields] = useState(marketAudienceFields);
  const [scopeFields] = useState(projectScopeFields);
  const [socialFields] = useState(isBrandIdentityPage ? socialPlatformFields : []);
  const [socialAccessFields, setSocialAccessFields] = useState(socialMediaAccessFields);

  // Operations Dynamic Steps Configuration
  const [operationsStepsConfig, setOperationsStepsConfig] = useState<any[]>([]);

  useEffect(() => {
    if (isOperationsOnboarding) {
      const steps = [];
      const hasSocial = operationsTypes.includes("social");
      const hasPpc = operationsTypes.includes("ppc") || operationsTypes.includes("ppc&web");
      const hasWebsite = operationsTypes.includes("website") || operationsTypes.includes("ppc&web");

      if (hasSocial) {
        steps.push({
          id: "social",
          title: "Platform User ID & Password",
          fields: socialMediaAccessFields
        });
      }

      if (hasPpc) {
        // If it's JUST PPC (no social), it shows the full ppcAccessFields (which includes social platforms + PPC)
        // Wait, the user said: "if the type=ppc, then i only need the ppc question , no socail questions needs to be shown there"
        // This contradicts ppcAccessFields directly because ppcAccessFields INCLUDES socialMediaAccessFields.
        // Therefore we should ALWAYS use ppcSpecificFields for the "PPC" step to ensure no social questions appear,
        // UNLESS the user expects "type=ppc" to just ask about Google Ads, GA4, GTM, GSC.
        steps.push({
          id: "ppc",
          title: "PPC Service Onboarding Section",
          fields: ppcSpecificFields
        });
      }

      if (hasWebsite) {
        let webFields = websiteSpecificFields;
        if (hasPpc) {
          // If PPC is present, remove GA4, GTM, GSC questions from website to avoid asking twice
          webFields = webFields.filter(f => !["ga4_header", "ga4_invite_toggle", "ga4_invite_desc", "gtm_header", "gtm_invite_toggle", "gtm_invite_desc", "gsc_header", "gsc_invite_toggle", "gsc_invite_desc"].includes(f.name));
        }
        steps.push({
          id: "website",
          title: "Website Service Onboarding Section",
          fields: webFields
        });
      }

      // Fallback if none matches - Removed as per user request to stop at Asset Types when no type is passed
      setOperationsStepsConfig(steps);
      return;
    }

    if (hasPpc && hasWebsite) {
      setSocialAccessFields(ppcWebAccessFields);
    } else if (hasPpc) {
      setSocialAccessFields(ppcAccessFields);
    } else if (hasWebsite) {
      setSocialAccessFields(websiteAccessFields);
    } else {
      setSocialAccessFields(socialMediaAccessFields);
    }
  }, [hasPpc, hasWebsite, isOperationsOnboarding]);
  const [assetFields] = useState(assetTypesFields);
  const [websiteFields] = useState(websiteDetailsFields);
  const [accountFields] = useState(accountDetailsFields);
  const [businessVerificationFields_state] = useState(businessVerificationFields);

  const [formFields] = useState(commonPersonalFields);

  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    company: "",
    phone: "",
    email: "",
  });

  const [touchedStep2, setTouchedStep2] = useState<Record<string, boolean>>({});
  const [touchedStep3, setTouchedStep3] = useState<Record<string, boolean>>({});
  const [touchedStep4, setTouchedStep4] = useState<Record<string, boolean>>({});
  const [touchedStep6, setTouchedStep6] = useState<Record<string, boolean>>({});
  const [touchedStep7, setTouchedStep7] = useState<Record<string, boolean>>({});
  const [touchedStep8, setTouchedStep8] = useState<Record<string, boolean>>({});
  const [touchedStep9, setTouchedStep9] = useState<Record<string, boolean>>({});
  const [touchedStep11, setTouchedStep11] = useState<Record<string, boolean>>({});
  const [touchedStep13, setTouchedStep13] = useState<Record<string, boolean>>({});
  const [touchedStep15, setTouchedStep15] = useState<Record<string, boolean>>({});
  const [touchedStep16, setTouchedStep16] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stepStructure: Record<number, number> = isClientOnboarding
    ? {
      1: 1, 2: 1, 3: 1, 4: 1,
    }
    : isOperationsOnboarding
      ? {
        1: 1, // Intro
        2: 1, // Asset Types
        // Dynamic steps 3 to (3 + ConfigLength - 1)
        ...Array.from({ length: Math.max(0, operationsStepsConfig.length) }).reduce((acc: Record<number, number>, _, idx) => {
          acc[3 + idx] = 1;
          return acc;
        }, {} as Record<number, number>)
      }
      : isBrandIdentityPage
        ? {
          1: 1, // Intro
          2: 1, // Brand Identity & Overview (Step 6 in Onboarding)
          3: 1, // Market, Audience & Positioning (Step 7 in Onboarding)
          4: 1, // Project Scope & Expectations (Step 8 in Onboarding)
          5: 1, // Asset Types (Step 9)
          6: 1, // Social Platforms (Step 11)
        }
        : {
          1: 1,
          2: 1,
          3: 1,
          4: 3,
          5: step6Questions.length,
          6: 1,
        };

  const totalSteps = isClientOnboarding ? 4 : isOperationsOnboarding ? (2 + Math.max(1, operationsStepsConfig.length)) : isBrandIdentityPage ? 6 : 6;

  const validateFieldsHelper = (data: FormData, fields: any[]): Record<string, string> => {
    const errors: Record<string, string> = {};
    let isCurrentHeaderVisible = true;

    fields.forEach((field) => {
      if (field.fieldType === "header") {
        const headerState = data[field.name];
        isCurrentHeaderVisible = field.hasToggle ? (headerState === undefined ? true : headerState) : true;
      }

      if (!isCurrentHeaderVisible && field.fieldType !== "header") return;

      if (field.fieldType === "header" || field.fieldType === "subheader" || field.fieldType === "toggle" || field.fieldType === "file" || field.optional) return;

      if (field.dependsOn !== undefined && !data[field.dependsOn]) return;

      const value = data[field.name];
      if (!value || (typeof value === "string" && !value.trim())) {
        errors[field.name] = "This field is required";
      }

      // Email validation
      if (field.fieldType === "email" && value && typeof value === "string") {
        // Validation for standard email format (e.g., user@example.com)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          errors[field.name] = "Please enter a valid email address (e.g., example@gmail.com)";
        }
      }

      // Handle 'Others' validation for radio/radio_stacked
      if (typeof value === 'object' && value !== null && value.selected === 'others') {
        if (!value.otherText || !value.otherText.trim()) {
          errors[field.name] = `Please specify your ${field.label.toLowerCase()}`;
        }
      }

      // Handle 'Other' validation for dropdowns ( specifically legal_structure for now )
      if (field.name === 'legal_structure' && value === 'other') {
        if (!formData[`${field.name}_other`] || !formData[`${field.name}_other`].trim()) {
          errors[`${field.name}_other`] = `Please specify your ${field.label.toLowerCase()}`;
          // Also mark the main field as error if needed, or just relying on the specific field error
          // errors[field.name] = "Required"; 
        }
      }
    });
    return errors;
  };

  const validateStep2Fields = (data: FormData) => {
    return validateFieldsHelper(data, generalFormFields);
  };
  const validateStep3Fields = (data: FormData) => validateFieldsHelper(data, financialFields);
  const validateStep4Fields = (data: FormData) => validateFieldsHelper(data, contactFormFields);

  // Brand Discovery Validations
  const validateStep6Fields = (data: FormData) => validateFieldsHelper(data, brandIdFields);
  const validateStep7Fields = (data: FormData) => validateFieldsHelper(data, marketFields);
  const validateStep8Fields = (data: FormData) => validateFieldsHelper(data, scopeFields);
  const validateStep9Fields = (data: FormData) => {
    const errors: Record<string, string> = {};
    assetFields.forEach((field) => {
      if (field.fieldType === "toggle_input") {
        const fieldValue = data[field.name] || { enabled: false, value: "" };
        if (fieldValue.enabled && (!fieldValue.value || !fieldValue.value.trim())) {
          errors[field.name] = "Please provide a link or details";
        }
      }
    });
    return errors;
  };
  const validateStep11Fields = (data: FormData, customFields?: any[]) => {
    const errors: Record<string, string> = {};
    const platforms = [
      { prefix: "meta", label: "Facebook Page", emailField: "meta_email", passwordField: "meta_password" },
      { prefix: "bm", label: "Meta Business Manager", emailField: "bm_email", passwordField: "bm_password" },
      { prefix: "linkedin", label: "LinkedIn Page", emailField: "linkedin_email", passwordField: "linkedin_password" },
      { prefix: "yt", label: "YouTube Channel", emailField: "youtube_email", passwordField: "youtube_password" },
      { prefix: "gmb", label: "Google My Business", emailField: "google_business_email", passwordField: "google_business_password" },
    ];

    if (hasPpc) {
      platforms.push({ prefix: "google_ads", label: "Google Ads", emailField: "google_ads_email", passwordField: "google_ads_password" });
    }

    // Check if instagram header exists in this set of fields before validating
    const fieldsToValidate = customFields || socialAccessFields;
    const hasInstagram = fieldsToValidate.some(f => f.name === "instagram_header");
    const isInstagramEnabled = data.instagram_header === undefined ? true : data.instagram_header;

    if (hasInstagram && isInstagramEnabled) {
      if (!data.instagram_email || !data.instagram_email.trim()) {
        errors.instagram_header = "Instagram User ID is required";
      }
      if (!data.instagram_password || !data.instagram_password.trim()) {
        errors.instagram_header = "Instagram Password is required";
      }
    }

    platforms.forEach(({ prefix, label, emailField, passwordField }) => {
      const hasPrefixHeader = fieldsToValidate.some(f => f.name === `${prefix}_header` || (prefix === 'yt' && f.name === 'youtube_header') || (prefix === 'gmb' && f.name === 'google_business_header') || (prefix === 'meta' && f.name === 'meta_header') || (prefix === 'bm' && f.name === 'bm_header') || (prefix === 'linkedin' && f.name === 'linkedin_header'));

      // If we are passing custom fields, and the field is not in the array, do not validate.
      // But we have to be loose with matching because the array might contain just specific names.
      // Actually simpler logic: We only validate it if either CustomFields is undefined (default behaviour)
      // OR if the invite_toggle or access_toggle field exists in CustomFields
      const fieldExists = !customFields || customFields.some(f => f.name === `${prefix}_access_toggle` || f.name === `${prefix}_invite_toggle`);
      const isHeaderEnabled = data[`${prefix}_header`] === undefined ? true : data[`${prefix}_header`];

      if (fieldExists && isHeaderEnabled) {
        const accessToggle = data[`${prefix}_access_toggle`];
        const inviteToggle = data[`${prefix}_invite_toggle`];

        if (!accessToggle && !inviteToggle) {
          errors[`${prefix}_header`] = `Please select an option to provide access for ${label}`;
        }

        if (accessToggle) {
          if (!data[emailField] || !data[emailField].trim()) {
            errors[emailField] = `${label} User ID is required`;
          }
          if (!data[passwordField] || !data[passwordField].trim()) {
            errors[passwordField] = `${label} Password is required`;
          }
        }
      }
    });

    if (hasPpc || hasWebsite) {
      const inviteOnlyPlatforms = [
        { prefix: "ga4", label: "Google Analytics (GA4)" },
        { prefix: "gtm", label: "Google Tag Manager" },
        { prefix: "gsc", label: "Google Search Console" },
      ];
      inviteOnlyPlatforms.forEach(({ prefix, label }) => {
        const inviteExists = !customFields || customFields.some(f => f.name === `${prefix}_invite_toggle`);
        const isHeaderEnabled = data[`${prefix}_header`] === undefined ? true : data[`${prefix}_header`];

        if (inviteExists && isHeaderEnabled) {
          const inviteToggle = data[`${prefix}_invite_toggle`];
          if (!inviteToggle) {
            errors[`${prefix}_header`] = `Please acknowledge the invite step for ${label}`;
          }
        }
      });
    }

    // Dynamic fields validation (for simple texts and toggles required)
    if (customFields) {
      let isCurrentHeaderVisible = true;

      customFields.forEach(field => {
        if (field.fieldType === "header") {
          const headerState = data[field.name];
          isCurrentHeaderVisible = field.hasToggle ? (headerState === undefined ? true : headerState) : true;
        }

        if (!isCurrentHeaderVisible && field.fieldType !== "header") return;

        if (field.fieldType === "toggle_input") {
          const fieldValue = data[field.name];
          if (fieldValue && fieldValue.enabled && (!fieldValue.value || !fieldValue.value.trim())) {
            errors[field.name] = "Please provide details";
          }
        }
        else if (field.fieldType === "textarea" && field.name.startsWith("web_") && field.name !== "web_11" && field.name !== "web_7" && field.name !== "web_6" && field.name !== "web_5" && field.name !== "web_4" && field.name !== "hosting_server_details" && field.name !== "source_code_storage" && field.name !== "current_website_management" && field.name !== "form_data_storage" && field.name !== "third_party_tools_integration") {
          // Basic non-empty textareas, we usually do not mark them rigidly required but let's be loose if needed.
          // Leaving out as strict require because user didn't specify strict validation for everything in Website.
        }
      });
    }

    return errors;
  };
  const validateStep13Fields = (data: FormData) => ({});
  const validateStep15Fields = (data: FormData) => ({});
  const validateStep16Fields = (data: FormData) => ({});

  const validateCurrentStep = () => {
    if (isBrandIdentityPage) {
      let errors = {};
      if (step === 2) errors = validateStep6Fields(formData);
      if (step === 3) errors = validateStep7Fields(formData);
      if (step === 4) errors = validateStep8Fields(formData);
      if (step === 5) errors = validateStep9Fields(formData);
      if (step === 6) errors = validateStep11Fields(formData);

      if (Object.keys(errors).length > 0) {
        // Mark fields as touched to show errors
        if (step === 2) setTouchedStep6(brandIdFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {}));
        if (step === 3) setTouchedStep7(marketFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {}));
        if (step === 4) setTouchedStep8(scopeFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {}));
        if (step === 5) setTouchedStep9(assetFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {}));
        if (step === 6) setTouchedStep11([...socialFields, ...socialAccessFields].reduce((acc, f) => ({ ...acc, [f.name]: true }), {}));
        return false;
      }
    }
    if (isOperationsOnboarding) {
      let errors = {};
      if (step === 2) errors = validateStep9Fields(formData);

      if (step > 2) {
        const configIndex = step - 3; // 3 corresponds to index 0
        if (configIndex >= 0 && configIndex < operationsStepsConfig.length) {
          errors = validateStep11Fields(formData, operationsStepsConfig[configIndex].fields);
        }
      }

      if (Object.keys(errors).length > 0) {
        if (step === 2) setTouchedStep9(assetFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {}));
        if (step > 2) {
          const configIndex = step - 3;
          if (configIndex >= 0 && configIndex < operationsStepsConfig.length) {
            setTouchedStep11([...socialFields, ...operationsStepsConfig[configIndex].fields].reduce((acc, f) => ({ ...acc, [f.name]: true }), {}));
          }
        }
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      toast.error("Please complete all required fields.");
      return;
    }
    if (isClientOnboarding) {
      if (step === 4) {
        /* submit handled later */
      }
    } else if (isOperationsOnboarding) {
      if (step === totalSteps) {
        /* submit handled later */
      }
    } else if (isBrandIdentityPage) {
      if (step === 6) {
        /* submit handled later */
      }
    } else {
      if (step === 4 && subStep < 3) {
        setSubStep((prev) => prev + 1);
        return;
      }
      if (step === 5 && subStep < step6Questions.length) {
        setSubStep((prev) => prev + 1);
        return;
      }
    }

    if (step === totalSteps) {
      let payload: any = {
        ...formData,
        client_id: clientId,
      };

      if (isClientOnboarding) {
        payload = {
          clientId: clientId,
          brandName: formData.brand_name,
          legalName: formData.registered_legal_name,
          legalStructure: formData.legal_structure === 'other' ? formData.legal_structure_other : formData.legal_structure,
          industryCategory: formData.industry_category === 'other' ? formData.industry_category_other : formData.industry_category,
          gstin: formData.gstin,
          registeredBusinessAddress: formData.registered_business_address,
          officialBillingAddress: formData.official_billing_address,
          businessEmail: formData.business_email_id,
          landlineNumbers: Array.isArray(formData.business_landline_numbers) ? formData.business_landline_numbers : [],
          mobileNumbers: Array.isArray(formData.business_mobile_numbers) ? formData.business_mobile_numbers : [],
          whatsappBusiness: formData.whatsapp_business_number,
          whatsappApiLink: formData.whatsapp_business_link,
          websiteUrl: formData.website_url,
          yearOfEstablishment: formData.year_of_establishment,
          companyPan: formData.company_pan_number,
          companyTan: formData.company_tan_number,
          companyRegNumber: formData.company_registration_number,

          // --- Client Feedback Parameters ---
          name: formData.full_name,
          position_role: typeof formData.role_in_organisation === 'object' && formData.role_in_organisation !== null
            ? (formData.role_in_organisation.selected === 'others' ? formData.role_in_organisation.otherText : formData.role_in_organisation.selected)
            : formData.role_in_organisation,
          overall_experience: formData.overall_experience_rating,
          impact_assessment: formData.service_impact_rating,
          quality_of_services: formData.service_quality_rating,
          delivery_time: formData.delivery_time_option,
          brand_strategy_alignment: formData.strategy_alignment_rating,
          services_provided: formData.services_provided?.list || [],
          other_service_description: formData.services_provided?.other_service_description,
          services_align_with_goals: formData.goal_alignment_rating,
          meet_deadlines_rating: formData.deadline_efficiency_rating,
          feedback_understood_rating: formData.feedback_understanding_rating,
          digital_marketing_results: formData.marketing_results_rating,
          content_creation_rating: formData.brand_representation_rating,
          surprised_deliverables: formData.pleasant_surprise,
          team_responsiveness: formData.responsiveness_rating,
          working_relationship_description: formData.experience_description,
          additional_services_improvements: formData.additional_services,
          likelihood_to_continue: formData.service_continuation_rating,
          likelihood_to_recommend: formData.recommendation_likelihood_rating,
          other_comments: formData.final_feedback_text,

          onboardingFiles: {
            certificate_of_incorporation: formData.certificate_of_incorporation,
            gst_registration_certificate: formData.gst_registration_certificate,
            pan_card: formData.pan_card,
            signed_contract_agreement: formData.signed_contract_agreement,
            signed_nda: formData.signed_nda
          },
          contactInfo: {
            primary: {
              name: formData.primary_contact_name,
              email: formData.primary_contact_email,
              phone: formData.primary_contact_phone
            },
            alternate: {
              name: formData.alternate_contact_name,
              email: formData.alternate_contact_email,
              phone: formData.alternate_contact_phone
            },
            finance: {
              name: formData.finance_contact_name,
              email: formData.finance_contact_email,
              phone: formData.finance_contact_phone
            }
          },
          websiteTechDetails: {
            hasDomain: formData.has_domain?.enabled || false,
            domainName: formData.has_domain?.value || '',
            hasCmsPlatform: formData.has_cms_platform?.enabled || false,
            cmsPlatformName: formData.has_cms_platform?.value || '',
            hasThirdPartyPlatform: formData.has_third_party_platform?.enabled || false,
            thirdPartyPlatformName: formData.has_third_party_platform?.value || '',
            formDataStorage: formData.form_data_storage,
            hostingServerDetails: formData.hosting_server_details,
            sourceCodeStorage: formData.source_code_storage,
            currentWebsiteManagement: formData.current_website_management,
            googleAnalyticsGa4: formData.google_analytics_ga4,
            googleTagManager: formData.google_tag_manager,
            googleSearchConsole: formData.google_search_console,
            thirdPartyToolsIntegration: formData.third_party_tools_integration
          },
          verificationFiles: {
            certificate_of_incorporation: formData.certificate_of_incorporation,
            pan_card_company: formData.pan_card_company,
            pan_card_proprietor: formData.pan_card_proprietor,
            driving_license_proprietor: formData.driving_license_proprietor,
            gst_registration_certificate: formData.gst_registration_certificate
          },
          customerContact: {
            contact_number_customer_query: formData.contact_number_customer_query,
            email_customer_id: formData.email_customer_id,
            contact_number_business: formData.contact_number_business,
            email_business: formData.email_business
          }
        };
      } else if (!isBrandIdentityPage) {
        payload = {
          ...payload,
          name: formData.full_name,
          position_role: typeof formData.role_in_organisation === 'object' && formData.role_in_organisation !== null
            ? (formData.role_in_organisation.selected === 'others' ? formData.role_in_organisation.otherText : formData.role_in_organisation.selected)
            : formData.role_in_organisation,
          overall_experience: formData.overall_experience_rating,
          impact_assessment: formData.service_impact_rating,
          quality_of_services: formData.service_quality_rating,
          delivery_time: formData.delivery_time_option,
          brand_strategy_alignment: formData.strategy_alignment_rating,
          services_provided: formData.services_provided?.list || [],
          other_service_description: formData.services_provided?.other_service_description,
          services_align_with_goals: formData.goal_alignment_rating,
          meet_deadlines_rating: formData.deadline_efficiency_rating,
          feedback_understood_rating: formData.feedback_understanding_rating,
          digital_marketing_results: formData.marketing_results_rating,
          content_creation_rating: formData.brand_representation_rating,
          surprised_deliverables: formData.pleasant_surprise,
          team_responsiveness: formData.responsiveness_rating,
          working_relationship_description: formData.experience_description,
          additional_services_improvements: formData.additional_services,
          likelihood_to_continue: formData.service_continuation_rating,
          likelihood_to_recommend: formData.recommendation_likelihood_rating,
          other_comments: formData.final_feedback_text,
        };
      } else if (isBrandIdentityPage) {
        payload = {
          clientId: clientId,
          foundingVision: formData.founding_vision,
          brandInspiration: formData.inspiration_origin,
          coreValues: formData.brand_core_values,
          whatBrandDoes: formData.brand_description,
          brandStrengths: formData.brand_strengths_weaknesses,
          brandWeaknesses: formData.brand_strengths_weaknesses,
          primaryGoals: formData.primary_goals,
          uniqueValueProposition: formData.unique_value_proposition,
          threeYearVision: formData.brand_vision_3_years,
          newProductsServices: formData.new_products_launch,
          expansionPlans: formData.expansion_plans,
          idealCustomer: formData.ideal_customer_profile,
          topCompetitors: formData.top_competitors,
          currentChallenges: formData.current_market_challenges,
          marketOpportunities: formData.market_opportunities,
          brandDifferentiation: formData.competitor_differentiation,
          competitorChallenges: formData.competitor_challenges,
          marketGaps: formData.market_gaps,
          admiredBrands: formData.admired_brands,
          expectationsFromAgency: formData.expectations_creative_partner,
          previousAgencyExperience: formData.previous_agency_experience,
          specificThemesIdeas: formData.specific_themes_ideas,
          mandatoryElements: formData.mandatory_branding_elements,
          assetTypes: {
            brand_logo_files: formData.brand_logo_files,
            brand_guidelines: formData.brand_guidelines,
            brochures_product_photos: formData.brochures_product_photos,
            past_campaign_reports: formData.past_campaign_reports,
            moodboards_videos: formData.moodboards_videos,
            current_image_assets: formData.current_image_assets,
            current_video_assets: formData.current_video_assets
          },
          socialAccounts: {
            instagram: formData.instagram_profile_url,
            facebook: formData.facebook_page_url,
            linkedin: formData.linkedin_profile_url,
            twitter: formData.twitter_profile_url,
            youtube: formData.youtube_channel_url,
            google_my_business: formData.google_business_url,
            website: formData.website_url_social,
            additional: formData.additional_platforms
          }
        };
      } else if (isOperationsOnboarding) {
        payload = {
          clientId: clientId,
          assetTypes: {
            brand_logo_files: formData.brand_logo_files,
            brand_guidelines: formData.brand_guidelines,
            brochures_product_photos: formData.brochures_product_photos,
            past_campaign_reports: formData.past_campaign_reports,
            moodboards_videos: formData.moodboards_videos,
            current_image_assets: formData.current_image_assets,
            current_video_assets: formData.current_video_assets
          },
          socialAccounts: {
            instagram: formData.instagram_profile_url,
            facebook: formData.facebook_page_url,
            linkedin: formData.linkedin_profile_url,
            twitter: formData.twitter_profile_url,
            youtube: formData.youtube_channel_url,
            google_my_business: formData.google_business_url,
            website: formData.website_url_social,
            additional: formData.additional_platforms
          },
          platformAccess: {
            instagram: { email: formData.instagram_email, password: formData.instagram_password },
            meta: { email: formData.meta_email, password: formData.meta_password },
            meta_business_manager: { email: formData.bm_email, password: formData.bm_password },
            linkedin: { email: formData.linkedin_email, password: formData.linkedin_password },
            twitter: { email: formData.twitter_email, password: formData.twitter_password },
            youtube: { email: formData.youtube_email, password: formData.youtube_password },
            google_my_business: { email: formData.google_business_email, password: formData.google_business_password },
            google_ads: { email: formData.google_ads_email, password: formData.google_ads_password },
            google_analytics: { email: formData.google_analytics_email, password: formData.google_analytics_password },
            google_tag_manager: { email: formData.google_tag_manager_email, password: formData.google_tag_manager_password },
            google_search_console: { email: formData.google_search_console_email, password: formData.google_search_console_password }
          },
          websiteTechDetails: {
            hasDomain: formData.has_domain?.enabled || false,
            domainName: formData.has_domain?.value || '',
            hasCmsPlatform: formData.has_cms_platform?.enabled || false,
            cmsPlatformName: formData.has_cms_platform?.value || '',
            hasThirdPartyPlatform: formData.has_third_party_platform?.enabled || false,
            thirdPartyPlatformName: formData.has_third_party_platform?.value || '',
            formDataStorage: formData.form_data_storage,
            hostingServerDetails: formData.hosting_server_details,
            sourceCodeStorage: formData.source_code_storage,
            currentWebsiteManagement: formData.current_website_management,
            googleAnalyticsGa4: formData.ga4_invite_toggle,
            googleTagManager: formData.gtm_invite_toggle,
            googleSearchConsole: formData.gsc_invite_toggle,
            thirdPartyToolsIntegration: formData.third_party_tools_integration
          }
        };
      }

      const isFeedback = !isClientOnboarding && !isBrandIdentityPage && !isOperationsOnboarding;
      const finalPayload = isFeedback ? payload : { data: payload };

      const endpoint = isBrandIdentityPage
        ? `/api/v1/client/onboarding/${clientId}/brand-assets`
        : isClientOnboarding
          ? `/api/v1/client/onboarding/${clientId}`
          : isOperationsOnboarding
            ? `/api/v1/operations/onboarding/${clientId}`
            : "/api/v1/client-feedback";

      console.log("Dataaaa", finalPayload);
      try {
        await apiClient.post(endpoint, payload);
        toast.success("Thank you! Your information has been submitted.");
        setStep(1);
        setFormData({});
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong. Please try again.");
      }
      return;
    }
    setStep((prev) => prev + 1);
    setSubStep(1);
  };

  const handleStepClick = (target: number) => {
    if (target < step || validateCurrentStep()) {
      setStep(target);
      setSubStep(1);
    }
  };

  const getStepProgress = (num: number) => {
    if (num < step) return 100;
    if (num > step) return 0;
    if (!isClientOnboarding && !isBrandIdentityPage && !isOperationsOnboarding) {
      if (num === 4) return ((subStep - 1) / 3) * 100;
      if (num === 5) return ((subStep - 1) / step6Questions.length) * 100;
    }
    return 100;
  };

  const updateFormData = (updates: FormData) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return {
    step,
    subStep,
    showSplash,
    formFields,
    generalFormFields,
    financialFields,
    contactFormFields,
    formData,
    step6Questions,
    stepStructure,
    touchedStep2,
    touchedStep3,
    touchedStep4,
    touchedStep6,
    touchedStep7,
    touchedStep8,
    touchedStep9,
    touchedStep11,
    touchedStep13,
    touchedStep15,
    touchedStep16,
    handleNext,
    handleStepClick,
    getStepProgress,
    updateFormData,
    validateCurrentStep,
    validateStep2Fields,
    validateStep3Fields,
    validateStep4Fields,
    validateStep6Fields,
    validateStep7Fields,
    validateStep8Fields,
    validateStep9Fields,
    validateStep11Fields,
    validateOperationsDynamicStep: (data: FormData, fields: any[]) => validateStep11Fields(data, fields),
    validateStep13Fields,
    validateStep15Fields,
    validateStep16Fields,
    markStep2FieldTouched: (name: string) => setTouchedStep2((prev) => ({ ...prev, [name]: true })),
    markStep3FieldTouched: (name: string) => setTouchedStep3((prev) => ({ ...prev, [name]: true })),
    markStep4FieldTouched: (name: string) => setTouchedStep4((prev) => ({ ...prev, [name]: true })),
    markStep6FieldTouched: (name: string) => setTouchedStep6((prev) => ({ ...prev, [name]: true })),
    markStep7FieldTouched: (name: string) => setTouchedStep7((prev) => ({ ...prev, [name]: true })),
    markStep8FieldTouched: (name: string) => setTouchedStep8((prev) => ({ ...prev, [name]: true })),
    markStep9FieldTouched: (name: string) => setTouchedStep9((prev) => ({ ...prev, [name]: true })),
    markStep11FieldTouched: (name: string) => setTouchedStep11((prev) => ({ ...prev, [name]: true })),
    markStep13FieldTouched: (name: string) => setTouchedStep13((prev) => ({ ...prev, [name]: true })),
    markStep15FieldTouched: (name: string) => setTouchedStep15((prev) => ({ ...prev, [name]: true })),
    markStep16FieldTouched: (name: string) => setTouchedStep16((prev) => ({ ...prev, [name]: true })),
    markAllStep2FieldsTouched: () => setTouchedStep2(generalFormFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep3FieldsTouched: () => setTouchedStep3(financialFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep4FieldsTouched: () => setTouchedStep4(contactFormFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep6FieldsTouched: () => setTouchedStep6(brandIdFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep7FieldsTouched: () => setTouchedStep7(marketFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep8FieldsTouched: () => setTouchedStep8(scopeFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep9FieldsTouched: () => setTouchedStep9(assetFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep11FieldsTouched: () => setTouchedStep11([...socialFields, ...socialAccessFields].reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep13FieldsTouched: () => setTouchedStep13(websiteFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep15FieldsTouched: () => setTouchedStep15(accountFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    markAllStep16FieldsTouched: () => setTouchedStep16(businessVerificationFields_state.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})),
    brandIdFields,
    marketFields,
    scopeFields,
    socialFields,
    socialAccessFields,
    assetFields,
    websiteFields,
    accountFields,
    businessVerificationFields: businessVerificationFields_state,
    operationsStepsConfig,
  };
}
