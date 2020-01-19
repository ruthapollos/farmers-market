## farmers-market-backend

This project uses express to expose API endpoints. This module interacts with a locally installed MongoDB database to read data.

### Prerequisites

+ Download and install [MongoDB](https://www.mongodb.com/download-center)
+ If using Mac OS, MongoDB can be installed using [Homebrew](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
+ Download data of farmers markets in the US from this [link](https://catalog.data.gov/dataset/farmers-markets-geographic-data)
+ Load the downloaded data into the MongoDB (Using a tool like Studio 3T allows to import data from csv to MongoDB easily)


### Available Scripts

In the project directory, you can run:

### `npm install`

Downloads the dependencies of the project

### `npx babel-node src/server.js`

Runs the server in the development mode.<br />
The endpoints are exposed in [http://localhost:8000/api/farmers-market/*](http://localhost:8000) 

