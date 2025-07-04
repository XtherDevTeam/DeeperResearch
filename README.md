# DeeperResearch

DeeperResearch is an AI-powered research assistant designed to conduct in-depth investigations based on user prompts. It leverages large language models (LLMs) to generate and execute research plans, interact with various tools, and provide real-time updates through an intuitive web interface. The project is structured with a Python Flask backend and a React frontend.

## Features

*   **AI-Driven Research Workflows:** Utilizes Google's Generative AI (Gemini models) to autonomously plan and execute complex research tasks based on user prompts.
*   **Interactive Research Sessions:** Users can initiate new research, monitor real-time progress, and interact with the LLM at various stages of the workflow (e.g., advancing steps, providing further input).
*   **Extensible Tooling:** The LLM can invoke a predefined set of tools (`workflowTools.py`) and dynamically execute user-defined Python scripts, greatly enhancing its research capabilities.
*   **Customizable Context (Extra Information):** Users can provide "Extra Information" – custom data or context – to the LLM, allowing it to perform more informed and specialized research.
*   **Persistent Research History:** All research sessions, including their complete conversational history and generated outputs, are saved to a local SQLite database for future review and reference.
*   **Real-time Updates:** Frontend receives live updates from the backend via WebSockets (SocketIO) to display research progress, new messages, and status changes.
*   **Configurable Settings:** Essential application settings, including LLM model selection, API keys for Google Generative AI and Google Search, and authentication secrets, can be managed through the web interface.
*   **Authentication:** Basic secret-key authentication secures access to the application's backend API.

## Project Structure

The project is organized into `frontend` and `backend` directories, alongside root-level configuration and utility files:

```
/Users/xiaokang00010/Desktop/project/DeeperResearch/
├── backend/                  # Python Flask backend
│   ├── app.py                # Main Flask application, API routes, SocketIO
│   ├── chatModel.py          # Google Generative AI integration (LLM)
│   ├── config.py             # (Potential) Application configuration
│   ├── dataProvider.py       # SQLite database interface for history, config, extensions
│   ├── init.sql              # Database schema initialization script
│   ├── logger.py             # Logging utilities
│   ├── prompts.py            # LLM prompt definitions
│   ├── tools.py              # Generic utility functions
│   ├── userScript.py         # Handles user-defined scripts as tools
│   ├── workflow.py           # Core research workflow logic, LLM orchestration
│   ├── workflowTools.py      # Predefined tools for the LLM
│   └── blob/                 # Directory for SQLite database file (database.db)
├── frontend/                 # React web application
│   ├── public/               # Static assets
│   ├── src/                  # React source code
│   │   ├── Api.js              # Frontend API client for backend communication
│   │   ├── App.js              # Main React component (minimal, delegates to Views)
│   │   ├── Components.js       # Shared UI components
│   │   ├── index.js            # React application entry point, routing, theming
│   │   ├── pages/              # Main application pages (e.g., Home, CreateResearch, HistoryView, Extensions, More)
│   │   ├── components/         # Reusable UI components
│   │   └── theme.js            # Material-UI theme configuration
│   └── package.json          # Node.js dependencies and scripts
├── docs/                     # (Currently empty) Placeholder for documentation
└── scope.py                  # (Minimal, potential placeholder/utility)
```

## Installation

This project requires both the Python backend and the Node.js/React frontend to be set up.

### Prerequisites

*   **Python 3.8+**: Essential for the backend.
*   **Node.js & npm (or yarn)**: Required for the frontend development and build process.
*   **Git**: To clone the project repository.

### 1. Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/DeeperResearch.git # Replace with actual repo URL
    cd DeeperResearch
    ```
    (Note: Assuming the user runs this from their home directory, as the initial path was `/Users/xiaokang00010/Desktop/project/DeeperResearch`)

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Create and activate a Python virtual environment** (recommended):
    ```bash
    python -m venv venv
    # On macOS/Linux
    source venv/bin/activate
    # On Windows
    .\venv\Scripts\activate
    ```

4.  **Install Python dependencies:**
    ```bash
    pip install flask flask-cors flask-socketio python-socketio google-generativeai beautifulsoup4 requests
    ```

5.  **Initial Configuration (Important!):**
    The backend uses SQLite and needs an initial `secret` key for authentication and a `GOOGLE_API_KEY` for the LLM.
    *   **For the very first run:** It is highly recommended to set your Google API Key as an environment variable before starting the backend for the first time, as the `dataProvider` will try to read it during initialization.
        ```bash
        export GOOGLE_API_KEY="YOUR_GOOGLE_GENERATIVE_AI_API_KEY"
        # On Windows (in PowerShell): $env:GOOGLE_API_KEY="YOUR_GOOGLE_GENERATIVE_AI_API_KEY"
        # On Windows (in Command Prompt): set GOOGLE_API_KEY="YOUR_GOOGLE_GENERATIVE_AI_API_KEY"
        ```
    *   The `secret` key for application authentication is stored in the database. If `init.sql` doesn't set a default, you may need to manually insert one into the `config` table in `backend/blob/database.db` or use a method to set it via the API after initial startup if the application permits unauthenticated configuration (which it typically doesn't).
        *A common workaround for first-time setup might be to temporarily disable authentication in `app.py` to set the secret via the frontend, or to directly edit `backend/blob/database.db` using an SQLite client to set the `secret` value in the `config` table.*

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend # From the backend directory
    # or cd /Users/xiaokang00010/Desktop/project/DeeperResearch/frontend
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

## Usage

Follow these steps to run and interact with the DeeperResearch application.

### 1. Start the Backend Server

Open your terminal, navigate to the `backend` directory (and activate your virtual environment), then run:
```bash
python app.py
```
The backend server will start and listen on `http://0.0.0.0:5012`.

### 2. Start the Frontend Development Server

Open a separate terminal, navigate to the `frontend` directory, then run:
```bash
npm start
# or yarn start
```
This will compile the React application and open it in your default web browser, usually at `http://localhost:3000`.

### 3. Initial Application Access & Configuration

1.  **Access the Web UI:** Go to `http://localhost:3000` in your web browser.
2.  **Configure Backend URL:** If prompted, enter the backend server address: `http://localhost:5012`. This setting is saved locally in your browser.
3.  **Authenticate:** You will be prompted to enter the secret key. Use the secret key configured or set in your backend's `config` table (as discussed in the Installation section).
4.  **Configure API Keys:** Once authenticated, navigate to the "Settings" or "More" section in the left navigation drawer. Here, you can further configure:
    *   `google_api_key`: Your Google Generative AI API key (if not set via environment variable).
    *   `google_search_engine_key`: Your Google Custom Search API key.
    *   `google_search_engine_cx_id`: Your Google Custom Search Engine ID.
    *   `deep_research_model`: Select the Gemini model to use (e.g., `gemini-pro`).

### 4. Conducting Research

1.  **Create New Research:**
    *   In the left navigation drawer, click on "Create Research".
    *   Enter a research prompt (e.g., "Analyze the latest advancements in quantum computing for drug discovery.").
    *   The system will initiate an AI-driven research workflow based on your prompt.

2.  **Monitor & Interact:**
    *   The main content area will display real-time updates from the LLM, including its thought process, tool invocations (e.g., web searches), gathered information, and research progress.
    *   Depending on the workflow, you may be presented with options to:
        *   **Conduct:** Allow the AI to continue its autonomous research process.
        *   **Next Step:** Advance the research to the next planned stage.
        *   **Interact:** Provide direct input or ask follow-up questions to the LLM during the active research session.

3.  **Manage Research History:**
    *   All your past research sessions are listed under the "Recent" section in the navigation drawer.
    *   Click on any research title to view its complete history and outputs.
    *   Right-click (or long-press) on a research item to bring up options, such as deleting the history.

### 5. Extensions (User Scripts & Extra Information)

1.  **Access Extensions:**
    *   Navigate to the "Extensions" section in the left navigation drawer.
    *   This section allows you to manage User Scripts and Extra Information.
2.  **Customize Research:**
    *   **User Scripts:** Define custom Python functions that the LLM can discover and invoke as tools during its research. This allows you to integrate custom data sources, APIs, or processing logic.
    *   **Extra Information:** Provide additional text-based context, data, or guidelines that the LLM can reference and incorporate into its research process.
3.  Use the UI to create, edit, enable, or disable your custom extensions.

## License

This project is under MIT license.