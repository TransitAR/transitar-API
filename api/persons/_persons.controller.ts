import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import Person from "../../models/person.model";

export class PersonsController {
  static async getPersons(req: NowRequest, res: NowResponse) {
    try {
      const persons = await Person.find();
      res.status(Status.Ok).json({
        success: true,
        count: persons.length,
        data: persons
      });
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async getPerson(req: NowRequest, res: NowResponse) {
    const personId = +req.query.id;
    try {
      const person = await Person.findById({ personId });
      if (person) {
        res.status(Status.Ok).json({
          success: true,
          data: person
        });
      } else {
        res
          .status(Status.NotFound)
          .send({ error: `Person ${personId} not found` });
      }
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async addPerson(req: NowRequest, res: NowResponse) {
    try {
      const person = await Person.create(req.body);
      res.status(Status.Ok).json({
        success: true,
        data: person
      });
    } catch (error) {
      if (error.code === 11000) {
        res
          .status(Status.BadRequest)
          .json({ error: "This person already exists" });
      } else {
        res.status(Status.Error).send({ error: error.message });
      }
    }
  }
}
