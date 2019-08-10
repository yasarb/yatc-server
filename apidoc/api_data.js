define({ "api": [
  {
    "type": "post",
    "url": "/auth/signin",
    "title": "Sign In",
    "version": "1.0.0",
    "name": "SignIn",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Token to be used to make authenticated requests</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 200",
          "content": "HTTP/1.1 200 OK\n{\n  \"accessToken\": \"eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Some of required fiels (username &amp; password) are missing.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Given credentials are incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 400",
          "content": "HTTP/1.1 400 Bad Request\nBad Request",
          "type": "text"
        },
        {
          "title": "Error-Response: 401",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"statusCode\": 401,\n    \"error\": \"Unauthorized\",\n    \"message\": \"Incorrect username or password.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/auth/auth.controller.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/signout",
    "title": "Sign Out",
    "version": "1.0.0",
    "name": "SignOut",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "ABC",
            "description": "<p>ABCDEF</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Given token is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 401",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"statusCode\": 401,\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/auth/auth.controller.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/signup",
    "title": "Sign Up",
    "version": "1.0.0",
    "name": "SignUp",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>User's language code.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>User's unique identifier</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 200",
          "content": "HTTP/1.1 200 OK\n{\n  \"userId\": 123,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Some of required fiels are missing.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Given credentials are invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 400",
          "content": "HTTP/1.1 400 Bad Request\nBad Request",
          "type": "text"
        },
        {
          "title": "Error-Response: 401",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"statusCode\": 401,\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/auth/auth.controller.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/users/:id",
    "title": "User Profile",
    "version": "1.0.0",
    "name": "Profile",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique identifier number.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User model</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 200",
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\": 1,\n    \"username\": \"testuser\",\n    \"password\": \"$2a$04$EMrm/P79Fv.c4HotqPDZpOzDzr9Y9aUAU0gji7kiRSywv7wFWV6A2\",\n    \"email\": \"abc@def.com\",\n    \"lang\": \"tr\",\n    \"photoId\": -1,\n    \"registeredAt\": \"2019-08-10T15:17:55.163Z\",\n    \"isActive\": true,\n    \"followingCount\": 123,\n    \"followerCount\": 45,\n    \"likeCount\": 652,\n    \"videoList\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No user found with given user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 404",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"statusCode\": 404,\n    \"error\": \"Not Found\",\n    \"message\": \"`User not found with given id: 1\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/users/users.controller.ts",
    "groupTitle": "User"
  }
] });
