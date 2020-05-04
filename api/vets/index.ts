import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { VetsController } from "./_vets.controller";
import { connectDB } from "../../setup/connect.db";

export default async function VetsApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    VetsController.getVets(req, res);
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
