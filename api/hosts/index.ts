import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { HostsController } from "./_hosts.controller";
import { connectDB } from "../../setup/connect.db";

export default async function HostsApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  console.log("hi");
  if (req.method === Methods.Get) {
    console.log("hello");
    HostsController.getHosts(req, res);
  } else if (req.method === Methods.Post) {
    HostsController.addHost(req, res);
  } else {
    console.log("alo");
    res.status(Status.BadRequest).send("Bad request");
  }
  console.log("byebye");
}
