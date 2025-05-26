import DisplayFavs from "@/app/components/displayFavs";
import { getFavs } from "@/lib/actions";
import { getServerAuthSession } from "../../../auth";
import z from "zod";
import { Session } from "next-auth";
export const dynamic = "force-dynamic";

export default async function Collection() {
  const favsSchema = z.array(
    z.object({
      id: z.number(),
      cardId: z.string().nullable(),
      imageUrl: z.string().nullable(),
      userId: z.string().nullable(),
    })
  );
  type Favs = z.infer<typeof favsSchema>;

  const session: Session | null = await getServerAuthSession();
  let favs: Favs = [];
  if (session) {
    const userId = session.user.id;
    const response = await getFavs(userId);
    favs = response;
  } else {
    favs = [];
  }
  if (session?.user.id) {
    return (
      <div className="flex min-h-screen w-full px-20 lg:px-8 md:px-6 sm:px-4 xs:px-0 py-10 text-black bg-white">
        <DisplayFavs favs={favs} />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center min-h-screen w-full px-20 sm:px-10 xs:px-10 py-10 text-black text-center bg-white">
        Please log in to view collection
      </div>
    );
  }
}
