import { model, Schema } from "mongoose";
import { IUser } from "./interfaces/user.interface";

const UserSchema: Schema = new Schema({
  // Auth0
  id: {
    type: String,
    required: true, // this is the Auth0 ID which we'll use to relate both DBs
  },
  // tenant: String, // "refugiar",
  // username: String, // "user1",
  email: {
    type: String,
    required: true,
  }, // "user1@foo.com",
  // emailVerified: Boolean,
  // phoneNumber: String,
  // phoneNumberVerified: Boolean,
  // user_metadata: object,
  // app_metadata: object,

  mobilePhone: Number,
  landlinePhone: Number,
});

export default model<IUser>("User", UserSchema);
