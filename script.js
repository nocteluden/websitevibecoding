const button = document.getElementById("generateButton");
const outputBox = document.getElementById("outputBox");

const loadingLines = [
  "Consulting the stars...",
  "Steeping the boba...",
  "Asking a tiny oracle...",
  "Gathering dramatic evidence...",
  "Reading the vibes..."
];

button.addEventListener("click", generateSurprise);

async function generateSurprise() {
  button.disabled = true;
  outputBox.classList.add("loading");
  outputBox.classList.remove("pop");
  outputBox.textContent = randomItem(loadingLines);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("/.netlify/functions/generate-joke", {
      signal: controller.signal
    });

    const text = await response.text();
    const data = JSON.parse(text);

    outputBox.classList.remove("loading");
    outputBox.classList.add("pop");
    outputBox.textContent = data.message || "The universe got shy. Try again.";
  } catch (error) {
    outputBox.classList.remove("loading");

    if (error.name === "AbortError") {
      outputBox.textContent = "The universe took too long. Try again.";
    } else {
      outputBox.textContent = "Something broke, but in a cute way.";
    }
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
  }
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}
