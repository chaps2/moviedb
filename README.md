# Movie DB

## Overview
Movie DB app. React-router is used for navigation and urls are used to pass state to page views. All router logic is contained within App and the "pages" components - i.e.components in the components folder do not depend on the router for simpler unit testing and re-use.

## Issues
* `BrowserRouter` not working with the snowpack dev server hence using `HashRouter` - needs service worker.
* No reload of results component if search parameters haven't changed.
* The TMDB API key is hardcoded and is exposed to the client.

## Further development
* Consider consuming TMDB API using an Open API/Swagger client or even an Open API to GraphQL client such as [IBM's OpenAPI-to-GraphQL](https://github.com/IBM/openapi-to-graphql).
* Use [moviedb-promise](https://github.com/grantholle/moviedb-promise) written in TypeScript to abstract API access.
* Use [React OpenAPI Client](https://github.com/anttiviljami/react-openapi-client) for `useOperation` and `useOperationMethod` hooks bound to the TMDB OAS schema to greatly simplyfy access. This is a React hooks wrapper around [openapi-client-axios](https://github.com/anttiviljami/openapi-client-axios). The latter includes the `typegen` tool that can be used to generate typescript type files (.d.ts) for the TMDB OAS schema.
* Use [Chakra](https://chakra-ui.com/) for built-in accessibility and re-use.
* Set up Error Bounadries.
* Use a component library or move all tailwind into styled components.

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.

## Dev notes

### Project set-up
> ✨ Bootstrapped with Create Snowpack App (CSA).

Using template [@snowpack/app-template-react-typescript]() - e.g. `npx create-snowpack-app movie3 --template @snowpack/app-template-react-typescript`.

Installed tailwindcss and autoprefixer as dev dependencies and ran `npx tailwind init`.
`npm install --save-dev @snowpack/plugin-postcss postcss postcss-cli`. See adding tailwindcss to snowpack.

