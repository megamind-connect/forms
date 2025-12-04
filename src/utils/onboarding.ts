 export const commonPersonalFields = [
    
    { id: "1", name: "name", label: "Name", fieldType: "text" },
    { id: "4", name: "organisation_name", label: "Organisation Name", fieldType: "text" },
 
    {
      id: "15",
      name: "role_in_organisation",
      label: "Role in the Organisation",
      fieldType: "dropdown",
      options:[
  { label: "Managing Director", value: "managing_director" },
  { label: "Marketing Director", value: "marketing_director" },
  { label: "CEO / Founder", value: "ceo_founder" },
  { label: "CMO / Head of Marketing", value: "cmo_head_marketing" },
  { label: "Marketing Manager", value: "marketing_manager" },
  { label: "Marketing POC / Coordinator", value: "marketing_coordinator" },
  { label: "Brand Manager", value: "brand_manager" },
  { label: "PR Head", value: "pr_head" },
]

    },
    
  ];





    
    export  const step3ExtraFieldList = [
        { id: "41", name: "free_time_activities", label: "How do you spend your free time?", fieldType: "textarea" },
        { id: "42", name: "hobbies", label: "What are your hobbies?", fieldType: "textarea" },
        { id: "43", name: "favourite_color", label: "Your favourite colour?", fieldType: "textarea" },
        { id: "44", name: "favourite_food", label: "Favourite food?", fieldType: "textarea" },
      ];