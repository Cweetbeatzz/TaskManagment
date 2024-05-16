Task Management:

GET /api/tasks

- Description: Get all tasks for the authenticated user.
- Authorization: JWT token in header.
- Response: Array of task objects.

GET /api/tasks/id

- Description: Get specific tasks for the authenticated user by the task id.
- Authorization: JWT token in header.
- Response: Array of task objects.

POST /api/tasks

- Description: Create a new task.
- Authorization: JWT token in header.
- Request Body:
- title: String (required)
- description: String (required)
- Response: Created task object.

PUT /api/tasks/:id

- Description: Update an existing task.
- Authorization: JWT token in header.
- Request Body:
- title: String
- description: String
- Response: Updated task object.

DELETE /api/tasks/:id

- Description: Delete an existing task.
- Authorization: JWT token in header.
- Response: Message confirming deletion.
