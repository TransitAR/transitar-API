import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  /* https://mongoosejs.com/docs/api.html#connection_Connection-readyState */
  if (mongoose.connection.readyState) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
}
