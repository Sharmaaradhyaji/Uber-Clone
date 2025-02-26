# Backend API Documentation

## User Registration API

### Endpoint: `/users/register`

#### Description
This endpoint allows users to register by providing their first name, last name, email, and password. The endpoint validates the input data and creates a new user in the database.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:

- `fullname.firstname`: (string) The first name of the user. Must be at least 3 characters long.
- `fullname.lastname`: (string) The last name of the user. Must be at least 3 characters long.
- `email`: (string) The email address of the user. Must be a valid email format.
- `password`: (string) The password for the user. Must be at least 6 characters long.

#### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

**Success Response**

**Status Code:** `201 Created`

**Response Body:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id_here",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}
```

**Validation Errors**

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" },
    { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
  ]
}
```

**Server Error**

**Status Code:** `500 Internal Server Error`

**Response Body:**
```json
{
  "message": "Server Error"
}
```

#### Example cURL Request
```sh
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "password123"
      }'
```

---

## User Login API

### Endpoint: `/users/login`

#### Description
Authenticates a user with the provided email and password. The endpoint validates the input data, checks the credentials, and returns a JWT token for authentication along with the user details.

#### Method
`POST`

#### Request Body

| Field     | Type   | Description                  | Validation              |
|-----------|--------|------------------------------|--------------------------|
| `email`   | string | User's email address         | Must be a valid email format |
| `password`| string | User's password              | Must be at least 6 characters |

#### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

**Success Response**

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id_here",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}
```

**Error Responses**

**Validation Error** (`400 Bad Request`)
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
  ]
}
```

**Invalid Credentials** (`401 Unauthorized`)
```json
{
  "message": "Invalid credentials"
}
```

**Server Error** (`500 Internal Server Error`)
```json
{
  "message": "Server Error"
}
```

---

## Captain Registration API

### Endpoint: `/captains/register`

#### Description
This endpoint allows captains to register by providing their full name, email, password, and vehicle details.

#### Method
`POST`

#### Request Body
```json
{
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Responses

**Success Response**

**Status Code:** `201 Created`

**Response Body:**
```json
{
  "token": "jwt_token_here",
  "captain": {
    "id": "captain_id_here",
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Validation Errors** (`400 Bad Request`)
```json
{
  "errors": [
    { "msg": "First name must be at least 3 characters long", "param": "fullname", "location": "body" },
    { "msg": "Please enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

**Server Error** (`500 Internal Server Error`)
```json
{
  "message": "Server Error"
}
```

---

## Captain Profile API

### Endpoint: `/captains/profile`

#### Description
Fetches the profile of the authenticated captain.

#### Method
`GET`

#### Responses

**Success Response**

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "id": "captain_id_here",
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Unauthorized** (`401 Unauthorized`)
```json
{
  "message": "Unauthorized"
}
```

**Server Error** (`500 Internal Server Error`)
```json
{
  "message": "Server Error"
}
```

---

## Implementation Details
- Passwords are hashed using bcrypt.
- JWT token is generated using the captain's ID for authentication.
- Input validation is performed using express-validator.
- Captain data is stored in MongoDB using mongoose.

