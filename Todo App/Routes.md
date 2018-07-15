# Todo API

Simple API for Todo application that support multiple users and [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) for the todos

## Routes

### `POST /users`

Creates a new user. If a user is sent without name, email, or age you should return error message with status code `400 bad request`. See [`res.status()`](https://expressjs.com/en/4x/api.html#res.status)

Request:
```js
{
  name: String,
  email: String,
  age: Number
}
```


Response:
```js
{
  _id: ObjectId,
  name: String,
  email: String,
  age: Number
}
```

### `GET /users`

Return list of all users.

Response:
```js
[{
  _id: ObjectId,
  name: String,
  email: String,
  age: Number
}]
```

### `GET /users/:id`

Get specific user by his id (aka. \_id)

Response:
```js
{
  _id: ObjectId,
  name: String,
  email: String,
  age: Number
}
```

### `POST /users/:id/todos`

Create a new todo for the user with default state (done: false).

Request:
```js
{
  title: String,
  description: String
}
```

Response:
```js
{
  _id: ObjectId,
  title: String,
  description: String,
  done: false
}
```

### `GET /users/:id/todos`

Get list of todos for specific user returning only \_id, title and done. With the ability to filter todos (optionally) by done status using query (aka. `?done=false` or `?done=true`).

Response:
```js
[{
  _id: ObjectId,
  title: String,
  done: Boolean
}]
```

### `GET /users/:userId/todos/:todoId`

Get specific todo by `todoId`. If the todo doesn't belong to user with `userId` return error message with status code `403 forbidden`

Response:
```js
{
  _id: ObjectId,
  title: String,
  description: String,
  done: Boolean
}
```

### `PATCH /users/:userId/todos/:todoId`

Update specific todo by `todoId`. If the todo doesn't belong to user with `userId` return error message with status code `403 forbidden`

Request:
```js
{
  done: Boolean
}
```

Response:
```js
{
  _id: ObjectId,
  title: String,
  description: String,
  done: Boolean
}
```

### `DELETE /users/:userId/todos/:todoId`

Delete specific todo by `todoId`. If the todo doesn't belong to user with `userId` return error message with status code `403 forbidden`

Response:
Status code `204 No Content`
