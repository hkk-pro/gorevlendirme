import { MongoClient } from 'mongodb'
const url = process.env.MONDODB_URI || `mongodb://localhost:27017/myorganizer`;
let db = null;

export async function connectDB() {
    try {
        if (db) return db;
        let client = await MongoClient.connect(url, { useNewUrlParser: true })
        db = client.db()
        return db;

    } catch (error) {
        console.info('whats problem', error)

    }


}

