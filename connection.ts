import { Db, MongoClient } from "mongodb";

let mongoConnection:MongoClient | null = null;

// yatin300701
// BIOMk3TArNcLMhg9
export let db :Db | null = null;

export async function createConnections(){
    mongoConnection = await MongoClient.connect("mongodb+srv://yatin300701:BIOMk3TArNcLMhg9@employeeregister.5zqgcoc.mongodb.net/?retryWrites=true&w=majority")
    // mongoConnection = await MongoClient.connect(config.get("DB.MONGO_URI"));
  db = mongoConnection?.db("employeeRegister");
  return mongoConnection
}