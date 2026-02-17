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
