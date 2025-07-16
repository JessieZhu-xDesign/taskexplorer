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

### Security

- Never commit sensitive keys (Gemini API key, Firebase config) to version control.
- Use environment variables for secrets.
- Restrict Firebase rules for production usage.
- **To delete your Git history and start fresh:**
  1. Backup your code if needed.
  2. Delete the `.git` folder:
     ```bash
     rm -rf .git
     ```
  3. Reinitialize git:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     ```
  4. (Optional) Force-push to a remote repository:
     ```bash
     git remote add origin <your-repo-url>
     git push --force origin main
     ```
  > **Warning:** This will permanently remove all previous commit history.
- **To remove a commit from the main branch:**
  1. Identify the commit hash you want to remove (use `git log`).
  2. If you want to remove the latest commit:
     ```bash
     git reset --hard HEAD~1
     ```
     Or to remove a specific commit and keep changes:
     ```bash
     git rebase -i <commit-hash>^
     ```
     In the editor, change `pick` to `drop` for the commit you want to remove, then save and exit.
  3. Force-push the changes to the remote repository:
     ```bash
     git push --force origin main
     ```
  > **Warning:** Force-pushing will overwrite history on the remote. Make sure collaborators are aware.

#### Git Push Error: "failed to push some refs"

If you see this error when pushing to GitHub, it usually means your local branch is behind or diverged from the remote branch.  
To resolve:

1. Fetch and merge remote changes:
   ```bash
   git pull origin main
   ```
2. If you intend to overwrite remote history (e.g., after deleting commits or history), use:
   ```bash
   git push --force origin main
   ```
> **Warning:** Force-pushing will overwrite remote changes. Only use if you are sure.

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
