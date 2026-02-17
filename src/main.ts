import {
  NavigationOptionContentIds,
  type NavigationOptionId,
} from "./enums/nav.enums";
import { setupSkills } from "./skills";
import { setupProjects } from "./projects";

async function generateQuote() {
  const quoteContainer = document.getElementById("quote-container");

  try {
    const response = await fetch(
      "https://zen-quotes.kennethbecaro0.workers.dev/",
    );

    const quotes = await response.json();

    if (quotes && quotes.length > 0) {
      const quote = quotes[0];
      quoteContainer!.innerHTML = `
          <blockquote id="quote">
              &ldquo;${quote.q}&rdquo; &mdash; <footer>${quote.a}</footer>
          </blockquote>
      `;
    }
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

await generateQuote();
setupSkills();
setupProjects();

const navOptions = document.querySelectorAll(".nav-option");
const contentSections = document.querySelectorAll(".content");
const keyMappings: Record<string, NavigationOptionId> = {
  "1": "home-nav",
  "2": "project-nav",
  "3": "skills-nav",
  "4": "contact-nav",
};

function handleNavigation(params: NavigationOptionId) {
  const contentId = NavigationOptionContentIds[params];
  const contentToShow = document.getElementById(contentId);
  contentToShow!.classList.remove("inactive-content");
  contentToShow!.classList.add("active-content");

  contentSections.forEach((section) => {
    if (section.id !== contentId) {
      section.classList.remove("active-content");
      section.classList.add("inactive-content");
    }
  });
}

navOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const navOptionId = option.id as NavigationOptionId;
    handleNavigation(navOptionId);
  });
});

window.addEventListener("keydown", (e) => {
  if (["1", "2", "3", "4"].includes(e.key)) {
    const navOptionId = keyMappings[e.key];
    handleNavigation(navOptionId);
  }
});

const currentTimeElement = document.getElementById("current-time");
const currentDateElement = document.getElementById("current-date");
const dateNow = new Date();
currentDateElement!.textContent = dateNow
  .toLocaleDateString("en-CA", {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .toUpperCase()
  .replace(/,/g, "");

function updateTime() {
  const now = new Date();

  const timeString = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  if (currentTimeElement) {
    currentTimeElement.textContent = timeString;
  }

  setTimeout(updateTime, 1000);
}

updateTime();
