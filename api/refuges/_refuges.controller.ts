import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import Refuge from "../../models/refuge.model";

export class RefugesController {
  static async getRefuges(req: NowRequest, res: NowResponse) {
    try {
      const refuges = await Refuge.find();
      res.status(Status.Ok).json({
        success: true,
        count: refuges.length,
        data: refuges
      });
    } catch (error) {
      console.log({ error });
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async getRefuge(req: NowRequest, res: NowResponse) {
    const refugeId = +req.query.id;
    try {
      const [refuge] = await Refuge.find({ refugeId });
      if (refuge) {
        res.status(Status.Ok).json({
          success: true,
          data: refuge
        });
      } else {
        res.status(Status.NotFound).send({ error: `Refuge ${refugeId} not found` });
      }
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async addRefuge(req: NowRequest, res: NowResponse) {
    try {
      const refuge = await Refuge.create(req.body);
      res.status(Status.Ok).json({
        success: true,
        data: refuge
      });
    } catch (error) {
      if (error.code === 11000) {
        res
          .status(Status.BadRequest)
          .json({ error: "This refuge already exists" });
      } else {
        res.status(Status.Error).send({ error: error.message });
      }
    }
  }
}
