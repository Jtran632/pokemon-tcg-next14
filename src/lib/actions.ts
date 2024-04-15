"use server";
import { api } from "@/server/trpc/server";
export async function getFavs() {
  return await api.post.getFavs();
}
export async function delFav(q: string) {
  return await api.post.delFav(q);
}
export async function addFav(id: string, imageUrl: string) {
  return await api.post.addFav({ id, imageUrl });
}
