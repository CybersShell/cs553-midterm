# Midterm

Name: Andrew Noah Woodlee

## Part 1

1. A raw TCP socket provides a open port that can receive one-line commands.

An HTTP server adds a protocol with headers, request bodies, and responses. It can accept JSON and structured text and custom headers.

Web APIs do not expose raw sockets directly because there are usually request bodies and authentication headers and responses in JSON form.

2. A client sends a request to a server, which then responds with data. It could be JSON, or simple words.

A TCP command server accepts a command with some argument and sends back whatever the output of the command is.

An HTTP API on the other hand, can send and recieve data in JSON or XML or a structured format. A route is used along with a method like `GET` or `POST`. Required data is sent with the request, usually JSON. The server checks the data for errors, and if none are found the server completes the request and sends back a status code and optional response data.

An Express route handler handles requests in the callback function and an responses (unless there is an uncaught error and there is no try-catch block) are handled by the callback. The developer chooses when and how to send a response. The route may also have query parameters and a request body that may or may not be used in the route.

3. A stateless API is one that does not store any information between requests. The client must send all login information with each request. An advantage to this architecture is scalability as servers do not need to handle or keep track of session information. A disadvatage to this architecture is that a stateless API cannot be used for realtime communication apps or other apps that require state.

4. 

| Situation | Status Code | Justification |
|-----------|-------------|---------------|
| A new resource was sucessfully created | 201 | Everything completed without error |
| The client requested an item that does not exist | 404 | The resource is not found |
| The client sent JSON missing a required field | 400 | The detected the incorrect JSON |
| The server had an unexpected error | 500 | A backend error occured somewhere in the stack |
| A successful request returns JSON data | 200 | Request is OK |

## Part 2

1. 

| Route     | Description   |
|-----------|---------------|
|  `/tasks` | Get all tasks   |
|  `/task/:id` | Get one task by ID |
|  `/task` | Create task |
|  `/task/:id` | Replace task |
|  `/task/:id` | Update task  |
|  `/task/:id` | Delete task  |

2. 

| Route     | Description           | Method - is it safe or idempotent |
|-----------|-----------------------|--------|
|  `/tasks` | Get all tasks         | GET - both, as get only reads information |
|  `/task/:id` | Get one task by ID | GET - both, as get only reads information |
|  `/task` | Create task            | POST - neither, alters state and processes data |
|  `/task/:id` | Replace task       | PUT - not safe, alters state; is idempotent as the same result is returned barring any errors      |
|  `/task/:id` | Update task  |       PATCH - not safe, alters state. is idempotent as the same result is returned     |
|  `/task/:id` | Delete task  | DELETE - not safe, alters state. is idempotent as the same result is returned |


3. 

`id` will be added automatically by the database.


```json
{
  "title": "Watch Project lecture",
  "course": "CS553",
  "completed": false
}
```

## Part 3

The server that implements the API in in `src`.

Run `npm i` in the root to install dependencies. 

Run `node src/server.js` to start the server.

Run `node src/client.js` to run the client.

## Part 4

Having validation functions in middleware allows central update or creation validation to be handled when routes are called. You can set `req.Task` for instance and have everything validated without poluting the route handler. Also stops typos.

Two middleware were created as prescribed.

## Part 5

The client is in `src/client.js`.

## Part 6

There is an `openapi.yaml` file in the root.

## Part 7

1. The OpenAPI file documents the routes, methods, responses, and requests the server implements and expects. However, the actual handling is the Express route handler. One documents the other's behavior. These two may not be up-to date.

2. Code and OpenAPI documentation can drift apart in the following ways:
  - Routes or resposes might be changed in either before anything is updated
      - For example, I might update a route to return a JSON body but the OpenAPI document does not reflect that
  - Speed, quite simply
      - Going too fast for OpenAPI to be updated is a possibility

3. Inaccurate API documentaion can cause problems for developers because of the debugging that has to happen for example because of a missing field or bad response data.

## Part 8


Option A — Architecture Critique

Users should have its own service because authentication and authorization middleware will have to call it. And the client might update parts of the user profile. Notifications can remain in the user service as this is mainly for users (clients).

Assignments would be its own service. The service would have to have admin-only routes that are checked using authorization middleware so clients can't change things. Middleware would check for authorization as well as for uploading assignments by users.

Grades would stay in the user service as its a natural coupling because grades can be changed by the teacher. Middleware could check for authorization to change grades.

Tasks could be its own seperate service. Users could create tasks for themselves, but teachers could also create tasks for the whole class.