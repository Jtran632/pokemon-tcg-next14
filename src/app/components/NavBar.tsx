import Link from "next/link";
import Image from "next/image";
export default function NavBar() {
  return (
    <div className="flex items-center justify-between">
      <Image
        src={"/icon.png"}
        alt="header image"
        width={125}
        height={200}
      ></Image>
      <div className="flex w-full place-content-between justify-center md:text-6xl sm:text-4xl  gap-10 p-4">
        <Link href={"/"}>Home </Link>
        <Link href={"/sets"}>Sets</Link>
      </div>
      <div></div>
    </div>
  );
}
