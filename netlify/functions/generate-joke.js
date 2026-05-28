import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function handler() {
  try {
    const response = await client.responses.create({
      model: "gpt-5.1-mini",
      input: `
Generate one short, non-offensive personalized joke for Sophia.

Facts:
- She loves Heytea bubble tea.
- She is half Cantonese and half Vietnamese.
- She wants to be a lawyer or consultant.
- She wants to be rich and marry rich.
- Her family owns several San Francisco properties.
- She is 5 feet tall.
- She is currently in Rome, Italy.
- She is from San Francisco.
- She goes to Berkeley.
- She is good at poetry.
- She likes Greek mythology.
- She is mainly trying to be an English major but has considered economics, astronomy, psychology, or multiple majors.

Rules:
- The joke should be short.
- Keep it playful and kind.
- No mean jokes.
- Do not explain the joke.
`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ joke: response.output_text })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        joke: "The AI got overwhelmed by Sophia's major plans. Try again."
      })
    };
  }
}
