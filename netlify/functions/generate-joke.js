import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const jokeStyles = [
  "make it sound like a fake academic diagnosis",
  "make it sound like a fortune cookie",
  "make it sound like a Greek myth prophecy",
  "make it sound like a Berkeley campus rumor",
  "make it sound like a fake legal argument",
  "make it sound like a consulting slide title",
  "make it sound like a travel observation about Rome",
  "make it sound like a dramatic poem but still funny",
  "make it sound like a fake startup pitch",
  "make it sound like a rich aunt giving advice",
  "make it sound like a horoscope",
  "make it sound like a fake museum plaque",
  "make it sound like a text from a stressed friend",
  "make it sound like a warning label",
  "make it sound like a product review"
];

const jokeFocuses = [
  "Heytea bubble tea",
  "Berkeley academic stress",
  "being in Rome",
  "wanting to be a lawyer",
  "wanting to be a consultant",
  "poetry",
  "Greek mythology",
  "choosing too many majors",
  "San Francisco energy",
  "wanting to be rich",
  "English major behavior",
  "astronomy as a random possible major",
  "psychology as a random possible major",
  "economics as a backup plan"
];

export async function handler() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ joke: "Missing OPENAI_API_KEY in Netlify." })
      };
    }

    const style = getRandomItem(jokeStyles);
    const focus = getRandomItem(jokeFocuses);
    const randomSeed = Math.floor(Math.random() * 1000000);

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      temperature: 1.15,
      input: `Generate one short, kind, non-offensive personalized joke for Sophia.

Main focus for this joke: ${focus}
Style for this joke: ${style}
Random seed: ${randomSeed}

Facts you may use:
- Sophia loves Heytea bubble tea.
- She is from San Francisco.
- She goes to Berkeley.
- She is currently in Rome, Italy.
- She wants to be a lawyer or consultant.
- She wants to be rich.
- She enjoys poetry.
- She likes Greek mythology.
- She is mainly trying to be an English major but has considered economics, astronomy, psychology, or multiple majors.

Rules:
- One sentence only.
- Under 24 words.
- Make it noticeably different from a normal "Berkeley major planning" joke.
- Do not mention every fact.
- Use only 1 or 2 facts.
- Playful, not mean.
- No jokes about ethnicity, periods, pain, height, body, or family wealth.
- Do not explain the joke.`
    });

    const joke = response.output_text || "The AI got too poetic and forgot the punchline.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ joke })
    };
  } catch (error) {
    console.error("Function error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        joke: `Error: ${error.message || "unknown function error"}`
      })
    };
  }
}

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}
