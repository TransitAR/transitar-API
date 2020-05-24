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

  static async getRefuge(req: NowRequest, res: NowResponse) {
    const { identifier } = req.query;
    try {
      const refuge = await User.findOne().or([
        { _id: identifier },
        { "refugeInfo.displayName": identifier },
      ]);
      if (refuge) {
        res.status(Status.Ok).json(refuge);
      } else {
        res
          .status(Status.NotFound)
          .send({ error: `Refuge ${identifier} not found` });
      }
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }
}
