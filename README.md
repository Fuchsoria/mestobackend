# Mestobackend
Server part for the Mesto gallery site.
Test Link: https://mesto-api.fuchsoria.dev

### Functional:
| Request | Response |
|--|--|
| GET /users | JSON-list of all users |
| GET /users/{id} | JSON-user with identifier passed after /users|
| POST /users | Creates a user and returns JSON, accepts JSON input in body: `{ "name": "Name", "about": "About me", "avatar": "https://avatar.url" }`  |
| PATCH /users/me | Updates the profile and returns JSON, accepts input JSON in the body: `{ "name": "Name", "about": "About me" }` |
| PATCH /users/me/avatar | Updates user avatar and returns JSON, accepts JSON input in body: `{ "avatar": "https://avatar.url" }` |
| GET /cards | JSON-list of all cards |
| POST /cards | Creates a card and returns JSON, receives input JSON in body: `{ "name": "Card name", "link": "https://card.url" }`|
| PUT /cards/{cardId}/likes | Adds the user to the list of likes and returns a card |
| DELETE /cards/{cardId}/likes | Removes the user from the list of likes and returns the card |
| Nonexistent address | `{ "message": "The requested resource is not found" }` |


## Installation
For installation, you must have installed nodejs и npm.

Save the project to your computer:

    git clone https://github.com/Fuchsoria/mestobackend.git

In the root of the project, through the console / terminal, run the command:

    npm install
### After successful installation, the commands become available.: 
Raising a local server with a hotload:

    npm run dev
Starting production server:

    npm run start
