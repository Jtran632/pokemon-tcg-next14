import Link from "next/link";
import Image from "next/image";
export default function NavBar() {
  return (
    <div className="flex items-center justify-between">
      <Image
        src={"/icon.png"}
        alt="header image"
        width={200}
        height={200}
      ></Image>
      <div className="flex justify-center text-6xl gap-20 p-4">
        <Link href={"/"}>Home </Link>
        <Link href={"/sets"}>Sets</Link>
      </div>
      <div></div>
    </div>
  );
}
