import { Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import { router as postRoutes } from "./postRoutes.ts";

const router = new Router()
  .get("/", ({ request, response }) => {
    response.body = `This is main page. link: ${request.url}`;
  })
  .get("/about", ({ request, response }) => {
    response.body = `This is about page. link: ${request.url}`;
  })
  .get("/contacts", ({ request, response }) => {
    response.body = `This is contacts page. link: ${request.url}`;
  })
  .use("/posts", postRoutes.routes(), postRoutes.allowedMethods());

export { router };
