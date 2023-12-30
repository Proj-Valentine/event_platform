import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;


// Hold a cahced connection to the datatbase to avoid reconnecting everytime we need to make a query
//  tomanage database connection efficiently in a serverless environment, each invocation of a function will consume database resources
// eg using  server actions may require repeated invocations but by caching connection we can avoid this and can use the csched connection/promise or create a new one if it does not exist
let cached = (global as any).mongoose || {conn:null, promise:null}

export const connectToDatabase = async () => {
  if(cached.conn){
    return cached.conn
  }

  if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false, // Disable mongoose buffering
})

//   if(!cached.promise){
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       bufferCommands: false,
//       bufferMaxEntries: 0,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     }
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose
//     })
//   }

  cached.conn = await cached.promise
  return cached.conn
}