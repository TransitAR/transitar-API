import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import User from "../../models/user.model";

export class PersonsController {
  static async getPersons(_req: NowRequest, res: NowResponse) {
    try {
      const persons = await User.find({
        userType: "volunteer", // { $in: ["volunteer", "adoptant"] },
      });
      res.status(Status.Ok).json({
        success: true,
        count: persons.length,
        data: persons,
      });
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }
}
