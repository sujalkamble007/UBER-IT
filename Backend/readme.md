# Backend API Documentation

## /user/register

This endpoint is responsible for registering a new user in the system. It validates the user's input and creates a new user account.

## Method
POST

## Request Body
The request body should be a JSON object with the following fields:

- `fullName`: An object containing the user's first and last names.
  - `firstname`: The user's first name (String, required, minimum length of 3 characters).
  - `lastname`: The user's last name (String).
- `email`: The user's email address (String, required, must be a valid email format).
- `password`: The user's password (String, required, minimum length of 6 characters).

Example:
```json
{
  "fullName": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

## Response

### Success (201 Created)
Returns a JSON object containing:

- `token`: A JWT token for authenticating the user.
- `user`: The user object that was created.

Example:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f0c7a2e5a7b2b3c8d9e0a1",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "__v": 0
  }
}
```

### Error (400 Bad Request)
Returns a JSON object containing an array of errors if the input is invalid. Each error object contains a `msg` field with a description of the error.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First Name must be at least 3 characters long",
      "param": "fullName.firstname",
      "location": "body"
    }
  ]
}
```

## /user/login

This endpoint is responsible for logging in an existing user. It validates the user's input and returns a JWT token if the credentials are correct.

## Method
POST

## Request Body
The request body should be a JSON object with the following fields:

- `email`: The user's email address (String, required, must be a valid email format).
- `password`: The user's password (String, required, minimum length of 6 characters).

Example:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Response

### Success (200 OK)
Returns a JSON object containing:

- `token`: A JWT token for authenticating the user.
- `user`: The user object that was authenticated.

Example:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f0c7a2e5a7b2b3c8d9e0a1",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "__v": 0
  }
}
```

### Error (400 Bad Request)
Returns a JSON object containing an array of errors if the input is invalid. Each error object contains a `msg` field with a description of the error.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}

### Error (401 Unauthorized)
Returns a JSON object with a message if the email or password is incorrect.

Example:
```json
{
  "message": "Invalid Email or Password"
}
```

## /user/profile

This endpoint is responsible for retrieving the profile of the authenticated user.

## Method
GET

## Headers
- `Authorization`: Bearer token for authenticating the user.

Example:
```
Authorization: Bearer <token>
```

## Response

### Success (200 OK)
Returns a JSON object containing the authenticated user's profile.

Example:
```json
{
  "user": {
    "_id": "64f0c7a2e5a7b2b3c8d9e0a1",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "__v": 0
  }
}
```

### Error (401 Unauthorized)
Returns a JSON object with a message if the user is not authenticated.

Example:
```json
{
  "message": "Unauthorized"
}
```

## /users/logout

This endpoint is responsible for logging out the authenticated user.

## Method
GET

## Headers
- `Authorization`: Bearer token for authenticating the user.

Example:
```
Authorization: Bearer <token>
```

## Response

### Success (200 OK)
Returns a JSON object with a message indicating the user has been logged out.

Example:
```json
{
  "message": "Logged Out"
}
```

### Error (401 Unauthorized)
Returns a JSON object with a message if the user is not authenticated.

Example:
```json
{
  "message": "Unauthorized"
}
```

## /captain/register

This endpoint is responsible for registering a new captain in the system. It validates the captain's input and creates a new captain account.

## Method
POST

## Request Body
The request body should be a JSON object with the following fields:

- `fullName`: An object containing the captain's first and last names.
  - `firstname`: The captain's first name (String, required, minimum length of 3 characters).
  - `lastname`: The captain's last name (String, required, minimum length of 3 characters).
- `email`: The captain's email address (String, required, must be a valid email format).
- `password`: The captain's password (String, required, minimum length of 6 characters).
- `vehicle`: An object containing the vehicle details.
  - `color`: The vehicle's color (String, required, minimum length of 3 characters).
  - `plate`: The vehicle's plate number (String, required, minimum length of 6 characters).
  - `capacity`: The vehicle's capacity (Number, required, minimum value of 1).
  - `vehicleType`: The type of vehicle (String, required, must be one of 'car', 'motorcycle', 'auto').

Example:
```json
{
  "fullName": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Response

### Success (201 Created)
Returns a JSON object containing:

- `token`: A JWT token for authenticating the captain.
- `captain`: The captain object that was created.

Example:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f0c7a2e5a7b2b3c8d9e0a1",
    "fullName": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "__v": 0
  }
}
```

### Error (400 Bad Request)
Returns a JSON object containing an array of errors if the input is invalid. Each error object contains a `msg` field with a description of the error.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First Name must be at least 3 characters long",
      "param": "fullName.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 6 characters long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid Vehicle Type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
