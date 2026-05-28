import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function handler(event) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return json({ message: "Missing OPENAI_API_KEY in Netlify." }, 500);
    }

    let previousMessages = [];

    if (event.body) {
      const body = JSON.parse(event.body);
      previousMessages = Array.isArray(body.previousMessages)
        ? body.previousMessages.slice(-10)
        : [];
    }

    const lastMessage = previousMessages.length
      ? previousMessages[previousMessages.length - 1]
      : "None yet.";

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      temperature: 1.15,
      input: `Write one cute, playful, personalized message for Sophia.
      
Hidden background facts you may use quietly:
- Sophia likes Heytea bubble tea.
- Sophia is from San Francisco.
- Sophia goes to UC Berkeley.
- Sophia is currently in Rome.
- Sophia likes poetry.
- Sophia likes Greek mythology.
- Sophia is considering English, economics, astronomy, psychology, or multiple majors.
- Sophia wants to become a lawyer or consultant.
- Sophia wants a to be rich and MARRY RICH.
- Sophia may go on dates with men from Hinge from London who are overly eager.
- Sophia's mother is very career-oriented.
- Sophia had a terrible fat roommate this past spring semester and they had conflicts.
- Sophia wishes to travel the world in the future.
- Sophia likes to use the word "chud". 
- Sophia hates the dining halls on campus (Crossroads is one, Cafe 3 is another). 
- Sophia has very strong toes/feet. 
- Sophia can often be disorganized, but she tries her best to use calendars and plan things out.
- Sophia wants to be a writer one day.

Previous messages already shown:
${previousMessages.length ? previousMessages.map((m, i) => `${i + 1}. ${m}`).join("\n") : "None yet."}

Most recent message:
${lastMessage}

Rules:
- Do not repeat the topic, wording pattern, or punchline of the most recent message.
- Avoid topics that appeared often in the previous messages.
- Use only 1 or 2 background facts.
- Make it cute, specific, and fun.
- It should feel like a tiny personalized fortune, compliment, or playful observation, not a forced joke.
- 10 to 24 words.
- One sentence only.
- No offensive jokes.
- No jokes about ethnicity, periods, pain, body, height, or family money.
- Do not explain anything.
- Avoid the structure "Sophia is the kind of person who..."
`
    });

    const message = response.output_text?.trim() || "A tiny oracle appeared, panicked, and left.";

    return json({ message });
  } catch (error) {
    console.error("Function error:", error);

    return json({
      message: `Error: ${error.message || "unknown function error"}`
    }, 500);
  }
}

function json(data, statusCode = 200) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
}
