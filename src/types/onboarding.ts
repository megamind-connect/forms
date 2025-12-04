// Centralized type definitions for the onboarding form

export type FormDataValues = Record<string, string | number | boolean | null | any>;

export interface FieldConfig {
  id: string;
  name: string;
  label: string;
  fieldType: "text" | "textarea" | "dropdown" | "number";
  options?: Array<{ label: string; value: string }>;
}

export interface QuestionConfig {
  image: string;
  name: string;
  title: string;
  placeholder: string;
}
