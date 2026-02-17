import skillsData from "./data/skills.json";
import type { Skill, SkillCategory } from "./types/skills";

export function setupSkills() {
  const categoryContainers = document.querySelectorAll(".skills-category");
  const skillDetails = document.getElementById("skill-details");

  if (skillDetails) {
    skillDetails.style.visibility = "hidden";
  }

  const updateSkillDetails = (skill: Skill) => {
    if (!skillDetails) return;

    skillDetails.style.visibility = "visible";

    const overview = document.getElementById("skill-overview");
    const description = document.getElementById("skill-description");

    if (overview) {
      const shorthand = skill.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 3);

      const initials =
        shorthand.length > 1
          ? shorthand
          : skill.name.substring(0, 2).toUpperCase();

      overview.innerHTML = `
        <p >${initials}</p>
        <p>${skill.hexNumber}</p>
        <div >${skill.category.split(" ")[0].toUpperCase()}</div>
      `;
    }

    if (description) {
      description.innerHTML = `
        <p>Name: <span>${skill.name}</span></p>
        <p>Category: <span>${skill.category}</span></p>
        <p>${skill.shortDescription}</p>
        <p>Proficiency: <span>${skill.proficiency}</span></p>
      `;
    }
  };

  (skillsData as SkillCategory[]).forEach((categoryData, index) => {
    const container = categoryContainers[index];
    if (!container) return;

    const ul = container.querySelector("ul");
    if (!ul) return;

    ul.innerHTML = "";

    categoryData.skills.forEach((skill) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${skill.name}</span>
        <span>*</span>
      `;

      li.addEventListener("mouseenter", () => {
        updateSkillDetails(skill);
      });

      ul.appendChild(li);
    });
  });

  const skillsContainer = document.querySelector(".skills-category-container");
  if (skillsContainer && skillDetails) {
    skillsContainer.addEventListener("mouseleave", () => {
      skillDetails.style.visibility = "hidden";
    });
  }
}
