import {
  Database,
  MongoDBConnector,
  MySQLConnector,
  PostgresConnector,
  SQLite3Connector,
} from "https://deno.land/x/denodb@v1.0.38/mod.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

const env = config({ safe: true });
const connector: any = {
  mongo: new MongoDBConnector({ uri: env.MONGO_URI, database: env.DB_NAME }),
  mysql: new MySQLConnector({
    host: env.DB_HOST || "localhost",
    port: +env.DB_PORT || 3306,
    database: env.DB_NAME,
    username: env.DB_USER || "root",
    password: env.DB_PASSWORD,
  }),
  postgres: new PostgresConnector({
    host: env.DB_HOST || "localhost",
    port: +env.DB_PORT || 5432,
    database: env.DB_NAME,
    username: env.DB_USER || "postgres",
    password: env.DB_PASSWORD,
  }),
  sqlite: new SQLite3Connector({
    filepath: env.SQLITE_DB_PATH,
  }),
};

const database = new Database(connector[env.DB_DRIVER]);

export { database };

// const atlasConnector = new MongoDBConnector({
//   db: "deno",
//   tls: true,
//   servers: [
//     {
//       host: "bwa-mern-shard-00-00.s9qx0.mongodb.net",
//       port: 27017,
//     },
//     {
//       host: "bwa-mern-shard-00-01.s9qx0.mongodb.net",
//       port: 27017,
//     },
//     {
//       host: "bwa-mern-shard-00-02.s9qx0.mongodb.net",
//       port: 27017,
//     },
//   ],
//   credential: {
//     username: "master",
//     password: "ZgxlkNIgH7UaFRtI",
//     db: "deno",
//     mechanism: "SCRAM-SHA-1",
//   },
//   database: "deno",
// });
