// import LoginForm from "@/app/components/loginForm";
import Link from "next/link";
import { getServerAuthSession } from "../../../auth";
export default async function LoginPage() {
  const session = await getServerAuthSession();
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 text-center">
        <div className="flex flex-col gap-4">
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-md bg-white/10 px-10 py-2 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign Out" : "Sign In"}
          </Link>
          {/* {!session ? (
            <Link
              href={"/api/auth/signup"}
              className="rounded-md bg-white/10 px-10 py-2 font-semibold no-underline transition hover:bg-white/20"
            >
              No Account? Sign Up
            </Link>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </main>
  );
}
