/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getServerAuthSession } from "../../../auth";
export default async function NavBar() {
  const session = await getServerAuthSession();
  return (
    <div className="flex items-center justify-between">
      <img
        className="-rotate-12 sm:w-[50px]"
        src={"/icon.png"}
        alt="header image"
        width={100}
        height={"auto"}
      ></img>
      <div className="flex w-full place-content-between justify-center text-6xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-base gap-10 sm:gap-4 p-4">
        <Link href={"/"}>Home </Link>
        <Link href={"/sets"}>Sets</Link>
        {session ? <Link href={"/collection"}>Collection</Link> : <></>}
        <Link href={"/login"}>{`${!session ? "Login" : "Sign Out"}`}</Link>
      </div>
      <div></div>
    </div>
  );
}
