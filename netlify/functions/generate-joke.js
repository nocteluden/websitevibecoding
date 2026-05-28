import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const formats = [
  "a cute fake prophecy",
  "a tiny compliment with a punchline",
  "a playful fortune",
  "a mini award title",
  "a dramatic one-line announcement",
  "a soft roast that is still clearly affectionate",
  "a cute fake notification",
  "a whimsical observation"
];

const focuses = [
  "bubble tea",
  "Rome",
  "Berkeley",
  "poetry",
  "Greek mythology",
  "career ambition",
  "English major energy",
  "too many possible majors",
  "future rich life",
  "San Francisco"
];

export async function handler() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return json({ message: "Missing OPENAI_API_KEY in Netlify." }, 500);
    }

    const format = randomItem(formats);
    const focus = randomItem(focuses);

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      temperature: 1.25,
      input: `Write one cute, playful, personalized message for Sophia.

It should be ${format}.
Main focus: ${focus}.

Hidden background facts you may use quietly:
- Sophia likes Heytea bubble tea.
- Sophia is from San Francisco.
- Sophia goes to Berkeley.
- Sophia is currently in Rome.
- Sophia likes poetry.
- Sophia likes Greek mythology.
- Sophia is considering English, economics, astronomy, psychology, or multiple majors.
- Sophia may become a lawyer or consultant.
- Sophia wants a successful, rich future.

Rules:
- Do NOT make it sound like a generic joke.
- Do NOT list facts.
- Use only 1 or 2 background facts.
- Make it cute, specific, and fun.
- 10 to 22 words.
- One sentence only.
- No offensive jokes.
- No jokes about ethnicity, periods, pain, body, height, or family money.
- Do not explain anything.
- Avoid overusing the word "Berkeley."
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

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
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
