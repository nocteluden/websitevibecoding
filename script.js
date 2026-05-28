const button = document.getElementById("jokeButton");
const jokeBox = document.getElementById("jokeBox");

button.addEventListener("click", generateJoke);

async function generateJoke() {
  jokeBox.textContent = "Thinking...";

  try {
    const response = await fetch("/.netlify/functions/generate-joke");
    const data = await response.json();

    jokeBox.textContent = data.joke;
  } catch (error) {
    jokeBox.textContent = "Something broke. The joke machine needs Heytea.";
  }
}
