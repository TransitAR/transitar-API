import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { VetsController } from "./_vets.controller";
import { connectDB } from "../../setup/connect.db";

export default async function HostsApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    if (req.query.id) {
      VetsController.getVet(req, res);
    } else {
      VetsController.getVets(req, res);
    }
  } else if (req.method === Methods.Post) {
    VetsController.addVet(req, res);
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
