import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import Pet from "../../models/pet.model";

export class PetsController {
  static async getPets(req: NowRequest, res: NowResponse) {
    try {
      const pets = await Pet.find();
      res.status(Status.Ok).json({
        success: true,
        count: pets.length,
        data: pets
      });
    } catch (error) {
      console.log({ error });
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async getPet(req: NowRequest, res: NowResponse) {
    const petId = +req.query.id;
    try {
      const [pet] = await Pet.find({ petId });
      if (pet) {
        res.status(Status.Ok).json({
          success: true,
          data: pet
        });
      } else {
        res.status(Status.NotFound).send({ error: `Pet ${petId} not found` });
      }
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async addPet(req: NowRequest, res: NowResponse) {
    try {
      const pet = await Pet.create(req.body);
      res.status(Status.Ok).json({
        success: true,
        data: pet
      });
    } catch (error) {
      if (error.code === 11000) {
        res
          .status(Status.BadRequest)
          .json({ error: "This pet already exists" });
      } else {
        res.status(Status.Error).send({ error: error.message });
      }
    }
  }
}
