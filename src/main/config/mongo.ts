import { MongoClient } from 'mongodb'
import { MONGO_DATABASE_URI } from '_/presentation/constants'

let mongoClient: MongoClient

async function connect (uri: string): Promise<void> {
    mongoClient = await MongoClient.connect(uri)
    console.log("Successfully conected to the database!")
}

connect(MONGO_DATABASE_URI)

export { mongoClient }