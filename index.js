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
  rest.get("/api/v1/user", (req, res, ctx) => {
    // Authorization token in the headers (Important)

    return res(
      ctx.json({
        user: {
          email: "admin@raghavdhingra.com",
          first_name: "Raghav Dhingra",
          username: "admin@raghavdhingra.com",
        },
        details: {
          user: 1,
          phone_number: 9876543210,
          email: "admin@raghavdhingra.com",
          is_email_confirmed: true,
          profile_picture:
            "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
          method: 0,
          payment_id: "f5ds4fdsfdsf",
          is_payment_done: true,
          time: "5 hours",
          grade: 2,
          subjects: [1, 2, 3],
          roomIds: [1, 2, 3],
          device_id: "fdsf564sdf56sdf5s1df5sd56",
          credits_have: 50.25,
          referral_code: "HSJ551",
          referred_by: "UUS566",
          number_of_referral: 5,
          referral_credits: 20.65,
          validity_in_days: 21,
        },
        role_id: 0,
      })
    );
  }),
]);

worker.start();
