import { setupWorker, rest } from "msw";

const worker = setupWorker([
  rest.post("/api/v1/token/authorize", (req, res, ctx) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res(ctx.json({ message: "Please provide login credentials" }));
    return res(ctx.json({ token: "5fdsfwe2345fdsfsdf5" }));
  }),
  rest.post("/api/v1/signup", (req, res, ctx) => {
    const {
      profile_picture,
      email,
      name,
      password,
      method,
      role_id,
      device_id,
    } = req.body;
    if (!email)
      return res(
        ctx.json({
          status: "Failure",
          message: "Please provide an email",
        })
      );
    if (!name)
      return res(
        ctx.json({
          status: "Failure",
          message: "Please provide Your name",
        })
      );
    if (!password)
      return res(
        ctx.json({
          status: "Failure",
          message: "Please provide a password",
        })
      );
    if (!method || !device_id || !role_id)
      return res(
        ctx.json({
          status: "Failure",
          message: "Missing method, device_id, or role_id",
        })
      );
    let context = "";
    if (!profile_picture)
      context =
        "Profile picture not provided. We've assigned a profile picture";
    return res(
      ctx.json({
        status: "Success",
        message: "Account created Successfully",
        information: context,
      })
    );
  }),
]);

worker.start();
