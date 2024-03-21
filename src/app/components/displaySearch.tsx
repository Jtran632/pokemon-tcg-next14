"use client";
import { useState} from "react";

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  //todo - add server actions to add to collection
  async function getQuery() {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:${query}*&orderBy=-set.releaseDate`
    );
    const res = await response.json();
    return res.data;
  }

  async function onSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (query.trim() === "") {
      setErrorMessage("Please enter in something ")
      return;
    }
    setIsLoading(true); // Set loading to true when the request starts
    setErrorMessage("")
    const arr = await getQuery();
    setIsLoading(false);
    setCards(arr);
    console.log("cards", cards);
  }

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex justify-between  text-black border-2 border-black"
        onSubmit={onSubmit}
      >
        <input
          className="text-black"
          type="text"
          name="name"
          disabled={isLoading}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          className={`border-l-2 w-20 border-black ${
            !isLoading ? "bg-green-300" : "bg-red-300"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div>
        {isLoading ? (
          <div className="pt-10">
            Searching for cards that include "{query}"
          </div>
        ) : (
          <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 pt-10">
            {cards.map((card, index) => (
              <img
                key={index}
                src={card.images.small}
                alt={card.name}
                width={400}
                height={"auto"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
