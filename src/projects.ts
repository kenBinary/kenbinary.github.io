import projectsData from "./data/projects.json";
import type { Project } from "./types/projects";

export function setupProjects() {
  const projectList = document.querySelector("#project-nav ul");
  const projectContent = document.getElementById("project-content");

  if (!projectList || !projectContent) return;

  const updateProjectContent = (project: Project) => {
    const hash = projectContent.querySelector(".project-hash");
    const author = projectContent.querySelector(".project-author");
    const date = projectContent.querySelector(".project-date");
    const title = projectContent.querySelector(".project-title");
    const description = projectContent.querySelector(".project-details p");
    const imageContainer = projectContent.querySelector(
      ".project-image-container",
    );
    const techList = projectContent.querySelector(".project-meta ul");
    const actions = projectContent.querySelector(".meta-actions");

    if (hash) hash.textContent = project.projectHash;
    if (author) author.textContent = project.author;
    if (date) date.textContent = project.date;
    if (title) title.textContent = project.name;
    if (description) description.textContent = project.description;

    // TODO: fix when image is mobile
    if (imageContainer) {
      const isVideo =
        project.imageUrl.endsWith(".webm") || project.imageUrl.endsWith(".mp4");

      if (isVideo) {
        imageContainer.innerHTML = `<video src="${project.imageUrl}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>`;
      } else {
        imageContainer.innerHTML = `<img src="${project.imageUrl}" alt="${project.name}" style="width: 100%; height: 100%; object-fit: cover;" />`;
      }
    }

    if (techList) {
      techList.innerHTML = project.technologies
        .map((tech) => `<li>${tech}</li>`)
        .join("");
    }

    if (actions) {
      const githubLink = actions.querySelector(
        "a:nth-child(1)",
      ) as HTMLAnchorElement;
      const demoLink = actions.querySelector(
        "a:nth-child(2)",
      ) as HTMLAnchorElement;

      if (githubLink) {
        if (project.github) {
          githubLink.href = project.github;
          githubLink.style.display = "block";
        } else {
          githubLink.style.display = "none";
        }
      }

      if (demoLink) {
        if (project.demo) {
          demoLink.href = project.demo;
          demoLink.style.display = "block";
        } else {
          demoLink.style.display = "none";
        }
      }
    }
  };

  projectList.innerHTML = "";

  projectsData.forEach((project: Project) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.addEventListener("click", () => {
      updateProjectContent(project);

      projectList.querySelectorAll("li").forEach((item) => {
        item.style.color = "";
        item.style.backgroundColor = "";
      });
      li.style.color = "var(--nord7)";
      li.style.backgroundColor = "var(--nord3)";
    });
    projectList.appendChild(li);
  });

  if (projectsData.length > 0) {
    const firstProject = projectsData[0] as Project;
    updateProjectContent(firstProject);

    const firstLi = projectList.querySelector("li");
    if (firstLi) {
      firstLi.style.color = "var(--nord7)";
      firstLi.style.backgroundColor = "var(--nord3)";
    }
  }
}
