import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { connectDB } from "../../setup/connect.db";

export default async function VetsApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Post) {
    console.log({ testingRegisterEndpoint: JSON.stringify(req.body, null, 4) });
    res.status(Status.Ok).end();
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
