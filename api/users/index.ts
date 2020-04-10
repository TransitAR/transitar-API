import { NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { authValidateMiddleware } from "../../utils/auth0.middleware";
import { connectDB } from "../../setup/connect.db";
import { UsersController } from "./_users.controller";
import { NowAuth0Request } from "./_interfaces";

export default async function UsersApi(req: NowAuth0Request, res: NowResponse) {
  await connectDB();
  // TODO: agregar validacion con una key privada para
  // asegurarnos que la reuqest es especifica de Auth0
  if (req.method === Methods.Post) {
    if (req.body.user) {
      UsersController.addUser(req, res);
    } else {
      res.status(Status.BadRequest).send("User information is required");
    }
  } else if (req.method === Methods.Patch) {
    await authValidateMiddleware(req, res);
    if (req.user && req.user.sub) {
      UsersController.patchUser(req, res);
    } else {
      res.status(Status.BadRequest).send("Invalid user");
    }
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
