import { Model, DataTypes } from "https://deno.land/x/denodb@v1.0.38/mod.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

import { database } from "../utils/databaseConnection.ts";

class Post extends Model {
  static table = "post";
  static timestamps = true;
  static fields = {
    _id: {
      type: config().DB_DRIVER !== "mongo" ? DataTypes.UUID : undefined,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      length: 100,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      as: "is_published",
    },
    content: {
      type: DataTypes.TEXT,
    },
  };
  static defaults = {
    isPublished: false,
  };
}

database.link([Post]);

export { Post };
