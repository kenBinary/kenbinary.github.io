import {
  NavigationOptionContentIds,
  type NavigationOptionId,
} from "./enums/nav.enums";
import { setupSkills } from "./skills";

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
