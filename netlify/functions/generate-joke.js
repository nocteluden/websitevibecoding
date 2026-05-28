import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function handler() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ joke: "Missing OPENAI_API_KEY in Netlify." })
      };
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: `Generate one short, kind, non-offensive personalized joke for Sophia.

Facts:
- She loves Heytea bubble tea.
- She is from San Francisco and goes to Berkeley.
- She is currently in Rome, Italy.
- She wants to be a lawyer or consultant.
- She likes poetry and Greek mythology.
- She is considering English, economics, astronomy, psychology, or too many majors.

Rules:
- One sentence only.
- Playful, not mean.
- No jokes about ethnicity, periods, pain, body, or family wealth.
- Do not explain it.`
    });

    const joke = response.output_text || "The AI thought too hard and forgot the joke.";

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
