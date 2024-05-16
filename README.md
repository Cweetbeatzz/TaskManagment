//#############################################################

STEP 1 === (NECESSARY INFORMATIONS)

- npm install to install insatll node modules

- MongoDb was used to add data and test

- create user endpoints exist for Users and Task firstly a user must exist before creating a task

  //#############################################################

STEP 2 === (TESTING ENDPOINTS)

- Register a new user

- Login with the details of the new user created all routes a authenicated must be logged in or a bearer token must be provide to test endpoints

- Test any endpoint

  //#############################################################

STEP 3 === (STREAMING)

- for streaming socket.io was used testing in postman is also available via the websocket connection
  and for connecting via a frront end please use the socket.io-clent to connect to the socket

- after all these are setup any task mannagment request will be visible via the socket connection streaming the task

  //#############################################################

example of a task endpoint
in the url you can also use localhost instead of 0.0.0.0

http://0.0.0.0:3200/api/tasks ====> to create a task
http://0.0.0.0:3200/api/tasks ====> to get all tasks
http://0.0.0.0:3200/api/tasks/:id ====> to get a specific task
http://0.0.0.0:3200/api/tasks/:id ====> to update a task
http://0.0.0.0:3200/api/tasks/:userId/:id ====> to delete a task
