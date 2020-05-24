import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { RefugesController } from "./_refuges.controller";
import { connectDB } from "../../setup/connect.db";

export default async function PetApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    if (req.query.identifier) {
      RefugesController.getRefuge(req, res);
    } else {
      res
        .status(Status.BadRequest)
        .send("Bad request, an identifier /[id] or /[displayName] is required");
    }
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
