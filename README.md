# AI Email Assistant

An intelligent email assistant that categorizes, summarizes, prioritizes, and extracts tasks and events from your emails using the Gemini API. It helps you manage your inbox efficiently by highlighting what's important and suggesting relevant actions.

This application features two modes:
-   **General Mode:** For everyday email management.
-   **Job Search Mode:** A powerful assistant for your job hunt, which can analyze job descriptions against your resume.

## Local Development Setup

Follow these instructions to run the application on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository or download the source code.**

2.  **Navigate to the project directory:**
    ```bash
    cd [project_folder]
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Set up your API Key:**
    -   You'll need a Google Gemini API key to run this application. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   In the root of the project, create a new file named `.env`.
    -   Add the following line to the `.env` file, replacing `YOUR_API_KEY` with your actual key:
        ```
        VITE_GEMINI_API_KEY="YOUR_API_KEY"
        ```

### Running the Application

Once you've installed dependencies and set up your API key, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the application on a local server, typically at `http://localhost:5173`. Open this URL in your web browser to use the app.
