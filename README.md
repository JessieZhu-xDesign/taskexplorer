# TaskExplorer

TaskExplorer is an application for managing and exploring tasks. It connects to FireStore DB directly

## Prerequisites

- Node.js (version 16 or above recommended)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskexplorer.git
   cd taskexplorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Application

You will need a Gemini API key to run the application.  
Follow the instructions at [Gemini API documentation](https://ai.google.dev/gemini-api/docs) to generate your API key.

Before starting the development server, export your Gemini API key:

```bash
export GEMINI_API_KEY="replace-me-with-your-gemini-api-key"
```

**Next, replace the Firebase config in `src/lib/firebase.ts` with your own Firebase project credentials.**  
You can find your Firebase config in the Firebase Console under Project Settings.

Then start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002) by default.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The production build will be output to the `build` directory.

### Environment Variables

For production, set your environment variables securely.  
You can use a `.env` file or set them in your deployment platform.

Example `.env` file:
```
GEMINI_API_KEY=your-production-gemini-api-key
```

### Deployment

You can deploy the production build to platforms such as Vercel, Netlify, or your own server.  
Refer to their documentation for deploying React or Node.js applications.

## Additional Commands

- Run tests:
  ```bash
  npm test
  # or
  yarn test
  ```

## Troubleshooting

If you encounter issues, ensure your Node.js and npm/yarn versions are up to date.

## License

MIT
