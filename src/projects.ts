import projectsData from "./data/projects.json";
import type { Project } from "./types/projects";

const projectMediaModules = import.meta.glob(
  "./assets/project-demos/*.{avif,gif,jpg,jpeg,png,webp,mp4,webm}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

function resolveProjectMediaUrl(imageUrl: string): string {
  const normalized = imageUrl.replace(/\\/g, "/");
  const fileName = normalized.split("/").pop();

  if (!fileName) return imageUrl;

  const matched = Object.entries(projectMediaModules).find(([modulePath]) =>
    modulePath.endsWith(`/${fileName}`),
  );

  return matched?.[1] ?? imageUrl;
}

export function setupProjects() {
  const projectList = document.querySelector("#project-nav ul");
  const projectListMobile = document.querySelector("#project-nav-mobile ul");
  const projectContent = document.getElementById("project-content");

  if (!projectList || !projectContent || !projectListMobile) return;

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

    if (imageContainer) {
      const mediaUrl = resolveProjectMediaUrl(project.imageUrl);
      const isVideo = mediaUrl.endsWith(".webm") || mediaUrl.endsWith(".mp4");
      const isMobileImage = project.isMobileImage;

      imageContainer.classList.toggle(
        "project-image-container-mobile",
        isMobileImage,
      );

      if (isVideo) {
        imageContainer.innerHTML = `<video src="${mediaUrl}" autoplay loop muted playsinline></video>`;
      } else {
        imageContainer.innerHTML = `<img src="${mediaUrl}" alt="${project.name}" />`;
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
  projectListMobile.innerHTML = "";

  projectsData.forEach((project: Project) => {
    const createListItem = () => {
      const li = document.createElement("li");
      li.textContent = project.name;

      li.addEventListener("click", () => {
        updateProjectContent(project);

        [projectList, projectListMobile].forEach((list) => {
          list.querySelectorAll("li").forEach((item) => {
            item.style.color = "";
            item.style.backgroundColor = "";
          });
        });

        li.style.color = "var(--nord7)";
        li.style.backgroundColor = "var(--nord3)";
      });

      return li;
    };

    projectList.appendChild(createListItem());
    projectListMobile.appendChild(createListItem());
  });

  if (projectsData.length > 0) {
    const firstProject = projectsData[0] as Project;
    updateProjectContent(firstProject);

    const firstLi = projectList.querySelector("li");
    if (firstLi) {
      firstLi.style.color = "var(--nord7)";
      firstLi.style.backgroundColor = "var(--nord3)";
    }

    const firstMobileLi = projectListMobile.querySelector("li");
    if (firstMobileLi) {
      firstMobileLi.style.color = "var(--nord7)";
      firstMobileLi.style.backgroundColor = "var(--nord3)";
    }
  }
}
