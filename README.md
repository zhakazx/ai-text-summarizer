# SwiftSum — AI Text Summarizer

SwiftSum is a Next.js app that generates fast, accurate summaries using the Gemini 2.5 Flash model via the Google Gen AI SDK.

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS v4
- Google Gen AI SDK (`@google/genai`)
- TypeScript

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an environment file and add your Gemini API key:
   - File: `.env.local`
   - Content:
     ```env
     GEMINI_API_KEY=YOUR_API_KEY
     ```
   - Get a free key from https://ai.google.dev/
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`.

## Security
- The API key is read from `process.env.GEMINI_API_KEY` on the server only.
- All requests from the UI go to `/api/summarize`; the key never touches the browser.

## Development Notes
- Input is validated with `zod` and limited to 20,000 characters.
- Summary formats: short paragraph, detailed paragraph, or bulleted key points.
- Responsive two-column layout; copy-to-clipboard provided for the result.

## Deploy
- Supports Vercel out of the box. Set `GEMINI_API_KEY` in Vercel project settings.

## License
This project is licensed under the [MIT License](./LICENSE).
