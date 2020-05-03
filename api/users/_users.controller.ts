import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import User from "../../models/user.model";
import { NowAuth0Request } from "./_interfaces";
import { geocoder } from "../../utils/geocoder";

// https://auth0.com/docs/quickstart/spa/vuejs/02-calling-an-api#create-an-api

export class UsersController {
  static async getUser(req: NowAuth0Request, res: NowResponse) {
    const { sub } = req.user;
    try {
      const userId = getUserId(sub);
      const user = await User.findOne({ id: userId });
      res.status(Status.Ok).send(user);
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }

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
      const userId = getUserId(sub);
      if (dataToUpdate.address) {
        const [loc] = await geocoder.geocode(dataToUpdate.address);
        dataToUpdate.location = {
          coordinates: [loc.longitude, loc.latitude],
          formattedAddress: loc.formattedAddress,
        };
      }
      const user = await User.findOneAndUpdate({ id: userId }, dataToUpdate, {
        new: true, // para retornar el user actualizado
      });
      res.status(Status.Ok).send(user);
    } catch (error) {
      console.log(error);
      res.status(Status.Error).send({ error: error.message });
    }
  }
}

function getUserId(sub) {
  const [, userId] = sub.split("|"); // TODO: hacer esto bonito
  return userId;
}
