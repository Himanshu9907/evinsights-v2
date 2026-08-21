
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavbarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(event) {
    event.preventDefault();

    const value = query.trim();

    if (!value) return;

    router.push(`/cars?search=${encodeURIComponent(value)}`);
  }

  return (
    <form className="navbar-search" onSubmit={submit}>
      <button
        type="submit"
        className="navbar-search__button"
        aria-label="Search vehicles"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="navbar-icon"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
      </button>

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search EVs"
        aria-label="Search EVs"
      />
    </form>
  );
}

