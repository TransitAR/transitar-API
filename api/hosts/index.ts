import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { HostsController } from "./hosts.controller";
import { PetsController } from "./pets.controller";
import { RefugesController } from "./refuges.controller";
import { VetsController } from "./vets.controller";
import { connectDB } from "../../setup/connect.db";

export default async function HostsApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    if (req.query.id) {
      HostsController.getHost(req, res);
    } else {
      HostsController.getHosts(req, res);
    }
  } else if (req.method === Methods.Post) {
    HostsController.addHost(req, res);
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
