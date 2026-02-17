export type SkillCategoryType =
  | "Languages"
  | "Frameworks & Libraries"
  | "Databases"
  | "Tools & Others";

export type SkillProficiency =
  | "Comfortable With"
  | "Building & Growing"
  | "Expanding Skills";

export type Skill = {
  name: string;
  hexNumber: string;
  category: SkillCategoryType;
  shortDescription: string;
  proficiency: SkillProficiency;
};

export type SkillCategory = {
  category: SkillCategoryType;
  skills: Skill[];
};
