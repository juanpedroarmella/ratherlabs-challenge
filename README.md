## Deploy in local

First you have to create a SQL database and pass the variables to a new .env file. In the root of the proyect you have an .env.example that can help you.

Example:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3001
API_URL = http://localhost:3000/api
```

Then execute the following commands:

Start dependencies and build the proyect:

```bash
yarn install
yarn build
yarn initdb
yarn start
```

Insert random data to the db:

```bash
yarn initdb
```

Start production server:

```bash
yarn start
```

## View online

The proyect is deployed on Railway service: https://ratherlabs-challenge.up.railway.app/



