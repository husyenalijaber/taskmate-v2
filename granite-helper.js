// granite-helper.js
// DEVELOPMENT TOOL ONLY: calls IBM Granite model via Replicate API
// Usage:
// 1) npm install replicate dotenv
// 2) create .env with REPLICATE_API_TOKEN=r8_xxx
// 3) node granite-helper.js

import "dotenv/config";
import Replicate from "replicate";
import fs from "fs";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function runPrompt() {
  const prompt = `
Generate a concise React component example for a Task form and a Task list using Tailwind classes.
Return only the code blocks for TaskForm and TaskList components.
`;
  try{
    const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", {
      input: { prompt, max_tokens: 800, temperature: 0.6 }
    });
    const outText = Array.isArray(output) ? output.join("\n") : String(output);
    fs.writeFileSync("granite-output.txt", outText, "utf-8");
    console.log("✅ Output saved to granite-output.txt");
  } catch(e){
    console.error("❌ Error:", e);
  }
}

runPrompt();
