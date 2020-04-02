import { NowRequest, NowResponse } from "./node_modules/@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { PeopleController } from "./_persons.controller";
import { connectDB } from "../../setup/connect.db";

export default async function PeopleApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    PeopleController.getpersons(req, res);
  } else if (req.method === Methods.Post) {
    PeopleController.addPerson(req, res);
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
