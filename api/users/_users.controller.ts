import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import User from "../../models/user.model";
import { NowAuth0Request } from "./_interfaces";

// https://auth0.com/docs/quickstart/spa/vuejs/02-calling-an-api#create-an-api

export class UsersController {
  // https://manage.auth0.com/dashboard/us/refugiar/hooks
  static async addUser(req: NowRequest, res: NowResponse) {
    try {
      await User.create(req.body.user);
      res.status(Status.Created).end();
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }

  // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
  static async patchUser(req: NowAuth0Request, res: NowResponse) {
    const { sub } = req.user;
    try {
      // evitar update de id & email
      const { id, email, ...dataToUpdate } = req.body;
      const [, userId] = sub.split("|"); // TODO: hacer esto bonito
      await User.findOneAndUpdate({ id: userId }, dataToUpdate);
      res.status(Status.NoContent).end();
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }
}
