export const NavigationOptionIds = {
  Home: "home-nav",
  Projects: "project-nav",
  ProjectsMobile: "project-nav-mobile",
  Skills: "skills-nav",
  Contact: "contact-nav",
} as const;

export type NavigationOptionId =
  (typeof NavigationOptionIds)[keyof typeof NavigationOptionIds];

export const NavigationOptionContentIds = {
  [NavigationOptionIds.Home]: "home-content",
  [NavigationOptionIds.Projects]: "project-content",
  [NavigationOptionIds.ProjectsMobile]: "project-content",
  [NavigationOptionIds.Skills]: "skills-content",
  [NavigationOptionIds.Contact]: "contact-content",
} as const;
