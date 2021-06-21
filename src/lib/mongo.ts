import { Db, FilterQuery, MongoClient, ObjectID } from 'mongodb';

import config from '../config';

const USER = encodeURIComponent(config.db.user as string);
const PASSWORD = encodeURIComponent(config.db.password as string);
const HOST = config.db.host;
const NAME = config.db.name;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${NAME}?retryWrites=true&w=majority`;

class MongoLib<T> {
  private static db: Promise<Db>;

  private client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  private dbName = NAME as string;

  private connect() {
    if (!MongoLib.db) {
      MongoLib.db = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log('[mongo] Connected succesfully');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.db;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getAll(collection: string, query?: FilterQuery<any>): Promise<T[]> {
    return this.connect().then((db) => db.collection(collection).find(query).toArray());
  }

  public get(collection: string, id: string): Promise<T> {
    return this.connect().then((db) =>
      db.collection(collection).findOne({ _id: new ObjectID(id) }),
    );
  }

  public create(collection: string, data: T): Promise<T> {
    return this.connect()
      .then((db) => db.collection(collection).insertOne(data))
      .then((result) => result.insertedId);
  }

  public update(collection: string, id: string, data: Partial<T>): Promise<string> {
    return this.connect()
      .then((db) =>
        db
          .collection(collection)
          .updateOne({ _id: new ObjectID(id) }, { $set: data }, { upsert: true }),
      )
      .then(() => id);
  }

  public delete(collection: string, id: string): Promise<string> {
    return this.connect()
      .then((db) => db.collection(collection).deleteOne({ _id: new ObjectID(id) }))
      .then(() => id);
  }
}

export default MongoLib;
