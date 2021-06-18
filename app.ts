import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

import { router } from "./routes/index.ts";
import { database } from "./utils/databaseConnection.ts";

const app = new Application();
const env = config({ safe: true });

// Logger
app.use(async (context: any, next: any) => {
  await next();

  const requestMethod = context.request.method;
  const requestUrl = context.request.url;
  const responseTime = context.response.headers.get("X-Response-Time");

  console.log(`${requestMethod} ${requestUrl} - ${responseTime}ms`);
});

// Timing
app.use(async (context: any, next: any) => {
  const startTime = Date.now();

  await next();

  const responseTime = Date.now() - startTime;

  context.response.headers.set("X-Response-Time", responseTime);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use((context: any) => {
  context.response.status = 404;
  context.response.body = "page not found!";
});

app.addEventListener(
  "listen",
  async ({ hostname = "127.0.0.1", port = 8000, secure }) => {
    try {
      await database.sync({
        drop:
          ["testing", "test", "staging"].some(
            (envTest) => env.APP_ENV.toLowerCase() === envTest
          ) || env.RESET_DATABASE === "true",
      });
      console.log(
        `⚡ Server listening on ${
          secure ? "https://" : "http://"
        }${hostname}:${port}`
      );
    } catch (error) {
      console.error(error);
    }
  }
);
await app.listen({ hostname: env.APP_HOSTNAME, port: +env.APP_PORT });
