import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import Vet from "../../models/vet.model";

export class VetsController {
  static async getVets(req: NowRequest, res: NowResponse) {
    try {
      const vets = await Vet.find();
      res.status(Status.Ok).json({
        success: true,
        count: vets.length,
        data: vets
      });
    } catch (error) {
      console.log({ error });
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async getVet(req: NowRequest, res: NowResponse) {
    const vetId = +req.query.id;
    try {
      const [vet] = await Vet.find({ vetId });
      if (vet) {
        res.status(Status.Ok).json({
          success: true,
          data: vet
        });
      } else {
        res.status(Status.NotFound).send({ error: `Vet ${vetId} not found` });
      }
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async addVet(req: NowRequest, res: NowResponse) {
    try {
      const vet = await Vet.create(req.body);
      res.status(Status.Ok).json({
        success: true,
        data: vet
      });
    } catch (error) {
      if (error.code === 11000) {
        res
          .status(Status.BadRequest)
          .json({ error: "This vet already exists" });
      } else {
        res.status(Status.Error).send({ error: error.message });
      }
    }
  }
}
