# DeeperResearch API Handbook

The API consists of standard HTTP endpoints and a WebSocket interface for real-time interactions with research workflows.

## Base URL

Assuming the application is running on `localhost` at port `5012`, the base URL for HTTP requests is:

`http://localhost:5012`

All API endpoints are prefixed with `/api/v1`.

## Authentication

Most API endpoints require authentication. Authentication is handled via a shared secret and a server-side session.

1.  **Authenticate:** Send a POST request to `/api/v1/authenticate` with a JSON body containing the `secret` configured in the application (`config['secret']`).
2.  **Session:** If the secret is valid, the server sets an `authenticated` flag in your Flask session. Subsequent requests from the same session will be considered authenticated.

**Note:** The provided code uses server-side sessions. This typically works automatically with web browsers that handle cookies. For other clients, managing session cookies might be necessary, or a token-based approach would be required (which is not implemented in this code). The `after_request` function sets `Access-Control-Allow-Credentials: true` which is relevant for cookie-based sessions with CORS.

## Response Format

All standard HTTP API endpoints return a JSON response with the following structure:

```json
{
  "status": true | false,
  "data": any
}
```

*   `status`: A boolean indicating if the request was successful (`true`) or failed (`false`).
*   `data`: Contains the result of the request if `status` is `true`, or an error message if `status` is `false`.

## HTTP API Endpoints

### 1. Authentication

*   **`POST /api/v1/authenticate`**
    *   **Description:** Authenticates the client session using a pre-shared secret.
    *   **Authentication Required:** No.
    *   **Request Body:**
        ```json
        {
          "secret": "your_configured_secret"
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "Authenticated"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid secret"
        }
        ```

### 2. Configuration

*   **`POST /api/v1/config/<string:key>/get`**
    *   **Description:** Retrieves a specific configuration value by its key.
    *   **Authentication Required:** Yes.
    *   **URL Parameters:**
        *   `key`: The name of the configuration key to retrieve.
    *   **Request Body:** Empty JSON object `{}` is sufficient, though any JSON body is accepted.
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "value_of_the_key"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid key"
        }
        ```

*   **`POST /api/v1/config/<string:key>/set`**
    *   **Description:** Sets a specific configuration value by its key.
    *   **Authentication Required:** Yes.
    *   **URL Parameters:**
        *   `key`: The name of the configuration key to set.
    *   **Request Body:**
        ```json
        {
          "value": "new_value_for_the_key"
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "Updated configuration: key = new_value_for_the_key"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```

### 3. Research History

*   **`POST /api/v1/research_history`**
    *   **Description:** Retrieves a list of all research history entries.
    *   **Authentication Required:** Yes.
    *   **Request Body:** Empty JSON object `{}` is sufficient, though any JSON body is accepted.
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": [
            {
              "id": "history_id_1",
              "title": "Research Title 1",
              "history": [ /* list of messages */ ],
              /* other history fields */
            },
            {
              "id": "history_id_2",
              "title": "Research Title 2",
              "history": [ /* list of messages */ ],
              /* other history fields */
            }
            // ...
          ]
        }
        ```
        *(Note: The exact structure of history objects and the `history` list content depends on the `dataProvider` implementation)*
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```

*   **`POST /api/v1/research_history/get`**
    *   **Description:** Retrieves a single research history entry by its ID.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "id": "history_id"
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": {
            "id": "history_id",
            "title": "Research Title",
            "history": [ /* list of messages */ ],
            /* other history fields */
          }
        }
        ```
        *(Note: The exact structure depends on the `dataProvider` implementation)*
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid id" // Based on getExtraInfo example
        }
        ```

*   **`POST /api/v1/research_history/delete`**
    *   **Description:** Deletes a research history entry by its ID.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "id": "history_id"
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "Deleted"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```

### 4. Research Workflow

*   **`POST /api/v1/research/create`**
    *   **Description:** Initiates a new research workflow based on a prompt. Creates a new research history entry.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "prompt": "Your research prompt here"
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": {
            "id": "new_history_id", // ID of the created research history entry
            "workflow_session": "unique_workflow_session_id" // ID for the WebSocket session
          }
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```
    *   **Note:** After receiving a successful response, the client should connect to the WebSocket namespace `/session` and send an `initiate` event with the received `workflow_session` ID to start receiving workflow updates.

### 5. Extra Info

*   **`POST /api/v1/extra_info`**
    *   **Description:** Retrieves a list of all extra info entries.
    *   **Authentication Required:** Yes.
    *   **Request Body:** Empty JSON object `{}` is sufficient, though any JSON body is accepted.
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": [
            {
              "id": "ei_id_1",
              "name": "Info 1",
              "description": "Desc 1",
              "author": "Author 1",
              "enabled": true,
              "content": "Content 1"
            },
            // ...
          ]
        }
        ```
        *(Note: The exact structure depends on the `dataProvider` implementation)*
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```

*   **`POST /api/v1/extra_info/create`**
    *   **Description:** Creates a new extra info entry.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "name": "New Extra Info",
          "description": "Description of the info",
          "author": "Author Name",
          "enabled": true,
          "content": "The actual content."
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "new_extra_info_id"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```

*   **`POST /api/v1/extra_info/get`**
    *   **Description:** Retrieves a single extra info entry by its ID.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "id": "extra_info_id"
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": {
            "id": "extra_info_id",
            "name": "Extra Info Name",
            "description": "Description",
            "author": "Author",
            "enabled": true,
            "content": "Content"
          }
        }
        ```
        *(Note: The exact structure depends on the `dataProvider` implementation)*
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid id"
        }
        ```

*   **`POST /api/v1/extra_info/delete`**
    *   **Description:** Deletes an extra info entry by its ID.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "id": "extra_info_id"
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "Deleted"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```

*   **`POST /api/v1/extra_info/update`**
    *   **Description:** Updates an existing extra info entry.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "id": "extra_info_id",
          "name": "Updated Name",
          "description": "Updated Description",
          "author": "Updated Author",
          "enabled": false,
          "content": "Updated content."
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "success"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```

### 6. User Scripts

*   **`GET /api/v1/user_script`**
    *   **Description:** Retrieves a list of all user script entries.
    *   **Authentication Required:** Yes.
    *   **Request Body:** Not applicable for GET.
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": [
            {
              "id": "us_id_1",
              "name": "Script 1",
              "content": "Script content 1",
              "enabled": true
            },
            // ...
          ]
        }
        ```
        *(Note: The exact structure depends on the `dataProvider` implementation)*
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```

*   **`POST /api/v1/user_script/create`**
    *   **Description:** Creates a new user script entry.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "name": "New Script",
          "content": "print('Hello, world!')",
          "enabled": true
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "new_user_script_id"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```

*   **`POST /api/v1/user_script/get`**
    *   **Description:** Retrieves a single user script entry by its ID.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "id": "user_script_id"
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": {
            "id": "user_script_id",
            "name": "Script Name",
            "content": "Script content",
            "enabled": false
          }
        }
        ```
        *(Note: The exact structure depends on the `dataProvider` implementation)*
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid id"
        }
        ```

*   **`POST /api/v1/user_script/delete`**
    *   **Description:** Deletes a user script entry by its ID.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "id": "user_script_id"
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "Deleted"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```

*   **`POST /api/v1/user_script/update`**
    *   **Description:** Updates an existing user script entry.
    *   **Authentication Required:** Yes.
    *   **Request Body:**
        ```json
        {
          "id": "user_script_id",
          "name": "Updated Script Name",
          "content": "Updated script content",
          "enabled": true
        }
        ```
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": "success"
        }
        ```
    *   **Error Response (`status: false`):**
        ```json
        {
          "status": false,
          "data": "Not authenticated"
        }
        ```
        or
        ```json
        {
          "status": false,
          "data": "Invalid request"
        }
        ```

### 7. Application Info

*   **`GET /api/v1/info`**
    *   **Description:** Provides basic information about the application and API status.
    *   **Authentication Required:** No.
    *   **Request Body:** Not applicable for GET.
    *   **Successful Response (`status: true`):**
        ```json
        {
          "status": true,
          "data": {
            "api_version": "v1",
            "api_codename": "castorice",
            "initialized": true | false, // Indicates if the data provider is initialized
            "status": "online"
          }
        }
        ```
    *   **Error Response (`status: false`):** None expected under normal operation.

## WebSocket API

The application uses SocketIO for real-time communication related to research workflows. The WebSocket communication happens under the `/session` namespace.

To connect to the WebSocket API, establish a SocketIO connection to the base URL (e.g., `ws://localhost:5012`) and specify the `/session` namespace.

It is assumed that the client has already authenticated via the HTTP `/api/v1/authenticate` endpoint and maintains the session (e.g., via cookies) for the WebSocket connection. The server binds the client's SocketIO SID to a workflow session based on the `initiate` event payload.

### Client-to-Server Events (`socket.emit` from client)

These are events sent *by the client* to trigger actions in a specific workflow session.

*   **Event Name:** `initiate`
    *   **Description:** Binds the current WebSocket connection to a specific workflow session and starts the workflow `initiate` process.
    *   **Payload:** The workflow session ID obtained from the `POST /api/v1/research/create` HTTP endpoint.
        ```json
        {
          "session": "workflow_session_id_from_http_response"
        }
        ```

*   **Event Name:** `conduct`
    *   **Description:** Instructs the bound workflow to proceed with its `conduct` phase (details depend on `ResearchWorkflow` implementation).
    *   **Payload:** (Optional based on code, handler takes a `data` argument but doesn't use it explicitly) An empty object `{}` or no payload is typically sent.

*   **Event Name:** `next_step`
    *   **Description:** Instructs the bound workflow to proceed to the next step.
    *   **Payload:** (Optional based on code, handler takes a `data` argument but doesn't use it explicitly) An empty object `{}` or no payload is typically sent.

*   **Event Name:** `interact`
    *   **Description:** Sends a user interaction prompt to the bound workflow.
    *   **Payload:** A string containing the user's prompt.
        ```json
        "User's interaction prompt"
        ```

### Server-to-Client Events (`socket.emit` from server)

These are events sent *by the server* to update the client on the progress and output of a research workflow. These events are emitted specifically to the client SocketIO SID bound to the workflow session.

*   **Event Name:** `new_message`
    *   **Description:** A new message has been generated by the workflow. This message is also saved to the research history.
    *   **Payload:** A dictionary representing the message. The exact structure depends on the `ResearchWorkflow` implementation.
        ```json
        {
          /* message structure */
          "type": "step_output",
          "content": "Generated content",
          "timestamp": "..."
        }
        ```

*   **Event Name:** `research_initiated`
    *   **Description:** The research workflow has officially started its process after the `initiate` event was received.
    *   **Payload:** None.

*   **Event Name:** `research_finished`
    *   **Description:** The research workflow has completed all its steps.
    *   **Payload:** None.

*   **Event Name:** `research_step_finished`
    *   **Description:** A distinct step within the research workflow has finished.
    *   **Payload:** None.

*   **Event Name:** `title_suggested`
    *   **Description:** The workflow has suggested a title for the research history entry. The history entry's title is also updated server-side.
    *   **Payload:** A string containing the suggested title.
        ```json
        "Suggested Research Title"
        ```

*   **Event Name:** `error`
    *   **Description:** An error occurred during the workflow execution.
    *   **Payload:** A string containing an error message.
        ```json
        "An error occurred: Details here"
        ```

*   **Event Name:** `token_count`
    *   **Description:** Reports the current token count used by the workflow (presumably for cost tracking).
    *   **Payload:** An integer representing the token count.
        ```json
        12345
        ```