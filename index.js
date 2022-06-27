const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

//Middleware
app.use(cors())
app.use(express.json())

//Mongodb


const uri = `mongodb+srv://car-mangment:ezlf7E5arOelTXHQ@cluster0.stqppqj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    await client.connect()
    const carCollection = client.db("car").collection("product");
    const orderCollection = client.db("order").collection("product");

    try {
        //Get Product
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = carCollection.find(query)
            const product = await cursor.toArray()
            res.send(product)
        })

        //get
        app.get("/product/:email", async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const services = carCollection.find(query)
            const product = await services.toArray()
            res.send(product)
        })
        //get
        app.get("/order/:email", async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const services =orderCollection.find(query)
            const product = await services.toArray()
            res.send(product)
        })

        //post data from clintSide
        app.post('/addcar', async (req, res) => {
            const data = req.body;
            const result = await carCollection.insertOne(data)
            res.send(result)
        })
        //post data from clintSide
        app.post('/order', async (req, res) => {
            const data = req.body;
            const result = await orderCollection.insertOne(data)
            res.send(result)
        })
        //Delete
        app.delete("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await carCollection.deleteOne(query);
            res.send(result);
        })

        //order 
        app.delete("/order/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {
        // client.close()
    }
}

run().catch(console.dir)





//Get
app.get('/', (req, res) => {
    res.send('car managment server is runnig')
})

//Listen
app.listen(port, () => {
    console.log("server is runnnig", port)
})