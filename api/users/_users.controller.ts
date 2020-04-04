import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import User from "../../models/user.model";

export class UsersController {
  static async addUser(req: NowRequest, res: NowResponse) {
    try {
      await User.create(req.body.user);
      res.status(Status.Created).end();
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async patchUser(req: NowRequest, res: NowResponse) {
    try {
      const { id, ...dataToUpdate } = req.body;
      await User.findOneAndUpdate({ id }, dataToUpdate);
      res.status(Status.NoContent).end();
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }
}
