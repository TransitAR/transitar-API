import micro from "micro-cors";
import { NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { authValidateMiddleware } from "../../utils/auth0.middleware";
import { connectDB } from "../../setup/connect.db";
import { UsersController } from "./_users.controller";
import { NowAuth0Request } from "./_interfaces";

async function UsersApi(req: NowAuth0Request, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Options) {
    res.status(Status.Ok).end();
  } else if (req.method === Methods.Get) {
    try {
      await authValidateMiddleware(req, res);
    } catch (err) {
      res.status(Status.Unauthorized).send(err.message);
      return;
    }
    if (req.user && req.user.sub) {
      UsersController.getUser(req, res);
    } else {
      res.status(Status.BadRequest).send("Invalid user");
    }
  } else if (req.method === Methods.Post) {
    // TODO: agregar validacion con una key privada para
    // asegurarnos que la request es especifica de Auth0
    if (req.body.user) {
      UsersController.addUser(req, res);
    } else {
      res.status(Status.BadRequest).send("User information is required");
    }
  } else if (req.method === Methods.Patch) {
    try {
      await authValidateMiddleware(req, res);
    } catch (err) {
      res.status(Status.Unauthorized).send(err.message);
      return;
    }
    if (req.user && req.user.sub) {
      UsersController.patchUser(req, res);
    } else {
      res.status(Status.BadRequest).send("Invalid user");
    }
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}

const cors = micro();

export default cors(UsersApi);
