import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { PetsController } from "./_pets.controller";
import { connectDB } from "../../setup/connect.db";

export default async function PetApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    if (req.query.id) {
      PetsController.getPet(req, res);
    } else {
      res.status(Status.BadRequest).send("Bad request");
    }
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
