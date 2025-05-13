"use server";
// import { trpc } from "./trpc";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { favCards } from "@/db/schema";
import { caller } from "@/server/trpc/server";
export async function getFavs(q: string) {
  console.log(typeof caller);
  return caller.post.getFavs(q);
}

export async function delFav(imageUrl: string, userId: string) {
  return caller.post.delFav({
    imageUrl,
    userId,
  });
}

export async function addFav(id: string, imageUrl: string, userId: string) {
  return caller.post.addFav({ id, imageUrl, userId });
  // return db.insert(favCards).values({ cardId: id, imageUrl, userId });
}
