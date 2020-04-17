## farmers-market-backend

This project uses [Express](https://expressjs.com/) framework for Nodejs to expose API endpoints. This module interacts with a locally installed MongoDB database to read data.

### Prerequisites

+ Download and install [MongoDB](https://www.mongodb.com/download-center)
+ If using Mac OS, MongoDB can be installed using [Homebrew](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
+ Load the farmers market info to MongoDB using the import command  
  + mongoimport -d farmers-market -c locations --type csv --file farmers_market.csv --headerline


### Available Scripts

In the project directory, you can run:

#### `npm install`

Downloads the dependencies of the project

#### `npx babel-node src/server.js`

Runs the server in the development mode.<br />
The REST endpoints are exposed in [http://localhost:8000/api/farmers-market/*](http://localhost:8000) 

