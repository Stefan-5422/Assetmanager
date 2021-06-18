const Mongo = require('mongodb')
const uri = 'mongodb://localhost:8081/assets'

const Asset = require('./asset')

const insert = async (asset) => {
    const client = Mongo.MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect()
        const database = await client.db('admin')

        const assets = await database.collection("assets")


        await assets.insertOne(asset.serialize())

    } catch {
        await client.close()
    }
}

const getbyId = async (id) => {
    const client = Mongo.MongoClient(uri, { useUnifiedTopology: true });
    let asset
    try {
        await client.connect()
        const database = await client.db('admin')
        console.log("connected to db")

        const assets = await database.collection("assets")

        asset = await assets.findOne({ "id": id })
    } catch {
        await client.close()
    }
    return asset
}

const getAll = async () => {
    const client = Mongo.MongoClient(uri, { useUnifiedTopology: true });
    let cursor
    try {
        await client.connect()
        const database = client.db('admin')

        const assets = database.collection("assets")

        cursor = assets.find()
        } catch {
        await client.close()
    }
    return await cursor.toArray()
}

const deleteId = async () => {
    const client = Mongo.MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect()
        const database = await client.db('admin')

        const assets = await database.collection("assets")

        await assets.deleteOne({ "id": id })
    } catch {
        await client.close()
    }
}

module.exports = { insert, getbyId, getAll, deleteId }