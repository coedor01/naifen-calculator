"use client";

import { useEffect, useState } from "react";
import Body from "./components/Body";
import Loading from "@/app/components/Loading";

export default function Home() {
  const [standards, setStandards] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/standards.json");
      const data = await res.json();
      setStandards(data);
    }
    fetchPosts();
  }, []);

  if (!standards) return <Loading />;

  return <Body standards={standards} />;
}
