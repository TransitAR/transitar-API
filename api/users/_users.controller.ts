import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import User from "../../models/user.model";

export class UsersController {
  static async addUser(req: NowRequest, res: NowResponse) {
    try {
      await User.create(req.body.user);
      res.status(Status.Ok).end();
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }
}
