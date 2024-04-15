/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
export default function NavBar() {
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
        <Link href={"/collection"}>Collection</Link>
        <Link href={"/login"}>Login</Link>
      </div>
      <div></div>
    </div>
  );
}
