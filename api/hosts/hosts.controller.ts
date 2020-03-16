import { NowRequest, NowResponse } from "@now/node";
import { Status } from "../../utils/api.utils";
import Host from "../../models/host.model";

export class HostsController {
  static async getHosts(req: NowRequest, res: NowResponse) {
    try {
      const hosts = await Host.find();
      res.status(Status.Ok).json({
        success: true,
        count: hosts.length,
        data: hosts
      });
    } catch (error) {
      console.log({ error });
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async getHost(req: NowRequest, res: NowResponse) {
    const { id: hostId } = req.query;
    try {
      const [host] = await Host.find({ hostId });
      if (host) {
        res.status(Status.Ok).json({
          success: true,
          data: host
        });
      } else {
        res.status(Status.NotFound).send({ error: `Host ${hostId} not found` });
      }
    } catch (error) {
      res.status(Status.Error).send({ error: error.message });
    }
  }

  static async addHost(req: NowRequest, res: NowResponse) {
    try {
      const host = await Host.create(req.body);
      res.status(Status.Ok).json({
        success: true,
        data: host
      });
    } catch (error) {
      if (error.code === 11000) {
        res
          .status(Status.BadRequest)
          .json({ error: "This host already exists" });
      } else {
        res.status(Status.Error).send({ error: error.message });
      }
    }
  }
}
