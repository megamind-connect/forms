import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
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
  const clientId = params?.id as string;
  const isBrandIdentityPage = pathname.includes("/brand-discovery");
  const isClientOnboarding = pathname.includes("/client/onboarding") && !isBrandIdentityPage;

  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [showSplash, setShowSplash] = useState(true);

  // Cleaned up form fields usage
  const [generalFormFields] = useState(isClientOnboarding ? generalFields : clientPageGeneralFields);
  const [financialFields] = useState(financialLegalFields);
  const [contactFormFields] = useState(contactFields);
  const [brandIdFields] = useState(brandIdentityFields);
  const [marketFields] = useState(marketAudienceFields);
  const [scopeFields] = useState(projectScopeFields);
  const [socialFields] = useState(socialPlatformFields);
  const [socialAccessFields] = useState(socialMediaAccessFields);
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
      1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1,
    }
    : isBrandIdentityPage
      ? {
        1: 1, // Intro
        2: 1, // Brand Identity & Overview (Step 6 in Onboarding)
        3: 1, // Market, Audience & Positioning (Step 7 in Onboarding)
        4: 1, // Project Scope & Expectations (Step 8 in Onboarding)
      }
      : {
        1: 1,
        2: 1,
        3: 1,
        4: 3,
        5: step6Questions.length,
        6: 1,
      };

  const totalSteps = isClientOnboarding ? 12 : isBrandIdentityPage ? 4 : 6;

  const validateFieldsHelper = (data: FormData, fields: any[]): Record<string, string> => {
    // Making all fields optional as per request
    return {};
  };

  const validateStep2Fields = (data: FormData) => {
    return {};
  };
  const validateStep3Fields = (data: FormData) => ({});
  const validateStep4Fields = (data: FormData) => ({});
  const validateStep6Fields = (data: FormData) => ({});
  const validateStep7Fields = (data: FormData) => ({});
  const validateStep8Fields = (data: FormData) => ({});
  const validateStep9Fields = (data: FormData) => ({});
  const validateStep11Fields = (data: FormData) => ({});
  const validateStep13Fields = (data: FormData) => ({});
  const validateStep15Fields = (data: FormData) => ({});
  const validateStep16Fields = (data: FormData) => ({});

  const validateCurrentStep = () => {
    return true;
  };


  const handleNext = async () => {
    if (!validateCurrentStep()) {
      toast.error("Please complete all required fields.");
      return;
    }
    if (isClientOnboarding) {
      if (step === 16) {
        /* submit handled later */
      }
    } else if (isBrandIdentityPage) {
      if (step === 4) {
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
          industryCategory: formData.industry_category,
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
            meta: { email: formData.meta_email, password: formData.meta_password },
            linkedin: { email: formData.linkedin_email, password: formData.linkedin_password },
            twitter: { email: formData.twitter_email, password: formData.twitter_password },
            youtube: { email: formData.youtube_email, password: formData.youtube_password },
            google_ads: { email: formData.google_ads_email, password: formData.google_ads_password },
            google_analytics: { email: formData.google_analytics_email, password: formData.google_analytics_password },
            google_tag_manager: { email: formData.google_tag_manager_email, password: formData.google_tag_manager_password },
            google_search_console: { email: formData.google_search_console_email, password: formData.google_search_console_password }
          },
          websiteTechDetails: {
            hasDomain: formData.has_domain,
            hasCmsPlatform: formData.has_cms_platform,
            hasThirdPartyPlatform: formData.has_third_party_platform,
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
          position_role: formData.role_in_organisation,
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
          mandatoryElements: formData.mandatory_branding_elements
        };
      }

      const endpoint = isBrandIdentityPage 
        ? "/api/v1/clients/brand-questionnaire"
        : isClientOnboarding 
          ? "/api/v1/clients/details" 
          : "/api/v1/client-feedback";

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
    if (!isClientOnboarding && !isBrandIdentityPage) {
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
  };
}
