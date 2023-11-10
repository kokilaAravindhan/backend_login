import mongoose from "mongoose";
import dotenv from "dotenv";



dotenv.config();

const username = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';
const clusterName = process.env.DB_CLUSTERNAME || '';
const dbName = process.env.DB_NAME || '';

// Cloud DB Connection
const cloudUrl = `mongodb+srv://${username}:${password}@${clusterName}/logindb?retryWrites=true&w=majority`;

const connectToDb = async () => {
  try {
    await mongoose.connect(cloudUrl);
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default connectToDb;