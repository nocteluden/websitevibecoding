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

  const previousMessages = getPreviousMessages();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch("/.netlify/functions/generate-joke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        previousMessages
      }),
      signal: controller.signal
    });

    const text = await response.text();
    const data = JSON.parse(text);

    const message = data.message || "The universe got shy. Try again.";

    outputBox.classList.remove("loading");
    outputBox.classList.add("pop");
    outputBox.textContent = message;

    saveMessage(message);
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

function getPreviousMessages() {
  const saved = localStorage.getItem("sophiaPreviousMessages");

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveMessage(message) {
  const previousMessages = getPreviousMessages();

  previousMessages.push(message);

  // Keep only the last 8 messages so the prompt does not get too long.
  const recentMessages = previousMessages.slice(-8);

  localStorage.setItem("sophiaPreviousMessages", JSON.stringify(recentMessages));
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}
