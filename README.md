# Joke App

## Overview
This application fetches jokes from a public jokes API and translates them into the user's selected language. Built with Next.js, the app supports server-side rendering to ensure quick loading times and improved SEO.

## Features
- Fetches jokes from an external API.
- Translates jokes into various languages using a translation API.
- Supports error handling and localization of error messages.
- Uses Tailwind CSS for styling, layout, responsive design.

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

For installing a project you need pre-install Node version >= v18.18.0.

1. Clone the repository.
2. Install dependencies
```
   npm install
```
3. Set up environment variables:
- `.env.dev` Contains keys that must be defined for proper API request functionality in the application.
- Create an `.env` file in the root directory and add your API keys from `.env.dev` with correct API key-value pairs.
- `TRANSLATE_API_KEY` - API key for Google Translate API.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
4. Open [http://localhost:3000](http://localhost:3000) or with other recommended port (mentioned in the terminal) in your browser to view the app.

## Technologies Used
- ReactJS: A JavaScript library for building user interfaces.
- [Next.js Documentation](https://nextjs.org/docs): Framework for building server-rendered React applications.
- [TailwindCSS](https://tailwindcss.com/): Utility-first CSS framework for styling.
- [TypeScript](https://www.typescriptlang.org/docs/): A superset of JavaScript that adds static types.
- [Jokes API](https://sv443.net/jokeapi/v2/): A public API for fetching jokes.
- [Google Translate API](https://cloud.google.com/translate/docs): An API for translating text.
- [Jest](https://jestjs.io/docs/getting-started): A JavaScript testing framework.

## Code Structure
- `src/pages/`: Contains the main pages of the application. The main page is responsible for rendering the list of jokes.
- `src/app/components/`: Contains reusable components, including error handling.
- `src/app/utils/`: Helper functions for fetching data from API, mappers, and error handling.
- `src/app/globals.css`: Global styles for the application.
- `src/app/config.ts`: Global variables
- `src/app/hooks`: Custom hook functions
- `src/middleware.ts`: Middleware for managing request handling, including localization redirects and potential future logic for enhancing routing and response management.

## Learn More

To learn more about Next.js, take a look at the following resources, other technologies resources mentioned in paragraph **Technologies Used**:

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
