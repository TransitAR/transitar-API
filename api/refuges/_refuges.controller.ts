import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import User from "../../models/user.model";

export class RefugesController {
  static async getRefuges(_req: NowRequest, res: NowResponse) {
    try {
      // capaz agregar otra collection manual de veterinarias que no son usarios
      const refuges = await User.find({
        userType: "refuge",
        showOnMap: true,
      });
      res.status(Status.Ok).json({
        success: true,
        count: refuges.length,
        data: refuges,
      });
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }
}
