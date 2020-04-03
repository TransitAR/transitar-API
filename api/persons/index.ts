import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { PersonsController } from "../persons/_persons.controller";
import { connectDB } from "../../setup/connect.db";

export default async function PersonsApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    PersonsController.getPersons(req, res);
  } else if (req.method === Methods.Post) {
    PersonsController.addPerson(req, res);
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
