import type { Post } from "@prisma/client";
import { prisma } from "~/utils/db.server";

export async function getPosts() {
  return prisma.post.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createPost(post: Pick<Post, "title" | "content">) {
  return prisma.post.create({ data: post });
}

export async function getPost({ id }: { id: string }) {
  return prisma.post.findUnique({ where: { id } });
}

export async function deletePost(id: string) {
  return prisma.post.delete({ where: { id: id } });
}
// https://remix.run/docs/en/v1/tutorials/blog#a-little-refactoring
