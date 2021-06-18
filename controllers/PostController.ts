import { v4 as uuid } from "https://deno.land/std@0.99.0/uuid/mod.ts";
import { Status } from "https://deno.land/std@0.99.0/http/http_status.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

import { Post } from "../models/Post.ts";

const controller = {
  getPosts: async ({ response }: { response: any }) => {
    try {
      const posts = await Post.all();

      if (posts.length > 0) {
        response.body = posts;
      } else {
        response.status = Status.NotFound;
        response.body = { message: "Post not found." };
      }
    } catch (error) {
      response.status = Status.InternalServerError;
      response.body = error.message;
    }
  },
  getPostById: async ({
    response,
    params: { postId },
  }: {
    response: any;
    params: any;
  }) => {
    try {
      const post = await Post.find(postId);

      if (post) {
        response.body = post;
      } else {
        response.status = Status.NotFound;
        response.body = { message: "Post not found." };
      }
    } catch (error) {
      response.status = Status.InternalServerError;
      response.body = error.message;
    }
  },
  addPost: async ({ request, response }: { request: any; response: any }) => {
    try {
      const { title, content, isPublished } = await request.body().value;

      const post = await Post.create({
        _id: config().DB_DRIVER !== "mongo" ? uuid.generate() : null,
        title,
        isPublished,
        content,
      });

      response.status = Status.Created;
      response.body = post;
    } catch (error) {
      response.status = Status.InternalServerError;
      response.body = error.message;
    }
  },
  updatePost: async ({
    request,
    response,
    params: { postId },
  }: {
    request: any;
    response: any;
    params: any;
  }) => {
    try {
      const { title, content, isPublished } = await request.body().value;
      const post = await Post.find(postId);

      if (post) {
        if (title !== post.title) post.title = title;
        if (content !== post.content) post.content = content;
        if (isPublished !== post.isPublished) post.isPublished = isPublished;
        await post.update();

        response.body = await Post.find(postId);
      } else {
        response.status = Status.NotFound;
        response.body = { message: "Post not found." };
      }
    } catch (error) {
      response.status = Status.InternalServerError;
      response.body = error.message;
    }
  },
  deletePost: async ({
    response,
    params: { postId },
  }: {
    response: any;
    params: any;
  }) => {
    try {
      const post = await Post.find(postId);

      if (post) {
        await post.delete();
        response.status = Status.NoContent;
      } else {
        response.status = Status.NotFound;
        response.body = { message: "Post not found." };
      }
    } catch (error) {
      response.status = Status.InternalServerError;
      response.body = error.message;
    }
  },
};

export { controller };
