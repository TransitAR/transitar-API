import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import User from "../../models/user.model";

export class VetsController {
  static async getVets(_req: NowRequest, res: NowResponse) {
    try {
      // capaz agregar otra collection manual de veterinarias que no son usarios
      const vets = await User.find({
        userType: "vet",
        showOnMap: true,
      });
      res.status(Status.Ok).json({
        success: true,
        count: vets.length,
        data: vets,
      });
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }
}
