import dotenv from "dotenv";
dotenv.config();
export default {
    PORT: process.env.PORT || 5000,
    DB_COLLECTION_STRING: process.env.DB_COLLECTION_STRING,
  };