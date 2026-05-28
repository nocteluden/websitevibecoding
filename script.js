const button = document.getElementById("jokeButton");
const jokeBox = document.getElementById("jokeBox");

button.addEventListener("click", generateJoke);

async function generateJoke() {
  jokeBox.textContent = "Thinking...";
  button.disabled = true;

  try {
    const response = await fetch("/.netlify/functions/generate-joke");
    const text = await response.text();

    console.log("Raw response:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      jokeBox.textContent = "The function did not return JSON. Check Netlify function logs.";
      return;
    }

    jokeBox.textContent = data.joke || "No joke came back from the AI.";
  } catch (error) {
    jokeBox.textContent = `Website error: ${error.message}`;
  } finally {
    button.disabled = false;
  }
}
