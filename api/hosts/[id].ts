import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { HostsController } from "./_hosts.controller";
import { connectDB } from "../../setup/connect.db";

export default async function HostApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    if (req.query.id) {
      HostsController.getHost(req, res);
    } else {
      res.status(Status.BadRequest).send("Bad request");
    }
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
