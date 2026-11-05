# Write Rite

React writing-app prototype with email/password Firebase authentication, protected routes, and persistent light/dark themes. The writing page and password-reset action retain their existing prototype behavior.

Requires Node.js 22.12+. Install with `npm ci` or Yarn 1 `yarn install --frozen-lockfile`.

- `npm start`: run Vite on port 3000.
- `npm run build`: generate the production site in `build/`.
- `npm run test:run`: run authentication, route, theme, and subscription-cleanup regression tests.
- `npm test`: watch tests.

Keep the existing Firebase configuration names in `.env.local`: `REACT_APP_APIKEY`, `REACT_APP_AUTH_DOMAIN`, `REACT_APP_DATABASEURL`, `REACT_APP_PROJECT_ID`, `REACT_APP_STORAGEBUCKET`, `REACT_APP_MESSAGING_SENDER_ID`, and `REACT_APP_APP_ID`. Vite exposes these client configuration values through `import.meta.env`; other environment variables are not exposed. Enable email/password authentication and authorize your deployed domain in Firebase.

Vite/Vitest replace CRA, Emotion uses its current React package, and Firebase uses the maintained compatibility imports to preserve the existing wrapper API. Formik is upgraded, and the only used Recompose helper is replaced locally. Authentication subscriptions unsubscribe on unmount, the Firebase provider keeps a stable instance, and sign-in waits for authentication before navigation and displays credential errors.

The gRPC patch floor in npm overrides/Yarn resolutions avoids the vulnerable transitive version pinned by Firebase's Firestore package. The app currently uses Firebase Auth only.

Production hosting must fall back to `index.html` for browser routes. Service-worker registration stays disabled by default; a generated offline shell remains available for the existing opt-in registration. Tests use mocked authentication and do not access a live Firebase project.
