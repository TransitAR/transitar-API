import { NowRequest, NowResponse } from "./node_modules/@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { PersonsController } from "./_persons.controller";
import { connectDB } from "../../setup/connect.db";

export default async function PersonApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    if (req.query.id) {
      PersonsController.getPerson(req, res);
    } else {
      res.status(Status.BadRequest).send("Bad request");
    }
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
