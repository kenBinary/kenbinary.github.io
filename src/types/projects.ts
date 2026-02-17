export type Project = {
  id: string;
  projectHash: string;
  author: string;
  date: string;
  name: string;
  isMobileImage: boolean;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
  imageUrl: string;
};
