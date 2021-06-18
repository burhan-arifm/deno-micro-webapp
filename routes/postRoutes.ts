import { Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import { controller as PostController } from "../controllers/PostController.ts";

const router = new Router()
  .get("/", PostController.getPosts)
  .get("/:postId", PostController.getPostById)
  .post("/", PostController.addPost)
  .put("/:postId", PostController.updatePost)
  .delete("/:postId", PostController.deletePost);

export { router };
