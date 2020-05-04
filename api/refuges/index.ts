import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { RefugesController } from "./_refuges.controller";
import { connectDB } from "../../setup/connect.db";

export default async function RefugesApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    RefugesController.getRefuges(req, res);
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
