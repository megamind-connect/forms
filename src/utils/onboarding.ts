 export const commonPersonalFields = [
    
    { id: "1", name: "name", label: "Name", fieldType: "text" },
    { id: "4", name: "brand_name", label: "Brand Name", fieldType: "text" },
 
    {
      id: "15",
      name: "role_in_organisation",
      label: "Role in the Organisation",
      fieldType: "dropdown",
      options: [
        { label: "Owner", value: "owner" },
        { label: "Manager", value: "manager" },

      ],
    },
    
  ];





    
    export  const step3ExtraFieldList = [
        { id: "41", name: "free_time_activities", label: "How do you spend your free time?", fieldType: "textarea" },
        { id: "42", name: "hobbies", label: "What are your hobbies?", fieldType: "textarea" },
        { id: "43", name: "favourite_color", label: "Your favourite colour?", fieldType: "textarea" },
        { id: "44", name: "favourite_food", label: "Favourite food?", fieldType: "textarea" },
      ];