import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { RefugesController } from "./_refuges.controller";
import { connectDB } from "../../setup/connect.db";

export default async function RefugeApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    if (req.query.id) {
      RefugesController.getRefuge(req, res);
    } else {
      res.status(Status.BadRequest).send("Bad request");
    }
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}