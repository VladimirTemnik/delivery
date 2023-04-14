import { rest } from "msw";

export const handlers = [
  // Handles a POST /login request
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    return res(
      // Respond with a 200 status code
      ctx.status(400)
      //ctx.json({token: 'testToken'})
    );
  }),
  // Handles a GET /user request
  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    /*if (!isAuthenticated) {
            // If not authenticated, respond with a 403 error
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                }),
            )
        }*/
    // If authenticated, return a mocked user details
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.post("/logout", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
