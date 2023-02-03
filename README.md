# news

-RUN WITHOUT DOCKER-

SETUP news project (Make sure that Node.js (version >= 12, except for v13) is installed on your operating system and npm)

Requirments: 

	- Installed Node.js version >= 12 except for v13
	- Installed npm version >= 6
	- Running mongoDb

1. Need to fill initial credentials in .env file (database, admin, news... credentials)
2. In terminal run "npm run installAndRun" in root folder. This will:

	 -> install dependencies

	 -> run seeders for dummy/test data (make sure you fill admin credentials)

     ->start server

3. Open http://localhost:3000/api and start you're ready to go :P

4. In database/seeds/01_users.ts is list of users and their passwords

5. Exported postman collection with request samples is in root of project