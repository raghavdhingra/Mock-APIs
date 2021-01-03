import { setupWorker, rest } from "msw";

const worker = setupWorker([
  rest.post("/api/v1/token/authorize", (req, res, ctx) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res(ctx.json({ message: "Please provide login credentials" }));
    return res(ctx.json({ token: "5fdsfwe2345fdsfsdf5" }));
  }),
]);

worker.start();
