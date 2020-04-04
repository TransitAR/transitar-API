import { Document } from "mongoose";

export interface IUser extends Document {
  // Auth0
  id: string;
  // tenant: string; // "refugiar",
  // username: string; // "user1",
  email: string; // "user1@foo.com",
  emailVerified: boolean;
  // phoneNumber: string;
  // phoneNumberVerified: boolean;
  // user_metadata: object;
  // app_metadata: object;
}
