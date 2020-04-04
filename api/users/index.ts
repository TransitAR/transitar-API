import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { connectDB } from "../../setup/connect.db";
import User from "../../models/user.model";

export default async function VetsApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Post) {
    res.status(Status.Ok).end();
  } else if (req.method === Methods.Put) {
    res.status(Status.Ok).end();
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
