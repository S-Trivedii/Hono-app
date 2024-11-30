import { Hono } from "hono";

const app = new Hono();

async function authMiddleware(c: any, next: any) {
  if (c.req.header("Authorization")) {
    await next();
  } else {
    return c.text("You do not have access");
  }
}

// This will run for every http method
// app.use(authMiddleware);

app.post("/", authMiddleware, async (c) => {
  // In hono, the c.req.json() method is asynchronous and returns a promise that resolves to the parsed JSON body of the request.
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text("Hello Hono!");
});

export default app;
