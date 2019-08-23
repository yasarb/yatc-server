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
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Unique identifier for logged User</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Unique name of logged User</p>"
          },
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
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\": 1,\n    \"username\": \"admin\",\n    \"accessToken\": \"eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k\",\n}",
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
            "description": "<p>Authenticated User's access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Authorization\": \"Bearer eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "NoContent",
            "description": "<p>Successfully logged out.</p>"
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
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"statusCode\": 401,\n    \"error\": \"Unauthorized\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\": 123,\n}",
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
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"statusCode\": 400,\n    \"error\": \"Bad Request\",\n    \"message\": [\n        {\n            \"target\": {},\n            \"property\": \"username\",\n            \"children\": [],\n            \"constraints\": {\n                \"maxLength\": \"username must be shorter than or equal to 32 characters\",\n                \"isAlphanumeric\": \"username must contain only letters and numbers\",\n                \"isNotEmpty\": \"username should not be empty\"\n            }\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: 401",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"statusCode\": 401,\n    \"error\": \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/auth/auth.controller.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/posts",
    "title": "Create a post",
    "version": "1.0.0",
    "name": "CreatePost",
    "group": "Post",
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
          "content": "{\n    \"Authorization\": \"Bearer eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "optional": false,
            "field": "Create",
            "description": "<p>Post is created successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 201",
          "content": "HTTP/1.1 201 Created\n{\n    \"postId\": \"TURK6PFAL\",\n    \"text\": \"Lorem ipsum dolar sit amet\",\n    \"authorId\": 3,\n    \"createdAt\": \"2019-08-10T15:17:55.163Z\",\n}",
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
            "description": "<p>Given credentials are incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 400",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"statusCode\": 400,\n    \"error\": \"Bad Request\",\n    \"message\": [\n        {\n            \"target\": {},\n            \"property\": \"text\",\n            \"children\": [],\n            \"constraints\": {\n                \"maxLength\": \"text must be shorter than or equal to 150 characters\",\n                \"isString\": \"text must be a string\",\n                \"isNotEmpty\": \"text should not be empty\"\n            }\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: 401",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"statusCode\": 401,\n    \"error\": \"Unauthorized\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/posts/posts.controller.ts",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/posts/:id",
    "title": "Retrieve a post",
    "version": "1.0.0",
    "name": "GetPost",
    "group": "Post",
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
          "content": "{\n    \"Authorization\": \"Bearer eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post's unique identifier number.</p>"
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
            "field": "post",
            "description": "<p>Post model</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 200",
          "content": "HTTP/1.1 200 OK\n{\n    \"postId\": \"DTRNrC9ma\",\n    \"text\": \"To be or not to be\",\n    \"authorId\": 1,\n    \"createdAt\": \"2019-08-23T21:10:23.404Z\"\n}",
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
            "description": "<p>No post found with given post id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 404",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"statusCode\": 404,\n    \"error\": \"Not Found\",\n    \"message\": \"Post with given id was not found.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/posts/posts.controller.ts",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "User Profile",
    "version": "1.0.0",
    "name": "Profile",
    "group": "User",
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
          "content": "{\n    \"Authorization\": \"Bearer eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k\"\n}",
          "type": "json"
        }
      ]
    },
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
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\": 1,\n    \"username\": \"testuser\",\n    \"email\": \"abc@def.com\",\n    \"lang\": \"tr\",\n    \"profilePhotoUrl\": \"\",\n    \"profileBannerUrl\": \"\",\n    \"registeredAt\": \"2019-08-10T15:17:55.163Z\",\n    \"isAdmin\": false,\n    \"isActive\": true,\n    \"isPrivate\": false,\n    \"isVerified\": false,\n}",
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
