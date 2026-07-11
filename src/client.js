import fetch from "node-fetch";

const appUrl = "http://localhost:3000"

async function logResponseBody(response) {
    var responseBody = await response.json()

    console.log(responseBody)
    console.log()
}

console.log("Testing /health")



let route = '/health' 
let options = {
	method: 'get',
	headers: {'Content-Type': 'application/json'}
}
let response = await fetch(`${appUrl}${route}`, options );

await logResponseBody(response)

console.log("Testing GET /api/tasks")

route = "/api/tasks"
response = await fetch(`${appUrl}${route}`, options );


await logResponseBody(response)

console.log()


console.log("Testing POST /api/tasks")

let taskData =  {
    title: 'Get API started',
    course: 'CS553',
    completed: true
}

response = await fetch(`${appUrl}/api/tasks`, {
    method: 'post',
    body: JSON.stringify(taskData),
	headers: {'Content-Type': 'application/json'}
});

await logResponseBody(response)

console.log()
console.log("Testing PUT /api/tasks/834")
console.log("Insert:")

taskData =  {
    title: 'Get API started',
    course: 'CS553',
    completed: true
}

response = await fetch(`${appUrl}/api/tasks/834`, {
    method: 'put',
    body: JSON.stringify(taskData),
	headers: {'Content-Type': 'application/json'}
});

await logResponseBody(response)
// await new Promise(r => setTimeout(r, 2000));
console.log("Replace:")
console.log()
taskData =  {
    title: 'Get Midterm done',
    course: 'CS553',
    completed: false
}

response = await fetch(`${appUrl}/api/tasks/834`, {
    method: 'put',
    body: JSON.stringify(taskData),
	headers: {'Content-Type': 'application/json'}
});


await logResponseBody(response)


console.log("Testing GET /api/tasks/834")
response = await fetch(`${appUrl}/api/tasks/834`, {
    method: 'get',
	headers: {'Content-Type': 'application/json'}
});


await logResponseBody(response)


console.log()
console.log("Testing PATCH /api/tasks/834")
console.log()

taskData =  {
    title: 'Get Lab 5 started',
    course: 'CS553',
    completed: false
}

response = await fetch(`${appUrl}/api/tasks/834`, {
    method: 'patch',
    body: JSON.stringify(taskData),
	headers: {'Content-Type': 'application/json'}
});

await logResponseBody(response)

console.log("Testing PATCH /api/tasks/1")
console.log()

taskData =  {
    title: 'Get route middleware done',
    course: 'CS553',
    completed: false
}

response = await fetch(`${appUrl}/api/tasks/1`, {
    method: 'patch',
    body: JSON.stringify(taskData),
	headers: {'Content-Type': 'application/json'}
});

await logResponseBody(response)

console.log("Testing PATCH /api/tasks/1")
console.log()

taskData =  {
    title: '',
    course: 'CS553',
    completed: false
}

response = await fetch(`${appUrl}/api/tasks/1`, {
    method: 'patch',
    body: JSON.stringify(taskData),
	headers: {'Content-Type': 'application/json'}
});

await logResponseBody(response)


console.log("Testing DELETE /api/tasks/834")
console.log()
response = await fetch(`${appUrl}/api/tasks/834`, {
    method: 'DELETE',
	headers: {'Content-Type': 'application/json'}
});

await logResponseBody(response)

