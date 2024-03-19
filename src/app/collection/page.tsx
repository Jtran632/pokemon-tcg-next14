import DisplayFavs from "@/app/components/displayFavs";
export default async function Collection() {
  return (
    <div className="flex min-h-screen p-24 text-black bg-white">
      <DisplayFavs />
    </div>
  );
}
