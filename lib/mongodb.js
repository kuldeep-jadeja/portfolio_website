import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// MongoClient singleton with global caching for dev hot-reload safety
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function getDb() {
  if (!uri || !dbName) {
    const error = new Error('MongoDB is not configured. Set MONGODB_URI and MONGODB_DB in .env.local');
    error.code = 'MONGODB_CONFIG_MISSING';
    throw error;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    cached.promise = MongoClient.connect(uri, options).then((client) => {
      return client.db(dbName);
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
