let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
import { connectDB } from './connect-db'
import './initialize-db';
import { authenticationRoute } from './authenticate'
let path = require('path')
const favicon = require("serve-favicon");
const logger = require("morgan");
require("dotenv").config();

let port = process.env.PORT || 7777;
let app = express()

// set middleware 
app.use(logger("dev"));
app.use(express.json());
app.use(favicon(path.join(dirname, "build", "favicon.ico")));
app.use(express.static(path.join(dirname, "build")));

app.use(
    cors(),
    //thes body parser allow us to use post requests
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
)

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
    app.use(express.static(path.resolve(__dirname, `../../dist`)));
    app.get('/*', "build", (req, res) => {
        res.sendFile(path.resolve('index.html'));
    })
}

// here is to communicate with data base to write a function

export const addNewTask = async task => {
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    await collection.insertOne(task);

}

export const updateTask = async task => {
    let { id, group, isComplete, name } = task;
    let db = await connectDB();
    let collection = db.collection(`tasks`)

    if (group) {
        await collection.updateOne({ id }, { $set: { group } })
    }
    if (name) {
        await collection.updateOne({ id }, { $set: { name } })
    }
    if (isComplete != undefined) {
        await collection.updateOne({ id }, { $set: { isComplete } })
    }
}

app.post('/task/new', async (req, res) => {
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send()
})

app.post('/task/update', async (req, res) => {

    let task = req.body.task;
    await updateTask(task);
    res.status(200).send()
})


app.listen(port, console.log('i am listening at ', port))