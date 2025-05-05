"use server";
import { api } from "@/server/trpc/server";
export async function getFavs(q: string) {
  return await api.post.getFavs(q);
}
export async function delFav(imageUrl: string, userId: string) {
  return await api.post.delFav({ imageUrl, userId });
}
export async function addFav(id: string, imageUrl: string, userId: string) {
  return await api.post.addFav({ id, imageUrl, userId });
}
