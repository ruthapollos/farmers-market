import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const farmapp = express();
var cors = require('cors')
farmapp.use(cors())

farmapp.use(bodyParser.json());

// this endpoint returns a unique list of states
farmapp.get('/api/farmers-market/state', async(req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', 
                {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('farmers-market');
        const stateInfo = await db.collection("locations").distinct("State");
        console.log(stateInfo);
        var states = [];
        var index;
        for(index=0; index<stateInfo.length; index++)
            states.push(getStateResponse(stateInfo[index]));

        console.log(states);

        res.status(200).json(states);
        client.close();
    } catch(error){
        console.error(error.stack);
        res.status(500).json({message:'Error connecting to db', error});
    }
})

// this api returns the farmers markets for a given state
farmapp.get('/api/farmers-market/:state', async(req, res) => {
    try {
        const farmerState = req.params.state;
        const client = await MongoClient.connect('mongodb://localhost:27017', 
                {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('farmers-market');
        const propArray = await db.collection("locations").find({State: farmerState}).toArray();

        var markets = [];
        var i;
        for(i=0; i<propArray.length; i++)
            markets.push(getStandardResponse(propArray[i].MarketName, propArray[i].Website, 
                propArray[i].street, propArray[i].city, propArray[i].zip, propArray[i].x, propArray[i].y));

        console.log(markets);

        res.status(200).json(markets);
        client.close();
    } catch(error){
        console.error(error.stack);
        res.status(500).json({message:'Error connecting to db', error});
    }
})

// helper function used to contruct the json response
function getStandardResponse(marketname, website, street, city, zip, longitude, latitude){
    return {
        marketname: marketname,
        website : website,
        street : street,
        city : city,
        zip : zip,
        longitude : longitude,
        latitude : latitude
     }
}

function getStateResponse(stateName){
    return {
        stateName: stateName,
        stateValue: stateName
     }
}

farmapp.listen(8000,() => console.log('Listening on port 8000'));