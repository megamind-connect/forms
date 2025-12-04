 export const commonPersonalFields = [
    
    { id: "1", name: "name", label: "Name", fieldType: "text" },
    { id: "4", name: "brand_name", label: "Brand Name", fieldType: "text" },
 
    {
      id: "15",
      name: "gender",
      label: "Gender",
      fieldType: "dropdown",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
        { label: "Prefer not to say", value: "prefer_not_to_say" },
      ],
    },
    
  ];





    
    export  const step3ExtraFieldList = [
        { id: "41", name: "free_time_activities", label: "How do you spend your free time?", fieldType: "textarea" },
        { id: "42", name: "hobbies", label: "What are your hobbies?", fieldType: "textarea" },
        { id: "43", name: "favourite_color", label: "Your favourite colour?", fieldType: "textarea" },
        { id: "44", name: "favourite_food", label: "Favourite food?", fieldType: "textarea" },
      ];