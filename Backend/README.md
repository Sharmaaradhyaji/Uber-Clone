Backend/README.md

# User Registration API

## Endpoint: `/users/register`

### Description
This endpoint allows users to register by providing their first name, last name, email, and password. The endpoint validates the input data and creates a new user in the database.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `fullname.firstname`: (string) The first name of the user. Must be at least 3 characters long.
- `fullname.lastname`: (string) The last name of the user. Must be at least 3 characters long.
- `email`: (string) The email address of the user. Must be a valid email format.
- `password`: (string) The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}

Responses
Success
Status Code: 201 Created

Response Body:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id_here",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}

Validation Errors
Status Code: 400 Bad Request
Response Body:
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}

Server Error
Status Code: 500 Internal Server Error
Response Body:
{
  "message": "Server Error"
}

Example request
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