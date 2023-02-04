import { Collection } from "mongodb";
import { DatabaseRepository } from "_/data/protocols/repositories/databaseRepository";
import { QueryOptions } from "_/data/protocols/repositories/options";
import { mongoClient } from "_/main/config/mongo";
import { parseArgsToMongo } from "../helpers/parseMongoArgs";

export class MongoDatabaseRepository implements DatabaseRepository {
    
    private readonly collection: Collection

    constructor(collectionName: string){
        this.collection = this.getCollection(collectionName)
    }

    private getCollection(collectionName: string){
        return mongoClient.db().collection(collectionName)
    }

   async getOneById<T>(id: string): Promise<T> {
        const response = await this.collection.findOne({ id }, { projection: { _id: 0 }})
        return response as T
    }
    
   async getAll<T>(args?: QueryOptions): Promise<T[]> {
        const { filter, order } = parseArgsToMongo(args)
        const response = await this.collection.find(filter, { projection: { _id: 0 }}).sort(order).toArray()
        return response as T[]
    }

    async createOrReplace(data: any, id?: string): Promise<void> {
        await this.collection.insertOne({ id, ...data })
    }

    async update(data: any, id: string): Promise<void> {
        await this.collection.updateOne({ id }, { $set: data }, {
            upsert: true
        })    
    }

    async delete(id: string): Promise<void> {
        await this.collection.deleteOne({ id })
    }
}