const jokes = [
  "Sophia is 5 feet tall but somehow her Berkeley course plan is 9 feet tall.",
  "Sophia said English major, then casually opened the triple-major expansion pack.",
  "Sophia wants to be a lawyer or consultant, which is just two different ways to say 'paid to win arguments.'",
  "Sophia in Rome is probably critiquing ancient ruins like, 'Needs better thesis structure.'",
  "Sophia likes Greek mythology because even Zeus had less dramatic planning than her major decisions.",
  "Sophia wants to marry rich, but honestly her family real estate portfolio already sounds like a side quest reward.",
  "Sophia does poetry so well that even her overthinking has line breaks.",
  "Sophia at Berkeley is just caffeine, ambition, and one suspiciously detailed life plan.",
  "Sophia loves Heytea so much her blood type might be brown sugar.",
  "Sophia is from San Francisco, studies at Berkeley, and is in Rome. Her location history has better branding than most startups.",
  "Sophia considering English, econ, astronomy, and psychology is not a major plan. It's a Netflix category list.",
  "Sophia wants to be rich and marry rich. Diversification queen.",
  "Sophia could turn one bubble tea order into a 900-word poetic analysis.",
  "Sophia's career plan has two settings: courtroom domination or consulting slide deck royalty.",
  "Sophia in Rome probably looked at the Colosseum and thought, 'Good internship location.'",
  "Sophia is proof that being short does not prevent your ambitions from being financially enormous.",
  "Sophia's personality is 40% poetry, 40% strategy, 20% Heytea loyalty program.",
  "Sophia doesn't pick a major. She collects academic side quests.",
  "Sophia's dream life is giving elegant legal advice from a mansion she somehow acquired before 30.",
  "Sophia is the only person who could make Greek mythology, Berkeley stress, and bubble tea feel connected."
];

const button = document.getElementById("jokeButton");
const jokeBox = document.getElementById("jokeBox");

let lastJokeIndex = -1;

button.addEventListener("click", generateJoke);

function generateJoke() {
  let randomIndex = Math.floor(Math.random() * jokes.length);

  while (randomIndex === lastJokeIndex && jokes.length > 1) {
    randomIndex = Math.floor(Math.random() * jokes.length);
  }

  lastJokeIndex = randomIndex;
  jokeBox.textContent = jokes[randomIndex];
}
